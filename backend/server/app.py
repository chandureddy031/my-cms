from __future__ import annotations

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.admin import ADMIN_KEY_HEADER
from server.admin.routes import router as admin_router
from server.config import config
from server.content.routes import router as content_router
from server.database import close_pool, open_pool
from server.donations.routes import router as donations_router
from server.errors import register_error_handlers
from server.health.routes import router as health_router
from server.site.routes import router as site_router

SERVICE_NAME = "APPLE API"


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    open_pool()
    yield
    close_pool()


def create_app() -> FastAPI:
    app = FastAPI(
        title=SERVICE_NAME,
        lifespan=lifespan,
        # API docs only on developer machines.
        docs_url=None if config.production else "/docs",
        redoc_url=None,
        openapi_url=None if config.production else "/openapi.json",
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=config.allowed_origins,
        allow_methods=["GET", "POST", "PUT", "DELETE"],
        allow_headers=["Content-Type", ADMIN_KEY_HEADER],
    )
    register_error_handlers(app)
    for router in (health_router, site_router, donations_router, admin_router):
        app.include_router(router)
    app.include_router(content_router)  # last: it owns the catch-all /api/{section}
    return app
