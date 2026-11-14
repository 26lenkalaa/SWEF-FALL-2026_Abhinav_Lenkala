"""Tiny JSON-file store for signed-up accounts (stand-in until we learn databases).

Shape of data/accounts.json:
    {"pending":  {username: record},
     "approved": {username: record}}
record = {"display_name", "password_hash", "note", "requested_at"}
"""
import json
import threading
from pathlib import Path

DATA_FILE = Path(__file__).parent / "data" / "accounts.json"
_lock = threading.Lock()


def _load() -> dict:
    if not DATA_FILE.exists():
        return {"pending": {}, "approved": {}}
    with DATA_FILE.open() as f:
        data = json.load(f)
    data.setdefault("pending", {})
    data.setdefault("approved", {})
    return data


def _save(data: dict) -> None:
    DATA_FILE.parent.mkdir(exist_ok=True)
    tmp = DATA_FILE.with_suffix(".tmp")
    tmp.write_text(json.dumps(data, indent=2))
    tmp.replace(DATA_FILE)


def find(username: str):
    """Return ("pending" | "approved", record) or (None, None)."""
    with _lock:
        data = _load()
    for status in ("approved", "pending"):
        if username in data[status]:
            return status, data[status][username]
    return None, None


def add_pending(username: str, record: dict) -> bool:
    """Store a sign-up request. False if the username is already taken."""
    with _lock:
        data = _load()
        if username in data["pending"] or username in data["approved"]:
            return False
        data["pending"][username] = record
        _save(data)
        return True


def approve(username: str):
    with _lock:
        data = _load()
        record = data["pending"].pop(username, None)
        if record is None:
            return None
        data["approved"][username] = record
        _save(data)
        return record


def deny(username: str):
    with _lock:
        data = _load()
        record = data["pending"].pop(username, None)
        if record is not None:
            _save(data)
        return record
