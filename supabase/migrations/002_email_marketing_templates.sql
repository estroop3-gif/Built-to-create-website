-- Email Marketing Templates and Tracking System
-- Built for Born to Create Project Costa Rica retreat

-- Create email_templates table for storing comprehensive template content
CREATE TABLE IF NOT EXISTS email_templates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_key text UNIQUE NOT NULL,
  subject text NOT NULL,
  preview_text text NOT NULL,
  html_content text NOT NULL,
  plain_text_content text NOT NULL,
  
  -- Template metadata
  order_sequence int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  category text DEFAULT 'marketing',
  
  -- Content tags for filtering
  tags text[] DEFAULT '{}',
  
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create email_sends table for tracking sent emails with full idempotency
CREATE TABLE IF NOT EXISTS email_sends (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_key text NOT NULL,
  subscriber_email text NOT NULL,
  subscriber_first_name text,
  
  -- Delivery tracking
  sent_at timestamptz NOT NULL DEFAULT now(),
  delivery_status text NOT NULL DEFAULT 'sent' CHECK (delivery_status IN ('sent', 'delivered', 'bounced', 'failed')),
  
  -- External service tracking
  resend_message_id text,
  error_message text,
  
  -- Marketing attribution
  utm_source text DEFAULT 'email',
  utm_medium text DEFAULT 'marketing',
  utm_campaign text DEFAULT 'costa-rica-retreat',
  
  created_at timestamptz NOT NULL DEFAULT now(),
  
  -- Unique constraint for idempotency - one template per subscriber
  UNIQUE(template_key, subscriber_email)
);

-- Create email_template_analytics for tracking performance
CREATE TABLE IF NOT EXISTS email_template_analytics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_key text NOT NULL,
  
  -- Performance metrics
  total_sent int DEFAULT 0,
  total_delivered int DEFAULT 0,
  total_opened int DEFAULT 0,
  total_clicked int DEFAULT 0,
  total_bounced int DEFAULT 0,
  total_unsubscribed int DEFAULT 0,
  
  -- Calculated rates (updated via triggers)
  delivery_rate decimal(5,2) DEFAULT 0,
  open_rate decimal(5,2) DEFAULT 0,
  click_rate decimal(5,2) DEFAULT 0,
  
  -- Timestamps
  last_updated timestamptz NOT NULL DEFAULT now(),
  
  UNIQUE(template_key)
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_email_templates_key ON email_templates(template_key);
CREATE INDEX IF NOT EXISTS idx_email_templates_active ON email_templates(active);
CREATE INDEX IF NOT EXISTS idx_email_templates_sequence ON email_templates(order_sequence);
CREATE INDEX IF NOT EXISTS idx_email_sends_subscriber ON email_sends(subscriber_email);
CREATE INDEX IF NOT EXISTS idx_email_sends_template_key ON email_sends(template_key);
CREATE INDEX IF NOT EXISTS idx_email_sends_sent_at ON email_sends(sent_at);
CREATE INDEX IF NOT EXISTS idx_email_sends_status ON email_sends(delivery_status);
CREATE INDEX IF NOT EXISTS idx_email_sends_resend_id ON email_sends(resend_message_id);

-- Enable RLS
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sends ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_template_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for email_templates table
CREATE POLICY "Allow service role full access on email_templates"
ON email_templates FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated read access on email_templates"
ON email_templates FOR SELECT
TO authenticated
USING (active = true);

-- RLS Policies for email_sends table
CREATE POLICY "Allow service role full access on email_sends"
ON email_sends FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- RLS Policies for email_template_analytics table
CREATE POLICY "Allow service role full access on email_template_analytics"
ON email_template_analytics FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated read access on email_template_analytics"
ON email_template_analytics FOR SELECT
TO authenticated
USING (true);

