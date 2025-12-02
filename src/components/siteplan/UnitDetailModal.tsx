import React from 'react';
import type { Project, Unit } from '@/src/types/siteplan/models';
import { useSeniorTheme } from './SeniorThemeProvider';
import { getProjectKind, getUnitStatusLabel } from '@/src/utils/siteplan/visuals';
import { openWhatsAppBooking } from '@/src/utils/siteplan/whatsapp';

interface UnitDetailModalProps {
  project: Project;
  unit: Unit | null;
  blockName?: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Unit detail modal for investors:
 * - Shows unit number, luas lahan, luas unit, block name, commodity/livestock type
 * - Includes Booking button for Available units that opens WhatsApp
 *   with pre-filled message (Requirements 5.1–5.6, 13.1–13.4).
 */
const UnitDetailModal: React.FC<UnitDetailModalProps> = ({
  project,
  unit,
  blockName,
  isOpen,
  onClose,
}) => {
  const seniorTheme = useSeniorTheme();

  if (!isOpen || !unit) return null;

  const kind = getProjectKind(project);
  const isAvailable = unit.status === 'available';

  const fontBody = {
    fontSize: seniorTheme.fontSize.body,
  };

  const fontHeading = {
    fontSize: seniorTheme.fontSize.heading,
  };

  const handleBookingClick = () => {
    openWhatsAppBooking(unit, project);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full md:max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 pt-5 pb-3 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h4
              className="font-serif font-bold text-slate-900"
              style={fontHeading}
            >
              Unit {unit.unitNumber}
            </h4>
            {blockName && (
              <p className="text-slate-600 mt-1" style={fontBody}>
                Blok: {blockName}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 inline-flex items-center justify-center rounded-full bg-stone-100 text-slate-700 hover:bg-stone-200"
            style={{
              width: seniorTheme.spacing.touchTarget,
              height: seniorTheme.spacing.touchTarget,
              fontSize: seniorTheme.fontSize.button,
            }}
            aria-label="Tutup detail unit"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-3 overflow-y-auto">
          <p className="text-slate-700" style={fontBody}>
            <span className="font-semibold">Status:</span>{' '}
            {getUnitStatusLabel(unit.status)}
          </p>
          <p className="text-slate-700" style={fontBody}>
            <span className="font-semibold">Luas Lahan:</span>{' '}
            {unit.luasLahan ? `${unit.luasLahan}m²` : '-'}
          </p>
          <p className="text-slate-700" style={fontBody}>
            <span className="font-semibold">Luas Unit:</span>{' '}
            {unit.luasUnit ? `${unit.luasUnit}m²` : '-'}
          </p>

          {kind === 'borneo' && (
            <p className="text-slate-700" style={fontBody}>
              <span className="font-semibold">Komoditas:</span>{' '}
              {unit.commodityType || '-'}
            </p>
          )}

          {(kind === 'jogja' || kind === 'patuk') && (
            <p className="text-slate-700" style={fontBody}>
              <span className="font-semibold">Jenis Ternak:</span>{' '}
              {unit.livestockType || '-'}
            </p>
          )}

          {kind !== 'borneo' && kind !== 'jogja' && kind !== 'patuk' && (
            <>
              {unit.commodityType && (
                <p className="text-slate-700" style={fontBody}>
                  <span className="font-semibold">Komoditas:</span>{' '}
                  {unit.commodityType}
                </p>
              )}
              {unit.livestockType && (
                <p className="text-slate-700" style={fontBody}>
                  <span className="font-semibold">Jenis Ternak:</span>{' '}
                  {unit.livestockType}
                </p>
              )}
            </>
          )}
        </div>

        {/* Sticky footer booking button (Requirement 5.1, 5.2, 15.6) */}
        <div className="border-t border-stone-200 bg-white px-6 py-4 sticky bottom-0">
          {isAvailable ? (
            <button
              type="button"
              onClick={handleBookingClick}
              className="w-full inline-flex items-center justify-center rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg"
              style={{
                minHeight: seniorTheme.spacing.buttonHeight,
                fontSize: seniorTheme.fontSize.button,
              }}
            >
              Booking Unit {unit.unitNumber}
            </button>
          ) : (
            <p
              className="text-center text-slate-600 font-medium"
              style={fontBody}
            >
              Unit ini sudah tidak available. Silakan pilih unit lain yang masih
              berwarna putih (Available).
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitDetailModal;