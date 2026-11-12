import React, { useState, useMemo } from 'react';
import { ShoppingBag, Eye, MessageCircle, Search, SlidersHorizontal, Check } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/initialData';

interface FeaturedCollectionProps {
  products: Product[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onViewProduct: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  products,
  selectedCategory,
  onCategoryChange,
  onViewProduct,
  searchQuery,
  setSearchQuery
}) => {
  const { addToCart, formatNaira } = useCart();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Sneakers',
    'Shoes',
    'Fashion Wears',
    'Bags',
    'Perfumes'
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedNotice(product.id);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2000);
  };

  const getWhatsAppProductLink = (product: Product) => {
    const message = encodeURIComponent(
      `Hello Ziggybanty, I am interested in purchasing:\n\n*${product.name}*\nPrice: ${formatNaira(product.price)}\nCategory: ${product.category}\n\nPlease confirm availability and payment/delivery details.`
    );
    return `https://wa.me/${BUSINESS_INFO.whatsappNumberDigits}?text=${message}`;
  };

  return (
    <section id="shop" className="py-16 sm:py-24 bg-white text-[#080808] border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#70DC32] bg-black inline-block px-3 py-1 rounded mb-3">
            Premium Fashion Store
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#080808]">
            EXPLORE OUR COLLECTION
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
            Browse genuine craftsmanship, contemporary footwear, apparel, and lifestyle accessories designed for style and class.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-200">
          
          {/* Category Tabs (Segmented Control - compliant with zero-pill rule for interactive buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#080808] text-[#70DC32] shadow-sm'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-300 rounded-lg text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#70DC32] focus:border-transparent transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="appearance-none pl-8 pr-8 py-2 bg-zinc-50 border border-zinc-300 rounded-lg text-xs font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#70DC32] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Product Count Display */}
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-6">
          <span>
            Showing <strong className="text-zinc-900 font-mono tabular-nums">{filteredProducts.length}</strong> items
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#70DC32] hover:underline font-medium"
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-zinc-50 border border-dashed border-zinc-300">
            <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-zinc-800 mb-1">No products found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-4">
              We couldn't find any items matching your selected category and search keywords.
            </p>
            <button
              onClick={() => {
                onCategoryChange('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#080808] text-white hover:text-[#70DC32] text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map(product => {
              const isAdded = addedNotice === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => onViewProduct(product)}
                  className="group bg-white rounded-xl border border-zinc-200 overflow-hidden hover:border-zinc-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Product Image Container with 4:3 Aspect Ratio */}
                  <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Stock Status Badge */}
                    <div className="absolute top-3 left-3">
                      {product.inStock ? (
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-[#080808]/90 backdrop-blur-sm text-[#70DC32] px-2 py-1 rounded">
                          In Stock ({product.stockCount})
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-red-600 text-white px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Quick View Floating Action */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-black text-xs font-bold uppercase tracking-wider shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        Quick View
                      </span>
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet unboxed category metadata */}
                      <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                        {product.category}
                      </div>

                      {/* Product Title */}
                      <h3 className="font-display text-base font-bold text-zinc-900 group-hover:text-[#70DC32] transition-colors leading-snug line-clamp-2 mb-2">
                        {product.name}
                      </h3>

                      {/* Description snippet */}
                      <p className="text-xs text-zinc-500 line-clamp-2 mb-4 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="pt-3 border-t border-zinc-100">
                      <div className="flex items-baseline justify-between mb-3.5">
                        <span className="font-display font-extrabold text-xl text-zinc-900 font-mono tabular-nums">
                          {formatNaira(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-zinc-400 line-through font-mono tabular-nums">
                            {formatNaira(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Action buttons: Add to Cart & WhatsApp Order */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={e => handleAddToCart(product, e)}
                          disabled={!product.inStock}
                          className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                            isAdded
                              ? 'bg-zinc-900 text-[#70DC32]'
                              : 'bg-[#70DC32] hover:bg-[#62c928] text-black shadow-sm'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>

                        <a
                          href={getWhatsAppProductLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-zinc-900 hover:bg-black text-white hover:text-[#70DC32] border border-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          title="Inquire directly on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#70DC32]" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
