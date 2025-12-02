import React, { useMemo } from 'react';
import type {
  CurvedConfig,
  CurvedRow,
  MapMode,
  Position,
  Project,
  Unit,
} from '@/src/types/siteplan/models';
import { useSeniorTheme } from './SeniorThemeProvider';
import { calculateArcPositions, generateSvgPath } from '@/src/utils/siteplan/geometry';
import { getStatusColors, getUnitCategoryColor } from '@/src/utils/siteplan/visuals';

interface CurvedLayoutStrategyProps {
  project: Project;
  config: CurvedConfig;
  units: Unit[];
  mode: MapMode;
  onUnitClick?: (unit: Unit) => void;
}

/**
 * Curved layout strategy for Patuk / hillside projects.
 *
 * Uses SVG rendering for precision and performance:
 * - Units are positioned along arc paths via trigonometry
 * - Each row can have independent arc parameters (Requirements 11.4, 11.5, 12.1, 24.3–24.5).
 */
const CurvedLayoutStrategy: React.FC<CurvedLayoutStrategyProps> = ({
  project,
  config,
  units,
  mode,
  onUnitClick,
}) => {
  const seniorTheme = useSeniorTheme();

  const {
    rowsWithUnits,
    rowPositions,
    svgWidth,
    svgHeight,
  }: {
    rowsWithUnits: Unit[][];
    rowPositions: Position[][];
    svgWidth: number;
    svgHeight: number;
  } = useMemo(() => {
    const rows = config.rows || [];

    // Assign units sequentially into rows based on row.units
    const assigned: Unit[][] = [];
    let index = 0;
    rows.forEach((row: CurvedRow) => {
      const slice = units.slice(index, index + row.units);
      assigned.push(slice);
      index += row.units;
    });

    // Calculate arc positions for each row
    const positionsPerRow: Position[][] = rows.map((row, rowIndex) =>
      calculateArcPositions({
        arcRadius: row.arcRadius,
        startAngle: row.startAngle,
        endAngle: row.endAngle,
        units: assigned[rowIndex]?.length ?? 0,
      }),
    );

    // Flatten to determine overall bounds for viewBox
    const allPositions = positionsPerRow.flat();
    if (!allPositions.length) {
      return {
        rowsWithUnits: assigned,
        rowPositions: positionsPerRow,
        svgWidth: 800,
        svgHeight: 600,
      };
    }

    const xs = allPositions.map((p) => p.x);
    const ys = allPositions.map((p) => p.y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const padding = 80;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;

    // Normalize positions so they fit into positive coordinates
    const normalized = positionsPerRow.map((row) =>
      row.map((p) => ({
        x: p.x - minX + padding,
        y: p.y - minY + padding,
      })),
    );

    return {
      rowsWithUnits: assigned,
      rowPositions: normalized,
      svgWidth: width,
      svgHeight: height,
    };
  }, [config.rows, units]);

  const unitSize = 56; // Minimum touch target (Requirement 28.5)

  const handleUnitClick = (unit: Unit) => {
    if (!onUnitClick) return;
    onUnitClick(unit);
  };

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-full"
        aria-label="Peta unit melengkung"
      >
        {/* Draw contour paths for each row (decorative) */}
        {rowPositions.map((rowPos, index) => {
          const path = generateSvgPath(rowPos);
          if (!path) return null;

          return (
            <path
              key={`path-${index}`}
              d={path}
              fill="none"
              stroke="#A7F3D0"
              strokeWidth={4}
              strokeLinecap="round"
            />
          );
        })}

        {/* Units rendered as rounded rects along each arc */}
        {rowsWithUnits.map((rowUnits, rowIndex) => {
          const positions = rowPositions[rowIndex] || [];
          return rowUnits.map((unit, unitIndex) => {
            const pos = positions[unitIndex];
            if (!pos) return null;

            const statusColors = getStatusColors(unit.status);
            const borderColor = getUnitCategoryColor(unit, project);

            const x = pos.x - unitSize / 2;
            const y = pos.y - unitSize / 2;

            return (
              <g
                key={unit.id}
                onClick={() => handleUnitClick(unit)}
                style={{ cursor: mode === 'public' ? 'pointer' : 'default' }}
              >
                <rect
                  x={x}
                  y={y}
                  width={unitSize}
                  height={unitSize}
                  rx={14}
                  ry={14}
                  fill={statusColors.background}
                  stroke={borderColor}
                  strokeWidth={3}
                  opacity={unit.status === 'sold' ? 0.9 : 1}
                />
                {/* Unit number */}
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fontSize={parseInt(seniorTheme.fontSize.unitNumber, 10) || 20}
                  fontWeight="700"
                  fill={statusColors.text}
                  dominantBaseline="middle"
                >
                  {unit.unitNumber}
                </text>
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
};

export default CurvedLayoutStrategy;