from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.db.session import get_db
from app.models.user import User

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/")
def list_users(db: Session = Depends(get_db)):
    users = db.scalars(select(User)).all()
    return users