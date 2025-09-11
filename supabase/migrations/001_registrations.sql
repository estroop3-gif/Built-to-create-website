CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.registrations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_session_id text UNIQUE,
  email text NOT NULL,
  first_name text,
  last_name text,
  phone text,
  date_of_birth text,
  address_line1 text,
  address_line2 text,
  city text,
  state_province text,
  postal_code text,
  country text,
  emergency_contact_name text,
  emergency_contact_phone text,
  emergency_contact_relationship text,
  experience_level text,
  bring_own_camera boolean,
  camera_equipment_details text,
  dietary_restrictions text,
  medical_conditions text,
  how_did_you_hear text,
  special_requests text,
  plan_label text,
  amount_paid numeric,
  currency text,
  retreat text,
  retreat_start date,
  retreat_location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_retreat_start ON public.registrations(retreat_start);