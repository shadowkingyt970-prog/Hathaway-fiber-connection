import React from 'react';
import { Star, ShieldCheck, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Kavitha Sundaram',
      role: 'Product Lead & Remote Tech Consultant',
      location: 'T. Nagar, Chennai',
      metric: 'Zero Installation Fee & Free Dual-Band Router',
      comment:
        'Switched our home office connection to Hathway Optical Fiber in T. Nagar. The local technician arrived on our preferred morning slot, installed the dual-band Wi-Fi router cleanly, and verified 200 Mbps symmetric speeds on all devices. Seamless work-from-home experience.',
    },
    {
      name: 'Dr. K. Senthil Nathan',
      role: 'Senior Medical Consultant',
      location: 'Anna Nagar West, Chennai',
      metric: '298 Mbps Constant Optical Bandwidth',
      comment:
        'Needed ultra-stable high-speed internet for telehealth video consultations and 4K family streaming in Anna Nagar. Got the 200 Mbps plan with free dual-band router. The speeds are genuinely symmetric and the doorstep cabling was finished with zero mess.',
    },
    {
      name: 'R. Ashwin Karthik',
      role: 'Independent Game Developer & Cloud Engineer',
      location: 'Velachery & OMR IT Corridor, Chennai',
      metric: 'Sub-4ms Latency & High-Speed Optical Routing',
      comment:
        'The optical routing is phenomenal across South India gateways. Downloading 80GB Unreal Engine assets in under 40 minutes with zero packet drop. Having direct WhatsApp contact with the local franchisee desk (+91 8870085269) gives complete peace of mind.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-500">
            Real Customer Experience
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Trusted by Over 10,000+ Homes in Chennai & Metro Hubs
          </h2>
          <p className="mt-2 text-neutral-400 text-sm">
            Read direct feedback from families, remote engineers, and creators on our optical fiber network in Chennai and neighboring hubs.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Stars and verified marker */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Installation</span>
                  </div>
                </div>

                {/* Quantitative Metric */}
                <div className="mt-4 font-mono text-xs font-bold text-rose-400">
                  {rev.metric}
                </div>

                <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Attribution */}
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <div className="font-display text-sm font-bold text-white">
                  {rev.name}
                </div>
                <div className="text-xs text-neutral-400">
                  {rev.role}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
