import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#F5F5F5] text-[#080808] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#70DC32] bg-black inline-block px-3 py-1 rounded mb-3">
            Customer Feedback
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#080808]">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            Real experiences from fashion enthusiasts, executives, and footwear lovers across Nigeria.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 border border-zinc-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative"
            >
              <div>
                {/* Quote Icon & Rating Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#70DC32] text-[#70DC32]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-zinc-300" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-zinc-900">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    {item.location}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-0.5 truncate max-w-[190px]">
                    Purchased: {item.productPurchased}
                  </p>
                </div>

                {item.verifiedBuyer && (
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
