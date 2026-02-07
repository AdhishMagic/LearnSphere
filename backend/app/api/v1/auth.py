from __future__ import annotations

from fastapi import APIRouter, Depends, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.schemas.auth_schema import LoginRequest, LoginResponse, PublicUser, RegisterRequest
from app.services.user_service import authenticate_user, create_user
from app.utils.jwt import create_access_token

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=PublicUser)
async def register_user(
    payload: RegisterRequest, db: AsyncIOMotorDatabase = Depends(get_database)
) -> PublicUser:
    user = await create_user(db, payload)
    return PublicUser(**user)


@router.post("/login", response_model=LoginResponse)
async def login_user(
    payload: LoginRequest, db: AsyncIOMotorDatabase = Depends(get_database)
) -> LoginResponse:
    user = await authenticate_user(db, payload.email, payload.password)
    access_token = create_access_token({"sub": user["_id"], "email": user["email"]})
    return LoginResponse(access_token=access_token, role=user["role"])


@router.get("/login")
async def login_help() -> dict:
    return {"message": "Use POST /api/v1/auth/login"}
