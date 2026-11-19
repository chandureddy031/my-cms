from __future__ import annotations

from pathlib import Path

from psycopg import OperationalError
from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool, PoolTimeout

from server.config import config

SCHEMA_PATH = Path(__file__).with_name("schema.sql")
# Short timeouts so a dead database answers with a clear 503 in seconds instead of hanging requests.
POOL_TIMEOUT_SECONDS = 8
CONNECT_TIMEOUT_SECONDS = 5

DatabaseUnavailable = (OperationalError, PoolTimeout)

pool = ConnectionPool(
    config.database_url,
    open=False,
    timeout=POOL_TIMEOUT_SECONDS,
    kwargs={"row_factory": dict_row, "connect_timeout": CONNECT_TIMEOUT_SECONDS},
)


def open_pool() -> None:
    """Opens the pool and applies the schema. Starts even when the database is down,
    so /api/health can say "database" instead of the whole API looking dead."""
    pool.open(wait=False)
    try:
        with pool.connection() as conn:
            conn.execute(SCHEMA_PATH.read_text())
    except DatabaseUnavailable as error:
        print("startup: database unavailable:", error)


def close_pool() -> None:
    pool.close()
