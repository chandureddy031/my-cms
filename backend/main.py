import os
import secrets
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Literal

from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from psycopg.errors import UniqueViolation
from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool
from pydantic import BaseModel, EmailStr, Field

DSN = os.getenv("DATABASE_URL", "dbname=foodwave")
ADMIN_KEY = os.getenv("ADMIN_KEY", "apple-admin")  # ponytail: one shared editor key; real accounts when there are many editors
Section = Literal["activities", "reports", "stories", "gallery", "caretakers", "stats"]
SITE_KEYS = {"name", "tagline", "about", "mission", "vision", "email", "phone"}
pool = ConnectionPool(DSN, open=False, kwargs={"row_factory": dict_row})


@asynccontextmanager
async def lifespan(_):
    pool.open()
    with pool.connection() as c:
        c.execute(Path(__file__).with_name("schema.sql").read_text())
    yield
    pool.close()


app = FastAPI(title="APPLE API", lifespan=lifespan)


@app.exception_handler(UniqueViolation)
def slug_taken(_, __):
    return JSONResponse({"detail": "That slug is already used in this section"}, status_code=409)
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_methods=["*"], allow_headers=["*"])


def admin(x_admin_key: str = Header("")):
    if not secrets.compare_digest(x_admin_key, ADMIN_KEY):
        raise HTTPException(401, "bad admin key")


class Donation(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    amount: float = Field(gt=0, le=10_000_000)
    cause: str = Field(min_length=1, max_length=60)
    message: str | None = Field(default=None, max_length=1000)


class Content(BaseModel):
    section: Section
    title: str = Field(min_length=1, max_length=200)
    body: str = Field(default="", max_length=5000)
    image: str | None = Field(default=None, pattern=r"^/assets/[\w.-]+$")  # ponytail: local assets only; S3 presigned URLs later
    meta: str | None = Field(default=None, max_length=200)
    position: int = 0
    slug: str | None = Field(default=None, pattern=r"^[a-z0-9-]+$", max_length=80)
    details: str = Field(default="", max_length=20000)
    parent: str | None = Field(default=None, pattern=r"^[a-z0-9-]+$", max_length=80)
    email: str | None = Field(default=None, max_length=200)
    phone: str | None = Field(default=None, max_length=40)


COLS = list(Content.model_fields)


@app.get("/api/site")
def get_site():
    with pool.connection() as c:
        return {r["key"]: r["value"] for r in c.execute("SELECT key, value FROM settings")}


@app.put("/api/site", dependencies=[Depends(admin)])
def put_site(data: dict[str, str]):
    with pool.connection() as c:
        for k, v in data.items():
            if k in SITE_KEYS:
                c.execute("INSERT INTO settings VALUES (%s,%s) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", (k, v))
    return get_site()


@app.get("/api/donations", dependencies=[Depends(admin)])
def list_donations(limit: int = 200):
    with pool.connection() as c:
        return c.execute("SELECT * FROM donations ORDER BY created_at DESC LIMIT %s", (min(limit, 1000),)).fetchall()


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
        raise HTTPException(404)
    return row


@app.delete("/api/content/{id}", status_code=204, dependencies=[Depends(admin)])
def delete(id: int):
    with pool.connection() as c:
        c.execute("DELETE FROM content WHERE id=%s", (id,))


@app.get("/api/{section}")
def list_section(section: Section):
    with pool.connection() as c:
        return c.execute("SELECT * FROM content WHERE section=%s ORDER BY position, id", (section,)).fetchall()


@app.post("/api/donations", status_code=201)
def donate(d: Donation):
    with pool.connection() as c:
        return c.execute(
            "INSERT INTO donations (name,email,amount,cause,message) VALUES (%s,%s,%s,%s,%s) RETURNING id, created_at",
            (d.name, d.email, d.amount, d.cause, d.message),
        ).fetchone()
