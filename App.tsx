import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import PortfolioSelector from './components/PortfolioSelector';
import DeepDiveJogja from './components/DeepDiveJogja';
import DeepDiveBogor from './components/DeepDiveBogor';
import DeepDiveBorneo from './components/DeepDiveBorneo';
import TrustSection from './components/TrustSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { MessageCircle } from 'lucide-react';

type Page = 'home' | 'jogja' | 'bogor' | 'borneo';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header is now Global and Visible on ALL pages */}
      <Header onNavigate={navigateTo} currentPage={currentPage} />
      
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={navigateTo} />
            <ProblemSolution />
            <PortfolioSelector onNavigate={navigateTo} />
            <TrustSection />
            <CTASection />
          </>
        )}

        {currentPage === 'jogja' && (
          <DeepDiveJogja onNavigate={navigateTo} />
        )}

        {currentPage === 'bogor' && (
          <DeepDiveBogor onNavigate={navigateTo} />
        )}

        {currentPage === 'borneo' && (
          <DeepDiveBorneo onNavigate={navigateTo} />
        )}
      </main>

      <Footer />

      {/* Persistent WA Button (Mobile/Desktop) */}
      <a 
        href="https://wa.me/"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center animate-bounce delay-1000"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle size={28} fill="white" />
      </a>
    </div>
  );
};

export default App;