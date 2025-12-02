import React from 'react';
import { HERO_COPY } from '../constants';
import { ArrowDown, PlayCircle } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: 'home' | 'jogja' | 'bogor' | 'borneo') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col bg-slate-900">
      {/* Background Image - Static Zoom (No dizzying Kenburns) */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/60 z-10"></div> {/* Darker overlay for better text contrast */}
        <img 
          src="https://picsum.photos/id/1029/1920/1080" 
          alt="Corporate Drone View" 
          className="w-full h-full object-cover scale-105" 
        />
      </div>

      {/* Center Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
           <span className="inline-block py-2 px-4 rounded-lg bg-emerald-900/80 border border-emerald-500 text-emerald-100 text-base tracking-widest uppercase font-bold shadow-lg">
             PT. Lumbung Pangan Mataram
           </span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-8 drop-shadow-2xl leading-tight">
          {HERO_COPY.headline}
        </h1>
        <p className="text-lg md:text-2xl text-white mb-12 max-w-3xl drop-shadow-lg leading-relaxed font-medium">
          {HERO_COPY.subHeadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <button 
            onClick={() => {
               const el = document.getElementById('problem-solution');
               el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-brand-primary hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-bold text-xl transition-all shadow-xl border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1"
          >
            {HERO_COPY.cta}
          </button>
          <button 
             onClick={() => {
               const el = document.getElementById('portfolio-selector');
               el?.scrollIntoView({ behavior: 'smooth' });
            }}
             className="bg-white hover:bg-stone-100 text-slate-900 px-8 py-4 rounded-xl font-bold text-xl transition-all border-b-4 border-slate-300 active:border-b-0 active:translate-y-1"
          >
             Lihat Pilihan Project
          </button>
        </div>
      </div>

      {/* Scroll Indicator - Removed Animation for steadiness */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer p-4 bg-black/30 rounded-full hover:bg-black/50 transition-colors" 
           onClick={() => document.getElementById('problem-solution')?.scrollIntoView({ behavior: 'smooth' })}>
        <ArrowDown className="text-white w-8 h-8" />
      </div>
    </div>
  );
};

export default Hero;