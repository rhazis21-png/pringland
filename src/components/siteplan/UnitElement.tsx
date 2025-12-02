import React from 'react';
import type { CSSProperties } from 'react';
import type { MapMode, Project, Unit } from '@/src/types/siteplan/models';
import { useSeniorTheme } from './SeniorThemeProvider';
import {
  getLivestockIcon,
  getStatusColors,
  getUnitCategoryColor,
} from '@/src/utils/siteplan/visuals';

export interface UnitElementProps {
  unit: Unit;
  project: Project;
  mode: MapMode;
  onClick?: () => void;
  /**
   * Optional flag to render with slightly larger footprint.
   * For investor-facing public web we always target senior-friendly sizing.
   */
  seniorMode?: boolean;
  /**
   * Optional external className for layout-specific styling.
   */
  className?: string;
}

/**
 * UnitElement renders individual lots with:
 * - Status colors: white / yellow / red (Requirement 4.1–4.3)
 * - Bold unit number with minimum 20px font size (Requirement 3.4, 28.3)
 * - Minimum 56x56px touch target in senior mode (Requirements 15.4, 28.5)
 * - Commodity / livestock color accents and icons (Requirements 3.5–3.7, 17.1–17.2)
 */
export const UnitElement: React.FC<UnitElementProps> = ({
  unit,
  project,
  mode,
  onClick,
  seniorMode = true,
  className,
}) => {
  const seniorTheme = useSeniorTheme();

  const statusVisual = getStatusColors(unit.status);
  const categoryColor = getUnitCategoryColor(unit, project);
  const livestockIcon = getLivestockIcon(unit, project);

  const baseStyle: CSSProperties = {
    minWidth: seniorMode ? seniorTheme.spacing.touchTarget : '44px',
    minHeight: seniorMode ? seniorTheme.spacing.touchTarget : '44px',
    fontSize: seniorTheme.fontSize.unitNumber,
    backgroundColor: statusVisual.background,
    borderColor: categoryColor || statusVisual.border,
    color: statusVisual.text,
    transition: `transform ${seniorTheme.animation.duration} ${seniorTheme.animation.easing}`,
  };

  const handleClick = () => {
    if (!onClick) return;
    onClick();
  };

  const interactive =
    mode === 'public' || mode === 'marketing' || mode === 'admin';

  return (
    <button
      type="button"
      onClick={interactive ? handleClick : undefined}
      className={`relative flex flex-col items-center justify-center rounded-xl border-[3px] shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-300 active:scale-95 ${
        unit.status === 'sold' ? 'opacity-90' : 'opacity-100'
      } ${className || ''}`}
      style={baseStyle}
      aria-label={`Unit ${unit.unitNumber}`}
    >
      {/* Top-left badge for commodity / livestock */}
      <div className="absolute top-1 left-1 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/80 text-[10px] font-semibold text-slate-800">
        {livestockIcon === 'chicken' && (
          <span aria-hidden="true" className="text-[11px]">
            🐔
          </span>
        )}
        {livestockIcon === 'duck' && (
          <span aria-hidden="true" className="text-[11px]">
            🦆
          </span>
        )}
        {!livestockIcon && unit.commodityType && (
          <span className="truncate max-w-[56px]">
            {unit.commodityType}
          </span>
        )}
      </div>

      {/* Unit number - center, bold, large */}
      <span className="font-bold leading-none">{unit.unitNumber}</span>

      {/* Sub-label for status (optional, small) */}
      <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-800">
        {unit.status === 'available'
          ? 'Available'
          : unit.status === 'booking'
          ? 'Booking'
          : 'Sold'}
      </span>
    </button>
  );
};

export default UnitElement;