import React from 'react';
import type {
  GridConfig,
  MapMode,
  Project,
  Unit,
} from '@/src/types/siteplan/models';
import { useSeniorTheme } from './SeniorThemeProvider';
import UnitElement from './UnitElement';

interface GridLayoutStrategyProps {
  project: Project;
  config: GridConfig;
  units: Unit[];
  mode: MapMode;
  onUnitClick?: (unit: Unit) => void;
}

/**
 * Grid layout strategy for Borneo and any other grid-based projects.
 * - Uses CSS Grid with row/column spacing and optional rotation.
 * - Ensures minimum touch target size via UnitElement (Requirements 3.1, 11.2).
 */
const GridLayoutStrategy: React.FC<GridLayoutStrategyProps> = ({
  project,
  config,
  units,
  mode,
  onUnitClick,
}) => {
  const seniorTheme = useSeniorTheme();

  const columnGap = `${config.spacing.x}px`;
  const rowGap = `${config.spacing.y}px`;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-auto">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config.cols}, minmax(${seniorTheme.spacing.touchTarget}, 1fr))`,
          columnGap,
          rowGap,
          padding: seniorTheme.spacing.elementGap,
          transform: config.rotation ? `rotate(${config.rotation}deg)` : undefined,
          transformOrigin: 'center',
        }}
      >
        {units.map((unit) => (
          <UnitElement
            key={unit.id}
            unit={unit}
            project={project}
            mode={mode}
            onClick={() => onUnitClick?.(unit)}
          />
        ))}
      </div>
    </div>
  );
};

export default GridLayoutStrategy;