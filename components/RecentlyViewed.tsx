
import React, { useState, useEffect } from 'react';

interface ProductSummary {
  id: number;
  name: string;
  price: string;
  image: string;
}

const RecentlyViewed: React.FC = () => {
  const [items, setItems] = useState<ProductSummary[]>([]);

  const loadHistory = () => {
    const saved = JSON.parse(localStorage.getItem('christmas-recently-viewed') || '[]');
    setItems(saved);
  };

  useEffect(() => {
    loadHistory();
    // Listen for custom event to update when a new item is viewed elsewhere
    window.addEventListener('history-updated', loadHistory);
    return () => window.removeEventListener('history-updated', loadHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('christmas-recently-viewed');
    setItems([]);
    window.dispatchEvent(new Event('history-updated'));
  };

  if (items.length === 0) return null;

  return (
    <section className="mt-20 mb-12 px-6 py-12 bg-white/50 border-y border-gray-100 animate-fadeIn relative">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-xl md:text-3xl font-serif font-bold italic text-gray-800 tracking-tight">Your Boutique History</h3>
          <p className="text-[9px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.25em] mt-1.5">Last items you explored</p>
        </div>
        <button 
          onClick={clearHistory}
          className="text-[9px] md:text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-red-600 transition-colors pb-1 border-b border-transparent hover:border-red-200"
        >
          Clear History
        </button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-50 mb-3 border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-500">
              <img 
                src={item.image} 
                alt={item.name} 
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
            <h4 className="text-[9px] md:text-[10px] font-bold text-gray-700 uppercase tracking-tight line-clamp-1">{item.name}</h4>
            <p className="text-[10px] md:text-xs font-black text-red-600 mt-0.5">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
