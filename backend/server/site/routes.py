from __future__ import annotations

from fastapi import APIRouter, Depends

from server.admin import require_admin
from server.database import pool
from server.site import service

router = APIRouter(prefix="/api/site")


@router.get("")
def get_site() -> dict[str, str]:
    with pool.connection() as conn:
        return service.get_settings(conn)


@router.put("", dependencies=[Depends(require_admin)])
def put_site(values: dict[str, str]) -> dict[str, str]:
    with pool.connection() as conn:
        return service.save_settings(conn, values)
