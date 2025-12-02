import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, Map } from 'lucide-react';

const SitePlanPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jogja' | 'bogor' | 'borneo'>('jogja');
  const [jogjaLoc, setJogjaLoc] = useState<'turi' | 'patuk'>('turi');

  return (
    <div className="bg-stone-50 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Master Siteplan & Ketersediaan Unit
          </h1>
          <p className="text-xl md:text-2xl text-slate-800 font-medium max-w-3xl mx-auto leading-relaxed">
            Update Real-time ketersediaan kavling di seluruh proyek Pring Land. 
            Unit yang berwarna <span className="text-red-600 font-bold">MERAH</span> sudah terjual.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
           <button 
              onClick={() => setActiveTab('jogja')}
              className={`px-8 py-4 rounded-xl font-bold text-xl transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
                 activeTab === 'jogja' 
                 ? 'bg-jogja-gold text-white border-yellow-800 shadow-xl' 
                 : 'bg-white text-slate-700 border-stone-300 hover:bg-stone-100'
              }`}
           >
              Regional Jogja
           </button>
           <button 
              onClick={() => setActiveTab('bogor')}
              className={`px-8 py-4 rounded-xl font-bold text-xl transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
                 activeTab === 'bogor' 
                 ? 'bg-bogor-teal text-white border-cyan-900 shadow-xl' 
                 : 'bg-white text-slate-700 border-stone-300 hover:bg-stone-100'
              }`}
           >
              Regional Bogor
           </button>
           <button 
              onClick={() => setActiveTab('borneo')}
              className={`px-8 py-4 rounded-xl font-bold text-xl transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
                 activeTab === 'borneo' 
                 ? 'bg-borneo-orange text-white border-orange-800 shadow-xl' 
                 : 'bg-white text-slate-700 border-stone-300 hover:bg-stone-100'
              }`}
           >
              Regional Borneo
           </button>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-2xl border-2 border-stone-200">
           
           {/* JOGJA CONTENT */}
           {activeTab === 'jogja' && (
              <div>
                 <div className="flex justify-center gap-6 mb-10 border-b border-stone-200 pb-6">
                    <button onClick={() => setJogjaLoc('turi')} className={`text-xl font-bold pb-2 ${jogjaLoc === 'turi' ? 'text-jogja-gold border-b-4 border-jogja-gold' : 'text-slate-500 hover:text-jogja-gold'}`}>
                       Farm I & II (Turi)
                    </button>
                    <button onClick={() => setJogjaLoc('patuk')} className={`text-xl font-bold pb-2 ${jogjaLoc === 'patuk' ? 'text-jogja-gold border-b-4 border-jogja-gold' : 'text-slate-500 hover:text-jogja-gold'}`}>
                       Farm III (Patuk)
                    </button>
                 </div>

                 {jogjaLoc === 'turi' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                       <div>
                          <h3 className="font-serif text-3xl font-bold text-slate-900 mb-4">Siteplan Turi (Sleman)</h3>
                          <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-stone-200 overflow-hidden relative mb-6 group">
                             <img src="https://picsum.photos/id/128/800/800" alt="Siteplan Turi" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="bg-black/70 text-white px-6 py-3 rounded-xl font-bold text-xl backdrop-blur-sm">Farm I & II Area</span>
                             </div>
                          </div>
                          <div className="flex gap-6 justify-center">
                             <div className="flex items-center gap-2"><div className="w-6 h-6 bg-red-500 rounded border border-red-700"></div> <span className="font-bold text-slate-700">Terjual</span></div>
                             <div className="flex items-center gap-2"><div className="w-6 h-6 bg-green-500 rounded border border-green-700"></div> <span className="font-bold text-slate-700">Tersedia</span></div>
                          </div>
                       </div>
                       <div className="space-y-8">
                          <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
                             <h4 className="font-bold text-2xl text-slate-900 mb-6 border-b border-stone-300 pb-4">Status Ketersediaan (Farm I & II)</h4>
                             
                             {/* Farm I - Ayam */}
                             <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                   <span className="text-lg font-bold text-slate-800 flex items-center gap-2">🐔 Farm I: Ayam Petelur</span>
                                   <span className="bg-red-100 text-red-800 px-3 py-1 rounded font-bold text-sm">Sisa 5 Unit</span>
                                </div>
                                <div className="w-full bg-stone-300 rounded-full h-5">
                                   <div className="bg-red-500 h-5 rounded-full shadow-inner" style={{width: '90%'}}></div>
                                </div>
                                <p className="text-right text-xs font-bold mt-1 text-slate-500 uppercase tracking-wide">Total 51 Unit</p>
                             </div>

                             {/* Farm I - Bebek */}
                             <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                   <span className="text-lg font-bold text-slate-800 flex items-center gap-2">🦆 Farm I: Bebek Petelur</span>
                                   <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-bold text-sm">Sisa 12 Unit</span>
                                </div>
                                <div className="w-full bg-stone-300 rounded-full h-5">
                                   <div className="bg-green-500 h-5 rounded-full shadow-inner" style={{width: '66%'}}></div>
                                </div>
                                <p className="text-right text-xs font-bold mt-1 text-slate-500 uppercase tracking-wide">Total 36 Unit</p>
                             </div>

                             {/* Farm II - Broiler */}
                             <div>
                                <div className="flex justify-between items-center mb-2">
                                   <span className="text-lg font-bold text-slate-800 flex items-center gap-2">🍖 Farm II: Ayam Broiler</span>
                                   <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded font-bold text-sm">Open Booking</span>
                                </div>
                                <div className="w-full bg-stone-300 rounded-full h-5">
                                   <div className="bg-orange-500 h-5 rounded-full shadow-inner" style={{width: '40%'}}></div>
                                </div>
                                <p className="text-right text-xs font-bold mt-1 text-slate-500 uppercase tracking-wide">Total 97 Unit (Hot Item)</p>
                             </div>
                          </div>
                          
                          <button className="w-full bg-jogja-gold text-white font-bold py-5 rounded-xl text-xl shadow-lg border-b-4 border-yellow-800 active:border-b-0 active:translate-y-1 hover:bg-yellow-600">
                             Booking Unit Turi Sekarang
                          </button>
                       </div>
                    </div>
                 ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                       <div>
                          <h3 className="font-serif text-3xl font-bold text-slate-900 mb-4">Siteplan Patuk (Gunungkidul)</h3>
                          <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-stone-200 overflow-hidden relative mb-6 group">
                             <img src="https://picsum.photos/id/1018/800/800" alt="Siteplan Patuk" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="bg-black/70 text-white px-6 py-3 rounded-xl font-bold text-xl backdrop-blur-sm">Farm III Area</span>
                             </div>
                          </div>
                          <div className="flex gap-6 justify-center">
                             <div className="flex items-center gap-2"><div className="w-6 h-6 bg-red-500 rounded border border-red-700"></div> <span className="font-bold text-slate-700">Terjual</span></div>
                             <div className="flex items-center gap-2"><div className="w-6 h-6 bg-green-500 rounded border border-green-700"></div> <span className="font-bold text-slate-700">Tersedia</span></div>
                          </div>
                       </div>
                       <div className="space-y-8">
                          <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
                             <h4 className="font-bold text-2xl text-slate-900 mb-6 border-b border-stone-300 pb-4">Status Ketersediaan (Farm III)</h4>
                             
                             {/* Farm III - Ayam */}
                             <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                   <span className="text-lg font-bold text-slate-800 flex items-center gap-2">🐔 Blok A (Ayam Petelur)</span>
                                   <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-bold text-sm">Tersedia</span>
                                </div>
                                <div className="w-full bg-stone-300 rounded-full h-5">
                                   <div className="bg-green-500 h-5 rounded-full shadow-inner" style={{width: '30%'}}></div>
                                </div>
                                <p className="text-right text-xs font-bold mt-1 text-slate-500 uppercase tracking-wide">Total 85 Unit</p>
                             </div>

                             {/* Farm III - Bebek */}
                             <div>
                                <div className="flex justify-between items-center mb-2">
                                   <span className="text-lg font-bold text-slate-800 flex items-center gap-2">🦆 Blok B (Bebek Petelur)</span>
                                   <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-bold text-sm">Tersedia</span>
                                </div>
                                <div className="w-full bg-stone-300 rounded-full h-5">
                                   <div className="bg-green-500 h-5 rounded-full shadow-inner" style={{width: '25%'}}></div>
                                </div>
                                <p className="text-right text-xs font-bold mt-1 text-slate-500 uppercase tracking-wide">Total 77 Unit</p>
                             </div>
                          </div>
                          
                          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 flex items-start gap-4">
                             <Map className="text-blue-700 w-8 h-8 shrink-0" />
                             <p className="text-blue-900 font-medium text-lg">
                                Lokasi Farm III tepat di jalur wisata HeHa Sky View. Sangat strategis untuk kenaikan harga tanah (Capital Gain).
                             </p>
                          </div>

                          <button className="w-full bg-jogja-gold text-white font-bold py-5 rounded-xl text-xl shadow-lg border-b-4 border-yellow-800 active:border-b-0 active:translate-y-1 hover:bg-yellow-600">
                             Booking Unit Patuk Sekarang
                          </button>
                       </div>
                    </div>
                 )}
              </div>
           )}

           {/* BOGOR CONTENT */}
           {activeTab === 'bogor' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <div>
                    <h3 className="font-serif text-3xl font-bold text-slate-900 mb-4">Masterplan Pring Land Bogor</h3>
                    <div className="aspect-video bg-slate-100 rounded-2xl border-2 border-stone-200 overflow-hidden relative mb-6 group">
                       <img src="https://picsum.photos/id/142/1200/800" alt="Siteplan Bogor" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="bg-black/70 text-white px-6 py-3 rounded-xl font-bold text-xl backdrop-blur-sm">Denah Kawasan Leuwiliang</span>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
                       <h4 className="font-bold text-2xl text-slate-900 mb-6 border-b border-stone-300 pb-4">Update Blok Bogor</h4>
                       
                       <div className="space-y-6">
                          {/* Blok A */}
                          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm">
                             <div className="flex justify-between mb-2">
                                <span className="font-bold text-lg text-slate-800">🟦 Blok A (Ayam Petelur)</span>
                                <span className="text-slate-600 font-bold">Total 296 Unit</span>
                             </div>
                             <div className="w-full bg-stone-200 h-4 rounded-full"><div className="bg-blue-500 h-4 rounded-full" style={{width: '60%'}}></div></div>
                             <p className="text-sm text-slate-500 mt-2">Luas Lahan: 33 m² | Luas Unit: 24 m²</p>
                          </div>
                          
                          {/* Blok B */}
                          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm">
                             <div className="flex justify-between mb-2">
                                <span className="font-bold text-lg text-slate-800">🟪 Blok B (Bebek Petelur)</span>
                                <span className="text-slate-600 font-bold">Total 136 Unit</span>
                             </div>
                             <div className="w-full bg-stone-200 h-4 rounded-full"><div className="bg-purple-500 h-4 rounded-full" style={{width: '45%'}}></div></div>
                             <p className="text-sm text-slate-500 mt-2">Luas Lahan: 33 m² | Luas Unit: 24 m²</p>
                          </div>

                          {/* Blok C */}
                          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm ring-2 ring-red-100">
                             <div className="flex justify-between mb-2">
                                <span className="font-bold text-lg text-slate-800">🟧 Blok C (Ayam Pedaging)</span>
                                <span className="text-red-600 font-bold animate-pulse">Sisa Sedikit!</span>
                             </div>
                             <div className="w-full bg-stone-200 h-4 rounded-full"><div className="bg-red-500 h-4 rounded-full" style={{width: '90%'}}></div></div>
                             <p className="text-sm text-slate-500 mt-2">Total 119 Unit (Luas Lahan 20 m²)</p>
                          </div>
                       </div>
                    </div>

                    <button className="w-full bg-bogor-teal text-white font-bold py-5 rounded-xl text-xl shadow-lg border-b-4 border-cyan-800 active:border-b-0 active:translate-y-1 hover:bg-cyan-700">
                       Amankan Unit Bogor
                    </button>
                 </div>
              </div>
           )}

           {/* BORNEO CONTENT */}
           {activeTab === 'borneo' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <div>
                    <h3 className="font-serif text-3xl font-bold text-slate-900 mb-4">Mega Siteplan Borneo (11 Hektar)</h3>
                    <div className="aspect-video bg-slate-100 rounded-2xl border-2 border-stone-200 overflow-hidden relative mb-6 group">
                       <img src="https://picsum.photos/id/292/1200/800" alt="Siteplan Borneo" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="bg-black/70 text-white px-6 py-3 rounded-xl font-bold text-xl backdrop-blur-sm">Denah Food Estate 11 Ha</span>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
                       <h4 className="font-bold text-2xl text-slate-900 mb-6 border-b border-stone-300 pb-4">Ketersediaan Food Estate</h4>
                       <p className="text-xl text-slate-800 mb-6 font-medium">Total 653 Unit Kavling Pangan.</p>
                       
                       <div className="space-y-4">
                          <div className="flex items-center gap-4">
                             <div className="w-32 font-bold text-slate-700">Zona 1</div>
                             <div className="flex-1 bg-stone-300 h-8 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-red-500 flex items-center justify-center text-white font-bold text-sm tracking-widest w-full">SOLD OUT</div>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="w-32 font-bold text-slate-700">Zona 2</div>
                             <div className="flex-1 bg-stone-300 h-8 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-red-500 flex items-center justify-center text-white font-bold text-sm tracking-widest w-full">SOLD OUT</div>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="w-32 font-bold text-slate-700">Zona 3 (Promo)</div>
                             <div className="flex-1 bg-stone-300 h-8 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-green-500 w-[40%]"></div>
                                <span className="absolute inset-0 flex items-center justify-center text-slate-800 font-bold text-sm">Tersedia (Promo 25 Jt)</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200 text-orange-900 font-medium text-lg flex gap-3 items-start">
                       <AlertCircle className="w-6 h-6 shrink-0 mt-1"/>
                       <p>Harga Promo <strong>Rp 25 Juta</strong> hanya berlaku untuk Zona 3. Setelah penuh, harga akan naik normal.</p>
                    </div>

                    <button className="w-full bg-borneo-orange text-white font-bold py-5 rounded-xl text-xl shadow-lg border-b-4 border-orange-800 active:border-b-0 active:translate-y-1 hover:bg-orange-600">
                       Booking Zona Promo Borneo
                    </button>
                 </div>
              </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default SitePlanPage;