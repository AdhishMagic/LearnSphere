from __future__ import annotations

from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, Field

from app.schemas.quiz_schema import QuizQuestionSchema, QuizRewardsSchema


class CurriculumItemSchema(BaseModel):
    id: Optional[str] = None
    title: Optional[str] = None
    type: Optional[Literal["video", "document", "quiz", "image"]] = None
    duration: Optional[str] = None
    content: Optional[str] = None
    description: Optional[str] = None
    isFree: Optional[bool] = Field(default=None, alias="is_free")
    questions: Optional[List[QuizQuestionSchema]] = None
    rewards: Optional[QuizRewardsSchema] = None

    class Config:
        populate_by_name = True
        extra = "ignore"


class CourseCreate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    thumbnail: Optional[str] = None
    description: Optional[str] = None
    instructor: Optional[str] = None
    website: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    requirements: List[str] = Field(default_factory=list)
    outcomes: List[str] = Field(default_factory=list)
    visibility: Optional[str] = None
    access: Optional[str] = None
    price: float = 0.0
    isPublished: bool = Field(default=False, alias="is_published")
    curriculum: List[CurriculumItemSchema] = Field(default_factory=list)

    class Config:
        populate_by_name = True
        extra = "ignore"


class CourseUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    thumbnail: Optional[str] = None
    description: Optional[str] = None
    instructor: Optional[str] = None
    website: Optional[str] = None
    tags: Optional[List[str]] = None
    requirements: Optional[List[str]] = None
    outcomes: Optional[List[str]] = None
    visibility: Optional[str] = None
    access: Optional[str] = None
    price: Optional[float] = None
    isPublished: Optional[bool] = Field(default=None, alias="is_published")
    curriculum: Optional[List[CurriculumItemSchema]] = None

    class Config:
        populate_by_name = True
        extra = "ignore"


class CourseResponse(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: Optional[str] = None
    subtitle: Optional[str] = None
    thumbnail: Optional[str] = None
    description: Optional[str] = None
    instructor: Optional[str] = Field(default=None, alias="instructor_id")
    website: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    requirements: List[str] = Field(default_factory=list)
    outcomes: List[str] = Field(default_factory=list)
    visibility: Optional[str] = None
    access: Optional[str] = None
    price: float = 0.0
    isPublished: bool = Field(default=False, alias="is_published")
    curriculum: List[CurriculumItemSchema] = Field(default_factory=list)
    createdAt: Optional[datetime] = Field(default=None, alias="created_at")
    updatedAt: Optional[datetime] = Field(default=None, alias="updated_at")

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda dt: dt.isoformat()}
