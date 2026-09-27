import React, { useState } from 'react';
import { Laptop, Smartphone, Tv, Gamepad2, Users, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { BROADBAND_PLANS } from '../data/mockData';
import { Plan, BillingCycle } from '../types';

interface SpeedQuizProps {
  onSelectRecommendedPlan: (plan: Plan, cycle: BillingCycle) => void;
}

export const SpeedQuiz: React.FC<SpeedQuizProps> = ({ onSelectRecommendedPlan }) => {
  const [deviceCount, setDeviceCount] = useState<'few' | 'medium' | 'high' | 'ultra'>('medium');
  const [primaryActivity, setPrimaryActivity] = useState<'basic' | 'streaming' | 'gaming' | 'heavy'>('streaming');

  // Recommendation algorithm
  const getRecommendation = () => {
    let targetSpeed = 100;

    if (deviceCount === 'few' && primaryActivity === 'basic') {
      targetSpeed = 25;
    } else if (deviceCount === 'few' || primaryActivity === 'basic') {
      targetSpeed = 40;
    } else if (deviceCount === 'medium' && primaryActivity === 'streaming') {
      targetSpeed = 100;
    } else if (primaryActivity === 'gaming' || deviceCount === 'high') {
      targetSpeed = 100;
    }

    if (deviceCount === 'ultra' || primaryActivity === 'heavy') {
      targetSpeed = 200;
    }

    const matchedPlan = BROADBAND_PLANS.find((p) => p.speedMbps === targetSpeed) || BROADBAND_PLANS[2];

    // Download time for 50GB game
    const secondsFor50Gb = Math.round((50 * 1024 * 8) / targetSpeed);
    const minutesFor50Gb = Math.round(secondsFor50Gb / 60);

    return {
      plan: matchedPlan,
      minutesFor50Gb,
      targetSpeed,
    };
  };

  const rec = getRecommendation();

  return (
    <section id="recommender" className="py-16 sm:py-20 border-b border-neutral-800 bg-neutral-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-500">
            Interactive Speed Matcher
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Find Your Ideal Bandwidth in 30 Seconds
          </h2>
          <p className="mt-2 text-neutral-400 text-sm">
            Answer 3 quick questions about your household habits to get an exact speed recommendation without overpaying.
          </p>
        </div>

        <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Question Flow */}
          <div className="lg:col-span-7 space-y-6 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-7 shadow-lg">
            
            {/* Step 1: Device Count */}
            <div>
              <div className="text-xs font-semibold text-neutral-300 flex items-center justify-between mb-2.5">
                <span>1. How many devices connect simultaneously?</span>
                <span className="text-rose-400 font-mono">Step 1/2</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'few', label: '1 - 2 Devices', sub: 'Solo User' },
                  { id: 'medium', label: '3 - 5 Devices', sub: 'Family / Flat' },
                  { id: 'high', label: '6 - 9 Devices', sub: 'Busy Home' },
                  { id: 'ultra', label: '10+ Devices', sub: 'Smart Home' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDeviceCount(item.id as any)}
                    className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                      deviceCount === item.id
                        ? 'border-rose-600 bg-rose-950/20 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="text-xs font-medium text-white">{item.label}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Primary Activity */}
            <div>
              <div className="text-xs font-semibold text-neutral-300 flex items-center justify-between mb-2.5">
                <span>2. What is your heaviest internet use?</span>
                <span className="text-rose-400 font-mono">Step 2/2</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    id: 'basic',
                    title: 'Browsing & Social Media',
                    desc: 'Emails, WhatsApp calls, Youtube 1080p',
                  },
                  {
                    id: 'streaming',
                    title: 'Work From Home & 4K Streaming',
                    desc: 'Zoom/Teams calls, Netflix 4K HDR',
                  },
                  {
                    id: 'gaming',
                    title: 'Online Multiplayer & Gaming',
                    desc: 'Low-latency ping (<5ms), PS5 / PC games',
                  },
                  {
                    id: 'heavy',
                    title: 'Heavy Downloads & Content Creation',
                    desc: 'Large cloud files, 4K rendering, live streams',
                  },
                ].map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setPrimaryActivity(act.id as any)}
                    className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                      primaryActivity === act.id
                        ? 'border-rose-600 bg-rose-950/20 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{act.title}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{act.desc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Recommendation Output Card */}
          <div className="lg:col-span-5 rounded-2xl border-2 border-rose-600/80 bg-neutral-950 p-6 sm:p-7 shadow-xl shadow-rose-950/20">
            <div className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
              Calculated Recommendation
            </div>
            
            <h3 className="font-display text-2xl font-bold text-white mt-1">
              {rec.plan.name}
            </h3>
            
            <p className="text-xs text-neutral-400 mt-1">
              {rec.plan.tagline}
            </p>

            <div className="mt-5 rounded-xl bg-neutral-900 p-4 border border-neutral-800">
              <div className="flex items-baseline justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs text-neutral-400">Recommended Bandwidth</span>
                <span className="font-mono text-2xl font-bold text-white tabular-nums">
                  {rec.targetSpeed} <span className="text-xs text-rose-400">Mbps</span>
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Monthly Base Rate:</span>
                  <span className="font-mono text-white font-medium">₹{rec.plan.monthlyPrice}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">6-Month Package:</span>
                  <span className="font-mono text-white font-medium">₹{rec.plan.sixMonthPrice} Payment</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Est. 50GB Game Download:</span>
                  <span className="font-mono text-emerald-400 font-medium">~{rec.minutesFor50Gb} Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Free Wi-Fi Router Use:</span>
                  <span className="text-emerald-400 font-medium">Included (₹0 Fee)</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => onSelectRecommendedPlan(rec.plan, '6m')}
                className="w-full py-3 px-4 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Select & Book {rec.plan.name} ({rec.plan.speedMbps} Mbps)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
