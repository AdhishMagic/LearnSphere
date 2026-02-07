from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.schemas.profile_schema import (
    InstructorApplicationSchema,
    UpdateProfileSchema,
    UserPublicSchema,
)
from app.services.profile_service import (
    approve_instructor,
    get_current_user,
    submit_instructor_application,
    update_personal_info,
)
from app.utils.jwt import decode_access_token

router = APIRouter(prefix="/api/v1/profile", tags=["profile"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


async def get_authenticated_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncIOMotorDatabase = Depends(get_database),
) -> dict:
    payload = decode_access_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return await get_current_user(db, str(user_id))


@router.get(
    "/me",
    response_model=UserPublicSchema,
    response_model_by_alias=False,
)
async def read_profile(current_user: dict = Depends(get_authenticated_user)) -> UserPublicSchema:
    return UserPublicSchema(**current_user)


@router.patch(
    "/me",
    response_model=UserPublicSchema,
    response_model_by_alias=False,
)
async def update_profile(
    payload: UpdateProfileSchema,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> UserPublicSchema:
    user = await update_personal_info(db, current_user["_id"], payload)
    return UserPublicSchema(**user)


@router.post(
    "/instructor/apply",
    response_model=UserPublicSchema,
    response_model_by_alias=False,
)
async def apply_instructor(
    payload: InstructorApplicationSchema,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> UserPublicSchema:
    user = await submit_instructor_application(db, current_user["_id"], payload)
    return UserPublicSchema(**user)


@router.post(
    "/instructor/approve/{user_id}",
    response_model=UserPublicSchema,
    response_model_by_alias=False,
)
async def approve_instructor_application(
    user_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> UserPublicSchema:
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")

    user = await approve_instructor(db, user_id)
    return UserPublicSchema(**user)
