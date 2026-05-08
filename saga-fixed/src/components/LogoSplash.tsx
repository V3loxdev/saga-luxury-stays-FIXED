import { useState, useEffect } from 'react';
import logo from "@/assets/sogo-hotel-logo.png";

const LogoSplash = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark text-white overflow-hidden"
      style={{
        transition: 'opacity 0.8s ease',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      <div
        className="flex flex-col items-center gap-4"
        style={{
          transition: 'transform 1s ease, opacity 1s ease',
          transform: fadeOut ? 'scale(0.95)' : 'scale(1)',
          opacity: fadeOut ? 0 : 1,
        }}
      >
        <img
          src={logo}
          alt="Saga Hotel"
          className="object-contain h-32 md:h-48 w-auto drop-shadow-2xl animate-pulse"
        />
        <div className="flex items-center gap-4 animate-bounce">
          <div className="w-2 h-2 bg-gold rounded-full animate-ping" />
          <span className="text-2xl md:text-4xl font-display tracking-wider uppercase gold-shimmer">
            SAGA HOTEL
          </span>
          <div className="w-2 h-2 bg-gold rounded-full animate-ping [animation-delay:0.2s]" />
        </div>
        <div className="flex space-x-1 mt-8">
          <div className="w-3 h-3 bg-gold/50 rounded-full animate-pulse [animation-delay:0.1s]" />
          <div className="w-3 h-3 bg-gold/75 rounded-full animate-pulse" />
          <div className="w-3 h-3 bg-gold rounded-full animate-pulse [animation-delay:0.3s]" />
        </div>
      </div>
    </div>
  );
};

export default LogoSplash;
