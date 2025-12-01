import React from 'react';
import { MessageCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section id="cta-section" className="py-24 bg-gradient-to-br from-brand-primary to-emerald-800 text-white relative">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Jangan Tunggu Harga Naik!</h2>
        <p className="text-xl text-emerald-100 mb-10">Amankan aset produktif Anda sekarang. Hubungi konsultan kami untuk mendapatkan penawaran terbaik dan analisis potensi keuntungan.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
                href="https://wa.me/" // Ideally replace with actual WA link
                className="inline-flex items-center justify-center bg-white text-emerald-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg group"
            >
                <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" />
                Hubungi Marketing via WhatsApp
            </a>
            <button className="px-8 py-4 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors">
                Download Proposal
            </button>
        </div>
        <p className="mt-4 text-sm text-emerald-200/80">Konsultasi Gratis & Dapatkan Proposal Lengkap</p>

      </div>
    </section>
  );
};

export default CTASection;