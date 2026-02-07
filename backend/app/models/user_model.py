from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class InstructorApplicationModel(BaseModel):
    degree: Optional[str] = None
    institution: Optional[str] = None
    experience: Optional[str] = None
    specializations: List[str] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    linkedIn: Optional[str] = None
    portfolio: Optional[str] = None
    status: Optional[str] = None
    submitted_at: Optional[datetime] = None


class InstructorDataModel(BaseModel):
    degree: Optional[str] = None
    institution: Optional[str] = None
    years_of_experience: Optional[str] = None
    specializations: List[str] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    linkedIn: Optional[str] = None
    portfolio: Optional[str] = None
    courses_created: int = 0
    total_students: int = 0
    average_rating: float = 0.0


class UserModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    full_name: Optional[str] = None
    email: str
    password_hash: str
    phone: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    role: str = "learner"
    joined_date: datetime = Field(default_factory=datetime.utcnow)
    created_at: Optional[datetime] = None
    total_points: int = 0
    instructor_application: Optional[InstructorApplicationModel] = None
    instructor_data: Optional[InstructorDataModel] = None
    admin_level: Optional[int] = None
    permissions: Optional[List[str]] = None

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda dt: dt.isoformat()}
