-- Supabase Storage Buckets & Policies
-- Task 3.3: Set up Supabase Storage buckets
--
-- Buckets used in this project:
--   - documents           : KK/KTP and other sensitive documents
--   - project-backgrounds : background images for Canvas Editor
--   - project-thumbnails  : thumbnails for project cards (public homepage)
--
-- Buckets must be created via Supabase Dashboard or CLI.
--
-- Example using Supabase CLI:
--   supabase storage create-bucket documents --public=false
--   supabase storage create-bucket project-backgrounds --public=false
--   supabase storage create-bucket project-thumbnails --public=true
--
-- After creating buckets, you can apply the following policies
-- in the SQL editor to control access.
--
-- NOTE:
-- - Storage objects live in the storage.objects table.
-- - bucket_id identifies which bucket the object belongs to.
-- - RLS on storage.objects must be enabled.

------------------------------------------------------------
-- Enable RLS on storage.objects
------------------------------------------------------------

alter table storage.objects enable row level security;

------------------------------------------------------------
-- DOCUMENTS BUCKET (KK/KTP, etc.)
-- Requirements: 6A.5 (file upload by marketing agents)
-- - Not public.
-- - Only authenticated users can read/write, with additional
--   restrictions enforced at application level (e.g., only
--   booking owner or superadmin may download).
------------------------------------------------------------

-- Authenticated users can upload to documents bucket
create policy if not exists "Authenticated users can upload to documents"
on storage.objects
for insert
with check (
  bucket_id = 'documents'
  and auth.role() = 'authenticated'
);

-- Authenticated users can read from documents bucket
-- (application code should still restrict links)
create policy if not exists "Authenticated users can read documents"
on storage.objects
for select
using (
  bucket_id = 'documents'
  and auth.role() = 'authenticated'
);

------------------------------------------------------------
-- PROJECT BACKGROUNDS BUCKET
-- Requirements: 23A.2, 23A.10
-- - Not public.
-- - Only superadmin (admin_users) can upload/update/delete.
-- - Application ensures images are only shown in Canvas Editor,
--   not in public masterplan view.
------------------------------------------------------------

-- Superadmin can insert/update/delete backgrounds
create policy if not exists "Superadmin manage project backgrounds"
on storage.objects
for all
using (
  bucket_id = 'project-backgrounds'
  and exists (
    select 1 from public.admin_users au
    where au.id = auth.uid()
  )
)
with check (
  bucket_id = 'project-backgrounds'
  and exists (
    select 1 from public.admin_users au
    where au.id = auth.uid()
  )
);

-- Authenticated users (e.g. canvas viewers) can read backgrounds if needed
create policy if not exists "Authenticated users can read project backgrounds"
on storage.objects
for select
using (
  bucket_id = 'project-backgrounds'
  and auth.role() = 'authenticated'
);

------------------------------------------------------------
-- PROJECT THUMBNAILS BUCKET
-- Requirements: 20.1, 26.2
-- - Publicly readable (thumbnails on homepage).
-- - Only superadmin can upload/update/delete.
------------------------------------------------------------

-- Public read access for thumbnails
create policy if not exists "Public can read project thumbnails"
on storage.objects
for select
using (
  bucket_id = 'project-thumbnails'
);

-- Superadmin manage thumbnails
create policy if not exists "Superadmin manage project thumbnails"
on storage.objects
for all
using (
  bucket_id = 'project-thumbnails'
  and exists (
    select 1 from public.admin_users au
    where au.id = auth.uid()
  )
)
with check (
  bucket_id = 'project-thumbnails'
  and exists (
    select 1 from public.admin_users au
    where au.id = auth.uid()
  )
);