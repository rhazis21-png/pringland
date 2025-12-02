
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
  CalendarDays,
  Map,
  Tent,
  Mountain,
  Camera
} from 'lucide-react';

interface DeepDiveBogorProps {
  onNavigate: (page: 'home' | 'jogja' | 'bogor' | 'borneo' | 'siteplan') => void;
}

const DeepDiveBogor: React.FC<DeepDiveBogorProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'layer' | 'duck' | 'broiler'>('layer');

  return (
    <div className="bg-bogor-bg min-h-screen">
      
      {/* 1. HERO SECTION - REVISED FOR ACCESSIBILITY */}
      <div className="relative h-[80vh] w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-teal-900/50 z-10"></div>
        <img 
          src="https://picsum.photos/id/142/1920/1080" 
          alt="Bogor Landscape" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <span className="bg-bogor-teal text-white px-5 py-2 rounded-lg font-bold tracking-widest uppercase text-base mb-6 shadow-xl">
            Project Pring Land Bogor
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight max-w-5xl drop-shadow-2xl">
            Punya Peternakan Sendiri, <br/> Cuma 1 Jam dari Rumah
          </h1>
          <p className="text-white text-lg md:text-2xl max-w-2xl mb-12 leading-relaxed drop-shadow-lg font-medium">
            Lokasi di <strong>Leuwiliang, Bogor</strong>. Sangat dekat untuk Anda survei akhir pekan ini bersama keluarga sambil menikmati udara segar.
          </p>
          <button 
             onClick={() => document.getElementById('products-bogor')?.scrollIntoView({ behavior: 'smooth' })}
             className="bg-bogor-teal hover:bg-cyan-700 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl transition-transform hover:scale-105 border-b-4 border-cyan-800 active:border-b-0 active:translate-y-1"
          >
             Jadwalkan Survei Lokasi
          </button>
        </div>
      </div>

      {/* 2. LOCATION VALIDATION */}
      <section className="py-20 bg-white border-b border-stone-200">
         <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">Lokasi Premium & Strategis</h2>
                  <p className="text-slate-800 text-xl leading-relaxed mb-8 font-medium">
                     Berlokasi di <strong>Jl. Prasasti, Karyasari, Leuwiliang</strong>. Dikelilingi destinasi wisata populer yang menjamin kenaikan harga tanah (Capital Gain).
                  </p>
                  <ul className="space-y-4">
                     <li className="flex items-center gap-4 bg-stone-50 p-4 rounded-xl text-slate-800 font-bold border border-stone-200 text-lg">
                        <GraduationCap className="text-bogor-teal w-8 h-8 shrink-0" /> Dekat Kampus IPB Dramaga
                     </li>
                     <li className="flex items-center gap-4 bg-stone-50 p-4 rounded-xl text-slate-800 font-bold border border-stone-200 text-lg">
                        <Waves className="text-bogor-teal w-8 h-8 shrink-0" /> Dekat Curug Cikuluwung & Curug Luhur
                     </li>
                     <li className="flex items-center gap-4 bg-stone-50 p-4 rounded-xl text-slate-800 font-bold border border-stone-200 text-lg">
                        <Tent className="text-bogor-teal w-8 h-8 shrink-0" /> Dekat The Highland Park Resort & MiniMania
                     </li>
                  </ul>
               </div>
               <div className="h-[400px] bg-slate-200 rounded-3xl overflow-hidden shadow-lg relative group border-4 border-stone-100">
                  <img src="https://picsum.photos/id/1047/800/800" alt="Map Illustration" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                     <a 
                        href="https://www.google.com/maps" 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-3 hover:scale-105 transition-transform border-2 border-stone-200 text-lg"
                     >
                        <MapPin className="text-red-600 w-6 h-6" /> Buka Google Maps
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. PRODUCTS PORTFOLIO */}
      <section id="products-bogor" className="py-24 bg-bogor-bg">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
               <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-4">Pilih Aset Produktif Anda</h2>
               <p className="text-slate-800 text-xl font-medium">Satu kawasan terpadu dengan 3 pilihan bisnis ternak.</p>
            </div>

            {/* Instruction */}
            <div className="text-center mb-12">
               <span className="inline-block bg-white border border-bogor-teal text-bogor-teal px-4 py-2 rounded-full text-base font-bold shadow-sm">
                  👇 Klik paket di bawah untuk memilih:
               </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               
               {/* CARD 1: LAYER (Gajian Bulanan) */}
               <div className={`bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-300 flex flex-col cursor-pointer relative overflow-hidden ${activeTab === 'layer' ? 'bg-emerald-50 border-emerald-600 shadow-2xl scale-105 ring-4 ring-emerald-200 z-10' : 'border-stone-200 opacity-80 hover:opacity-100 hover:border-bogor-teal'}`} onClick={() => setActiveTab('layer')}>
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">Blok A (296 Unit)</div>
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700 border border-yellow-200">
                        <Egg size={32} />
                     </div>
                     {activeTab === 'layer' && <div className="bg-emerald-600 text-white p-2 rounded-full shadow-lg"><CheckCircle2 size={24}/></div>}
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Ayam Petelur</h3>
                  <p className="text-sm font-bold text-emerald-800 bg-emerald-200 px-3 py-1 rounded w-fit mb-4">Gajian Bulanan (Stabil)</p>
                  
                  <div className="space-y-4 mb-8 bg-white/50 p-5 rounded-2xl border border-stone-200 mt-auto">
                     <div className="flex justify-between text-lg"><span className="text-slate-700">Luas Villa</span> <span className="font-bold text-slate-900">24 m²</span></div>
                     <div className="flex justify-between text-lg"><span className="text-slate-700">Populasi</span> <span className="font-bold text-slate-900">150 Ekor</span></div>
                     <div className="flex justify-between text-lg"><span className="text-slate-700">Profit (70%)</span> <span className="font-bold text-green-700">± Rp 1.55 Jt/bln</span></div>
                  </div>
                  <div className="mt-2 text-sm text-slate-600 font-medium">
                     ✅ <strong>Total Unit: 296 Unit</strong><br/>
                     ✅ <strong>Profit Guarantee 5%</strong> (Bulan 1)<br/>
                     ✅ <strong>Buyback Guarantee 5%</strong>
                  </div>
               </div>

               {/* CARD 2: DUCK (Premium) */}
               <div className={`bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-300 flex flex-col cursor-pointer relative overflow-hidden ${activeTab === 'duck' ? 'bg-purple-50 border-purple-600 shadow-2xl scale-105 ring-4 ring-purple-200 z-10' : 'border-stone-200 opacity-80 hover:opacity-100 hover:border-purple-400'}`} onClick={() => setActiveTab('duck')}>
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">Blok B (136 Unit)</div>
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 border border-purple-200">
                        <Waves size={32} />
                     </div>
                     {activeTab === 'duck' && <div className="bg-purple-600 text-white p-2 rounded-full shadow-lg"><CheckCircle2 size={24}/></div>}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Bebek Petelur</h3>
                  <p className="text-sm font-bold text-purple-800 bg-purple-200 px-3 py-1 rounded w-fit mb-4">Pilihan Premium</p>
                  
                  <div className="space-y-4 mb-8 bg-white/50 p-5 rounded-2xl border border-stone-200 mt-auto">
                     <div className="flex justify-between text-lg"><span className="text-slate-700">Luas Villa</span> <span className="font-bold text-slate-900">24 m²</span></div>
                     <div className="flex justify-between text-lg"><span className="text-slate-700">Populasi</span> <span className="font-bold text-slate-900">100 Ekor</span></div>
                     <div className="flex justify-between text-lg"><span className="text-slate-700">Profit (70%)</span> <span className="font-bold text-green-700">± Rp 1.59 Jt/bln</span></div>
                  </div>
                   <div className="mt-2 text-sm text-slate-600 font-medium">
                     ✅ <strong>Total Unit: 136 Unit</strong><br/>
                     ✅ <strong>Profit Guarantee 5%</strong> (Bulan 1)<br/>
                     ✅ <strong>Buyback Guarantee 5%</strong>
                  </div>
               </div>

               {/* CARD 3: BROILER (Panen Cepat) */}
               <div className={`bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-300 flex flex-col cursor-pointer relative overflow-hidden ${activeTab === 'broiler' ? 'bg-red-50 border-red-600 shadow-2xl scale-105 ring-4 ring-red-200 z-10' : 'border-stone-200 opacity-80 hover:opacity-100 hover:border-red-400'}`} onClick={() => setActiveTab('broiler')}>
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">Blok C (119 Unit)</div>
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-700 border border-red-200">
                        <CalendarDays size={32} />
                     </div>
                     {activeTab === 'broiler' && <div className="bg-red-600 text-white p-2 rounded-full shadow-lg"><CheckCircle2 size={24}/></div>}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Ayam Pedaging</h3>
                  <p className="text-sm font-bold text-red-800 bg-red-200 px-3 py-1 rounded w-fit mb-4">Panen Cepat (45 Hari)</p>
                  
                  <div className="space-y-4 mb-8 bg-white/50 p-5 rounded-2xl border border-stone-200 mt-auto">
                     <div className="flex justify-between text-lg"><span className="text-slate-700">Luas Villa</span> <span className="font-bold text-slate-900">15 m²</span></div>
                     <div className="flex justify-between text-lg"><span className="text-slate-700">Populasi</span> <span className="font-bold text-slate-900">200 Ekor</span></div>
                     <div className="flex justify-between text-lg"><span className="text-slate-700">Profit (70%)</span> <span className="font-bold text-green-700">± Rp 1.35 Jt/siklus</span></div>
                  </div>
                   <div className="mt-2 text-sm text-slate-600 font-medium">
                     ✅ <strong>Total Unit: 119 Unit</strong><br/>
                     ✅ <strong>Profit Guarantee 5%</strong> (Bulan 1)<br/>
                     ✅ <strong>Buyback Guarantee 5%</strong>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* 4. GALLERY SECTION */}
      <section className="py-20 bg-white border-t border-stone-200">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
               <span className="text-bogor-teal font-bold uppercase tracking-widest text-sm block mb-2">
                  <Camera size={20} className="inline-block mr-2" /> Gallery
               </span>
               <h2 className="font-serif text-3xl font-bold text-slate-900">Galeri Fasilitas & Wisata Bogor</h2>
               <p className="text-slate-800 text-xl font-medium max-w-2xl mx-auto mt-4">
                  Nikmati udara sejuk pegunungan dan kunjungi lokasi wisata di sekitar area farm.
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Image 1 - Farm Overview */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72 lg:col-span-2">
                   <img src="https://picsum.photos/id/143/1200/600" alt="Farm Overview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Area Peternakan Terpadu Leuwiliang</span>
                   </div>
                </div>
                
                {/* Image 2 - Curug */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                   <img src="https://picsum.photos/id/149/800/600" alt="Curug Cikuluwung" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Wisata Curug Cikuluwung (Dekat Lokasi)</span>
                   </div>
                </div>

                {/* Image 3 - Villa Design */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                   <img src="https://picsum.photos/id/158/800/600" alt="Villa A1 Design" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Konsep Villa A1001 Modern</span>
                   </div>
                </div>

                {/* Image 4 - Hills */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                   <img src="https://picsum.photos/id/160/800/600" alt="Pemandangan Bogor" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">View Perbukitan Hijau</span>
                   </div>
                </div>

                {/* Image 5 - Activity */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                   <img src="https://picsum.photos/id/175/800/600" alt="Family Visit" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Kunjungan Survei Keluarga</span>
                   </div>
                </div>
            </div>
         </div>
      </section>

      {/* 5. LINK TO MASTER SITEPLAN */}
      <section className="py-20 bg-stone-100 border-t border-stone-200">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">Cek Denah Lokasi & Ketersediaan</h2>
            <p className="text-slate-800 text-xl mb-8 leading-relaxed font-medium">
               Lihat detail Blok A, B, dan C di Bogor serta status unit terkini.
            </p>
            <button 
               onClick={() => onNavigate('siteplan')}
               className="bg-bogor-teal text-white px-10 py-5 rounded-xl font-bold text-xl shadow-xl flex items-center justify-center gap-3 mx-auto hover:bg-cyan-700 transition-all border-b-4 border-cyan-800 active:border-b-0 active:translate-y-1"
            >
               <Map size={24} /> Buka Master Siteplan Bogor
            </button>
         </div>
      </section>

      {/* 6. CTA Contact */}
      <section className="py-20 bg-bogor-bg">
         <div className="max-w-3xl mx-auto px-4 text-center">
             <div className="bg-white text-slate-900 p-8 rounded-2xl border-4 border-stone-200">
               <h3 className="font-bold text-2xl mb-4">Tertarik dengan Project Bogor?</h3>
               <p className="text-xl text-slate-800 mb-8 font-medium">Jangan lewatkan kesempatan. Booking Fee hanya Rp 10 Juta (Refundable).</p>
               <button className="w-full bg-bogor-teal text-white font-bold py-5 rounded-xl text-xl shadow-lg border-b-4 border-cyan-800 active:border-b-0 active:translate-y-1 hover:bg-cyan-700 transition-all">
                  Hubungi Marketing Bogor
               </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default DeepDiveBogor;
