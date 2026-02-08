from __future__ import annotations

from datetime import datetime
from typing import Any, Dict, List, Optional, Tuple

from bson import ObjectId
from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from pymongo import UpdateOne

from app.schemas.course_schema import CourseCreate, CourseUpdate, CurriculumItemSchema
from app.services.profile_service import get_current_user

COURSES_COLLECTION = "courses"
LESSONS_COLLECTION = "lessons"
QUIZZES_COLLECTION = "quizzes"
QUIZ_QUESTIONS_COLLECTION = "quiz_questions"
ENROLLMENTS_COLLECTION = "enrollments"
UPLOAD_SESSIONS_COLLECTION = "upload_sessions"
LESSON_ATTACHMENTS_COLLECTION = "lesson_attachments"
UPLOAD_CHUNKS_COLLECTION = "upload_chunks"


def _object_id(value: str) -> ObjectId:
    if not ObjectId.is_valid(value):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid id")
    return ObjectId(value)


def _maybe_object_id(value: Any) -> Optional[ObjectId]:
    if value is None:
        return None
    value_str = str(value)
    if ObjectId.is_valid(value_str):
        return ObjectId(value_str)
    return None


def _require_instructor_or_admin(user: Dict[str, Any]) -> None:
    if user.get("role") not in {"instructor", "admin"}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Instructor access required")


def _ensure_course_owner(user: Dict[str, Any], course: Dict[str, Any]) -> None:
    if user.get("role") == "admin":
        return
    if str(course.get("instructor_id")) != str(user.get("_id")):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized for this course")


def _map_course_fields(payload: Dict[str, Any]) -> Dict[str, Any]:
    field_map = {
        "title": "title",
        "subtitle": "subtitle",
        "thumbnail": "thumbnail",
        "description": "description",
        "website": "website",
        "tags": "tags",
        "requirements": "requirements",
        "outcomes": "outcomes",
        "visibility": "visibility",
        "access": "access",
        "price": "price",
        "is_published": "is_published",
    }

    update_doc: Dict[str, Any] = {}
    for key, value in payload.items():
        if key not in field_map:
            continue
        update_doc[field_map[key]] = value

    return update_doc


