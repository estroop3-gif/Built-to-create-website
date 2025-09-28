-- Profiles table
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  email text unique,
  created_at timestamp with time zone default now()
);

-- Products table
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  type text not null,           -- course_year1, course_year2, retreat
  price_cents integer not null,
  recurring boolean default false,
  interval text,                -- month or year when recurring
  metadata jsonb default '{}'::jsonb
);

-- Purchases table
create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  amount_cents integer not null,
  currency text default 'usd',
  status text not null,         -- paid, pending, failed, refunded
  created_at timestamp with time zone default now()
);

-- Enrollments table
create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  program text not null,        -- year1, year2
  active boolean default true,
  created_at timestamp with time zone default now()
);

-- Retreat access table
create table public.retreat_access (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  retreat_slug text not null,   -- costa-rica, greece, africa, japan, panama, london, germany, thailand
  granted_by text,              -- purchase, admin, bundle
  created_at timestamp with time zone default now(),
  unique(user_id, retreat_slug)
);

-- Retreat content table
create table public.retreat_content (
  id uuid primary key default gen_random_uuid(),
  retreat_slug text not null,
  section text not null,        -- itinerary, packing, travel, flights, lodging, safety, visa
  title text not null,
  body text,
  order_index integer default 0
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.purchases enable row level security;
alter table public.enrollments enable row level security;
alter table public.retreat_access enable row level security;
alter table public.retreat_content enable row level security;

-- RLS Policies
create policy "select own profile" on public.profiles
  for select using (id = auth.uid());

create policy "select own purchases" on public.purchases
  for select using (user_id = auth.uid());

create policy "select own enrollments" on public.enrollments
  for select using (user_id = auth.uid());

create policy "select own access" on public.retreat_access
  for select using (user_id = auth.uid());

create policy "select content with access" on public.retreat_content
  for select using (
    exists (
      select 1 from public.retreat_access ra
      where ra.user_id = auth.uid() and ra.retreat_slug = retreat_content.retreat_slug
    )
  );

-- Insert sample products
insert into public.products (slug, name, type, price_cents, recurring, interval) values
  ('course-year1-annual', '1-Year Program (Annual)', 'course_year1', 3500000, false, null),
  ('course-year1-monthly', '1-Year Program (Monthly)', 'course_year1', 299500, true, 'month'),
  ('course-year2-annual', '2-Year Mastery Program Year 2 (Annual)', 'course_year2', 3200000, false, null),
  ('course-year2-monthly', '2-Year Mastery Program Year 2 (Monthly)', 'course_year2', 279500, true, 'month'),
  ('retreat-standalone', 'Retreat (Standalone)', 'retreat', 595000, false, null);