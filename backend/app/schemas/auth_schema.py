from __future__ import annotations

from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    fullName: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: Literal["bearer"] = "bearer"
    role: Literal["admin", "instructor", "learner"]


class PublicUser(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    full_name: str
    email: EmailStr
    role: Literal["admin", "instructor", "learner"]
    created_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda dt: dt.isoformat()}
