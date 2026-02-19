"""create clients table

Revision ID: dbd1b0295eae
Revises:
Create Date: 2026-02-02
"""

from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa  # noqa: F401

# revision identifiers, used by Alembic.
revision: str = "dbd1b0295eae"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "clients",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("full_name", sa.String(length=255), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("phone", sa.String(length=50), nullable=True),
        sa.Column("note", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
    )
    op.create_index("ix_clients_id", "clients", ["id"])
    op.create_index("ix_clients_email", "clients", ["email"])

def downgrade() -> None:
    op.drop_index("ix_clients_email", table_name="clients")
    op.drop_index("ix_clients_id", table_name="clients")
    op.drop_table("clients")