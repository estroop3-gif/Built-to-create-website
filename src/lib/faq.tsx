import { ReactElement } from 'react';
import { FULL_PAYMENT_DEADLINE, formatPaymentDate } from '@/lib/pricing';

export interface FAQItem {
  question: string;
  answer: string | ReactElement;
  category: 'general' | 'travel' | 'equipment' | 'pricing' | 'logistics' | 'spiritual';
  retreat?: 'costa-rica' | 'texas';
}

export const costaRicaFaqData: FAQItem[] = [
  // General
  {
    question: "What are the retreat dates?",
    answer: "The Costa Rica retreat is offered twice. Session 1 runs February 13–21, 2026. Session 2 runs April 17–25, 2026. Both are 9 days and move through San José, Jacó, Santiago de Puriscal, and back to San José. You can choose whichever session works best for your schedule when you register.",
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

export const texasFaqData: FAQItem[] = [
  {
    question: "What is Media Leaders Retreat?",
    answer: "Media Leaders Retreat is a small, intensive working retreat for church media leaders, storytellers, and creatives. It blends time in Scripture, teaching on craft, hands on production, and guided editing so you leave with finished work in hand and a clear plan for your ministry.",
    category: "general",
    retreat: "texas"
  },
  {
    question: "Where is the retreat held?",
    answer: "The retreat takes place on a private property in the Texas Hill Country near Wimberley, Texas. Each attendee has their own room on site. Exact location details are shared after your booking is confirmed.",
    category: "general",
    retreat: "texas"
  },
  {
    question: "Who is this for?",
    answer: "This retreat is designed for people who carry responsibility for media in a local church. That includes staff media directors, volunteers who lead creative teams, content creators who serve multiple churches, and pastors who are directly involved in storytelling and production.",
    category: "general",
    retreat: "texas"
  },
  {
    question: "Do I have to be on staff at a church?",
    answer: "No. Many attendees are staff, but you are welcome if you are a key volunteer, a freelancer who serves churches, or a creative who feels called to build media for the Church.",
    category: "general",
    retreat: "texas"
  },
  {
    question: "What skill level is this for?",
    answer: "You should have at least a basic working knowledge of cameras and editing. You do not need to be an expert. The teaching is designed to stretch intermediate creatives and give newer media leaders a solid foundation they can build on when they get home.",
    category: "general",
    retreat: "texas"
  },
  {
    question: "Will I have my own room?",
    answer: "Yes. Every attendee has their own bedroom on the property. Bathrooms and showers are shared, and there are common spaces for teaching, meals, editing, and hanging out.",
    category: "logistics",
    retreat: "texas"
  },
  {
    question: "What is included in the price?",
    answer: "Your ticket covers your lodging on the property, meals during the retreat, teaching sessions, guided production days, and access to camera and lighting gear used in the training. Once you arrive at the retreat location, the only extra costs are any personal purchases you choose to make off site.",
    category: "pricing",
    retreat: "texas"
  },
  {
    question: "Is travel included?",
    answer: "Travel to and from the retreat is not included. You are responsible for getting yourself to the Wimberley area. Once you are registered, you will receive guidance on airports, recommended arrival times, and what to expect when you get to the property.",
    category: "travel",
    retreat: "texas"
  },
  {
    question: "Can my church pay for this?",
    answer: "Yes. Many churches treat this as a mix of professional development and ministry training. You can register directly and have your church reimburse you, or your church can pay the retreat fee on your behalf.",
    category: "pricing",
    retreat: "texas"
  },
  {
    question: "Do I need to bring my own camera or laptop?",
    answer: "Camera gear is provided for instruction and shared production work. You are welcome to bring your own camera if you want to get more comfortable with your specific setup. A laptop is recommended if you want to edit on your own system and take projects home ready to launch, but it is not required.",
    category: "equipment",
    retreat: "texas"
  },
  {
    question: "What does a typical day look like?",
    answer: "Most days include morning time in Scripture and prayer, a focused teaching block, and then hands on work in small crews. Afternoons are dedicated to shooting, interviews, or edit sessions, with feedback built in. Evenings are reserved for meals, conversations, and time to rest, not just more sessions.",
    category: "logistics",
    retreat: "texas"
  },
  {
    question: "How many people will be there?",
    answer: "The retreat is intentionally kept small so you get real time with the instructor and meaningful reps on set. Expect a group size that allows for multiple small crews and honest conversations, not a crowded conference.",
    category: "general",
    retreat: "texas"
  },
  {
    question: "Is this a conference?",
    answer: "No. This is a working retreat. You will be creating, not just taking notes. The goal is that you leave with finished work, a clear plan, and deeper clarity in your calling, not just a notebook of ideas you never implement.",
    category: "general",
    retreat: "texas"
  },
  {
    question: "What if I am introverted?",
    answer: "This retreat is designed with space to breathe. There is structured time with the group and quiet time built in so you can be alone with God, process what you are learning, and reset without feeling like you have to be \"on\" every minute.",
    category: "spiritual",
    retreat: "texas"
  },
  {
    question: "What about food and dietary restrictions?",
    answer: "Meals are provided on site. Before the retreat you will have a chance to share any dietary needs. We cannot meet every preference, but we will make reasonable efforts to accommodate allergies and major restrictions.",
    category: "logistics",
    retreat: "texas"
  },
  {
    question: "Are there payment plans?",
    answer: "If you need a payment plan, reach out after you apply and we can talk through options. The goal is to make this accessible while still honoring the cost of running a small, intensive retreat.",
    category: "pricing",
    retreat: "texas"
  },
  {
    question: "What is the refund policy?",
    answer: "Spots are limited, so cancellations impact the ability to run the retreat well. Details on refunds and transfer options are provided in the registration terms. If something changes after you book, contact us as soon as possible so we can work with you.",
    category: "pricing",
    retreat: "texas"
  }
];

export const faqData: FAQItem[] = [...costaRicaFaqData, ...texasFaqData];

export const faqByCategory = {
  general: faqData.filter(item => item.category === 'general'),
  pricing: faqData.filter(item => item.category === 'pricing'),
  equipment: faqData.filter(item => item.category === 'equipment'),
  travel: faqData.filter(item => item.category === 'travel'),
  logistics: faqData.filter(item => item.category === 'logistics'),
  spiritual: faqData.filter(item => item.category === 'spiritual'),
} as const;