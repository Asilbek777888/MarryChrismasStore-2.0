
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import PromoSection from './components/PromoSection';
import Footer from './components/Footer';
import Snowfall from './components/Snowfall';
import SantaConsultant from './components/SantaConsultant';
import CartDrawer from './components/CartDrawer';

const App: React.FC = () => {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const shown = sessionStorage.getItem('newsletter-shown');
      if (!shown) {
        setShowNewsletter(true);
        sessionStorage.setItem('newsletter-shown', 'true');
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full bg-noise relative overflow-x-hidden">
      <Snowfall />
      
      {/* Navbar with Cart trigger */}
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      
      <main className="w-full flex-1">
        <div className="w-full">
          <Hero />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16 px-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gray-200"></div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 mb-4 px-4 leading-tight italic">
              "The magic is in the details"
            </h2>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-400 font-bold mb-6">Holiday Collection 2024</p>
            <div className="w-12 h-[2px] bg-red-600 mx-auto"></div>
          </div>

          <ProductGrid />
          
          <PromoSection />
        </div>
      </main>
      
      <Footer />

      {/* Floating Interactive Elements */}
      <SantaConsultant />
      
      {/* Side Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating Gift Button */}
      <button 
        onClick={() => setShowGiftModal(true)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-emerald-600 rounded-full shadow-2xl flex items-center justify-center z-[100] animate-bounce hover:scale-110 transition-transform active:scale-95 border-2 border-white group"
      >
        <div className="relative">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">SURPRISE!</span>
        </div>
      </button>

      {/* Modals */}
      {showNewsletter && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[400] flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white rounded-lg p-0 max-w-[340px] w-full text-center relative overflow-hidden shadow-2xl border-t-8 border-red-600">
            <button onClick={() => setShowNewsletter(false)} className="absolute top-3 right-3 text-gray-400 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all">✕</button>
            <div className="p-8">
              <div className="text-4xl mb-4">💌</div>
              <h3 className="font-serif text-3xl font-bold italic mb-4">Exclusive Magic</h3>
              <p className="text-gray-600 text-sm mb-6">Join our elite circle of holiday lovers and get <span className="text-red-600 font-bold">15% OFF</span> your next purchase.</p>
              <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm mb-4 outline-none focus:ring-1 focus:ring-red-500 transition-all" />
              <button onClick={() => setShowNewsletter(false)} className="w-full bg-black text-white py-3 rounded font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg">Claim 15% Off</button>
            </div>
          </div>
        </div>
      )}

      {showGiftModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[400] flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white rounded-lg p-8 max-w-[320px] w-full text-center relative overflow-hidden border-4 border-emerald-600">
            <button onClick={() => setShowGiftModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-black">✕</button>
            <div className="text-5xl mb-4">🎁</div>
            <h3 className="font-serif text-2xl font-bold mb-2">Secret Code Unlocked!</h3>
            <p className="text-sm text-gray-600 mb-6">Santa's elves left this for you. Valid for 24 hours!</p>
            <div className="bg-gray-100 p-4 border-2 border-dashed border-red-300 rounded-md mb-6 relative group">
              <span className="text-2xl font-black text-red-600 tracking-widest">MAGIC30</span>
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => { navigator.clipboard.writeText('MAGIC30'); alert('Copied!'); }}>
                <span className="text-[10px] font-bold text-black uppercase">Click to copy</span>
              </div>
            </div>
            <button onClick={() => setShowGiftModal(false)} className="w-full bg-black text-white py-3 rounded font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-colors">Amazing!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
