import React, { useState } from 'react';
import { Wifi, Zap, Shield, ArrowRight, PhoneCall, CheckCircle2, Tv } from 'lucide-react';
import { BroadbandNetworkAnimation } from './BroadbandNetworkAnimation';
import { BackgroundVideo } from './BackgroundVideo';

interface HeroProps {
  onOpenBooking: (planId?: string, prefill?: { mobile?: string; pincode?: string }) => void;
  onScrollToPlans: () => void;
  onScrollToCoverage: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onScrollToPlans,
  onScrollToCoverage,
}) => {
  const [quickPhone, setQuickPhone] = useState('');
  const [quickPincode, setQuickPincode] = useState('600040');
  const [phoneError, setPhoneError] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = quickPhone.replace(/\D/g, '');
    if (clean.length > 0 && clean.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }
    setPhoneError('');
    onOpenBooking(undefined, {
      mobile: clean.length === 10 ? clean : undefined,
      pincode: quickPincode || undefined,
    });
  };

  return (
    <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950 py-10 sm:py-14 lg:py-20">
      {/* Live High-Speed Optical Fiber Internet Background Video - Crystal Clear & Vibrant */}
      <BackgroundVideo overlayOpacity="bg-neutral-950/25" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Proposition and Action */}
          <div className="lg:col-span-7">
            {/* Clean unboxed editorial metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-400 mb-4">
              <span className="text-rose-400">Authorized Hathway Chennai Partner</span>
              <span aria-hidden="true">·</span>
              <span>Doorstep Fiber Installation</span>
              <span aria-hidden="true">·</span>
              <span>FTTH Pure Optical Fiber</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight text-balance">
              Ultra-Fast Fiber Broadband For Your Home & Work.
            </h1>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              Get genuine symmetric speeds up to 200 Mbps with zero buffering. Enjoy free Wi-Fi router use, zero installation fee on multi-month subscriptions, and up to 1 month extra free validity.
            </p>

            {/* Quick Feasibility & Callback Box */}
            <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900/80 p-4 sm:p-5 shadow-xl max-w-xl">
              <div className="text-sm font-semibold text-white mb-3">
                Check Area Feasibility & Get Instant Booking Callback
              </div>
              
              <form onSubmit={handleQuickSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  <div className="sm:col-span-7">
                    <label htmlFor="quick-mobile" className="sr-only">Mobile Number</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500 text-xs font-mono">
                        +91
                      </div>
                      <input
                        id="quick-mobile"
                        type="tel"
                        inputMode="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={quickPhone}
                        onChange={(e) => {
                          setQuickPhone(e.target.value.replace(/\D/g, ''));
                          if (phoneError) setPhoneError('');
                        }}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 pl-11 pr-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-5">
                    <label htmlFor="quick-pincode" className="sr-only">PIN Code</label>
                    <input
                      id="quick-pincode"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="6-digit Pincode"
                      value={quickPincode}
                      onChange={(e) => setQuickPincode(e.target.value.replace(/\D/g, ''))}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                    />
                  </div>
                </div>

                {phoneError && (
                  <p className="text-xs text-rose-400 font-medium">{phoneError}</p>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Check Feasibility & Book</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onScrollToPlans}
                    className="px-4 py-2.5 rounded-lg border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 text-sm font-medium transition-colors text-center cursor-pointer"
                  >
                    View All Plans
                  </button>
                </div>
              </form>

              {/* Quiet Micro Trust Signals */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-400 border-t border-neutral-800/80 pt-3">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Free Dual-Band Router</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Installation Fee</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Flexible Time Slots</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Animated Fiber Architecture Demonstrator */}
          <div className="lg:col-span-5">
            <BroadbandNetworkAnimation onExplorePlans={onScrollToCoverage} />
          </div>

        </div>
      </div>
    </section>
  );
};
