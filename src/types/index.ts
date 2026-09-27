export type BillingCycle = '1m' | '3m' | '6m' | '11m' | '12m';

export interface PlanPricingDetail {
  total: number;
  bonusText?: string;
  available: boolean;
}

export interface Plan {
  id: string;
  name: string;
  speedMbps: number;
  monthlyPrice: number;
  threeMonthPrice: number;
  sixMonthPrice: number;
  elevenMonthPrice: number;
  twelveMonthPrice: number;
  popular?: boolean;
  bestValue?: boolean;
  category: 'starter' | 'value' | 'pro' | 'ultra' | 'giga';
  tagline: string;
  features: string[];
  ottApps?: string[];
  hasFreeRouterOn: '1m' | '3m' | '6m' | '11m' | '12m';
  freeInstallationOn: '1m' | '3m' | '6m' | '11m' | '12m';
  extraValidityDaysOnSixMonth?: number;
  extraValidityMonthsOnAnnual: number;
  pricing: {
    '1m'?: PlanPricingDetail;
    '3m'?: PlanPricingDetail;
    '6m': PlanPricingDetail;
    '11m'?: PlanPricingDetail;
    '12m'?: PlanPricingDetail;
  };
}

export interface BookingLead {
  id: string;
  fullName: string;
  mobile: string;
  email?: string;
  city: string;
  pincode: string;
  fullAddress: string;
  planId: string;
  planName: string;
  planSpeed: number;
  billingCycle: '1m' | '3m' | '6m' | '11m' | '12m';
  estimatedAmount: number;
  installationSlot: string;
  includeTvBox: boolean;
  status: 'New' | 'Feasibility Checked' | 'Technician Assigned' | 'Installed' | 'Cancelled';
  referralCode?: string;
  referralDiscountApplied?: number;
  notes?: string;
  createdAt: string;
}

export interface CoverageZone {
  city: string;
  shortName?: string;
  state: string;
  pincodes: string[];
  status: 'High Coverage' | 'Full FTTH' | 'Expanding';
  averageInstallTimeHours: number;
  serviceCenterPhone: string;
}

export interface SupportTicket {
  id: string; // e.g. CMP-2026-10492 or DBT-2026-10492
  type: 'doubt' | 'complaint';
  category: string;
  fullName: string;
  mobile: string;
  accountNumber?: string;
  city: string;
  address?: string;
  subject: string;
  description: string;
  priority: 'Normal' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  assignedEngineer?: string;
  resolutionNotes?: string;
}
