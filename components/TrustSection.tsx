import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const TrustSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Process Steps */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-6">Investasi Auto-Pilot (Terima Beres)</h2>
          <p className="text-slate-800 text-xl max-w-3xl mx-auto font-medium">
            Kami yang bekerja di lapangan, Anda tinggal menikmati hasilnya. Semua transparan dan dilaporkan rutin.
          </p>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 relative">
             {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-slate-200 -z-10"></div>

            {[
                { step: "1", title: "Pilih Unit", desc: "Tentukan lokasi & amankan kavling Anda." },
                { step: "2", title: "Legalitas", desc: "Tanda tangan Notaris & terima SHM." },
                { step: "3", title: "Produksi", desc: "Kami bangun villa & mulai ternak." },
                { step: "4", title: "Bagi Hasil", desc: "Profit ditransfer ke rekening Anda." }
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center bg-white p-4">
                    <div className="w-24 h-24 rounded-full bg-brand-light border-4 border-emerald-100 shadow-lg flex items-center justify-center text-3xl font-bold text-brand-primary mb-6">
                        {item.step}
                    </div>
                    <h4 className="font-bold text-xl text-slate-900">{item.title}</h4>
                    <p className="text-lg text-slate-800 mt-2 font-medium">{item.desc}</p>
                </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 text-white/5 transform translate-x-1/4 -translate-y-1/4">
                <Quote size={400} />
            </div>
            
            <h2 className="font-serif text-3xl font-bold mb-12 text-center relative z-10">Kata Mitra Senior Kami</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {TESTIMONIALS.map((t, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors">
                        <p className="text-xl italic text-white/95 mb-8 leading-relaxed">"{t.quote}"</p>
                        <div className="flex items-center mt-auto">
                            <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center font-bold text-xl text-white mr-4 border-2 border-white/30">
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <h5 className="font-bold text-lg">{t.name}</h5>
                                <p className="text-base text-emerald-200 font-medium">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default TrustSection;