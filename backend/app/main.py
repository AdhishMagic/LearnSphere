from __future__ import annotations

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.health import router as health_router
from app.api.v1.auth import router as auth_router
from app.api.v1.profile import router as profile_router
from app.api.v1.courses import router as courses_router
from app.api.v1.uploads import router as uploads_router
from app.api.v1.lesson_upload import router as lesson_upload_router
from app.core.database import close, connect
from app.services.user_service import ensure_admin_user, ensure_user_indexes
from app.services.course_service import ensure_course_indexes


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect(app)
    await ensure_user_indexes(app.state.db)
    await ensure_course_indexes(app.state.db)
    await ensure_admin_user(app.state.db)
    try:
        yield
    finally:
        await close(app)


app = FastAPI(title="LearnSphere Backend", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(courses_router)
app.include_router(uploads_router)
app.include_router(lesson_upload_router)

UPLOADS_DIR = Path(__file__).resolve().parents[1] / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")


@app.get("/")
async def root():
    return {"status": "running"}
