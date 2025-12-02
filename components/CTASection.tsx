import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section id="cta-section" className="py-24 bg-gradient-to-br from-brand-primary to-emerald-900 text-white relative">
      <div className="max-w-5xl mx-auto px-4 text-center">
        
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Konsultasi Gratis Sekarang</h2>
        <p className="text-xl md:text-2xl text-emerald-50 mb-12 font-medium">
          Dapatkan penjelasan lengkap, hitungan keuntungan, dan proposal resmi. Tim konsultan kami siap membantu Anda mempersiapkan aset pensiun terbaik.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
                href="https://wa.me/" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-white text-emerald-900 px-10 py-5 rounded-xl font-bold text-xl hover:bg-emerald-50 transition-all shadow-xl border-b-4 border-slate-300 active:border-b-0 active:translate-y-1 group"
            >
                <MessageCircle className="mr-3 w-6 h-6" />
                Chat WhatsApp
            </a>
            
            <a 
                href="tel:+6281212345678" 
                className="inline-flex items-center justify-center bg-emerald-800 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-emerald-700 transition-all shadow-xl border-b-4 border-emerald-950 active:border-b-0 active:translate-y-1"
            >
                <Phone className="mr-3 w-6 h-6" />
                Telepon Kami
            </a>
        </div>
        <p className="mt-8 text-base text-emerald-100 font-medium">
          Kami tersedia Senin - Sabtu (08.00 - 17.00 WIB)
        </p>

      </div>
    </section>
  );
};

export default CTASection;