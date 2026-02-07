from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class UserModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    full_name: str
    email: str
    password_hash: str
    role: str = "learner"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda dt: dt.isoformat()}
