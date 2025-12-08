-- supabase/migrations/20241208_create_retreat_registrations.sql

-- Create the retreat_registrations table
CREATE TABLE IF NOT EXISTS public.retreat_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  -- Retreat identification
  retreat_id text NOT NULL,
  retreat_name text NOT NULL,

  -- Attendee information
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  church_name text,
  role text,

  -- Ticket and pricing
  ticket_type text,
  price_usd numeric,

  -- Status tracking
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'deposit_paid', 'paid_in_full', 'cancelled')),
  registration_status text NOT NULL DEFAULT 'pending_review' CHECK (registration_status IN ('pending_review', 'confirmed', 'waitlist', 'cancelled')),

  -- Source tracking
  source text,

  -- Admin notes
  internal_notes text
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_retreat_registrations_retreat_id ON public.retreat_registrations(retreat_id);
CREATE INDEX IF NOT EXISTS idx_retreat_registrations_email ON public.retreat_registrations(email);
CREATE INDEX IF NOT EXISTS idx_retreat_registrations_payment_status ON public.retreat_registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_retreat_registrations_registration_status ON public.retreat_registrations(registration_status);
CREATE INDEX IF NOT EXISTS idx_retreat_registrations_created_at ON public.retreat_registrations(created_at DESC);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_retreat_registrations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function on update
DROP TRIGGER IF EXISTS trigger_retreat_registrations_updated_at ON public.retreat_registrations;
CREATE TRIGGER trigger_retreat_registrations_updated_at
  BEFORE UPDATE ON public.retreat_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_retreat_registrations_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE public.retreat_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (full access)
CREATE POLICY "Service role has full access to retreat_registrations"
  ON public.retreat_registrations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to read their own registrations
CREATE POLICY "Users can view their own registrations"
  ON public.retreat_registrations
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Grant permissions
GRANT ALL ON public.retreat_registrations TO service_role;
GRANT SELECT ON public.retreat_registrations TO authenticated;
