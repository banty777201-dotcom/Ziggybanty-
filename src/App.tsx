import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedCollection } from './components/FeaturedCollection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { EnquiryForm } from './components/EnquiryForm';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactPage } from './components/ContactPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PolicyModal } from './components/PolicyModal';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { Product, Testimonial, ProductCategory } from './types';
import { INITIAL_PRODUCTS, INITIAL_TESTIMONIALS } from './data/initialData';

export function AppContent() {
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Data state
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  
  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  // Load products from backend
  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      }
    } catch (err) {
      console.warn('Backend products fetch fallback to defaults', err);
    }
  };

  // Load testimonials from backend
  const loadTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const data = await res.json();
        if (data.testimonials && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
      }
    } catch (err) {
      console.warn('Backend testimonials fetch fallback to defaults', err);
    }
  };

  useEffect(() => {
    loadProducts();
    loadTestimonials();
  }, []);

  const handleSelectCategoryFromHeroOrNav = (cat: ProductCategory | string) => {
    setSelectedCategory(cat);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopNowClick = () => {
    setActiveView('shop');
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    setActiveView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeView === 'admin') {
    return (
      <AdminDashboard
        products={products}
        onRefreshProducts={loadProducts}
        onExitAdmin={() => setActiveView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] text-[#080808]">
      
      {/* Top Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onSearchClick={() => {
          setActiveView('shop');
          const searchInput = document.querySelector('input[placeholder="Search products..."]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
        }}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'contact' ? (
          <ContactPage products={products} />
        ) : activeView === 'about' ? (
          <div>
            <AboutSection onShopClick={handleShopNowClick} />
            <div className="max-w-4xl mx-auto px-4 py-16">
              <EnquiryForm products={products} />
            </div>
          </div>
        ) : activeView === 'categories' ? (
          <div>
            <CategoriesSection onSelectCategory={handleSelectCategoryFromHeroOrNav} />
            <FeaturedCollection
              products={products}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onViewProduct={setSelectedProduct}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        ) : activeView === 'shop' ? (
          <div>
            <FeaturedCollection
              products={products}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onViewProduct={setSelectedProduct}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <div className="max-w-4xl mx-auto px-4 py-16">
              <EnquiryForm products={products} />
            </div>
          </div>
        ) : (
          /* Default: Home View with all curated sections */
          <div>
            <Hero
              onShopClick={handleShopNowClick}
              onContactClick={handleContactClick}
            />

            <CategoriesSection
              onSelectCategory={handleSelectCategoryFromHeroOrNav}
            />

            <FeaturedCollection
              products={products}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onViewProduct={setSelectedProduct}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <WhyChooseUs />

            <AboutSection
              onShopClick={handleShopNowClick}
            />

            {/* In-page Customer Enquiry Section */}
            <section className="py-16 sm:py-24 bg-white border-b border-zinc-200">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <EnquiryForm products={products} />
              </div>
            </section>

            <TestimonialsSection
              testimonials={testimonials}
            />
          </div>
        )}
      </main>

      {/* Website Footer */}
      <Footer
        onNavClick={view => {
          if (view === 'privacy' || view === 'terms') {
            setPolicyType(view);
          } else {
            setActiveView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onCategoryClick={cat => handleSelectCategoryFromHeroOrNav(cat)}
      />

      {/* Global Modals & Floating Elements */}
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <PolicyModal
        type={policyType}
        onClose={() => setPolicyType(null)}
      />
      <FloatingWhatsApp />

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
