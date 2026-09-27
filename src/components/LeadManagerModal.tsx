import React, { useState } from 'react';
import {
  X,
  Search,
  Phone,
  MessageSquare,
  Download,
  Plus,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  UserCheck,
  Calendar,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { BookingLead } from '../types';

interface LeadManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: BookingLead[];
  onUpdateLeadStatus: (leadId: string, newStatus: BookingLead['status'], notes?: string) => void;
  onAddNewManualLead: (lead: BookingLead) => void;
  onClearAllLeads?: () => void;
  onDeleteLead?: (leadId: string) => void;
}

export const LeadManagerModal: React.FC<LeadManagerModalProps> = ({
  isOpen,
  onClose,
  leads,
  onUpdateLeadStatus,
  onAddNewManualLead,
  onClearAllLeads,
  onDeleteLead,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [statusInput, setStatusInput] = useState<BookingLead['status']>('New');
  const [showAddForm, setShowAddForm] = useState(false);

  // Manual Add Form states
  const [manualName, setManualName] = useState('');
  const [manualMobile, setManualMobile] = useState('');
  const [manualCity, setManualCity] = useState('Chennai - Central (Anna Nagar, Kilpauk, Aminjikarai)');
  const [manualPincode, setManualPincode] = useState('600040');
  const [manualAddress, setManualAddress] = useState('');
  const [manualSpeed, setManualSpeed] = useState<number>(100);

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      lead.fullName.toLowerCase().includes(q) ||
      lead.mobile.includes(q) ||
      lead.pincode.includes(q) ||
      lead.city.toLowerCase().includes(q) ||
      lead.id.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const exportCsv = () => {
    const headers = [
      'Application ID',
      'Customer Name',
      'Mobile',
      'City',
      'Pincode',
      'Address',
      'Plan Name',
      'Speed (Mbps)',
      'Billing Tenure',
      'Est. Amount',
      'Slot',
      'Cable TV',
      'Status',
      'Notes',
      'Registered Date',
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.fullName}"`,
      `"${l.mobile}"`,
      `"${l.city}"`,
      `"${l.pincode}"`,
      `"${l.fullAddress.replace(/"/g, '""')}"`,
      `"${l.planName}"`,
      l.planSpeed,
      `"${l.billingCycle}"`,
      l.estimatedAmount,
      `"${l.installationSlot}"`,
      l.includeTvBox ? 'Yes' : 'No',
      `"${l.status}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${l.createdAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hathway_chennai_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStartEdit = (lead: BookingLead) => {
    setEditingLeadId(lead.id);
    setStatusInput(lead.status);
    setNoteInput(lead.notes || '');
  };

  const handleSaveStatus = (leadId: string) => {
    onUpdateLeadStatus(leadId, statusInput, noteInput);
    setEditingLeadId(null);
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualMobile || manualMobile.length !== 10) return;

    const newLead: BookingLead = {
      id: `HW-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName: manualName.trim(),
      mobile: manualMobile.trim(),
      city: manualCity,
      pincode: manualPincode,
      fullAddress: manualAddress.trim() || 'Address taken on call',
      planId: `plan-${manualSpeed}`,
      planName: `Fiber ${manualSpeed}`,
      planSpeed: manualSpeed,
      billingCycle: '3m',
      estimatedAmount: manualSpeed === 50 ? 1399 : manualSpeed === 100 ? 1799 : manualSpeed === 150 ? 2249 : 2699,
      installationSlot: 'Morning Slot (9 AM - 1 PM)',
      includeTvBox: false,
      status: 'New',
      notes: 'Added manually via Phone / Walk-in booking.',
      createdAt: new Date().toLocaleString(),
    };

    onAddNewManualLead(newLead);
    setShowAddForm(false);
    setManualName('');
    setManualMobile('');
    setManualAddress('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-7 shadow-2xl my-6 flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                Franchisee Lead & Dispatch CRM
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live Chennai customer connection applications, feasibility checks, and technician assignments. Partner Desk: <a href="mailto:hathwayfiberconnect@gmail.com" className="text-rose-400 hover:underline">hathwayfiberconnect@gmail.com</a>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onClearAllLeads && leads.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to reset and clear all connection bookings? This will clear all data.')) {
                    onClearAllLeads();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-red-900/60 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-medium transition-colors cursor-pointer"
                title="Reset and clear all customer bookings"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Reset All</span>
              </button>
            )}

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-rose-400" />
              <span>{showAddForm ? 'Cancel Add' : 'Add Manual Lead'}</span>
            </button>

            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Leads CSV ({leads.length})</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>

        {/* Manual Add Lead Drawer */}
        {showAddForm && (
          <form onSubmit={handleCreateManualLead} className="my-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/90 space-y-3">
            <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
              Quick Inbound Lead Entry (Phone / Walk-in)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Customer Name *"
                required
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-xs text-white"
              />
              <input
                type="tel"
                maxLength={10}
                placeholder="10-digit Mobile *"
                required
                value={manualMobile}
                onChange={(e) => setManualMobile(e.target.value.replace(/\D/g, ''))}
                className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-xs text-white font-mono"
              />
              <select
                value={manualSpeed}
                onChange={(e) => setManualSpeed(Number(e.target.value))}
                className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-xs text-white"
              >
                <option value={50}>50 Mbps (Basic)</option>
                <option value={100}>100 Mbps (Standard)</option>
                <option value={150}>150 Mbps (Pro)</option>
                <option value={200}>200 Mbps (Turbo)</option>
                <option value={300}>300 Mbps (Giga Max)</option>
              </select>
              <input
                type="text"
                maxLength={6}
                placeholder="Pincode"
                value={manualPincode}
                onChange={(e) => setManualPincode(e.target.value)}
                className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-xs text-white font-mono"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Installation Address (Flat / Door No, Apartment, Street)"
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                className="flex-1 rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-xs text-white"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
              >
                Save Inbound Lead
              </button>
            </div>
          </form>
        )}

        {/* Filter Bar & Search */}
        <div className="py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-b border-neutral-800/80">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Search by ID, name, mobile, pincode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 text-xs">
              <Filter className="w-3.5 h-3.5 text-neutral-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="all">All Statuses ({leads.length})</option>
                <option value="New">New</option>
                <option value="Feasibility Checked">Feasibility Checked</option>
                <option value="Technician Assigned">Technician Assigned</option>
                <option value="Installed">Installed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-neutral-400 flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>{leads.filter(l => l.status === 'New').length} New</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>{leads.filter(l => l.status === 'Technician Assigned').length} In Dispatch</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{leads.filter(l => l.status === 'Installed').length} Installed</span>
            </span>
          </div>
        </div>

        {/* Leads Table List */}
        <div className="flex-1 overflow-y-auto mt-2 pr-1">
          {filteredLeads.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-400">
              No matching connection leads found.
            </div>
          ) : (
            <div className="divide-y divide-neutral-800/80">
              {filteredLeads.map((lead) => {
                const isEditing = editingLeadId === lead.id;

                return (
                  <div key={lead.id} className="py-3 px-2 hover:bg-neutral-900/40 rounded-lg transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                      {/* Customer Details */}
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white">
                            {lead.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              lead.status === 'Installed'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                                : lead.status === 'Technician Assigned'
                                ? 'bg-blue-950 text-blue-400 border border-blue-800/60'
                                : lead.status === 'Feasibility Checked'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                                : lead.status === 'Cancelled'
                                ? 'bg-neutral-800 text-neutral-400'
                                : 'bg-rose-950 text-rose-300 border border-rose-800/60'
                            }`}
                          >
                            {lead.status}
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            {lead.createdAt}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-300">
                          <span className="text-white font-medium">{lead.fullName}</span>
                          <span>·</span>
                          <span className="font-mono text-neutral-400">+91 {lead.mobile}</span>
                          <span>·</span>
                          <span>{lead.city} ({lead.pincode})</span>
                        </div>

                        <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-x-3">
                          <span className="text-rose-400 font-semibold">{lead.planSpeed} Mbps ({lead.planName})</span>
                          <span>·</span>
                          <span>Tenure: {lead.billingCycle.toUpperCase()} (₹{lead.estimatedAmount})</span>
                          <span>·</span>
                          <span className="text-neutral-300 font-mono text-[11px]">{lead.installationSlot}</span>
                        </div>

                        <div className="text-xs text-neutral-400">
                          <span>Address: </span>
                          <span className="text-neutral-300">{lead.fullAddress}</span>
                        </div>

                        {lead.notes && (
                          <div className="text-[11px] text-amber-400/90 italic bg-neutral-900/60 p-1.5 rounded border border-neutral-800/60 mt-1">
                            Dispatch Note: {lead.notes}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`tel:+91${lead.mobile}`}
                          className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={`https://wa.me/91${lead.mobile}?text=${encodeURIComponent(
                            `Hello ${lead.fullName}, this is Hathway Authorized Dispatch coordinator. Regarding your connection request ${lead.id} for ${lead.planSpeed} Mbps in ${lead.city}, our technician is ready to visit.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/60 transition-colors"
                          title="WhatsApp Customer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => {
                            if (isEditing) {
                              setEditingLeadId(null);
                            } else {
                              handleStartEdit(lead);
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium transition-colors cursor-pointer"
                        >
                          {isEditing ? 'Cancel' : 'Update Status'}
                        </button>

                        {onDeleteLead && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete and remove booking ${lead.id} for ${lead.fullName}?`)) {
                                onDeleteLead(lead.id);
                              }
                            }}
                            className="p-2 rounded-lg bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 border border-neutral-800 hover:border-red-800/60 transition-colors cursor-pointer"
                            title="Remove this booking"
                            aria-label="Remove this booking"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inline Editor */}
                    {isEditing && (
                      <div className="mt-3 p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
                        <select
                          value={statusInput}
                          onChange={(e) => setStatusInput(e.target.value as any)}
                          className="rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-white"
                        >
                          <option value="New">New</option>
                          <option value="Feasibility Checked">Feasibility Checked</option>
                          <option value="Technician Assigned">Technician Assigned</option>
                          <option value="Installed">Installed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <input
                          type="text"
                          placeholder="Dispatch note (e.g. Assigned technician Murugan for 10 AM visit)"
                          value={noteInput}
                          onChange={(e) => setNoteInput(e.target.value)}
                          className="flex-1 rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-white placeholder-neutral-500"
                        />

                        <button
                          onClick={() => handleSaveStatus(lead.id)}
                          className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer"
                        >
                          Save Update
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
