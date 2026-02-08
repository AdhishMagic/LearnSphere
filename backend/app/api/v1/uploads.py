from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorDatabase, AsyncIOMotorGridFSBucket

from app.core.database import get_database
from app.schemas.upload_schema import UploadSessionCompleteSchema, UploadSessionCreateSchema
from app.services.course_service import COURSES_COLLECTION, LESSONS_COLLECTION
from app.services.profile_service import get_current_user
from app.services.upload_service import (
    append_upload_chunk,
    abort_upload_session,
    complete_upload_session,
    create_upload_session,
    get_upload_session,
    stream_attachment,
)
from app.utils.jwt import decode_access_token

router = APIRouter(prefix="/api/v1/uploads", tags=["uploads"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)


async def get_authenticated_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncIOMotorDatabase = Depends(get_database),
) -> dict:
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    payload = decode_access_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return await get_current_user(db, str(user_id))


async def get_optional_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncIOMotorDatabase = Depends(get_database),
) -> dict | None:
    if not token:
        return None
    try:
        payload = decode_access_token(token)
    except Exception:
        return None
    user_id = payload.get("sub")
    if not user_id:
        return None
    return await get_current_user(db, str(user_id))


@router.post("/sessions", status_code=status.HTTP_201_CREATED)
async def create_session(
    payload: UploadSessionCreateSchema,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> dict:
    return await create_upload_session(db=db, user_id=str(current_user.get("_id")), payload=payload)


@router.get("/sessions/{session_id}")
async def get_session(
    session_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> dict:
    return await get_upload_session(db=db, session_id=session_id, user_id=str(current_user.get("_id")))


@router.post("/sessions/{session_id}/chunks")
async def upload_chunk(
    session_id: str,
    chunk_index: int,
    file: UploadFile,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> dict:
    return await append_upload_chunk(
        db=db,
        session_id=session_id,
        user_id=str(current_user.get("_id")),
        chunk_index=chunk_index,
        upload_file=file,
    )


@router.post("/sessions/{session_id}/complete")
async def complete_session(
    session_id: str,
    payload: UploadSessionCompleteSchema,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> dict:
    return await complete_upload_session(
        db=db,
        session_id=session_id,
        user_id=str(current_user.get("_id")),
        payload=payload,
    )


@router.post("/sessions/{session_id}/abort")
async def abort_session(
    session_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> dict:
    return await abort_upload_session(db=db, session_id=session_id, user_id=str(current_user.get("_id")))


@router.get("/attachments/{attachment_id}")
async def get_attachment(
    attachment_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict | None = Depends(get_optional_user),
):
    attachment = await stream_attachment(db=db, attachment_id=attachment_id, user_id=None)

    lesson = await db[LESSONS_COLLECTION].find_one({"_id": attachment.get("lesson_id")})
    course = await db[COURSES_COLLECTION].find_one({"_id": attachment.get("course_id")})

    if not course or not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Attachment not found")

    is_owner = False
    if current_user:
        if current_user.get("role") == "admin":
            is_owner = True
        elif current_user.get("role") == "instructor":
            is_owner = str(course.get("instructor_id")) == str(current_user.get("_id"))

    if course.get("status") != "published" and not is_owner:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized")

    gridfs_id = attachment.get("gridfs_id")

    if not gridfs_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Attachment not ready")

    bucket = AsyncIOMotorGridFSBucket(db, bucket_name="lesson_uploads")
    grid_out = await bucket.open_download_stream(gridfs_id)

    async def file_iterator():
        while True:
            chunk = await grid_out.readchunk()
            if not chunk:
                break
            yield chunk

    return StreamingResponse(
        file_iterator(),
        media_type=attachment.get("mime_type") or "application/octet-stream",
    )
