"""add task to activity_type enum

Revision ID: d20fe046dcf0
Revises: bc80db1735ac
Create Date: 2026-03-06 22:11:50.105075
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd20fe046dcf0'
down_revision = 'bc80db1735ac'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'task'")


def downgrade():
    pass