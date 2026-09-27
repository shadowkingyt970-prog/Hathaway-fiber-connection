/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeasibilityChecker } from './components/FeasibilityChecker';
import { PlansSection } from './components/PlansSection';
import { SpeedQuiz } from './components/SpeedQuiz';
import { SpeedTestSimulator } from './components/SpeedTestSimulator';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ApplicationTracker } from './components/ApplicationTracker';
import { LeadManagerModal } from './components/LeadManagerModal';
import { WebsiteLinkModal } from './components/WebsiteLinkModal';
import { FloatingCta } from './components/FloatingCta';
import { BroadbandMascot } from './components/BroadbandMascot';
import { INITIAL_LEADS, BROADBAND_PLANS } from './data/mockData';
import { BookingLead, Plan } from './types';

const LEADS_STORAGE_KEY = 'hathway_booking_leads_clean_v3';
const THEME_STORAGE_KEY = 'hathway_theme_preference';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch (e) {
      console.error('Failed to load theme preference', e);
    }
    return 'dark';
  });

  const [leads, setLeads] = useState<BookingLead[]>(() => {
    try {
      // Purge any old test bookings from previous sessions
      localStorage.removeItem('hathway_booking_leads_clean_v2');
      localStorage.removeItem('hathway_booking_leads_v1');
      localStorage.removeItem('hathway_support_tickets_v1');

      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load leads from localStorage', e);
    }
    return [];
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isCrmOpen, setIsCrmOpen] = useState(false);
  const [isWebsiteLinksOpen, setIsWebsiteLinksOpen] = useState(false);

  const [bookingPlanId, setBookingPlanId] = useState<string>('plan-599');
  const [bookingCycle, setBookingCycle] = useState<'1m' | '3m' | '6m' | '11m' | '12m'>('6m');
  const [prefilledMobile, setPrefilledMobile] = useState('');
  const [prefilledPincode, setPrefilledPincode] = useState('');

  const [notification, setNotification] = useState<string | null>(null);

  // Sync theme to document element and localStorage
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.error('Failed to save theme preference', e);
    }

    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showNotification(
        next === 'light'
          ? 'Switched to High-Contrast Light Mode for enhanced readability'
          : 'Switched to Dark Mode'
      );
      return next;
    });
  };

  // Sync leads to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to save leads', e);
    }
  }, [leads]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleOpenBooking = (
    planId?: string,
    prefill?: { mobile?: string; pincode?: string; cycle?: '1m' | '3m' | '6m' | '11m' | '12m' }
  ) => {
    if (planId) setBookingPlanId(planId);
    if (prefill?.cycle) setBookingCycle(prefill.cycle);
    if (prefill?.mobile) setPrefilledMobile(prefill.mobile);
    if (prefill?.pincode) setPrefilledPincode(prefill.pincode);
    setIsBookingOpen(true);
  };

  const handleSelectPlan = (plan: Plan, cycle: '1m' | '3m' | '6m' | '11m' | '12m') => {
    setBookingPlanId(plan.id);
    setBookingCycle(cycle);
    setIsBookingOpen(true);
  };

  const handleLeadCreated = (newLead: BookingLead) => {
    setLeads((prev) => [newLead, ...prev]);
    showNotification(`Booking registered with ID ${newLead.id}! Technician dispatch in progress.`);
  };

  const handleUpdateLeadStatus = (
    leadId: string,
    newStatus: BookingLead['status'],
    notes?: string
  ) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            status: newStatus,
            notes: notes !== undefined ? notes : lead.notes,
          };
        }
        return lead;
      })
    );
    showNotification(`Lead ${leadId} status updated to "${newStatus}"`);
  };

  const handleAddManualLead = (newLead: BookingLead) => {
    setLeads((prev) => [newLead, ...prev]);
    showNotification(`Inbound lead ${newLead.id} added to CRM`);
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
    showNotification(`Booking ${leadId} removed successfully.`);
  };

  const handleClearAllLeads = () => {
    setLeads([]);
    try {
      localStorage.removeItem(LEADS_STORAGE_KEY);
      localStorage.removeItem('hathway_booking_leads_clean_v2');
      localStorage.removeItem('hathway_booking_leads_v1');
      localStorage.removeItem('hathway_support_tickets_v1');
    } catch (e) {
      console.error('Failed to clear storage', e);
    }
    showNotification('All connection bookings have been cleared.');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white overflow-x-hidden">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 max-w-sm rounded-xl border border-rose-600/80 bg-neutral-900/95 p-4 text-xs text-white shadow-2xl backdrop-blur-md animate-fade-in flex items-center justify-between gap-3">
          <span>{notification}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-neutral-400 hover:text-white font-mono cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenCrm={() => setIsCrmOpen(true)}
        onOpenWebsiteLinks={() => setIsWebsiteLinksOpen(true)}
        crmLeadCount={leads.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 pb-16 sm:pb-0">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onScrollToPlans={() => scrollToSection('plans')}
          onScrollToCoverage={() => scrollToSection('coverage')}
        />

        {/* Live Chennai Area & Pincode Feasibility */}
        <FeasibilityChecker
          onSelectPincodeForBooking={(pincode, city) =>
            handleOpenBooking('plan-599', { pincode, cycle: '6m' })
          }
        />

        {/* Transparent Fiber Tariff Plans & Tenures */}
        <PlansSection onSelectPlan={handleSelectPlan} />

        {/* Interactive Speed Matcher Quiz */}
        <SpeedQuiz onSelectRecommendedPlan={handleSelectPlan} />

        {/* Real-time FTTH Speed Test Simulator */}
        <SpeedTestSimulator />

        {/* 4-Step Installation & Doorstep Activation Guide */}
        <ProcessSection />

        {/* Quantitative Proof & Reviews */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenCrm={() => setIsCrmOpen(true)}
        onOpenWebsiteLinks={() => setIsWebsiteLinksOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Animated Broadband Mascot: OptiBot */}
      <BroadbandMascot
        onOpenBooking={() => handleOpenBooking()}
        onScrollToCoverage={() => scrollToSection('coverage')}
      />

      {/* Floating CTAs */}
      <FloatingCta
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Booking Modal with Speed & Wi-Fi Router Selection */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPlanId={bookingPlanId}
        initialCycle={bookingCycle}
        initialMobile={prefilledMobile}
        initialPincode={prefilledPincode}
        onLeadCreated={handleLeadCreated}
      />

      {/* Order Status Tracker */}
      <ApplicationTracker
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        leads={leads}
        onOpenBooking={() => {
          setIsTrackerOpen(false);
          handleOpenBooking();
        }}
        onDeleteBooking={handleDeleteLead}
      />

      {/* Franchisee Lead Management CRM */}
      <LeadManagerModal
        isOpen={isCrmOpen}
        onClose={() => setIsCrmOpen(false)}
        leads={leads}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        onAddNewManualLead={handleAddManualLead}
        onClearAllLeads={handleClearAllLeads}
        onDeleteLead={handleDeleteLead}
      />

      {/* Official Website Links & Custom Domain Manager */}
      <WebsiteLinkModal
        isOpen={isWebsiteLinksOpen}
        onClose={() => setIsWebsiteLinksOpen(false)}
      />

    </div>
  );
}
