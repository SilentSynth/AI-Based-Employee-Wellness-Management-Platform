# MoodMentor

**AI-Based Employee Wellness Management Platform**

MoodMentor is an intelligent emotional sentiment and confidential reflection telemetry platform built to support workplace well-being, facilitate reflective check-ins, and surface actionable emotional health trends.

---

## 🛠 Tech Stack

- **Backend**: Python 3.11+, FastAPI, SQLAlchemy (Async), PostgreSQL / Supabase, Pydantic v2, NLTK (VADER Sentiment Engine), Pandas & OpenPyXL (Document & Spreadsheet ingestion).
- **Frontend**: Next.js 14 (App Router), React 18, Vanilla CSS Design System, Lucide React icons.
- **Security & Auth**: JWT (jose), bcrypt password hashing, CORS Middleware.

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

#### Run Database Initializer & FastAPI Dev Server:
```bash
# Verify schema & tables
python init_db.py

# Start Uvicorn server
uvicorn app.main:app --reload --port 8000
```
- API Documentation (Swagger UI): `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
- Frontend Web App: `http://localhost:3000`

---

## 🔒 Confidentiality & Privacy

MoodMentor is engineered to support individuals, not monitor them. Submissions are encrypted, personal reflections are private, and sentiment telemetry is anonymized and aggregated to foster healthy organizational support.