def _split_curriculum(curriculum: List[Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
    lessons: List[Dict[str, Any]] = []
    quizzes: List[Dict[str, Any]] = []
    for item in curriculum:
        if item.get("type") == "quiz":
            quizzes.append(item)
        else:
            lessons.append(item)
    return lessons, quizzes


async def create_course(db: AsyncIOMotorDatabase, user_id: str, data: CourseCreate) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    now = datetime.utcnow()
    payload = data.model_dump(by_alias=True, exclude_unset=True)
    course_doc = _map_course_fields(payload)
    is_published = payload.get("is_published", False)
    course_doc.update(
        {
            "instructor_id": ObjectId(user["_id"]),
            "is_published": is_published,
            "status": "published" if is_published else "draft",
            "created_at": now,
            "updated_at": now,
        }
    )

    result = await db[COURSES_COLLECTION].insert_one(course_doc)
    course_id = str(result.inserted_id)

    curriculum = payload.get("curriculum", [])
    if curriculum:
        await save_curriculum(db, course_id, curriculum)

    return await get_course(db, course_id, user)


async def ensure_course_indexes(db: AsyncIOMotorDatabase) -> None:
    await db[COURSES_COLLECTION].create_index("instructor_id")
    await db[LESSONS_COLLECTION].create_index("course_id")
    await db[QUIZZES_COLLECTION].create_index("course_id")
    await db[QUIZ_QUESTIONS_COLLECTION].create_index("quiz_id")
    await db[UPLOAD_SESSIONS_COLLECTION].create_index("lesson_id")
    await db[UPLOAD_SESSIONS_COLLECTION].create_index("status")
    await db[UPLOAD_SESSIONS_COLLECTION].create_index("created_at", expireAfterSeconds=60 * 60 * 24)
    await db[LESSON_ATTACHMENTS_COLLECTION].create_index("lesson_id")
    await db[LESSON_ATTACHMENTS_COLLECTION].create_index("status")
    await db[UPLOAD_CHUNKS_COLLECTION].create_index("session_id")
    await db[UPLOAD_CHUNKS_COLLECTION].create_index("created_at", expireAfterSeconds=60 * 60 * 24)
    await db[UPLOAD_CHUNKS_COLLECTION].create_index([("session_id", 1), ("chunk_index", 1)], unique=True)
    await db[ENROLLMENTS_COLLECTION].create_index([("user_id", 1), ("course_id", 1)], unique=True)


async def get_course(
    db: AsyncIOMotorDatabase, course_id: str, current_user: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    course_obj_id = _object_id(course_id)
    course = await db[COURSES_COLLECTION].find_one({"_id": course_obj_id})
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    if current_user:
        _require_instructor_or_admin(current_user)
        _ensure_course_owner(current_user, course)

    lessons = db[LESSONS_COLLECTION]
    quizzes = db[QUIZZES_COLLECTION]

    lesson_docs = await lessons.find({"course_id": course_obj_id}).sort("order", 1).to_list(None)
    quiz_docs = await quizzes.find({"course_id": course_obj_id}).sort("order", 1).to_list(None)

    quiz_ids = [quiz["_id"] for quiz in quiz_docs]
    questions_map: Dict[str, List[Dict[str, Any]]] = {}
    if quiz_ids:
        question_docs = await db[QUIZ_QUESTIONS_COLLECTION].find({"quiz_id": {"$in": quiz_ids}}).to_list(None)
        for question in question_docs:
            quiz_id = str(question["quiz_id"])
            questions_map.setdefault(quiz_id, []).append(
                {
                    "id": str(question.get("_id")),
                    "text": question.get("text"),
                    "options": question.get("options", []),
                    "correctAnswer": question.get("correct_answer"),
                }
            )

    curriculum: List[Dict[str, Any]] = []
    for lesson in lesson_docs:
        curriculum.append(
            {
                "id": str(lesson.get("_id")),
                "title": lesson.get("title"),
                "type": lesson.get("type"),
                "duration": lesson.get("duration"),
                "content": lesson.get("content_url") or lesson.get("content"),
                "description": lesson.get("description"),
                "isFree": lesson.get("is_free", False),
                "uploadSessionId": str(lesson.get("upload_session_id"))
                if lesson.get("upload_session_id")
                else None,
                "attachmentId": str(lesson.get("attachment_id"))
                if lesson.get("attachment_id")
                else None,
                "order": lesson.get("order", 0),
            }
        )

    for quiz in quiz_docs:
        curriculum.append(
            {
                "id": str(quiz.get("_id")),
                "title": quiz.get("title"),
                "type": "quiz",
                "description": quiz.get("description"),
                "order": quiz.get("order", 0),
                "rewards": quiz.get("rewards"),
                "questions": questions_map.get(str(quiz.get("_id")), []),
            }
        )

    curriculum_sorted = sorted(curriculum, key=lambda item: item.get("order", 0))

    course["_id"] = str(course.get("_id"))
    course["instructor_id"] = str(course.get("instructor_id"))
    course["curriculum"] = curriculum_sorted

    return course


async def update_course(
    db: AsyncIOMotorDatabase, course_id: str, user_id: str, data: CourseUpdate
) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    course_obj_id = _object_id(course_id)
    course = await db[COURSES_COLLECTION].find_one({"_id": course_obj_id})
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    _ensure_course_owner(user, course)

    payload = data.model_dump(by_alias=True, exclude_unset=True)
    curriculum = payload.pop("curriculum", None)

    update_doc = _map_course_fields(payload)
    if "is_published" in update_doc:
        update_doc["status"] = "published" if update_doc["is_published"] else "draft"
    if update_doc:
        update_doc["updated_at"] = datetime.utcnow()
        await db[COURSES_COLLECTION].update_one({"_id": course_obj_id}, {"$set": update_doc})

    if curriculum is not None:
        await db[COURSES_COLLECTION].update_one(
            {"_id": course_obj_id}, {"$set": {"updated_at": datetime.utcnow()}}
        )
        await save_curriculum(db, course_id, curriculum)

    return await get_course(db, course_id, user)


async def list_courses_by_instructor(db: AsyncIOMotorDatabase, user_id: str) -> List[Dict[str, Any]]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    query: Dict[str, Any] = {}
    if user.get("role") != "admin":
        query["instructor_id"] = _object_id(user["_id"])

    courses = await db[COURSES_COLLECTION].find(query).sort("updated_at", -1).to_list(None)
    response: List[Dict[str, Any]] = []
    for course in courses:
        course["_id"] = str(course.get("_id"))
        course["instructor_id"] = str(course.get("instructor_id"))
        course.setdefault("curriculum", [])
        response.append(course)
    return response


async def save_curriculum(
    db: AsyncIOMotorDatabase, course_id: str, curriculum: List[Dict[str, Any]]
) -> None:
    course_obj_id = _object_id(course_id)

    try:
        async with await db.client.start_session() as session:
            async with session.start_transaction():
                lessons_payload, quizzes_payload = _split_curriculum(curriculum)
                lesson_ids = await upsert_lessons(db, course_obj_id, lessons_payload, session)
                quiz_ids = await upsert_quizzes(db, course_obj_id, quizzes_payload, session)

                await delete_removed_items(db, course_obj_id, lesson_ids, quiz_ids, session)
    except Exception as exc:
        message = str(exc)
        if "Transaction numbers are only allowed" not in message and "replica set" not in message:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Unable to save curriculum transaction",
            ) from exc

        lessons_payload, quizzes_payload = _split_curriculum(curriculum)
        lesson_ids = await upsert_lessons(db, course_obj_id, lessons_payload, None)
        quiz_ids = await upsert_quizzes(db, course_obj_id, quizzes_payload, None)
        await delete_removed_items(db, course_obj_id, lesson_ids, quiz_ids, None)


async def upsert_lessons(
    db: AsyncIOMotorDatabase,
    course_obj_id: ObjectId,
    lessons: List[Dict[str, Any]],
    session=None,
) -> List[ObjectId]:
    existing_ids = {
        doc["_id"]
        for doc in await db[LESSONS_COLLECTION]
        .find({"course_id": course_obj_id}, {"_id": 1})
        .to_list(None)
    }
    lesson_ids: List[ObjectId] = []
    update_ops: List[UpdateOne] = []
    insert_docs: List[Dict[str, Any]] = []

    for index, item in enumerate(lessons):
        if not item.get("title") or not item.get("type"):
            continue
        item_schema = CurriculumItemSchema(**item)
        lesson_id = _maybe_object_id(item_schema.id or item.get("_id"))
        lesson_doc = {
            "course_id": course_obj_id,
            "title": item_schema.title,
            "type": item_schema.type,
            "duration": item_schema.duration,
            "content_url": item_schema.content,
            "description": item_schema.description,
            "is_free": bool(item_schema.isFree),
            "order": index,
        }

        if lesson_id:
            if lesson_id not in existing_ids:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Lesson does not belong to this course",
                )
            update_ops.append(
                UpdateOne(
                    {"_id": lesson_id, "course_id": course_obj_id},
                    {"$set": lesson_doc},
                )
            )
            lesson_ids.append(lesson_id)
        else:
            insert_docs.append(lesson_doc)

    if update_ops:
        await db[LESSONS_COLLECTION].bulk_write(update_ops, session=session)

    if insert_docs:
        result = await db[LESSONS_COLLECTION].insert_many(insert_docs, session=session)
        lesson_ids.extend(result.inserted_ids)

    return lesson_ids


async def upsert_quizzes(
    db: AsyncIOMotorDatabase,
    course_obj_id: ObjectId,
    quizzes: List[Dict[str, Any]],
    session=None,
) -> List[ObjectId]:
    existing_ids = {
        doc["_id"]
        for doc in await db[QUIZZES_COLLECTION]
        .find({"course_id": course_obj_id}, {"_id": 1})
        .to_list(None)
    }
    quiz_ids: List[ObjectId] = []
    update_ops: List[UpdateOne] = []
    insert_docs: List[Dict[str, Any]] = []
    quiz_question_payloads: List[Tuple[ObjectId, List[Dict[str, Any]]]] = []

    for index, item in enumerate(quizzes):
        if not item.get("title") or not item.get("type"):
            continue
        item_schema = CurriculumItemSchema(**item)
        quiz_id = _maybe_object_id(item_schema.id or item.get("_id"))
        quiz_doc = {
            "course_id": course_obj_id,
            "title": item_schema.title,
            "description": item_schema.description,
            "order": index,
            "rewards": item_schema.rewards.model_dump() if item_schema.rewards else None,
        }

        questions = item_schema.questions or []

        if quiz_id:
            if quiz_id not in existing_ids:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Quiz does not belong to this course",
                )
            update_ops.append(
                UpdateOne(
                    {"_id": quiz_id, "course_id": course_obj_id},
                    {"$set": quiz_doc},
                )
            )
            quiz_ids.append(quiz_id)
            quiz_question_payloads.append((quiz_id, [q.model_dump(by_alias=True) for q in questions]))
        else:
            insert_docs.append(quiz_doc)
            quiz_question_payloads.append((None, [q.model_dump(by_alias=True) for q in questions]))

    if update_ops:
        await db[QUIZZES_COLLECTION].bulk_write(update_ops, session=session)

    if insert_docs:
        result = await db[QUIZZES_COLLECTION].insert_many(insert_docs, session=session)
        inserted_ids = list(result.inserted_ids)
        quiz_ids.extend(inserted_ids)

        insert_index = 0
        updated_payloads: List[Tuple[ObjectId, List[Dict[str, Any]]]] = []
        for quiz_id, payload in quiz_question_payloads:
            if quiz_id is None:
                resolved_id = inserted_ids[insert_index]
                insert_index += 1
                updated_payloads.append((resolved_id, payload))
            else:
                updated_payloads.append((quiz_id, payload))
        quiz_question_payloads = updated_payloads

    for quiz_id, questions in quiz_question_payloads:
        if quiz_id is None:
            continue
        await upsert_quiz_questions(db, course_obj_id, quiz_id, questions, session)

    return quiz_ids


