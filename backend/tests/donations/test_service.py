from decimal import Decimal

import pytest
from pydantic import ValidationError

from server.donations import service
from server.donations.schemas import DonationIn


def donation(**fields) -> DonationIn:
    return DonationIn(**{"name": "Test Donor", "email": "donor@example.com", "amount": 500, "cause": "Education", **fields})


def test_create_trims_name_and_cause(conn):
    created = service.create_donation(conn, donation(name="  Asha  ", cause=" Elder Care ", message="hi"))
    stored = conn.execute("SELECT * FROM donations WHERE id=%s", (created["id"],)).fetchone()
    assert set(created) == {"id", "created_at"}
    assert (stored["name"], stored["cause"], stored["amount"], stored["message"]) == ("Asha", "Elder Care", Decimal("500.00"), "hi")


def test_list_is_newest_first_and_limit_is_clamped(conn):
    conn.execute("DELETE FROM donations")
    for name in ("first", "second", "third"):
        conn.execute("INSERT INTO donations (name,email,amount,cause,created_at) VALUES (%s,'a@b.co',1,'x',now() + %s * interval '1 second')",
                     (name, ["first", "second", "third"].index(name)))
    assert [d["name"] for d in service.list_donations(conn, 2)] == ["third", "second"]
    assert len(service.list_donations(conn, 0)) == 1  # at least one
    assert len(service.list_donations(conn, 10**6)) == 3  # capped, not an error


@pytest.mark.parametrize("bad", [{"email": "not-an-email"}, {"amount": 0}, {"amount": "1.234"}, {"amount": 10**8}, {"name": ""}, {"cause": "x" * 61}])
def test_invalid_donations_are_rejected(bad):
    with pytest.raises(ValidationError):
        donation(**bad)
