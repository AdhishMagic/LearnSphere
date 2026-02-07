from __future__ import annotations

from datetime import datetime
from typing import Any, Dict

from bson import ObjectId
from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.profile_schema import InstructorApplicationSchema, UpdateProfileSchema
from app.services.user_service import USERS_COLLECTION


def _normalize_user(user: Dict[str, Any]) -> Dict[str, Any]:
    user["_id"] = str(user.get("_id"))

    if not user.get("first_name") and user.get("full_name"):
        parts = str(user.get("full_name", "")).strip().split()
        if parts:
            user["first_name"] = parts[0]
            user["last_name"] = " ".join(parts[1:]) if len(parts) > 1 else ""

    if not user.get("joined_date") and user.get("created_at"):
        user["joined_date"] = user.get("created_at")

    if "total_points" not in user:
        user["total_points"] = 0

    if "instructor_application" not in user:
        user["instructor_application"] = None
    if "instructor_data" not in user:
        user["instructor_data"] = None

    if user.get("role") == "admin":
        if not user.get("admin_level"):
            user["admin_level"] = "Admin"
        if user.get("permissions") is None:
            user["permissions"] = []

    return user


async def get_current_user(db: AsyncIOMotorDatabase, user_id: str) -> Dict[str, Any]:
    if ObjectId.is_valid(user_id):
        user = await db[USERS_COLLECTION].find_one({"_id": ObjectId(user_id)})
    else:
        user = await db[USERS_COLLECTION].find_one({"email": user_id.lower()})

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    normalized = _normalize_user(user)

    update_doc: Dict[str, Any] = {}

    if user.get("first_name") in (None, "") and normalized.get("first_name"):
        update_doc["first_name"] = normalized.get("first_name")
    if user.get("last_name") in (None, "") and normalized.get("last_name") is not None:
        update_doc["last_name"] = normalized.get("last_name")

    if user.get("joined_date") is None and normalized.get("joined_date") is not None:
        update_doc["joined_date"] = normalized.get("joined_date")
    if user.get("total_points") is None:
        update_doc["total_points"] = 0

    if "instructor_application" not in user:
        update_doc["instructor_application"] = None
    if "instructor_data" not in user:
        update_doc["instructor_data"] = None

    if normalized.get("role") == "admin":
        if user.get("admin_level") in (None, ""):
            update_doc["admin_level"] = "Admin"
        if user.get("permissions") is None:
            update_doc["permissions"] = []

    if update_doc:
        await db[USERS_COLLECTION].update_one({"_id": ObjectId(normalized["_id"])}, {"$set": update_doc})

    return normalized


async def update_personal_info(
    db: AsyncIOMotorDatabase, user_id: str, data: UpdateProfileSchema
) -> Dict[str, Any]:
    payload = data.model_dump(exclude_unset=True)
    if not payload:
        return await get_current_user(db, user_id)

    user = await get_current_user(db, user_id)

    field_map = {
        "firstName": "first_name",
        "lastName": "last_name",
        "phone": "phone",
        "avatar": "avatar",
        "bio": "bio",
        "location": "location",
    }

    update_doc: Dict[str, Any] = {}
    for key, value in payload.items():
        if key not in field_map:
            continue
        update_doc[field_map[key]] = value

    if "first_name" in update_doc or "last_name" in update_doc:
        first_name = update_doc.get("first_name", user.get("first_name"))
        last_name = update_doc.get("last_name", user.get("last_name"))
        full_name = " ".join([part for part in [first_name, last_name] if part]).strip()
        if full_name:
            update_doc["full_name"] = full_name

    if update_doc:
        await db[USERS_COLLECTION].update_one(
            {"_id": ObjectId(user["_id"])}, {"$set": update_doc}
        )

    return await get_current_user(db, user["_id"])


async def submit_instructor_application(
    db: AsyncIOMotorDatabase, user_id: str, data: InstructorApplicationSchema
) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)

    if user.get("role") == "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admins cannot apply")
    if user.get("role") == "instructor":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Already an instructor")

    existing_application = user.get("instructor_application") or {}
    if existing_application.get("status") == "pending":
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Application already pending")

    application_doc = data.model_dump(exclude_unset=True, exclude_none=True, by_alias=True)
    application_doc["status"] = "pending"
    application_doc["submitted_at"] = datetime.utcnow()

    await db[USERS_COLLECTION].update_one(
        {"_id": ObjectId(user["_id"])}, {"$set": {"instructor_application": application_doc}}
    )

    return await get_current_user(db, user["_id"])


async def promote_to_instructor(db: AsyncIOMotorDatabase, user_id: str) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    application = user.get("instructor_application")
    if not application:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No instructor application found")

    instructor_data = {
        "degree": application.get("degree"),
        "institution": application.get("institution"),
        "years_of_experience": application.get("experience"),
        "specializations": application.get("specializations", []),
        "certifications": application.get("certifications", []),
        "linkedIn": application.get("linkedIn"),
        "portfolio": application.get("portfolio"),
        "courses_created": 0,
        "total_students": 0,
        "average_rating": 0.0,
    }

    update_doc = {
        "role": "instructor",
        "instructor_application.status": "approved",
        "instructor_data": instructor_data,
    }

    await db[USERS_COLLECTION].update_one(
        {"_id": ObjectId(user["_id"])}, {"$set": update_doc}
    )

    return await get_current_user(db, user["_id"])


async def approve_instructor(db: AsyncIOMotorDatabase, user_id: str) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    application = user.get("instructor_application") or {}
    if application.get("status") != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Instructor application must be pending",
        )

    return await promote_to_instructor(db, user["_id"])
