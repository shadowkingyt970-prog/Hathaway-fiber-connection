import React, { useState } from 'react';
import { Phone, MessageSquare, Zap, Share2, Check } from 'lucide-react';

interface FloatingCtaProps {
  onOpenBooking: () => void;
}

export const FloatingCta: React.FC<FloatingCtaProps> = ({ onOpenBooking }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: 'Hathway Fiber Chennai - New Broadband Connection',
      text: 'Check out Hathway Fiber broadband plans and book a new high-speed optical connection in Chennai with free router & installation!',
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* MOBILE EXPERIENCE: Docked Ergonomic Bottom Action Bar (< sm) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl safe-area-pb">
        {/* Direct Phone Call */}
        <a
          href="tel:+918870085269"
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 active:bg-neutral-800 transition-colors"
          title="Call Hathway Partner"
        >
          <Phone className="w-4 h-4 text-rose-500" />
          <span className="text-[10px] font-medium mt-0.5">Call</span>
        </a>

        {/* WhatsApp Chat Booking */}
        <a
          href="https://wa.me/918870085269?text=Hi%20Hathway%20Chennai%20Partner,%20I%20am%20interested%20in%20a%20new%20fiber%20broadband%20connection"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 active:bg-emerald-900/80 transition-colors"
          title="WhatsApp Hathway Partner"
        >
          <MessageSquare className="w-4 h-4 fill-emerald-400" />
          <span className="text-[10px] font-medium mt-0.5">WhatsApp</span>
        </a>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 active:bg-neutral-800 transition-colors cursor-pointer"
          title="Share Website"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Share2 className="w-4 h-4 text-blue-400" />
          )}
          <span className="text-[10px] font-medium mt-0.5">
            {copied ? 'Copied' : 'Share'}
          </span>
        </button>

        {/* Primary Action: Book New Connection */}
        <button
          type="button"
          onClick={onOpenBooking}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs shadow-lg shadow-rose-950/50 transition-all cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Book Connection</span>
        </button>
      </div>

      {/* COMPUTER & TABLET EXPERIENCE: Floating Ergonomic Pill (sm and above) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center gap-2.5">
        {/* WhatsApp Quick Chat */}
        <a
          href="https://wa.me/918870085269?text=Hi%20Hathway%20Chennai%20Partner,%20I%20am%20interested%20in%20a%20new%20fiber%20broadband%20connection"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/40 hover:-translate-y-0.5 transition-all cursor-pointer"
          title="Chat on WhatsApp with Hathway Partner Desk"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span>WhatsApp Booking</span>
        </a>

        {/* Direct Call */}
        <a
          href="tel:+918870085269"
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white text-xs font-medium border border-neutral-700 shadow-lg hover:-translate-y-0.5 transition-all"
          title="Direct Phone Line (+91 88700 85269)"
        >
          <Phone className="w-4 h-4 text-rose-500" />
          <span>+91 88700 85269</span>
        </a>

        {/* Quick Book Button */}
        <button
          type="button"
          onClick={onOpenBooking}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xl shadow-rose-950/50 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4" />
          <span>Book New Connection</span>
        </button>
      </div>
    </>
  );
};
