import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/src/utils/siteplan/supabaseClient';
import {
  validateBookingData,
  validateDocumentFile,
} from '@/src/utils/siteplan/validation';
import type {
  Booking,
  BookingData,
  Project,
  Transaction,
  Unit,
} from '@/src/types/siteplan/models';

/**
 * Ensure Supabase client exists before performing any operation.
 */
const assertSupabaseClient = () => {
  if (!supabase) {
    throw new Error(
      '[Supabase] Client is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    );
  }
  return supabase;
};

/**
 * Map raw Supabase row (snake_case) to Project domain model (camelCase).
 * This keeps the rest of the app independent from database naming.
 */
const mapProjectRow = (row: any): Project => {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    location: row.location ?? undefined,
    description: row.description ?? undefined,
    totalArea: row.total_area ?? 0,
    layoutType: row.layout_type,
    layoutConfig: row.layout_config,
    backgroundImageUrl: row.background_image_url ?? undefined,
    backgroundOpacity: row.background_opacity ?? undefined,
    backgroundVisible: row.background_visible ?? undefined,
    thumbnailUrl: row.thumbnail_url ?? undefined,
    status: row.status,
    displayOrder: row.display_order ?? 0,
    isFeatured: row.is_featured ?? false,
    // These may come from a view or computed query later
    totalUnits: row.total_units ?? undefined,
    availableUnits: row.available_units ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const mapUnitRow = (row: any): Unit => {
  return {
    id: row.id,
    projectId: row.project_id,
    blockId: row.block_id ?? undefined,
    unitNumber: row.unit_number,
    luasLahan: row.luas_lahan ?? 0,
    luasUnit: row.luas_unit ?? 0,
    commodityType: row.commodity_type ?? undefined,
    livestockType: row.livestock_type ?? undefined,
    status: row.status,
    position: row.position ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const mapBookingRow = (row: any): Booking => {
  return {
    id: row.id,
    unitId: row.unit_id,
    marketingAgentId: row.marketing_agent_id,
    namaCalonPembeli: row.nama_calon_pembeli,
    nomorHP: row.nomor_hp,
    kkFileUrl: row.kk_file_url ?? undefined,
    ktpFileUrl: row.ktp_file_url ?? undefined,
    catatan: row.catatan ?? undefined,
    bookingDate: row.booking_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const mapTransactionRow = (row: any): Transaction => {
  return {
    id: row.id,
    unitId: row.unit_id,
    bookingId: row.booking_id ?? undefined,
    marketingAgentId: row.marketing_agent_id,
    namaPembeli: row.nama_pembeli,
    nomorHP: row.nomor_hp,
    email: row.email ?? undefined,
    alamat: row.alamat ?? undefined,
    tanggalTransaksi: row.tanggal_transaksi,
    nominalTransaksi: Number(row.nominal_transaksi),
    nomorSPJK: row.nomor_spjk ?? undefined,
    metodePembayaran: row.metode_pembayaran ?? undefined,
    buktiPembayaranUrl: row.bukti_pembayaran_url ?? undefined,
    commissionAmount:
      typeof row.commission_amount === 'number'
        ? row.commission_amount
        : row.commission_amount
        ? Number(row.commission_amount)
        : undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

/**
 * Upload a KK/KTP or related document to the `documents` bucket.
 * Validates file type and size according to requirements (JPG/PNG/PDF, max 5MB).
 */
const uploadDocumentFile = async (
  file: File,
  pathPrefix: string,
): Promise<string> => {
  const client = assertSupabaseClient();

  const validation = validateDocumentFile(file);
  if (!validation.isValid) {
    throw new Error(validation.errors.join('\n'));
  }

  const ext = file.name.split('.').pop() || 'dat';
  const safePrefix = pathPrefix.replace(/[^a-zA-Z0-9/_-]/g, '_');
  const objectPath = `${safePrefix}/${Date.now()}_${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const { data, error } = await client.storage
    .from('documents')
    .upload(objectPath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw error;
  }

  return data.path;
};

/**
 * Fetch all published projects ordered by display_order.
 *
 * RLS:
 * - Public and authenticated users can only see projects with status = 'published'.
 */
export const fetchProjectsPublished = async (): Promise<Project[]> => {
  const client = assertSupabaseClient();

  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapProjectRow);
};

/**
 * Fetch units for a specific project.
 *
 * RLS:
 * - Public can only see units whose project has status 'published'.
 * - Superadmin can see all units.
 */
export const fetchUnitsByProject = async (
  projectId: string,
): Promise<Unit[]> => {
  const client = assertSupabaseClient();

  const { data, error } = await client
    .from('units')
    .select('*')
    .eq('project_id', projectId)
    .order('unit_number', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapUnitRow);
};

/**
 * Fetch a single unit by id.
 */
export const fetchUnitById = async (unitId: string): Promise<Unit | null> => {
  const client = assertSupabaseClient();

  const { data, error } = await client
    .from('units')
    .select('*')
    .eq('id', unitId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapUnitRow(data) : null;
};

/**
 * Fetch bookings for a specific marketing agent.
 *
 * RLS:
 * - Marketing agent can only see their own bookings.
 * - Superadmin can see all bookings (admin_users table).
 */
export const fetchBookingsByMarketingAgent = async (
  marketingAgentId: string,
): Promise<Booking[]> => {
  const client = assertSupabaseClient();

  const { data, error } = await client
    .from('bookings')
    .select('*')
    .eq('marketing_agent_id', marketingAgentId)
    .order('booking_date', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapBookingRow);
};

export interface CreateBookingParams {
  bookingData: BookingData;
  marketingAgentId: string;
}

/**
 * Create a booking:
 * - Validates booking data (name, phone, required files).
 * - Uploads KK & KTP to `documents` bucket.
 * - Inserts booking row.
 * - Updates unit status to 'booking'.
 *
 * RLS:
 * - INSERT on bookings requires auth.uid() = marketing_agent_id.
 * - UPDATE on units is allowed via policy
 *   \"Marketing agents can update status of own booked units\".
 */
export const createBooking = async (params: CreateBookingParams) => {
  const client = assertSupabaseClient();
  const { bookingData, marketingAgentId } = params;

  const validation = validateBookingData(bookingData);
  if (!validation.isValid) {
    throw new Error(validation.errors.join('\n'));
  }

  if (!bookingData.kkFile || !bookingData.ktpFile) {
    throw new Error('File KK dan KTP harus diupload');
  }

  // Upload documents first; if DB operation fails, files remain as audit trail.
  const kkPath = await uploadDocumentFile(
    bookingData.kkFile,
    `bookings/${bookingData.unitId}`,
  );
  const ktpPath = await uploadDocumentFile(
    bookingData.ktpFile,
    `bookings/${bookingData.unitId}`,
  );

  // Create booking
  const { data: bookingRow, error: bookingError } = await client
    .from('bookings')
    .insert({
      unit_id: bookingData.unitId,
      marketing_agent_id: marketingAgentId,
      nama_calon_pembeli: bookingData.namaCalonPembeli,
      nomor_hp: bookingData.nomorHP,
      kk_file_url: kkPath,
      ktp_file_url: ktpPath,
      catatan: bookingData.catatan ?? null,
    })
    .select('*')
    .single();

  if (bookingError) {
    throw bookingError;
  }

  // Update unit status to 'booking' if it is still available.
  const { data: unitRow, error: unitError } = await client
    .from('units')
    .update({ status: 'booking' })
    .eq('id', bookingData.unitId)
    .eq('status', 'available')
    .select('*')
    .single();

  if (unitError) {
    // Best-effort compensation: try to remove the booking we just created.
    // RLS allows this because the booking belongs to the current marketing agent.
    await client.from('bookings').delete().eq('id', bookingRow.id);
    throw unitError;
  }

  return {
    booking: mapBookingRow(bookingRow),
    unit: mapUnitRow(unitRow),
  };
};

export interface CancelBookingParams {
  bookingId: string;
}

/**
 * Cancel a booking:
 * - Sets unit status back to 'available'.
 * - Deletes booking row (files remain in Storage for audit trail).
 *
 * Behaviour for cross-agent cancellation:
 * - If a marketing agent attempts to cancel a booking they do not own,
 *   RLS will block the operation and this helper will surface the
 *   friendly message from the requirements.
 */
export const cancelBooking = async (params: CancelBookingParams) => {
  const client = assertSupabaseClient();
  const { bookingId } = params;

  // Fetch booking to get unit_id. RLS ensures the current user either:
  // - Sees their own booking, or
  // - Gets an RLS error / no rows.
  const { data: bookingRow, error: fetchError } = await client
    .from('bookings')
    .select('id, unit_id')
    .eq('id', bookingId)
    .single();

  if (fetchError) {
    // RLS or missing row -> show business message from Property 8.
    const message =
      'Anda tidak dapat membatalkan booking yang dibuat oleh marketing lain';
    throw new Error(message);
  }

  // Set unit back to available only if it is currently in booking status.
  const { error: unitError } = await client
    .from('units')
    .update({ status: 'available' })
    .eq('id', bookingRow.unit_id)
    .eq('status', 'booking');

  if (unitError) {
    throw unitError;
  }

  // Delete booking row. Files in storage are intentionally kept.
  const { error: deleteError } = await client
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (deleteError) {
    throw deleteError;
  }
};

export interface MarkUnitSoldParams {
  unitId: string;
  bookingId?: string;
  marketingAgentId: string;
  namaPembeli: string;
  nomorHP: string;
  email?: string;
  alamat?: string;
  tanggalTransaksi: string; // YYYY-MM-DD
  nominalTransaksi: number;
  nomorSPJK?: string;
  metodePembayaran?: string;
  buktiPembayaranFile?: File | null;
}

/**
 * Mark a unit as sold and create a transaction record.
 *
 * RLS:
 * - INSERT into transactions requires auth.uid() = marketing_agent_id.
 * - UPDATE on units is allowed via the units policy for booked units
 *   (when there is a booking linked to this unit and agent) or via
 *   superadmin full access.
 */
export const markUnitSold = async (
  params: MarkUnitSoldParams,
): Promise<{ transaction: Transaction; unit: Unit }> => {
  const client = assertSupabaseClient();

  const {
    unitId,
    bookingId,
    marketingAgentId,
    namaPembeli,
    nomorHP,
    email,
    alamat,
    tanggalTransaksi,
    nominalTransaksi,
    nomorSPJK,
    metodePembayaran,
    buktiPembayaranFile,
  } = params;

  let buktiPath: string | undefined;

  if (buktiPembayaranFile) {
    buktiPath = await uploadDocumentFile(
      buktiPembayaranFile,
      `transactions/${unitId}`,
    );
  }

  const { data: transactionRow, error: txError } = await client
    .from('transactions')
    .insert({
      unit_id: unitId,
      booking_id: bookingId ?? null,
      marketing_agent_id: marketingAgentId,
      nama_pembeli: namaPembeli,
      nomor_hp: nomorHP,
      email: email ?? null,
      alamat: alamat ?? null,
      tanggal_transaksi: tanggalTransaksi,
      nominal_transaksi: nominalTransaksi,
      nomor_spjk: nomorSPJK ?? null,
      metode_pembayaran: metodePembayaran ?? null,
      bukti_pembayaran_url: buktiPath ?? null,
    })
    .select('*')
    .single();

  if (txError) {
    throw txError;
  }

  const { data: unitRow, error: unitError } = await client
    .from('units')
    .update({ status: 'sold' })
    .eq('id', unitId)
    .select('*')
    .single();

  if (unitError) {
    throw unitError;
  }

  return {
    transaction: mapTransactionRow(transactionRow),
    unit: mapUnitRow(unitRow),
  };
};

export type UnitRealtimeCallback = (payload: {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  unit: Unit;
  previous?: Unit | null;
}) => void;

export type BookingRealtimeCallback = (payload: {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  booking: Booking;
  previous?: Booking | null;
}) => void;

/**
 * Subscribe to realtime changes for units in a given project.
 *
 * Usage:
 *   const channel = subscribeToUnitsRealtime(projectId, (payload) => { ... });
 *   // later: channel.unsubscribe();
 */
export const subscribeToUnitsRealtime = (
  projectId: string,
  callback: UnitRealtimeCallback,
): RealtimeChannel => {
  const client = assertSupabaseClient();

  const channel = client
    .channel(`units:project_id=eq.${projectId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'units',
        filter: `project_id=eq.${projectId}`,
      },
      (payload: any) => {
        const eventType = payload.eventType as
          | 'INSERT'
          | 'UPDATE'
          | 'DELETE';

        const newUnit = payload.new ? mapUnitRow(payload.new) : null;
        const oldUnit = payload.old ? mapUnitRow(payload.old) : null;

        callback({
          eventType,
          unit: (newUnit ?? oldUnit) as Unit,
          previous: oldUnit,
        });
      },
    )
    .subscribe();

  return channel;
};

/**
 * Subscribe to realtime changes for bookings of a specific marketing agent.
 *
 * This is intended for the Marketing Dashboard.
 */
export const subscribeToBookingsRealtime = (
  marketingAgentId: string,
  callback: BookingRealtimeCallback,
): RealtimeChannel => {
  const client = assertSupabaseClient();

  const channel = client
    .channel(`bookings:marketing_agent_id=eq.${marketingAgentId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'bookings',
        filter: `marketing_agent_id=eq.${marketingAgentId}`,
      },
      (payload: any) => {
        const eventType = payload.eventType as
          | 'INSERT'
          | 'UPDATE'
          | 'DELETE';

        const newBooking = payload.new ? mapBookingRow(payload.new) : null;
        const oldBooking = payload.old ? mapBookingRow(payload.old) : null;

        callback({
          eventType,
          booking: (newBooking ?? oldBooking) as Booking,
          previous: oldBooking,
        });
      },
    )
    .subscribe();

  return channel;
};