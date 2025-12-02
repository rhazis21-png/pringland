import React from 'react';
import { PRODUCTS } from '../constants';
import { ArrowRight, MapPin } from 'lucide-react';

interface PortfolioSelectorProps {
  onNavigate: (page: 'home' | 'jogja' | 'bogor' | 'borneo') => void;
}

const PortfolioSelector: React.FC<PortfolioSelectorProps> = ({ onNavigate }) => {
  return (
    <section id="portfolio-selector" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-slate-700 font-bold tracking-wide uppercase text-base mb-2 block">Pilihan Proyek Regional</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Jejak Langkah Kami di Indonesia
          </h2>
          <p className="text-slate-800 text-xl font-medium">Silakan pilih lokasi investasi yang paling cocok untuk Anda.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-200 flex flex-col group h-full hover:shadow-2xl transition-shadow"
            >
              {/* Image Header */}
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-5 left-6 z-20 text-white">
                   <div className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide opacity-90 mb-1 bg-black/30 px-2 py-1 rounded w-fit">
                      <MapPin size={14} /> {product.location}
                   </div>
                   <h3 className="text-3xl font-serif font-bold drop-shadow-md">{product.title}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-6 mb-8">
                   <div>
                      <span className="block text-sm text-slate-700 uppercase tracking-wide font-bold mb-1">Fokus Project</span>
                      <span className="font-bold text-lg text-slate-900 leading-snug">{product.focus}</span>
                   </div>
                   <div>
                      <span className="block text-sm text-slate-700 uppercase tracking-wide font-bold mb-1">Harga</span>
                      <span className="font-bold text-xl text-brand-primary">{product.priceStart}</span>
                   </div>
                   <div>
                      <span className="block text-sm text-slate-700 uppercase tracking-wide font-bold mb-1">Cocok Untuk</span>
                      <span className="font-bold text-lg text-slate-900 bg-stone-100 px-3 py-1 rounded inline-block">{product.targetAudience}</span>
                   </div>
                </div>

                <button 
                  onClick={() => onNavigate(product.id as any)}
                  className={`w-full py-4 rounded-xl flex items-center justify-center font-bold text-xl transition-all shadow-md border-b-4 active:border-b-0 active:translate-y-1 gap-2 ${
                    product.id === 'jogja' ? 'bg-jogja-gold text-white border-yellow-700 hover:bg-yellow-600' :
                    product.id === 'bogor' ? 'bg-bogor-teal text-white border-cyan-800 hover:bg-cyan-700' :
                    'bg-borneo-orange text-white border-orange-700 hover:bg-orange-600'
                  }`}
                >
                  Lihat Detail {product.id.charAt(0).toUpperCase() + product.id.slice(1)}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSelector;