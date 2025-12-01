import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'jogja' | 'bogor' | 'borneo') => void;
  currentPage: 'home' | 'jogja' | 'bogor' | 'borneo';
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
    { name: 'Corporate Home', page: 'home' as const },
    { name: 'Jogja Region', page: 'jogja' as const },
    { name: 'Bogor Farm', page: 'bogor' as const },
    { name: 'Borneo Estate', page: 'borneo' as const },
  ];

  const handleNavClick = (page: 'home' | 'jogja' | 'bogor' | 'borneo') => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  // Logic: Always transparent at top (because all pages have dark hero), white when scrolled.
  const headerBgClass = isScrolled 
    ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' 
    : 'bg-transparent py-5';

  const textColorClass = isScrolled 
    ? 'text-emerald-800' 
    : 'text-white';

  const linkColorClass = (page: string) => {
    if (currentPage === page) return 'text-brand-primary font-bold';
    return isScrolled ? 'text-slate-600 hover:text-brand-primary' : 'text-white/90 hover:text-white';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="flex flex-col">
              <span className={`font-serif text-2xl font-bold tracking-tight ${textColorClass}`}>
                Pring Land
              </span>
              <span className={`text-[10px] tracking-widest uppercase ${isScrolled ? 'text-emerald-600' : 'text-white/80'}`}>
                by PT. Lumbung Pangan Mataram
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.page)}
                className={`text-sm font-medium transition-colors ${linkColorClass(link.page)}`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                const cta = document.getElementById('cta-section');
                if (cta) {
                  cta.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // Fallback if generic CTA not present on page, maybe scroll to bottom footer
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }
                setIsMobileMenuOpen(false);
              }}
              className="bg-brand-primary hover:bg-brand-dark text-white px-5 py-2 rounded-full font-medium text-sm transition-transform hover:scale-105 shadow-lg"
            >
              Hubungi Kami
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`${textColorClass}`}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg py-4 px-4 flex flex-col space-y-4">
           {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.page)}
                className={`text-left font-medium py-2 border-b border-gray-100 block ${currentPage === link.page ? 'text-brand-primary' : 'text-slate-700'}`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => {
                 window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                 setIsMobileMenuOpen(false);
              }}
              className="bg-brand-primary text-white text-center py-3 rounded-lg font-bold"
            >
              Hubungi Kami
            </button>
        </div>
      )}
    </nav>
  );
};

export default Header;