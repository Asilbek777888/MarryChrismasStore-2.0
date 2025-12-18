
import React, { useState, useEffect } from 'react';

const Navbar: React.FC<{ onCartOpen: () => void }> = ({ onCartOpen }) => {
  const [cartCount, setCartCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 21, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59, hours: prev.hours };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('christmas-cart') || '[]');
    const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    setCartCount(totalItems);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);
    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  const formatTime = (n: number) => n.toString().padStart(2, '0');

  return (
    <header className="w-full bg-white sticky top-0 z-[150] shadow-sm">
      <div className="w-full bg-red-600 text-white text-[10px] md:text-xs py-2 font-bold uppercase tracking-widest text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/snow.png')]"></div>
        Flash Sale Ends In: <span className="font-mono text-[11px] md:text-sm bg-black/20 px-1.5 py-0.5 rounded ml-1">
          {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col items-center pt-6 pb-4 relative">
        <div className="absolute top-8 right-6 group cursor-pointer" onClick={onCartOpen}>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 group-hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center animate-bounce shadow-md border border-white">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        <div className="mb-6 flex flex-col items-center group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="relative">
            <svg className="w-12 h-12 mb-2 transform group-hover:rotate-12 transition-transform duration-700" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L60 30L80 30L65 45L70 65L50 55L30 65L35 45L20 30L40 30L50 10Z" fill="#1f2937" />
              <circle cx="50" cy="40" r="3" fill="#D4AF37" className="animate-pulse" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold italic text-gray-800">Merry</h1>
          <h2 className="font-serif text-xl md:text-2xl tracking-[0.2em] uppercase text-gray-800 mt-[-5px]">Christmas</h2>
        </div>

        <nav className="w-full border-y border-gray-100 py-3">
          <ul className="flex justify-center md:gap-16 gap-8 items-center text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-700">
            {['Gift Guide', 'New In', 'Best Sellers'].map((item) => (
              <li key={item} className="cursor-pointer hover:text-red-600 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
            <li className="cursor-pointer text-red-600 font-extrabold flex items-center gap-1 group">
              Sale
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
