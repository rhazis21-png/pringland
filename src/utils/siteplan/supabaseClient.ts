import { createClient } from '@supabase/supabase-js';

/**
 * Central Supabase client for the interactive siteplan features.
 *
 * NOTE:
 * - URL and anon key are read from Vite env variables.
 * - These should be defined in your local `.env` / `.env.local`:
 *   - VITE_SUPABASE_URL
 *   - VITE_SUPABASE_ANON_KEY
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // We intentionally only warn here so that the rest of the app can still load
  // in environments where Supabase is not configured yet.
  // Actual data-fetching code should handle missing client config gracefully.
  // eslint-disable-next-line no-console
  console.warn(
    '[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. ' +
      'Interactive siteplan features depending on Supabase will be disabled.',
  );
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;