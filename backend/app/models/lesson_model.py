from __future__ import annotations

from typing import Optional

from datetime import datetime

from pydantic import BaseModel, Field


class LessonModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    course_id: str
    title: Optional[str] = None
    type: Optional[str] = None
    duration: Optional[str] = None
    content_url: Optional[str] = None
    file_name: Optional[str] = None
    file_size: Optional[int] = None
    description: Optional[str] = None
    is_free: bool = False
    allow_download: bool = False
    order: int = 0
    status: str = "draft"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda dt: dt.isoformat()}
