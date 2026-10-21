import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.core.database import engine, Base
from app.api.routes_auth import router as auth_router
from app.api.routes_checkin import router as checkin_router
from app.api.routes_analytics import router as analytics_router
from app.nlp.vader_engine import vader_engine

# Configure console logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Run startup and shutdown tasks."""
    # Ensure VADER lexicon is present
    vader_engine._ensure_vader_lexicon()
    # Initialize database tables
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database schema verified / initialized.")
    except Exception as e:
        logger.error(f"Database connection/initialization error: {e}")
    yield
    await engine.dispose()

app = FastAPI(
    title="MoodMentor API",
    description="Intelligent emotional sentiment insights and confidential reflection telemetry for employee wellness.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS configuration – must be added before routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(auth_router, prefix=settings.API_V1_STR)          # /api/v1/auth
app.include_router(checkin_router, prefix=settings.API_V1_STR)      # /api/v1/checkin
app.include_router(analytics_router, prefix=settings.API_V1_STR)    # /api/v1/analytics

# Global exception handlers
@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    """Return JSON for unexpected errors while preserving CORS headers."""
    logger.exception("Unhandled exception: %s", exc)
    return JSONResponse(status_code=500, content={"detail": str(exc)})

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Return JSON for FastAPI HTTPExceptions."""
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})

# Health endpoints
@app.get("/", response_model=dict)
async def root():
    return {"status": "ok"}

@app.get("/health", response_model=dict)
async def health():
    return {"status": "ok"}
