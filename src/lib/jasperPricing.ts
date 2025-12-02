// Jasper, GA Retreat Pricing Configuration
// Retreat dates: January 28-30, 2026 (with travel days January 27 and 31)

export const jasperPricingTiers = [
  {
    tier: "Early Bird",
    price: 3250,
    startDate: new Date('2025-09-01'),
    endDate: new Date('2025-11-01'),
    description: "Best value"
  },
  {
    tier: "Standard",
    price: 4000,
    startDate: new Date('2025-11-02'),
    endDate: new Date('2026-01-09'),
    description: "Standard pricing"
  },
  {
    tier: "Late Registration",
    price: 4250,
    startDate: new Date('2026-01-10'),
    endDate: new Date('2026-01-25'),
    description: "Last minute registration"
  }
];

export const jasperByoDiscount = 300;

// Payment schedule configuration
export const JASPER_DEPOSIT = 1000;
export const JASPER_TAX_RATE = 0.07;
export const JASPER_TIMEZONE = 'America/New_York';

// Jasper pricing tier date ranges
export const JASPER_EARLY_BIRD_START = '2025-09-01T00:00:00';
export const JASPER_EARLY_BIRD_END = '2025-11-01T23:59:59';
export const JASPER_STANDARD_START = '2025-11-02T00:00:00';
export const JASPER_STANDARD_END = '2026-01-09T23:59:59';
export const JASPER_LATE_START = '2026-01-10T00:00:00';
export const JASPER_LATE_END = '2026-01-25T23:59:59';

// Jasper retreat dates
export const JASPER_ARRIVAL_TRAVEL_DATE = '2026-01-27T00:00:00';
export const JASPER_RETREAT_START_DATE = '2026-01-28T00:00:00';
export const JASPER_RETREAT_END_DATE = '2026-01-30T00:00:00';
export const JASPER_DEPARTURE_TRAVEL_DATE = '2026-01-31T00:00:00';

export const JASPER_FULL_PAYMENT_DEADLINE = '2026-01-01T23:59:59';

// Jasper pricing amounts
export const JASPER_EARLY_BIRD_TOTAL = 3250;
export const JASPER_STANDARD_TOTAL = 4000;
export const JASPER_LATE_TOTAL = 4250;

export const getJasperCurrentPricingTier = () => {
  const today = new Date();
  return jasperPricingTiers.find(tier =>
    today >= tier.startDate && today <= tier.endDate
  ) || jasperPricingTiers[jasperPricingTiers.length - 1];
};

export const getJasperActiveWindow = () => {
  const now = new Date().toLocaleString('en-US', { timeZone: JASPER_TIMEZONE });
  const currentTime = new Date(now);
  const earlyBirdStart = new Date(JASPER_EARLY_BIRD_START);
  const earlyBirdEnd = new Date(JASPER_EARLY_BIRD_END);
  const standardStart = new Date(JASPER_STANDARD_START);
  const standardEnd = new Date(JASPER_STANDARD_END);
  const lateStart = new Date(JASPER_LATE_START);
  const lateEnd = new Date(JASPER_LATE_END);

  if (currentTime >= earlyBirdStart && currentTime <= earlyBirdEnd) {
    return 'EARLY_BIRD';
  }
  if (currentTime >= standardStart && currentTime <= standardEnd) {
    return 'STANDARD';
  }
  if (currentTime >= lateStart && currentTime <= lateEnd) {
    return 'LATE';
  }
  // Default to standard if outside all ranges
  return 'STANDARD';
};

export const getJasperCurrentTotal = () => {
  const activeWindow = getJasperActiveWindow();
  switch (activeWindow) {
    case 'EARLY_BIRD':
      return JASPER_EARLY_BIRD_TOTAL;
    case 'STANDARD':
      return JASPER_STANDARD_TOTAL;
    case 'LATE':
      return JASPER_LATE_TOTAL;
    default:
      return JASPER_STANDARD_TOTAL;
  }
};

export const isJasperEarlyBirdPeriod = () => {
  const now = new Date().toLocaleString('en-US', { timeZone: JASPER_TIMEZONE });
  const currentTime = new Date(now);
  const earlyBirdStart = new Date(JASPER_EARLY_BIRD_START);
  const earlyBirdEnd = new Date(JASPER_EARLY_BIRD_END);

  return currentTime >= earlyBirdStart && currentTime <= earlyBirdEnd;
};

export const isJasperAfterFullPaymentDeadline = () => {
  const now = new Date().toLocaleString('en-US', { timeZone: JASPER_TIMEZONE });
  const currentTime = new Date(now);
  const deadline = new Date(JASPER_FULL_PAYMENT_DEADLINE);

  return currentTime > deadline;
};

export const calculateJasperRemainingBalance = (grandTotal: number) => {
  return grandTotal - JASPER_DEPOSIT;
};

export const calculateJasperDueToday = (paymentOption: 'deposit' | 'full', grandTotal: number) => {
  const afterDeadline = isJasperAfterFullPaymentDeadline();
  const baseDueToday = (paymentOption === 'deposit' && !afterDeadline) ? JASPER_DEPOSIT : grandTotal;
  return baseDueToday;
};

export const getJasperPricingTiers = () => {
  return [
    {
      window: 'EARLY_BIRD',
      label: 'Early Bird',
      total: JASPER_EARLY_BIRD_TOTAL,
      startDate: JASPER_EARLY_BIRD_START,
      endDate: JASPER_EARLY_BIRD_END,
      description: 'Best value'
    },
    {
      window: 'STANDARD',
      label: 'Standard',
      total: JASPER_STANDARD_TOTAL,
      startDate: JASPER_STANDARD_START,
      endDate: JASPER_STANDARD_END,
      description: 'Standard pricing'
    },
    {
      window: 'LATE',
      label: 'Late Registration',
      total: JASPER_LATE_TOTAL,
      startDate: JASPER_LATE_START,
      endDate: JASPER_LATE_END,
      description: 'Last minute registration'
    }
  ];
};

export const formatJasperPaymentDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const formatJasperDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const jasperPaymentOptions = [
  {
    name: "Full Payment",
    description: "One-time payment",
    multiplier: 1,
    note: "Due upon registration"
  },
  {
    name: "3-Month Plan",
    description: "Split into 3 payments",
    multiplier: 1/3,
    note: "First payment due upon registration"
  }
];

// Legacy export for compatibility
export const jasperPricing = {
  standardTuition: 3250,
  cameraDiscount: 300,
};
