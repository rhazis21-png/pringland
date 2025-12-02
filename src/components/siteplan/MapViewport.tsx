import React, { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useSeniorTheme } from './SeniorThemeProvider';

/**
 * Generic interactive viewport for maps / siteplans.
 *
 * Features:
 * - Pinch-to-zoom (Requirement 15.2)
 * - Swipe to pan (Requirement 15.3)
 * - Double-tap zoom-in (Requirement 28.13)
 * - Large +/- controls in bottom-right corner (Requirements 28.11, 28.12)
 */
interface MapViewportProps {
  children: ReactNode;
}

const MIN_SCALE = 0.8;
const MAX_SCALE = 3;

export const MapViewport: React.FC<MapViewportProps> = ({ children }) => {
  const seniorTheme = useSeniorTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const [lastTapTime, setLastTapTime] = useState<number | null>(null);

  const [touchState, setTouchState] = useState<
    | { type: 'none' }
    | {
        type: 'pan';
        startX: number;
        startY: number;
        initialX: number;
        initialY: number;
      }
    | {
        type: 'pinch';
        initialDistance: number;
        initialScale: number;
      }
  >({ type: 'none' });

  const clampScale = (value: number) => {
    if (value < MIN_SCALE) return MIN_SCALE;
    if (value > MAX_SCALE) return MAX_SCALE;
    return value;
  };

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      const now = Date.now();

      // Double-tap detection
      if (lastTapTime && now - lastTapTime < 300) {
        setLastTapTime(null);
        setScale((prev) => clampScale(prev * 1.2));
        return;
      }

      setLastTapTime(now);

      setTouchState({
        type: 'pan',
        startX: touch.clientX,
        startY: touch.clientY,
        initialX: translate.x,
        initialY: translate.y,
      });
    } else if (event.touches.length === 2) {
      const [t1, t2] = [event.touches[0], event.touches[1]];
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      const distance = Math.hypot(dx, dy) || 1;

      setTouchState({
        type: 'pinch',
        initialDistance: distance,
        initialScale: scale,
      });
    }
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (touchState.type === 'pan' && event.touches.length === 1) {
      event.preventDefault();
      const touch = event.touches[0];

      const dx = touch.clientX - touchState.startX;
      const dy = touch.clientY - touchState.startY;

      setTranslate({
        x: touchState.initialX + dx,
        y: touchState.initialY + dy,
      });
    }

    if (touchState.type === 'pinch' && event.touches.length === 2) {
      event.preventDefault();
      const [t1, t2] = [event.touches[0], event.touches[1]];
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      const distance = Math.hypot(dx, dy) || 1;

      const nextScale = clampScale(
        touchState.initialScale * (distance / touchState.initialDistance),
      );
      setScale(nextScale);
    }
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    setTouchState({ type: 'none' });
  };

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    if (!event.ctrlKey) return;
    event.preventDefault();

    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => clampScale(prev + delta));
  };

  const zoomIn = () => {
    setScale((prev) => clampScale(prev * 1.2));
  };

  const zoomOut = () => {
    setScale((prev) => clampScale(prev / 1.2));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-50 to-emerald-100 border border-emerald-100"
      style={{
        touchAction: 'none',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div
        className="w-full h-full origin-center"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transition: touchState.type === 'none' ? `transform ${seniorTheme.animation.duration} ${seniorTheme.animation.easing}` : undefined,
        }}
      >
        {children}
      </div>

      {/* Zoom controls: bottom-right, large touch targets (Requirements 28.11, 28.12) */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-3">
        <button
          type="button"
          onClick={zoomIn}
          className="flex items-center justify-center rounded-full shadow-lg bg-white text-emerald-700 font-bold"
          style={{
            width: 64,
            height: 64,
            fontSize: seniorTheme.fontSize.heading,
          }}
          aria-label="Perbesar peta"
        >
          +
        </button>
        <button
          type="button"
          onClick={zoomOut}
          className="flex items-center justify-center rounded-full shadow-lg bg-white text-emerald-700 font-bold"
          style={{
            width: 64,
            height: 64,
            fontSize: seniorTheme.fontSize.heading,
          }}
          aria-label="Perkecil peta"
        >
          −
        </button>
      </div>
    </div>
  );
};