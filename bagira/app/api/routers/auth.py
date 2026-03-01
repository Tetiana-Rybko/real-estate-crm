from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select,func
from sqlalchemy.orm import Session

from app.core.security import hash_password, verify_password, create_access_token
from app.db.session import get_db
from app.models.user import User,UserRole

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
def register(
    full_name: str,
    email: str,
    password: str,
    db: Session = Depends(get_db),
):
    existing = db.scalar(select(User).where(User.email == email))
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    count_users = db.scalar(select(func.count()).select_from(User)) or 0
    role = UserRole.OWNER if count_users == 0 else UserRole.AGENT

    user = User(
        full_name=full_name,
        email=email,
        hashed_password=hash_password(password),
        role=role,
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return {"status": "ok"}


@router.post("/token")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = db.scalar(select(User).where(User.email == form_data.username))
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    token = create_access_token({"sub": str(user.id), "email": user.email,"role":user.role.value})
    return {"access_token": token, "token_type": "bearer"}