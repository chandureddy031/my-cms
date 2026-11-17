import os
import secrets
import time
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from decimal import Decimal
from pathlib import Path
from typing import Literal

from fastapi import Depends, FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from psycopg import OperationalError
from psycopg.errors import UniqueViolation
from psycopg_pool import PoolTimeout
from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool
from pydantic import BaseModel, EmailStr, Field

PROD = bool(os.getenv("RENDER"))  # Render sets RENDER=true on its servers
DSN = os.getenv("DATABASE_URL", "dbname=foodwave")
# ponytail: one shared editor key; real accounts when there are many editors.
# In production a missing/weak key disables admin endpoints (fail closed) instead of falling back to the public default.
ADMIN_KEY = os.getenv("ADMIN_KEY") or (None if PROD else "apple-admin")
ADMIN_READY = bool(ADMIN_KEY) and (not PROD or (len(ADMIN_KEY) >= 12 and ADMIN_KEY != "apple-admin"))
Section = Literal["activities", "reports", "stories", "gallery", "caretakers", "stats"]
SITE_KEYS = {"name", "tagline", "about", "mission", "vision", "email", "phone"}
# Short timeouts so a dead database gives a clear 503 in seconds instead of hanging requests.
pool = ConnectionPool(DSN, open=False, timeout=8, kwargs={"row_factory": dict_row, "connect_timeout": 5})


@asynccontextmanager
async def lifespan(_):
    pool.open(wait=False)
    try:  # start even if the DB is down, so /api/health can say "database" instead of the API looking dead
        with pool.connection() as c:
            c.execute(Path(__file__).with_name("schema.sql").read_text())
    except (OperationalError, PoolTimeout) as e:
        print("startup: database unavailable:", e)
    yield
    pool.close()


app = FastAPI(title="APPLE API", lifespan=lifespan, docs_url=None if PROD else "/docs", redoc_url=None, openapi_url=None if PROD else "/openapi.json")

# Browsers may call the API only from these sites (donation form). FRONTEND_URL = comma-separated live website URLs.
ORIGINS = ["http://localhost:3000", *(o.strip().rstrip("/") for o in os.getenv("FRONTEND_URL", "").split(",") if o.strip())]
app.add_middleware(CORSMiddleware, allow_origins=ORIGINS, allow_methods=["GET", "POST", "PUT", "DELETE"], allow_headers=["Content-Type", "X-Admin-Key"])


# Every error says where it came from: {"detail": ..., "source": "database" | "api"}.
@app.exception_handler(OperationalError)
@app.exception_handler(PoolTimeout)
def db_down(_, __):
    return JSONResponse({"detail": "Database unavailable", "source": "database"}, status_code=503)


@app.exception_handler(Exception)
def crashed(_, e):
    print("unhandled error:", repr(e))
    return JSONResponse({"detail": "Internal API error", "source": "api"}, status_code=500)


@app.exception_handler(UniqueViolation)
def slug_taken(_, __):
    return JSONResponse({"detail": "That slug is already used in this section"}, status_code=409)


def admin(x_admin_key: str = Header("")):
    if not ADMIN_READY:
        raise HTTPException(503, "ADMIN_KEY is not set (or too weak) on the server")
    if not secrets.compare_digest(x_admin_key.encode(), ADMIN_KEY.encode()):
        time.sleep(1)  # slows key guessing; sync endpoint, so only this worker thread waits
        raise HTTPException(401, "bad admin key")


# ponytail: in-memory per-IP limiter, fine for one instance; use Redis if the API ever scales out.
_hits: dict[str, deque] = defaultdict(deque)


def client_ip(request: Request) -> str:
    fwd = request.headers.get("cf-connecting-ip") or request.headers.get("x-forwarded-for", "").split(",")[-1].strip()
    return fwd or (request.client.host if request.client else "unknown")


def donation_limit(request: Request, limit: int = 10, window: float = 600):
    now, q = time.monotonic(), _hits[client_ip(request)]
    while q and now - q[0] > window:
        q.popleft()
    if len(q) >= limit:
        raise HTTPException(429, "Too many donations from your network. Please try again in a few minutes.")
    q.append(now)
    if len(_hits) > 10_000:  # keep memory bounded
        _hits.clear()


