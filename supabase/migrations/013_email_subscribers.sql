-- Email Subscribers table for mailing list
CREATE TABLE IF NOT EXISTS email_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  phone text,
  source text NOT NULL DEFAULT 'manual' CHECK (source IN ('contact_form', 'registration', 'manual', 'waitlist')),
  status text NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  unsubscribed_at timestamptz,
  UNIQUE(email)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_status ON email_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_source ON email_subscribers(source);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_created_at ON email_subscribers(created_at);

-- Enable RLS
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow service role full access on email_subscribers"
ON email_subscribers FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Backfill: add existing contact form submissions as subscribers
INSERT INTO email_subscribers (email, name, source, status, created_at)
SELECT DISTINCT ON (LOWER(email))
  LOWER(email),
  name,
  'contact_form',
  'subscribed',
  created_at
FROM contact_messages
ORDER BY LOWER(email), created_at ASC
ON CONFLICT (email) DO NOTHING;

-- Backfill: add existing registrations as subscribers
INSERT INTO email_subscribers (email, name, source, status, created_at)
SELECT DISTINCT ON (LOWER(email))
  LOWER(email),
  first_name || ' ' || last_name,
  'registration',
  'subscribed',
  created_at
FROM registrations
ORDER BY LOWER(email), created_at ASC
ON CONFLICT (email) DO NOTHING;
