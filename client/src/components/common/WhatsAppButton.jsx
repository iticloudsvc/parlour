import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '919876543210';
  const message = encodeURIComponent('Hello Glow Like Angel Studio! I would like to inquire about booking an appointment.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 group flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
      aria-label="Direct WhatsApp Concierge"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100">Direct Concierge</span>
        <span className="text-xs font-bold leading-tight">WhatsApp Chat</span>
      </div>
    </a>
  );
};

export default WhatsAppButton;
