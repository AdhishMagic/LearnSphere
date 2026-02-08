from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class UploadSessionCreateSchema(BaseModel):
    courseId: str = Field(..., alias="course_id")
    lessonId: str = Field(..., alias="lesson_id")
    fileName: str = Field(..., alias="file_name")
    fileSize: int = Field(..., alias="file_size")
    mimeType: str = Field(..., alias="mime_type")

    class Config:
        populate_by_name = True
        extra = "ignore"


class UploadSessionResponseSchema(BaseModel):
    sessionId: str = Field(..., alias="session_id")
    status: str
    receivedBytes: int = Field(..., alias="received_bytes")
    fileSize: int = Field(..., alias="file_size")
    expiresAt: Optional[datetime] = Field(default=None, alias="expires_at")

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda dt: dt.isoformat()}


class UploadChunkResponseSchema(BaseModel):
    sessionId: str = Field(..., alias="session_id")
    receivedBytes: int = Field(..., alias="received_bytes")

    class Config:
        populate_by_name = True


class UploadSessionCompleteSchema(BaseModel):
    checksum: Optional[str] = None


class UploadCompleteResponseSchema(BaseModel):
    sessionId: str = Field(..., alias="session_id")
    attachmentId: str = Field(..., alias="attachment_id")
    status: str

    class Config:
        populate_by_name = True
