import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/src/utils/siteplan/supabaseClient';
import type { Unit } from '@/src/types/siteplan/models';

interface UseProjectUnitsResult {
  units: Unit[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  isSupabaseConfigured: boolean;
}

/**
 * Fetch units for a given project and keep them in sync via Supabase Realtime.
 *
 * - Initial load: SELECT * FROM units WHERE project_id = $projectId
 * - Realtime: listens to INSERT / UPDATE / DELETE on units for that project
 *
 * This underpins:
 * - Real-time unit status on Masterplan View (Req 2.3)
 * - Real-time unit status on Detail Unit View (Req 4.6)
 */
const fetchUnitsForProject = async (projectId: string): Promise<Unit[]> => {
  if (!supabase || !projectId) {
    return [];
  }

  const { data, error } = await supabase
    .from('units')
    .select('*')
    .eq('project_id', projectId)
    .order('unit_number', { ascending: true });

  if (error) {
    throw error;
  }

  return (data as unknown) as Unit[];
};

export const useProjectUnits = (projectId: string | null): UseProjectUnitsResult => {
  const isSupabaseConfigured = Boolean(supabase);
  const effectiveProjectId = projectId ?? '';

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['units', { projectId: effectiveProjectId }],
    // Only fetch when Supabase is configured and we have a project id
    queryFn: () => fetchUnitsForProject(effectiveProjectId),
    enabled: isSupabaseConfigured && Boolean(effectiveProjectId),
  });

  const [units, setUnits] = useState<Unit[]>(data ?? []);

  // Keep local state in sync with query data
  useEffect(() => {
    if (data) {
      setUnits(data);
    } else if (!effectiveProjectId) {
      setUnits([]);
    }
  }, [data, effectiveProjectId]);

  // Subscribe to Supabase Realtime for live updates
  useEffect(() => {
    if (!supabase || !effectiveProjectId) {
      return;
    }

    const channel = supabase
      .channel(`units:project_id=eq.${effectiveProjectId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'units',
          filter: `project_id=eq.${effectiveProjectId}`,
        },
        (payload) => {
          setUnits((prev) => {
            if (payload.eventType === 'INSERT') {
              const next = [...prev, (payload.new as unknown) as Unit];
              return next;
            }

            if (payload.eventType === 'UPDATE') {
              const updated = (payload.new as unknown) as Unit;
              return prev.map((u) => (u.id === updated.id ? updated : u));
            }

            if (payload.eventType === 'DELETE') {
              const deleted = (payload.old as unknown) as Unit;
              return prev.filter((u) => u.id !== deleted.id);
            }

            return prev;
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [effectiveProjectId]);

  return {
    units,
    isLoading: isLoading && isSupabaseConfigured && Boolean(effectiveProjectId),
    isError: isError && isSupabaseConfigured && Boolean(effectiveProjectId),
    errorMessage: error ? 'Gagal memuat data unit, silakan coba lagi' : undefined,
    isSupabaseConfigured,
  };
};