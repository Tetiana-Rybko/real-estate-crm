from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.task import Task
from app.models.activity import Activity,ActivityType,ActivityStatus
from app.schemas.task import TaskCreate, TaskRead, TaskUpdate,TaskStatus
from app.schemas.activity import ActivityRead

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/", response_model=list[TaskRead])
def list_tasks(db: Session = Depends(get_db)):
    tasks = db.scalars(select(Task).order_by(Task.created_at.desc())).all()
    return tasks


@router.get("/{task_id}", response_model=TaskRead)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.post("/", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    task = Task(**payload.model_dump())

    db.add(task)
    db.commit()
    db.refresh(task)

    activity = Activity(
        type=ActivityType.task,
        status=ActivityStatus.done,
        note=f"Створено задачу: {task.title}",
        user_id=task.user_id,
        client_id=task.client_id,
        deal_id=task.deal_id,
        property_id=task.property_id,
        task_id=task.id,
    )

    db.add(activity)
    db.commit()

    return task


@router.put("/{task_id}", response_model=TaskRead)
def update_task(task_id: int, payload: TaskUpdate, db: Session = Depends(get_db)):
    task = db.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    old_status = task.status

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)

    if old_status != TaskStatus.done and task.status == TaskStatus.done:
        existing_activity = db.scalars(
            select(Activity).where(Activity.task_id == task.id)
        ).first()

        if existing_activity is None:
            activity = Activity(
                type=ActivityType.task,
                status=ActivityStatus.done,
                note=f"Task completed: {task.title}",
                user_id=task.user_id,
                client_id=task.client_id,
                deal_id=task.deal_id,
                property_id=task.property_id,
                task_id=task.id,
            )
            db.add(activity)
            db.commit()

    db.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"status": "deleted"}

@router.get("/{task_id}/timeline", response_model=list[ActivityRead])
def get_task_timeline(
    task_id: int,
    db: Session = Depends(get_db),
):
    activities = db.scalars(
        select(Activity)
        .where(Activity.task_id == task_id)
        .order_by(Activity.created_at.desc())
    ).all()

    return activities