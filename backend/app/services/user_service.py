from __future__ import annotations

from datetime import datetime
from typing import Any, Dict, Optional

from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.auth_schema import RegisterRequest
from app.utils.security import hash_password, verify_password

USERS_COLLECTION = "users"


async def ensure_user_indexes(db: AsyncIOMotorDatabase) -> None:
    await db[USERS_COLLECTION].create_index("email", unique=True)


async def get_user_by_email(db: AsyncIOMotorDatabase, email: str) -> Optional[Dict[str, Any]]:
    return await db[USERS_COLLECTION].find_one({"email": email.lower()})


async def create_user(db: AsyncIOMotorDatabase, register_data: RegisterRequest, role: str = "learner") -> Dict[str, Any]:
    existing = await get_user_by_email(db, register_data.email)
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    full_name = register_data.fullName.strip()
    name_parts = [part for part in full_name.split() if part]
    first_name = name_parts[0] if name_parts else ""
    last_name = " ".join(name_parts[1:]) if len(name_parts) > 1 else ""
    now = datetime.utcnow()

    user_doc = {
        "full_name": full_name,
        "first_name": first_name,
        "last_name": last_name,
        "email": register_data.email.lower(),
        "password_hash": hash_password(register_data.password),
        "phone": None,
        "avatar": None,
        "bio": None,
        "location": None,
        "role": role,
        "joined_date": now,
        "created_at": now,
        "total_points": 0,
        "instructor_application": None,
        "instructor_data": None,
        "admin_level": None,
        "permissions": None,
    }

    result = await db[USERS_COLLECTION].insert_one(user_doc)
    user_doc["_id"] = str(result.inserted_id)
    return user_doc


async def authenticate_user(db: AsyncIOMotorDatabase, email: str, password: str) -> Dict[str, Any]:
    user = await get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    if not verify_password(password, user.get("password_hash", "")):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    user["_id"] = str(user.get("_id"))
    return user


async def ensure_admin_user(db: AsyncIOMotorDatabase) -> None:
    admin_email = "admin@gmail.com"
    admin_password = "Admin@123"
    existing = await get_user_by_email(db, admin_email)

    now = datetime.utcnow()
    admin_doc = {
        "full_name": "Admin",
        "first_name": "Admin",
        "last_name": "",
        "email": admin_email,
        "password_hash": hash_password(admin_password),
        "phone": None,
        "avatar": None,
        "bio": None,
        "location": None,
        "role": "admin",
        "joined_date": now,
        "created_at": now,
        "total_points": 0,
        "instructor_application": None,
        "instructor_data": None,
        "admin_level": "Admin",
        "permissions": [],
    }

    if existing:
        await db[USERS_COLLECTION].update_one(
            {"_id": existing["_id"]},
            {
                "$set": {
                    "full_name": existing.get("full_name") or admin_doc["full_name"],
                    "first_name": existing.get("first_name") or admin_doc["first_name"],
                    "last_name": existing.get("last_name") or admin_doc["last_name"],
                    "phone": existing.get("phone") if existing.get("phone") is not None else admin_doc["phone"],
                    "avatar": existing.get("avatar") if existing.get("avatar") is not None else admin_doc["avatar"],
                    "bio": existing.get("bio") if existing.get("bio") is not None else admin_doc["bio"],
                    "location": existing.get("location") if existing.get("location") is not None else admin_doc["location"],
                    "role": admin_doc["role"],
                    "joined_date": existing.get("joined_date") or admin_doc["joined_date"],
                    "total_points": existing.get("total_points", 0),
                    "instructor_application": existing.get("instructor_application"),
                    "instructor_data": existing.get("instructor_data"),
                    "admin_level": existing.get("admin_level") or admin_doc["admin_level"],
                    "permissions": existing.get("permissions") if existing.get("permissions") is not None else admin_doc["permissions"],
                }
            },
        )
        return

    await db[USERS_COLLECTION].insert_one(admin_doc)
