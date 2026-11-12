import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle, AlertCircle, RefreshCw, ShoppingBag, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/initialData';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    formatNaira
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Lagos');
  const [deliveryState, setDeliveryState] = useState('Lagos State');
  const [notes, setNotes] = useState('');
  const [deliveryRegion, setDeliveryRegion] = useState<'lagos' | 'nationwide'>('lagos');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  if (!isCheckoutOpen) return null;

  const deliveryFee = deliveryRegion === 'lagos' ? 3000 : 5500;
  const totalAmount = subtotal + deliveryFee;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.customerName = 'Please enter your full name.';
    if (!phone.trim()) errs.phone = 'Please enter your WhatsApp/Phone number.';
    if (!deliveryAddress.trim()) errs.deliveryAddress = 'Please enter your complete delivery street address.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) return;

    setLoading(true);
    setErrors({});

    const orderPayload = {
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      deliveryAddress: deliveryAddress.trim(),
      city: city.trim(),
      state: deliveryState.trim(),
      notes: notes.trim(),
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        selectedSize: item.selectedSize,
        image: item.product.image
      })),
      subtotal,
      deliveryFee,
      total: totalAmount
    };

    try {
      const itemsListText = items
        .map(i => `• ${i.quantity}x ${i.product.name} (${i.selectedSize || 'Standard'}) - ${formatNaira(i.product.price * i.quantity)}`)
        .join('\n');

      // Dual-dispatch: Send to backend (stores in admin database & forwards to Formspree)
      // and send directly to Formspree for guaranteed email delivery
      const [backendResponse] = await Promise.allSettled([
        fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        }),
        fetch(BUSINESS_INFO.formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `[New Order - Ziggybanty] ${customerName} - ${formatNaira(totalAmount)}`,
            formType: 'Customer Order Checkout',
            customerName,
            phone,
            email: email || 'N/A',
            deliveryAddress: `${deliveryAddress}, ${city}, ${deliveryState}`,
            deliveryRegion: deliveryRegion === 'lagos' ? 'Lagos (₦3,000)' : 'Nationwide (₦5,500)',
            orderedItems: itemsListText,
            subtotal: formatNaira(subtotal),
            deliveryFee: formatNaira(deliveryFee),
            totalAmount: formatNaira(totalAmount),
            notes: notes || 'None',
            _replyto: email || undefined
          })
        })
      ]);

      let confirmedOrderData = {
        id: 'ZB-' + Math.floor(10000 + Math.random() * 90000),
        ...orderPayload
      };

      if (backendResponse.status === 'fulfilled' && backendResponse.value.ok) {
        const result = await backendResponse.value.json();
        if (result.order) {
          confirmedOrderData = result.order;
        }
      }

      setConfirmedOrder(confirmedOrderData);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#70DC32', '#080808', '#FFFFFF']
        });
      } catch (e) {
        // Confetti is decorative
      }

      // Automatically construct and open WhatsApp message
      const whatsappText = encodeURIComponent(
        `*NEW ORDER - ZIGGYBANTY WEBSITE*\n` +
        `*Order ID:* ${confirmedOrderData.id}\n\n` +
        `*Customer Details:*\n` +
        `Name: ${customerName}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email || 'N/A'}\n\n` +
        `*Delivery Address:*\n` +
        `${deliveryAddress}, ${city}, ${deliveryState}\n\n` +
        `*Ordered Items:*\n` +
        `${itemsListText}\n\n` +
        `*Subtotal:* ${formatNaira(subtotal)}\n` +
        `*Delivery Fee:* ${formatNaira(deliveryFee)} (${deliveryRegion === 'lagos' ? 'Lagos' : 'Nationwide'})\n` +
        `*Total Amount:* ${formatNaira(totalAmount)}\n\n` +
        (notes ? `*Order Notes:* ${notes}\n\n` : '') +
        `Please confirm this order and provide account details for payment confirmation!`
      );

      const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumberDigits}?text=${whatsappText}`;

      // Open WhatsApp in new tab for instant confirmation
      window.open(whatsappUrl, '_blank');

      // Clear the cart
      clearCart();

    } catch (err: any) {
      setErrors({ form: err.message || 'Error processing order. Please contact us on WhatsApp directly.' });
    } finally {
      setLoading(false);
    }
  };

  const closeAndReset = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={closeAndReset} />

      {/* Modal */}
      <div className="relative bg-white text-zinc-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-zinc-200 overflow-hidden z-10 my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#70DC32]" />
            <h3 className="font-display font-bold text-lg text-zinc-900">
              {confirmedOrder ? 'Order Confirmation' : 'Complete Your Order'}
            </h3>
          </div>
          <button
            onClick={closeAndReset}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#70DC32]/20 text-[#70DC32] flex items-center justify-center mx-auto border-2 border-[#70DC32]">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <h4 className="font-display text-2xl font-black text-zinc-900">
                Order Placed Successfully!
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                Order Reference: <strong className="font-mono text-zinc-900 text-sm">{confirmedOrder.id}</strong>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Customer:</span>
                <span className="font-bold text-zinc-800">{confirmedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Phone:</span>
                <span className="font-mono text-zinc-800">{confirmedOrder.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Delivery Address:</span>
                <span className="text-zinc-800 max-w-xs text-right">{confirmedOrder.deliveryAddress}, {confirmedOrder.city}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-zinc-200 text-sm">
                <span>Total Amount:</span>
                <span className="font-mono text-[#70DC32] bg-black px-2 py-0.5 rounded">{formatNaira(confirmedOrder.total)}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed max-w-md mx-auto">
              Your order has been recorded in our system. A WhatsApp window was opened to confirm delivery with Ziggybanty directly. If it didn't open, click below:
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumberDigits}?text=${encodeURIComponent(`Hello Ziggybanty, confirming my Order Ref: ${confirmedOrder.id} for ${confirmedOrder.customerName}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#25D366] hover:bg-[#20b859] text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={closeAndReset}
                className="py-3 px-5 rounded-lg bg-zinc-900 text-white hover:text-[#70DC32] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close & Return to Shop
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} noValidate className="p-6 space-y-5">
            
            {errors.form && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            {/* Order Items Preview */}
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs space-y-2">
              <div className="font-bold text-zinc-800 uppercase tracking-wider text-[11px] flex justify-between">
                <span>Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-mono">{formatNaira(subtotal)}</span>
              </div>
              <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between text-zinc-600 text-[11px]">
                    <span className="truncate max-w-[220px]">{item.quantity}x {item.product.name} {item.selectedSize ? `(${item.selectedSize})` : ''}</span>
                    <span className="font-mono tabular-nums">{formatNaira(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tunde Balogun"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg bg-zinc-50 border text-xs focus:ring-2 focus:ring-[#70DC32] ${
                    errors.customerName ? 'border-red-400 bg-red-50/50' : 'border-zinc-300'
                  }`}
                />
                {errors.customerName && <p className="text-[11px] text-red-600 mt-1">{errors.customerName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  WhatsApp / Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 07049224098"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg bg-zinc-50 border text-xs focus:ring-2 focus:ring-[#70DC32] ${
                    errors.phone ? 'border-red-400 bg-red-50/50' : 'border-zinc-300'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="e.g. yourname@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-zinc-50 border border-zinc-300 text-xs focus:ring-2 focus:ring-[#70DC32]"
              />
            </div>

            {/* Delivery Destination */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                Delivery Location in Nigeria <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDeliveryRegion('lagos');
                    setDeliveryState('Lagos State');
                  }}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    deliveryRegion === 'lagos'
                      ? 'border-[#70DC32] bg-emerald-50/30 ring-1 ring-[#70DC32]'
                      : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300'
                  }`}
                >
                  <div className="font-bold text-xs text-zinc-900 flex items-center justify-between">
                    <span>Lagos State Delivery</span>
                    <Truck className="w-3.5 h-3.5 text-[#70DC32]" />
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">Delivery fee: ₦3,000</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Same day / 24-hr dispatch</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDeliveryRegion('nationwide');
                    if (deliveryState === 'Lagos State') setDeliveryState('Abuja FCT');
                  }}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    deliveryRegion === 'nationwide'
                      ? 'border-[#70DC32] bg-emerald-50/30 ring-1 ring-[#70DC32]'
                      : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300'
                  }`}
                >
                  <div className="font-bold text-xs text-zinc-900 flex items-center justify-between">
                    <span>Nationwide Delivery</span>
                    <Truck className="w-3.5 h-3.5 text-zinc-600" />
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">Delivery fee: ₦5,500</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">All 36 states via trusted courier</div>
                </button>
              </div>

              {/* Street Address */}
              <div>
                <input
                  type="text"
                  placeholder="Street Address, House Number, Landmark (e.g. 15 Admiralty Way, Lekki)"
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg bg-zinc-50 border text-xs focus:ring-2 focus:ring-[#70DC32] ${
                    errors.deliveryAddress ? 'border-red-400 bg-red-50/50' : 'border-zinc-300'
                  }`}
                />
                {errors.deliveryAddress && <p className="text-[11px] text-red-600 mt-1">{errors.deliveryAddress}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="City / Area (e.g. Ikeja, Lekki, Wuse)"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-50 border border-zinc-300 text-xs"
                />
                <input
                  type="text"
                  placeholder="State (e.g. Lagos, Rivers, Abuja)"
                  value={deliveryState}
                  onChange={e => setDeliveryState(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-50 border border-zinc-300 text-xs"
                />
              </div>

              {/* Order Notes */}
              <div>
                <input
                  type="text"
                  placeholder="Order notes / delivery instructions (optional)"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-50 border border-zinc-300 text-xs"
                />
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-4 rounded-xl bg-zinc-900 text-white space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Items Subtotal:</span>
                <span className="font-mono tabular-nums">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Delivery ({deliveryRegion === 'lagos' ? 'Lagos' : 'Nationwide'}):</span>
                <span className="font-mono tabular-nums">{formatNaira(deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-white pt-2 border-t border-zinc-800">
                <span>Total Payable:</span>
                <span className="font-mono text-[#70DC32] tabular-nums">{formatNaira(totalAmount)}</span>
              </div>
              <p className="text-[11px] text-zinc-400 pt-1">
                Payment note: Payment is confirmed via direct bank transfer or WhatsApp invoice upon dispatch confirmation.
              </p>
            </div>

            {/* Submit Order via WhatsApp Button */}
            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="w-full py-4 px-6 rounded-lg bg-[#70DC32] hover:bg-[#62c928] text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#70DC32]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>SUBMIT ORDER VIA WHATSAPP ({formatNaira(totalAmount)})</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
