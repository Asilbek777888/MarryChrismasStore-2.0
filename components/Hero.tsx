
import React, { useState } from 'react';
import confetti from 'https://esm.sh/canvas-confetti';

const Hero: React.FC = () => {
  const [isShaking, setIsShaking] = useState(false);

  const shakeGlobe = () => {
    setIsShaking(true);
    
    // Trigger festive confetti burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#10b981', '#fbbf24', '#ffffff'],
    });

    setTimeout(() => setIsShaking(false), 800);
  };

  return (
    <section className="relative w-full overflow-hidden pt-12 pb-20 text-center">
      {/* Background Decorative Sparkles */}
      <div className="absolute top-10 left-1/4 text-teal-400 opacity-20 animate-pulse hidden md:block">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9H21.5L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2.5 9H9.5L12 2Z"/></svg>
      </div>
      <div className="absolute top-40 right-1/4 text-red-500 opacity-20 animate-pulse delay-500 hidden md:block">
         <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9H21.5L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2.5 9H9.5L12 2Z"/></svg>
      </div>

      <div className="px-6 relative z-10 flex flex-col items-center max-w-7xl mx-auto">
        {/* Interactive Snow Globe */}
        <div 
          onClick={shakeGlobe}
          className={`relative w-48 h-48 md:w-64 md:h-64 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/50 shadow-2xl mb-8 cursor-pointer group transition-transform duration-300 ${isShaking ? 'animate-[shake_0.5s_infinite]' : 'hover:scale-105 active:scale-95'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full"></div>
          {/* Internal Content of Globe */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <span className="text-4xl md:text-6xl mb-1 filter drop-shadow-lg group-hover:scale-110 transition-transform">🎄</span>
            <div className="text-[10px] md:text-xs font-black text-gray-800 uppercase tracking-widest mt-2 group-hover:text-red-600 transition-colors">Shake for</div>
            <div className="text-[10px] md:text-xs font-black text-gray-800 uppercase tracking-widest">A Surprise</div>
          </div>
          {/* Animated Snowflakes inside globe */}
          <div className="absolute inset-0 overflow-hidden rounded-full opacity-40">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className={`absolute w-1 h-1 bg-white rounded-full animate-snowFall`}
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: '-10%', 
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        <h3 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight mb-2 uppercase italic">
          Grand Winter
        </h3>
        <h2 className="text-[90px] md:text-[180px] leading-none font-black text-red-600 tracking-tighter mb-4 shadow-red-100">
          SALE
        </h2>
        
        <div className="space-y-2">
          <p className="text-2xl md:text-5xl font-bold text-gray-800">UPTO 30% OFF</p>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 tracking-[0.3em] uppercase">
            Promo Code: <span className="text-black font-extrabold bg-yellow-400 px-2 py-1 md:px-4 md:py-2 rounded">XMAS2024</span>
          </p>
        </div>

        <button 
          onClick={() => {
            const grid = document.querySelector('section.mt-20');
            grid?.scrollIntoView({ behavior: 'smooth' });
            shakeGlobe();
          }}
          className="mt-12 bg-black text-white px-12 py-4 md:px-20 md:py-6 rounded-full font-bold text-xs md:text-sm hover:bg-red-600 active:scale-95 transition-all uppercase tracking-[0.2em] shadow-xl border-2 border-white/10"
        >
          Explore Collection
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0% { transform: rotate(0deg) translate(0,0); }
          25% { transform: rotate(5deg) translate(2px, 2px); }
          50% { transform: rotate(0deg) translate(-2px, 2px); }
          75% { transform: rotate(-5deg) translate(2px, -2px); }
          100% { transform: rotate(0deg) translate(0,0); }
        }
        @keyframes snowFall {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(200px); opacity: 0; }
        }
        .animate-snowFall { animation: snowFall linear infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
