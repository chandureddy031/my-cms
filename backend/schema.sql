CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('activities','reports','stories','gallery','caretakers','stats')),
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  image TEXT,            -- ponytail: local /assets path now; swap to S3 key + presigned URL later
  meta TEXT,
  position INT NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS donations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  cause TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
-- detail pages: slug for URLs, details for long text, parent links gallery/stories/team to an activity or group
ALTER TABLE content ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS details TEXT NOT NULL DEFAULT '';
ALTER TABLE content ADD COLUMN IF NOT EXISTS parent TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS phone TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS content_section_slug ON content (section, slug) WHERE slug IS NOT NULL;
