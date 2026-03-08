from pydantic import BaseModel

from app.schemas.activity import ActivityRead


class DashboardOut(BaseModel):
    deals_total: int
    deals_won: int
    deals_lost: int
    conversion_rate: float
    tasks_total: int
    tasks_overdue: int
    recent_activity: list[ActivityRead]