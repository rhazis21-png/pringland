-- Supabase Database Schema for Pring Land Digital Platform
-- Task 3.1: Create database tables in Supabase
--
-- This script is intended to be executed in the Supabase SQL editor
-- or via the Supabase CLI. It defines the core tables:
--   - projects
--   - canvas_elements
--   - units
--   - bookings
--   - transactions
--   - marketing_agents
--
-- Assumptions:
-- - You are using the default "public" schema.
-- - Supabase's pgcrypto extension is enabled so gen_random_uuid() is available.

------------------------------------------------------------
-- PROJECTS
------------------------------------------------------------

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  slug varchar(255) unique not null,
  location varchar(255),
  description text,
  total_area numeric(10, 2),
  layout_type varchar(20) not null check (layout_type in ('grid', 'linear', 'curved')),
  layout_config jsonb not null,
  background_image_url text,
  background_opacity integer default 50 check (background_opacity between 0 and 100),
  background_visible boolean default true,
  thumbnail_url text,
  status varchar(20) default 'draft' check (status in ('draft', 'published', 'hidden')),
  display_order integer default 0,
  is_featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_projects_display_order on public.projects(display_order);
create index if not exists idx_projects_featured on public.projects(is_featured);

------------------------------------------------------------
-- CANVAS ELEMENTS
------------------------------------------------------------

create table if not exists public.canvas_elements (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  element_type varchar(20) not null check (element_type in ('block', 'facility', 'unit', 'decoration')),
  position jsonb not null,
  size jsonb not null,
  properties jsonb not null,
  z_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_canvas_elements_project on public.canvas_elements(project_id);
create index if not exists idx_canvas_elements_type on public.canvas_elements(element_type);

------------------------------------------------------------
-- UNITS
------------------------------------------------------------

create table if not exists public.units (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  block_id uuid references public.canvas_elements(id) on delete set null,
  unit_number varchar(50) not null,
  luas_lahan numeric(10, 2),
  luas_unit numeric(10, 2),
  commodity_type varchar(100),
  livestock_type varchar(100),
  status varchar(20) default 'available' check (status in ('available', 'booking', 'sold')),
  position jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (project_id, unit_number)
);

create index if not exists idx_units_project on public.units(project_id);
create index if not exists idx_units_status on public.units(status);
create index if not exists idx_units_block on public.units(block_id);

------------------------------------------------------------
-- BOOKINGS
------------------------------------------------------------

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units(id) on delete cascade,
  marketing_agent_id uuid not null references auth.users(id),
  nama_calon_pembeli varchar(255) not null,
  nomor_hp varchar(50) not null,
  kk_file_url text,
  ktp_file_url text,
  catatan text,
  booking_date timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_bookings_unit on public.bookings(unit_id);
create index if not exists idx_bookings_marketing on public.bookings(marketing_agent_id);

------------------------------------------------------------
-- TRANSACTIONS
------------------------------------------------------------

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units(id) on delete cascade,
  booking_id uuid references public.bookings(id),
  marketing_agent_id uuid not null references auth.users(id),
  nama_pembeli varchar(255) not null,
  nomor_hp varchar(50) not null,
  email varchar(255),
  alamat text,
  tanggal_transaksi date not null,
  nominal_transaksi numeric(15, 2) not null,
  nomor_spjk varchar(100),
  metode_pembayaran varchar(50),
  bukti_pembayaran_url text,
  commission_amount numeric(15, 2),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_transactions_unit on public.transactions(unit_id);
create index if not exists idx_transactions_marketing on public.transactions(marketing_agent_id);
create index if not exists idx_transactions_date on public.transactions(tanggal_transaksi);

------------------------------------------------------------
-- MARKETING AGENTS (extends auth.users)
------------------------------------------------------------

create table if not exists public.marketing_agents (
  id uuid primary key references auth.users(id) on delete cascade,
  name varchar(255) not null,
  phone_number varchar(50),
  status varchar(20) default 'active' check (status in ('active', 'inactive')),
  last_login timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_marketing_agents_status on public.marketing_agents(status);

------------------------------------------------------------
-- SUPERADMIN USERS (helper table for RLS)
------------------------------------------------------------

-- This table will be used in RLS policies to grant full access to
-- certain tables (projects, units, bookings, transactions, etc.)
-- for superadmin accounts. You can manage its content via the Supabase
-- dashboard or SQL.
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

------------------------------------------------------------
-- HELPER FUNCTIONS (OPTIONAL)
------------------------------------------------------------

-- Function to calculate available units count for a project.
-- Can be used in views or computed fields if needed.
create or replace function public.get_available_units_count(project_id uuid)
returns integer
language sql
stable
as $$
  select count(*)::integer
  from public.units
  where units.project_id = $1
    and units.status = 'available';
$$;

-- Function to calculate total units count for a project.
create or replace function public.get_total_units_count(project_id uuid)
returns integer
language sql
stable
as $$
  select count(*)::integer
  from public.units
  where units.project_id = $1;
$$;