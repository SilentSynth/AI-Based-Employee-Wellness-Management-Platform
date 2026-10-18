import uuid
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.models.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="employee", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # One‑to‑many relationship to check‑in logs
    check_ins = relationship(
        "CheckInLog", back_populates="user", cascade="all, delete-orphan"
    )