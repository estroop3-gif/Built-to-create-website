-- Migration 007: Blast notifications table
-- Email blasts to registered attendees of an experience

CREATE TABLE IF NOT EXISTS blast_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id uuid REFERENCES experiences(id) ON DELETE CASCADE,
  subject text NOT NULL,
  html_content text NOT NULL,
  text_content text,
  sent_by uuid REFERENCES auth.users(id),
  sent_at timestamptz,
  recipient_count integer DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sending', 'sent', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blast_notifications_experience ON blast_notifications(experience_id);
CREATE INDEX IF NOT EXISTS idx_blast_notifications_status ON blast_notifications(status);

-- RLS
ALTER TABLE blast_notifications ENABLE ROW LEVEL SECURITY;

-- Only service role can access blast notifications (admin operations only)
