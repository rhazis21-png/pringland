import React from 'react';
import type {
  CurvedConfig,
  GridConfig,
  LayoutType,
  LinearConfig,
  MapMode,
  Project,
  Unit,
} from '@/src/types/siteplan/models';
import GridLayoutStrategy from './GridLayoutStrategy';
import LinearLayoutStrategy from './LinearLayoutStrategy';
import CurvedLayoutStrategy from './CurvedLayoutStrategy';

export interface MapRendererProps {
  project: Project;
  layoutType: LayoutType;
  layoutConfig: GridConfig | LinearConfig | CurvedConfig;
  units: Unit[];
  mode: MapMode;
  onUnitClick?: (unit: Unit) => void;
}

/**
 * Polymorphic MapRenderer component that delegates rendering to layout-specific
 * strategies (Requirements 11.1–11.5).
 */
export const MapRenderer: React.FC<MapRendererProps> = ({
  project,
  layoutType,
  layoutConfig,
  units,
  mode,
  onUnitClick,
}) => {
  if (!units.length) {
    return (
      <div className="flex items-center justify-center w-full h-full text-slate-700 text-lg font-medium">
        Tidak ada unit untuk ditampilkan.
      </div>
    );
  }

  if (layoutType === 'grid') {
    return (
      <GridLayoutStrategy
        project={project}
        config={layoutConfig as GridConfig}
        units={units}
        mode={mode}
        onUnitClick={onUnitClick}
      />
    );
  }

  if (layoutType === 'linear') {
    return (
      <LinearLayoutStrategy
        project={project}
        config={layoutConfig as LinearConfig}
        units={units}
        mode={mode}
        onUnitClick={onUnitClick}
      />
    );
  }

  // Default to curved for unknown / 'curved'
  return (
    <CurvedLayoutStrategy
      project={project}
      config={layoutConfig as CurvedConfig}
      units={units}
      mode={mode}
      onUnitClick={onUnitClick}
    />
  );
};

export default MapRenderer;