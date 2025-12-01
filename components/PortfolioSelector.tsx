import React from 'react';
import { PRODUCTS } from '../constants';
import { ArrowRight, MapPin } from 'lucide-react';

interface PortfolioSelectorProps {
  onNavigate: (page: 'home' | 'jogja' | 'bogor' | 'borneo') => void;
}

const PortfolioSelector: React.FC<PortfolioSelectorProps> = ({ onNavigate }) => {
  return (
    <section id="portfolio-selector" className="py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-slate-500 font-bold tracking-wide uppercase text-sm mb-2 block">Our Regional Projects</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-800 mb-4">
            Jejak Langkah Kami di Indonesia
          </h2>
          <p className="text-slate-600 text-lg">Pilih lokasi investasi strategis sesuai preferensi Anda.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group h-full"
            >
              {/* Image Header */}
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-6 z-20 text-white">
                   <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide opacity-90 mb-1">
                      <MapPin size={12} /> {product.location}
                   </div>
                   <h3 className="text-2xl font-serif font-bold">{product.title}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4 mb-8">
                   <div>
                      <span className="block text-xs text-slate-400 uppercase tracking-wide font-bold">Fokus Project</span>
                      <span className="font-medium text-slate-800 leading-snug">{product.focus}</span>
                   </div>
                   <div>
                      <span className="block text-xs text-slate-400 uppercase tracking-wide font-bold">Harga</span>
                      <span className="font-medium text-brand-primary">{product.priceStart}</span>
                   </div>
                   <div>
                      <span className="block text-xs text-slate-400 uppercase tracking-wide font-bold">Target</span>
                      <span className="font-medium text-slate-800">{product.targetAudience}</span>
                   </div>
                </div>

                <button 
                  onClick={() => onNavigate(product.id as any)}
                  className={`w-full py-3 rounded-xl flex items-center justify-center font-bold transition-colors group-hover:gap-3 gap-2 ${
                    product.id === 'jogja' ? 'bg-jogja-gold text-white hover:bg-yellow-600' :
                    product.id === 'bogor' ? 'bg-bogor-teal text-white hover:bg-cyan-700' :
                    'bg-borneo-orange text-white hover:bg-orange-600'
                  }`}
                >
                  Explore {product.id.charAt(0).toUpperCase() + product.id.slice(1)}
                  <ArrowRight className="w-4 h-4" />
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