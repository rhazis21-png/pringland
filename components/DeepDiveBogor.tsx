import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  GraduationCap, 
  Waves, 
  Egg, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';

interface DeepDiveBogorProps {
  onNavigate: (page: 'home' | 'jogja' | 'bogor' | 'borneo') => void;
}

const DeepDiveBogor: React.FC<DeepDiveBogorProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'layer' | 'duck' | 'broiler'>('layer');

  return (
    <div className="bg-bogor-bg min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[80vh] w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-teal-900/40 z-10"></div>
        <img 
          src="https://picsum.photos/id/142/1920/1080" 
          alt="Bogor Landscape" 
          className="w-full h-full object-cover animation-kenburns"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <span className="bg-bogor-teal/90 text-white px-4 py-1 rounded-full font-bold tracking-widest uppercase text-xs mb-4 animate-fade-in-up shadow-lg">
            Project Pring Land Bogor
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl drop-shadow-lg">
            Investasi Villa Ternak Produktif <br/> di Halaman Belakang Jakarta.
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mb-10 leading-relaxed drop-shadow-md">
            Miliki aset properti SHM di <strong>Leuwiliang, Bogor</strong>. Hanya 1-2 jam dari Jakarta, nikmati passive income rutin dari Ayam Petelur, Bebek, atau Ayam Broiler.
          </p>
          <button 
             onClick={() => document.getElementById('products-bogor')?.scrollIntoView({ behavior: 'smooth' })}
             className="bg-bogor-teal hover:bg-cyan-700 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
          >
             Jadwalkan Survei Lokasi
          </button>
        </div>
      </div>

      {/* 2. LOCATION VALIDATION */}
      <section className="py-20 bg-white">
         <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div>
                  <h2 className="font-serif text-3xl font-bold text-slate-800 mb-6">Lokasi Premium di Jalur Wisata Bogor Barat</h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                     Berlokasi di <strong>Jl. Prasasti, Karyasari, Leuwiliang</strong>. Aset Anda berada di kawasan berkembang yang dikelilingi destinasi populer, menjamin kenaikan nilai tanah (Capital Gain) yang pesat.
                  </p>
                  <ul className="space-y-4">
                     <li className="flex items-center gap-4 bg-bogor-bg p-4 rounded-xl text-bogor-text font-medium">
                        <GraduationCap className="text-bogor-teal w-6 h-6" /> Dekat Kampus IPB Dramaga
                     </li>
                     <li className="flex items-center gap-4 bg-bogor-bg p-4 rounded-xl text-bogor-text font-medium">
                        <Waves className="text-bogor-teal w-6 h-6" /> Dekat Curug Cikuluwung & Curug Luhur
                     </li>
                     <li className="flex items-center gap-4 bg-bogor-bg p-4 rounded-xl text-bogor-text font-medium">
                        <MapPin className="text-bogor-teal w-6 h-6" /> Akses Mudah dari Tol Sentul / Jakarta
                     </li>
                  </ul>
               </div>
               <div className="h-[400px] bg-slate-200 rounded-3xl overflow-hidden shadow-lg relative group">
                  <img src="https://picsum.photos/id/1047/800/800" alt="Map Illustration" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <button className="bg-white/90 text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 hover:scale-105 transition-transform">
                        <MapPin className="text-red-500" /> Lihat di Google Maps
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. PRODUCTS PORTFOLIO */}
      <section id="products-bogor" className="py-24 bg-bogor-bg">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-800 mb-4">Pilih Mesin Uang Anda</h2>
               <p className="text-slate-600">Satu-satunya lokasi dengan 3 varian produk dalam satu kawasan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               
               {/* CARD 1: LAYER */}
               <div className={`bg-white rounded-3xl p-8 shadow-lg border-2 transition-all ${activeTab === 'layer' ? 'border-bogor-teal scale-105 z-10' : 'border-transparent hover:border-bogor-teal/30'}`}>
                  <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-6">
                     <Egg size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-800 mb-2">Ayam Petelur</h3>
                  <p className="text-xs font-bold text-bogor-teal uppercase tracking-wider mb-4">Best Seller</p>
                  <p className="text-slate-500 text-sm mb-6">Panen Telur Setiap Hari, Profit Cair Bulanan. Cashflow stabil.</p>
                  
                  <div className="space-y-3 mb-8 bg-stone-50 p-4 rounded-xl">
                     <div className="flex justify-between text-sm"><span className="text-slate-500">Aset</span> <span className="font-bold">Villa 24m²</span></div>
                     <div className="flex justify-between text-sm"><span className="text-slate-500">Populasi</span> <span className="font-bold">150 Ekor</span></div>
                     <div className="flex justify-between text-sm"><span className="text-slate-500">Profit (70%)</span> <span className="font-bold text-green-600">± Rp 1.55 Jt/bln</span></div>
                  </div>
                  <button onClick={() => setActiveTab('layer')} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800">Pilih Paket Layer</button>
               </div>

               {/* CARD 2: DUCK */}
               <div className={`bg-white rounded-3xl p-8 shadow-lg border-2 transition-all ${activeTab === 'duck' ? 'border-bogor-teal scale-105 z-10' : 'border-transparent hover:border-bogor-teal/30'}`}>
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-6">
                     <Waves size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-800 mb-2">Bebek Petelur</h3>
                  <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-4">Premium</p>
                  <p className="text-slate-500 text-sm mb-6">Nilai jual telur lebih tinggi. Ketahanan fisik hewan kuat.</p>
                  
                  <div className="space-y-3 mb-8 bg-stone-50 p-4 rounded-xl">
                     <div className="flex justify-between text-sm"><span className="text-slate-500">Aset</span> <span className="font-bold">Villa 24m²</span></div>
                     <div className="flex justify-between text-sm"><span className="text-slate-500">Populasi</span> <span className="font-bold">100 Ekor</span></div>
                     <div className="flex justify-between text-sm"><span className="text-slate-500">Profit (70%)</span> <span className="font-bold text-green-600">± Rp 1.59 Jt/bln</span></div>
                  </div>
                  <button onClick={() => setActiveTab('duck')} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800">Pilih Paket Bebek</button>
               </div>

               {/* CARD 3: BROILER */}
               <div className={`bg-white rounded-3xl p-8 shadow-lg border-2 transition-all ${activeTab === 'broiler' ? 'border-bogor-teal scale-105 z-10' : 'border-transparent hover:border-bogor-teal/30'}`}>
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
                     <CalendarDays size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-800 mb-2">Ayam Broiler</h3>
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-4">High Turnover</p>
                  <p className="text-slate-500 text-sm mb-6">Siklus panen cepat (± 45 Hari). Perputaran modal kencang.</p>
                  
                  <div className="space-y-3 mb-8 bg-stone-50 p-4 rounded-xl">
                     <div className="flex justify-between text-sm"><span className="text-slate-500">Aset</span> <span className="font-bold">Villa 15m²</span></div>
                     <div className="flex justify-between text-sm"><span className="text-slate-500">Populasi</span> <span className="font-bold">200 Ekor</span></div>
                     <div className="flex justify-between text-sm"><span className="text-slate-500">Profit (70%)</span> <span className="font-bold text-green-600">± Rp 1.35 Jt/siklus</span></div>
                  </div>
                  <button onClick={() => setActiveTab('broiler')} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800">Pilih Paket Broiler</button>
               </div>

            </div>
         </div>
      </section>

      {/* 4. SITEPLAN URGENCY */}
      <section className="py-20 bg-white">
         <div className="max-w-5xl mx-auto px-4">
            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-bogor-teal/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
               
               <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                  <div className="md:w-1/2">
                     <h2 className="font-serif text-3xl font-bold mb-6">Amankan Posisi Strategis</h2>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                           <span>🟦 BLOK A (Ayam Petelur)</span>
                           <span className="font-bold">296 Unit</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                           <span>🟪 BLOK B (Bebek Petelur)</span>
                           <span className="font-bold">136 Unit</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                           <span>🟧 BLOK C (Broiler)</span>
                           <span className="font-bold text-bogor-teal animate-pulse">119 Unit (Terbatas!)</span>
                        </div>
                     </div>
                     <p className="mt-8 text-sm text-slate-400">Booking Fee hanya Rp 10 Juta (Refundable).</p>
                  </div>

                  <div className="md:w-1/2 bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 text-center">
                     <h3 className="font-bold text-xl mb-4">Tertarik dengan Project Bogor?</h3>
                     <p className="text-sm text-slate-300 mb-6">Warga Jakarta & Sekitarnya, jangan lewatkan kesempatan survei lokasi akhir pekan ini.</p>
                     <button className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-bogor-teal hover:text-white transition-colors">
                        Hubungi Marketing Bogor
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default DeepDiveBogor;