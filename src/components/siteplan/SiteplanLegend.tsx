import React from 'react';
import type { Project } from '@/src/types/siteplan/models';
import { useSeniorTheme } from './SeniorThemeProvider';
import { getProjectKind, getStatusColors } from '@/src/utils/siteplan/visuals';

interface SiteplanLegendProps {
  project: Project;
}

export const SiteplanLegend: React.FC<SiteplanLegendProps> = ({ project }) => {
  const seniorTheme = useSeniorTheme();
  const kind = getProjectKind(project);

  const fontBody = {
    fontSize: seniorTheme.fontSize.body,
  };

  const available = getStatusColors('available');
  const booking = getStatusColors('booking');
  const sold = getStatusColors('sold');

  return (
    <div className="mt-4 rounded-2xl border border-stone-200 bg-white/90 p-4 md:p-5 shadow-sm">
      <h4
        className="font-serif font-semibold text-slate-900 mb-3"
        style={{ fontSize: seniorTheme.fontSize.heading }}
      >
        Legend
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status legend */}
        <div>
          <p className="font-semibold text-slate-800 mb-2" style={fontBody}>
            Status Unit
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex w-5 h-5 rounded-full border"
                style={{
                  backgroundColor: available.background,
                  borderColor: available.border,
                }}
              />
              <span className="text-slate-700" style={fontBody}>
                Available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex w-5 h-5 rounded-full border"
                style={{
                  backgroundColor: booking.background,
                  borderColor: booking.border,
                }}
              />
              <span className="text-slate-700" style={fontBody}>
                Booking / Keep
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex w-5 h-5 rounded-full border"
                style={{
                  backgroundColor: sold.background,
                  borderColor: sold.border,
                }}
              />
              <span className="text-slate-700" style={fontBody}>
                Sold
              </span>
            </div>
          </div>
        </div>

        {/* Commodity / livestock legend */}
        <div>
          <p className="font-semibold text-slate-800 mb-2" style={fontBody}>
            Tipe Komoditas / Ternak
          </p>

          {kind === 'borneo' && (
            <div className="flex flex-wrap gap-3">
              <LegendPill color="#22C55E" label="Sawi / Kangkung" />
              <LegendPill color="#8B5CF6" label="Terong" />
              <LegendPill color="#F97316" label="Tomat" />
              <LegendPill color="#EF4444" label="Cabai" />
            </div>
          )}

          {(kind === 'jogja' || kind === 'patuk') && (
            <div className="flex flex-wrap gap-3">
              <LegendPill color="#1E3A8A" label="Ayam" icon="🐔" />
              <LegendPill color="#7C3AED" label="Bebek" icon="🦆" />
            </div>
          )}

          {kind === 'other' && (
            <p className="text-slate-600" style={fontBody}>
              Warna border unit menandakan jenis komoditas atau ternak.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface LegendPillProps {
  color: string;
  label: string;
  icon?: string;
}

const LegendPill: React.FC<LegendPillProps> = ({ color, label, icon }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-stone-200 shadow-sm">
      <span
        className="inline-flex w-4 h-4 rounded-full"
        style={{ backgroundColor: color }}
      />
      {icon && (
        <span aria-hidden="true" className="text-xs">
          {icon}
        </span>
      )}
      <span className="text-sm font-medium text-slate-800">{label}</span>
    </div>
  );
};

export default SiteplanLegend;