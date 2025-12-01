import React from 'react';
import { CORPORATE_ADDRESSES } from '../constants';
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
           
           {/* Brand Info */}
           <div className="col-span-1 md:col-span-2">
              <h3 className="text-white font-serif text-3xl font-bold mb-4">Pring Land</h3>
              <p className="text-sm uppercase tracking-widest text-emerald-500 font-bold mb-6">by PT. Lumbung Pangan Mataram</p>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                 Mitra strategis masyarakat dan pemerintah dalam mewujudkan kemandirian pangan yang berkelanjutan melalui integrasi properti produktif.
              </p>
           </div>

           {/* Offices */}
           <div>
              <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                 <MapPin size={18} className="text-brand-primary" /> Kantor Pusat
              </h4>
              <p className="text-sm leading-relaxed mb-6">{CORPORATE_ADDRESSES.hq}</p>
              
              <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                 <MapPin size={18} className="text-borneo-orange" /> Kantor Cabang
              </h4>
              <p className="text-sm leading-relaxed">{CORPORATE_ADDRESSES.branch}</p>
           </div>

           {/* Contact */}
           <div>
              <h4 className="text-white font-bold mb-6">Hubungi Kami</h4>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Phone size={18} /> <span>+62 812-xxxx-xxxx</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Mail size={18} /> <span>info@pringland.com</span>
                 </div>
                 <div className="flex gap-4 mt-6">
                    <a href="#" className="hover:text-white transition-colors"><Instagram /></a>
                    <a href="#" className="hover:text-white transition-colors"><Facebook /></a>
                    <a href="#" className="hover:text-white transition-colors"><Youtube /></a>
                 </div>
              </div>
           </div>

        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
            <p>&copy; {new Date().getFullYear()} PT. Lumbung Pangan Mataram. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <a href="#" className="hover:text-slate-400">Privacy Policy</a>
               <a href="#" className="hover:text-slate-400">Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;