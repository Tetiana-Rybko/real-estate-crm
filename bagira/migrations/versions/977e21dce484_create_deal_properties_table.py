"""create deal_properties table

Revision ID: 977e21dce484
Revises: 591e80f4b5d0
Create Date: 2026-03-07 21:59:41.977969
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '977e21dce484'
down_revision = '591e80f4b5d0'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'deal_properties',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('deal_id', sa.Integer(), nullable=False),
        sa.Column('property_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['deal_id'], ['deals.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['property_id'], ['properties.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('deal_id', 'property_id', name='uq_deal_property'),
    )
    op.create_index(op.f('ix_deal_properties_id'), 'deal_properties', ['id'], unique=False)
    op.create_index(op.f('ix_deal_properties_deal_id'), 'deal_properties', ['deal_id'], unique=False)
    op.create_index(op.f('ix_deal_properties_property_id'), 'deal_properties', ['property_id'], unique=False)


def downgrade():
    op.drop_index(op.f('ix_deal_properties_property_id'), table_name='deal_properties')
    op.drop_index(op.f('ix_deal_properties_deal_id'), table_name='deal_properties')
    op.drop_index(op.f('ix_deal_properties_id'), table_name='deal_properties')
    op.drop_table('deal_properties')