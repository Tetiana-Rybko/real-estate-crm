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
    # Эта миграция уже "применена" в БД (она стоит в alembic_version),
    # файл нужен только чтобы Alembic мог найти ревизию.
    pass


def downgrade() -> None:
    pass