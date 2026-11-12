import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Truck, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/initialData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, formatNaira } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  if (!product) return null;

  // Set default size
  const activeSize = selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard');

  const handleAddToCart = () => {
    addToCart(product, quantity, activeSize);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Ziggybanty,\n\nI want to order:\n*${product.name}*\nPrice: ${formatNaira(product.price)}\nSelected Size: ${activeSize}\nQuantity: ${quantity}\n\nPlease confirm availability and delivery address details.`
    );
    return `https://wa.me/${BUSINESS_INFO.whatsappNumberDigits}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white text-zinc-900 rounded-2xl max-w-3xl w-full shadow-2xl border border-zinc-200 overflow-hidden z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-900/60 hover:bg-zinc-900 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Product Image Column */}
          <div className="relative bg-zinc-100 aspect-square md:aspect-auto flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-zinc-200">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain rounded-lg shadow-md"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute top-4 left-4">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-[#080808] text-[#70DC32] px-2.5 py-1 rounded">
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Info Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                <span>Item ID: {product.id}</span>
                <span className={product.inStock ? 'text-emerald-700 font-semibold' : 'text-rose-600 font-semibold'}>
                  {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#080808] leading-tight mb-2">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display font-black text-2xl text-[#080808] font-mono tabular-nums">
                  {formatNaira(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through font-mono tabular-nums">
                    {formatNaira(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    <span>Select Size / Option:</span>
                    <span className="text-[#70DC32] font-semibold">{activeSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                          activeSize === size
                            ? 'bg-[#080808] text-[#70DC32] border-[#080808]'
                            : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Quantity:
                </span>
                <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-mono font-bold text-zinc-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Product Specifications / Details */}
              {product.details && product.details.length > 0 && (
                <div className="mb-6 pt-4 border-t border-zinc-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-800 mb-2">
                    Product Highlights:
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-600">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#70DC32] mt-0.5">✔</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-zinc-200">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-[#70DC32] hover:bg-[#62c928] text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                    <span>Add {quantity} to Cart · {formatNaira(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[#080808] hover:bg-zinc-900 text-white hover:text-[#70DC32] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#70DC32]" />
                <span>Buy Now via WhatsApp Direct</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Doorstep Delivery Across Nigeria</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
