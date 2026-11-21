# APPLE — NGO website

Next.js 15 (frontend) · FastAPI (backend) · PostgreSQL. Live: https://chandutechstack.me — CMS at `/apple`.

## Run locally
```
just install      # Python venv + npm install
just db-init      # create DB, schema, seed content
just api          # http://localhost:8000   (dev admin key: apple-admin)
just web          # http://localhost:3000   (CMS: /apple)
just test                                       # backend service tests
backend/.venv/bin/python backend/smoke_test.py   # end-to-end API check (leaves no data behind)
```

## APPLES site — `chandu/` (separate app)
Its own Next.js 16 app with a built-in CMS, served under `/chandu` (admin: `/chandu/admin`).
The main site forwards `/chandu/*` to it (`CHANDU_URL`, default `http://localhost:3001` in dev).
```
just chandu       # http://localhost:3001/chandu  — or http://localhost:3000/chandu through `just web`
```
- All text lives in `chandu/src/controller/content.json`; the CMS edits it. Password: `ADMIN_PASSWORD` in `chandu/.env.local` (not committed).
- Render: its own web service, root dir `chandu`, build `npm ci && npm run build`, start `npm start`, env `ADMIN_PASSWORD`.
  Deploys on push via `RENDER_CHANDU_HOOK`. Edits saved in the CMS live on the server's disk, so a redeploy/restart resets them to what is committed.

## Structure
**Frontend** (`frontend/src`)
- `app/` — routes only: each page fetches data and places named components
- `components/<feature>/<piece>/` — one folder per UI piece (with its own `constants.ts` / `utils.ts`); each feature has an `index.ts`
- `components/ui` — primitives (`Icon`, `Logo`, `Button`, `IconBadge`, `Avatar`); `components/shared` — pieces used on many pages
- `hooks/<feature>/` — `useX` hooks with their API calls and types (`mascot`, `donations`, `health`, `layout`)
- `lib/api` — server-side data fetching; `lib/admin` — CMS session check and server actions
- `utils/routes.ts` — every URL as a helper (`activityHref(slug)`…); `constants/`, `types/`, `styles/`
- `frontend/public/assets` — images and report PDFs (paths stored in the DB)

**Backend** (`backend`)
- `main.py` — entry point (`uvicorn main:app`); `server/app.py` — builds the app and mounts every router
- `server/<service>/` — `routes.py` (HTTP only), `service.py` (logic, takes a DB connection), `schemas.py`, `constants.py`
  — services: `content`, `donations` (+ `rate_limit.py`), `site`, `health`, `admin`
- `server/config`, `server/database` (pool + `schema.sql`), `server/errors` (error → JSON with `source`)
- `tests/<service>/` — tests of the service logic, mirroring `server/`; `just test`
- `seed.py` — starting content; `smoke_test.py` — end-to-end check of a running API
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
