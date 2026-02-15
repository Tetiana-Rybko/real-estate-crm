from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column,relationship

from app.db.base import Base


class Client(Base):
    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    full_name: Mapped[str] = mapped_column(String(200))
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    email: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
        unique=True,
        index=True,
    )

    # опционально: комментарий риелтора
    note: Mapped[str | None] = mapped_column(String(500), nullable=True)

    deals = relationship("Deal", back_populates="client")
    properties = relationship("Property", back_populates="owner")
