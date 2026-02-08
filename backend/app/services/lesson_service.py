from __future__ import annotations

from datetime import datetime
from typing import Any, Dict

from bson import ObjectId
from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.lesson_schema import LessonCreateSchema, LessonUpdateSchema
from app.services.course_service import COURSES_COLLECTION, LESSONS_COLLECTION
from app.services.profile_service import get_current_user


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


async def create_lesson(
    db: AsyncIOMotorDatabase, user_id: str, payload: LessonCreateSchema
) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    course_id = _object_id(payload.courseId)
    course = await db[COURSES_COLLECTION].find_one({"_id": course_id})
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    _ensure_course_owner(user, course)

    now = datetime.utcnow()
    doc = {
        "course_id": course_id,
        "title": payload.title,
        "type": payload.type,
        "description": payload.description,
        "allow_download": payload.allowDownload,
        "status": "draft",
        "created_at": now,
        "updated_at": now,
    }

    result = await db[LESSONS_COLLECTION].insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    doc["course_id"] = str(doc["course_id"])
    return doc


async def update_lesson(
    db: AsyncIOMotorDatabase, lesson_id: str, user_id: str, payload: LessonUpdateSchema
) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    lesson_obj_id = _object_id(lesson_id)
    lesson = await db[LESSONS_COLLECTION].find_one({"_id": lesson_obj_id})
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")

    course = await db[COURSES_COLLECTION].find_one({"_id": lesson.get("course_id")})
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    _ensure_course_owner(user, course)

    update_doc = payload.model_dump(exclude_unset=True, by_alias=True)
    if update_doc:
        update_doc["updated_at"] = datetime.utcnow()
        await db[LESSONS_COLLECTION].update_one({"_id": lesson_obj_id}, {"$set": update_doc})

    lesson = await db[LESSONS_COLLECTION].find_one({"_id": lesson_obj_id})
    lesson["_id"] = str(lesson.get("_id"))
    lesson["course_id"] = str(lesson.get("course_id"))
    return lesson


async def get_lesson(db: AsyncIOMotorDatabase, lesson_id: str, user_id: str) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    lesson_obj_id = _object_id(lesson_id)
    lesson = await db[LESSONS_COLLECTION].find_one({"_id": lesson_obj_id})
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")

    course = await db[COURSES_COLLECTION].find_one({"_id": lesson.get("course_id")})
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    _ensure_course_owner(user, course)

    lesson["_id"] = str(lesson.get("_id"))
    lesson["course_id"] = str(lesson.get("course_id"))
    return lesson


async def publish_lesson(db: AsyncIOMotorDatabase, lesson_id: str, user_id: str) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    lesson_obj_id = _object_id(lesson_id)
    lesson = await db[LESSONS_COLLECTION].find_one({"_id": lesson_obj_id})
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")

    course = await db[COURSES_COLLECTION].find_one({"_id": lesson.get("course_id")})
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    _ensure_course_owner(user, course)

    if course.get("status") != "published":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Course must be published first")

    if lesson.get("status") != "ready":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Lesson not ready for publish")

    await db[LESSONS_COLLECTION].update_one(
        {"_id": lesson_obj_id},
        {"$set": {"status": "published", "updated_at": datetime.utcnow()}},
    )

    lesson = await db[LESSONS_COLLECTION].find_one({"_id": lesson_obj_id})
    lesson["_id"] = str(lesson.get("_id"))
    lesson["course_id"] = str(lesson.get("course_id"))
    return lesson
