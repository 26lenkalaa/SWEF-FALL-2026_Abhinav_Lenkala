"""Auth routes.

POST /api/auth/login     -> JWT if username/password match (401 otherwise)
GET  /api/auth/me        -> protected, 401 without a valid token
POST /api/auth/signup    -> stores a pending account and emails Abhi
GET  /api/auth/approve   -> link from the email; activates the account
GET  /api/auth/deny      -> link from the email; discards the request
"""
import hmac
import re
from datetime import datetime, timezone
from html import escape

from flask import Blueprint, g, jsonify, request
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer
from werkzeug.security import check_password_hash, generate_password_hash

import store
from auth_utils import create_access_token, require_auth
from config import APPROVAL_LINK_MAX_AGE, BACKEND_URL, FRONTEND_URL, JWT_SECRET, USERS
from emailer import send_signup_request

auth_bp = Blueprint("auth", __name__)
_signer = URLSafeTimedSerializer(JWT_SECRET, salt="signup-approval")
USERNAME_RE = re.compile(r"^[a-z0-9_]{3,20}$")


def _display_name(username):
    if username in USERS:
        return USERS[username]["display_name"]
    status, record = store.find(username)
    return record["display_name"] if status == "approved" else None


@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    username = str(data.get("username", "")).strip().lower()
    password = str(data.get("password", ""))

    if not username or not password:
        return jsonify({"error": "Enter your username and password."}), 400

    bad = (jsonify({"error": "That username and password don't match."}), 401)

    if username in USERS:
        # compare_digest avoids leaking info through timing differences
        if not hmac.compare_digest(USERS[username]["password"], password):
            return bad
        return jsonify({"access_token": create_access_token(username), "token_type": "bearer"})

    status, record = store.find(username)
    if record is None or not check_password_hash(record["password_hash"], password):
        return bad
    if status == "pending":
        return jsonify({"error": "Your account hasn't been approved yet. Try again once Abhi lets you in."}), 403

    return jsonify({"access_token": create_access_token(username), "token_type": "bearer"})


@auth_bp.get("/me")
@require_auth
def me():
    name = _display_name(g.username)
    if name is None:  # token for an account that no longer exists
        return jsonify({"error": "Account not found"}), 401

    return jsonify({
        "message": f"Welcome, {name}!",
        "username": g.username,
        "display_name": name,
        # Only logged-in users get this; it comes from the server, not the bundle
        "secret_fact": "Spurs have won the FA Cup 8 times, and the Europa League in 2025. COYS!",
    })


@auth_bp.post("/signup")
def signup():
    data = request.get_json(silent=True) or {}
    display_name = str(data.get("name", "")).strip()
    username = str(data.get("username", "")).strip().lower()
    password = str(data.get("password", ""))
    note = str(data.get("note", "")).strip()

    if not 1 <= len(display_name) <= 60:
        return jsonify({"error": "Tell me your name (up to 60 characters)."}), 400
    if not USERNAME_RE.match(username):
        return jsonify({"error": "Usernames are 3–20 characters: lowercase letters, numbers or _."}), 400
    if len(password) < 8:
        return jsonify({"error": "Use a password with at least 8 characters."}), 400
    if len(note) > 300:
        return jsonify({"error": "Keep the note under 300 characters."}), 400

    record = {
        "display_name": display_name,
        "password_hash": generate_password_hash(password),
        "note": note,
        "requested_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }
    if username in USERS or not store.add_pending(username, record):
        return jsonify({"error": "That username is taken. Try another one."}), 409

    token = _signer.dumps(username)
    send_signup_request(
        display_name,
        username,
        note,
        approve_url=f"{BACKEND_URL}/api/auth/approve?token={token}",
        deny_url=f"{BACKEND_URL}/api/auth/deny?token={token}",
    )
    return jsonify({"message": "Request sent."}), 202


def _page(title, body, status=200):
    html = f"""<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(title)}</title></head>
<body style="margin:0;background:#0e163e;color:#f0dede;font:16px/1.6 system-ui,sans-serif">
<main style="max-width:32rem;padding:4rem 1.25rem">
<h1 style="font-size:1.5rem;margin:0 0 .5rem">{escape(title)}</h1>
<p style="margin:0 0 1.5rem;opacity:.8">{body}</p>
<a href="{FRONTEND_URL}/login" style="color:#f0dede">Go to the site</a>
</main></body></html>"""
    return html, status, {"Content-Type": "text/html; charset=utf-8"}


def _username_from_link():
    try:
        return _signer.loads(request.args.get("token", ""), max_age=APPROVAL_LINK_MAX_AGE), None
    except SignatureExpired:
        return None, _page("Link expired", "This request is more than 7 days old. They can sign up again.", 400)
    except BadSignature:
        return None, _page("Invalid link", "This approval link isn't valid.", 400)


@auth_bp.get("/approve")
def approve():
    username, error = _username_from_link()
    if error:
        return error
    record = store.approve(username)
    if record is None:
        return _page("Already handled", f"There's no pending request for <b>{escape(username)}</b>.")
    return _page("Approved", f"<b>{escape(record['display_name'])}</b> can now log in as <b>{escape(username)}</b>.")


@auth_bp.get("/deny")
def deny():
    username, error = _username_from_link()
    if error:
        return error
    record = store.deny(username)
    if record is None:
        return _page("Already handled", f"There's no pending request for <b>{escape(username)}</b>.")
    return _page("Request denied", f"The request for <b>{escape(username)}</b> was deleted.")
