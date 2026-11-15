# APPLE — NGO website

Next.js 15 frontend · FastAPI backend · PostgreSQL. CMS at `/apple`.

```
just install      # Python venv + npm install
just db-init      # create DB, schema, seed content (or: psql foodwave -f db/foodwave.sql)
just api          # http://localhost:8000
just web          # http://localhost:3000   (CMS: /apple, key from ADMIN_KEY, default apple-admin)
```

- `frontend/` — pages in `src/app`, constants, hooks, components; images in `public/assets`
- `backend/` — `main.py` (API), `schema.sql`, `seed.py`
- `db/foodwave.sql` — schema + content snapshot (no donation data)
