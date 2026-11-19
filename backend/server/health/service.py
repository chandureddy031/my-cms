from __future__ import annotations

from typing import Any

from psycopg_pool import ConnectionPool

from server.database import DatabaseUnavailable

PING_TIMEOUT_SECONDS = 5


def database_status(pool: ConnectionPool) -> str:
    """"ok" when the database answers a trivial query, otherwise "down"."""
    try:
        with pool.connection(timeout=PING_TIMEOUT_SECONDS) as conn:
            conn.execute("SELECT 1")
        return "ok"
    except DatabaseUnavailable:
        return "down"


def health_report(database: str, admin_ready: bool) -> dict[str, Any]:
    return {"ok": database == "ok", "api": "ok", "database": database, "admin": admin_ready}
