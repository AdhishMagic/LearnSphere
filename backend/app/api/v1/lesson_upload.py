from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.schemas.lesson_schema import LessonCreateSchema, LessonUpdateSchema
from app.services.lesson_service import create_lesson, get_lesson, publish_lesson, update_lesson
from app.services.profile_service import get_current_user
from app.utils.jwt import decode_access_token

router = APIRouter(prefix="/api/v1/lessons", tags=["lessons"])

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


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_draft_lesson(
    payload: LessonCreateSchema,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> dict:
    return await create_lesson(db=db, user_id=str(current_user.get("_id")), payload=payload)


@router.get("/{lesson_id}")
async def get_lesson_detail(
    lesson_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> dict:
    return await get_lesson(db=db, lesson_id=lesson_id, user_id=str(current_user.get("_id")))


@router.patch("/{lesson_id}")
async def update_lesson_detail(
    lesson_id: str,
    payload: LessonUpdateSchema,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> dict:
    return await update_lesson(db=db, lesson_id=lesson_id, user_id=str(current_user.get("_id")), payload=payload)


@router.post("/{lesson_id}/publish")
async def publish_lesson_detail(
    lesson_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> dict:
    return await publish_lesson(db=db, lesson_id=lesson_id, user_id=str(current_user.get("_id")))
