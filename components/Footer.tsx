
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full pt-10 bg-gradient-to-b from-gray-100 via-gray-50 to-white border-t-[6px] border-red-600 flex flex-col items-center shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
      {/* Social Icons */}
      <div className="flex space-x-4 mb-8">
        {[
          { name: 'fb', icon: 'F' },
          { name: 'tw', icon: 'T' },
          { name: 'ig', icon: 'I' },
          { name: 'sc', icon: 'S' },
          { name: 'pi', icon: 'P' },
          { name: 'yt', icon: 'Y' }
        ].map((social) => (
          <div 
            key={social.name} 
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-400 hover:border-gray-900 hover:text-gray-900 hover:scale-110 hover:bg-gray-50 hover:shadow-md cursor-pointer transition-all duration-300 ease-in-out"
          >
            {social.icon}
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <div className="w-full px-4 mb-10">
        <ul className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-800">
          {[
            { label: 'My Account' },
            { label: 'Your Service' },
            { label: 'Careers' },
            { label: 'Privacy Policy' }
          ].map((link) => (
            <li 
              key={link.label}
              className="hover:text-red-600 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-0.5 transform"
            >
              {link.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Small Legal Text */}
      <p className="text-[8px] text-gray-400 px-12 text-center leading-loose mb-10">
        ©2024 CHRISTMAS Inc. The brand names, logos, and other trademarks are proprietary of their owners, trademarks seeking exclusively for industry best results.
      </p>

      {/* Decorative Bottom Illustration */}
      <div className="w-full px-6 pb-2">
        <div className="relative flex justify-center space-x-8 items-end overflow-visible">
          {/* Snowman */}
          <div className="relative w-16 h-20 flex flex-col items-center">
            <div className="w-10 h-10 bg-white border-2 border-gray-100 rounded-full relative z-10 translate-y-2">
              <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-black rounded-full"></div>
              <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-black rounded-full"></div>
              <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-3 h-1 bg-orange-500 rounded-full"></div>
            </div>
            <div className="w-16 h-14 bg-white border-2 border-gray-100 rounded-full relative z-0"></div>
          </div>
          
          {/* Santa (Abstract Representation) */}
          <div className="relative w-20 h-24 flex flex-col items-center">
             <div className="w-14 h-16 bg-red-500 rounded-t-3xl relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-8 bg-white opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-pink-100 rounded-full"></div>
             </div>
             <div className="w-20 h-4 bg-red-600 rounded-full mt-[-2px]"></div>
          </div>

          {/* Abstract Winter Leaves/Trees */}
          <div className="absolute bottom-0 left-0 w-full h-16 -z-10 opacity-20 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-t from-teal-100/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
