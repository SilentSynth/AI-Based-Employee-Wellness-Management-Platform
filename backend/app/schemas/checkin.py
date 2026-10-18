from datetime import datetime
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class CheckInCreate(BaseModel):
    text: str = Field(..., min_length=1, description="Direct text input for manual check-in")

class VaderScores(BaseModel):
    neg: float
    neu: float
    pos: float
    compound: float

class CheckInResponse(BaseModel):
    id: str
    user_id: str
    source_type: str
    source_filename: Optional[str] = None
    raw_text: str
    preprocessed_text: str
    vader_scores: Dict[str, float]
    sentiment_tag: str
    created_at: datetime

    class Config:
        from_attributes = True

class InitialEmotionReport(BaseModel):
    overall_sentiment_tag: str  # Positive, Neutral, Negative
    average_scores: VaderScores
    latest_submission: Optional[CheckInResponse] = None
    total_submissions: int
    positive_count: int
    neutral_count: int
    negative_count: int
    history: List[CheckInResponse]
