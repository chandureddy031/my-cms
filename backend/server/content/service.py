from __future__ import annotations

from typing import Any

from psycopg import Connection

from server.content.constants import Section
from server.content.schemas import CONTENT_COLUMNS, ContentIn
from server.errors import NotFoundError

Row = dict[str, Any]

_INSERT_SQL = (
    f"INSERT INTO content ({','.join(CONTENT_COLUMNS)}) "
    f"VALUES ({','.join(f'%({column})s' for column in CONTENT_COLUMNS)}) RETURNING *"
)
_UPDATE_SQL = f"UPDATE content SET {','.join(f'{column}=%({column})s' for column in CONTENT_COLUMNS)} WHERE id=%(id)s RETURNING *"


def list_section(conn: Connection, section: Section) -> list[Row]:
    """Items of a section in display order."""
    return conn.execute("SELECT * FROM content WHERE section=%s ORDER BY position, id", (section,)).fetchall()


def create_item(conn: Connection, item: ContentIn) -> Row:
    """Raises UniqueViolation when the slug is taken in that section."""
    return conn.execute(_INSERT_SQL, item.model_dump()).fetchone()


def update_item(conn: Connection, item_id: int, item: ContentIn) -> Row:
    row = conn.execute(_UPDATE_SQL, {**item.model_dump(), "id": item_id}).fetchone()
    if not row:
        raise NotFoundError
    return row


def delete_item(conn: Connection, item_id: int) -> None:
    if not conn.execute("DELETE FROM content WHERE id=%s", (item_id,)).rowcount:
        raise NotFoundError
