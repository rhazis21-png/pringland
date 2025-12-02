import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/src/utils/siteplan/supabaseClient';
import type {
  CanvasElement,
  CanvasElementProperties,
  CanvasElementType,
  Position,
} from '@/src/types/siteplan/models';

interface UseCanvasElementsResult {
  elements: CanvasElement[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  isSupabaseConfigured: boolean;
}

/**
 * Fetch canvas elements (blocks, facilities, decorations, units) for a project.
 *
 * Public Masterplan View uses this in read-only mode to render:
 * - Block elements (clusters/zones)
 * - Facility elements
 * - Decoration elements
 *
 * Background images are stored on the project itself and intentionally
 * NOT rendered in public view (Requirement 23A.12).
 */
const fetchCanvasElements = async (projectId: string): Promise<CanvasElement[]> => {
  if (!supabase || !projectId) {
    return [];
  }

  const { data, error } = await supabase
    .from('canvas_elements')
    .select('*')
    .eq('project_id', projectId);

  if (error) {
    throw error;
  }

  return (data as any[]).map((row) => ({
    id: row.id as string,
    projectId: row.project_id as string,
    type: row.element_type as CanvasElementType,
    position: row.position as Position,
    size: row.size as { width: number; height: number },
    zIndex: typeof row.z_index === 'number' ? row.z_index : 0,
    properties: row.properties as CanvasElementProperties,
  }));
};

export const useCanvasElements = (projectId: string | null): UseCanvasElementsResult => {
  const isSupabaseConfigured = Boolean(supabase);
  const effectiveProjectId = projectId ?? '';

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['canvas_elements', { projectId: effectiveProjectId }],
    queryFn: () => fetchCanvasElements(effectiveProjectId),
    enabled: isSupabaseConfigured && Boolean(effectiveProjectId),
  });

  return {
    elements: data ?? [],
    isLoading: isLoading && isSupabaseConfigured && Boolean(effectiveProjectId),
    isError: isError && isSupabaseConfigured && Boolean(effectiveProjectId),
    errorMessage: error ? 'Gagal memuat masterplan, silakan coba lagi' : undefined,
    isSupabaseConfigured,
  };
};