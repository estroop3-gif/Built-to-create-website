-- Add admin role to profiles table
alter table public.profiles add column if not exists is_admin boolean default false;

-- Create helper function to check admin status
create or replace function public.is_admin() returns boolean
language sql stable security definer as $$
  select coalesce(
    (select p.is_admin from public.profiles p
     where p.id = auth.uid() limit 1),
    false)
$$;

-- Create audit log table
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor uuid references public.profiles(id),
  action text not null,
  target text,
  payload jsonb,
  created_at timestamptz default now()
);

-- Enable RLS on audit log
alter table public.audit_log enable row level security;

-- Update purchases policies
drop policy if exists "select own purchases" on public.purchases;
create policy "user or admin can select purchases" on public.purchases
for select using (user_id = auth.uid() or public.is_admin());

create policy if not exists "admin manage purchases" on public.purchases
for all using (public.is_admin()) with check (public.is_admin());

-- Update enrollments policies
drop policy if exists "select own enrollments" on public.enrollments;
create policy "user or admin can select enrollments" on public.enrollments
for select using (user_id = auth.uid() or public.is_admin());

create policy if not exists "admin manage enrollments" on public.enrollments
for all using (public.is_admin()) with check (public.is_admin());

-- Update retreat_access policies
drop policy if exists "select own access" on public.retreat_access;
create policy "user or admin can select retreat_access" on public.retreat_access
for select using (user_id = auth.uid() or public.is_admin());

create policy if not exists "admin manage retreat_access" on public.retreat_access
for all using (public.is_admin()) with check (public.is_admin());

-- Update retreat_content policies
drop policy if exists "select content with access" on public.retreat_content;
create policy "user can read retreat_content with access" on public.retreat_content
for select using (
  public.is_admin()
  or exists (
    select 1 from public.retreat_access ra
    where ra.user_id = auth.uid()
      and ra.retreat_slug = retreat_content.retreat_slug
  )
);

create policy if not exists "admin manage retreat_content" on public.retreat_content
for all using (public.is_admin()) with check (public.is_admin());

-- Update profiles policies
drop policy if exists "select own profile" on public.profiles;
create policy "user or admin can select profiles" on public.profiles
for select using (id = auth.uid() or public.is_admin());

create policy if not exists "user update own profile" on public.profiles
for update using (id = auth.uid() and not public.is_admin())
with check (id = auth.uid() and not public.is_admin());

create policy if not exists "admin manage profiles" on public.profiles
for all using (public.is_admin()) with check (public.is_admin());

-- Audit log policies
create policy if not exists "admin manage audit_log" on public.audit_log
for all using (public.is_admin()) with check (public.is_admin());