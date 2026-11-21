set dotenv-load
db := env_var_or_default("DATABASE_URL", "foodwave")

# install everything
install:
    cd backend && python3 -m venv .venv && .venv/bin/python -m pip install -r requirements-dev.txt
    cd frontend && npm install
    cd chandu && npm install

# create db, schema, seed
db-init:
    -createdb foodwave
    cd backend && .venv/bin/python seed.py

# open terminal postgres client
psql:
    psql {{db}}

donations:
    psql {{db}} -c "SELECT * FROM donations ORDER BY created_at DESC LIMIT 20"

api:
    cd backend && .venv/bin/uvicorn main:app --reload --port 8000

web:
    cd frontend && npm run dev

# APPLES site (chandu/) on :3001 — open http://localhost:3000/chandu (through web) or :3001/chandu
chandu:
    cd chandu && npm run dev -- -p 3001

# backend service tests (real Postgres, every test rolled back)
test:
    cd backend && .venv/bin/python -m pytest

build:
    cd frontend && npm run build

# run api + web together
dev:
    just api & just web & just chandu
