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

    user_doc = {
        "full_name": register_data.fullName,
        "email": register_data.email.lower(),
        "password_hash": hash_password(register_data.password),
        "role": role,
        "created_at": datetime.utcnow(),
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
    if existing:
        return

    admin_doc = {
        "full_name": "Admin",
        "email": admin_email,
        "password_hash": hash_password(admin_password),
        "role": "admin",
        "created_at": datetime.utcnow(),
    }
    await db[USERS_COLLECTION].insert_one(admin_doc)
