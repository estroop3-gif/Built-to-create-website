export interface Day {
  id: number;
  slug: string;
  title: string;
  theme: string;
  location: string;
  isTransferDay: boolean;
  spiritualAnchor: string;
  creativeFocus: string;
  fieldWork: string;
  eveningTouchpoint: string;
}

export const itinerary: Day[] = [
  {
    id: 1,
    slug: "day-1",
    title: "Arrival & Foundation",
    theme: "Presence First",
    location: "San José",
    isTransferDay: false,
    spiritualAnchor: "Presence first. Opening devotion and prayer for alignment and unity.",
    creativeFocus: "Story foundations through a Christian lens. Calling, testimony, and intent.",
    fieldWork: "Texture scouting and natural-light studies in San José.",
    eveningTouchpoint: "Testimony circle and prayer pairs."
  },
  {
    id: 2,
    slug: "day-2",
    title: "Visual Language as Worship",
    theme: "Hearing God in the Process",
    location: "San José",
    isTransferDay: false,
    spiritualAnchor: "Hearing God in the process.",
    creativeFocus: "Visual language and composition as worship. Fundamentals: framing, movement, coverage.",
    fieldWork: "Portrait or product assignment with mentor feedback.",
    eveningTouchpoint: "Quiet hour for Scripture and reflection."
  },
  {
    id: 3,
    slug: "day-3",
    title: "Obedience on the Road",
    theme: "Trust in Transition",
    location: "San José → Jacó",
    isTransferDay: true,
    spiritualAnchor: "Obedience and trust on the road.",
    creativeFocus: "Documentary mindset in transit. Fundamentals: scene building, transitions, B-roll that serves story.",
    fieldWork: "Travel sequence capture on the drive. Sunset arrival coverage in Jacó.",
    eveningTouchpoint: "Dinner in Jacó and short prayer of thanks."
  },
  {
    id: 4,
    slug: "day-4",
    title: "Truth in Storytelling",
    theme: "Courage and Compassion",
    location: "Jacó",
    isTransferDay: false,
    spiritualAnchor: "Courage and truth in storytelling.",
    creativeFocus: "Directing with compassion. Fundamentals: interviews, sit-downs, and thoughtful listening.",
    fieldWork: "Two-person interview setups and vérité practice.",
    eveningTouchpoint: "Worship and ministry night."
  },
  {
    id: 5,
    slug: "day-5",
    title: "Faithfulness in the Pivot",
    theme: "Coverage and Preparation",
    location: "Jacó → Santiago de Puriscal",
    isTransferDay: true,
    spiritualAnchor: "Faithfulness in the pivot.",
    creativeFocus: "Coverage for edit. Fundamentals: cutaways, inserts, and audio beds.",
    fieldWork: "Morning capture in Jacó, then travel coverage to Santiago de Puriscal.",
    eveningTouchpoint: "Gratitude round and rest."
  },
  {
    id: 6,
    slug: "day-6",
    title: "Rest as Worship",
    theme: "Free Day",
    location: "Santiago de Puriscal",
    isTransferDay: false,
    spiritualAnchor: "Rest as worship.",
    creativeFocus: "Personal reflection and journaling. Fundamentals: shot lists, lookbooks, and intent statements.",
    fieldWork: "Optional solo walk with camera, stillness, and Scripture.",
    eveningTouchpoint: "Optional prayer night."
  },
  {
    id: 7,
    slug: "day-7",
    title: "Community and Service",
    theme: "Collaboration",
    location: "Santiago de Puriscal",
    isTransferDay: true,
    spiritualAnchor: "Community and service.",
    creativeFocus: "Collaboration. Fundamentals: roles on a doc team, producing the field day.",
    fieldWork: "Team documentary minis in local context.",
    eveningTouchpoint: "Encouragement over works in progress."
  },
  {
    id: 8,
    slug: "day-8",
    title: "Stewardship and Excellence",
    theme: "Edit as Worship",
    location: "Santiago de Puriscal → San José",
    isTransferDay: false,
    spiritualAnchor: "Stewardship and excellence.",
    creativeFocus: "Edit rhythm and color as atmosphere. Fundamentals: selects, structure, and a first pass.",
    fieldWork: "Rough cut sprints with mentor notes.",
    eveningTouchpoint: "Return to San José and closing prayer."
  },
  {
    id: 9,
    slug: "day-9",
    title: "Commissioning and Sending",
    theme: "Delivery and Impact",
    location: "San José",
    isTransferDay: false,
    spiritualAnchor: "Commissioning and sending.",
    creativeFocus: "Delivery and impact. Fundamentals: finishing, export, and presentation.",
    fieldWork: "Final polish and private screenings.",
    eveningTouchpoint: "Blessing and commissioning for the work ahead."
  }
];

export function getDayBySlug(slug: string): Day | undefined {
  return itinerary.find(day => day.slug === slug);
}

export function getDayById(id: number): Day | undefined {
  return itinerary.find(day => day.id === id);
}