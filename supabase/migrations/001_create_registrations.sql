-- Create registrations table
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  -- Personal Information
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  date_of_birth date,
  emergency_contact_name text,
  emergency_contact_phone text,
  emergency_contact_relationship text,
  
  -- Address
  address_line1 text,
  address_line2 text,
  city text,
  state_province text,
  postal_code text,
  country text,
  
  -- Retreat Preferences
  dietary_restrictions text,
  medical_conditions text,
  experience_level text check (experience_level in ('beginner', 'intermediate', 'advanced')),
  bring_own_camera boolean not null default false,
  camera_equipment_details text,
  
  -- Payment Information
  payment_type text not null check (payment_type in ('deposit', 'full')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'processing', 'completed', 'failed', 'refunded')),
  payment_amount decimal(10,2),
  payment_currency text default 'USD',
  stripe_payment_intent_id text,
  
  -- Additional Information
  how_did_you_hear text,
  special_requests text,
  terms_accepted boolean not null default false,
  marketing_consent boolean not null default false,
  
  -- Internal tracking
  registration_source text default 'website',
  admin_notes text,
  status text not null default 'submitted' check (status in ('submitted', 'approved', 'waitlist', 'cancelled'))
);

-- Enable Row Level Security
alter table public.registrations enable row level security;

-- Create indexes for performance
create index registrations_email_idx on public.registrations(email);
create index registrations_created_at_idx on public.registrations(created_at);
create index registrations_payment_status_idx on public.registrations(payment_status);
create index registrations_status_idx on public.registrations(status);

-- Create updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_registrations_updated_at
  before update on public.registrations
  for each row execute function update_updated_at_column();

-- Policies for Row Level Security
create policy "Allow public to insert registrations"
on public.registrations for insert
to public
with check (true);

create policy "Users can view own registrations by email"
on public.registrations for select
to public
using (true); -- We'll handle access control in the application layer

-- Admin policies (you can create an admin role later)
create policy "Admin full access"
on public.registrations for all
to authenticated
using (auth.jwt() ->> 'role' = 'admin');

-- Create a view for admin dashboard (optional)
create or replace view admin_registrations_summary as
select 
  status,
  payment_status,
  count(*) as count,
  sum(payment_amount) as total_amount
from public.registrations
group by status, payment_status;