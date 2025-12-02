import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import type {
  LinearConfig,
  MapMode,
  Project,
  Unit,
} from '@/src/types/siteplan/models';
import { useSeniorTheme } from './SeniorThemeProvider';
import UnitElement from './UnitElement';

interface LinearLayoutStrategyProps {
  project: Project;
  config: LinearConfig;
  units: Unit[];
  mode: MapMode;
  onUnitClick?: (unit: Unit) => void;
}

/**
 * Linear layout strategy for Jogja (and other row-based projects).
 * - Renders horizontally or vertically based on config.orientation
 * - Uses React Virtuoso virtualization when enabled and unit count is large
 *   (Requirements 11.3, 12.2).
 */
const LinearLayoutStrategy: React.FC<LinearLayoutStrategyProps> = ({
  project,
  config,
  units,
  mode,
  onUnitClick,
}) => {
  const seniorTheme = useSeniorTheme();
  const isHorizontal = config.orientation === 'horizontal';
  const shouldVirtualize = config.enableVirtualization && units.length > 50;

  const renderUnit = (unit: Unit) => (
    <div
      key={unit.id}
      className={isHorizontal ? 'px-2' : 'py-2'}
      style={{
        flex: isHorizontal ? '0 0 auto' : undefined,
      }}
    >
      <UnitElement
        unit={unit}
        project={project}
        mode={mode}
        onClick={() => onUnitClick?.(unit)}
      />
    </div>
  );

  if (shouldVirtualize) {
    return (
      <div className="relative w-full h-full">
        <Virtuoso
          data={units}
          horizontal={isHorizontal}
          itemContent={(index, unit) => (
            <div
              className={isHorizontal ? 'px-2' : 'py-2'}
              // For horizontal mode, ensure fixed item width for stable virtualization
              style={
                isHorizontal
                  ? {
                      flex: '0 0 auto',
                      width: 96,
                    }
                  : undefined
              }
            >
              <UnitElement
                unit={unit}
                project={project}
                mode={mode}
                onClick={() => onUnitClick?.(unit)}
              />
            </div>
          )}
          style={{
            height: isHorizontal ? 140 : '100%',
            width: '100%',
            padding: seniorTheme.spacing.elementGap,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full overflow-auto flex ${
        isHorizontal ? 'flex-row' : 'flex-col'
      }`}
      style={{
        gap: seniorTheme.spacing.elementGap,
        padding: seniorTheme.spacing.elementGap,
      }}
    >
      {units.map(renderUnit)}
    </div>
  );
};

export default LinearLayoutStrategy;