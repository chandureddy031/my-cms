from __future__ import annotations

from collections.abc import Mapping

from psycopg import Connection

from server.site.constants import MAX_VALUE_LENGTH, SITE_KEYS


def get_settings(conn: Connection) -> dict[str, str]:
    return {row["key"]: row["value"] for row in conn.execute("SELECT key, value FROM settings")}


def save_settings(conn: Connection, values: Mapping[str, str]) -> dict[str, str]:
    """Saves the known keys (skipping unknown keys and over-long values) and returns all settings."""
    for key, value in values.items():
        if key in SITE_KEYS and len(value) <= MAX_VALUE_LENGTH:
            conn.execute("INSERT INTO settings VALUES (%s,%s) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", (key, value))
    return get_settings(conn)
