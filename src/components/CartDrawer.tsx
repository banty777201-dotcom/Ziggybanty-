import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    subtotal,
    formatNaira
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={() => setIsCartOpen(false)} />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white text-zinc-900 shadow-2xl h-full flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#70DC32]" />
            <h3 className="font-display font-bold text-lg text-zinc-900">
              Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center text-zinc-400">
              <ShoppingBag className="w-14 h-14 stroke-1 text-zinc-300 mb-3" />
              <p className="font-display font-bold text-base text-zinc-700">Your bag is empty</p>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                Explore our sneakers, dress shoes, fashion wears, bags, and perfumes to add items to your cart.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-5 py-2.5 bg-[#080808] text-white hover:text-[#70DC32] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex gap-4 p-3 bg-zinc-50 rounded-xl border border-zinc-200"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0 border border-zinc-200">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display font-bold text-xs text-zinc-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-zinc-500">
                        {item.selectedSize ? `Size: ${item.selectedSize}` : item.product.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono font-bold text-xs text-zinc-900 tabular-nums">
                      {formatNaira(item.product.price * item.quantity)}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center border border-zinc-300 rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                        className="px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-100 font-bold"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-medium tabular-nums text-zinc-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                        className="px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-100 font-bold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-200 bg-white space-y-4">
            
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-zinc-800 tabular-nums">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Estimated Delivery</span>
                <span className="text-zinc-800">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Total Amount</span>
                <span className="font-mono text-base text-zinc-900 tabular-nums">{formatNaira(subtotal)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-[#70DC32] hover:bg-[#62c928] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#70DC32]" />
              <span>Confirmed via WhatsApp & Secure Order System</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
