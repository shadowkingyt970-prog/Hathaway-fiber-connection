import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, MessageSquare, Sun, Moon } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenTracker: () => void;
  onOpenCrm: () => void;
  onOpenWebsiteLinks?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenTracker,
  onOpenCrm,
  onOpenWebsiteLinks,
  theme = 'dark',
  onToggleTheme,
}) => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-28 sm:pb-16 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0 border border-neutral-800 bg-neutral-900 group-hover:border-rose-500/60 transition-colors shadow-sm">
                <img src="/logo.svg" alt="Hathway Connect Logo" className="w-full h-full object-contain p-0.5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-rose-400 transition-colors">
                Hathway<span className="text-rose-600">Connect</span>
              </span>
            </a>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Authorized partner portal for Hathway Optical Fiber broadband and digital cable TV new connections in Chennai. Delivering high-speed symmetric FTTH gigabit internet with seamless doorstep installation.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Franchise Partner Desk · TRAI & DoT Compliant</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Broadband Plans
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#plans" className="hover:text-white transition-colors">399 Plan (25 Mbps)</a>
              </li>
              <li>
                <a href="#plans" className="hover:text-white transition-colors">499 Plan (40 Mbps)</a>
              </li>
              <li>
                <a href="#plans" className="hover:text-white transition-colors">599 Plan (100 Mbps)</a>
              </li>
              <li>
                <a href="#plans" className="hover:text-white transition-colors">749 Plan (200 Mbps)</a>
              </li>
              <li>
                <a href="#plans" className="hover:text-white transition-colors">Free Wi-Fi Router Benefit</a>
              </li>
            </ul>
          </div>

          {/* Coverage & Services */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Customer Desk & Orders
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onOpenBooking()} className="hover:text-white transition-colors cursor-pointer text-left font-semibold text-rose-400">
                  + Book New Connection
                </button>
              </li>
              <li>
                <button onClick={onOpenTracker} className="hover:text-white transition-colors cursor-pointer text-left">
                  Track Installation Order
                </button>
              </li>
              <li>
                <a href="#coverage" className="hover:text-white transition-colors">
                  Check Chennai Coverage & Feasibility
                </a>
              </li>
              <li>
                <a href="#recommender" className="hover:text-white transition-colors">
                  Interactive Speed Matcher
                </a>
              </li>
              <li>
                <button onClick={onOpenCrm} className="hover:text-rose-400 transition-colors cursor-pointer text-left">
                  Partner Franchisee Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Helpline */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Direct Contact
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <a href="tel:+918870085269" className="text-white hover:text-rose-400 font-mono">
                  +91 88700 85269
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/918870085269?text=Hello%20Hathway%20Partner%20I%20want%20a%20new%20broadband%20connection"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300"
                >
                  WhatsApp Booking Support
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <a href="mailto:hathwayfiberconnect@gmail.com" className="hover:text-white transition-colors">
                  hathwayfiberconnect@gmail.com
                </a>
              </div>
              {onOpenWebsiteLinks && (
                <div className="text-[11px] text-neutral-400 pt-1 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={onOpenWebsiteLinks}
                    className="text-rose-400 hover:text-rose-300 font-medium underline underline-offset-2 cursor-pointer transition-colors"
                  >
                    Share Website Link
                  </button>
                </div>
              )}
              <div className="text-[11px] text-neutral-400">
                Hours: 8:00 AM – 9:00 PM (Monday to Sunday)
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            &copy; {new Date().getFullYear()} BroadbandConnection.co · Authorized Hathway Fiber Partner. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer font-medium"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>High-Contrast Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            )}
            <span>·</span>
            <span className="hover:text-neutral-400">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-neutral-400">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-neutral-400">Fair Usage Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
