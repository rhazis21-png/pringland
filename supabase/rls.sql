-- Supabase Row Level Security (RLS) Policies
-- Task 3.2: Implement RLS
--
-- This script assumes the tables in schema.sql already exist.
-- It enables RLS and defines policies for:
--   - marketing agents managing their own bookings
--   - superadmins (admin_users) having full access
--   - public users viewing only published projects and their units
--
-- NOTE:
-- - auth.uid() is provided by Supabase Auth.
-- - public.admin_users table is used to mark superadmin accounts.

------------------------------------------------------------
-- PROJECTS
------------------------------------------------------------

alter table public.projects enable row level security;

-- Public can view only published projects
create policy if not exists "Public can view published projects"
on public.projects
for select
using (status = 'published');

-- Superadmin full access to projects (CRUD)
create policy if not exists "Superadmin full access to projects"
on public.projects
for all
using (
  exists (
    select 1 from public.admin_users au
    where au.id = auth.uid()
  )
);

------------------------------------------------------------
-- UNITS
------------------------------------------------------------

alter table public.units enable row level security;

-- Public can view units only if their project is published
create policy if not exists "Public can view units of published projects"
on public.units
for select
using (
  exists (
    select 1
    from public.projects p
    where p.id = units.project_id
      and p.status = 'published'
  )
);

-- Superadmin full access to units
create policy if not exists "Superadmin full access to units"
on public.units
for all
using (
  exists (
    select 1 from public.admin_users au
    where au.id = auth.uid()
  )
);

------------------------------------------------------------
-- BOOKINGS
------------------------------------------------------------

alter table public.bookings enable row level security;

-- Marketing agents can view their own bookings
create policy if not exists "Marketing agents can view own bookings"
on public.bookings
for select
using (auth.uid() = marketing_agent_id);

-- Marketing agents can create bookings only for themselves
create policy if not exists "Marketing agents can create own bookings"
on public.bookings
for insert
with check (auth.uid() = marketing_agent_id);

-- Marketing agents can update only their own bookings
create policy if not exists "Marketing agents can update own bookings"
on public.bookings
for update
using (auth.uid() = marketing_agent_id);

-- Superadmin full access to bookings
create policy if not exists "Superadmin full access to bookings"
on public.bookings
for all
using (
  exists (
    select 1 from public.admin_users au
    where au.id = auth.uid()
  )
);

------------------------------------------------------------
-- TRANSACTIONS
------------------------------------------------------------

alter table public.transactions enable row level security;

-- Marketing agents can view their own transactions
create policy if not exists "Marketing agents can view own transactions"
on public.transactions
for select
using (auth.uid() = marketing_agent_id);

-- Marketing agents can insert transactions they own
create policy if not exists "Marketing agents can create own transactions"
on public.transactions
for insert
with check (auth.uid() = marketing_agent_id);

-- Superadmin full access to transactions
create policy if not exists "Superadmin full access to transactions"
on public.transactions
for all
using (
  exists (
    select 1 from public.admin_users au
    where au.id = auth.uid()
  )
);

------------------------------------------------------------
-- MARKETING AGENTS
------------------------------------------------------------

alter table public.marketing_agents enable row level security;

-- Superadmin can manage marketing agent records
create policy if not exists "Superadmin full access to marketing_agents"
on public.marketing_agents
for all
using (
  exists (
    select 1 from public.admin_users au
    where au.id = auth.uid()
  )
);

-- (Optional) Marketing agents can view their own profile
create policy if not exists "Marketing agents can view own profile"
on public.marketing_agents
for select
using (auth.uid() = id);

------------------------------------------------------------
-- ADMIN USERS
------------------------------------------------------------

alter table public.admin_users enable row level security;

-- Only existing superadmins can manage admin_users entries.
-- You will typically seed the first superadmin manually via SQL.
create policy if not exists "Superadmin manage admin_users"
on public.admin_users
for all
using (
  exists (
    select 1 from public.admin_users au
    where au.id = auth.uid()
  )
);