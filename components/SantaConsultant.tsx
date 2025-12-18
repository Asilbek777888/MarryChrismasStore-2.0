
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface Message {
  role: 'user' | 'santa';
  text: string;
}

const SantaConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'santa', text: "Ho-ho-ho! Men sening shaxsiy Luxury Santa stilistingman. Bugun kimni xursand qilamiz? Yaqiningmi yoki o'zingni?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Siz Luxury Christmas do'konining Santa Klauzisiz. Siz juda xushmuomala, bayramona va moda bo'yicha mutaxassissiz. 
          Bizda quyidagi mahsulotlar bor: Velvet Evening Top ($39.50), Silk Holiday Scarf ($49.50), Gold Glitter Clutch ($89.00), Cashmere Sweater ($120.00), Star Stud Earrings ($25.50), Red Festive Heels ($150.00).
          Foydalanuvchining so'roviga qarab, ushbu mahsulotlardan birini yoki bir nechtasini juda chiroyli va bayramona tilda tavsiya qiling. Javoblaringiz qisqa, lekin ta'sirchan bo'lsin.`
        }
      });

      setMessages(prev => [...prev, { role: 'santa', text: response.text || "Kechirasiz, shimolda qor ko'p yog'ib aloqa uzildi. Nima dedingiz?" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'santa', text: "Bugun kiyiklarim biroz charchagan ko'rinadi, birozdan keyin qayta yozing!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[200]">
      {isOpen ? (
        <div className="w-[320px] h-[450px] bg-white rounded-2xl shadow-2xl border-2 border-red-600 flex flex-col overflow-hidden animate-fadeIn">
          <div className="bg-red-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎅</span>
              <span className="font-serif font-bold italic">Santa AI Stylist</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">✕</button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-[10px] text-gray-400 italic animate-pulse">Santa o'ylamoqda... 🦌</div>}
          </div>

          <div className="p-3 border-t bg-white flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Santadan maslahat so'rang..." 
              className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-xs focus:ring-1 focus:ring-red-500 outline-none"
            />
            <button onClick={handleSend} className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              ➤
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 hover:bg-red-600 transition-all group active:scale-95 border-2 border-white/20"
        >
          <span className="text-xl group-hover:animate-bounce">🎅</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Ask Santa AI</span>
        </button>
      )}
    </div>
  );
};

export default SantaConsultant;
