import os
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.user import User
from app.models.checkin import CheckInLog
from app.schemas.checkin import CheckInCreate, CheckInResponse
from app.api.deps import get_current_user
from app.nlp.preprocessor import preprocessor
from app.nlp.vader_engine import vader_engine

router = APIRouter(prefix="/checkin", tags=["Text Ingestion & Sentiment"])

@router.post("/text", response_model=CheckInResponse, status_code=status.HTTP_201_CREATED)
async def submit_direct_text(
    payload: CheckInCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Accepts manual direct text feedback/check-in."""
    raw = payload.text
    cleaned = preprocessor.clean_text(raw)
    if not cleaned:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Provided check-in text is empty after preprocessing."
        )

    # Run VADER sentiment analysis
    scores, sentiment_tag, _ = vader_engine.analyze(cleaned)

    # Persist log to PostgreSQL
    log_entry = CheckInLog(
        user_id=current_user.id,
        source_type="direct_text",
        source_filename=None,
        raw_text=raw,
        preprocessed_text=cleaned,
        vader_scores=scores,
        sentiment_tag=sentiment_tag
    )
    db.add(log_entry)
    await db.commit()
    await db.refresh(log_entry)

    return CheckInResponse.model_validate(log_entry)

@router.post("/upload", response_model=CheckInResponse, status_code=status.HTTP_201_CREATED)
async def upload_checkin_file(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Accepts .txt, .csv, or .pdf file for ingestion."""
    filename = file.filename or "unknown"
    ext = os.path.splitext(filename)[1].lower()

    if ext not in [".txt", ".csv", ".pdf"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{ext}'. Only .txt, .csv, and .pdf are supported."
        )

    try:
        content_bytes = await file.read()
        if len(content_bytes) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty."
            )

        if ext == ".txt":
            raw_text = preprocessor.extract_from_txt(content_bytes)
            source_type = "txt_file"
        elif ext == ".csv":
            raw_text = preprocessor.extract_from_csv(content_bytes)
            source_type = "csv_file"
        elif ext == ".pdf":
            raw_text = preprocessor.extract_from_pdf(content_bytes)
            source_type = "pdf_file"
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format.")

        cleaned = preprocessor.clean_text(raw_text)
        if not cleaned:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No readable text could be extracted from the uploaded file."
            )

        scores, sentiment_tag, _ = vader_engine.analyze(cleaned)

        log_entry = CheckInLog(
            user_id=current_user.id,
            source_type=source_type,
            source_filename=filename,
            raw_text=raw_text[:10000],  # prevent unbounded storage if huge
            preprocessed_text=cleaned[:10000],
            vader_scores=scores,
            sentiment_tag=sentiment_tag
        )
        db.add(log_entry)
        await db.commit()
        await db.refresh(log_entry)

        return CheckInResponse.model_validate(log_entry)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process file: {str(e)}"
        )
