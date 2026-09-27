import { Plan, CoverageZone, BookingLead } from '../types';

export const BROADBAND_PLANS: Plan[] = [
  {
    id: 'plan-399',
    name: '399 Plan',
    speedMbps: 25,
    monthlyPrice: 399,
    threeMonthPrice: 1412,
    sixMonthPrice: 2825,
    elevenMonthPrice: 5176,
    twelveMonthPrice: 5176,
    category: 'starter',
    tagline: '25 Mbps Speed Upto · Budget home fiber',
    features: [
      'Up to 25 Mbps Symmetric Optical Bandwidth',
      '6 Month Plan: ₹2,825 Payment Total',
      'Zero Installation Fee',
      'Free Wi-Fi Router Use included',
      'True Unlimited Data without throttling',
      'Doorstep quick fiber connectivity in Chennai',
    ],
    ottApps: [],
    hasFreeRouterOn: '6m',
    freeInstallationOn: '6m',
    extraValidityDaysOnSixMonth: 0,
    extraValidityMonthsOnAnnual: 0,
    pricing: {
      '6m': {
        total: 2825,
        bonusText: 'Zero Installation & Free Wi-Fi Router Use',
        available: true,
      },
      '1m': {
        total: 399,
        bonusText: 'Available on 6-Month contract',
        available: false,
      },
      '3m': {
        total: 1412,
        bonusText: 'Available on 6-Month contract',
        available: false,
      },
      '11m': {
        total: 5176,
        bonusText: 'Annual Contract Option',
        available: false,
      },
      '12m': {
        total: 5176,
        bonusText: 'Annual Contract Option',
        available: false,
      },
    },
  },
  {
    id: 'plan-499',
    name: '499 Plan',
    speedMbps: 40,
    monthlyPrice: 499,
    threeMonthPrice: 2242,
    sixMonthPrice: 3540,
    elevenMonthPrice: 6490,
    twelveMonthPrice: 6490,
    category: 'value',
    tagline: '40 Mbps Speed Upto · 3-4 devices, HD streaming & WFH',
    features: [
      'Up to 40 Mbps Optical Fiber Symmetric Speed',
      '3 Month Plan: ₹2,242 Payment',
      '6 Month Plan: ₹3,540 [15 Days Free Validity]',
      '11 Month Plan: ₹6,490 [1 Month Free Validity]',
      'Zero Installation Charges on 3M+ subscriptions',
      'Free Dual-Band Wi-Fi Router Use included',
    ],
    ottApps: [],
    hasFreeRouterOn: '3m',
    freeInstallationOn: '3m',
    extraValidityDaysOnSixMonth: 15,
    extraValidityMonthsOnAnnual: 1,
    pricing: {
      '3m': {
        total: 2242,
        bonusText: 'Zero Installation & Free Router',
        available: true,
      },
      '6m': {
        total: 3540,
        bonusText: '15 Days Free Validity Included',
        available: true,
      },
      '11m': {
        total: 6490,
        bonusText: '1 Month Free Validity Included',
        available: true,
      },
      '12m': {
        total: 6490,
        bonusText: '1 Month Free Validity Included',
        available: true,
      },
      '1m': {
        total: 499,
        bonusText: 'Standard Activation',
        available: false,
      },
    },
  },
  {
    id: 'plan-599',
    name: '599 Plan',
    speedMbps: 100,
    monthlyPrice: 599,
    threeMonthPrice: 2593,
    sixMonthPrice: 4241,
    elevenMonthPrice: 7777,
    twelveMonthPrice: 7777,
    popular: true,
    category: 'pro',
    tagline: '100 Mbps Speed Upto · Most popular for 4K video & gaming',
    features: [
      'Up to 100 Mbps Pure FTTH Gigabit Pipe',
      '3 Month Plan: ₹2,593 Payment',
      '6 Month Plan: ₹4,241 [15 Days Free Validity]',
      '11 Month Plan: ₹7,777 [1 Month Free Validity]',
      'Dual-Band (2.4GHz + 5GHz) Optical Wi-Fi Router',
      'Zero Installation Fee across multi-month packs',
      'Buffer-free 4K Streaming & Multi-Device Support',
    ],
    ottApps: [],
    hasFreeRouterOn: '3m',
    freeInstallationOn: '3m',
    extraValidityDaysOnSixMonth: 15,
    extraValidityMonthsOnAnnual: 1,
    pricing: {
      '3m': {
        total: 2593,
        bonusText: 'Zero Installation & Free Dual-Band Router',
        available: true,
      },
      '6m': {
        total: 4241,
        bonusText: '15 Days Free Validity Included',
        available: true,
      },
      '11m': {
        total: 7777,
        bonusText: '1 Month Free Validity Included',
        available: true,
      },
      '12m': {
        total: 7777,
        bonusText: '1 Month Free Validity Included',
        available: true,
      },
      '1m': {
        total: 599,
        bonusText: 'Standard Activation',
        available: false,
      },
    },
  },
  {
    id: 'plan-749',
    name: '749 Plan',
    speedMbps: 200,
    monthlyPrice: 749,
    threeMonthPrice: 2652,
    sixMonthPrice: 5304,
    elevenMonthPrice: 9724,
    twelveMonthPrice: 9724,
    bestValue: true,
    category: 'ultra',
    tagline: '200 Mbps Speed Upto · Ultra speed for multi-device & power users',
    features: [
      'Up to 200 Mbps Blazing Optical Fiber Speed',
      '1 Month Plan: ₹1,356 Payment',
      '3 Month Plan: ₹2,652 Payment',
      '6 Month Plan: ₹5,304 [15 Days Free Validity]',
      '11 Month Plan: ₹9,724 [1 Month Free Validity]',
      'Next-Gen High-Power Wi-Fi Router Included',
      'Zero Security Deposit on 3M+ Subscriptions',
    ],
    ottApps: [],
    hasFreeRouterOn: '3m',
    freeInstallationOn: '3m',
    extraValidityDaysOnSixMonth: 15,
    extraValidityMonthsOnAnnual: 1,
    pricing: {
      '1m': {
        total: 1356,
        bonusText: '1 Month Fast-Track Booking',
        available: true,
      },
      '3m': {
        total: 2652,
        bonusText: 'Zero Installation & Free Router',
        available: true,
      },
      '6m': {
        total: 5304,
        bonusText: '15 Days Free Validity Included',
        available: true,
      },
      '11m': {
        total: 9724,
        bonusText: '1 Month Free Validity Included',
        available: true,
      },
      '12m': {
        total: 9724,
        bonusText: '1 Month Free Validity Included',
        available: true,
      },
    },
  },
];

