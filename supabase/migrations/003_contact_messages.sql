-- Contact messages table for contact form submissions
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null check (position('@' in email) > 1),
  phone text,
  subject text not null,
  message text not null check (char_length(message) <= 2000),
  client_ip text,
  user_agent text,
  status text not null default 'received'
);

-- Enable RLS
alter table public.contact_messages enable row level security;

-- Policies for service role access
create policy "allow insert from service role"
on public.contact_messages
for insert
to service_role
with check (true);

create policy "allow read for service role"
on public.contact_messages
for select
to service_role
using (true);

-- Development policy (remove in production)
-- create policy "dev only allow anon insert"
-- on public.contact_messages
-- for insert
-- to anon
-- with check (true);