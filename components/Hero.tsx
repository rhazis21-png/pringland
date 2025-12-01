import React from 'react';
import { HERO_COPY } from '../constants';
import { ArrowDown, PlayCircle } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: 'home' | 'jogja' | 'bogor' | 'borneo') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col bg-slate-900">
      {/* Full Background Video/Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://picsum.photos/id/1029/1920/1080" 
          alt="Corporate Drone View" 
          className="w-full h-full object-cover scale-105 animate-[kenburns_30s_infinite_alternate]"
        />
      </div>

      {/* Center Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 animate-fade-in-up">
           <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm tracking-widest uppercase font-semibold">
             PT. Lumbung Pangan Mataram
           </span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-8 drop-shadow-xl leading-tight animate-fade-in-up delay-100">
          {HERO_COPY.headline}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl drop-shadow-md leading-relaxed animate-fade-in-up delay-200">
          {HERO_COPY.subHeadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
          <button 
            onClick={() => {
               const el = document.getElementById('problem-solution');
               el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-brand-primary hover:bg-brand-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(46,204,113,0.5)] flex items-center justify-center gap-2"
          >
            {HERO_COPY.cta}
          </button>
          <button 
             onClick={() => {
               const el = document.getElementById('portfolio-selector');
               el?.scrollIntoView({ behavior: 'smooth' });
            }}
             className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2"
          >
             Lihat Portofolio Project
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 animate-bounce cursor-pointer" 
           onClick={() => document.getElementById('problem-solution')?.scrollIntoView({ behavior: 'smooth' })}>
        <ArrowDown className="text-white/70 w-8 h-8" />
      </div>
    </div>
  );
};

export default Hero;