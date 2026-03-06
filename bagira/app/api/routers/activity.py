from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.db.session import get_db
from app.models.activity import Activity

router = APIRouter(prefix="/activities", tags=["activities"])


@router.get("/")
def list_activities(db: Session = Depends(get_db)):
    activities = db.scalars(select(Activity)).all()
    return activities
@router.post("/")
def create_activity(db: Session = Depends(get_db)):
    activity = Activity()
    db.add(activity)
    db.commit()
    db.refresh(activity)
    return activity