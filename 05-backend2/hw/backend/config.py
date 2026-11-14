"""Backend-only configuration.

Credentials are hardcoded here because we haven't covered databases yet.
They live ONLY on the server -- the React app never sees them.
Secrets and email settings come from backend/.env (never committed).
"""
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

# Secret used to sign JWTs and approval links. Override in .env for anything real.
JWT_SECRET = os.environ.get("JWT_SECRET", "dev-secret-change-me-spurs-coys")
JWT_ALGORITHM = "HS256"
TOKEN_EXPIRES_MINUTES = 60

# Built-in accounts. People who sign up are stored in data/accounts.json
# once they're approved (passwords hashed).
USERS = {
    "abhi": {
        "password": "coys2026",
        "display_name": "Abhi",
    },
    "guest": {
        "password": "northeastern",
        "display_name": "Guest",
    },
}

# --- Sign-up approval email ---
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "")
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
# Where the approve/deny links in the email point (the Flask server itself)
BACKEND_URL = os.environ.get("BACKEND_URL", "http://localhost:8000")
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")
APPROVAL_LINK_MAX_AGE = 7 * 24 * 3600  # seconds
