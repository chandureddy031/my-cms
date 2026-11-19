from __future__ import annotations

import time

from fastapi import APIRouter, Depends, HTTPException, Request

from server.admin import require_admin
from server.database import pool
from server.donations import service
from server.donations.constants import DEFAULT_LIST_LIMIT, RATE_LIMITED_MESSAGE
from server.donations.rate_limit import RateLimiter, client_ip
from server.donations.schemas import DonationIn

router = APIRouter(prefix="/api/donations")
limiter = RateLimiter()


def limit_donations(request: Request) -> None:
    ip = client_ip(dict(request.headers), request.client.host if request.client else None)
    if not limiter.allow(ip, time.monotonic()):
        raise HTTPException(429, RATE_LIMITED_MESSAGE)


@router.get("", dependencies=[Depends(require_admin)])
def list_donations(limit: int = DEFAULT_LIST_LIMIT):
    with pool.connection() as conn:
        return service.list_donations(conn, limit)


@router.post("", status_code=201, dependencies=[Depends(limit_donations)])
def create_donation(donation: DonationIn):
    with pool.connection() as conn:
        return service.create_donation(conn, donation)