export const MAJOR_COVERAGE_CITIES: CoverageZone[] = [
  {
    city: 'Chennai - Central (Anna Nagar, Kilpauk, Aminjikarai)',
    shortName: 'Anna Nagar / Central',
    state: 'Tamil Nadu',
    pincodes: ['600040', '600102', '600101', '600010', '600029'],
    status: 'Full FTTH',
    averageInstallTimeHours: 3,
    serviceCenterPhone: '+91 88700 85269',
  },
  {
    city: 'Chennai - South Central (T. Nagar, Kodambakkam, Nungambakkam)',
    shortName: 'T. Nagar / Kodambakkam',
    state: 'Tamil Nadu',
    pincodes: ['600017', '600024', '600034', '600033'],
    status: 'Full FTTH',
    averageInstallTimeHours: 3,
    serviceCenterPhone: '+91 88700 85269',
  },
  {
    city: 'Chennai - South (Adyar, Besant Nagar, Thiruvanmiyur)',
    shortName: 'Adyar / Besant Nagar',
    state: 'Tamil Nadu',
    pincodes: ['600020', '600090', '600041', '600085'],
    status: 'Full FTTH',
    averageInstallTimeHours: 3,
    serviceCenterPhone: '+91 88700 85269',
  },
  {
    city: 'Chennai - OMR IT Corridor (Perungudi, Thoraipakkam, Sholinganallur)',
    shortName: 'OMR IT Corridor',
    state: 'Tamil Nadu',
    pincodes: ['600096', '600097', '600119', '600100'],
    status: 'Full FTTH',
    averageInstallTimeHours: 2,
    serviceCenterPhone: '+91 88700 85269',
  },
  {
    city: 'Chennai - South West (Velachery, Guindy, Madipakkam)',
    shortName: 'Velachery / Guindy',
    state: 'Tamil Nadu',
    pincodes: ['600042', '600032', '600091'],
    status: 'Full FTTH',
    averageInstallTimeHours: 3,
    serviceCenterPhone: '+91 88700 85269',
  },
  {
    city: 'Chennai - Suburbs (Tambaram, Chromepet, Pallavaram)',
    shortName: 'Tambaram / Chromepet',
    state: 'Tamil Nadu',
    pincodes: ['600045', '600044', '600043'],
    status: 'Full FTTH',
    averageInstallTimeHours: 4,
    serviceCenterPhone: '+91 88700 85269',
  },
  {
    city: 'Chennai - West (Porur, Ramapuram, Iyyappanthangal)',
    shortName: 'Porur / Ramapuram',
    state: 'Tamil Nadu',
    pincodes: ['600116', '600089', '600056'],
    status: 'Full FTTH',
    averageInstallTimeHours: 3,
    serviceCenterPhone: '+91 88700 85269',
  },
  {
    city: 'Chennai - North & Heritage (Mylapore, Royapettah, George Town)',
    shortName: 'Mylapore / North',
    state: 'Tamil Nadu',
    pincodes: ['600004', '600014', '600001', '600028'],
    status: 'Full FTTH',
    averageInstallTimeHours: 3,
    serviceCenterPhone: '+91 88700 85269',
  },
];