async def upsert_quiz_questions(
    db: AsyncIOMotorDatabase,
    course_obj_id: ObjectId,
    quiz_id: ObjectId,
    questions: List[Dict[str, Any]],
    session=None,
) -> None:
    existing_ids = {
        doc["_id"]
        for doc in await db[QUIZ_QUESTIONS_COLLECTION]
        .find({"quiz_id": quiz_id}, {"_id": 1})
        .to_list(None)
    }
    question_ids: List[ObjectId] = []
    update_ops: List[UpdateOne] = []
    insert_docs: List[Dict[str, Any]] = []

    for question in questions:
        if not question.get("text") or not question.get("options"):
            continue
        question_id = _maybe_object_id(question.get("id") or question.get("_id"))
        question_doc = {
            "course_id": course_obj_id,
            "quiz_id": quiz_id,
            "text": question.get("text"),
            "options": question.get("options", []),
            "correct_answer": question.get("correct_answer"),
        }

        if question_id:
            if question_id not in existing_ids:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Question does not belong to this quiz",
                )
            update_ops.append(
                UpdateOne(
                    {"_id": question_id, "quiz_id": quiz_id},
                    {"$set": question_doc},
                )
            )
            question_ids.append(question_id)
        else:
            insert_docs.append(question_doc)

    if update_ops:
        await db[QUIZ_QUESTIONS_COLLECTION].bulk_write(update_ops, session=session)

    if insert_docs:
        result = await db[QUIZ_QUESTIONS_COLLECTION].insert_many(insert_docs, session=session)
        question_ids.extend(result.inserted_ids)

    await delete_removed_questions(db, quiz_id, question_ids, session)


