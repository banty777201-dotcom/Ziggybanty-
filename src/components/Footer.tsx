import React from 'react';
import { Phone, MessageCircle, Mail, Instagram, ShieldCheck, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';
import { ProductCategory } from '../types';

interface FooterProps {
  onNavClick: (view: string) => void;
  onCategoryClick: (category: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onCategoryClick }) => {
  return (
    <footer className="bg-[#080808] text-white border-t border-zinc-800">
      
      {/* Top Banner inside Footer */}
      <div className="border-b border-zinc-800/80 bg-zinc-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-black border border-[#70DC32] flex items-center justify-center">
              <span className="font-display font-black text-2xl text-[#70DC32]">ZB</span>
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-wider text-white">
                ZIGGY<span className="text-[#70DC32]">BANTY</span>
              </span>
              <p className="text-xs text-zinc-400 font-medium">
                "{BUSINESS_INFO.tagline}" · <span className="text-[#70DC32]">{BUSINESS_INFO.slogan}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>WhatsApp Us: {BUSINESS_INFO.whatsapp}</span>
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs font-bold uppercase tracking-wider hover:border-[#70DC32] hover:text-[#70DC32] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#70DC32]" />
              <span>Call: {BUSINESS_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="font-display font-black text-xl text-white">
              ZIGGYBANTY
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Your destination for fashion, style and class. Handcrafted luxury shoes, designer sneakers, fashion wears, bags, and perfumes for the modern individual.
            </p>
            <div className="pt-2 text-xs font-mono text-[#70DC32]">
              FASHION • STYLE • CLASS
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#70DC32] hover:text-[#70DC32] flex items-center justify-center text-zinc-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#70DC32] hover:text-[#70DC32] flex items-center justify-center text-zinc-300 transition-colors font-bold text-xs"
                aria-label="TikTok"
              >
                TK
              </a>
              <a
                href={BUSINESS_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#70DC32] hover:text-[#70DC32] flex items-center justify-center text-zinc-300 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-[#70DC32] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('shop')}
                  className="hover:text-[#70DC32] transition-colors cursor-pointer"
                >
                  Shop Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="hover:text-[#70DC32] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('contact')}
                  className="hover:text-[#70DC32] transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('privacy')}
                  className="hover:text-[#70DC32] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('terms')}
                  className="hover:text-[#70DC32] transition-colors cursor-pointer"
                >
                  Terms and Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {(['Sneakers', 'Shoes', 'Fashion Wears', 'Bags', 'Perfumes'] as ProductCategory[]).map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => onCategoryClick(cat)}
                    className="hover:text-[#70DC32] transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Official Contact Information */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Contact Information
            </h4>
            
            <div className="space-y-3 text-xs text-zinc-400">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Phone</span>
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-[#70DC32] font-semibold text-zinc-200">
                  {BUSINESS_INFO.phoneFormatted}
                </a>
              </div>

              <div>
                <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">WhatsApp</span>
                <a href={BUSINESS_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#70DC32] font-semibold text-zinc-200">
                  {BUSINESS_INFO.whatsapp}
                </a>
              </div>

              <div>
                <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Email</span>
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-[#70DC32] text-zinc-200 break-all">
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div>
                <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Social Handles</span>
                <span className="text-zinc-300">Instagram: {BUSINESS_INFO.instagram}</span>
                <br />
                <span className="text-zinc-300">TikTok: {BUSINESS_INFO.tiktok}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin Portal Link */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © 2026 Ziggybanty. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavClick('admin')}
              className="text-zinc-500 hover:text-[#70DC32] transition-colors cursor-pointer text-[11px] font-mono"
            >
              Owner Portal (Admin Login)
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
