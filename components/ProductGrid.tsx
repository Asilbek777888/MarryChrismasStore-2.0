
import React, { useState, useEffect, useRef } from 'react';
import VideoPromoGenerator from './VideoPromoGenerator';
import RecentlyViewed from './RecentlyViewed';

type Category = 'Men' | 'Women' | 'Accessories' | 'All';

interface Product {
  id: number;
  name: string;
  price: string;
  images: string[];
  discount?: string;
  isNew?: boolean;
  category: Category;
  rating: number;
  reviewCount: number;
  shortReview: string;
}

const products: Product[] = [
  { 
    id: 1, 
    name: "Velvet Evening Top", 
    price: "$39.50", 
    category: 'Women',
    images: [
      "https://picsum.photos/seed/xmas1/400/500",
      "https://picsum.photos/seed/xmas1alt/400/500",
      "https://picsum.photos/seed/xmas1det/400/500"
    ], 
    discount: "15% OFF", 
    isNew: true,
    rating: 5,
    reviewCount: 12,
    shortReview: "Absolutely stunning for holiday parties! The velvet is incredibly soft and has a rich sheen."
  },
  { 
    id: 2, 
    name: "Silk Holiday Scarf", 
    price: "$49.50", 
    category: 'Accessories',
    images: [
      "https://picsum.photos/seed/xmas2/400/500",
      "https://picsum.photos/seed/xmas2alt/400/500"
    ], 
    discount: "20% OFF",
    rating: 4,
    reviewCount: 8,
    shortReview: "So soft and the colors are vibrant. It drapes beautifully and adds a festive touch to any outfit."
  },
  { 
    id: 3, 
    name: "Gold Glitter Clutch", 
    price: "$89.00", 
    category: 'Accessories',
    images: [
      "https://picsum.photos/seed/xmas3/400/500",
      "https://picsum.photos/seed/xmas3alt/400/500",
      "https://picsum.photos/seed/xmas3det/400/500"
    ], 
    discount: "10% OFF",
    rating: 5,
    reviewCount: 24,
    shortReview: "The perfect accessory for NYE! It fits my phone and essentials perfectly without being bulky."
  },
  { 
    id: 4, 
    name: "Cashmere Sweater", 
    price: "$120.00", 
    category: 'Men',
    images: [
      "https://picsum.photos/seed/xmas4/400/500",
      "https://picsum.photos/seed/xmas4alt/400/500"
    ], 
    discount: "25% OFF",
    rating: 5,
    reviewCount: 15,
    shortReview: "Incredibly warm and high quality. The stitching is impeccable and it feels like a warm hug."
  },
  { 
    id: 5, 
    name: "Star Stud Earrings", 
    price: "$25.50", 
    category: 'Accessories',
    images: [
      "https://picsum.photos/seed/xmas5/400/500",
      "https://picsum.photos/seed/xmas5alt/400/500",
      "https://picsum.photos/seed/xmas5det/400/500"
    ], 
    discount: "30% OFF", 
    isNew: true,
    rating: 4,
    reviewCount: 31,
    shortReview: "Cute but smaller than expected. They sparkle brilliantly under the holiday lights."
  },
  { 
    id: 6, 
    name: "Red Festive Heels", 
    price: "$150.00", 
    category: 'Women',
    images: [
      "https://picsum.photos/seed/xmas6/400/500",
      "https://picsum.photos/seed/xmas6alt/400/500"
    ], 
    discount: "5% OFF",
    rating: 5,
    reviewCount: 6,
    shortReview: "Stunning red shade, very festive! Surprisingly comfortable for a whole night of dancing."
  },
];

const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const Toast: React.FC<{ message: string; visible: boolean }> = ({ message, visible }) => (
  <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[600] px-6 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-2xl transition-all duration-500 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
    <div className="flex items-center gap-3"><span className="text-emerald-400 font-bold">✓</span>{message}</div>
  </div>
);

