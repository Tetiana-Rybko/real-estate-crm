from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.db.session import get_db
from app.models.activity import Activity
from app.schemas.activity import ActivityCreate,ActivityRead,ActivityUpdate
router = APIRouter(prefix="/activities", tags=["activities"])


@router.get('/', response_model=list[ActivityRead])
def list_activities(
    user_id: int | None = None,
    client_id: int | None = None,
    deal_id: int | None = None,
    property_id: int | None = None,
    task_id: int | None = None,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    if limit > 100:
        limit = 100

    query = select(Activity)

    if user_id is not None:
        query = query.where(Activity.user_id == user_id)
    if client_id is not None:
        query = query.where(Activity.client_id == client_id)
    if deal_id is not None:
        query = query.where(Activity.deal_id == deal_id)
    if property_id is not None:
        query = query.where(Activity.property_id == property_id)
    if task_id is not None:
        query = query.where(Activity.task_id == task_id)

    query = query.order_by(Activity.created_at.desc()).limit(limit)

    activities = db.scalars(query).all()
    return activities
@router.get('/{activity_id}', response_model=ActivityRead)
def get_activity(activity_id: int, db: Session = Depends(get_db)):
    activity = db.get(Activity, activity_id)
    if activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")
    return activity
@router.post('/', response_model=ActivityRead,status_code=201)
def create_activity(payload: ActivityCreate, db: Session = Depends(get_db)):
    activity = Activity(**payload.model_dump())
    db.add(activity)
    db.commit()
    db.refresh(activity)
    return activity
@router.delete('/{activity_id}')
def delete_activity(activity_id: int, db: Session = Depends(get_db)):
    activity = db.get(Activity, activity_id)
    if activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")

    db.delete(activity)
    db.commit()
    return {"status": "deleted"}

@router.put('/{activity_id}', response_model=ActivityRead)
def update_activity(
    activity_id: int,
    payload: ActivityUpdate,
    db: Session = Depends(get_db),
):
    activity = db.get(Activity, activity_id)
    if activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(activity, key, value)

    db.commit()
    db.refresh(activity)
    return activity