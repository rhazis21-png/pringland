import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/src/utils/siteplan/supabaseClient';
import type { Project } from '@/src/types/siteplan/models';
import { fetchProjectsPublished } from '@/src/utils/siteplan/api';

interface UseProjectsResult {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  isSupabaseConfigured: boolean;
}

/**
 * React Query hook to fetch published projects from Supabase.
 *
 * - Delegates the actual fetch logic to fetchProjectsPublished()
 * - Uses enabled flag so we never call Supabase when it is not configured
 */
export const useProjects = (): UseProjectsResult => {
  const isSupabaseConfigured = Boolean(supabase);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['projects', { status: 'published' }],
    queryFn: fetchProjectsPublished,
    enabled: isSupabaseConfigured,
  });

  return {
    projects: data ?? [],
    isLoading: isLoading && isSupabaseConfigured,
    isError: isError && isSupabaseConfigured,
    errorMessage: error ? 'Gagal memuat data project, silakan coba lagi' : undefined,
    isSupabaseConfigured,
  };
};