/** Interactive 360° Studio Modal */
const ThreeSixtyModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastX = useRef(0);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    lastX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - lastX.current;
    setRotation(prev => prev + deltaX * 1.5);
    lastX.current = currentX;
  };

  const handleEnd = () => setIsDragging(false);

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose}></div>
      <div 
        className="relative w-full max-w-lg h-[80vh] flex flex-col items-center justify-center select-none cursor-grab active:cursor-grabbing group"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-[610] w-12 h-12 flex items-center justify-center bg-white/5 rounded-full border border-white/10">
          ✕
        </button>
        <div className="absolute top-12 text-center">
          <h2 className="text-white font-serif text-3xl font-bold italic mb-3">{product.name}</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-red-600"></span>
            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">360° Product Studio</span>
            <span className="h-px w-6 bg-red-600"></span>
          </div>
        </div>
        <div className="relative w-72 h-96 perspective-[2000px]">
          <div 
            className="w-full h-full relative transition-transform duration-75 ease-out"
            style={{ transformStyle: 'preserve-3d', transform: `rotateY(${rotation}deg)` }}
          >
            <div className="absolute inset-0 w-full h-full bg-white shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden backface-hidden border border-white/20">
              <img src={product.images[0]} className="w-full h-full object-cover" alt="front" loading="lazy" />
            </div>
            <div 
              className="absolute inset-0 w-full h-full bg-white shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden border border-white/20"
              style={{ transform: 'rotateY(180deg) translateZ(2px)' }}
            >
              <img src={product.images[1] || product.images[0]} className="w-full h-full object-cover grayscale-[0.2]" alt="back" loading="lazy" />
            </div>
            <div className="absolute top-0 left-[-4px] w-[8px] h-full bg-gray-200" style={{ transform: 'rotateY(-90deg) translateZ(4px)' }}></div>
            <div className="absolute top-0 right-[-4px] w-[8px] h-full bg-gray-300" style={{ transform: 'rotateY(90deg) translateZ(4px)' }}></div>
          </div>
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[140%] h-32 pointer-events-none opacity-40">
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] rounded-full transform rotate-X-80"></div>
          </div>
        </div>
        <div className="absolute bottom-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
            <span>Drag to Rotate</span>
            <div className="w-12 h-px bg-white/10"></div>
            <span>{Math.round(Math.abs(rotation % 360))}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Side-by-Side Comparison Modal */
