from __future__ import annotations

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from psycopg import OperationalError
from psycopg.errors import UniqueViolation
from psycopg_pool import PoolTimeout

from server.errors.exceptions import NotFoundError

# Every error says where it came from, so the website can tell visitors which layer failed:
# {"detail": ..., "source": "database" | "api"}.


def _database_down(_: Request, __: Exception) -> JSONResponse:
    return JSONResponse({"detail": "Database unavailable", "source": "database"}, status_code=503)


def _crashed(_: Request, error: Exception) -> JSONResponse:
    print("unhandled error:", repr(error))
    return JSONResponse({"detail": "Internal API error", "source": "api"}, status_code=500)


def _slug_taken(_: Request, __: Exception) -> JSONResponse:
    return JSONResponse({"detail": "That slug is already used in this section"}, status_code=409)


def _not_found(_: Request, __: Exception) -> JSONResponse:
    return JSONResponse({"detail": "Not found"}, status_code=404)


def register_error_handlers(app: FastAPI) -> None:
    app.add_exception_handler(OperationalError, _database_down)
    app.add_exception_handler(PoolTimeout, _database_down)
    app.add_exception_handler(UniqueViolation, _slug_taken)
    app.add_exception_handler(NotFoundError, _not_found)
    app.add_exception_handler(Exception, _crashed)
