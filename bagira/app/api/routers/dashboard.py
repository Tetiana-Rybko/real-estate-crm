from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.db.session import get_db
from app.models.user import User
from app.models.task import Task, TaskStatus
from app.models.deal import Deal
from app.models.activity import Activity
from app.api.deps import get_current_user
from app.schemas.dashboard import DashboardOut

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/",response_model=DashboardOut)
def dashboard(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    # мои сделки
    deals = db.scalars(
        select(Deal).where(Deal.realtor_id == user.id)
    ).all()

    # мои задачи
    tasks = db.scalars(
        select(Task).where(Task.user_id == user.id)
    ).all()

    # просроченные задачи
    overdue_tasks = db.scalars(
        select(Task).where(
            Task.user_id == user.id,
            Task.status != TaskStatus.done,
        )
    ).all()

    # последние активности
    activities = db.scalars(
        select(Activity)
        .where(Activity.user_id == user.id)
        .order_by(Activity.created_at.desc())
        .limit(10)
    ).all()

    return {
        "deals": deals,
        "tasks": tasks,
        "overdue_tasks": overdue_tasks,
        "recent_activity": activities,
    }