const ComparisonModal: React.FC<{ products: Product[]; onClose: () => void; onAddToCart: (p: Product) => void }> = ({ products, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
      <div className="bg-white w-full max-w-[500px] h-[90vh] rounded-3xl overflow-hidden relative shadow-2xl flex flex-col border border-white/20">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50 sticky top-0 z-10">
          <div>
            <h2 className="font-serif text-2xl font-bold italic">Boutique Comparison</h2>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Comparing {products.length} Masterpieces</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 transition-colors flex items-center justify-center">✕</button>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-auto no-scrollbar pb-10">
          <div className="min-w-[600px] p-6">
            {/* Header Images */}
            <div className="grid grid-cols-4 gap-4 mb-10 border-b border-gray-100 pb-8">
              <div className="flex items-end pb-2">
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Selected Item</span>
              </div>
              {products.map(p => (
                <div key={p.id} className="text-center group">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 mb-3 shadow-sm border border-gray-100 group-hover:shadow-xl transition-all">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-tight line-clamp-2 h-8 leading-tight">{p.name}</h3>
                </div>
              ))}
            </div>

            {/* Feature Rows */}
            <div className="space-y-8">
              {/* Investment Row */}
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Investment</div>
                {products.map(p => (
                  <div key={p.id} className="text-sm font-black text-red-600">{p.price}</div>
                ))}
              </div>

              {/* Prestige Row */}
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Prestige</div>
                {products.map(p => (
                  <div key={p.id} className="text-[11px] font-bold flex items-center gap-1">
                    {p.rating}.0 <span className="text-yellow-400">★</span>
                    <span className="text-gray-300 text-[8px]">({p.reviewCount})</span>
                  </div>
                ))}
              </div>

              {/* Category Row */}
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Category</div>
                {products.map(p => (
                  <div key={p.id} className="text-[10px] font-bold text-gray-600 bg-gray-50 px-3 py-1 rounded-full w-fit uppercase tracking-tight">{p.category}</div>
                ))}
              </div>

              {/* Special Advantage Row */}
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Advantage</div>
                {products.map(p => (
                  <div key={p.id} className="text-[10px] font-black text-emerald-600 uppercase italic">{p.discount || "Full Price"}</div>
                ))}
              </div>

              {/* Summary Row */}
              <div className="grid grid-cols-4 gap-4 items-start">
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest pt-1">Expert Review</div>
                {products.map(p => (
                  <div key={p.id} className="text-[9px] text-gray-500 leading-relaxed line-clamp-4 italic">"{p.shortReview}"</div>
                ))}
              </div>
            </div>

            {/* Actions Row */}
            <div className="grid grid-cols-4 gap-4 mt-12 border-t border-gray-100 pt-8">
              <div></div>
              {products.map(p => (
                <button 
                  key={p.id} 
                  onClick={() => onAddToCart(p)} 
                  className="bg-black text-white py-4 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg active:scale-95"
                >
                  Add to Bag
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickViewModal: React.FC<{ product: Product; onClose: () => void; onAddToCart: (p: Product, qty: number) => void; onTriggerPromo: (p: Product) => void }> = ({ product, onClose, onAddToCart, onTriggerPromo }) => {
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const handleAdd = () => {
    setAdding(true);
    onAddToCart(product, qty);
    setTimeout(() => { setAdding(false); onClose(); }, 800);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white w-full max-w-[420px] rounded-2xl overflow-hidden relative shadow-2xl border border-gray-100 flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-black transition-colors">✕</button>
        <div className="w-full aspect-[4/5] overflow-hidden relative group bg-gray-50">
          <img src={product.images[currentImg]} alt={product.name} className="w-full h-full object-cover transition-all duration-700" loading="lazy" />
          <button onClick={() => onTriggerPromo(product)} className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors shadow-lg">
            <span>Promo Experience</span><span>✨</span>
          </button>
          {product.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, i) => (<button key={i} onClick={() => setCurrentImg(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentImg ? 'bg-black w-6' : 'bg-black/20'}`} />))}
            </div>
          )}
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 leading-tight mb-3">{product.name}</h2>
          <div className="flex items-center gap-3 mb-6">
            <p className="text-xl font-black text-red-600">{product.price}</p>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Free Shipping</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed italic mb-8">"{product.shortReview}"</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 font-bold text-gray-400 hover:text-black transition-colors">−</button>
              <span className="px-2 text-sm font-bold w-10 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 font-bold text-gray-400 hover:text-black transition-colors">+</button>
            </div>
            <button onClick={handleAdd} disabled={adding} className="flex-1 py-4 bg-black text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-black/5">
              {adding ? 'Added to Bag ✓' : 'Add to Collection'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductItem: React.FC<{ 
  product: Product; 
  onAddToCart: (p: Product, qty: number) => void;
  onCompare: (p: Product) => void; 
  isComparing: boolean; 
  onOpen360: (p: Product) => void; 
  onQuickView: (p: Product) => void;
  onGeneratePromo: (p: Product) => void;
  onToast: (msg: string) => void;
}> = ({ product, onAddToCart, onCompare, isComparing, onOpen360, onQuickView, onGeneratePromo, onToast }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { 
      if (entry.isIntersecting) { 
        setIsVisible(true); 
        observer.unobserve(entry.target); 
      } 
    }, { threshold: 0.1 });
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  const handleQuickAdd = () => {
    setIsAdding(true);
    onAddToCart(product, quantity);
    setTimeout(() => { 
      setIsAdding(false); 
      setQuantity(1); 
    }, 1500);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);
    onToast(nextState ? "Saved to boutique" : "Removed from collection");
  };

  return (
    <div ref={itemRef} className={`group flex flex-col items-center relative cursor-pointer transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="w-full bg-gray-50 rounded-2xl overflow-hidden mb-4 relative aspect-[3/4] shadow-sm border border-gray-100">
        <div 
          onClick={(e) => { e.stopPropagation(); onCompare(product); }} 
          className="absolute top-3 left-3 z-40 flex items-center gap-2 group/check"
        >
          <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center shadow-md ${isComparing ? 'bg-red-600 border-red-600' : 'bg-white/80 border-white/40 backdrop-blur-md group-hover/check:border-red-400'}`}>
            {isComparing && (
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className={`text-[9px] font-black uppercase tracking-widest transition-opacity duration-300 ${isComparing ? 'text-red-600' : 'text-gray-400 opacity-0 group-hover:opacity-100'}`}>Compare</span>
        </div>

        <div className="absolute top-3 right-3 z-30 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
          <button onClick={(e) => { e.stopPropagation(); onOpen360(product); }} className="w-9 h-9 rounded-full bg-white text-gray-800 flex items-center justify-center transition-all duration-300 shadow-md hover:bg-red-600 hover:text-white" title="360° Studio">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onGeneratePromo(product); }} className="w-9 h-9 rounded-full bg-white text-gray-800 flex items-center justify-center transition-all duration-300 shadow-md hover:bg-amber-500 hover:text-white" title="Generate Promo Video">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </button>
        </div>

        <img 
          src={isVisible ? product.images[0] : TRANSPARENT_PIXEL} 
          alt={product.name} 
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-3">
          <button onClick={(e) => { e.stopPropagation(); onQuickView(product); }} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-black hover:text-white transition-all transform hover:scale-110 active:scale-90">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleQuickAdd(); }} className={`w-full py-3.5 mt-auto text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-xl transition-all ${isAdding ? 'bg-emerald-600 text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}>
            {isAdding ? 'Added! ✓' : 'Quick Add +'}
          </button>
        </div>
      </div>
      
      <div className="text-center px-4 w-full">
        <h4 className="text-[12px] md:text-sm font-bold text-gray-800 uppercase tracking-tight line-clamp-1 mb-1">{product.name}</h4>
        <p className="text-[11px] md:text-sm font-black text-red-600 mb-2">{product.price}</p>
        
        {/* Rating Accordion */}
        <div 
          onClick={(e) => { e.stopPropagation(); setIsReviewExpanded(!isReviewExpanded); }}
          className="flex flex-col items-center mb-1 group/rating"
        >
          <div className="flex items-center gap-1.5 cursor-pointer bg-gray-50/0 hover:bg-gray-50 transition-colors px-2 py-1 rounded-full">
            <div className="flex text-yellow-400 text-[10px] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < product.rating ? 'opacity-100' : 'opacity-20'}>★</span>
              ))}
            </div>
            <span className={`text-[8px] font-black transition-all duration-300 ${isReviewExpanded ? 'text-red-600 rotate-180' : 'text-gray-300'}`}>▼</span>
          </div>
          
          <div className={`grid transition-all duration-500 ease-in-out w-full ${isReviewExpanded ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
            <div className="overflow-hidden">
              <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100 mx-1">
                <p className="text-[9px] md:text-[10px] text-gray-500 leading-relaxed italic line-clamp-3">"{product.shortReview}"</p>
                <div className="mt-2 text-[8px] font-bold text-gray-300 uppercase tracking-widest">{product.reviewCount} Verified Reviews</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-3" onClick={e => e.stopPropagation()}>
          <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm h-7">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2.5 text-gray-400 hover:text-black font-bold transition-colors">−</button>
            <span className="px-1 text-[10px] font-bold text-gray-800 min-w-[20px]">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="px-2.5 text-gray-400 hover:text-black font-bold transition-colors">+</button>
          </div>
          <button 
            onClick={toggleWishlist} 
            className={`flex items-center gap-1.5 px-3 h-7 rounded-lg border text-[9px] font-bold uppercase tracking-widest transition-all ${isWishlisted ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-gray-400 border-gray-100'}`}
          >
            <svg className={`w-3 h-3 ${isWishlisted ? 'fill-current' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [active360Product, setActive360Product] = useState<Product | null>(null);
  const [activePromoProduct, setActivePromoProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const addToHistory = (product: Product) => {
    const history = JSON.parse(localStorage.getItem('christmas-recently-viewed') || '[]');
    const filtered = history.filter((p: any) => p.id !== product.id);
    const updated = [{
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    }, ...filtered].slice(0, 3);
    
    localStorage.setItem('christmas-recently-viewed', JSON.stringify(updated));
    window.dispatchEvent(new Event('history-updated'));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const cart = JSON.parse(localStorage.getItem('christmas-cart') || '[]');
    const existingIndex = cart.findIndex((item: any) => item.id === product.id);
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.images[0], 
        quantity 
      });
    }
    
    localStorage.setItem('christmas-cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    showToast(`${quantity} x ${product.name} added to bag`);
  };

  const handleCompare = (product: Product) => {
    setCompareList(prev => {
      if (prev.find(p => p.id === product.id)) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 3) { showToast("Comparison limited to 3 items"); return prev; }
      return [...prev, product];
    });
  };

  const filteredProducts = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="relative">
      <div className="flex justify-center space-x-8 mb-10 px-6 overflow-x-auto no-scrollbar">
        {(['All', 'Men', 'Women', 'Accessories'] as Category[]).map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`text-[11px] font-bold uppercase tracking-widest relative py-2 transition-colors ${activeCategory === cat ? 'text-red-600' : 'text-gray-400 hover:text-black'}`}>{cat}{activeCategory === cat && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-red-600 rounded-full animate-fadeIn"></span>}</button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12 px-6">
        {filteredProducts.map((product) => (
          <ProductItem 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart}
            onCompare={handleCompare} 
            isComparing={!!compareList.find(p => p.id === product.id)} 
            onOpen360={(p) => { setActive360Product(p); addToHistory(p); }} 
            onQuickView={(p) => { setQuickViewProduct(p); addToHistory(p); }}
            onGeneratePromo={(p) => { setActivePromoProduct(p); addToHistory(p); }}
            onToast={showToast}
          />
        ))}
      </div>

      <RecentlyViewed />

      {/* Persistent Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-[500] px-6 pb-8 flex justify-center animate-fadeIn">
          <div className="bg-black/95 backdrop-blur-xl w-full max-w-[600px] rounded-full p-2.5 flex items-center justify-between border border-white/10 shadow-2xl">
            <div className="flex -space-x-4 ml-3">
              {compareList.map(p => (<div key={p.id} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-white shadow-xl"><img src={p.images[0]} alt="" className="w-full h-full object-cover" loading="lazy" /></div>))}
            </div>
            <div className="flex items-center gap-4 pr-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{compareList.length}/3 Selected</span>
              <button 
                onClick={() => setShowComparison(true)} 
                disabled={compareList.length < 2} 
                className="px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-red-600 text-white disabled:opacity-20 shadow-lg active:scale-95 transition-all"
              >
                Launch Side-by-Side
              </button>
              <button onClick={() => setCompareList([])} className="text-white/40 hover:text-white transition-colors ml-1">✕</button>
            </div>
          </div>
        </div>
      )}

      {showComparison && (
        <ComparisonModal 
          products={compareList} 
          onClose={() => setShowComparison(false)} 
          onAddToCart={(p) => addToCart(p, 1)} 
        />
      )}
      
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
          onAddToCart={(p, qty) => addToCart(p, qty)} 
          onTriggerPromo={(p) => setActivePromoProduct(p)}
        />
      )}
      
      {active360Product && <ThreeSixtyModal product={active360Product} onClose={() => setActive360Product(null)} />}
      {activePromoProduct && <VideoPromoGenerator productName={activePromoProduct.name} onClose={() => setActivePromoProduct(null)} />}

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
};

export default ProductGrid;
