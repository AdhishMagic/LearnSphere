from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.health import router as health_router
from app.api.v1.auth import router as auth_router
from app.api.v1.profile import router as profile_router
from app.core.database import close, connect
from app.services.user_service import ensure_admin_user, ensure_user_indexes


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect(app)
    await ensure_user_indexes(app.state.db)
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


@app.get("/")
async def root():
    return {"status": "running"}
