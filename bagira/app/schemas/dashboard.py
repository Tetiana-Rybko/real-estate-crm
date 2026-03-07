from pydantic import BaseModel

from app.schemas.activity import ActivityRead
from app.schemas.deal import DealOut
from app.schemas.task import TaskRead


class DashboardOut(BaseModel):
    deals: list[DealOut]
    tasks: list[TaskRead]
    overdue_tasks: list[TaskRead]
    recent_activity: list[ActivityRead]