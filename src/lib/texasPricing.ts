// Texas Hill Country Retreat Pricing Configuration
// Session 1: February 4-6, 2026 (travel days February 3 and 7)
// Session 2: May 6-8, 2026 (travel days May 5 and 9)
// Note: Pricing shown currently applies to Session 1

export const texasPricingTiers = [
  {
    tier: "Early Bird",
    price: 3850,
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

export const texasByoDiscount = 300;

// Payment schedule configuration
export const TEXAS_DEPOSIT = 1000;
export const TEXAS_TAX_RATE = 0.07;
export const TEXAS_TIMEZONE = 'America/Chicago';

// Texas pricing tier date ranges
export const TEXAS_EARLY_BIRD_START = '2025-09-01T00:00:00';
export const TEXAS_EARLY_BIRD_END = '2025-11-01T23:59:59';
export const TEXAS_STANDARD_START = '2025-11-02T00:00:00';
export const TEXAS_STANDARD_END = '2026-01-09T23:59:59';
export const TEXAS_LATE_START = '2026-01-10T00:00:00';
export const TEXAS_LATE_END = '2026-01-25T23:59:59';

// Texas retreat dates
export const TEXAS_ARRIVAL_TRAVEL_DATE = '2026-02-03T00:00:00';
export const TEXAS_RETREAT_START_DATE = '2026-02-04T00:00:00';
export const TEXAS_RETREAT_END_DATE = '2026-02-06T00:00:00';
export const TEXAS_DEPARTURE_TRAVEL_DATE = '2026-02-07T00:00:00';

export const TEXAS_FULL_PAYMENT_DEADLINE = '2026-01-01T23:59:59';

// Texas pricing amounts
export const TEXAS_EARLY_BIRD_TOTAL = 3850;
export const TEXAS_STANDARD_TOTAL = 4000;
export const TEXAS_LATE_TOTAL = 4250;

export const getTexasCurrentPricingTier = () => {
  const today = new Date();
  return texasPricingTiers.find(tier =>
    today >= tier.startDate && today <= tier.endDate
  ) || texasPricingTiers[texasPricingTiers.length - 1];
};

export const getTexasActiveWindow = () => {
  const now = new Date().toLocaleString('en-US', { timeZone: TEXAS_TIMEZONE });
  const currentTime = new Date(now);
  const earlyBirdStart = new Date(TEXAS_EARLY_BIRD_START);
  const earlyBirdEnd = new Date(TEXAS_EARLY_BIRD_END);
  const standardStart = new Date(TEXAS_STANDARD_START);
  const standardEnd = new Date(TEXAS_STANDARD_END);
  const lateStart = new Date(TEXAS_LATE_START);
  const lateEnd = new Date(TEXAS_LATE_END);

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

export const getTexasCurrentTotal = () => {
  const activeWindow = getTexasActiveWindow();
  switch (activeWindow) {
    case 'EARLY_BIRD':
      return TEXAS_EARLY_BIRD_TOTAL;
    case 'STANDARD':
      return TEXAS_STANDARD_TOTAL;
    case 'LATE':
      return TEXAS_LATE_TOTAL;
    default:
      return TEXAS_STANDARD_TOTAL;
  }
};

export const isTexasEarlyBirdPeriod = () => {
  const now = new Date().toLocaleString('en-US', { timeZone: TEXAS_TIMEZONE });
  const currentTime = new Date(now);
  const earlyBirdStart = new Date(TEXAS_EARLY_BIRD_START);
  const earlyBirdEnd = new Date(TEXAS_EARLY_BIRD_END);

  return currentTime >= earlyBirdStart && currentTime <= earlyBirdEnd;
};

export const isTexasAfterFullPaymentDeadline = () => {
  const now = new Date().toLocaleString('en-US', { timeZone: TEXAS_TIMEZONE });
  const currentTime = new Date(now);
  const deadline = new Date(TEXAS_FULL_PAYMENT_DEADLINE);

  return currentTime > deadline;
};

export const calculateTexasRemainingBalance = (grandTotal: number) => {
  return grandTotal - TEXAS_DEPOSIT;
};

export const calculateTexasDueToday = (paymentOption: 'deposit' | 'full', grandTotal: number) => {
  const afterDeadline = isTexasAfterFullPaymentDeadline();
  const baseDueToday = (paymentOption === 'deposit' && !afterDeadline) ? TEXAS_DEPOSIT : grandTotal;
  return baseDueToday;
};

export const getTexasPricingTiers = () => {
  return [
    {
      window: 'EARLY_BIRD',
      label: 'Early Bird',
      total: TEXAS_EARLY_BIRD_TOTAL,
      startDate: TEXAS_EARLY_BIRD_START,
      endDate: TEXAS_EARLY_BIRD_END,
      description: 'Best value'
    },
    {
      window: 'STANDARD',
      label: 'Standard',
      total: TEXAS_STANDARD_TOTAL,
      startDate: TEXAS_STANDARD_START,
      endDate: TEXAS_STANDARD_END,
      description: 'Standard pricing'
    },
    {
      window: 'LATE',
      label: 'Late Registration',
      total: TEXAS_LATE_TOTAL,
      startDate: TEXAS_LATE_START,
      endDate: TEXAS_LATE_END,
      description: 'Last minute registration'
    }
  ];
};

export const formatTexasPaymentDate = (dateString: string) => {
  // Append T00:00:00 to date-only strings to prevent UTC midnight shift
  const date = dateString.includes('T') ? new Date(dateString) : new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const formatTexasDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const texasPaymentOptions = [
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
export const texasPricing = {
  standardTuition: 3850,
  cameraDiscount: 300,
};

// Backward compatibility aliases (keeping JASPER names pointing to TEXAS values)
export const JASPER_DEPOSIT = TEXAS_DEPOSIT;
export const JASPER_FULL_PAYMENT_DEADLINE = TEXAS_FULL_PAYMENT_DEADLINE;
export const JASPER_LATE_TOTAL = TEXAS_LATE_TOTAL;
export const getJasperCurrentTotal = getTexasCurrentTotal;
export const isJasperAfterFullPaymentDeadline = isTexasAfterFullPaymentDeadline;
export const calculateJasperRemainingBalance = calculateTexasRemainingBalance;
export const formatJasperPaymentDate = formatTexasPaymentDate;
export const getJasperActiveWindow = getTexasActiveWindow;
export const getJasperPricingTiers = getTexasPricingTiers;
export const calculateJasperDueToday = calculateTexasDueToday;
