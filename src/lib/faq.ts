export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'travel' | 'equipment' | 'pricing' | 'logistics';
}

export const faqData: FAQItem[] = [
  // General
  {
    question: "What skill level is required for this retreat?",
    answer: "All skill levels are welcome! We design our curriculum to accommodate complete beginners through experienced filmmakers. Our small group size (maximum 12 participants) ensures personalized attention regardless of your starting point.",
    category: "general"
  },
  {
    question: "What's the weather like in Costa Rica in February?",
    answer: "February is peak dry season with ideal conditions - warm coastal weather (75-90°F) in San José and Jacó, cooler mountain temperatures (60-75°F) in Santiago de Puriscal. Minimal rain expected but pack layers for elevation changes.",
    category: "general"
  },
  {
    question: "When is the retreat happening?",
    answer: "The retreat runs 9 days from Friday, February 20, 2026 through Saturday, February 28, 2026. Arrive at SJO airport by 2:00 PM on February 20th for included transfers.",
    category: "general"
  },

  // Pricing
  {
    question: "What are the pricing tiers?",
    answer: "Early Bird: $4,790 (through October 31, 2025) | Regular: $5,490 (November 1 - December 31, 2025) | Late: $5,950 (January 1 - February 15, 2026). All tiers include the complete equipment kit you keep.",
    category: "pricing"
  },
  {
    question: "How does the Bring Your Own Camera discount work?",
    answer: "If you bring your own camera kit, subtract $300 from any pricing tier. You'll still receive all other equipment (audio, lighting, storage, accessories). Select this option during registration.",
    category: "pricing"
  },
  {
    question: "What's included in the tuition?",
    answer: "Your tuition includes: 9 days of expert instruction, complete professional equipment kit (yours to keep), all accommodations, ground transportation between cities, SJO airport transfers, welcome and farewell dinners, and ongoing mentor support.",
    category: "pricing"
  },
  {
    question: "What payment plans are available?",
    answer: "We offer full payment, 3-month payment plans, and 6-month payment plans. Payment plans start with a deposit to secure your spot, then equal installments leading up to the retreat date.",
    category: "pricing"
  },
  {
    question: "What's your refund policy?",
    answer: "Full refunds (minus processing fees) for cancellations 60+ days before the retreat. Cancellations 30-59 days prior receive 50% refund. Within 30 days, refunds are only available if we can fill your spot from our waitlist. We strongly recommend travel insurance.",
    category: "pricing"
  },

  // Equipment
  {
    question: "Do I get to keep all the equipment?",
    answer: "Yes! The complete kit is yours to keep, including: Sony NEX 6 camera, two lenses, Godox Movlink wireless audio, Amaran 100d light, LED panels, tripod, memory cards, external drive, and Pelican rolling case. Over $3,000 in value.",
    category: "equipment"
  },
  {
    question: "What specific equipment is included?",
    answer: "Sony NEX 6, 18-55mm OSS lens, TTartisan 25mm F2 lens, Godox Movlink wireless lav, Amaran 100d light, SmallRig softbox, Neewer LED panels (2), Flashpoint light stand, KF tripod, Lexar 128GB cards (2), 1TB drive, Pelican V525 case, Sony headphones.",
    category: "equipment"
  },
  {
    question: "Can I bring my own camera instead?",
    answer: "Absolutely! If you bring your own camera kit, you'll receive a $300 discount on any pricing tier. You'll still get all other equipment (audio, lighting, storage, accessories). Just select this option during registration.",
    category: "equipment"
  },
  {
    question: "What if equipment gets damaged during the retreat?",
    answer: "All equipment is covered during retreat activities. Normal wear and tear is expected since you're keeping the kit. We recommend travel insurance for additional protection.",
    category: "equipment"
  },

  // Travel & Hotels
  {
    question: "Which airport should I fly into?",
    answer: "Juan Santamaría International Airport (SJO) in San José. Direct flights available from most major US cities. We provide transfers from SJO on February 20th and back to SJO on February 28th.",
    category: "travel"
  },
  {
    question: "What are the three hotels?",
    answer: "San José: Hotel Cultura Plaza (Days 1-3, 8-9) - boutique hotel in cultural district | Jacó: La Perlita (Days 4-6) - beachfront property | Santiago de Puriscal: Hotel Cabañas Ensueños (Day 7) - mountain lodge with valley views.",
    category: "travel"
  },
  {
    question: "Are airport transfers included?",
    answer: "Yes! Round-trip transfers between SJO airport and hotels are included. Arrival transfer on February 20th at 3:00 PM. Departure transfers on February 28th starting at 5:00 PM, coordinated with flight times.",
    category: "travel"
  },
  {
    question: "Do I need a visa for Costa Rica?",
    answer: "US citizens don't need a visa for stays under 90 days - just a valid passport with 6+ months remaining validity. Citizens of other countries should check current requirements with their local Costa Rican embassy.",
    category: "travel"
  },
  {
    question: "When are the transfer days?",
    answer: "Day 4 (Feb 23): San José to Jacó | Day 7 (Feb 26): Jacó to Santiago de Puriscal | Day 8 (Feb 27): Puriscal back to San José. All transfers included with comfortable air-conditioned vehicles.",
    category: "travel"
  },

  // Logistics
  {
    question: "What meals are included?",
    answer: "Daily breakfast at all hotels, welcome dinner (Day 1), and farewell celebration lunch (Day 9). Other meals are on your own, giving you flexibility to explore Costa Rican cuisine. Budget approximately $20-30/day for meals.",
    category: "logistics"
  },
  {
    question: "Is the editing and showcase really in San José?",
    answer: "Yes! Days 8-9 are dedicated to editing and showcase in San José. Day 8 afternoon/evening for edit lab and rough cuts. Day 9 for final edits, export, and private screening before departures.",
    category: "logistics"
  },
  {
    question: "Can I extend my stay in Costa Rica?",
    answer: "Many participants extend their stay! Costa Rica offers incredible biodiversity and adventure opportunities. We can help coordinate extended accommodations and provide recommendations for additional destinations.",
    category: "logistics"
  },
  {
    question: "What if I have dietary restrictions?",
    answer: "Costa Rica is very accommodating for various dietary needs. Please inform us during registration so we can coordinate with hotels and restaurants for included meals.",
    category: "logistics"
  },
  {
    question: "Is travel insurance required?",
    answer: "While not required, we strongly recommend comprehensive travel insurance covering medical, trip cancellation, and equipment protection. Many credit cards offer travel insurance benefits.",
    category: "logistics"
  }
];

export const faqByCategory = {
  general: faqData.filter(item => item.category === 'general'),
  pricing: faqData.filter(item => item.category === 'pricing'),
  equipment: faqData.filter(item => item.category === 'equipment'),
  travel: faqData.filter(item => item.category === 'travel'), 
  logistics: faqData.filter(item => item.category === 'logistics'),
} as const;