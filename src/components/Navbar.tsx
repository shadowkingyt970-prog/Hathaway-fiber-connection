import React, { useState } from 'react';
import { ClipboardList, ShieldCheck, Sun, Moon, Menu, X, ArrowRight, Phone, Share2, Check } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (planId?: string) => void;
  onOpenTracker: () => void;
  onOpenCrm: () => void;
  onOpenWebsiteLinks?: () => void;
  crmLeadCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenTracker,
  onOpenCrm,
  onOpenWebsiteLinks,
  crmLeadCount,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = async () => {
    if (onOpenWebsiteLinks) {
      onOpenWebsiteLinks();
      return;
    }
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
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleMobileNav = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-2">
          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-rose-500" /> : <Menu className="w-5 h-5" />}
          </button>

          <a href="#" className="flex items-center gap-2.5 group whitespace-nowrap">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden shrink-0 border border-neutral-800 bg-neutral-900 group-hover:border-rose-500/60 transition-colors shadow-sm shadow-rose-950/40">
              <img src="/logo.svg" alt="Hathway Connect Logo" className="w-full h-full object-contain p-0.5" />
            </div>
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-rose-400 transition-colors">
              Hathway<span className="text-rose-600">Connect</span>
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-neutral-300">
          <a href="#plans" className="hover:text-white transition-colors">
            Fiber Plans
          </a>
          <a href="#coverage" className="hover:text-white transition-colors">
            Chennai Coverage
          </a>
          <a href="#recommender" className="hover:text-white transition-colors">
            Speed Matcher
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Zone 3: Actions + Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Share Website Link button - hidden on extra-small mobile to prevent navbar crowding (available in mobile drawer & bottom dock) */}
          <button
            type="button"
            onClick={handleShare}
            title="Share or Copy Website Link"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-medium transition-colors cursor-pointer select-none"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Share Link</span>
              </>
            )}
          </button>

          {/* High-Contrast Light Mode / Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            role="switch"
            aria-checked={theme === 'light'}
            aria-label={`Switch to ${theme === 'dark' ? 'high-contrast light mode' : 'dark mode'}`}
            title={theme === 'dark' ? 'Switch to High-Contrast Light Mode (Accessibility)' : 'Switch to Dark Mode'}
            className={`inline-flex items-center justify-center p-2 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
              theme === 'light'
                ? 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-950 shadow-sm'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200 hover:text-white'
            }`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="hidden md:inline ml-1.5">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="hidden md:inline ml-1.5">Dark Mode</span>
              </>
            )}
          </button>

          {/* Track Order button */}
          <button
            onClick={onOpenTracker}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors whitespace-nowrap cursor-pointer"
            title="Track existing booking status"
          >
            <ClipboardList className="w-3.5 h-3.5 text-rose-500" />
            <span>Track Order</span>
          </button>

          {/* CRM portal button */}
          <button
            onClick={onOpenCrm}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-200 border border-neutral-800/80 rounded-lg hover:border-neutral-700 transition-colors whitespace-nowrap cursor-pointer"
            title="Business Partner Lead CRM"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Partner Portal ({crmLeadCount})</span>
          </button>

          {/* Direct Phone Call Icon on Mobile */}
          <a
            href="tel:+918870085269"
            className="sm:hidden p-2 rounded-lg border border-neutral-800 bg-neutral-900 text-rose-400 hover:text-white hover:bg-neutral-850 active:scale-95 transition-all"
            title="Call Support (+91 88700 85269)"
            aria-label="Call support directly"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>

          {/* New Connection Button */}
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-all shadow-md shadow-rose-950/40 whitespace-nowrap cursor-pointer active:scale-95"
            title="Open New Hathway Fiber Connection Booking Form"
          >
            <span>Book</span>
            <span className="hidden xs:inline sm:inline"> Now</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 py-4 space-y-3 animate-fade-in shadow-2xl">
          {/* Primary Action Button */}
          <button
            onClick={() => handleMobileNav(() => onOpenBooking())}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50 cursor-pointer"
          >
            <span>Book New Connection</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="border-t border-neutral-800 pt-2 space-y-1 text-sm font-medium text-neutral-300">
            <a
              href="#plans"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Fiber Tariff Plans
            </a>
            <a
              href="#coverage"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Chennai Areas & Pincode Coverage
            </a>
            <a
              href="#recommender"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Interactive Speed Matcher
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Frequently Asked Questions
            </a>
            <button
              onClick={() => handleMobileNav(onOpenTracker)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white text-rose-400 font-medium flex items-center justify-between cursor-pointer"
            >
              <span>Track Application Status</span>
              <ClipboardList className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleMobileNav(onOpenCrm)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white text-neutral-400 font-medium flex items-center justify-between cursor-pointer"
            >
              <span>Franchisee Partner Portal ({crmLeadCount})</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="w-full text-left px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-medium flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-rose-400" />
                <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share Website Link'}</span>
              </span>
              {copiedLink && <Check className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>

          <div className="border-t border-neutral-800 pt-3 flex items-center justify-between text-xs text-neutral-400">
            <span>Booking WhatsApp / Call:</span>
            <a href="tel:+918870085269" className="font-mono text-rose-400 font-bold flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>+91 88700 85269</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