export const INITIAL_LEADS: BookingLead[] = [];

export const FAQS = [
  {
    question: 'When will my Hathway new connection get installed?',
    answer:
      'Once your booking is confirmed, our local partner desk verifies line availability and schedules a technician visit based on your preferred time slot (Morning, Afternoon, or Evening). Standard installation is completed smoothly with convenient doorstep cabling and live Wi-Fi activation.',
  },
  {
    question: 'What documents are required for a new Hathway connection?',
    answer:
      'Only 2 simple documents are needed for zero-paperwork KYC: (1) Any Government Photo ID (Aadhaar Card, Voter ID, Passport, or Driving License) and (2) Address Proof (Electricity bill, Rent agreement, or Aadhaar). You can share these via WhatsApp or show the technician during visit.',
  },
  {
    question: 'Do I get a free Wi-Fi router with the connection?',
    answer:
      'Yes! All 3-month, 6-month, and 12-month advance plans come with a complimentary high-performance Optical Network Terminal (ONT) Dual-Band Wi-Fi Router (2.4GHz + 5GHz) with zero router charges and zero rental fees.',
  },
  {
    question: 'Are there any hidden installation or security deposit charges?',
    answer:
      'No. When you select any quarterly (3-Month), half-yearly (6-Month), or annual (12-Month) plan, the standard ₹1,000 installation fee is 100% waived off. Standard 1-month subscriptions may carry a nominal refundable equipment deposit.',
  },
  {
    question: 'Is Hathway broadband data truly unlimited?',
    answer:
      'Yes! All Hathway Fiber broadband plans offer genuine unlimited high-speed data without any restrictive daily data cuts or throttled speeds. You can stream, work, download games, and video-call freely.',
  },
  {
    question: 'Can I add Digital Cable TV to my broadband connection?',
    answer:
      'Yes! Hathway is one of India\'s largest digital cable television networks. You can bundle an HD Digital Set-Top Box with 350+ channels at an exclusive discounted combo rate when booking your fiber internet.',
  },
  {
    question: 'Can I transfer or shift my connection if I move homes?',
    answer:
      'Yes, safe home shifting is completely supported. Simply notify our customer support helpline 48 hours prior to relocation, and our technician will reinstall your fiber connection at your new address without losing your balance validity.',
  },
];
