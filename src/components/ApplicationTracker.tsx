import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, User, Phone, MapPin, AlertCircle, Trash2 } from 'lucide-react';
import { BookingLead } from '../types';

interface ApplicationTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  leads: BookingLead[];
  onOpenBooking: () => void;
  onDeleteBooking?: (id: string) => void;
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  isOpen,
  onClose,
  leads,
  onOpenBooking,
  onDeleteBooking,
}) => {
  const [query, setQuery] = useState('');
  const [searchedLead, setSearchedLead] = useState<BookingLead | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;

    const found = leads.find(
      (l) => l.id.toLowerCase() === q || l.mobile.includes(q)
    );

    setSearchedLead(found || null);
    setSearched(true);
  };

  const getTimelineSteps = (status: BookingLead['status']) => {
    const steps = [
      { key: 'New', label: 'Order Registered', done: true },
      { key: 'Feasibility Checked', label: 'DP Box Feasibility Passed', done: status !== 'New' },
      {
        key: 'Technician Assigned',
        label: 'Field Technician Assigned',
        done: status === 'Technician Assigned' || status === 'Installed',
      },
      { key: 'Installed', label: 'Fiber Wi-Fi Activated', done: status === 'Installed' },
    ];
    return steps;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl my-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Close</span>
        </button>

        <div className="border-b border-neutral-800 pb-4">
          <div className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
            Live Order Status
          </div>
          <h3 className="font-display text-2xl font-bold text-white mt-1">
            Track Your Connection Order
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Enter your 10-digit mobile number or Application Reference ID (e.g. HW-2026-89101).
          </p>
        </div>

        <form onSubmit={handleSearch} className="mt-5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Mobile number or HW-2026-XXXXX"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearched(false);
                }}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Track
            </button>
          </div>
        </form>

        {searched && (
          <div className="mt-6">
            {searchedLead ? (
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div>
                    <div className="text-xs text-neutral-400">Application ID</div>
                    <div className="font-mono text-base font-bold text-rose-400">{searchedLead.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-neutral-400">Current Status</div>
                    <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                      {searchedLead.status}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-400">Customer: </span>
                    <strong className="text-white">{searchedLead.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400">Speed Plan: </span>
                    <strong className="text-white">{searchedLead.planName}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400">City / Pincode: </span>
                    <span className="text-neutral-200">{searchedLead.city} ({searchedLead.pincode})</span>
                  </div>
                  <div>
                    <span className="text-neutral-400">Scheduled Slot: </span>
                    <span className="text-emerald-400 font-medium">{searchedLead.installationSlot}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="pt-2 border-t border-neutral-800">
                  <div className="text-xs font-medium text-neutral-300 mb-3">Installation Progression:</div>
                  <div className="space-y-3">
                    {getTimelineSteps(searchedLead.status).map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            step.done
                              ? 'bg-emerald-900/60 text-emerald-400 border border-emerald-700'
                              : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className={step.done ? 'text-white font-medium' : 'text-neutral-500'}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {searchedLead.notes && (
                  <div className="rounded-lg bg-neutral-950 p-3 border border-neutral-800 text-xs text-neutral-300">
                    <span className="text-neutral-400">Technician Dispatch Note: </span>
                    {searchedLead.notes}
                  </div>
                )}

                {onDeleteBooking && (
                  <div className="pt-2 border-t border-neutral-800 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure you want to cancel and remove booking ${searchedLead.id}?`)) {
                          onDeleteBooking(searchedLead.id);
                          setSearchedLead(null);
                          setSearched(false);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-900/60 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Cancel & Remove This Booking</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-5 text-center">
                <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <div className="text-sm font-semibold text-white">No Active Order Found</div>
                <p className="text-xs text-neutral-400 mt-1">
                  We could not find an existing booking for &ldquo;{query}&rdquo;.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Book New Connection Now
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
