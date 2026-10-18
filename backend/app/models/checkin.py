import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, ForeignKey, JSON, String, Text
from sqlalchemy.orm import relationship

# Import the shared Base from the models package
from app.models.base import Base


class CheckInLog(Base):
    """A single check‑in entry for a user."""

    __tablename__ = "check_in_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(
        String(36),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    source_type = Column(String(50), default="direct_text")  # direct_text, txt_file, csv_file, pdf_file
    source_filename = Column(String(255), nullable=True)
    raw_text = Column(Text, nullable=False)
    preprocessed_text = Column(Text, nullable=False)
    vader_scores = Column(JSON, nullable=False)  # {"pos": ..., "neg": ..., "neu": ..., "compound": ...}
    sentiment_tag = Column(String(50), nullable=False)  # Positive, Neutral, Negative
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        index=True,
    )

    # Back‑reference to the owning user
    user = relationship("User", back_populates="check_ins")
