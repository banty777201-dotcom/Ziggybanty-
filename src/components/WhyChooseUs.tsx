import React from 'react';
import { Award, Sparkles, ShoppingBag, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Quality Fashion Products',
      description: 'Handpicked materials, authentic craftsmanship, durable footwear, and rich designer fragrances built to last and impress.'
    },
    {
      icon: Sparkles,
      title: 'Stylish & Modern Collections',
      description: 'Ahead-of-the-curve fashion trends. From studded streetwear sneakers to burnished brogues and luxury bombers.'
    },
    {
      icon: ShoppingBag,
      title: 'Convenient Shopping Experience',
      description: 'Order effortlessly via our web store or direct WhatsApp checkout with clear pricing in Nigerian Naira (₦).'
    },
    {
      icon: HeartHandshake,
      title: 'Customer-Focused Service',
      description: 'Dedicated support, personalized sizing guidance, prompt responses, and swift nationwide delivery across all Nigerian states.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#080808] text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#70DC32] mb-2">
            The Ziggybanty Standard
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white">
            WHY CHOOSE ZIGGYBANTY?
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            We are dedicated to elevating your everyday style with uncompromised quality, unmatched class, and seamless convenience.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-900/90 rounded-xl p-6 border border-zinc-800 hover:border-[#70DC32]/60 hover:bg-zinc-900 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-black border border-zinc-700/80 group-hover:border-[#70DC32] flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-6 h-6 text-[#70DC32]" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#70DC32] transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                  <span>0{idx + 1} // Value Pillar</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
