"""add task_id to activities

Revision ID: 591e80f4b5d0
Revises: d20fe046dcf0
Create Date: 2026-03-07 20:00:15.094042
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '591e80f4b5d0'
down_revision = 'd20fe046dcf0'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        'activities',
        sa.Column('task_id', sa.Integer(), nullable=True),
    )
    op.create_index(
        op.f('ix_activities_task_id'),
        'activities',
        ['task_id'],
        unique=False,
    )
    op.create_foreign_key(
        'fk_activities_task_id_tasks',
        'activities',
        'tasks',
        ['task_id'],
        ['id'],
        ondelete='SET NULL',
    )


def downgrade():
    op.drop_constraint(
        'fk_activities_task_id_tasks',
        'activities',
        type_='foreignkey',
    )
    op.drop_index(
        op.f('ix_activities_task_id'),
        table_name='activities',
    )
    op.drop_column('activities', 'task_id')