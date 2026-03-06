from fastapi import APIRouter

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/")
def list_tasks():
    return {"status": "tasks router working"}