
import React, { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('christmas-cart') || '[]');
    setItems(cart);
  };

  useEffect(() => {
    if (isOpen) loadCart();
    window.addEventListener('cart-updated', loadCart);
    return () => window.removeEventListener('cart-updated', loadCart);
  }, [isOpen]);

  const removeItem = (id: number) => {
    const updated = items.filter(i => i.id !== id);
    localStorage.setItem('christmas-cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[250] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[300] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="font-serif text-2xl font-bold italic">Your Magic Bag</h2>
          <button onClick={onClose} className="text-2xl hover:rotate-90 transition-transform">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Your bag is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 shadow-sm border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-tight">{item.name}</h3>
                    <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-600">✕</button>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Qty: {item.quantity}</p>
                  <p className="text-sm font-black mt-2 text-red-600">{item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Total Amount</span>
              <span className="text-xl font-black font-serif">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl active:scale-95">
              Secure Checkout →
            </button>
            <p className="text-center text-[8px] text-gray-400 mt-4 uppercase tracking-tighter">Complimentary gift wrapping on all orders</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
