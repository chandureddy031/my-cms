import pytest
from psycopg.errors import UniqueViolation
from pydantic import ValidationError

from server.content import service
from server.content.schemas import ContentIn
from server.errors import NotFoundError


def item(**fields) -> ContentIn:
    return ContentIn(**{"section": "stats", "title": "test-item", **fields})


def test_create_returns_the_stored_row(conn):
    row = service.create_item(conn, item(body="42", slug="test-slug"))
    assert row["id"] > 0
    assert (row["title"], row["body"], row["slug"], row["details"]) == ("test-item", "42", "test-slug", "")


def test_list_section_orders_by_position_then_id(conn):
    conn.execute("DELETE FROM content WHERE section='stats'")
    second = service.create_item(conn, item(title="b", position=2))
    first = service.create_item(conn, item(title="a", position=1))
    tie = service.create_item(conn, item(title="c", position=2))
    assert [row["id"] for row in service.list_section(conn, "stats")] == [first["id"], second["id"], tie["id"]]


def test_update_changes_every_field(conn):
    row = service.create_item(conn, item())
    updated = service.update_item(conn, row["id"], item(title="new", meta="label", position=5))
    assert (updated["id"], updated["title"], updated["meta"], updated["position"]) == (row["id"], "new", "label", 5)


def test_update_and_delete_of_missing_item_raise_not_found(conn):
    with pytest.raises(NotFoundError):
        service.update_item(conn, 0, item())
    with pytest.raises(NotFoundError):
        service.delete_item(conn, 0)


def test_delete_removes_the_item(conn):
    row = service.create_item(conn, item())
    service.delete_item(conn, row["id"])
    assert row["id"] not in [r["id"] for r in service.list_section(conn, "stats")]


def test_slug_is_unique_within_a_section_only(conn):
    service.create_item(conn, item(slug="same-slug"))
    service.create_item(conn, item(section="reports", slug="same-slug"))
    with pytest.raises(UniqueViolation), conn.transaction():
        service.create_item(conn, item(slug="same-slug"))


@pytest.mark.parametrize("bad", [{"image": "http://evil/x.jpg"}, {"slug": "Not A Slug"}, {"parent": "bad/parent"}, {"title": ""}, {"section": "nope"}])
def test_invalid_items_are_rejected_before_the_database(bad):
    with pytest.raises(ValidationError):
        item(**bad)
