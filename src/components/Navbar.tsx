import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/initialData';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onSearchClick: () => void;
  onCategorySelect?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onSearchClick,
}) => {
  const { itemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'categories', label: 'Categories' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'admin', label: 'Admin' }
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080808] border-b border-zinc-800 text-white shadow-xl">
      {/* Top Announcement Bar */}
      <div className="bg-zinc-950 text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#70DC32]">ZIGGYBANTY</span>
            <span className="hidden sm:inline text-zinc-500">·</span>
            <span className="hidden sm:inline">Shop Easily With Ziggybanty</span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-400">Fast Nationwide Delivery in Nigeria</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-[#70DC32] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#70DC32]" />
              <span className="hidden md:inline">{BUSINESS_INFO.phoneFormatted}</span>
              <span className="md:hidden">Call</span>
            </a>
            <span className="text-zinc-700">|</span>
            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#70DC32] transition-colors font-medium text-zinc-200"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#70DC32]" />
              <span>WhatsApp Orders</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation (3-Zone Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
        >
          {/* Logo Icon Mark */}
          <div className="w-11 h-11 rounded-lg bg-black border-2 border-[#70DC32] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
            <span className="font-display font-extrabold text-xl tracking-tighter text-[#70DC32]">
              ZB
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-2xl tracking-wider text-white leading-none">
              ZIGGY<span className="text-[#70DC32]">BANTY</span>
            </span>
            <span className="text-[10px] tracking-[0.25em] text-zinc-400 font-semibold uppercase mt-0.5">
              Fashion · Style · Class
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Clean Single-Line Typography) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
          {navLinks.map(link => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap transition-colors duration-200 py-1 border-b-2 ${
                  isActive
                    ? 'text-[#70DC32] border-[#70DC32] font-semibold'
                    : 'text-zinc-300 border-transparent hover:text-white hover:border-zinc-500'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive Affordances (Search, Cart & CTA) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            aria-label="Search collection"
            className="p-2.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#70DC32]"
            title="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Trigger with live count */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View shopping bag"
            className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 hover:border-[#70DC32] transition-colors focus:outline-none focus:ring-2 focus:ring-[#70DC32]"
          >
            <ShoppingBag className="w-5 h-5 text-[#70DC32]" />
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Cart
            </span>
            {itemCount > 0 && (
              <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#70DC32] text-black font-bold text-xs flex items-center justify-center font-mono tabular-nums shadow-sm">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-900 border-t border-zinc-800 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeView === link.id
                    ? 'bg-[#70DC32] text-black font-bold'
                    : 'text-zinc-200 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-zinc-800 flex flex-col gap-2.5 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#70DC32]" />
              <span>Authentic Ziggybanty Quality Guarantee</span>
            </div>
            <div className="text-zinc-500">
              Direct Contact: {BUSINESS_INFO.phoneFormatted}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
