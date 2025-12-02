import React, { useMemo, useState } from 'react';
import type {
  BlockProperties,
  CanvasElement,
  MapMode,
  Project,
  Unit,
} from '@/src/types/siteplan/models';
import { useSeniorTheme } from './SeniorThemeProvider';
import MapRenderer from './MapRenderer';
import { MapViewport } from './MapViewport';
import SiteplanLegend from './SiteplanLegend';
import UnitDetailModal from './UnitDetailModal';

interface DetailUnitViewProps {
  project: Project;
  block: CanvasElement | null;
  units: Unit[];
  mode?: MapMode;
  onBackToMasterplan: () => void;
}

/**
 * Detail Unit View for a specific cluster/block.
 * - Uses MapRenderer polymorphic component for grid/linear/curved layouts
 * - Applies commodity / livestock color coding via UnitElement
 * - Shows unit detail modal on unit click (Requirements 3.1–3.7, 13.1–13.4)
 */
export const DetailUnitView: React.FC<DetailUnitViewProps> = ({
  project,
  block,
  units,
  mode = 'public',
  onBackToMasterplan,
}) => {
  const seniorTheme = useSeniorTheme();
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUnits = useMemo(
    () =>
      block
        ? units.filter((u) => u.blockId === block.id)
        : units,
    [units, block],
  );

  const blockName =
    block && (block.properties as BlockProperties & { name?: string }).name;

  const fontBody = {
    fontSize: seniorTheme.fontSize.body,
  };

  const fontHeading = {
    fontSize: seniorTheme.fontSize.heading,
  };

  const handleUnitClick = (unit: Unit) => {
    setSelectedUnit(unit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header + back button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3
            className="font-serif font-bold text-slate-900"
            style={fontHeading}
          >
            Detail Unit {blockName ? `- ${blockName}` : ''}
          </h3>
          <p className="text-slate-700 mt-1" style={fontBody}>
            Tap pada unit untuk melihat spesifikasi lengkap dan melakukan booking.
          </p>
        </div>
        <button
          type="button"
          onClick={onBackToMasterplan}
          className="inline-flex items-center justify-center rounded-xl bg-white border border-stone-300 px-5 py-3 text-slate-800 font-semibold shadow-sm hover:bg-stone-50"
          style={{
            minHeight: seniorTheme.spacing.buttonHeight,
            fontSize: seniorTheme.fontSize.button,
          }}
        >
          ← Kembali ke Masterplan
        </button>
      </div>

      {/* Map + units */}
      <div className="w-full h-[520px] md:h-[640px]">
        {filteredUnits.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-slate-700 font-medium" style={fontBody}>
              Belum ada unit yang terhubung dengan blok ini.
            </p>
          </div>
        ) : (
          <MapViewport>
            <MapRenderer
              project={project}
              layoutType={project.layoutType}
              layoutConfig={project.layoutConfig as any}
              units={filteredUnits}
              mode={mode}
              onUnitClick={handleUnitClick}
            />
          </MapViewport>
        )}
      </div>

      <SiteplanLegend project={project} />

      <UnitDetailModal
        project={project}
        unit={selectedUnit}
        blockName={blockName}
        isOpen={isModalOpen && !!selectedUnit}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default DetailUnitView;