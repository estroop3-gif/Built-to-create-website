-- Email unsubscribes table for managing opt-out state
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS email_unsubscribes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  reason TEXT,
  source TEXT, -- 'one-click', 'manual', 'admin', etc.
  user_agent TEXT,
  ip_address INET,

  -- Ensure we don't have duplicate unsubscribes
  CONSTRAINT unique_email_unsubscribe UNIQUE (email)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_email ON email_unsubscribes (email);
CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_created_at ON email_unsubscribes (created_at);

-- Add RLS (Row Level Security) policies
ALTER TABLE email_unsubscribes ENABLE ROW LEVEL SECURITY;

-- Policy for service role (API usage)
CREATE POLICY "Service role can manage unsubscribes" ON email_unsubscribes
  FOR ALL
  TO service_role
  USING (true);

-- Policy for authenticated users (admin access)
CREATE POLICY "Authenticated users can view unsubscribes" ON email_unsubscribes
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to check if an email is unsubscribed
CREATE OR REPLACE FUNCTION is_email_unsubscribed(email_address TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM email_unsubscribes
    WHERE email = LOWER(email_address)
  );
END;
$$;

-- Function to safely unsubscribe an email (upsert)
CREATE OR REPLACE FUNCTION unsubscribe_email(
  email_address TEXT,
  unsubscribe_reason TEXT DEFAULT NULL,
  unsubscribe_source TEXT DEFAULT 'manual',
  request_user_agent TEXT DEFAULT NULL,
  request_ip TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  unsubscribe_id UUID;
BEGIN
  INSERT INTO email_unsubscribes (email, reason, source, user_agent, ip_address)
  VALUES (
    LOWER(email_address),
    unsubscribe_reason,
    unsubscribe_source,
    request_user_agent,
    request_ip::INET
  )
  ON CONFLICT (email)
  DO UPDATE SET
    created_at = NOW(),
    reason = COALESCE(EXCLUDED.reason, email_unsubscribes.reason),
    source = EXCLUDED.source,
    user_agent = COALESCE(EXCLUDED.user_agent, email_unsubscribes.user_agent),
    ip_address = COALESCE(EXCLUDED.ip_address, email_unsubscribes.ip_address)
  RETURNING id INTO unsubscribe_id;

  RETURN unsubscribe_id;
END;
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON email_unsubscribes TO service_role;
GRANT EXECUTE ON FUNCTION is_email_unsubscribed TO service_role;
GRANT EXECUTE ON FUNCTION unsubscribe_email TO service_role;