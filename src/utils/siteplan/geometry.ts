import type { CurvedRow, Position } from '@/src/types/siteplan/models';

/**
 * Calculate positions along an arc for a curved row configuration.
 *
 * Angles are degrees; 0 degrees is at (R, 0) and angles increase counter-clockwise.
 * (Requirements 11.4, 24.3, 24.5)
 */
export const calculateArcPositions = (config: CurvedRow): Position[] => {
  const { arcRadius, startAngle, endAngle, units } = config;
  if (units <= 0) return [];

  // For a single unit we just place it at the middle of the arc.
  if (units === 1) {
    const midAngle = (startAngle + endAngle) / 2;
    const radians = (midAngle * Math.PI) / 180;
    return [
      {
        x: arcRadius * Math.cos(radians),
        y: arcRadius * Math.sin(radians),
      },
    ];
  }

  const positions: Position[] = [];

  for (let i = 0; i < units; i += 1) {
    const angle = startAngle + ((endAngle - startAngle) * i) / (units - 1);
    const radians = (angle * Math.PI) / 180;

    positions.push({
      x: arcRadius * Math.cos(radians),
      y: arcRadius * Math.sin(radians),
    });
  }

  return positions;
};

/**
 * Generate a simple SVG path that connects the given positions with straight
 * line segments. This is primarily decorative to visualize the contour.
 */
export const generateSvgPath = (positions: Position[]): string => {
  if (!positions.length) return '';

  const [first, ...rest] = positions;
  let path = `M ${first.x} ${first.y}`;

  rest.forEach((pos) => {
    path += ` L ${pos.x} ${pos.y}`;
  });

  return path;
};