import React, { useMemo } from 'react';
import type {
  CanvasElement,
  CanvasElementProperties,
  CanvasElementType,
  MapMode,
  Project,
  Unit,
  UnitStatus,
} from '@/src/types/siteplan/models';
import { useSeniorTheme } from './SeniorThemeProvider';
import { useCanvasElements } from '@/src/hooks/siteplan/useCanvasElements';
import { getStatusColors } from '@/src/utils/siteplan/visuals';
import { MapViewport } from './MapViewport';
import SiteplanLegend from './SiteplanLegend';

interface MasterplanViewProps {
  project: Project;
  units: Unit[];
  onBackToProjects: () => void;
  onBlockSelect: (block: CanvasElement) => void;
}

/**
 * Read-only Masterplan View for public web.
 *
 * - Renders Block, Facility, and Decoration elements from canvas_elements
 * - Shows aggregated real-time status colors on blocks (Requirement 2.3)
 * - Prevents any drag/edit operations (Requirement 2.9)
 */
export const MasterplanView: React.FC<MasterplanViewProps> = ({
  project,
  units,
  onBackToProjects,
  onBlockSelect,
}) => {
  const seniorTheme = useSeniorTheme();
  const { elements, isLoading, isError, errorMessage } = useCanvasElements(
    project.id,
  );

  const { blocks, facilities, decorations, unitsByBlock } = useMemo(() => {
    const blockElements: CanvasElement[] = [];
    const facilityElements: CanvasElement[] = [];
    const decorationElements: CanvasElement[] = [];

    elements.forEach((el) => {
      if (el.type === 'block') blockElements.push(el);
      else if (el.type === 'facility') facilityElements.push(el);
      else if (el.type === 'decoration') decorationElements.push(el);
    });

    const byBlock = new Map<string, Unit[]>();
    units.forEach((unit) => {
      if (!unit.blockId) return;
      const list = byBlock.get(unit.blockId) ?? [];
      list.push(unit);
      byBlock.set(unit.blockId, list);
    });

    return {
      blocks: blockElements,
      facilities: facilityElements,
      decorations: decorationElements,
      unitsByBlock: byBlock,
    };
  }, [elements, units]);

  const getBlockStatus = (blockId: string): UnitStatus | null => {
    const blockUnits = unitsByBlock.get(blockId);
    if (!blockUnits || blockUnits.length === 0) return null;

    if (blockUnits.some((u) => u.status === 'sold')) return 'sold';
    if (blockUnits.some((u) => u.status === 'booking')) return 'booking';
    return 'available';
  };

  const handleBlockClick = (block: CanvasElement) => {
    onBlockSelect(block);
  };

  const fontBody = {
    fontSize: seniorTheme.fontSize.body,
  };

  const fontHeading = {
    fontSize: seniorTheme.fontSize.heading,
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
            Masterplan {project.name}
          </h3>
          {project.location && (
            <p className="text-slate-700 mt-1" style={fontBody}>
              {project.location}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onBackToProjects}
          className="inline-flex items-center justify-center rounded-xl bg-white border border-stone-300 px-5 py-3 text-slate-800 font-semibold shadow-sm hover:bg-stone-50"
          style={{
            minHeight: seniorTheme.spacing.buttonHeight,
            fontSize: seniorTheme.fontSize.button,
          }}
        >
          ← Kembali ke daftar project
        </button>
      </div>

      {/* Map container */}
      <div className="w-full h-[520px] md:h-[640px]">
        {isLoading && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="animate-pulse text-center">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent mx-auto mb-4" />
              <p className="text-slate-700 font-semibold" style={fontBody}>
                Memuat masterplan...
              </p>
            </div>
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 md:p-8 text-red-900 shadow-sm max-w-md text-center">
              <h4
                className="font-serif font-bold mb-3"
                style={fontHeading}
              >
                Gagal Memuat Masterplan
              </h4>
              <p className="font-medium mb-2" style={fontBody}>
                {errorMessage || 'Terjadi kesalahan saat memuat masterplan.'}
              </p>
              <p className="text-sm" style={fontBody}>
                Silakan refresh halaman atau coba beberapa saat lagi.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !isError && (
          <MapViewport>
            <div className="relative w-full h-full">
              {/* Blocks */}
              {blocks.map((block) => {
                const status = getBlockStatus(block.id);
                const statusVisual =
                  status != null ? getStatusColors(status) : undefined;

                const props = block.properties as CanvasElementProperties & {
                  name?: string;
                };

                return (
                  <button
                    key={block.id}
                    type="button"
                    onClick={() => handleBlockClick(block)}
                    className="absolute rounded-3xl shadow-lg border-2 border-emerald-700/60 flex items-center justify-center text-center px-2"
                    style={{
                      left: block.position.x,
                      top: block.position.y,
                      width: block.size.width,
                      height: block.size.height,
                      backgroundColor: statusVisual?.background || '#ECFDF3',
                      color: statusVisual?.text || '#064E3B',
                    }}
                  >
                    <span
                      className="font-semibold"
                      style={{
                        fontSize: seniorTheme.fontSize.body,
                      }}
                    >
                      {props.name || 'Blok'}
                    </span>
                  </button>
                );
              })}

              {/* Facilities */}
              {facilities.map((facility) => {
                const props = facility.properties as CanvasElementProperties & {
                  name?: string;
                };

                return (
                  <div
                    key={facility.id}
                    className="absolute rounded-xl bg-white shadow-md border border-emerald-200 px-2 py-1 flex items-center justify-center"
                    style={{
                      left: facility.position.x,
                      top: facility.position.y,
                      width: facility.size.width,
                      height: facility.size.height,
                    }}
                  >
                    <span
                      className="text-xs font-semibold text-emerald-800"
                      style={{
                        fontSize: seniorTheme.fontSize.label,
                      }}
                    >
                      {props.name || 'Facility'}
                    </span>
                  </div>
                );
              })}

              {/* Decorations */}
              {decorations.map((decoration) => {
                const props = decoration
                  .properties as CanvasElementProperties & {
                  decorationType?: string;
                  color?: string;
                  label?: string;
                };

                const isGreenArea =
                  props.decorationType === 'green-area' || !props.decorationType;

                return (
                  <div
                    key={decoration.id}
                    className="absolute rounded-full opacity-70"
                    style={{
                      left: decoration.position.x,
                      top: decoration.position.y,
                      width: decoration.size.width,
                      height: decoration.size.height,
                      backgroundColor: isGreenArea
                        ? '#BBF7D0'
                        : props.color || '#E5E7EB',
                    }}
                  >
                    {props.label && (
                      <div className="flex items-center justify-center h-full">
                        <span
                          className="text-xs font-medium text-slate-800"
                          style={{
                            fontSize: seniorTheme.fontSize.label,
                          }}
                        >
                          {props.label}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </MapViewport>
        )}
      </div>

      <SiteplanLegend project={project} />
    </div>
  );
};

export default MasterplanView;