async def delete_removed_questions(
    db: AsyncIOMotorDatabase,
    quiz_id: ObjectId,
    question_ids: List[ObjectId],
    session=None,
) -> None:
    filter_doc: Dict[str, Any] = {"quiz_id": quiz_id}
    if question_ids:
        filter_doc["_id"] = {"$nin": question_ids}
    await db[QUIZ_QUESTIONS_COLLECTION].delete_many(filter_doc, session=session)


async def delete_removed_items(
    db: AsyncIOMotorDatabase,
    course_obj_id: ObjectId,
    lesson_ids: List[ObjectId],
    quiz_ids: List[ObjectId],
    session=None,
) -> None:
    lesson_filter: Dict[str, Any] = {"course_id": course_obj_id}
    if lesson_ids:
        lesson_filter["_id"] = {"$nin": lesson_ids}
    await db[LESSONS_COLLECTION].delete_many(lesson_filter, session=session)

    quiz_filter: Dict[str, Any] = {"course_id": course_obj_id}
    if quiz_ids:
        quiz_filter["_id"] = {"$nin": quiz_ids}
    await db[QUIZZES_COLLECTION].delete_many(quiz_filter, session=session)

    question_filter: Dict[str, Any] = {"course_id": course_obj_id}
    if quiz_ids:
        question_filter["quiz_id"] = {"$nin": quiz_ids}
    await db[QUIZ_QUESTIONS_COLLECTION].delete_many(question_filter, session=session)


async def publish_course(db: AsyncIOMotorDatabase, course_id: str, user_id: str) -> Dict[str, Any]:
    user = await get_current_user(db, user_id)
    _require_instructor_or_admin(user)

    course_obj_id = _object_id(course_id)
    course = await db[COURSES_COLLECTION].find_one({"_id": course_obj_id})
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    _ensure_course_owner(user, course)

    await db[COURSES_COLLECTION].update_one(
        {"_id": course_obj_id},
        {"$set": {"is_published": True, "status": "published", "updated_at": datetime.utcnow()}},
    )

    return await get_course(db, course_id, user)
