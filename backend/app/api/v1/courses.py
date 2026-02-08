from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database
from app.schemas.course_schema import CourseCreate, CourseResponse, CourseUpdate
from app.services.course_service import (
    create_course,
    get_course,
    list_courses_by_instructor,
    publish_course,
    update_course,
)
from app.services.profile_service import get_current_user
from app.utils.jwt import decode_access_token

router = APIRouter(prefix="/api/v1/courses", tags=["courses"])

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


@router.post("", response_model=CourseResponse, response_model_by_alias=False)
async def create_course_endpoint(
    payload: CourseCreate,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> CourseResponse:
    course = await create_course(db, current_user["_id"], payload)
    return CourseResponse(**course)


@router.get("/instructor/me", response_model=list[CourseResponse], response_model_by_alias=False)
async def list_courses_endpoint(
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> list[CourseResponse]:
    courses = await list_courses_by_instructor(db, current_user["_id"])
    return [CourseResponse(**course) for course in courses]


@router.get("/{course_id}", response_model=CourseResponse, response_model_by_alias=False)
async def get_course_endpoint(
    course_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> CourseResponse:
    course = await get_course(db, course_id, current_user)
    return CourseResponse(**course)


@router.patch("/{course_id}", response_model=CourseResponse, response_model_by_alias=False)
async def update_course_endpoint(
    course_id: str,
    payload: CourseUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> CourseResponse:
    course = await update_course(db, course_id, current_user["_id"], payload)
    return CourseResponse(**course)


@router.post("/{course_id}/publish", response_model=CourseResponse, response_model_by_alias=False)
async def publish_course_endpoint(
    course_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    current_user: dict = Depends(get_authenticated_user),
) -> CourseResponse:
    course = await publish_course(db, course_id, current_user["_id"])
    return CourseResponse(**course)
