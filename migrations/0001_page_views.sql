CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  baseline INTEGER NOT NULL CHECK (baseline >= 0),
  organic INTEGER NOT NULL DEFAULT 0 CHECK (organic >= 0),
  twitter INTEGER NOT NULL DEFAULT 0 CHECK (twitter >= 0),
  instagram INTEGER NOT NULL DEFAULT 0 CHECK (instagram >= 0),
  linkedin INTEGER NOT NULL DEFAULT 0 CHECK (linkedin >= 0),
  total INTEGER GENERATED ALWAYS AS (baseline + organic + twitter + instagram + linkedin) STORED,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (total <= 9007199254740991)
) STRICT;

-- Recovered from Upstash's before-deletion backup dated 2026-10-15.
-- Reapplying the migration preserves all visits recorded since migration.
INSERT INTO page_views (id, baseline, organic, twitter, instagram, linkedin)
VALUES (1, 150000, 12271, 1, 1, 0)
ON CONFLICT (id) DO NOTHING;
