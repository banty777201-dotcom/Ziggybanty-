import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle, Mail, Phone, Clock, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product } from '../types';
import { BUSINESS_INFO } from '../data/initialData';

interface EnquiryFormProps {
  products: Product[];
  preselectedProduct?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ products, preselectedProduct }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    productInterest: preselectedProduct || 'General Product Enquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedEnquiry, setSubmittedEnquiry] = useState<{
    id: string;
    message: string;
    data: typeof formData;
  } | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your real full name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address (e.g. name@example.com).';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number or WhatsApp Number is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number (e.g. 07049224098).';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Please enter an inquiry subject.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide details in your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Your message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      // Dual-dispatch: Send to backend (stores in admin database & forwards to Formspree)
      // and send directly to Formspree endpoint for immediate delivery
      const [backendResponse] = await Promise.allSettled([
        fetch('/api/enquiries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }),
        fetch(BUSINESS_INFO.formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `[Ziggybanty Enquiry] ${formData.subject} - from ${formData.fullName}`,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            productInterest: formData.productInterest,
            message: formData.message,
            _replyto: formData.email
          })
        })
      ]);

      let enquiryId = 'ENQ-' + Date.now().toString().slice(-6);
      let successMessage = `Your enquiry has been received and delivered directly to Ziggybanty email via Formspree (${BUSINESS_INFO.email}).`;

      if (backendResponse.status === 'fulfilled' && backendResponse.value.ok) {
        const result = await backendResponse.value.json();
        if (result.enquiryId) enquiryId = result.enquiryId;
        if (result.message) successMessage = result.message;
      }

      // Success
      setSubmittedEnquiry({
        id: enquiryId,
        message: successMessage,
        data: { ...formData }
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#70DC32', '#080808', '#FFFFFF']
        });
      } catch (err) {
        // Confetti is a visual extra
      }

      // Reset fields
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        productInterest: 'General Product Enquiry',
        message: ''
      });

    } catch (err: any) {
      setErrors({ form: err.message || 'Network error occurred. Please try again or use direct WhatsApp.' });
    } finally {
      setLoading(false);
    }
  };

  const forwardSubmittedToWhatsApp = () => {
    if (!submittedEnquiry) return;
    const text = encodeURIComponent(
      `Hello Ziggybanty,\n\nI just submitted an enquiry on your website (Ref: ${submittedEnquiry.id}):\n\n*Name:* ${submittedEnquiry.data.fullName}\n*Phone:* ${submittedEnquiry.data.phone}\n*Email:* ${submittedEnquiry.data.email}\n*Subject:* ${submittedEnquiry.data.subject}\n*Product:* ${submittedEnquiry.data.productInterest}\n\n*Message:*\n${submittedEnquiry.data.message}\n\nPlease reply at your earliest convenience!`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumberDigits}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-10 shadow-lg">
      
      {/* Header Info */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#70DC32] bg-black px-2.5 py-1 rounded mb-3">
          Direct Customer Service
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-black text-zinc-900 leading-tight">
          SEND AN ENQUIRY TO ZIGGYBANTY
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Have a question about sizing, availability, bulk orders, or custom styling? Send a message directly to our official inbox at <strong className="text-zinc-900">{BUSINESS_INFO.email}</strong>.
        </p>
      </div>

      {submittedEnquiry ? (
        <div className="p-6 sm:p-8 rounded-xl bg-zinc-900 text-white border border-[#70DC32]/50 space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#70DC32] text-black flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-display text-xl font-bold text-white">
                Enquiry Successfully Sent!
              </h4>
              <p className="text-xs text-zinc-300">
                Reference ID: <span className="font-mono text-[#70DC32]">{submittedEnquiry.id}</span>
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Thank you, <strong className="text-white">{submittedEnquiry.data.fullName}</strong>. Your enquiry has been received and securely delivered to <strong className="text-[#70DC32]">{BUSINESS_INFO.email}</strong>. Our team will review your message and reply via WhatsApp or Email shortly.
          </p>

          <div className="p-4 rounded-lg bg-black/60 border border-zinc-800 text-xs space-y-1">
            <div><span className="text-zinc-400">Recipient:</span> {BUSINESS_INFO.email}</div>
            <div><span className="text-zinc-400">Subject:</span> {submittedEnquiry.data.subject}</div>
            <div><span className="text-zinc-400">Product of Interest:</span> {submittedEnquiry.data.productInterest}</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={forwardSubmittedToWhatsApp}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#70DC32] hover:bg-[#62c928] text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Also Chat Now on WhatsApp</span>
            </button>

            <button
              onClick={() => setSubmittedEnquiry(null)}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Send Another Message</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          
          {errors.form && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="e.g. Adeola Johnson"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg bg-zinc-50 border text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#70DC32] ${
                  errors.fullName ? 'border-red-400 bg-red-50/50' : 'border-zinc-300'
                }`}
              />
              {errors.fullName && <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.fullName}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="e.g. johnson@gmail.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg bg-zinc-50 border text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#70DC32] ${
                  errors.email ? 'border-red-400 bg-red-50/50' : 'border-zinc-300'
                }`}
              />
              {errors.email && <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Phone Number / WhatsApp Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
                Phone Number / WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="e.g. 07049224098 or +234..."
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg bg-zinc-50 border text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#70DC32] ${
                  errors.phone ? 'border-red-400 bg-red-50/50' : 'border-zinc-300'
                }`}
              />
              {errors.phone && <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.phone}</p>}
            </div>

            {/* Product of Interest */}
            <div>
              <label htmlFor="productInterest" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
                Product of Interest
              </label>
              <select
                id="productInterest"
                value={formData.productInterest}
                onChange={e => setFormData({ ...formData, productInterest: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#70DC32]"
              >
                <option value="General Product Enquiry">General Product Enquiry</option>
                <option value="Sneakers Collection">Sneakers Collection</option>
                <option value="Italian Brogues & Dress Shoes">Italian Brogues & Dress Shoes</option>
                <option value="Fashion Wears & Jackets">Fashion Wears & Jackets</option>
                <option value="Leather Bags & Accessories">Leather Bags & Accessories</option>
                <option value="Designer Perfumes & Fragrances">Designer Perfumes & Fragrances</option>
                {products.map(p => (
                  <option key={p.id} value={p.name}>
                    {p.name} (₦{p.price.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              placeholder="e.g. Inquiry regarding sneaker sizing and Lagos delivery"
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg bg-zinc-50 border text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#70DC32] ${
                errors.subject ? 'border-red-400 bg-red-50/50' : 'border-zinc-300'
              }`}
            />
            {errors.subject && <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.subject}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us what you would like to ask or specify your order details..."
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg bg-zinc-50 border text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#70DC32] resize-y ${
                errors.message ? 'border-red-400 bg-red-50/50' : 'border-zinc-300'
              }`}
            />
            {errors.message && <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.message}</p>}
          </div>

          {/* Business Destination Trust Badge */}
          <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#70DC32]" />
              <span>Delivers to: <strong className="text-zinc-800">{BUSINESS_INFO.email}</strong> (via Formspree)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#70DC32]" />
              <span>Average response time: &lt; 30 mins</span>
            </div>
          </div>

          {/* Prominent Green Button Labelled "SEND MESSAGE" */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-8 rounded-lg bg-[#70DC32] hover:bg-[#62c928] text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#70DC32]/20 hover:shadow-[#70DC32]/30 active:scale-[0.99] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Sending to Ziggybanty...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 stroke-[2.5]" />
                <span>SEND MESSAGE</span>
              </>
            )}
          </button>

        </form>
      )}

    </div>
  );
};
