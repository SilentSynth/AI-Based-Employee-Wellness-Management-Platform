from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from app.core.database import get_db
from app.models.user import User
from app.models.checkin import CheckInLog
from app.schemas.checkin import InitialEmotionReport, CheckInResponse, VaderScores
from app.api.deps import get_current_user

router = APIRouter(prefix="/analytics", tags=["Baseline Analytics"])

@router.get("/emotion-report", response_model=InitialEmotionReport)
async def get_initial_emotion_report(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Computes baseline emotion metrics from PostgreSQL check-in logs for the current user.
    """
    stmt = (
        select(CheckInLog)
        .where(CheckInLog.user_id == current_user.id)
        .order_by(desc(CheckInLog.created_at))
    )
    result = await db.execute(stmt)
    logs: List[CheckInLog] = result.scalars().all()

    total = len(logs)
    if total == 0:
        return InitialEmotionReport(
            overall_sentiment_tag="Neutral",
            average_scores=VaderScores(neg=0.0, neu=1.0, pos=0.0, compound=0.0),
            latest_submission=None,
            total_submissions=0,
            positive_count=0,
            neutral_count=0,
            negative_count=0,
            history=[]
        )

    # Compute aggregation
    pos_sum = 0.0
    neg_sum = 0.0
    neu_sum = 0.0
    compound_sum = 0.0

    pos_count = 0
    neu_count = 0
    neg_count = 0

    for log in logs:
        scores = log.vader_scores or {}
        pos_sum += scores.get("pos", 0.0)
        neg_sum += scores.get("neg", 0.0)
        neu_sum += scores.get("neu", 0.0)
        compound_sum += scores.get("compound", 0.0)

        tag = log.sentiment_tag
        if tag == "Positive":
            pos_count += 1
        elif tag == "Negative":
            neg_count += 1
        else:
            neu_count += 1

    avg_pos = round(pos_sum / total, 4)
    avg_neg = round(neg_sum / total, 4)
    avg_neu = round(neu_sum / total, 4)
    avg_compound = round(compound_sum / total, 4)

    # Overall tag determination based on average compound score
    if avg_compound >= 0.05:
        overall_tag = "Positive"
    elif avg_compound <= -0.05:
        overall_tag = "Negative"
    else:
        overall_tag = "Neutral"

    return InitialEmotionReport(
        overall_sentiment_tag=overall_tag,
        average_scores=VaderScores(
            neg=avg_neg,
            neu=avg_neu,
            pos=avg_pos,
            compound=avg_compound
        ),
        latest_submission=CheckInResponse.model_validate(logs[0]),
        total_submissions=total,
        positive_count=pos_count,
        neutral_count=neu_count,
        negative_count=neg_count,
        history=[CheckInResponse.model_validate(log) for log in logs]
    )
