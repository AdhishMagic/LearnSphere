from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any, Dict, Optional

from bson import ObjectId
from fastapi import HTTPException, UploadFile, status
from motor.motor_asyncio import AsyncIOMotorDatabase, AsyncIOMotorGridFSBucket

from app.schemas.upload_schema import (
    UploadSessionCompleteSchema,
    UploadSessionCreateSchema,
)
from app.services.course_service import COURSES_COLLECTION, LESSONS_COLLECTION
from app.services.profile_service import get_current_user

UPLOAD_SESSIONS_COLLECTION = "upload_sessions"
LESSON_ATTACHMENTS_COLLECTION = "lesson_attachments"
UPLOAD_CHUNKS_COLLECTION = "upload_chunks"

CHUNK_SIZE = 5 * 1024 * 1024
SESSION_TTL_HOURS = 24


def _object_id(value: str) -> ObjectId:
    if not ObjectId.is_valid(value):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid id")
    return ObjectId(value)


def _require_instructor_or_admin(user: Dict[str, Any]) -> None:
    if user.get("role") not in {"instructor", "admin"}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Instructor access required")


def _ensure_course_owner(user: Dict[str, Any], course: Dict[str, Any]) -> None:
    if user.get("role") == "admin":
        return
    if str(course.get("instructor_id")) != str(user.get("_id")):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized for this course")


def _get_bucket(db: AsyncIOMotorDatabase) -> AsyncIOMotorGridFSBucket:
    return AsyncIOMotorGridFSBucket(db, bucket_name="lesson_uploads")


def _validate_mime_type(mime_type: str) -> None:
    allowed = {
        "video/mp4",
        "video/webm",
        "video/ogg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "text/plain",
        "image/png",
        "image/jpeg",
        "image/webp",
        "application/octet-stream",
    }
    if mime_type not in allowed:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported file type")


def _detect_asset_type(mime_type: str) -> str:
    if mime_type.startswith("video/"):
        return "video"
    if mime_type.startswith("image/"):
        return "image"
    return "document"


async def create_upload_session(
    db: AsyncIOMotorDatabase, user_id: str, payload: UploadSessionCreateSchema
) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    course_id = _object_id(payload.courseId)
    lesson_id = _object_id(payload.lessonId)

    course = await db[COURSES_COLLECTION].find_one({"_id": course_id})
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    _ensure_course_owner(user, course)

    lesson = await db[LESSONS_COLLECTION].find_one({"_id": lesson_id, "course_id": course_id})
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")

    if lesson.get("status") != "draft":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Lesson must be draft")

    _validate_mime_type(payload.mimeType)

    if payload.fileSize <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file size")

    now = datetime.utcnow()
    expires_at = now + timedelta(hours=SESSION_TTL_HOURS)

    session_doc = {
        "course_id": course_id,
        "lesson_id": lesson_id,
        "owner_id": user.get("_id"),
        "file_name": payload.fileName,
        "mime_type": payload.mimeType,
        "file_size": payload.fileSize,
        "asset_type": _detect_asset_type(payload.mimeType),
        "status": "initiated",
        "received_bytes": 0,
        "expires_at": expires_at,
        "created_at": now,
        "updated_at": now,
    }

    result = await db[UPLOAD_SESSIONS_COLLECTION].insert_one(session_doc)
    session_id = result.inserted_id

    await db[LESSONS_COLLECTION].update_one(
        {"_id": lesson_id},
        {"$set": {"upload_session_id": session_id, "status": "uploading", "updated_at": now}},
    )

    return {
        "sessionId": str(session_id),
        "status": session_doc["status"],
        "receivedBytes": session_doc["received_bytes"],
        "fileSize": payload.fileSize,
        "expiresAt": session_doc["expires_at"].isoformat(),
    }


async def get_upload_session(db: AsyncIOMotorDatabase, session_id: str, user_id: str) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    session_obj_id = _object_id(session_id)
    session = await db[UPLOAD_SESSIONS_COLLECTION].find_one({"_id": session_obj_id})
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Upload session not found")

    course = await db[COURSES_COLLECTION].find_one({"_id": session.get("course_id")})
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    _ensure_course_owner(user, course)

    return {
        "sessionId": str(session.get("_id")),
        "status": session.get("status"),
        "receivedBytes": session.get("received_bytes", 0),
        "fileSize": session.get("file_size", 0),
        "expiresAt": session.get("expires_at").isoformat() if session.get("expires_at") else None,
    }


