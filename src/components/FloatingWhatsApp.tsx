import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside 
      aria-label="WhatsApp live chat support"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto"
    >
      {/* Floating greeting bubble */}
      {showTooltip && (
        <div className="mb-2 bg-white text-zinc-900 border border-zinc-200 rounded-xl p-3 shadow-xl max-w-xs text-xs animate-in slide-in-from-bottom-2 duration-200 relative">
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss message bubble"
            className="absolute top-1 right-1 p-1 text-zinc-400 hover:text-zinc-600 rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-bold text-zinc-900 flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#70DC32]"></span>
            <span>Ziggybanty WhatsApp Live</span>
          </div>
          <p className="text-zinc-600 text-[11px] leading-relaxed">
            Chat with us directly to ask about shoe sizes, available wears, or order confirmation.
          </p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={BUSINESS_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-108 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#70DC32]/50 cursor-pointer"
        aria-label="Chat with Ziggybanty on WhatsApp"
        title="Chat with Ziggybanty on WhatsApp"
      >
        {/* Glow halo */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:opacity-0" />
        
        <MessageCircle className="w-7 h-7 relative z-10 fill-white stroke-none" />

        {/* Status Indicator */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#70DC32] border-2 border-white shadow-sm" />
      </a>
    </aside>
  );
};
