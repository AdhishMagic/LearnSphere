from __future__ import annotations

from typing import Dict, List, Optional

from pydantic import BaseModel, Field


class QuizModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    course_id: str
    title: str
    description: Optional[str] = None
    order: int = 0
    rewards: Optional[Dict[str, int]] = None

    class Config:
        populate_by_name = True


class QuizQuestionModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    quiz_id: str
    text: str
    options: List[str] = Field(default_factory=list)
    correct_answer: int

    class Config:
        populate_by_name = True
