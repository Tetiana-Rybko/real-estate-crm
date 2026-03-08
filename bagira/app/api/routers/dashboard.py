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


@router.get("/", response_model=DashboardOut)
def dashboard(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    # всі угоди агента
    deals = db.scalars(
        select(Deal).where(Deal.realtor_id == user.id)
    ).all()

    deals_total = len(deals)

    deals_won = len([d for d in deals if d.status.value == "won"])
    deals_lost = len([d for d in deals if d.status.value == "lost"])

    conversion_rate = 0
    if deals_total > 0:
        conversion_rate = round((deals_won / deals_total) * 100, 2)

    # задачі
    tasks = db.scalars(
        select(Task).where(Task.user_id == user.id)
    ).all()

    tasks_total = len(tasks)

    tasks_overdue = len([
        t for t in tasks
        if t.status != TaskStatus.done
    ])

    # останні активності
    activities = db.scalars(
        select(Activity)
        .where(Activity.user_id == user.id)
        .order_by(Activity.created_at.desc())
        .limit(10)
    ).all()

    return {
        "deals_total": deals_total,
        "deals_won": deals_won,
        "deals_lost": deals_lost,
        "conversion_rate": conversion_rate,
        "tasks_total": tasks_total,
        "tasks_overdue": tasks_overdue,
        "recent_activity": activities,
    }