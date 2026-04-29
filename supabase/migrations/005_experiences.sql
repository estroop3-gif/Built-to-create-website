-- Migration 005: Experiences table
-- Replaces hardcoded retreat/workshop data with database-driven experiences

-- Updated_at trigger function (reuse if exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  type text NOT NULL DEFAULT 'retreat' CHECK (type IN ('retreat', 'workshop')),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  start_date date,
  end_date date,
  location text,
  description text,
  page_sections jsonb DEFAULT '{}',
  pricing_tiers jsonb DEFAULT '[]',
  deposit_amount_cents integer,
  currency text DEFAULT 'usd',
  featured_on_homepage boolean DEFAULT false,
  show_in_nav boolean DEFAULT false,
  nav_order integer DEFAULT 0,
  capacity integer,
  registered_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_experiences_slug ON experiences(slug);
CREATE INDEX IF NOT EXISTS idx_experiences_status ON experiences(status);
CREATE INDEX IF NOT EXISTS idx_experiences_type ON experiences(type);
CREATE INDEX IF NOT EXISTS idx_experiences_nav ON experiences(show_in_nav, nav_order) WHERE show_in_nav = true;

-- Updated_at trigger
DROP TRIGGER IF EXISTS set_experiences_updated_at ON experiences;
CREATE TRIGGER set_experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Service role has full access (bypasses RLS by default)
-- Anon and authenticated can only read published experiences
CREATE POLICY "Public can read published experiences"
  ON experiences FOR SELECT
  USING (status = 'published');
