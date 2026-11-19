from __future__ import annotations

import os
from collections.abc import Iterator

import psycopg
import pytest
from psycopg.rows import dict_row

from server.database import SCHEMA_PATH

# Service tests run against a real Postgres inside one transaction that is rolled back,
# so nothing they write is kept. Point TEST_DATABASE_URL at a throwaway database to be extra safe.
TEST_DATABASE_URL = os.getenv("TEST_DATABASE_URL") or os.getenv("DATABASE_URL", "dbname=foodwave")


@pytest.fixture
def conn() -> Iterator[psycopg.Connection]:
    try:
        connection = psycopg.connect(TEST_DATABASE_URL, row_factory=dict_row, connect_timeout=3)
    except psycopg.OperationalError as error:
        pytest.skip(f"no test database: {error}")
    try:
        connection.execute(SCHEMA_PATH.read_text())
        yield connection
    finally:
        connection.rollback()
        connection.close()
