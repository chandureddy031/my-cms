# APPLE — NGO website

Next.js 15 (frontend) · FastAPI (backend) · PostgreSQL. Live: https://chandutechstack.me — CMS at `/apple`.

## Run locally
```
just install      # Python venv + npm install
just db-init      # create DB, schema, seed content
just api          # http://localhost:8000   (dev admin key: apple-admin)
just web          # http://localhost:3000   (CMS: /apple)
backend/.venv/bin/python backend/smoke_test.py   # end-to-end API check (leaves no data behind)
```

## Structure
- `frontend/src/constants` — site text defaults, nav, CMS field config
- `frontend/src/lib` — `api.ts` (all API calls), `admin.ts` (CMS session check)
- `frontend/src/hooks` — `useDonate`, `useSidebar`
- `frontend/src/components` — shared UI (`Shell`, `ui`, `DonateForm`, `AdminNav`…)
- `frontend/src/app/(site)` — public pages; `frontend/src/app/apple` — CMS pages + server actions
- `frontend/public/assets` — images and report PDFs (paths stored in the DB)
- `backend/main.py` — API; `schema.sql` — tables; `seed.py` — starting content
- `.github/workflows` — deploy on push (per folder) and keep-awake ping

## Configuration
| Service | Variable | Purpose |
|---|---|---|
| API | `DATABASE_URL` | Postgres connection |
| API | `ADMIN_KEY` | CMS key — **required in production** (12+ chars); admin is disabled without it |
| API | `FRONTEND_URL` | Comma-separated site URLs allowed to call the API from the browser |
| Web | `NEXT_PUBLIC_API_URL` | API base URL (baked in at build time) |

See `backend/.env.example` and `frontend/.env.example`.

## Security notes
- Admin endpoints need `X-Admin-Key`; wrong keys are slowed down; the CMS cookie is httpOnly, Secure, SameSite=Strict.
- Donations are validated and rate-limited per visitor; the donor list is admin-only.
- API docs are off in production; the site sends standard security headers; `/apple` is excluded from search engines.