class Donation(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    amount: Decimal = Field(gt=0, le=10_000_000, max_digits=12, decimal_places=2)
    cause: str = Field(min_length=1, max_length=60)
    message: str | None = Field(default=None, max_length=1000)


class Content(BaseModel):
    section: Section
    title: str = Field(min_length=1, max_length=200)
    body: str = Field(default="", max_length=5000)
    image: str | None = Field(default=None, pattern=r"^/assets/[\w.-]+$")  # ponytail: local assets only; S3 presigned URLs later
    meta: str | None = Field(default=None, max_length=200)
    position: int = Field(default=0, ge=-10_000, le=10_000)
    slug: str | None = Field(default=None, pattern=r"^[a-z0-9-]+$", max_length=80)
    details: str = Field(default="", max_length=20000)
    parent: str | None = Field(default=None, pattern=r"^[a-z0-9-]+$", max_length=80)
    email: str | None = Field(default=None, max_length=200)
    phone: str | None = Field(default=None, max_length=40)


COLS = list(Content.model_fields)


@app.get("/api/health")
def health():
    try:
        with pool.connection(timeout=5) as c:
            c.execute("SELECT 1")
        db = "ok"
    except (OperationalError, PoolTimeout):
        db = "down"
    body = {"ok": db == "ok", "api": "ok", "database": db, "admin": ADMIN_READY}
    return JSONResponse(body, status_code=200 if db == "ok" else 503)


@app.get("/api/site")
def get_site():
    with pool.connection() as c:
        return {r["key"]: r["value"] for r in c.execute("SELECT key, value FROM settings")}


@app.put("/api/site", dependencies=[Depends(admin)])
def put_site(data: dict[str, str]):
    with pool.connection() as c:
        for k, v in data.items():
            if k in SITE_KEYS and len(v) <= 5000:
                c.execute("INSERT INTO settings VALUES (%s,%s) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", (k, v))
    return get_site()


@app.get("/api/donations", dependencies=[Depends(admin)])
def list_donations(limit: int = 200):
    with pool.connection() as c:
        return c.execute("SELECT * FROM donations ORDER BY created_at DESC LIMIT %s", (max(1, min(limit, 1000)),)).fetchall()


@app.get("/api/admin/check", dependencies=[Depends(admin)])
def check():
    return {"ok": True}


@app.post("/api/content", status_code=201, dependencies=[Depends(admin)])
def create(item: Content):
    with pool.connection() as c:
        return c.execute(
            f"INSERT INTO content ({','.join(COLS)}) VALUES ({','.join(f'%({k})s' for k in COLS)}) RETURNING *",
            item.model_dump(),
        ).fetchone()


@app.put("/api/content/{id}", dependencies=[Depends(admin)])
def update(id: int, item: Content):
    with pool.connection() as c:
        row = c.execute(
            f"UPDATE content SET {','.join(f'{k}=%({k})s' for k in COLS)} WHERE id=%(id)s RETURNING *",
            {**item.model_dump(), "id": id},
        ).fetchone()
    if not row:
        raise HTTPException(404, "Not found")
    return row


@app.delete("/api/content/{id}", status_code=204, dependencies=[Depends(admin)])
def delete(id: int):
    with pool.connection() as c:
        if not c.execute("DELETE FROM content WHERE id=%s", (id,)).rowcount:
            raise HTTPException(404, "Not found")


@app.get("/api/{section}")
def list_section(section: Section):
    with pool.connection() as c:
        return c.execute("SELECT * FROM content WHERE section=%s ORDER BY position, id", (section,)).fetchall()


@app.post("/api/donations", status_code=201, dependencies=[Depends(donation_limit)])
def donate(d: Donation):
    with pool.connection() as c:
        return c.execute(
            "INSERT INTO donations (name,email,amount,cause,message) VALUES (%s,%s,%s,%s,%s) RETURNING id, created_at",
            (d.name.strip(), str(d.email), d.amount, d.cause.strip(), d.message),
        ).fetchone()
