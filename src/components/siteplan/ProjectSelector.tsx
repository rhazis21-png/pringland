import React from 'react';
import type { Project } from '@/src/types/siteplan/models';
import { useProjects } from '@/src/hooks/siteplan/useProjects';
import { useSeniorTheme } from './SeniorThemeProvider';

type RegionTab = 'jogja' | 'bogor' | 'borneo';

interface ProjectSelectorProps {
  activeRegion: RegionTab;
  onProjectSelect?: (project: Project) => void;
}

/**
 * Map raw project data to logical region tabs.
 * This keeps the UI aligned with existing "Jogja / Bogor / Borneo" tabs
 * while still allowing flexible project definitions in Supabase.
 */
const getProjectRegion = (project: Project): RegionTab | null => {
  const slug = project.slug.toLowerCase();
  const location = (project.location || '').toLowerCase();

  if (slug.includes('jogja') || slug.includes('yogya') || slug.includes('patuk') || location.includes('sleman') || location.includes('gunungkidul')) {
    return 'jogja';
  }

  if (slug.includes('bogor') || location.includes('bogor')) {
    return 'bogor';
  }

  if (slug.includes('borneo') || slug.includes('borneo-food-estate') || location.includes('kalimantan') || location.includes('tanjung selor')) {
    return 'borneo';
  }

  return null;
};

const regionTitle: Record<RegionTab, string> = {
  jogja: 'Regional Jogja',
  bogor: 'Regional Bogor',
  borneo: 'Regional Borneo',
};

const regionDescription: Record<RegionTab, string> = {
  jogja: 'Kumpulan project Pring Land di kawasan Yogyakarta (Turi & Patuk).',
  bogor: 'Project eksklusif di kawasan Bogor untuk akses cepat dari Jabodetabek.',
  borneo: 'Food estate dan kawasan strategis di sekitar IKN (Borneo).',
};

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  activeRegion,
  onProjectSelect,
}) => {
  const { projects, isLoading, isError, errorMessage, isSupabaseConfigured } = useProjects();
  const seniorTheme = useSeniorTheme();

  const regionProjects = projects.filter((p) => getProjectRegion(p) === activeRegion);

  const fontBodyStyle: React.CSSProperties = {
    fontSize: seniorTheme.fontSize.body,
  };

  const fontHeadingStyle: React.CSSProperties = {
    fontSize: seniorTheme.fontSize.heading,
  };

  if (!isSupabaseConfigured) {
    // Supabase belum dikonfigurasi: tampilkan pesan ramah, tetapi
    // biarkan halaman tetap tampil dengan rapi.
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 text-amber-900 shadow-sm">
        <h3 className="font-serif font-bold mb-3" style={fontHeadingStyle}>
          Integrasi Real-time Belum Aktif
        </h3>
        <p className="font-medium" style={fontBodyStyle}>
          Modul interactive siteplan akan terhubung ke database Supabase begitu
          konfigurasi server selesai. Untuk saat ini, halaman ini belum menampilkan
          data project dinamis.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent mx-auto mb-4" />
          <p className="text-slate-700 font-semibold" style={fontBodyStyle}>
            Memuat data project...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 md:p-8 text-red-900 shadow-sm">
        <h3 className="font-serif font-bold mb-3" style={fontHeadingStyle}>
          Gagal Memuat Data
        </h3>
        <p className="font-medium mb-4" style={fontBodyStyle}>
          {errorMessage || 'Terjadi kesalahan saat memuat project.'}
        </p>
        <p className="text-sm text-red-800" style={fontBodyStyle}>
          Silakan refresh halaman atau coba beberapa saat lagi.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 md:p-8">
        <h3
          className="font-serif font-bold text-slate-900 mb-2"
          style={fontHeadingStyle}
        >
          {regionTitle[activeRegion]}
        </h3>
        <p className="text-slate-700" style={fontBodyStyle}>
          {regionDescription[activeRegion]}
        </p>
      </div>

      {regionProjects.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center shadow-inner">
          <p className="text-slate-700 font-medium" style={fontBodyStyle}>
            Belum ada project aktif yang dipublikasikan untuk regional ini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regionProjects.map((project) => {
            const isSoldOut =
              typeof project.availableUnits === 'number' &&
              project.availableUnits <= 0;

            const isFeatured = project.isFeatured;

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => onProjectSelect?.(project)}
                className={`w-full text-left bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-stone-200 hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-emerald-300 ${
                  isFeatured ? 'border-4 border-emerald-500' : ''
                }`}
              >
                <div className="flex flex-col h-full">
                  {/* Thumbnail */}
                  {project.thumbnailUrl && (
                    <div className="mb-4 rounded-2xl overflow-hidden border border-stone-200">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.name}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Title + Badge */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h4
                        className="font-serif font-bold text-slate-900"
                        style={fontHeadingStyle}
                      >
                        {project.name}
                      </h4>
                      {project.location && (
                        <p
                          className="text-slate-600 font-medium mt-1 flex items-center gap-2"
                          style={fontBodyStyle}
                        >
                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                          {project.location}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {isFeatured && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide">
                          Featured
                        </span>
                      )}
                      {isSoldOut && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wide">
                          Sold Out
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-3 space-y-1">
                    {typeof project.totalArea === 'number' && (
                      <p className="text-slate-700" style={fontBodyStyle}>
                        <span className="font-semibold">Luas Kawasan:</span>{' '}
                        {project.totalArea} Ha
                      </p>
                    )}
                    <p className="text-slate-700" style={fontBodyStyle}>
                      <span className="font-semibold">Total Unit:</span>{' '}
                      {typeof project.totalUnits === 'number'
                        ? project.totalUnits
                        : '-'}
                    </p>
                    <p className="text-slate-700" style={fontBodyStyle}>
                      <span className="font-semibold">Unit Tersedia:</span>{' '}
                      {typeof project.availableUnits === 'number'
                        ? project.availableUnits
                        : '-'}
                    </p>
                  </div>

                  {/* Hint */}
                  <p className="mt-4 text-emerald-700 font-semibold text-sm" style={fontBodyStyle}>
                    Klik untuk melihat masterplan dan memilih unit di peta interaktif.
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;