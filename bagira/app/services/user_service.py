from sqlalchemy import select
from fastapi import HTTPException

from app.models.user import User, UserRole


async def create_user(db, data):
    if data.role == UserRole.ADMIN:
        existing_admin = await db.scalar(
            select(User).where(User.role == UserRole.ADMIN)
        )
        if existing_admin:
            raise HTTPException(
                status_code=400,
                detail="Admin already exists"
            )

    user = User(**data.model_dump())
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user