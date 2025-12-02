import React, { useState } from 'react';
import ProjectSelector from '@/src/components/siteplan/ProjectSelector';

type RegionTab = 'jogja' | 'bogor' | 'borneo';

const SitePlanPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RegionTab>('jogja');

  return (
    <div className="bg-stone-50 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Master Siteplan & Ketersediaan Unit
          </h1>
          <p className="text-xl md:text-2xl text-slate-800 font-medium max-w-3xl mx-auto leading-relaxed">
            Halaman ini akan menampilkan project aktif Pring Land dan mengarah ke peta
            interaktif dengan update status unit secara real-time.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('jogja')}
            className={`px-8 py-4 rounded-xl font-bold text-xl transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
              activeTab === 'jogja'
                ? 'bg-jogja-gold text-white border-yellow-800 shadow-xl'
                : 'bg-white text-slate-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            Regional Jogja
          </button>
          <button
            onClick={() => setActiveTab('bogor')}
            className={`px-8 py-4 rounded-xl font-bold text-xl transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
              activeTab === 'bogor'
                ? 'bg-bogor-teal text-white border-cyan-900 shadow-xl'
                : 'bg-white text-slate-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            Regional Bogor
          </button>
          <button
            onClick={() => setActiveTab('borneo')}
            className={`px-8 py-4 rounded-xl font-bold text-xl transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
              activeTab === 'borneo'
                ? 'bg-borneo-orange text-white border-orange-800 shadow-xl'
                : 'bg-white text-slate-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            Regional Borneo
          </button>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-2xl border-2 border-stone-200">
          <ProjectSelector activeRegion={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default SitePlanPage;