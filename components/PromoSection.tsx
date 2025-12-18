import React from 'react';

const PromoSection: React.FC = () => {
  return (
    <section className="w-full py-24 px-8 text-center relative overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-100 via-white to-white border-t border-gray-100">
      
      {/* --- Decorative Background Illustrations --- */}
      
      {/* Top Background: Santa's Sleigh Silhouette */}
      <div className="absolute top-12 left-0 w-full opacity-[0.03] pointer-events-none transform -rotate-3 select-none">
        <svg viewBox="0 0 1000 100" className="w-full h-auto">
          <text x="10%" y="80" className="text-[60px] font-black italic">
            ❅ ❄ ❆ ❄ ❆ ❅
          </text>
          <path 
            d="M800,50 L820,45 M840,50 L860,45 M880,50 L900,45 M940,40 Q960,30 980,50" 
            stroke="black" 
            strokeWidth="2" 
            fill="none" 
          />
        </svg>
      </div>

      {/* Internal Mini Lights String */}
      <div className="absolute top-0 left-0 w-full overflow-visible h-8 opacity-40">
        <svg width="100%" height="20" className="overflow-visible">
          <path d="M0,5 Q50,15 100,5 T200,5 T300,5 T400,5 T500,5" stroke="#1f2937" fill="none" strokeWidth="0.5" strokeDasharray="2,2" />
          {[20, 80, 140, 200, 260, 320, 380, 440].map((cx, i) => (
            <circle 
              key={i} 
              cx={cx} 
              cy={8} 
              r="2" 
              fill={i % 2 === 0 ? "#ef4444" : "#fbbf24"} 
              className="animate-pulse" 
              style={{ animationDelay: `${i * 0.3}s` }} 
            />
          ))}
        </svg>
      </div>
      
      {/* Top Right: Large Detailed Snowflake */}
      <div className="absolute -top-10 -right-10 text-red-200 opacity-30 animate-[spin_20s_linear_infinite] pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.3">
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19M12 7l2 2m-4-2l-2 2m10 3l-2 2m0-4l2 2M12 17l-2-2m4 2l2-2M7 12l-2-2m0 4l2-2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>

      {/* Bottom Left: Detailed Holly Branch */}
      <div className="absolute -bottom-6 -left-6 pointer-events-none transform -rotate-12 z-20">
        <svg width="140" height="140" viewBox="0 0 100 100" fill="none">
          <path d="M10 80C30 80 40 60 40 40C40 20 20 10 10 10" stroke="#064e3b" strokeWidth="5" strokeLinecap="round" />
          <path d="M10 80C10 60 30 40 50 40C70 40 80 20 80 10" stroke="#065f46" strokeWidth="5" strokeLinecap="round" />
          <path d="M40 90C60 90 70 70 70 50C70 30 50 20 40 20" stroke="#064e3b" strokeWidth="5" strokeLinecap="round" />
          <circle cx="25" cy="65" r="7" fill="#ef4444" />
          <circle cx="40" cy="74" r="6" fill="#dc2626" />
          <circle cx="28" cy="80" r="6" fill="#b91c1c" />
        </svg>
      </div>

      {/* Right Side: Hanging Ornaments with Strings */}
      <div className="absolute top-0 right-16 flex space-x-6 pointer-events-none">
        <div className="animate-[bounce_4s_ease-in-out_infinite]">
          <div className="w-[0.5px] h-16 bg-gray-400 mx-auto"></div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-inner border border-red-700 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/20 rounded-full blur-[1px]"></div>
          </div>
        </div>
        <div className="animate-[bounce_5s_ease-in-out_infinite] pt-8">
          <div className="w-[0.5px] h-20 bg-gray-400 mx-auto"></div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-inner border border-emerald-700"></div>
        </div>
      </div>

      {/* Bottom Right: Stack of Gifts */}
      <div className="absolute bottom-4 right-4 flex items-end pointer-events-none space-x-[-15px]">
        {/* Red Gift */}
        <div className="w-12 h-10 bg-red-600 rounded-sm relative shadow-lg transform rotate-3">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-red-700 opacity-50"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-2 bg-red-700 opacity-50"></div>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-red-500 rounded-full border border-red-800"></div>
        </div>
        {/* Gold Gift */}
        <div className="w-10 h-8 bg-yellow-400 rounded-sm relative shadow-md z-10 transform -rotate-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-full bg-yellow-600 opacity-30"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1.5 bg-yellow-600 opacity-30"></div>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-yellow-300 rounded-full border border-yellow-600"></div>
        </div>
      </div>

      {/* Scattered Golden Sparkles */}
      <div className="absolute top-1/4 left-10 text-yellow-500 animate-pulse">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"/></svg>
      </div>
      <div className="absolute bottom-1/3 right-24 text-red-400 animate-pulse delay-700">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"/></svg>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 py-4">
        <div className="inline-block bg-red-600 text-white text-[9px] font-black px-4 py-1 rounded-full mb-6 tracking-[0.2em] shadow-lg animate-bounce">
          LIMITED TIME OFFER
        </div>
        <h2 className="text-5xl font-black text-gray-900 mb-2 tracking-tighter uppercase">
          Exclusive <span className="text-red-600">Gift</span>
        </h2>
        <h3 className="text-2xl font-serif italic text-gray-700 mb-6">Enjoy 40% Off Storewide</h3>
        
        <p className="text-[12px] text-gray-500 max-w-[340px] mx-auto mb-10 leading-relaxed font-medium">
          Make this season brighter with our handcrafted festive collection. From cozy winter wear to elegant holiday jewelry, find the perfect gift for your loved ones.
        </p>
        
        <div className="flex items-center justify-center space-x-4 mb-10">
          <div className="w-12 h-[1px] bg-gray-200"></div>
          <div className="text-red-500">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9H21.5L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2.5 9H9.5L12 2Z"/></svg>
          </div>
          <div className="w-12 h-[1px] bg-gray-200"></div>
        </div>

        {/* --- CTA Specific Illustrations --- */}
        <div className="relative inline-block mt-4 mb-12">
          {/* Decorative Pine Tree (Left) */}
          <div className="absolute -left-16 bottom-0 transform scale-75 opacity-80 pointer-events-none hidden sm:block">
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
              <path d="M30 0 L60 40 L45 40 L55 70 L5 70 L15 40 L0 40 Z" fill="#065f46" />
              <rect x="25" y="70" width="10" height="10" fill="#451a03" />
              <circle cx="30" cy="20" r="2" fill="#ef4444" className="animate-pulse" />
              <circle cx="20" cy="50" r="2" fill="#fbbf24" className="animate-pulse delay-75" />
            </svg>
          </div>

          {/* Decorative Pine Tree (Right) */}
          <div className="absolute -right-16 bottom-0 transform scale-75 opacity-80 pointer-events-none hidden sm:block">
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
              <path d="M30 0 L60 40 L45 40 L55 70 L5 70 L15 40 L0 40 Z" fill="#064e3b" />
              <rect x="25" y="70" width="10" height="10" fill="#451a03" />
              <circle cx="30" cy="30" r="2" fill="#fbbf24" className="animate-pulse" />
              <circle cx="40" cy="55" r="2" fill="#ef4444" className="animate-pulse delay-150" />
            </svg>
          </div>

          {/* Main CTA Button: Shop the Sale */}
          <button className="bg-red-600 text-white px-16 py-6 rounded-sm font-bold text-[14px] hover:bg-black hover:scale-105 transition-all uppercase tracking-[0.25em] shadow-[0_20px_50px_rgba(239,68,68,0.3)] group relative overflow-hidden active:scale-95">
            <span className="relative z-10 flex items-center justify-center">
              Shop the Sale
              <span className="inline-block ml-3 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
            {/* Glossy Reflection Effect */}
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
            {/* Glow animation */}
            <div className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-10 animate-pulse"></div>
          </button>
        </div>
        
        <p className="mt-6 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
          * Valid until December 25th
        </p>
      </div>

    </section>
  );
};

export default PromoSection;