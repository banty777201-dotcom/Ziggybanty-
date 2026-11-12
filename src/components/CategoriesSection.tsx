import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoriesSectionProps {
  onSelectCategory: (category: ProductCategory) => void;
}

interface CategoryCard {
  name: ProductCategory;
  tagline: string;
  image: string;
  count: string;
  flyerHighlight: string;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const categories: CategoryCard[] = [
    {
      name: 'Sneakers',
      tagline: 'Tactical Camo & Studded Street Kicks',
      image: '/src/assets/images/product_camo_sneakers_1794482685363.jpg',
      count: 'Urban Streetwear',
      flyerHighlight: 'Camo patterns & studded finishes'
    },
    {
      name: 'Shoes',
      tagline: 'Burnished Brogues & Classic Loafers',
      image: '/src/assets/images/product_brown_shoes_1794482686193.jpg',
      count: 'Italian Craftsmanship',
      flyerHighlight: 'Full-grain cognac leather'
    },
    {
      name: 'Fashion Wears',
      tagline: 'Signature Bombers, Hoodies & Utility Fits',
      image: '/src/assets/images/product_fashion_wear_1794482687120.jpg',
      count: 'Designer Apparel',
      flyerHighlight: 'Signature green accent cuts'
    },
    {
      name: 'Bags',
      tagline: 'Pebble Leather Travel & Crossbody Pieces',
      image: '/src/assets/images/product_bag_perfume_1794482686882.jpg',
      count: 'Executive Carry',
      flyerHighlight: 'Solid hardware & durable build'
    },
    {
      name: 'Perfumes',
      tagline: 'Long-Lasting Amber, Oud & Luxury Extraits',
      image: '/src/assets/images/hero_fashion_footwear_1794482685766.jpg',
      count: 'Niche Fragrances',
      flyerHighlight: '12+ hour sillage projection'
    }
  ];

  return (
    <section id="categories" className="py-16 sm:py-24 bg-[#F5F5F5] text-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
              Curated Collections
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#080808]">
              SHOP BY CATEGORY
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md">
            Explore our curated selection of footwear, luxury fashion wears, executive bags and signature perfumes.
          </p>
        </div>

        {/* Categories Grid: 5 distinctive category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const isWide = idx === 0 || idx === 3;
            return (
              <div
                key={cat.name}
                className={`group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end min-h-[340px] ${
                  isWide ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Background Photography with Zoom Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={`${cat.name} collection at Ziggybanty`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                </div>

                {/* Card Content Overlay */}
                <div className="relative z-10 p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-between text-xs font-mono text-[#70DC32] uppercase tracking-wider mb-2">
                    <span>{cat.count}</span>
                    <span className="text-zinc-400 text-[11px]">{cat.flyerHighlight}</span>
                  </div>

                  <h3 className="font-display text-2xl font-black text-white leading-tight mb-1">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-zinc-300 line-clamp-2 mb-4 leading-relaxed">
                    {cat.tagline}
                  </p>

                  <button
                    onClick={() => onSelectCategory(cat.name)}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-zinc-900/90 border border-zinc-700/80 hover:border-[#70DC32] hover:bg-[#70DC32] text-white hover:text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 group-hover:bg-[#70DC32] group-hover:text-black cursor-pointer"
                  >
                    <span>View {cat.name}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
