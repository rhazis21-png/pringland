import React from 'react';
import { PROBLEM_SOLUTION } from '../constants';

const ProblemSolution: React.FC = () => {
  return (
    <section id="problem-solution" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Us Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
           <div className="lg:w-1/2">
              <span className="text-brand-primary font-bold tracking-wide uppercase text-base mb-2 block">Tentang Kami</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                {PROBLEM_SOLUTION.headline}
              </h2>
              <div className="w-24 h-2 bg-brand-primary mb-8 rounded-full"></div>
              <p className="text-xl md:text-2xl text-slate-900 leading-relaxed text-left font-medium">
                {PROBLEM_SOLUTION.body}
              </p>
           </div>
           <div className="lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-light rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-jogja-gold/20 rounded-full -z-10"></div>
              <img 
                src="https://picsum.photos/id/433/800/600" 
                alt="About Lumbung Pangan Mataram" 
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
           </div>
        </div>

        {/* Core Values Section */}
        <div className="bg-stone-100 rounded-3xl p-8 md:p-12 border border-stone-200">
          <div className="text-center mb-12">
             <h3 className="font-serif text-3xl font-bold text-slate-900">Mengapa Memilih Kami?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PROBLEM_SOLUTION.coreValues.map((item, index) => (
              <div 
                key={index} 
                className="bg-white border-2 border-stone-200 rounded-2xl p-8 text-center hover:border-brand-primary transition-colors duration-300"
              >
                <div className="bg-brand-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-800 text-xl leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolution;