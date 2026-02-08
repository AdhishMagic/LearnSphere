from __future__ import annotations

from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field


class LessonCreateSchema(BaseModel):
    courseId: str = Field(..., alias="course_id")
    title: Optional[str] = None
    type: Optional[Literal["video", "document", "image"]] = None
    description: Optional[str] = None
    allowDownload: bool = Field(default=False, alias="allow_download")

    class Config:
        populate_by_name = True
        extra = "ignore"


class LessonUpdateSchema(BaseModel):
    title: Optional[str] = None
    type: Optional[Literal["video", "document", "image"]] = None
    description: Optional[str] = None
    allowDownload: Optional[bool] = Field(default=None, alias="allow_download")

    class Config:
        populate_by_name = True
        extra = "ignore"


class LessonSchema(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    courseId: str = Field(..., alias="course_id")
    title: Optional[str] = None
    type: Optional[Literal["video", "document", "image"]] = None
    duration: Optional[str] = None
    contentUrl: Optional[str] = Field(default=None, alias="content_url")
    fileName: Optional[str] = Field(default=None, alias="file_name")
    fileSize: Optional[int] = Field(default=None, alias="file_size")
        uploadSessionId: Optional[str] = Field(default=None, alias="upload_session_id")
        attachmentId: Optional[str] = Field(default=None, alias="attachment_id")
    description: Optional[str] = None
    isFree: bool = Field(default=False, alias="is_free")
    order: int = 0
    allowDownload: bool = Field(default=False, alias="allow_download")
    status: str = "draft"
    createdAt: Optional[datetime] = Field(default=None, alias="created_at")
    updatedAt: Optional[datetime] = Field(default=None, alias="updated_at")

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda dt: dt.isoformat()}
