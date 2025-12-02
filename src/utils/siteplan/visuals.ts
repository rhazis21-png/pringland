import type { Project, Unit, UnitStatus } from '@/src/types/siteplan/models';

export type ProjectKind = 'borneo' | 'jogja' | 'patuk' | 'other';

/**
 * Infer logical project kind (Borneo / Jogja / Patuk) from slug or name.
 * This is used for:
 * - Color coding (Requirement 3.6, 3.7)
 * - WhatsApp message wording (Requirement 5.3–5.5)
 */
export const getProjectKind = (project: Project): ProjectKind => {
  const slug = project.slug?.toLowerCase() ?? '';
  const name = project.name?.toLowerCase() ?? '';
  const location = project.location?.toLowerCase() ?? '';

  if (
    slug.includes('borneo') ||
    slug.includes('borneo-food-estate') ||
    name.includes('borneo') ||
    location.includes('kalimantan')
  ) {
    return 'borneo';
  }

  if (
    slug.includes('jogja') ||
    slug.includes('yogya') ||
    slug.includes('jogja-integrated-farm') ||
    name.includes('jogja integrated farm') ||
    name.includes('jogja') ||
    location.includes('yogyakarta')
  ) {
    return 'jogja';
  }

  if (
    slug.includes('patuk') ||
    name.includes('patuk') ||
    name.includes('hillside')
  ) {
    return 'patuk';
  }

  return 'other';
};

export interface StatusColors {
  background: string;
  text: string;
  border: string;
}

/**
 * Status-based colors for units and blocks.
 * - Available: white with dark border (Requirements 4.1, 28.8)
 * - Booking: yellow with dark text (Requirements 4.2, 25.8)
 * - Sold: red with white text (Requirements 4.3, 25.8)
 */
export const getStatusColors = (status: UnitStatus): StatusColors => {
  switch (status) {
    case 'available':
      return {
        background: '#FFFFFF',
        text: '#111827',
        border: '#374151',
      };
    case 'booking':
      return {
        background: '#EAB308',
        text: '#111827',
        border: '#92400E',
      };
    case 'sold':
      return {
        background: '#DC2626',
        text: '#FFFFFF',
        border: '#7F1D1D',
      };
    default:
      return {
        background: '#E5E7EB',
        text: '#111827',
        border: '#6B7280',
      };
  }
};

/**
 * Commodity / livestock color coding:
 * - Borneo (vegetables):
 *   - Sawi/Kangkung: green
 *   - Terong: purple
 *   - Tomat: orange
 *   - Cabai: red
 * - Jogja/Patuk (livestock):
 *   - Ayam: navy blue
 *   - Bebek: deep purple/magenta
 *
 * (Requirements 3.5, 3.6, 3.7, 17.2)
 */
export const getUnitCategoryColor = (unit: Unit, project: Project): string => {
  const kind = getProjectKind(project);

  if (kind === 'borneo') {
    const commodity = (unit.commodityType || '').toLowerCase();

    if (commodity.includes('sawi') || commodity.includes('kangkung')) {
      return '#22C55E'; // bright green
    }
    if (commodity.includes('terong')) {
      return '#8B5CF6'; // purple
    }
    if (commodity.includes('tomat')) {
      return '#F97316'; // orange
    }
    if (commodity.includes('cabai') || commodity.includes('cabe') || commodity.includes('chili')) {
      return '#EF4444'; // red
    }

    // Default vegetable/farmland green
    return '#16A34A';
  }

  if (kind === 'jogja' || kind === 'patuk') {
    const livestock = (unit.livestockType || '').toLowerCase();

    if (livestock.includes('ayam') || livestock.includes('chicken')) {
      return '#1E3A8A'; // navy blue
    }
    if (livestock.includes('bebek') || livestock.includes('duck')) {
      return '#7C3AED'; // deep purple / magenta
    }

    return '#1E3A8A';
  }

  // Generic neutral color for other projects
  return '#4B5563';
};

/**
 * Small semantic icon for livestock units (Requirement 17.1).
 * We intentionally use emoji as lightweight, universally available icons.
 */
export const getLivestockIcon = (
  unit: Unit,
  project: Project,
): 'chicken' | 'duck' | null => {
  const kind = getProjectKind(project);
  if (kind !== 'jogja' && kind !== 'patuk') return null;

  const livestock = (unit.livestockType || '').toLowerCase();
  if (livestock.includes('ayam') || livestock.includes('chicken')) {
    return 'chicken';
  }
  if (livestock.includes('bebek') || livestock.includes('duck')) {
    return 'duck';
  }
  return null;
};

/**
 * Human-readable status label for unit detail modal.
 */
export const getUnitStatusLabel = (status: UnitStatus): string => {
  switch (status) {
    case 'available':
      return 'Available';
    case 'booking':
      return 'Booking / Keep';
    case 'sold':
      return 'Sold';
    default:
      return status;
  }
};