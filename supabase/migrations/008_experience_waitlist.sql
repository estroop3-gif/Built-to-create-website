-- Migration 008: Experience waitlist + seed experiences
-- ===================================================

-- 1. Waitlist table
CREATE TABLE IF NOT EXISTS experience_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_slug text NOT NULL,
  email text NOT NULL,
  full_name text NOT NULL,
  phone text,
  notified boolean DEFAULT false,
  notified_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(experience_slug, email)
);

CREATE INDEX IF NOT EXISTS idx_waitlist_slug ON experience_waitlist(experience_slug);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON experience_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_notified ON experience_waitlist(notified) WHERE notified = false;

-- RLS
ALTER TABLE experience_waitlist ENABLE ROW LEVEL SECURITY;

-- Service role: full access
CREATE POLICY "service_role_waitlist_all" ON experience_waitlist
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Anon: insert only (public waitlist signup)
CREATE POLICY "anon_waitlist_insert" ON experience_waitlist
  FOR INSERT TO anon WITH CHECK (true);

-- 2. Seed experience rows for all 9 hardcoded slugs
-- Workshops get capacity 20, retreats get NULL (unlimited)
INSERT INTO experiences (slug, title, type, status, start_date, end_date, location, description, capacity)
VALUES
  ('costa-rica', 'Costa Rica Retreat', 'retreat', 'published', '2026-02-13', '2026-02-21', 'Costa Rica', 'Fundamentals of Documentary', NULL),
  ('greece', 'Greece Retreat', 'retreat', 'published', '2026-05-22', '2026-05-30', 'Greece', 'Visual Storytelling & Mythic Structure', NULL),
  ('africa', 'Africa Retreat', 'retreat', 'published', '2026-08-21', '2026-08-29', 'Kenya', 'Missional Filmmaking & Community', NULL),
  ('japan', 'Japan Retreat', 'retreat', 'published', '2026-11-20', '2026-11-28', 'Japan', 'Intro to Narrative Filmmaking (Role Rotations)', NULL),
  ('panama', 'Panama Retreat', 'retreat', 'published', '2027-02-26', '2027-03-06', 'Panama', 'Advanced Documentary & Investigative Storytelling', NULL),
  ('london', 'United Kingdom Retreat', 'retreat', 'published', '2027-05-21', '2027-05-29', 'United Kingdom', 'Narrative Writing & Directing', NULL),
  ('germany', 'Germany Retreat', 'retreat', 'published', '2027-08-20', '2027-08-28', 'Germany', 'Cinematic Collaboration & Production Design', NULL),
  ('thailand', 'Thailand Retreat', 'retreat', 'published', '2027-11-26', '2027-12-04', 'Thailand', 'Narrative Masterpiece (Festival-ready Short)', NULL),
  ('filmmaking-in-the-real-world', 'Filmmaking in the Real World', 'workshop', 'published', '2026-05-16', '2026-05-16', 'Jasper, GA', 'Camera Basics & Documentary Storytelling', 20)
ON CONFLICT (slug) DO NOTHING;
