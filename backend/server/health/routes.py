from __future__ import annotations

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from server.config import config
from server.database import pool
from server.health.service import database_status, health_report

router = APIRouter(prefix="/api/health")


@router.get("")
def health() -> JSONResponse:
    """Used by the website's status page and the keep-awake ping; 503 when the database is down."""
    report = health_report(database_status(pool), config.admin_ready)
    return JSONResponse(report, status_code=200 if report["ok"] else 503)
