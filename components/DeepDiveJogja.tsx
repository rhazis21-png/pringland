import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  CalendarDays,
  Home,
  Egg,
  TrendingUp,
  Download,
  Clock
} from 'lucide-react';

interface DeepDiveJogjaProps {
  onNavigate: (page: 'home' | 'jogja' | 'bogor' | 'borneo') => void;
}

const DeepDiveJogja: React.FC<DeepDiveJogjaProps> = ({ onNavigate }) => {
  const [activeLocation, setActiveLocation] = useState<'turi' | 'patuk'>('turi');
  const [activeTab, setActiveTab] = useState<'broiler' | 'layer'>('broiler');

  // Logic to switch content based on location & tab
  const isTuri = activeLocation === 'turi';
  
  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* 1. REGIONAL HERO SECTION */}
      <div className="relative h-[70vh] w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={isTuri ? "https://picsum.photos/id/1036/1920/1080" : "https://picsum.photos/id/1015/1920/1080"} 
          alt="Jogja Landscape" 
          className="w-full h-full object-cover animation-kenburns transition-opacity duration-1000"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <span className="text-jogja-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 animate-fade-in-up">
            Regional Yogyakarta
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl drop-shadow-lg">
            Miliki Villa Peternakan di <br/> Destinasi Wisata Favorit Indonesia
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mb-10 leading-relaxed drop-shadow-md">
            Pilih lokasi impian Anda: Sejuknya Lereng Merapi (Turi) atau Jalur Emas Wisata Gunungkidul (Patuk).
          </p>
          <button 
             onClick={() => document.getElementById('location-select')?.scrollIntoView({ behavior: 'smooth' })}
             className="bg-jogja-gold hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
          >
             Lihat Pilihan Lokasi
          </button>
        </div>
      </div>

      {/* 2. WHY JOGJA */}
      <section className="py-16 bg-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-slate-800 mb-4">Jogja: Dimana Aset Properti Bertemu Budaya & Wisata</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Berinvestasi properti di sini berarti mengamankan aset dengan potensi kenaikan harga tanah (Capital Gain) yang tinggi.
            Pring Land hadir di 2 Titik Paling Strategis: <strong>Sleman (Utara)</strong> & <strong>Gunungkidul (Timur)</strong>.
          </p>
        </div>
      </section>

      {/* 3. LOCATION SELECTOR (SPLIT SECTION) */}
      <section id="location-select" className="py-20 bg-stone-100">
         <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center font-serif text-3xl font-bold mb-12 text-slate-800">Pilih Lokasi Aset Anda</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* Option A: TURI */}
               <div 
                  onClick={() => { setActiveLocation('turi'); setActiveTab('broiler'); }}
                  className={`cursor-pointer group relative overflow-hidden rounded-3xl h-[500px] border-4 transition-all duration-300 ${activeLocation === 'turi' ? 'border-jogja-gold shadow-2xl scale-[1.02]' : 'border-transparent shadow-md grayscale hover:grayscale-0'}`}
               >
                  <img src="https://picsum.photos/id/128/800/1000" alt="Turi Sleman" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white w-full bg-gradient-to-t from-black/90 to-transparent">
                     <div className="uppercase tracking-widest text-xs font-bold mb-2 text-jogja-gold">Sleman - Lereng Merapi</div>
                     <h3 className="font-serif text-3xl font-bold mb-2">Pring Land Turi</h3>
                     <p className="text-sm opacity-90 mb-4 line-clamp-2">Nuansa tenang, udara sejuk, dekat agrowisata. Tersedia Paket Broiler & Petelur.</p>
                     <span className="inline-block px-4 py-2 bg-white text-slate-900 font-bold rounded-lg text-sm">Mulai Rp 79 Juta</span>
                     {activeLocation === 'turi' && <div className="absolute top-6 right-6 bg-jogja-gold rounded-full p-2"><ShieldCheck className="w-6 h-6 text-white"/></div>}
                  </div>
               </div>

               {/* Option B: PATUK */}
               <div 
                  onClick={() => { setActiveLocation('patuk'); setActiveTab('layer'); }}
                  className={`cursor-pointer group relative overflow-hidden rounded-3xl h-[500px] border-4 transition-all duration-300 ${activeLocation === 'patuk' ? 'border-jogja-gold shadow-2xl scale-[1.02]' : 'border-transparent shadow-md grayscale hover:grayscale-0'}`}
               >
                  <img src="https://picsum.photos/id/1018/800/1000" alt="Patuk Gunungkidul" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white w-full bg-gradient-to-t from-black/90 to-transparent">
                     <div className="uppercase tracking-widest text-xs font-bold mb-2 text-jogja-gold">Gunungkidul - Jalur Wisata</div>
                     <h3 className="font-serif text-3xl font-bold mb-2">Pring Land Patuk</h3>
                     <p className="text-sm opacity-90 mb-4 line-clamp-2">View perbukitan, jalur HeHa Sky View. Capital Gain tinggi. Spesialis Petelur.</p>
                     <span className="inline-block px-4 py-2 bg-white text-slate-900 font-bold rounded-lg text-sm">Mulai Rp 100 Juta+</span>
                     {activeLocation === 'patuk' && <div className="absolute top-6 right-6 bg-jogja-gold rounded-full p-2"><ShieldCheck className="w-6 h-6 text-white"/></div>}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. PRODUCT DETAIL & ROI */}
      <section className="py-20 bg-white">
         <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
               <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Detail Produk: {isTuri ? 'TURI (SLEMAN)' : 'PATUK (GUNUNGKIDUL)'}</span>
               <h2 className="font-serif text-3xl font-bold text-slate-800">Spesifikasi & ROI</h2>
            </div>

            {/* Tabs Logic */}
            <div className="flex justify-center mb-10">
               <div className="bg-stone-100 p-1 rounded-full inline-flex">
                  {/* Turi has Broiler & Layer. Patuk Only Layer (Chicken/Duck) */}
                  {isTuri && (
                     <button 
                        onClick={() => setActiveTab('broiler')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'broiler' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                     >
                        PAKET BROILER
                     </button>
                  )}
                  <button 
                     onClick={() => setActiveTab('layer')}
                     className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'layer' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                  >
                     PAKET PETELUR {isTuri ? '' : '(AYAM/BEBEK)'}
                  </button>
               </div>
            </div>

            {/* Detail Card */}
            <div className="bg-white border border-stone-200 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-12">
               <div className="w-full md:w-1/2">
                  <h3 className="font-serif text-2xl font-bold mb-2">
                     {activeTab === 'broiler' ? 'Paket Broiler (Pedaging)' : isTuri ? 'Paket Petelur (Ayam)' : 'Paket Petelur (Ayam / Bebek)'}
                  </h3>
                  <p className="text-slate-500 mb-8">
                     {activeTab === 'broiler' 
                        ? 'Solusi putaran modal cepat. High turnover.' 
                        : 'Passive income harian, cair bulanan. Stabil.'}
                  </p>

                  <div className="space-y-4">
                     <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                        <span className="text-slate-600 font-medium">Investasi Mulai</span>
                        <span className="font-bold text-jogja-gold text-lg">
                           {activeTab === 'broiler' ? 'Rp 79 Juta' : 'Rp 100 Jutaan'}
                        </span>
                     </div>
                     <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                        <span className="text-slate-600 font-medium">Luas Villa</span>
                        <span className="font-bold text-slate-800">
                           {activeTab === 'broiler' ? '15 m² (Type A1)' : '24 m² (Type A1001)'}
                        </span>
                     </div>
                     <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                        <span className="text-slate-600 font-medium">Populasi</span>
                        <span className="font-bold text-slate-800">
                           {activeTab === 'broiler' ? '200 Ekor' : isTuri ? '150 Ekor' : '150 (Ayam) / 100 (Bebek)'}
                        </span>
                     </div>
                     <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                        <span className="text-slate-600 font-medium">Est. Profit (70%)</span>
                        <span className="font-bold text-green-600">
                           {activeTab === 'broiler' 
                              ? '± Rp 1.35 Jt / 45 Hari' 
                              : isTuri ? '± Rp 1.55 Jt / Bulan' : '± Rp 1.5 - 1.6 Jt / Bulan'}
                        </span>
                     </div>
                     <div className="flex justify-between pt-2">
                        <span className="text-slate-600 font-medium">Est. BEP</span>
                        <span className="font-bold text-slate-800">± 5 - 5.5 Tahun</span>
                     </div>
                  </div>

                  <button className="mt-8 flex items-center gap-2 text-jogja-gold font-bold text-sm hover:underline">
                     <Download size={16} /> Download Tabel Simulasi Profit PDF
                  </button>
               </div>

               {/* Right Side: Features */}
               <div className="w-full md:w-1/2 bg-stone-50 rounded-2xl p-8">
                  <h4 className="font-bold text-slate-800 mb-6">Fasilitas & Keunggulan</h4>
                  <ul className="space-y-4">
                     <li className="flex items-start gap-3">
                        <Home className="text-jogja-gold shrink-0" size={20} />
                        <span className="text-sm text-slate-600">Bangunan Villa Estetik (Bukan Kandang Biasa). Pondasi batu kali, dinding GRC wood plank, atap galvalum.</span>
                     </li>
                     <li className="flex items-start gap-3">
                        <ShieldCheck className="text-jogja-gold shrink-0" size={20} />
                        <span className="text-sm text-slate-600">Legalitas Aman. SHM atas nama investor. Transaksi via Notaris (PPJB & SKPU).</span>
                     </li>
                     <li className="flex items-start gap-3">
                        <TrendingUp className="text-jogja-gold shrink-0" size={20} />
                        <span className="text-sm text-slate-600">Manajemen Full Auto-Pilot. Laporan berkala, perawatan hewan, pakan & kesehatan terjamin.</span>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </section>

      {/* 5. SITE PLAN & SCARCITY */}
      <section className="py-20 bg-stone-100">
         <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div>
                  <h2 className="font-serif text-3xl font-bold text-slate-800 mb-4">Unit Strategis Semakin Menipis</h2>
                  <p className="text-slate-600 mb-8">
                     {isTuri 
                        ? 'Pring Land Turi: Blok Broiler hanya sisa sedikit.' 
                        : 'Pring Land Patuk: Blok A (Ayam) dan Blok B (Bebek) terjual cepat.'}
                     <br/>Jangan sampai kehabisan spot di lokasi premium ini.
                  </p>
                  
                  {/* Mock Siteplan Visual */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 mb-6">
                     <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-slate-700">Live Ketersediaan</span>
                        <div className="flex gap-2 text-xs">
                           <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded-full"></div> Sold</span>
                           <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Avail</span>
                        </div>
                     </div>
                     <div className="grid grid-cols-8 gap-2">
                        {Array.from({length: 32}).map((_, i) => (
                           <div key={i} className={`h-6 rounded ${i < 20 ? 'bg-red-400 opacity-50' : 'bg-green-500 animate-pulse'}`}></div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-jogja-gold">
                  <h3 className="font-serif text-2xl font-bold mb-6 text-center">Form Peminatan {isTuri ? 'Turi' : 'Patuk'}</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                     <input type="text" placeholder="Nama Lengkap" className="w-full px-4 py-3 rounded-lg border bg-stone-50" />
                     <input type="tel" placeholder="Nomor WhatsApp" className="w-full px-4 py-3 rounded-lg border bg-stone-50" />
                     <select className="w-full px-4 py-3 rounded-lg border bg-stone-50">
                        {isTuri ? (
                           <>
                              <option>Minat Paket Broiler (Rp 79jt)</option>
                              <option>Minat Paket Petelur (Rp 100jt)</option>
                           </>
                        ) : (
                           <>
                              <option>Minat Petelur Ayam (Patuk)</option>
                              <option>Minat Petelur Bebek (Patuk)</option>
                           </>
                        )}
                        <option>Ingin Konsultasi Dulu</option>
                     </select>
                     <button className="w-full bg-jogja-gold hover:bg-yellow-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all">
                        Hubungi Marketing {isTuri ? 'Turi' : 'Patuk'}
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default DeepDiveJogja;