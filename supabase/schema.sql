-- Email Marketing System for Born to Create Project

-- Create leads table for email marketing prospects
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  first_name text NULL,
  source text NULL,
  utm_source text NULL,
  utm_medium text NULL,
  utm_campaign text NULL,
  utm_content text NULL,
  referrer text NULL,
  consent_marketing boolean NOT NULL DEFAULT true,
  sequence_stage int NOT NULL DEFAULT 0,
  last_sent_at timestamptz NULL,
  next_send_at timestamptz NULL,
  registered boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create email_events table for tracking delivery, opens, clicks, etc.
CREATE TABLE IF NOT EXISTS email_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  email_address text NOT NULL,
  event_type text NOT NULL, -- delivered, opened, clicked, bounced, spam, unsubscribed
  sequence_stage int NULL,
  template_id text NULL,
  message_id text NULL,
  user_agent text NULL,
  ip_address text NULL,
  link_url text NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_next_send_at ON leads(next_send_at);
CREATE INDEX IF NOT EXISTS idx_leads_sequence_registered ON leads(sequence_stage, registered);
CREATE INDEX IF NOT EXISTS idx_leads_consent_registered ON leads(consent_marketing, registered);
CREATE INDEX IF NOT EXISTS idx_email_events_lead_id ON email_events(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_events_type_created ON email_events(event_type, created_at);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leads table
-- Allow anonymous inserts for subscription (handled by API routes with service key)
CREATE POLICY "Allow service role full access on leads"
ON leads FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Deny direct access to anonymous users
CREATE POLICY "Deny anon access to leads"
ON leads FOR ALL
TO anon
USING (false);

-- RLS Policies for email_events table
CREATE POLICY "Allow service role full access on email_events"
ON email_events FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Deny anon access to email_events"
ON email_events FOR ALL
TO anon
USING (false);

-- Function to update leads.updated_at on row updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_leads_updated_at 
BEFORE UPDATE ON leads 
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Function to mark leads as registered when a registration is created
-- This assumes you have a registrations table with an email column
CREATE OR REPLACE FUNCTION mark_lead_as_registered()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE leads 
  SET registered = true, 
      updated_at = now()
  WHERE email = NEW.email 
    AND registered = false;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on registrations table (if it exists)
-- Uncomment and modify this based on your actual registrations table structure
/*
CREATE TRIGGER trigger_mark_lead_registered
AFTER INSERT ON registrations
FOR EACH ROW 
EXECUTE FUNCTION mark_lead_as_registered();
*/

-- Function to handle unsubscribe with token verification
CREATE OR REPLACE FUNCTION unsubscribe_lead(p_email text DEFAULT NULL, p_token text DEFAULT NULL)
RETURNS boolean AS $$
DECLARE
  lead_exists boolean := false;
BEGIN
  -- If email provided directly
  IF p_email IS NOT NULL THEN
    UPDATE leads 
    SET consent_marketing = false, updated_at = now()
    WHERE email = p_email;
    GET DIAGNOSTICS lead_exists = FOUND;
    RETURN lead_exists;
  END IF;
  
  -- If token provided (you can implement token verification logic here)
  -- For now, we'll extract email from a simple base64 encoded token
  -- In production, use proper JWT or signed tokens
  IF p_token IS NOT NULL THEN
    -- Implement token verification and email extraction
    -- This is a simplified version
    RETURN false;
  END IF;
  
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;