async def append_upload_chunk(
    db: AsyncIOMotorDatabase,
    session_id: str,
    user_id: str,
    chunk_index: int,
    upload_file: UploadFile,
) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    session_obj_id = _object_id(session_id)
    session = await db[UPLOAD_SESSIONS_COLLECTION].find_one({"_id": session_obj_id})
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Upload session not found")

    course = await db[COURSES_COLLECTION].find_one({"_id": session.get("course_id")})
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    _ensure_course_owner(user, course)

    if session.get("status") not in {"initiated", "uploading"}:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Upload session closed")

    expected_index = session.get("received_bytes", 0) // CHUNK_SIZE
    if chunk_index != expected_index:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Chunk out of order")

    existing_chunk = await db[UPLOAD_CHUNKS_COLLECTION].find_one(
        {"session_id": session_obj_id, "chunk_index": chunk_index}, {"_id": 1}
    )
    if existing_chunk:
        return {
            "sessionId": str(session_obj_id),
            "receivedBytes": session.get("received_bytes", 0),
        }

    size = 0
    data = b""
    try:
        data = await upload_file.read()
        size = len(data)
    finally:
        await upload_file.close()

    if size == 0 or size > CHUNK_SIZE:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid chunk size")

    await db[UPLOAD_CHUNKS_COLLECTION].insert_one(
        {
            "session_id": session_obj_id,
            "chunk_index": chunk_index,
            "data": data,
            "size": size,
            "created_at": datetime.utcnow(),
        }
    )

    new_received = session.get("received_bytes", 0) + size
    await db[UPLOAD_SESSIONS_COLLECTION].update_one(
        {"_id": session_obj_id},
        {"$set": {"received_bytes": new_received, "status": "uploading", "updated_at": datetime.utcnow()}},
    )

    return {
        "sessionId": str(session_obj_id),
        "receivedBytes": new_received,
    }


async def complete_upload_session(
    db: AsyncIOMotorDatabase, session_id: str, user_id: str, payload: UploadSessionCompleteSchema
) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    session_obj_id = _object_id(session_id)
    session = await db[UPLOAD_SESSIONS_COLLECTION].find_one({"_id": session_obj_id})
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Upload session not found")

    course = await db[COURSES_COLLECTION].find_one({"_id": session.get("course_id")})
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    _ensure_course_owner(user, course)

    if session.get("status") != "uploading":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Upload not in progress")

    if session.get("received_bytes") != session.get("file_size"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Upload incomplete")

    gridfs_id = session.get("gridfs_id") or ObjectId()

    bucket = _get_bucket(db)
    upload_stream = await bucket.open_upload_stream_with_id(
        gridfs_id,
        session.get("file_name"),
        chunk_size_bytes=CHUNK_SIZE,
        metadata={
            "course_id": session.get("course_id"),
            "lesson_id": session.get("lesson_id"),
            "mime_type": session.get("mime_type"),
        },
    )

    chunk_cursor = (
        db[UPLOAD_CHUNKS_COLLECTION]
        .find({"session_id": session_obj_id})
        .sort("chunk_index", 1)
    )

    async for chunk in chunk_cursor:
        await upload_stream.write(chunk.get("data", b""))

    await upload_stream.close()

    attachment_doc = {
        "lesson_id": session.get("lesson_id"),
        "course_id": session.get("course_id"),
        "gridfs_id": gridfs_id,
        "file_name": session.get("file_name"),
        "mime_type": session.get("mime_type"),
        "file_size": session.get("file_size"),
        "asset_type": session.get("asset_type"),
        "status": "ready",
        "created_at": datetime.utcnow(),
    }
    attachment_result = await db[LESSON_ATTACHMENTS_COLLECTION].insert_one(attachment_doc)

    await db[LESSONS_COLLECTION].update_one(
        {"_id": session.get("lesson_id")},
        {
            "$set": {
                "attachment_id": attachment_result.inserted_id,
                "content_url": f"/api/v1/uploads/attachments/{attachment_result.inserted_id}",
                "upload_session_id": None,
                "file_name": session.get("file_name"),
                "file_size": session.get("file_size"),
                "mime_type": session.get("mime_type"),
                "asset_type": session.get("asset_type"),
                "status": "ready",
                "updated_at": datetime.utcnow(),
            }
        },
    )

    await db[UPLOAD_SESSIONS_COLLECTION].update_one(
        {"_id": session_obj_id},
        {"$set": {"status": "completed", "gridfs_id": gridfs_id, "updated_at": datetime.utcnow()}},
    )

    await db[UPLOAD_CHUNKS_COLLECTION].delete_many({"session_id": session_obj_id})

    return {
        "sessionId": str(session_obj_id),
        "attachmentId": str(attachment_result.inserted_id),
        "status": "completed",
    }


async def abort_upload_session(db: AsyncIOMotorDatabase, session_id: str, user_id: str) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    session_obj_id = _object_id(session_id)
    session = await db[UPLOAD_SESSIONS_COLLECTION].find_one({"_id": session_obj_id})
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Upload session not found")

    course = await db[COURSES_COLLECTION].find_one({"_id": session.get("course_id")})
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    _ensure_course_owner(user, course)

    gridfs_id = session.get("gridfs_id")
    if gridfs_id:
        bucket = _get_bucket(db)
        try:
            await bucket.delete(gridfs_id)
        except Exception:
            pass

    await db[UPLOAD_CHUNKS_COLLECTION].delete_many({"session_id": session_obj_id})

    await db[UPLOAD_SESSIONS_COLLECTION].update_one(
        {"_id": session_obj_id},
        {"$set": {"status": "aborted", "updated_at": datetime.utcnow()}},
    )

    return {"sessionId": str(session_obj_id), "status": "aborted"}


async def stream_attachment(db: AsyncIOMotorDatabase, attachment_id: str, user_id: Optional[str]) -> Dict[str, Any]:
    attachment_obj_id = _object_id(attachment_id)
    attachment = await db[LESSON_ATTACHMENTS_COLLECTION].find_one({"_id": attachment_obj_id})
    if not attachment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Attachment not found")

    if attachment.get("status") != "ready":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Attachment not ready")

    return attachment
