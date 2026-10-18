import asyncio
import os
import sys
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from app.core.config import settings
from app.core.database import engine, Base
import app.models  # load models for metadata

def ensure_postgres_database():
    """Connects to postgres template db and ensures wellness_db exists."""
    user = settings.DB_USER
    password = settings.DB_PASSWORD
    host = settings.DB_HOST
    port = settings.DB_PORT
    dbname = settings.DB_NAME

    print(f"Connecting to PostgreSQL at {host}:{port} as user '{user}'...")
    try:
        conn = psycopg2.connect(
            dbname="postgres",
            user=user,
            password=password,
            host=host,
            port=port
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        cursor.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{dbname}';")
        exists = cursor.fetchone()
        if not exists:
            print(f"Database '{dbname}' does not exist. Creating it now...")
            cursor.execute(f'CREATE DATABASE "{dbname}";')
            print(f"Database '{dbname}' created successfully.")
        else:
            print(f"Database '{dbname}' already exists.")
            
        cursor.close()
        conn.close()
        return True
    except Exception as e:
        print(f"PostgreSQL connection error: {e}")
        return False

async def create_tables():
    print("Creating tables using SQLAlchemy metadata...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("All tables successfully verified / created in database.")

if __name__ == "__main__":
    db_ok = ensure_postgres_database()
    if db_ok:
        asyncio.run(create_tables())
        print("Database initialization complete.")
    else:
        print("Database initialization could not complete. Check DB_PASSWORD in backend/.env")
        sys.exit(1)
