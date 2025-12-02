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
  Clock,
  Waves,
  Banknote,
  FileCheck,
  CheckCircle2,
  Map,
  Camera
} from 'lucide-react';

interface DeepDiveJogjaProps {
  onNavigate: (page: 'home' | 'jogja' | 'bogor' | 'borneo' | 'siteplan') => void;
}

const DeepDiveJogja: React.FC<DeepDiveJogjaProps> = ({ onNavigate }) => {
  const [activeLocation, setActiveLocation] = useState<'turi' | 'patuk'>('turi');
  const isTuri = activeLocation === 'turi';
  
  const handleLocationChange = (loc: 'turi' | 'patuk') => {
    setActiveLocation(loc);
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* 1. REGIONAL HERO SECTION */}
      <div className="relative h-[70vh] w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img 
          src={isTuri ? "https://picsum.photos/id/1036/1920/1080" : "https://picsum.photos/id/1015/1920/1080"} 
          alt="Jogja Landscape" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <span className="bg-jogja-gold text-white px-4 py-1 rounded-full font-bold tracking-widest uppercase text-sm mb-6 shadow-lg border border-yellow-600">
            Regional Yogyakarta
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight max-w-4xl drop-shadow-xl">
            Miliki Villa Peternakan di <br/> Destinasi Wisata Jogja
          </h1>
          <p className="text-white text-lg md:text-2xl max-w-2xl mb-12 leading-relaxed drop-shadow-md font-medium">
            Pilih lokasi: Sejuknya Lereng Merapi (Turi) atau Kawasan Wisata Gunungkidul (Patuk).
          </p>
          <button 
             onClick={() => document.getElementById('location-select')?.scrollIntoView({ behavior: 'smooth' })}
             className="bg-jogja-gold hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1"
          >
             Lihat Pilihan Lokasi
          </button>
        </div>
      </div>

      {/* 2. WHY JOGJA */}
      <section className="py-16 bg-white text-center px-4 border-b border-stone-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">Investasi Tanah + Bisnis di Kota Budaya</h2>
          <p className="text-slate-800 text-xl leading-relaxed">
            Jogja adalah magnet wisata. Memiliki tanah di sini berarti memiliki aset yang harganya naik terus. 
            Kami hadir di 2 lokasi strategis: <strong>Sleman (Utara)</strong> & <strong>Gunungkidul (Timur)</strong>.
          </p>
        </div>
      </section>

      {/* 3. LOCATION SELECTOR (SPLIT SECTION) */}
      <section id="location-select" className="py-20 bg-stone-100">
         <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center font-serif text-3xl font-bold mb-4 text-slate-900">Langkah 1: Pilih Lokasi Aset</h2>
            <p className="text-center text-slate-700 mb-10 text-xl font-medium">Klik gambar di bawah untuk memilih lokasi</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* Option A: TURI */}
               <div 
                  onClick={() => handleLocationChange('turi')}
                  className={`cursor-pointer group relative overflow-hidden rounded-3xl h-[500px] border-4 transition-all duration-300 ${activeLocation === 'turi' ? 'border-jogja-gold shadow-2xl scale-[1.01]' : 'border-stone-300 shadow-md opacity-80 hover:opacity-100'}`}
               >
                  <img src="https://picsum.photos/id/128/800/1000" alt="Turi Sleman" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white w-full bg-gradient-to-t from-black/90 to-transparent">
                     <div className="uppercase tracking-widest text-sm font-bold mb-2 text-jogja-gold bg-black/50 w-fit px-2 rounded">Sleman - Lereng Merapi</div>
                     <h3 className="font-serif text-4xl font-bold mb-4">Pring Land Turi</h3>
                     <p className="text-lg font-medium opacity-95 mb-6">Farm of Jogja I (Petelur) & Farm II (Broiler). Udara sejuk & asri.</p>
                     <span className="inline-block px-5 py-2 bg-white text-slate-900 font-bold rounded-lg text-lg">Mulai Rp 79 Juta</span>
                     {activeLocation === 'turi' && <div className="absolute top-6 right-6 bg-jogja-gold rounded-full p-3 shadow-lg"><ShieldCheck className="w-8 h-8 text-white"/></div>}
                  </div>
               </div>

               {/* Option B: PATUK */}
               <div 
                  onClick={() => handleLocationChange('patuk')}
                  className={`cursor-pointer group relative overflow-hidden rounded-3xl h-[500px] border-4 transition-all duration-300 ${activeLocation === 'patuk' ? 'border-jogja-gold shadow-2xl scale-[1.01]' : 'border-stone-300 shadow-md opacity-80 hover:opacity-100'}`}
               >
                  <img src="https://picsum.photos/id/1018/800/1000" alt="Patuk Gunungkidul" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white w-full bg-gradient-to-t from-black/90 to-transparent">
                     <div className="uppercase tracking-widest text-sm font-bold mb-2 text-jogja-gold bg-black/50 w-fit px-2 rounded">Gunungkidul - Jalur Wisata</div>
                     <h3 className="font-serif text-4xl font-bold mb-4">Pring Land Patuk</h3>
                     <p className="text-lg font-medium opacity-95 mb-6">Farm of Jogja III. View perbukitan, jalur HeHa Sky View.</p>
                     <span className="inline-block px-5 py-2 bg-white text-slate-900 font-bold rounded-lg text-lg">Mulai Rp 100 Juta+</span>
                     {activeLocation === 'patuk' && <div className="absolute top-6 right-6 bg-jogja-gold rounded-full p-3 shadow-lg"><ShieldCheck className="w-8 h-8 text-white"/></div>}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. PRODUCT DETAIL & ROI */}
      <section className="py-20 bg-white">
         <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
               <span className="text-slate-700 font-bold uppercase text-base tracking-widest block mb-2">Langkah 2: Cek Detail Produk</span>
               <h2 className="font-serif text-3xl font-bold text-slate-900">
                  {isTuri ? 'Pilihan Paket Investasi Turi' : 'Pilihan Paket Investasi Patuk'}
               </h2>
            </div>

            {isTuri ? (
               <div className="space-y-10">
                  {/* Package 1: Ayam Petelur */}
                  <div className="bg-white border-2 border-stone-200 rounded-3xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row gap-8 relative overflow-hidden hover:border-jogja-gold transition-colors">
                      <div className="absolute top-0 right-0 bg-emerald-600 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">Farm I (51 Unit)</div>
                      <div className="w-full md:w-1/2">
                          <div className="flex items-center gap-3 mb-2">
                             <div className="p-2 bg-yellow-100 rounded-full text-yellow-700"><Egg size={24} /></div>
                             <h3 className="font-serif text-2xl font-bold text-slate-900">Paket Ayam Petelur</h3>
                          </div>
                          <p className="text-slate-700 text-lg mb-6 font-medium">Cocok untuk pengganti gaji bulanan. Stabil setiap hari.</p>
                          <div className="space-y-3 bg-stone-50 p-5 rounded-xl border border-stone-100">
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Modal</span> <span className="font-bold text-jogja-gold text-xl">Rp 100 Jutaan</span></div>
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Booking/DP</span> <span className="font-bold text-emerald-700 text-lg bg-emerald-100 px-2 rounded">Rp 10 Juta</span></div>
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Lahan / Villa</span> <span className="font-bold text-slate-900">33 m² / 24 m²</span></div>
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Profit (70%)</span> <span className="font-bold text-green-700 text-lg">± Rp 1.55 Jt/bln</span></div>
                          </div>
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col justify-center">
                          <h4 className="font-bold text-slate-900 mb-4 border-b border-stone-200 pb-2">Keunggulan Farm I</h4>
                          <ul className="space-y-3">
                              <li className="flex gap-2 items-start"><CheckCircle2 size={20} className="text-jogja-gold shrink-0 mt-1"/> <span className="text-slate-700">Legalitas SHM & Notaris (PPJB/SKPU)</span></li>
                              <li className="flex gap-2 items-start"><CheckCircle2 size={20} className="text-jogja-gold shrink-0 mt-1"/> <span className="text-slate-700"><strong>Profit Guarantee 5%</strong> (Bulan Pertama)</span></li>
                              <li className="flex gap-2 items-start"><CheckCircle2 size={20} className="text-jogja-gold shrink-0 mt-1"/> <span className="text-slate-700">Eksklusif hanya <strong>51 Unit</strong></span></li>
                          </ul>
                      </div>
                  </div>

                  {/* Package 2: Bebek Petelur */}
                  <div className="bg-white border-2 border-stone-200 rounded-3xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row gap-8 relative overflow-hidden hover:border-jogja-gold transition-colors">
                      <div className="absolute top-0 right-0 bg-emerald-600 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">Farm I (36 Unit)</div>
                      <div className="w-full md:w-1/2">
                          <div className="flex items-center gap-3 mb-2">
                             <div className="p-2 bg-blue-100 rounded-full text-blue-700"><Waves size={24} /></div>
                             <h3 className="font-serif text-2xl font-bold text-slate-900">Paket Bebek Petelur</h3>
                          </div>
                          <p className="text-slate-700 text-lg mb-6 font-medium">Telur bernilai tinggi & fisik bebek lebih kuat.</p>
                          <div className="space-y-3 bg-stone-50 p-5 rounded-xl border border-stone-100">
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Modal</span> <span className="font-bold text-jogja-gold text-xl">Rp 100 Jutaan</span></div>
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Booking/DP</span> <span className="font-bold text-emerald-700 text-lg bg-emerald-100 px-2 rounded">Rp 10 Juta</span></div>
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Lahan / Villa</span> <span className="font-bold text-slate-900">33 m² / 24 m²</span></div>
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Profit (70%)</span> <span className="font-bold text-green-700 text-lg">± Rp 1.59 Jt/bln</span></div>
                          </div>
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col justify-center">
                          <h4 className="font-bold text-slate-900 mb-4 border-b border-stone-200 pb-2">Keunggulan Farm I</h4>
                          <ul className="space-y-3">
                              <li className="flex gap-2 items-start"><CheckCircle2 size={20} className="text-jogja-gold shrink-0 mt-1"/> <span className="text-slate-700">Legalitas SHM & Notaris (PPJB/SKPU)</span></li>
                              <li className="flex gap-2 items-start"><CheckCircle2 size={20} className="text-jogja-gold shrink-0 mt-1"/> <span className="text-slate-700"><strong>Profit Guarantee 5%</strong> (Bulan Pertama)</span></li>
                              <li className="flex gap-2 items-start"><CheckCircle2 size={20} className="text-jogja-gold shrink-0 mt-1"/> <span className="text-slate-700">Eksklusif hanya <strong>36 Unit</strong></span></li>
                          </ul>
                      </div>
                  </div>

                  {/* Package 3: Broiler */}
                  <div className="bg-white border-2 border-stone-200 rounded-3xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row gap-8 relative overflow-hidden hover:border-jogja-gold transition-colors">
                      <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">Farm II (97 Unit)</div>
                      <div className="w-full md:w-1/2">
                          <div className="flex items-center gap-3 mb-2">
                             <div className="p-2 bg-red-100 rounded-full text-red-700"><CalendarDays size={24} /></div>
                             <h3 className="font-serif text-2xl font-bold text-slate-900">Paket Ayam Pedaging</h3>
                          </div>
                          <p className="text-slate-700 text-lg mb-6 font-medium">Panen cepat (45 hari). Perputaran modal lebih cepat.</p>
                          <div className="space-y-3 bg-stone-50 p-5 rounded-xl border border-stone-100">
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Modal</span> <span className="font-bold text-jogja-gold text-xl">Rp 79 Jutaan</span></div>
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Booking/DP</span> <span className="font-bold text-emerald-700 text-lg bg-emerald-100 px-2 rounded">Rp 5 Juta</span></div>
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Lahan / Villa</span> <span className="font-bold text-slate-900">25 m² / 15 m²</span></div>
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Profit (70%)</span> <span className="font-bold text-green-700 text-lg">± Rp 1.35 Jt/siklus</span></div>
                          </div>
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col justify-center">
                          <h4 className="font-bold text-slate-900 mb-4 border-b border-stone-200 pb-2">Keunggulan Farm II</h4>
                          <ul className="space-y-3">
                              <li className="flex gap-2 items-start"><CheckCircle2 size={20} className="text-jogja-gold shrink-0 mt-1"/> <span className="text-slate-700">Harga Paling Terjangkau</span></li>
                              <li className="flex gap-2 items-start"><CheckCircle2 size={20} className="text-jogja-gold shrink-0 mt-1"/> <span className="text-slate-700">Perawatan Mudah (Bermitra Inti)</span></li>
                              <li className="flex gap-2 items-start"><CheckCircle2 size={20} className="text-jogja-gold shrink-0 mt-1"/> <span className="text-slate-700">Tingkat Kematian Rendah</span></li>
                          </ul>
                      </div>
                  </div>
               </div>
            ) : (
               <div className="space-y-10">
                  {/* PATUK - Farm III */}
                   <div className="bg-white border-2 border-stone-200 rounded-3xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row gap-8 relative overflow-hidden hover:border-jogja-gold transition-colors">
                      <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">Farm III (162 Unit)</div>
                      <div className="w-full md:w-1/2">
                          <div className="flex items-center gap-3 mb-2">
                             <div className="p-2 bg-purple-100 rounded-full text-purple-700"><MapPin size={24} /></div>
                             <h3 className="font-serif text-2xl font-bold text-slate-900">Kavling Wisata Patuk</h3>
                          </div>
                          <p className="text-slate-700 text-lg mb-6 font-medium">Lokasi super premium di jalur wisata Gunungkidul (dekat HeHa Sky View).</p>
                          <div className="space-y-3 bg-stone-50 p-5 rounded-xl border border-stone-100">
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Harga</span> <span className="font-bold text-jogja-gold text-xl">Rp 100 Jutaan</span></div>
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Luas Lahan</span> <span className="font-bold text-slate-900">60 m² - 100 m²</span></div>
                              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Potensi</span> <span className="font-bold text-green-700 text-lg">Capital Gain Tinggi</span></div>
                          </div>
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col justify-center">
                          <h4 className="font-bold text-slate-900 mb-4 border-b border-stone-200 pb-2">Keunggulan Patuk</h4>
                          <ul className="space-y-3">
                              <li className="flex gap-2 items-start"><CheckCircle2 size={20} className="text-jogja-gold shrink-0 mt-1"/> <span className="text-slate-700">View Perbukitan Menawan</span></li>
                              <li className="flex gap-2 items-start"><CheckCircle2 size={20} className="text-jogja-gold shrink-0 mt-1"/> <span className="text-slate-700">Cocok untuk Villa / Resort Pribadi</span></li>
                              <li className="flex gap-2 items-start"><CheckCircle2 size={20} className="text-jogja-gold shrink-0 mt-1"/> <span className="text-slate-700">Akses Jalan Aspal Lebar</span></li>
                          </ul>
                      </div>
                  </div>
               </div>
            )}
         </div>
      </section>

      {/* 5. VISUAL TOUR / GALLERY SECTION */}
      <section className="py-20 bg-stone-50 border-t border-stone-200">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
               <span className="text-jogja-gold font-bold uppercase tracking-widest text-sm block mb-2">
                  <Camera size={20} className="inline-block mr-2" /> Gallery
               </span>
               <h2 className="font-serif text-3xl font-bold text-slate-900">Visual Tour Pring Land Jogja</h2>
               <p className="text-slate-800 text-xl font-medium max-w-2xl mx-auto mt-4">
                  Desain Villa Etnik modern yang menyatu dengan alam, kandang bersih, dan pemandangan asri.
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Image 1 - Villa Exterior */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                   <img src="https://picsum.photos/id/101/800/600" alt="Villa Exterior" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Desain Villa A1 Etnik</span>
                   </div>
                </div>
                
                {/* Image 2 - Farm Interior */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                   <img src="https://picsum.photos/id/102/800/600" alt="Farm Interior" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Kandang Modern Higienis</span>
                   </div>
                </div>

                {/* Image 3 - View Merapi */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                   <img src="https://picsum.photos/id/103/800/600" alt="View Merapi" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">View Gunung Merapi (Turi)</span>
                   </div>
                </div>

                {/* Image 4 - Activity */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                   <img src="https://picsum.photos/id/104/800/600" alt="Harvest Activity" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Panen Telur Harian</span>
                   </div>
                </div>

                {/* Image 5 - Patuk View */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72 md:col-span-2">
                   <img src="https://picsum.photos/id/106/1200/600" alt="Patuk View" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Suasana Perbukitan Patuk (Gunungkidul)</span>
                   </div>
                </div>
            </div>
         </div>
      </section>

      {/* 6. LINK TO MASTER SITEPLAN */}
      <section className="py-20 bg-stone-100 border-t border-stone-200">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">Cek Siteplan Jogja</h2>
            <p className="text-slate-800 text-xl mb-8 leading-relaxed font-medium">
               Lihat detail blok Farm I (Turi), Farm II, dan Farm III (Patuk). Pastikan unit pilihan Anda masih tersedia.
            </p>
            <button 
               onClick={() => onNavigate('siteplan')}
               className="bg-jogja-gold text-white px-10 py-5 rounded-xl font-bold text-xl shadow-xl flex items-center justify-center gap-3 mx-auto hover:bg-yellow-600 transition-all border-b-4 border-yellow-800 active:border-b-0 active:translate-y-1"
            >
               <Map size={24} /> Buka Master Siteplan Jogja
            </button>
         </div>
      </section>
      
    </div>
  );
};

export default DeepDiveJogja;