-- Trigger for updated_at on email_templates
CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON email_templates 
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enhanced function to get next unsent template for a subscriber with full lesson sequencing
CREATE OR REPLACE FUNCTION get_next_unsent_template(p_subscriber_email text)
RETURNS TABLE(
  template_key text, 
  subject text, 
  preview_text text, 
  html_content text, 
  plain_text_content text,
  order_sequence int
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    et.template_key, 
    et.subject, 
    et.preview_text, 
    et.html_content, 
    et.plain_text_content,
    et.order_sequence
  FROM email_templates et
  WHERE et.active = true
    AND et.category = 'marketing'
    AND et.template_key NOT IN (
      SELECT es.template_key 
      FROM email_sends es 
      WHERE es.subscriber_email = p_subscriber_email
        AND es.delivery_status IN ('sent', 'delivered')
    )
  ORDER BY et.order_sequence ASC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get subscribers ready for next email based on advanced cadence
CREATE OR REPLACE FUNCTION get_subscribers_ready_for_email(
  p_reference_date timestamptz DEFAULT '2025-02-20T00:00:00Z',
  p_limit int DEFAULT 50
)
RETURNS TABLE(
  lead_id uuid,
  email text, 
  first_name text, 
  signup_date timestamptz, 
  days_since_signup int,
  last_sent_at timestamptz,
  next_template_key text
) AS $$
DECLARE
  days_until_reference int;
BEGIN
  days_until_reference := EXTRACT(DAY FROM p_reference_date - now()::date);
  
  RETURN QUERY
  WITH subscriber_stats AS (
    SELECT 
      l.id as lead_id,
      l.email,
      l.first_name,
      l.created_at as signup_date,
      EXTRACT(DAY FROM now() - l.created_at)::int as days_since_signup,
      COALESCE(MAX(es.sent_at), l.created_at) as last_sent_at,
      COUNT(es.id) as emails_sent
    FROM leads l
    LEFT JOIN email_sends es ON l.email = es.subscriber_email 
      AND es.delivery_status IN ('sent', 'delivered')
    WHERE l.consent_marketing = true 
      AND l.registered = false
    GROUP BY l.id, l.email, l.first_name, l.created_at
  ),
  eligible_subscribers AS (
    SELECT 
      s.*,
      CASE 
        -- First email: send immediately (within 1 hour of signup)
        WHEN s.emails_sent = 0 AND s.days_since_signup = 0 THEN true
        -- Outside 30 days from Feb 20: every 7 days
        WHEN days_until_reference > 30 AND EXTRACT(DAY FROM now() - s.last_sent_at) >= 7 THEN true
        -- Inside 30 days: every 3 days
        WHEN days_until_reference <= 30 AND days_until_reference > 7 AND EXTRACT(DAY FROM now() - s.last_sent_at) >= 3 THEN true
        -- Inside 7 days: daily
        WHEN days_until_reference <= 7 AND EXTRACT(DAY FROM now() - s.last_sent_at) >= 1 THEN true
        ELSE false
      END as is_ready
    FROM subscriber_stats s
  )
  SELECT 
    es.lead_id,
    es.email,
    es.first_name,
    es.signup_date,
    es.days_since_signup,
    es.last_sent_at,
    nt.template_key as next_template_key
  FROM eligible_subscribers es
  CROSS JOIN LATERAL (
    SELECT template_key 
    FROM get_next_unsent_template(es.email)
  ) nt
  WHERE es.is_ready = true
    AND nt.template_key IS NOT NULL
  ORDER BY es.signup_date ASC
  LIMIT p_limit;
    
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update email template analytics
CREATE OR REPLACE FUNCTION update_template_analytics(p_template_key text)
RETURNS void AS $$
DECLARE
  sent_count int := 0;
  delivered_count int := 0;
  bounced_count int := 0;
BEGIN
  -- Get counts from email_sends
  SELECT 
    COUNT(*) FILTER (WHERE delivery_status IN ('sent', 'delivered')),
    COUNT(*) FILTER (WHERE delivery_status = 'delivered'),
    COUNT(*) FILTER (WHERE delivery_status = 'bounced')
  INTO sent_count, delivered_count, bounced_count
  FROM email_sends 
  WHERE template_key = p_template_key;
  
  -- Upsert analytics record
  INSERT INTO email_template_analytics (
    template_key, 
    total_sent, 
    total_delivered, 
    total_bounced,
    delivery_rate,
    last_updated
  ) VALUES (
    p_template_key,
    sent_count,
    delivered_count,
    bounced_count,
    CASE WHEN sent_count > 0 THEN (delivered_count::decimal / sent_count) * 100 ELSE 0 END,
    now()
  )
  ON CONFLICT (template_key) DO UPDATE SET
    total_sent = EXCLUDED.total_sent,
    total_delivered = EXCLUDED.total_delivered,
    total_bounced = EXCLUDED.total_bounced,
    delivery_rate = EXCLUDED.delivery_rate,
    last_updated = EXCLUDED.last_updated;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update analytics when email_sends changes
CREATE OR REPLACE FUNCTION trigger_update_template_analytics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update analytics for the affected template
  PERFORM update_template_analytics(
    CASE WHEN TG_OP = 'DELETE' THEN OLD.template_key ELSE NEW.template_key END
  );
  
  RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER email_sends_analytics_trigger
  AFTER INSERT OR UPDATE OR DELETE ON email_sends
  FOR EACH ROW EXECUTE FUNCTION trigger_update_template_analytics();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;