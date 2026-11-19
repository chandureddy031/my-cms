from contextlib import contextmanager

from psycopg import OperationalError

from server.health.service import database_status, health_report


class FakePool:
    def __init__(self, fails: bool):
        self.fails = fails

    @contextmanager
    def connection(self, timeout: float):
        if self.fails:
            raise OperationalError("database is down")
        yield self

    def execute(self, _sql: str):
        return None


def test_database_status():
    assert database_status(FakePool(fails=False)) == "ok"
    assert database_status(FakePool(fails=True)) == "down"


def test_health_report():
    assert health_report("ok", admin_ready=True) == {"ok": True, "api": "ok", "database": "ok", "admin": True}
    assert health_report("down", admin_ready=False)["ok"] is False
