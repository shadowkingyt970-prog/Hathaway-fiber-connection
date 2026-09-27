import React from 'react';
import { FileText, CheckCircle2, ShieldAlert, Cpu, Wrench, Sparkles } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-16 sm:py-24 border-b border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-500">
            Hassle-Free Activation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            How Your New Connection Gets Installed
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            From online request to live fiber Wi-Fi at your chosen time slot. No tedious paperwork or weeks of waiting.
          </p>
        </div>

        {/* 4-Step Flow with Editorial Numbering (Constitution compliant) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="text-rose-500 font-mono text-sm font-bold">01.</div>
              <h3 className="font-display text-base font-bold text-white mt-2">
                Choose Plan & Slot
              </h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Select your desired bandwidth (100–300 Mbps) and preferred installation slot (Morning, Afternoon, or Evening).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-400">
              Takes ~1 Minute online
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="text-rose-500 font-mono text-sm font-bold">02.</div>
              <h3 className="font-display text-base font-bold text-white mt-2">
                Instant Verification
              </h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Our local partner desk verifies line availability on your street and shares technician assignment over WhatsApp & SMS.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-400">
              Feasibility verified in 15 mins
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="text-rose-500 font-mono text-sm font-bold">03.</div>
              <h3 className="font-display text-base font-bold text-white mt-2">
                Fiber Cable & Router Setup
              </h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Certified field engineer pulls pure optical fiber cable directly into your premises and connects the Gigabit Dual-Band router.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-400">
              Clean concealed cabling
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="text-rose-500 font-mono text-sm font-bold">04.</div>
              <h3 className="font-display text-base font-bold text-white mt-2">
                Live Speed Test & Handover
              </h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Technician conducts live Ookla speed test in front of you. Once satisfied with full bandwidth, connection is handed over.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-emerald-400 font-medium">
              Pay securely after activation
            </div>
          </div>

        </div>

        {/* Documentation / KYC Box */}
        <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400">
                <FileText className="w-4 h-4" />
                <span>Zero-Paperwork KYC Checklist</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                Only 2 Digital Documents Required
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                Govt. regulations require basic identity and address verification before enabling broadband optical service. Keep any one from each group handy:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-1/2">
              <div className="rounded-xl bg-neutral-950 p-4 border border-neutral-800">
                <div className="text-xs font-semibold text-white mb-2">1. Proof of Identity (Any One)</div>
                <ul className="space-y-1 text-xs text-neutral-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Aadhaar Card (Fastest)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Voter ID Card</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Indian Passport or Driving License</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-neutral-950 p-4 border border-neutral-800">
                <div className="text-xs font-semibold text-white mb-2">2. Proof of Address (Any One)</div>
                <ul className="space-y-1 text-xs text-neutral-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Electricity / Utility Bill</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Registered Rent Agreement</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Aadhaar with matching address</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
