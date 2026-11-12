import React from 'react';
import { Phone, Mail, MessageCircle, Instagram, Clock, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { EnquiryForm } from './EnquiryForm';
import { Product } from '../types';
import { BUSINESS_INFO } from '../data/initialData';

interface ContactPageProps {
  products: Product[];
}

export const ContactPage: React.FC<ContactPageProps> = ({ products }) => {
  return (
    <div className="py-12 sm:py-20 bg-[#F5F5F5] min-h-screen text-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Brand Breadcrumb */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#70DC32] bg-black inline-block px-3 py-1 rounded mb-3">
            Direct Communication
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#080808]">
            CONTACT ZIGGYBANTY
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
            We are here to assist with shoe sizing, custom styling, product questions, delivery tracking, and WhatsApp instant orders.
          </p>
        </div>

        {/* Top Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          
          {/* Card 1: Direct Call */}
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="group bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-[#70DC32] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-zinc-900 text-[#70DC32] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Official Phone</span>
              <h3 className="font-display font-extrabold text-lg text-zinc-900 mt-1">
                {BUSINESS_INFO.phoneFormatted}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">Tap to call directly from your phone.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-1 text-xs font-bold text-[#70DC32] group-hover:underline">
              <span>Call Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Card 2: WhatsApp Chat */}
          <a
            href={BUSINESS_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-[#25D366] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6 fill-white stroke-none" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">WhatsApp Instant Chat</span>
              <h3 className="font-display font-extrabold text-lg text-zinc-900 mt-1 font-mono">
                {BUSINESS_INFO.whatsapp}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">Instant replies for stock check & order confirmation.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-1 text-xs font-bold text-[#25D366] group-hover:underline">
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Card 3: Official Email */}
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="group bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-[#70DC32] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-zinc-900 text-[#70DC32] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Official Email</span>
              <h3 className="font-display font-bold text-sm text-zinc-900 mt-1 truncate">
                {BUSINESS_INFO.email}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">For formal inquiries, business, or feedback.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-1 text-xs font-bold text-[#70DC32] group-hover:underline">
              <span>Send Email</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Card 4: Social Channels */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-black text-[#70DC32] flex items-center justify-center mb-4">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Social Communities</span>
              <div className="space-y-1.5 mt-2">
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-bold text-zinc-800 hover:text-[#70DC32]"
                >
                  <span>Instagram: {BUSINESS_INFO.instagram}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={BUSINESS_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-bold text-zinc-800 hover:text-[#70DC32]"
                >
                  <span>TikTok: {BUSINESS_INFO.tiktok}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-400">
              Follow for daily drops & lookbooks
            </div>
          </div>

        </div>

        {/* Main Content Split: Form on Left, Location & Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7">
            <EnquiryForm products={products} />
          </div>

          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Delivery & Service Information */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-5">
              <h3 className="font-display text-xl font-bold text-zinc-900 border-b border-zinc-100 pb-3">
                Business & Operating Hours
              </h3>

              <div className="space-y-4 text-xs text-zinc-600">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#70DC32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 block font-semibold">Customer Service & WhatsApp:</strong>
                    <span>Monday – Saturday: 8:00 AM – 9:00 PM</span>
                    <br />
                    <span>Sunday: 12:00 PM – 7:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#70DC32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 block font-semibold">Headquarters & Dispatch Hub:</strong>
                    <span>Lagos, Nigeria</span>
                    <br />
                    <span>Fast doorstep delivery throughout Lagos Mainland, Island, Lekki, Ikoyi, Ikeja & Nationwide Courier.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#70DC32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 block font-semibold">Order Protection:</strong>
                    <span>All orders are inspected prior to dispatch. Order tracking is delivered directly to your WhatsApp.</span>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action */}
              <div className="pt-4 border-t border-zinc-100">
                <a
                  href={BUSINESS_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#080808] hover:bg-zinc-900 text-white hover:text-[#70DC32] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#70DC32]" />
                  <span>Chat With Us Right Now</span>
                </a>
              </div>
            </div>

            {/* Brand Manifesto Card */}
            <div className="bg-zinc-900 text-white rounded-2xl p-6 sm:p-8 border border-zinc-800 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#70DC32]">
                Our Promise
              </div>
              <h4 className="font-display text-lg font-bold">
                "At Ziggybanty, style meets convenience."
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Whether you need a statement pair of camo studded sneakers or handcrafted Italian leather dress shoes, our customer-first commitment ensures smooth sizing guidance, fast delivery, and authentic customer care.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
