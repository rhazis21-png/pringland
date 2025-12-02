import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'jogja' | 'bogor' | 'borneo' | 'siteplan') => void;
  currentPage: 'home' | 'jogja' | 'bogor' | 'borneo' | 'siteplan';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', page: 'home' as const },
    { name: 'Jogja', page: 'jogja' as const },
    { name: 'Bogor', page: 'bogor' as const },
    { name: 'Borneo', page: 'borneo' as const },
    { name: 'Master Siteplan', page: 'siteplan' as const },
  ];

  const handleNavClick = (page: 'home' | 'jogja' | 'bogor' | 'borneo' | 'siteplan') => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const headerBgClass = isScrolled 
    ? 'bg-white/95 backdrop-blur-sm shadow-md py-4' 
    : 'bg-transparent py-6';

  const textColorClass = isScrolled 
    ? 'text-emerald-900' 
    : 'text-white';

  const linkColorClass = (page: string) => {
    if (currentPage === page) return 'text-brand-primary font-extrabold underline decoration-2 underline-offset-4';
    return isScrolled ? 'text-slate-900 hover:text-brand-primary font-bold' : 'text-white hover:text-emerald-200 font-bold';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="flex flex-col">
              <span className={`font-serif text-2xl md:text-3xl font-bold tracking-tight ${textColorClass}`}>
                Pring Land
              </span>
              <span className={`text-xs font-semibold tracking-widest uppercase ${isScrolled ? 'text-emerald-700' : 'text-white/90'}`}>
                PT. Lumbung Pangan Mataram
              </span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.page)}
                className={`text-lg tracking-wide transition-colors ${linkColorClass(link.page)}`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                const cta = document.getElementById('cta-section');
                cta?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-brand-primary hover:bg-brand-dark text-white px-6 py-3 rounded-lg font-bold text-lg transition-transform hover:scale-105 shadow-lg border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1"
            >
              Hubungi Kami
            </button>
          </div>

          {/* Mobile Nav Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${isScrolled ? 'border-slate-300 bg-slate-100' : 'border-white/30 bg-black/20'} ${textColorClass}`}
            >
              <span className="text-sm font-bold uppercase tracking-wide">Menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-2xl py-6 px-6 flex flex-col space-y-4 border-t border-slate-200">
           {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.page)}
                className={`text-left text-xl font-bold py-3 border-b border-gray-100 block ${currentPage === link.page ? 'text-brand-primary' : 'text-slate-900'}`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => {
                 const cta = document.getElementById('cta-section');
                 cta?.scrollIntoView({ behavior: 'smooth' });
                 setIsMobileMenuOpen(false);
              }}
              className="bg-brand-primary text-white text-center py-4 rounded-xl font-bold text-xl shadow-md"
            >
              Hubungi Kami
            </button>
        </div>
      )}
    </nav>
  );
};

export default Header;