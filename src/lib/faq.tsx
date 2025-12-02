import { ReactElement } from 'react';
import { TRAVEL_DATE_START, TRAVEL_DATE_END, FULL_PAYMENT_DEADLINE, formatPaymentDate } from '@/lib/pricing';

export interface FAQItem {
  question: string;
  answer: string | ReactElement;
  category: 'general' | 'travel' | 'equipment' | 'pricing' | 'logistics' | 'spiritual';
  retreat?: 'costa-rica' | 'jasper';
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

export const jasperFaqData: FAQItem[] = [
  {
    question: "Who is the Jasper, GA retreat for?",
    answer: "The Jasper retreat is designed for church media leaders and key volunteers who help tell the story of what God is doing in their local church. That includes staff or volunteer roles like media director, video lead, camera operators, editors, and storytellers who are involved in testimonies, sermon content, worship coverage, and social or film pieces.",
    category: "general",
    retreat: "jasper"
  },
  {
    question: "Do I need to be on staff at a church to attend?",
    answer: "No. You do not have to be full time staff to attend. Many churches rely heavily on volunteers, and Jasper is built with that reality in mind. The main requirement is that you are actively involved in, or preparing to step into, media and storytelling in a local church context, with your leadership's support.",
    category: "general",
    retreat: "jasper"
  },
  {
    question: "Do I need to bring my own camera?",
    answer: "No, you do not need to bring your own camera. Cameras are provided for instruction and shooting during the retreat. The main teaching kit will be Panasonic GH4 cameras, and there will also be two Sony FS100 kits, a Sony FS7 kit, and a Panasonic AF100 kit. You will be able to compare different setups, price ranges, low light performance, and the realities of older versus newer systems in a church context. If you already have a camera you love, you are welcome to bring it, but it is not required and there is no tuition discount for bringing your own gear.",
    category: "equipment",
    retreat: "jasper"
  },
  {
    question: "Do I need to bring a laptop and hard drive?",
    answer: "A laptop and hard drive are recommended but not required. All retreat footage will be posted online for participants after Jasper, so you will still have access even without a laptop. Bringing a laptop and an external drive simply allows you to offload and work with your own footage during the retreat, follow along more closely in edit sessions, and begin building your own project structure as you learn.",
    category: "equipment",
    retreat: "jasper"
  },
  {
    question: "What are the sleeping arrangements like?",
    answer: "Jasper is a glamping style experience. We will be tent camping on the property, but each participant will have a full cot with a cot mattress and comfort items so you can rest well between full days of shooting and learning. Tents are shared, arranged to balance personal space and community, with simple lighting and quiet hours to keep the camp peaceful at night. The only required sleeping item you need to bring is your own sleeping bag. If you want extra comfort, you are welcome to bring a small pillow or blanket.",
    category: "logistics",
    retreat: "jasper"
  },
  {
    question: "What are the bathrooms and showers like?",
    answer: "We want you to know up front that the Jasper retreat uses simple camp style facilities rather than standard house bathrooms. The restroom on site is a clean composting toilet, not a traditional flush toilet. The shower setup is also a camp style shower instead of a full indoor bathroom, but it does provide hot water and privacy. It will feel more like an upgraded campground than a hotel, so if your team is comfortable with glamping and being a little closer to nature, they will be right at home here.",
    category: "logistics",
    retreat: "jasper"
  },
  {
    question: "What facilities are on site?",
    answer: "The property is being built out specifically for this retreat, with dedicated spaces for teaching, meals, editing, and community. There will be a central area for sessions and demos, outdoor or covered dining space, a fire pit or gathering spot for evening conversations and prayer, and practical work areas with tables and power so you can set up laptops and drives during edit blocks. The goal is simple, clean, and comfortable, not flashy, so you can stay focused on God, your craft, and your team.",
    category: "logistics",
    retreat: "jasper"
  },
  {
    question: "What are the dates for the Jasper retreat and travel days?",
    answer: "The Jasper, Georgia retreat is offered twice. Session 1 runs January 28–30, 2026, with travel days on January 27 and January 31, 2026. Session 2 runs May 6–8, 2026, with travel days on May 5 and May 9, 2026. You can choose whichever run works best for your schedule when you register.",
    category: "travel",
    retreat: "jasper"
  },
  {
    question: "What is included in the Jasper tuition?",
    answer: "Your tuition for Jasper covers on site lodging in the glamping setup, group meals on the property during the retreat, teaching and coaching from Parker and a local pastor, access to all provided camera gear during sessions, the course booklet, the DIT and naming convention guide, and access to the shared retreat footage after the event. Travel to and from Jasper, personal snacks, and any optional off site purchases are not included.",
    category: "pricing",
    retreat: "jasper"
  },
  {
    question: "How does payment work for Jasper?",
    answer: "To reserve your spot at Jasper, a $1,000 deposit is required. The remaining balance for your chosen pricing tier is due by January 1, 2026. Exact early bird, standard, and late registration windows and amounts are detailed on the Jasper Pricing page. The deposit secures your place; the final payment ensures everything is confirmed well before travel and the retreat start.",
    category: "pricing",
    retreat: "jasper"
  },
  {
    question: "How spiritual is the Jasper retreat?",
    answer: "Jasper is intentionally both spiritual and practical. Each day includes time in Scripture and prayer, and a trusted local pastor will be part of the retreat to provide teaching and pastoral guidance. At the same time, you will spend a significant portion of the schedule planning, shooting, and editing real pieces like testimonies, interview setups, multi camera worship coverage, and a short film. The goal is that your media leaders leave with healthier spiritual rhythms and very concrete tools they can plug directly into Sundays and church life.",
    category: "spiritual",
    retreat: "jasper"
  },
  {
    question: "Can I send more than one person from my church?",
    answer: "Yes. In fact, Jasper works especially well when a pastor sends multiple media leaders or key volunteers together. They can learn side by side, divide roles during shoots, and return home with a shared vision and language. If you plan to send a group, reach out through the Contact page so we can help you think through the best way to structure travel, lodging assignments, and how to get the most out of the retreat for your team.",
    category: "general",
    retreat: "jasper"
  }
];

export const faqData: FAQItem[] = [...costaRicaFaqData, ...jasperFaqData];

export const faqByCategory = {
  general: faqData.filter(item => item.category === 'general'),
  pricing: faqData.filter(item => item.category === 'pricing'),
  equipment: faqData.filter(item => item.category === 'equipment'),
  travel: faqData.filter(item => item.category === 'travel'),
  logistics: faqData.filter(item => item.category === 'logistics'),
  spiritual: faqData.filter(item => item.category === 'spiritual'),
} as const;