from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class CourseModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    subtitle: Optional[str] = None
    thumbnail: Optional[str] = None
    description: Optional[str] = None
    instructor_id: str
    website: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    requirements: List[str] = Field(default_factory=list)
    outcomes: List[str] = Field(default_factory=list)
    visibility: Optional[str] = None
    access: Optional[str] = None
    price: float = 0.0
    is_published: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda dt: dt.isoformat()}
