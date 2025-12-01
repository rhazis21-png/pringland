import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const TrustSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Process Steps */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 mb-4">Investasi Auto-Pilot</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Kami Bekerja, Anda Menikmati Hasil. Transparansi adalah prioritas utama kami.</p>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 relative">
             {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>

            {[
                { step: "1", title: "Booking", desc: "Pilih unit & amankan lokasi." },
                { step: "2", title: "Legalitas", desc: "Proses Notaris & SHM." },
                { step: "3", title: "Produksi", desc: "Konstruksi & Penanaman." },
                { step: "4", title: "Bagi Hasil", desc: "Laporan & transfer profit." }
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center bg-white">
                    <div className="w-24 h-24 rounded-full bg-brand-light border-4 border-white shadow-lg flex items-center justify-center text-2xl font-bold text-brand-primary mb-6">
                        {item.step}
                    </div>
                    <h4 className="font-bold text-lg text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500 mt-2">{item.desc}</p>
                </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 text-white/5 transform translate-x-1/4 -translate-y-1/4">
                <Quote size={400} />
            </div>
            
            <h2 className="font-serif text-3xl font-bold mb-12 text-center relative z-10">Kata Mereka Yang Sudah Bergabung</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {TESTIMONIALS.map((t, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                        <p className="text-lg italic text-white/90 mb-6">"{t.quote}"</p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center font-bold text-white mr-4">
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <h5 className="font-bold">{t.name}</h5>
                                <p className="text-sm text-white/60">{t.role}</p>
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