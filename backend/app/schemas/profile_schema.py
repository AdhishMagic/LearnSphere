from __future__ import annotations

from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, EmailStr, Field


class InstructorApplicationSchema(BaseModel):
    degree: Optional[str] = None
    institution: Optional[str] = None
    experience: Optional[str] = None
    specializations: List[str] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    linkedIn: Optional[str] = None
    portfolio: Optional[str] = None
    status: Optional[Literal["pending", "approved", "rejected"]] = None
    submittedAt: Optional[datetime] = Field(default=None, alias="submitted_at")

    class Config:
        populate_by_name = True
        extra = "ignore"
        json_encoders = {datetime: lambda dt: dt.isoformat()}


class InstructorDataSchema(BaseModel):
    degree: Optional[str] = None
    institution: Optional[str] = None
    yearsOfExperience: Optional[str] = Field(default=None, alias="years_of_experience")
    specializations: List[str] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    linkedIn: Optional[str] = None
    portfolio: Optional[str] = None
    coursesCreated: int = Field(default=0, alias="courses_created")
    totalStudents: int = Field(default=0, alias="total_students")
    averageRating: float = Field(default=0.0, alias="average_rating")

    class Config:
        populate_by_name = True


class UserPublicSchema(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    firstName: Optional[str] = Field(default=None, alias="first_name")
    lastName: Optional[str] = Field(default=None, alias="last_name")
    email: EmailStr
    phone: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    role: Literal["learner", "instructor", "admin"]
    joinedDate: Optional[datetime] = Field(default=None, alias="joined_date")
    totalPoints: int = Field(default=0, alias="total_points")
    instructorApplication: Optional[InstructorApplicationSchema] = Field(
        default=None, alias="instructor_application"
    )
    instructorData: Optional[InstructorDataSchema] = Field(default=None, alias="instructor_data")
    adminLevel: Optional[str] = Field(default=None, alias="admin_level")
    permissions: Optional[List[str]] = None

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda dt: dt.isoformat()}


class UpdateProfileSchema(BaseModel):
    firstName: Optional[str] = Field(default=None, min_length=1)
    lastName: Optional[str] = Field(default=None, min_length=1)
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None

    class Config:
        extra = "ignore"


class InstructorApprovalSchema(BaseModel):
    userId: str
    status: Literal["approved"] = "approved"
