from __future__ import annotations

from fastapi import FastAPI, Request
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.core.config import settings


async def connect(app: FastAPI) -> None:
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    app.state.mongo_client = client
    app.state.db = client[settings.DATABASE_NAME]


async def close(app: FastAPI) -> None:
    client: AsyncIOMotorClient | None = getattr(app.state, "mongo_client", None)
    if client is not None:
        client.close()
    app.state.mongo_client = None
    app.state.db = None


def get_database(request: Request) -> AsyncIOMotorDatabase:
    db: AsyncIOMotorDatabase | None = getattr(request.app.state, "db", None)
    if db is None:
        raise RuntimeError("Database not initialized")
    return db
