import React, { useState, useEffect } from 'react';
import { X, Globe, Copy, Check, ExternalLink, ShieldCheck, MessageSquare, CheckCircle2 } from 'lucide-react';

interface WebsiteLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebsiteLinkModal: React.FC<WebsiteLinkModalProps> = ({ isOpen, onClose }) => {
  const [copiedLive, setCopiedLive] = useState(false);
  const [liveOrigin, setLiveOrigin] = useState(
    'https://ais-pre-yjwj2u2wkczqbm4vdooazm-672938747348.asia-southeast1.run.app'
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      if (!window.location.origin.includes('localhost')) {
        setLiveOrigin(window.location.origin);
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLive(true);
      setTimeout(() => setCopiedLive(false), 2200);
    } catch {
      // Fallback
    }
  };

  const whatsappShareText = encodeURIComponent(
    `Check out Hathway Fiber broadband plans and book a high-speed optical connection in Chennai with free router & free installation at ${liveOrigin}`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="website-links-title"
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 id="website-links-title" className="text-base font-bold text-white">
                Share Website Link
              </h2>
              <p className="text-xs text-neutral-400">
                Direct live link to access and book connections online
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Status Banner */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-emerald-300">
                Official Live Web Address
              </div>
              <p className="text-[11px] text-neutral-300 mt-0.5 leading-relaxed">
                Anyone can open this direct link immediately on any mobile, tablet, or PC to view plans and request installation.
              </p>
            </div>
          </div>

          {/* Active Live Link Box */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Live Website URL
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                Active & Live
              </span>
            </div>

            <div className="font-mono text-xs sm:text-sm text-neutral-200 select-all break-all bg-neutral-900/90 p-3 rounded-lg border border-neutral-800">
              {liveOrigin}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopy(liveOrigin)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-md shadow-rose-950/40"
              >
                {copiedLive ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied Link!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Website Link</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/?text=${whatsappShareText}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-md shadow-emerald-950/40"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Share via WhatsApp</span>
              </a>

              <a
                href={liveOrigin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-800 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800 px-6 py-3.5 bg-neutral-950/60 flex items-center justify-between">
          <div className="text-[11px] text-neutral-400">
            Hathway Authorized Partner Portal · Chennai
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
