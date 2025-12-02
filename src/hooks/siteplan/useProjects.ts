import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/src/utils/siteplan/supabaseClient';
import type { Project } from '@/src/types/siteplan/models';

interface UseProjectsResult {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  isSupabaseConfigured: boolean;
}

/**
 * Fetch published projects from Supabase.
 *
 * - Filters by status = 'published'
 * - Orders by display_order ascending
 * - Degrades gracefully when Supabase is not configured yet
 */
const fetchProjects = async (): Promise<Project[]> => {
  if (!supabase) {
    // When Supabase is not configured (e.g., missing env vars),
    // we simply return an empty list. The UI can show a friendly
    // message instead of breaking.
    return [];
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true });

  if (error) {
    throw error;
  }

  // We trust the backend schema to mostly align with Project,
  // but we keep fields like totalUnits/availableUnits optional.
  return (data as unknown) as Project[];
};

export const useProjects = (): UseProjectsResult => {
  const isSupabaseConfigured = Boolean(supabase);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['projects', { status: 'published' }],
    queryFn: fetchProjects,
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