-- Migration 006: Promo codes table
-- Replaces hardcoded VALID_PROMO_CODES with database-driven promo codes

CREATE TABLE IF NOT EXISTS promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
  discount_value numeric NOT NULL,
  experience_id uuid REFERENCES experiences(id) ON DELETE SET NULL,
  max_uses integer,
  current_uses integer DEFAULT 0,
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_experience ON promo_codes(experience_id);

-- RLS
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

-- Only service role can access promo codes (admin operations only)
-- No public read policy — validation happens server-side
