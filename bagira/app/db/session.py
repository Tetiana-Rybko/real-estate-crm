from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

# если у тебя уже есть Settings/настройки — позже подключим их сюда.
# пока берём DATABASE_URL из переменных окружения контейнера
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg://bagira:bagira_password@db:5432/bagira")

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
