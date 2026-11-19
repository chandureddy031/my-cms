from server.site import service
from server.site.constants import MAX_VALUE_LENGTH


def test_saves_known_keys_and_ignores_the_rest(conn):
    conn.execute("DELETE FROM settings")
    saved = service.save_settings(conn, {"name": "APPLES", "tagline": "x" * (MAX_VALUE_LENGTH + 1), "hacker": "1"})
    assert saved == {"name": "APPLES"}


def test_saving_again_overwrites(conn):
    conn.execute("DELETE FROM settings")
    service.save_settings(conn, {"email": "old@example.com"})
    assert service.save_settings(conn, {"email": "new@example.com"}) == {"email": "new@example.com"}
    assert service.get_settings(conn) == {"email": "new@example.com"}
