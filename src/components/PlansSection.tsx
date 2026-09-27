import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Check, Zap, Gift, ArrowRight, Sparkles, ShieldCheck, ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import { BROADBAND_PLANS } from '../data/mockData';
import { Plan, BillingCycle } from '../types';

interface PlansSectionProps {
  onSelectPlan: (plan: Plan, cycle: BillingCycle) => void;
}

export const PlansSection: React.FC<PlansSectionProps> = ({ onSelectPlan }) => {
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>('6m');
  const [speedFilter, setSpeedFilter] = useState<number | 'all'>('all');
  const [activePlanIndex, setActivePlanIndex] = useState<number>(0);
  const [mobileLayout, setMobileLayout] = useState<'swipe' | 'grid'>('swipe');
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredPlans = BROADBAND_PLANS.filter((plan) => {
    if (speedFilter === 'all') return true;
    return plan.speedMbps === speedFilter;
  });

  // Track active plan card as user swipes horizontally
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el || filteredPlans.length === 0) return;

    const scrollLeft = el.scrollLeft;
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : 300;
    const gap = 16;
    const newIndex = Math.min(
      filteredPlans.length - 1,
      Math.max(0, Math.round(scrollLeft / (cardWidth + gap)))
    );

    if (newIndex !== activePlanIndex) {
      setActivePlanIndex(newIndex);
    }
  }, [activePlanIndex, filteredPlans.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Scroll smoothly to chosen card
  const scrollToPlan = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const children = el.children;
    if (children[index]) {
      (children[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
      setActivePlanIndex(index);
    }
  };

  const getPriceDetails = (plan: Plan, cycle: BillingCycle) => {
    // Plan 399 is exclusively a 6-month package
    if (plan.id === 'plan-399') {
      return {
        total: 2825,
        effectiveMonthly: 471,
        durationLabel: '6 Month Plan',
        bonusTag: 'Zero Installation & Free Wifi Router Use',
        applicableCycle: '6m' as BillingCycle,
        perks: [
          '6 Month Plan: ₹2,825 Payment Total',
          'Zero Installation Fee',
          'Free Wi-Fi Router Use',
          'True Unlimited Data without FUP limit',
        ],
      };
    }

    if (cycle === '1m') {
      if (plan.id === 'plan-749') {
        return {
          total: 1356,
          effectiveMonthly: 1356,
          durationLabel: '1 Month Plan',
          bonusTag: '1 Month Fast-Track Booking',
          applicableCycle: '1m' as BillingCycle,
          perks: ['Standard Doorstep Installation', 'Wi-Fi Router Included', 'Unlimited High-Speed Data'],
        };
      }
      // For 499 and 599 where user only listed 3M, 6M, 11M, default to 3M
      const p3 = plan.pricing['3m']?.total || plan.threeMonthPrice;
      return {
        total: p3,
        effectiveMonthly: Math.round(p3 / 3),
        durationLabel: '3 Month Plan (Recommended)',
        bonusTag: 'Free Wi-Fi Router & Zero Installation',
        applicableCycle: '3m' as BillingCycle,
        perks: ['3 Month Plan Payment', 'Zero Installation Fee', 'Free Dual-Band Wi-Fi Router'],
      };
    }

    if (cycle === '3m') {
      const total = plan.pricing['3m']?.total || plan.threeMonthPrice;
      return {
        total,
        effectiveMonthly: Math.round(total / 3),
        durationLabel: '3 Month Plan',
        bonusTag: 'Zero Installation & Free Router',
        applicableCycle: '3m' as BillingCycle,
        perks: ['Quarterly Payment Plan', 'Zero Installation Fee', 'Free Dual-Band Wi-Fi Router'],
      };
    }

    if (cycle === '6m') {
      const total = plan.pricing['6m']?.total || plan.sixMonthPrice;
      return {
        total,
        effectiveMonthly: Math.round(total / 6.5),
        durationLabel: '6 Month Plan [15 Days Free]',
        bonusTag: '15 Days Free Validity',
        applicableCycle: '6m' as BillingCycle,
        perks: [
          '15 Days Free Additional Validity',
          'Zero Installation Fee',
          'Free Dual-Band Wi-Fi Router Use',
          'Extra Savings on Monthly Average',
        ],
      };
    }

    // 11m or 12m
    const total = plan.pricing['11m']?.total || plan.elevenMonthPrice || plan.twelveMonthPrice;
    return {
      total,
      effectiveMonthly: Math.round(total / 12),
      durationLabel: '11 Month Plan [1 Month Free]',
      bonusTag: '1 Month Free Validity',
      applicableCycle: '11m' as BillingCycle,
      perks: [
        '1 Month Free Additional Validity (12 Months Service for 11 Months Price)',
        'Zero Installation Fee',
        'Free Dual-Band Wi-Fi Router Use',
        'Priority SLA Support',
      ],
    };
  };

  return (
    <section id="plans" className="py-16 sm:py-24 border-b border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-500">
            Official Hathway Tariff Plans
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">
            High-Speed Unlimited Fiber Broadband
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Transparent all-inclusive pricing with zero hidden charges. Select your subscription tenure for free Wi-Fi router usage, zero installation fees, and extra free validity!
          </p>
        </div>

        {/* Duration / Billing Cycle Segmented Control */}
        <div className="mt-8 flex justify-center">
          <div className="grid grid-cols-2 sm:flex sm:items-center p-1.5 rounded-2xl sm:rounded-xl bg-neutral-900 border border-neutral-800 gap-1.5 w-full max-w-2xl sm:w-auto">
            <button
              type="button"
              onClick={() => setSelectedCycle('6m')}
              className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer ${
                selectedCycle === '6m'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              6 Months · 15 Days Free
            </button>
            <button
              type="button"
              onClick={() => setSelectedCycle('3m')}
              className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer ${
                selectedCycle === '3m'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              3 Months · Free Router
            </button>
            <button
              type="button"
              onClick={() => setSelectedCycle('11m')}
              className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer ${
                selectedCycle === '11m' || selectedCycle === '12m'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              11 Months · 1 Month Free
            </button>
            <button
              type="button"
              onClick={() => setSelectedCycle('1m')}
              className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer ${
                selectedCycle === '1m'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              1 Month
            </button>
          </div>
        </div>

        {/* Speed Quick Filter Tabs */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setSpeedFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              speedFilter === 'all'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All Speeds
          </button>
          {[25, 40, 100, 200].map((spd) => (
            <button
              key={spd}
              type="button"
              onClick={() => setSpeedFilter(spd)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                speedFilter === spd
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {spd} Mbps
            </button>
          ))}
        </div>

        {/* Mobile Swipe-to-Select Prompt & Layout Toggle (< md) */}
        <div className="md:hidden mt-8 flex items-center justify-between text-xs text-neutral-400 px-1">
          <div className="flex items-center gap-1.5 font-medium text-rose-400">
            <Smartphone className="w-3.5 h-3.5 animate-bounce" />
            <span>👈 Swipe cards to compare plans 👉</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileLayout((prev) => (prev === 'swipe' ? 'grid' : 'swipe'))}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer select-none"
          >
            {mobileLayout === 'swipe' ? 'Show All as List' : 'Switch to Swipe View'}
          </button>
        </div>

        {/* Pricing Cards Track (Horizontal swipe on mobile, grid on desktop) */}
        <div
          ref={scrollContainerRef}
          className={`mt-4 sm:mt-10 ${
            mobileLayout === 'swipe'
              ? 'flex overflow-x-auto snap-x snap-mandatory pb-4 pt-1 gap-4 scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'
          }`}
        >
          {filteredPlans.map((plan, idx) => {
            const pricing = getPriceDetails(plan, selectedCycle);
            const isHighlight = plan.popular || plan.bestValue;
            const isSelectedCard = activePlanIndex === idx;

            return (
              <div
                key={plan.id}
                onClick={() => {
                  if (mobileLayout === 'swipe') {
                    scrollToPlan(idx);
                  }
                }}
                className={`relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 transition-all ${
                  mobileLayout === 'swipe'
                    ? 'w-[86vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none'
                    : 'w-full'
                } ${
                  isSelectedCard && mobileLayout === 'swipe'
                    ? 'ring-2 ring-rose-500/90 shadow-2xl shadow-rose-950/40'
                    : ''
                } ${
                  isHighlight
                    ? 'border-2 border-rose-600/80 bg-neutral-900 shadow-xl shadow-rose-950/30'
                    : 'border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-medium mb-2">
                    <span className="text-[11px] font-mono text-neutral-300 font-semibold">{plan.name}</span>
                    {isSelectedCard && mobileLayout === 'swipe' && !plan.popular && !plan.bestValue && (
                      <span className="md:hidden text-rose-400 font-semibold text-[10px] px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800/60 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        <span>Selected</span>
                      </span>
                    )}
                    {plan.popular && (
                      <span className="text-rose-400 font-semibold text-[11px] px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800/60">
                        Most Popular
                      </span>
                    )}
                    {plan.bestValue && (
                      <span className="text-emerald-400 font-semibold text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60">
                        Best Value
                      </span>
                    )}
                  </div>

                  {/* Plan Name & Speed */}
                  <div className="flex items-baseline justify-between border-b border-neutral-800 pb-3">
                    <div>
                      <div className="text-xs text-neutral-400">Up to Speed:</div>
                      <div className="font-display text-2xl font-bold text-white flex items-baseline gap-1">
                        <span>{plan.speedMbps}</span>
                        <span className="text-sm font-normal text-rose-500">Mbps</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-neutral-400 block">Base Rate</span>
                      <span className="font-mono text-sm font-semibold text-neutral-200">
                        ₹{plan.monthlyPrice}<span className="text-[10px] text-neutral-400">/mo</span>
                      </span>
                    </div>
                  </div>

                  {/* Selected Tenure Payment Highlight Box */}
                  <div className="mt-4 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                      <span>{pricing.durationLabel}</span>
                      <span className="text-rose-400 font-semibold text-[10px]">Net Payment</span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-sm font-mono text-rose-400">₹</span>
                      <span className="font-mono text-3xl font-extrabold text-white tabular-nums">
                        {pricing.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                    {pricing.bonusTag && (
                      <div className="mt-1.5 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3 shrink-0" />
                        <span>{pricing.bonusTag}</span>
                      </div>
                    )}
                  </div>

                  {/* Complete Tenure Breakdown on this Plan */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80 space-y-2">
                    <div className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider">
                      Available Tenure & Payments:
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {plan.id === 'plan-399' && (
                        <div
                          onClick={() => setSelectedCycle('6m')}
                          className="flex items-center justify-between p-2 rounded-lg bg-neutral-950/80 border border-neutral-800 cursor-pointer hover:border-rose-500/50 transition-colors"
                        >
                          <div>
                            <span className="font-medium text-white">6 Month Plan</span>
                            <span className="block text-[10px] text-emerald-400">Zero Install + Free Wifi Router</span>
                          </div>
                          <span className="font-mono font-bold text-white">₹2,825</span>
                        </div>
                      )}

                      {plan.id === 'plan-499' && (
                        <>
                          <div
                            onClick={() => setSelectedCycle('3m')}
                            className={`flex items-center justify-between p-1.5 px-2 rounded-lg border cursor-pointer transition-colors ${
                              selectedCycle === '3m'
                                ? 'bg-rose-950/40 border-rose-600/80 text-white'
                                : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                            }`}
                          >
                            <span className="text-[11px]">3 Month Plan</span>
                            <span className="font-mono font-bold text-white">₹2,242</span>
                          </div>
                          <div
                            onClick={() => setSelectedCycle('6m')}
                            className={`flex items-center justify-between p-1.5 px-2 rounded-lg border cursor-pointer transition-colors ${
                              selectedCycle === '6m'
                                ? 'bg-rose-950/40 border-rose-600/80 text-white'
                                : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                            }`}
                          >
                            <div>
                              <span className="text-[11px]">6 Month Plan</span>
                              <span className="ml-1 text-[10px] text-emerald-400 font-semibold">[15 days Free]</span>
                            </div>
                            <span className="font-mono font-bold text-white">₹3,540</span>
                          </div>
                          <div
                            onClick={() => setSelectedCycle('11m')}
                            className={`flex items-center justify-between p-1.5 px-2 rounded-lg border cursor-pointer transition-colors ${
                              selectedCycle === '11m' || selectedCycle === '12m'
                                ? 'bg-rose-950/40 border-rose-600/80 text-white'
                                : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                            }`}
                          >
                            <div>
                              <span className="text-[11px]">11 Month Plan</span>
                              <span className="ml-1 text-[10px] text-emerald-400 font-semibold">[1 Month Free]</span>
                            </div>
                            <span className="font-mono font-bold text-white">₹6,490</span>
                          </div>
                        </>
                      )}

                      {plan.id === 'plan-599' && (
                        <>
                          <div
                            onClick={() => setSelectedCycle('3m')}
                            className={`flex items-center justify-between p-1.5 px-2 rounded-lg border cursor-pointer transition-colors ${
                              selectedCycle === '3m'
                                ? 'bg-rose-950/40 border-rose-600/80 text-white'
                                : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                            }`}
                          >
                            <span className="text-[11px]">3 Month Plan</span>
                            <span className="font-mono font-bold text-white">₹2,593</span>
                          </div>
                          <div
                            onClick={() => setSelectedCycle('6m')}
                            className={`flex items-center justify-between p-1.5 px-2 rounded-lg border cursor-pointer transition-colors ${
                              selectedCycle === '6m'
                                ? 'bg-rose-950/40 border-rose-600/80 text-white'
                                : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                            }`}
                          >
                            <div>
                              <span className="text-[11px]">6 Month Plan</span>
                              <span className="ml-1 text-[10px] text-emerald-400 font-semibold">[15 days Free]</span>
                            </div>
                            <span className="font-mono font-bold text-white">₹4,241</span>
                          </div>
                          <div
                            onClick={() => setSelectedCycle('11m')}
                            className={`flex items-center justify-between p-1.5 px-2 rounded-lg border cursor-pointer transition-colors ${
                              selectedCycle === '11m' || selectedCycle === '12m'
                                ? 'bg-rose-950/40 border-rose-600/80 text-white'
                                : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                            }`}
                          >
                            <div>
                              <span className="text-[11px]">11 Month Plan</span>
                              <span className="ml-1 text-[10px] text-emerald-400 font-semibold">[1 Month Free]</span>
                            </div>
                            <span className="font-mono font-bold text-white">₹7,777</span>
                          </div>
                        </>
                      )}

                      {plan.id === 'plan-749' && (
                        <>
                          <div
                            onClick={() => setSelectedCycle('1m')}
                            className={`flex items-center justify-between p-1.5 px-2 rounded-lg border cursor-pointer transition-colors ${
                              selectedCycle === '1m'
                                ? 'bg-rose-950/40 border-rose-600/80 text-white'
                                : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                            }`}
                          >
                            <span className="text-[11px]">1 Month Plan</span>
                            <span className="font-mono font-bold text-white">₹1,356</span>
                          </div>
                          <div
                            onClick={() => setSelectedCycle('3m')}
                            className={`flex items-center justify-between p-1.5 px-2 rounded-lg border cursor-pointer transition-colors ${
                              selectedCycle === '3m'
                                ? 'bg-rose-950/40 border-rose-600/80 text-white'
                                : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                            }`}
                          >
                            <span className="text-[11px]">3 Month Plan</span>
                            <span className="font-mono font-bold text-white">₹2,652</span>
                          </div>
                          <div
                            onClick={() => setSelectedCycle('6m')}
                            className={`flex items-center justify-between p-1.5 px-2 rounded-lg border cursor-pointer transition-colors ${
                              selectedCycle === '6m'
                                ? 'bg-rose-950/40 border-rose-600/80 text-white'
                                : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                            }`}
                          >
                            <div>
                              <span className="text-[11px]">6 Month Plan</span>
                              <span className="ml-1 text-[10px] text-emerald-400 font-semibold">[15 days free]</span>
                            </div>
                            <span className="font-mono font-bold text-white">₹5,304</span>
                          </div>
                          <div
                            onClick={() => setSelectedCycle('11m')}
                            className={`flex items-center justify-between p-1.5 px-2 rounded-lg border cursor-pointer transition-colors ${
                              selectedCycle === '11m' || selectedCycle === '12m'
                                ? 'bg-rose-950/40 border-rose-600/80 text-white'
                                : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                            }`}
                          >
                            <div>
                              <span className="text-[11px]">11 Month Plan</span>
                              <span className="ml-1 text-[10px] text-emerald-400 font-semibold">[1 Month Free]</span>
                            </div>
                            <span className="font-mono font-bold text-white">₹9,724</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Plan Features */}
                  <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5">
                    {plan.features.slice(2, 5).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-5 pt-3 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlan(plan, pricing.applicableCycle);
                    }}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                      isHighlight
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                    }`}
                  >
                    <span>Book {plan.name} ({plan.speedMbps} Mbps)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Horizontal Scroll Indicator & Interactive Quick-Jump Pills (< md) */}
        {mobileLayout === 'swipe' && filteredPlans.length > 1 && (
          <div className="md:hidden mt-4 flex flex-col items-center gap-2.5">
            {/* Prev / Dots / Next Controls */}
            <div className="flex items-center justify-between w-full max-w-sm px-2">
              <button
                type="button"
                onClick={() => scrollToPlan(Math.max(0, activePlanIndex - 1))}
                disabled={activePlanIndex === 0}
                aria-label="Previous broadband plan"
                className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Interactive Swipe Indicator Pills */}
              <div className="flex items-center gap-1.5">
                {filteredPlans.map((p, dotIdx) => {
                  const isActive = activePlanIndex === dotIdx;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => scrollToPlan(dotIdx)}
                      aria-label={`Jump to ${p.name} (${p.speedMbps} Mbps)`}
                      className={`transition-all duration-300 rounded-full flex items-center justify-center cursor-pointer select-none ${
                        isActive
                          ? 'px-3 py-1 bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-950/50'
                          : 'px-2 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 text-[11px]'
                      }`}
                    >
                      {isActive ? (
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>{p.speedMbps} Mbps</span>
                        </span>
                      ) : (
                        <span>{p.speedMbps}M</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollToPlan(Math.min(filteredPlans.length - 1, activePlanIndex + 1))}
                disabled={activePlanIndex === filteredPlans.length - 1}
                aria-label="Next broadband plan"
                className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Subtle swipe hint indicator */}
            <div className="text-[11px] text-neutral-400 font-medium">
              Plan {activePlanIndex + 1} of {filteredPlans.length} · Tap any card or pill to select
            </div>
          </div>
        )}

        {/* Free Dual Band Router & Zero Installation Banner */}
        <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
              <Gift className="w-4 h-4" />
              <span>Doorstep Installation & Hardware Perks</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Zero Installation Fee & Free Wi-Fi Router Use
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl">
              Pay no router equipment deposit on 3-Month, 6-Month, or 11-Month subscriptions. Plus, get <strong>15 Days Free</strong> on 6-Month plans and <strong>1 Full Month Free</strong> on 11-Month plans!
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectPlan(BROADBAND_PLANS[1] || BROADBAND_PLANS[0], '6m')}
            className="px-6 py-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors whitespace-nowrap shadow-sm shrink-0 cursor-pointer"
          >
            Book with Free 15 Days Offer
          </button>
        </div>

      </div>
    </section>
  );
};
