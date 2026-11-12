import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white text-zinc-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 z-10 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#70DC32] bg-black px-3 py-1 rounded inline-flex mb-3">
          {type === 'privacy' ? <ShieldCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          <span>{type === 'privacy' ? 'Customer Data Protection' : 'Store Terms & Service'}</span>
        </div>

        <h3 className="font-display text-2xl font-black text-zinc-900 mb-4">
          {type === 'privacy' ? 'ZIGGYBANTY PRIVACY POLICY' : 'ZIGGYBANTY TERMS & CONDITIONS'}
        </h3>

        <div className="text-xs text-zinc-600 space-y-4 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                At <strong>Ziggybanty</strong> ("Shop Easily With Ziggybanty"), we value and protect your personal privacy. This Privacy Policy details how we handle your personal information when you browse our store, send customer enquiries, and purchase our fashion collections.
              </p>
              <h4 className="font-bold text-zinc-900 text-sm">1. Information We Collect</h4>
              <p>
                When you submit an enquiry or place an order via our website or WhatsApp (+2347049224098), we collect details such as your full name, phone/WhatsApp number, delivery address, and email address (banty777201@gmail.com is our official receiving address).
              </p>
              <h4 className="font-bold text-zinc-900 text-sm">2. Use of Information</h4>
              <p>
                Your information is strictly used to fulfill customer orders, verify shoe and clothing sizing, coordinate swift courier dispatch across Nigerian states, and provide dedicated after-sales support. We never sell, lease, or distribute your private data to third-party advertisers.
              </p>
              <h4 className="font-bold text-zinc-900 text-sm">3. Contact Us</h4>
              <p>
                For questions regarding your data, contact our data administrator at <strong>{BUSINESS_INFO.email}</strong> or call <strong>{BUSINESS_INFO.phoneFormatted}</strong>.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong>Ziggybanty</strong>. By visiting our online catalog or placing orders through our website and WhatsApp channels, you agree to the following terms:
              </p>
              <h4 className="font-bold text-zinc-900 text-sm">1. Ordering and Sizing</h4>
              <p>
                All product prices are quoted in Nigerian Naira (₦). Customers are encouraged to confirm EU shoe sizes and wear measurements via our interactive size selectors or WhatsApp customer service before final dispatch.
              </p>
              <h4 className="font-bold text-zinc-900 text-sm">2. Delivery in Nigeria</h4>
              <p>
                Lagos deliveries are processed within 24 to 48 hours. Nationwide deliveries outside Lagos are shipped via registered logistics couriers with real-time tracking shared via WhatsApp.
              </p>
              <h4 className="font-bold text-zinc-900 text-sm">3. Authentic Quality Commitment</h4>
              <p>
                Every product shipped is physically inspected to meet Ziggybanty's high standard of Fashion, Style, and Class.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#080808] hover:bg-zinc-800 text-white hover:text-[#70DC32] text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
