from future import annotations

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class DealProperty(Base):
    tablename = "deal_properties"
    table_args = (
        UniqueConstraint("deal_id", "property_id", name="uq_deal_property"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    deal_id: Mapped[int] = mapped_column(ForeignKey("deals.id", ondelete="CASCADE"), nullable=False, index=True)
    property_id: Mapped[int] = mapped_column(ForeignKey("properties.id", ondelete="CASCADE"), nullable=False, index=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    deal: Mapped["Deal"] = relationship(back_populates="links")
    property: Mapped["Property"] = relationship(back_populates="links")
