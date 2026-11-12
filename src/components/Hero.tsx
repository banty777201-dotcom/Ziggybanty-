import React from 'react';
import { ArrowRight, ShoppingBag, MessageSquare, Truck, CheckCircle2, Shield } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';

interface HeroProps {
  onShopClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onContactClick }) => {
  return (
    <section className="relative bg-[#080808] text-white overflow-hidden border-b border-zinc-800">
      {/* Subtle ambient lime glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#70DC32]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline and CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Editorial brand kicker (unboxed, clean typography) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-400">
              <span className="text-[#70DC32]">Official Flagship Store</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Nigeria & Worldwide</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-balance text-white">
              UPGRADE YOUR STYLE WITH{' '}
              <span className="text-[#70DC32] block sm:inline">ZIGGYBANTY</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed">
              Discover quality sneakers, shoes, fashionable wears, bags and perfumes.
              Everything you need to express your style, all in one place.
            </p>

            {/* CTAs: Green and Black buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#70DC32] hover:bg-[#62c928] text-black font-extrabold text-sm uppercase tracking-wider rounded-lg transition-all duration-200 shadow-lg shadow-[#70DC32]/20 hover:shadow-[#70DC32]/30 active:scale-[0.98] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-transparent hover:bg-zinc-800/80 text-white border-2 border-zinc-700 hover:border-[#70DC32] font-bold text-sm uppercase tracking-wider rounded-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#70DC32]" />
                <span>Contact Us</span>
              </button>
            </div>

            {/* Value Proposition Highlights */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-400">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#70DC32] shrink-0" />
                <span>Fast Lagos & Nationwide Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#70DC32] shrink-0" />
                <span>Instant WhatsApp Checkout</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#70DC32] shrink-0" />
                <span>100% Inspected & Handpicked</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Showcase Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
              <img
                src={BUSINESS_INFO.heroImage}
                alt="Ziggybanty luxury footwear, dress shoes, sneakers, leather bag and perfume collection"
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* High-end bottom badge overlay with measured scrim */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-[#70DC32] uppercase">
                    2026 Collection
                  </span>
                  <p className="text-white font-display font-bold text-lg leading-tight">
                    Footwear · Wears · Accessories
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-300 block">Starting from</span>
                  <span className="font-display font-bold text-[#70DC32] text-xl font-mono tabular-nums">
                    ₦24,000
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
