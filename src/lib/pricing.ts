export const pricingTiers = [
  {
    tier: "Early Bird",
    price: 4790,
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-10-31'),
    description: "Best value - save $1,160"
  },
  {
    tier: "Regular",
    price: 5490,
    startDate: new Date('2025-11-01'),
    endDate: new Date('2025-12-31'),
    description: "Standard pricing"
  },
  {
    tier: "Late",
    price: 5950,
    startDate: new Date('2026-01-01'),
    endDate: new Date('2026-02-15'),
    description: "Last minute registration"
  }
];

export const byoDiscount = 300;

// Payment schedule configuration
export const DEPOSIT = 1800;
export const TAX_RATE = 0.07;
export const TIMEZONE = 'America/New_York';
export const EARLY_BIRD_START = '2025-01-01T00:00:00';
export const EARLY_BIRD_END = '2025-10-31T23:59:59';
export const STANDARD_START = '2025-11-01T00:00:00';
export const STANDARD_END = '2025-12-31T23:59:59';
export const LATE_START = '2026-01-01T00:00:00';
export const FULL_PAYMENT_DEADLINE = '2025-12-31T23:59:59';
export const TRAVEL_DATE = '2026-02-20T00:00:00';
export const TRAVEL_DATE_START = '2026-02-20T00:00:00';
export const TRAVEL_DATE_END = '2026-02-28T00:00:00';
export const EARLY_BIRD_TOTAL = 4790;
export const STANDARD_TOTAL = 5490;
export const LATE_TOTAL = 5950;

export const getCurrentPricingTier = () => {
  const today = new Date();
  return pricingTiers.find(tier => 
    today >= tier.startDate && today <= tier.endDate
  ) || pricingTiers[pricingTiers.length - 1];
};

export const getActiveWindow = () => {
  const now = new Date().toLocaleString('en-US', { timeZone: TIMEZONE });
  const currentTime = new Date(now);
  const earlyBirdStart = new Date(EARLY_BIRD_START);
  const earlyBirdEnd = new Date(EARLY_BIRD_END);
  const standardStart = new Date(STANDARD_START);
  const standardEnd = new Date(STANDARD_END);
  const lateStart = new Date(LATE_START);

  if (currentTime >= earlyBirdStart && currentTime <= earlyBirdEnd) {
    return 'EARLY_BIRD';
  }
  if (currentTime >= standardStart && currentTime <= standardEnd) {
    return 'STANDARD';
  }
  if (currentTime >= lateStart) {
    return 'LATE';
  }
  return 'STANDARD';
};

export const getCurrentTotal = () => {
  const activeWindow = getActiveWindow();
  switch (activeWindow) {
    case 'EARLY_BIRD':
      return EARLY_BIRD_TOTAL;
    case 'STANDARD':
      return STANDARD_TOTAL;
    case 'LATE':
      return LATE_TOTAL;
    default:
      return STANDARD_TOTAL;
  }
};

export const isEarlyBirdPeriod = () => {
  const now = new Date().toLocaleString('en-US', { timeZone: TIMEZONE });
  const currentTime = new Date(now);
  const earlyBirdStart = new Date(EARLY_BIRD_START);
  const earlyBirdEnd = new Date(EARLY_BIRD_END);
  
  return currentTime >= earlyBirdStart && currentTime <= earlyBirdEnd;
};

export const isAfterFullPaymentDeadline = () => {
  const now = new Date().toLocaleString('en-US', { timeZone: TIMEZONE });
  const currentTime = new Date(now);
  const deadline = new Date(FULL_PAYMENT_DEADLINE);
  
  return currentTime > deadline;
};

export const calculateRemainingBalance = (grandTotal: number) => {
  return grandTotal - DEPOSIT;
};

export const calculateDueToday = (paymentOption: 'deposit' | 'full', grandTotal: number) => {
  const afterDeadline = isAfterFullPaymentDeadline();
  const baseDueToday = (paymentOption === 'deposit' && !afterDeadline) ? DEPOSIT : grandTotal;
  return baseDueToday;
};

export const getPricingTiers = () => {
  return [
    {
      window: 'EARLY_BIRD',
      label: 'Early Bird',
      total: EARLY_BIRD_TOTAL,
      startDate: EARLY_BIRD_START,
      endDate: EARLY_BIRD_END,
      description: 'Best value - save $1,160'
    },
    {
      window: 'STANDARD',
      label: 'Standard',
      total: STANDARD_TOTAL,
      startDate: STANDARD_START,
      endDate: STANDARD_END,
      description: 'Regular pricing'
    },
    {
      window: 'LATE',
      label: 'Late Registration',
      total: LATE_TOTAL,
      startDate: LATE_START,
      endDate: TRAVEL_DATE,
      description: 'Last minute registration'
    }
  ];
};

export const formatPaymentDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const paymentOptions = [
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
  },
  {
    name: "6-Month Plan",
    description: "Split into 6 payments",
    multiplier: 1/6,
    note: "First payment due upon registration"
  }
];

// Legacy export for compatibility
export const pricing = {
  standardTuition: 4790,
  cameraDiscount: 300,
};