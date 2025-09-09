import { ReactElement } from 'react';
import { TRAVEL_DATE_START, TRAVEL_DATE_END, FULL_PAYMENT_DEADLINE, formatPaymentDate } from '@/lib/pricing';

export interface FAQItem {
  question: string;
  answer: string | ReactElement;
  category: 'general' | 'travel' | 'equipment' | 'pricing' | 'logistics' | 'spiritual';
}

export const faqData: FAQItem[] = [
  // General
  {
    question: "What are the retreat dates?",
    answer: `The retreat runs for 9 days, from ${formatPaymentDate(TRAVEL_DATE_START)} → ${formatPaymentDate(TRAVEL_DATE_END)}, moving through San José, Jacó, Santiago de Puriscal, and returning to San José.`,
    category: "general"
  },
  {
    question: "Where do I fly into?",
    answer: "All participants fly into Juan Santamaría International Airport (SJO) in San José, Costa Rica. Group shuttles will pick you up at the airport on Day 1 and return you on Day 9.",
    category: "general"
  },
  {
    question: "Are flights included?",
    answer: "Flights are not included in tuition. You are responsible for booking your own round-trip ticket to and from SJO.",
    category: "general"
  },
  {
    question: "Are meals included?",
    answer: "Yes. All meals are covered throughout the retreat - 3 meals daily (breakfast, lunch, dinner).",
    category: "general"
  },
  {
    question: "Where will we stay?",
    answer: (
      <div>
        <p>We will stay in vetted hotels in each location:</p>
        <ul className="mt-2 space-y-1">
          <li>• <strong>San José:</strong> Hotel Cultura Plaza</li>
          <li>• <strong>Jacó:</strong> La Perlita</li>
          <li>• <strong>Santiago de Puriscal:</strong> Hotel Cabañas Ensueños</li>
        </ul>
      </div>
    ),
    category: "general"
  },

  // Equipment
  {
    question: "Do I need to bring my own camera gear?",
    answer: "We provide shared equipment, but if you bring your own full camera setup you will receive a $300 discount on tuition.",
    category: "equipment"
  },
  {
    question: "Is a laptop required?",
    answer: "Yes. A laptop and charger are required for media offload and storage management. It does not need to be edit-capable.",
    category: "equipment"
  },

  // Pricing
  {
    question: "How much is the deposit and is it refundable?",
    answer: (
      <div>
        <p>The deposit is $1,800 and is non-refundable. Refunds apply only to the remaining balance:</p>
        <ul className="mt-2 space-y-1">
          <li>• 120+ days before travel: 75% refund</li>
          <li>• 90–119 days before: 50% refund</li>
          <li>• 60–89 days before: 25% refund</li>
          <li>• &lt;60 days before: no refund</li>
        </ul>
        <p className="mt-2">Taxes paid are not refunded.</p>
      </div>
    ),
    category: "pricing"
  },
  {
    question: "When is the full payment due?",
    answer: `Full payment is required by ${formatPaymentDate(FULL_PAYMENT_DEADLINE)}. After this date, deposit-only registration will no longer be available.`,
    category: "pricing"
  },

  // Travel
  {
    question: "Do I need travel insurance?",
    answer: "We strongly recommend travel insurance. It can cover unexpected delays, cancellations, or medical needs during the trip.",
    category: "travel"
  },
  {
    question: "Do I need a visa to enter Costa Rica?",
    answer: "US citizens do not need a visa for stays of up to 90 days. You must have a valid passport (with 6+ months remaining) and a return or onward ticket.",
    category: "travel"
  },
  {
    question: "What if my flight is delayed?",
    answer: "We monitor flights and will coordinate airport pickups. If your flight is delayed, please contact our team immediately.",
    category: "travel"
  },
  {
    question: "Can I arrive early or stay late?",
    answer: "Yes, but you are responsible for arranging and paying for any additional lodging and transportation outside retreat dates.",
    category: "travel"
  },

  // Spiritual
  {
    question: "Is this retreat only for Christians?",
    answer: "The retreat is a faith-based Christian experience, with daily devotion and prayer, testimony circles, and worship nights. All are welcome to attend, but the rhythm of the retreat reflects Christian values and practice.",
    category: "spiritual"
  },
  {
    question: "How is the retreat structured?",
    answer: "Each day blends spiritual practices (devotion, worship, reflection) with creative training in the fundamentals of documentary filmmaking. Field work includes travel sequences, interviews, vérité practice, and collaborative edits.",
    category: "spiritual"
  },

  // Logistics
  {
    question: "What should I pack?",
    answer: "Bring clothing for hot, humid, and rainy conditions, swimwear, walking shoes, and personal toiletries. A laptop and charger are required. See the Packing page for the full checklist.",
    category: "logistics"
  },
  {
    question: "What if I have dietary restrictions?",
    answer: "We do our best to accommodate dietary needs. Please list restrictions on your registration form.",
    category: "logistics"
  },
  {
    question: "Is there free time during the retreat?",
    answer: "Yes. Day 6 is a free day for rest, reflection, or personal exploration in Santiago de Puriscal.",
    category: "logistics"
  },
  {
    question: "Is Wi-Fi available?",
    answer: "Yes, Wi-Fi is available in all hotels, but speeds may vary in rural areas.",
    category: "logistics"
  }
];

export const faqByCategory = {
  general: faqData.filter(item => item.category === 'general'),
  pricing: faqData.filter(item => item.category === 'pricing'),
  equipment: faqData.filter(item => item.category === 'equipment'),
  travel: faqData.filter(item => item.category === 'travel'), 
  logistics: faqData.filter(item => item.category === 'logistics'),
  spiritual: faqData.filter(item => item.category === 'spiritual'),
} as const;