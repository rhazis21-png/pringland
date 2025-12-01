import React from 'react';
import { 
  MapPin, 
  TrendingUp, 
  ArrowRight, 
  ArrowLeft,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  TrendingDown,
  Sprout
} from 'lucide-react';

interface DeepDiveBorneoProps {
  onNavigate: (page: 'home' | 'jogja' | 'bogor' | 'borneo') => void;
}

const DeepDiveBorneo: React.FC<DeepDiveBorneoProps> = ({ onNavigate }) => {
  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white overflow-hidden pb-16 pt-32">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/20 hidden md:block rounded-l-full blur-3xl"></div>
        <img src="https://picsum.photos/id/10/1920/1080" alt="Borneo Background" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <div className="inline-block px-4 py-1 bg-borneo-lime/20 border border-borneo-lime/50 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
                  Food Estate Project
               </div>
               <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                 Punya Tanah <span className="text-borneo-lime">150m²</span> di Penyangga IKN, <br className="hidden lg:block"/>
                 Cuma Seharga <span className="text-borneo-orange decoration-wavy underline decoration-white/20">Motor?</span>
               </h1>
               <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                 Project Food Estate Pring Land Borneo. Tanah SHM produktif dengan komoditas pangan bernilai tinggi (Cabai, Bawang).
               </p>
               <button 
                  onClick={() => document.getElementById('profit-borneo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-borneo-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all hover:scale-105"
               >
                  Amankan Slot Promo 25 Juta
               </button>
            </div>

            {/* Map Visual */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group h-[400px]">
                  <img src="https://picsum.photos/id/292/800/600" alt="Kebun Food Estate" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                      <div className="flex items-center gap-2 text-borneo-lime font-bold mb-2">
                         <MapPin className="animate-bounce" /> 
                         <span>Tanjung Selor, Kaltara</span>
                      </div>
                      <p className="text-white text-sm">Posisi Strategis Penyangga Ibu Kota Negara</p>
                  </div>
                  {/* Price Tag */}
                  <div className="absolute top-6 right-6 bg-white text-slate-900 p-4 rounded-2xl shadow-xl transform rotate-3">
                     <p className="text-xs font-bold text-slate-400 uppercase">Harga Promo</p>
                     <p className="text-3xl font-bold text-borneo-orange">Rp 25 Jt</p>
                  </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY BORNEO */}
      <section className="py-20 bg-white text-center">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-6">"Jangan Menyesal Saat Harga Tanah Sudah Milyaran."</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
               Ingat harga tanah di Serpong atau Cikarang 20 tahun lalu? Sejarah akan berulang di Kalimantan. 
               Sebagai penyangga IKN, kebutuhan pangan di sini akan melonjak tajam. Ini adalah momen <strong>Early Bird</strong> terbaik.
            </p>
         </div>
      </section>

      {/* 3. PRODUCT & COMMODITIES */}
      <section className="py-20 bg-borneo-bg">
         <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="font-serif text-3xl font-bold text-slate-800 mb-2">Ketahanan Pangan Adalah Bisnis Anti-Resesi</h2>
               <p className="text-slate-600">Lahan dikelola menjadi perkebunan produktif oleh PT. Lumbung Pangan Mataram.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {['Cabai', 'Bawang Merah', 'Tomat', 'Sayuran'].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm text-center hover:-translate-y-1 transition-transform border border-stone-100">
                     <div className="w-12 h-12 bg-borneo-lime/10 rounded-full flex items-center justify-center text-borneo-lime mx-auto mb-4">
                        <Sprout />
                     </div>
                     <h4 className="font-bold text-slate-800">{item}</h4>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. PROFIT SCHEME (NEW) */}
      <section id="profit-borneo" className="py-20 bg-slate-900 text-white">
         <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Investasi Sekarang, Profit Bulan Depan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                  <div className="text-borneo-lime font-bold text-5xl mb-4">01</div>
                  <h3 className="font-bold text-xl mb-2">Profit Guarantee</h3>
                  <p className="text-slate-300 text-sm mb-4">Bulan 1 - 3 (Masa Tanam Awal)</p>
                  <div className="bg-white/10 p-4 rounded-lg">
                     <span className="block text-2xl font-bold text-white">Rp 350.000</span>
                     <span className="text-xs text-slate-400">per bulan (Flat)</span>
                  </div>
               </div>

               <div className="bg-brand-primary/20 border border-brand-primary p-8 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Long Term</div>
                  <div className="text-white font-bold text-5xl mb-4">02</div>
                  <h3 className="font-bold text-xl mb-2">Profit Sharing</h3>
                  <p className="text-slate-300 text-sm mb-4">Bulan ke-4 dst.</p>
                  <div className="bg-brand-primary/20 p-4 rounded-lg border border-brand-primary/30">
                     <span className="block text-2xl font-bold text-white">Rp 400.000++</span>
                     <span className="text-xs text-emerald-200">Fix & Flat + Kenaikan 3%/thn</span>
                  </div>
               </div>

               <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                  <div className="text-borneo-orange font-bold text-5xl mb-4">03</div>
                  <h3 className="font-bold text-xl mb-2">Buyback Guarantee</h3>
                  <p className="text-slate-300 text-sm mb-4">Jaminan Keamanan Aset</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                     Kami siap membeli kembali unit Anda dengan kenaikan nilai 1.5% per tahun (S&K Berlaku, Min. Thn ke-2).
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 5. MEGA PROJECT SITEPLAN */}
      <section className="py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-6">Mega Project Seluas 11 Hektar</h2>
            <p className="text-slate-600 mb-10">Total 653 Unit Kavling. Kawasan terintegrasi dengan Warehouse dan Teknologi Modern.</p>
            
            <div className="border-2 border-slate-200 p-4 rounded-2xl bg-stone-50 mb-8">
               <div className="aspect-video bg-slate-300 rounded-xl relative flex items-center justify-center text-slate-500 overflow-hidden">
                  <img src="https://picsum.photos/id/16/800/600" alt="Siteplan Visual" className="w-full h-full object-cover grayscale opacity-50" />
                  <span className="absolute font-bold text-xl bg-white/80 px-6 py-2 rounded-lg">Visualisasi Siteplan</span>
               </div>
               <div className="flex justify-center gap-6 mt-4 text-sm font-bold text-slate-600">
                  <span className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Sold Out (Blok A)</span>
                  <span className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Available (Blok B)</span>
               </div>
            </div>

            <div className="bg-white shadow-xl rounded-2xl p-8 border border-stone-100 max-w-lg mx-auto">
               <h3 className="font-serif text-2xl font-bold mb-4">Booking Kavling Borneo</h3>
               <p className="text-slate-500 text-sm mb-6">Slot Promo 25 Juta Terbatas.</p>
               <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Nama Lengkap" className="w-full px-4 py-3 rounded-lg border bg-stone-50" />
                  <input type="tel" placeholder="Nomor WhatsApp" className="w-full px-4 py-3 rounded-lg border bg-stone-50" />
                  <button className="w-full bg-borneo-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all">
                     Ambil Promo Sekarang
                  </button>
               </form>
            </div>
         </div>
      </section>

    </div>
  );
};

export default DeepDiveBorneo;