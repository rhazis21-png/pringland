
import React from 'react';
import { 
  MapPin, 
  Sprout,
  TrendingUp,
  ShieldCheck,
  Smartphone,
  Video,
  Map,
  Users,
  Camera
} from 'lucide-react';

interface DeepDiveBorneoProps {
  onNavigate: (page: 'home' | 'jogja' | 'bogor' | 'borneo' | 'siteplan') => void;
}

const DeepDiveBorneo: React.FC<DeepDiveBorneoProps> = ({ onNavigate }) => {
  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* 1. HERO SECTION - REVISED FOR TRUST & LEGACY */}
      <section className="relative bg-slate-900 text-white overflow-hidden pb-16 pt-32">
        <img src="https://picsum.photos/id/10/1920/1080" alt="Borneo Background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
               <div className="flex gap-3">
                  <div className="inline-block px-4 py-2 bg-emerald-900 border border-borneo-lime text-borneo-lime rounded-lg text-base font-bold uppercase tracking-wider shadow-lg">
                     Food Estate Project
                  </div>
                  <div className="inline-block px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-base font-bold uppercase tracking-wider shadow-lg flex items-center gap-2">
                     <Users size={18} /> Total 653 Unit
                  </div>
               </div>
               <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-xl">
                 Miliki Tanah Kavling Produktif di <br className="hidden lg:block"/>
                 <span className="text-borneo-lime">Penyangga IKN</span>
               </h1>
               <p className="text-xl md:text-2xl text-slate-100 leading-relaxed max-w-xl font-medium">
                 Investasi tanah SHM yang aman dan terjangkau. Tabungan aset jangka panjang untuk masa depan anak & cucu Anda.
               </p>
               <button 
                  onClick={() => document.getElementById('profit-borneo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-borneo-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl border-b-4 border-orange-800 active:border-b-0 active:translate-y-1 transition-all"
               >
                  Pelajari Potensi Aset
               </button>
            </div>

            {/* Map Visual */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group h-[400px] bg-slate-800">
                  <img src="https://picsum.photos/id/292/800/600" alt="Kebun Food Estate" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8">
                      <div className="flex items-center gap-3 text-borneo-lime font-bold mb-2 text-2xl bg-black/40 w-fit px-3 py-1 rounded">
                         <MapPin size={24} /> 
                         <span>Tanjung Selor, Kaltara</span>
                      </div>
                      <p className="text-white text-xl font-medium">Posisi Strategis Penyangga Ibu Kota Negara</p>
                  </div>
                  {/* Price Tag */}
                  <div className="absolute top-6 right-6 bg-white text-slate-900 p-5 rounded-xl shadow-xl border-2 border-stone-200">
                     <p className="text-base font-bold text-slate-700 uppercase mb-1">Harga Promo</p>
                     <p className="text-4xl font-bold text-borneo-orange">Rp 25 Jt</p>
                  </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY BORNEO */}
      <section className="py-20 bg-white text-center border-b border-stone-200">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-8">"Warisan Terbaik Adalah Tanah Produktif."</h2>
            <p className="text-slate-800 text-2xl leading-relaxed font-medium">
               Ingat harga tanah di Serpong atau Cikarang 20 tahun lalu? Sejarah akan berulang di Kalimantan. 
               Sebagai penyangga IKN, kebutuhan pangan di sini akan melonjak tajam. Ini adalah momen terbaik untuk membeli aset murah untuk anak cucu.
            </p>
         </div>
      </section>

      {/* NEW SECTION: REMOTE MONITORING (TRUST) */}
      <section className="py-20 bg-stone-100 border-b border-stone-200">
         <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
               <div className="md:w-1/2">
                  <span className="text-borneo-orange font-bold uppercase tracking-widest text-sm block mb-2">Pantau Jarak Jauh</span>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">Aset Jauh di Mata,<br/>Dekat di WhatsApp.</h2>
                  <p className="text-slate-800 text-xl leading-relaxed mb-8">
                     Bapak/Ibu tidak perlu repot terbang ke Kalimantan. Kami menyediakan sistem pelaporan digital yang transparan dan rutin.
                  </p>
                  <ul className="space-y-6">
                     <li className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-full text-green-700"><Smartphone size={28}/></div>
                        <div>
                           <h4 className="font-bold text-xl text-slate-900">Laporan Panen via WhatsApp</h4>
                           <p className="text-slate-700 text-lg">Update hasil panen dan transfer bagi hasil dilaporkan rutin ke HP Anda.</p>
                        </div>
                     </li>
                     <li className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-700"><Video size={28}/></div>
                        <div>
                           <h4 className="font-bold text-xl text-slate-900">Video Drone Berkala</h4>
                           <p className="text-slate-700 text-lg">Melihat perkembangan lahan dan tanaman secara visual dari udara.</p>
                        </div>
                     </li>
                  </ul>
               </div>
               <div className="md:w-1/2">
                  <img src="https://picsum.photos/id/6/800/600" alt="Remote Monitoring" className="rounded-3xl shadow-2xl border-4 border-white" />
               </div>
            </div>
         </div>
      </section>

      {/* 3. PRODUCT & COMMODITIES */}
      <section className="py-20 bg-borneo-bg">
         <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">Ketahanan Pangan: Bisnis Anti Krisis</h2>
               <p className="text-slate-800 text-xl font-medium">Lahan dikelola menjadi perkebunan produktif oleh PT. Lumbung Pangan Mataram.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {['Cabai', 'Bawang Merah', 'Tomat', 'Sayuran'].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-md text-center border-2 border-stone-200 hover:border-borneo-lime transition-colors">
                     <div className="w-16 h-16 bg-borneo-lime/10 rounded-full flex items-center justify-center text-borneo-lime mx-auto mb-6">
                        <Sprout size={32} />
                     </div>
                     <h4 className="font-bold text-xl text-slate-900">{item}</h4>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. PROFIT SCHEME - INDONESIAN TERMS */}
      <section id="profit-borneo" className="py-24 bg-slate-900 text-white">
         <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-16">Investasi Sekarang, Nikmati Hasilnya</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Box 1 */}
               <div className="bg-white/5 border-2 border-white/10 p-8 rounded-3xl flex flex-col">
                  <div className="text-borneo-lime font-bold text-6xl mb-6 opacity-50">01</div>
                  <h3 className="font-bold text-2xl mb-2 text-white">Jaminan Panen Awal</h3>
                  <p className="text-slate-300 text-lg mb-6 font-medium">Bulan 1 - 3 (Masa Tanam)</p>
                  <div className="bg-emerald-900/50 p-6 rounded-xl border border-emerald-700/50 mt-auto text-center">
                     <span className="block text-3xl font-bold text-white mb-1">Rp 350.000</span>
                     <span className="text-base text-emerald-200 font-bold uppercase tracking-wide">/Bulan (3 Bulan) Setelah Akad</span>
                  </div>
               </div>

               {/* Box 2 */}
               <div className="bg-brand-primary/10 border-2 border-brand-primary p-8 rounded-3xl relative overflow-hidden flex flex-col transform md:-translate-y-4 shadow-2xl">
                  <div className="absolute top-0 right-0 bg-brand-primary text-white text-sm font-bold px-4 py-2 rounded-bl-xl">Jangka Panjang</div>
                  <div className="text-white font-bold text-6xl mb-6 opacity-80">02</div>
                  <h3 className="font-bold text-2xl mb-2 text-white">Bagi Hasil Jangka Panjang</h3>
                  <p className="text-slate-100 text-lg mb-6 font-medium">Mulai Bulan ke-4 dst.</p>
                  <div className="bg-brand-primary p-6 rounded-xl shadow-lg mt-auto text-center">
                     <span className="block text-3xl font-bold text-white mb-1">Rp 400.000</span>
                     <span className="text-base text-emerald-100 font-bold uppercase tracking-wide">Fix & Flat + Kenaikan 3%/thn</span>
                  </div>
               </div>

               {/* Box 3 */}
               <div className="bg-white/5 border-2 border-white/10 p-8 rounded-3xl flex flex-col">
                  <div className="text-borneo-orange font-bold text-6xl mb-6 opacity-50">03</div>
                  <h3 className="font-bold text-2xl mb-2 text-white">Jaminan Pembelian Kembali</h3>
                  <p className="text-slate-300 text-lg mb-6 font-medium">Keamanan Modal Anda</p>
                  <div className="bg-stone-800 p-6 rounded-xl border border-stone-700 mt-auto">
                     <p className="text-slate-200 text-lg leading-relaxed">
                        Jika Anda ingin jual kembali, kami siap membeli dengan kenaikan nilai <strong>1.5% per tahun</strong>. (Min. Tahun ke-2).
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. GALLERY SECTION */}
      <section className="py-20 bg-white border-t border-stone-200">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
               <span className="text-borneo-orange font-bold uppercase tracking-widest text-sm block mb-2">
                  <Camera size={20} className="inline-block mr-2" /> Gallery
               </span>
               <h2 className="font-serif text-3xl font-bold text-slate-900">Galeri Kebun & Panen Raya</h2>
               <p className="text-slate-800 text-xl font-medium max-w-2xl mx-auto mt-4">
                  Melihat langsung potensi lahan yang luas, subur, dan dikelola secara profesional.
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Image 1 - Plantation Overview */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72 lg:col-span-2">
                   <img src="https://picsum.photos/id/292/1200/600" alt="Plantation Overview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Hamparan Lahan Food Estate Borneo (11 Ha)</span>
                   </div>
                </div>
                
                {/* Image 2 - Chili Harvest */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                   <img src="https://picsum.photos/id/299/800/600" alt="Chili Harvest" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Panen Raya Cabai</span>
                   </div>
                </div>

                {/* Image 3 - Tech */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                   <img src="https://picsum.photos/id/400/800/600" alt="Agri Tech" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Teknologi Pemantauan Drone</span>
                   </div>
                </div>

                {/* Image 4 - Warehouse */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                   <img src="https://picsum.photos/id/401/800/600" alt="Warehouse" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Gudang & Sentra Distribusi</span>
                   </div>
                </div>

                {/* Image 5 - Team */}
                <div className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                   <img src="https://picsum.photos/id/402/800/600" alt="Team" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-lg">Dikelola Tim Ahli Agronomi</span>
                   </div>
                </div>
            </div>
         </div>
      </section>

      {/* 6. LINK TO MASTER SITEPLAN (NEW REPLACEMENT SECTION) */}
      <section className="py-20 bg-stone-100 border-t border-stone-200">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">Visualisasi Lahan 11 Hektar</h2>
            <p className="text-slate-800 text-xl mb-10 font-medium">
               Food Estate Borneo adalah proyek masif. Lihat pembagian zona dan ketersediaan lahan promo (Total 653 Unit).
            </p>
            <button 
               onClick={() => onNavigate('siteplan')}
               className="bg-borneo-orange text-white px-10 py-5 rounded-xl font-bold text-xl shadow-xl flex items-center justify-center gap-3 mx-auto hover:bg-orange-600 transition-all border-b-4 border-orange-800 active:border-b-0 active:translate-y-1"
            >
               <Map size={24} /> Buka Master Siteplan Borneo
            </button>
         </div>
      </section>

      <section className="bg-white shadow-2xl rounded-3xl p-10 border-2 border-stone-200 max-w-lg mx-auto mb-20">
            <h3 className="font-serif text-3xl font-bold mb-4 text-slate-900 text-center">Booking Kavling Borneo</h3>
            <p className="text-slate-700 text-lg mb-8 font-medium text-center">Slot Promo 25 Juta Sangat Terbatas.</p>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block text-left font-bold text-slate-800 mb-2">Nama Lengkap</label>
                    <input type="text" placeholder="Masukkan nama Anda" className="w-full px-5 py-4 rounded-xl border-2 border-stone-300 bg-stone-50 text-xl" />
                </div>
                <div>
                    <label className="block text-left font-bold text-slate-800 mb-2">Nomor WhatsApp</label>
                    <input type="tel" placeholder="0812..." className="w-full px-5 py-4 rounded-xl border-2 border-stone-300 bg-stone-50 text-xl" />
                </div>
                <button className="w-full bg-borneo-orange hover:bg-orange-600 text-white font-bold py-5 rounded-xl shadow-lg transition-all text-xl border-b-4 border-orange-800 active:border-b-0 active:translate-y-1">
                    Ambil Promo Sekarang
                </button>
            </form>
      </section>

    </div>
  );
};

export default DeepDiveBorneo;
