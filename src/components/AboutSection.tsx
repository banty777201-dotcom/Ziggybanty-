import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';

interface AboutSectionProps {
  onShopClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onShopClick }) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F5F5F5] text-[#080808] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Brand Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-black p-2 border border-zinc-300 shadow-xl">
              <img
                src="/src/assets/images/hero_fashion_footwear_1794482685766.jpg"
                alt="About Ziggybanty fashion and lifestyle brand"
                className="w-full h-auto rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/90 backdrop-blur-md border border-zinc-700 text-white">
                <div className="text-xs font-mono text-[#70DC32] uppercase tracking-widest mb-1">
                  Brand Identity
                </div>
                <div className="font-display text-base font-extrabold tracking-wide">
                  FASHION • STYLE • CLASS
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Tagline: "{BUSINESS_INFO.tagline}"
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Business Introduction */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
              <Sparkles className="w-3.5 h-3.5 text-[#70DC32]" />
              <span>About Ziggybanty</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#080808] leading-tight">
              YOUR DESTINATION FOR FASHION, STYLE AND CLASS
            </h2>

            {/* Official Business Introduction (Exact Prompt Requirement) */}
            <div className="space-y-4 text-base text-zinc-700 leading-relaxed">
              <p className="font-medium text-lg text-zinc-900">
                Welcome to Ziggybanty, your destination for fashion, style and class.
              </p>
              
              <p>
                We bring together stylish footwear, fashionable wears, bags and perfumes to help you express your personality with confidence.
              </p>

              <p>
                Our goal is to make shopping easier and more convenient by connecting customers with products that complement their lifestyle.
              </p>

              <p className="text-xl font-bold text-[#080808] font-display italic">
                "At Ziggybanty, style meets convenience."
              </p>
            </div>

            {/* Guarantees */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-800">
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-[#70DC32] shrink-0" />
                <span>Strict Quality Standards</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-[#70DC32] shrink-0" />
                <span>Direct Access via WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-[#70DC32] shrink-0" />
                <span>Transparent Nigerian Naira (₦) Pricing</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-[#70DC32] shrink-0" />
                <span>Fast Nationwide Courier Partners</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onShopClick}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#080808] hover:bg-zinc-900 text-white hover:text-[#70DC32] font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                <span>Browse Products Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
