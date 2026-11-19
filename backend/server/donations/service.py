from __future__ import annotations

from typing import Any

from psycopg import Connection

from server.donations.constants import MAX_LIST_LIMIT
from server.donations.schemas import DonationIn


def create_donation(conn: Connection, donation: DonationIn) -> dict[str, Any]:
    """Stores a pledge (names and causes trimmed); returns its id and time."""
    return conn.execute(
        "INSERT INTO donations (name,email,amount,cause,message) VALUES (%s,%s,%s,%s,%s) RETURNING id, created_at",
        (donation.name.strip(), str(donation.email), donation.amount, donation.cause.strip(), donation.message),
    ).fetchone()


def list_donations(conn: Connection, limit: int) -> list[dict[str, Any]]:
    """Newest first; `limit` is clamped to 1…MAX_LIST_LIMIT."""
    return conn.execute(
        "SELECT * FROM donations ORDER BY created_at DESC LIMIT %s", (max(1, min(limit, MAX_LIST_LIMIT)),)
    ).fetchall()
