from __future__ import annotations

from typing import List, Optional

from pydantic import BaseModel, Field


class QuizRewardsSchema(BaseModel):
    first: int = 0
    second: int = 0
    third: int = 0
    fourth: int = 0


class QuizQuestionSchema(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    quizId: Optional[str] = Field(default=None, alias="quiz_id")
    text: Optional[str] = None
    options: List[str] = Field(default_factory=list)
    correctAnswer: Optional[int] = Field(default=None, alias="correct_answer")

    class Config:
        populate_by_name = True


class QuizSchema(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    courseId: Optional[str] = Field(default=None, alias="course_id")
    title: Optional[str] = None
    description: Optional[str] = None
    order: int = 0
    rewards: Optional[QuizRewardsSchema] = None
    questions: List[QuizQuestionSchema] = Field(default_factory=list)

    class Config:
        populate_by_name = True
