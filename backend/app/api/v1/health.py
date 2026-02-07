from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_database

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check(db: AsyncIOMotorDatabase = Depends(get_database)):
    try:
        await db.command("ping")
        return {"status": "ok"}
    except Exception:
        return {"status": "error"}
