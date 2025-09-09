export interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
  skillsFocus?: string[];
  gearNotes?: string;
  locationNotes?: string;
  terrainNotes?: string;
}

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
    title: "Day 1",
    theme: "Presence First",
    location: "San José",
    isTransferDay: false,
    spiritualAnchor: "Presence first. Opening devotion and prayer for alignment and unity.",
    creativeFocus: "Story foundations through a Christian lens. Calling, testimony, and intent.",
    fieldWork: "",
    eveningTouchpoint: ""
  },
  {
    id: 2,
    slug: "day-2",
    title: "Day 2",
    theme: "Hearing God in the Process",
    location: "San José",
    isTransferDay: false,
    spiritualAnchor: "Hearing God in the process.",
    creativeFocus: "Visual language and composition as worship. Fundamentals: framing, movement, and coverage.",
    fieldWork: "",
    eveningTouchpoint: ""
  },
  {
    id: 3,
    slug: "day-3",
    title: "Day 3",
    theme: "Trust in Transition",
    location: "San José → Jacó",
    isTransferDay: true,
    spiritualAnchor: "Obedience and trust on the road.",
    creativeFocus: "Documentary mindset in transit. Fundamentals: scene building, transitions, and B-roll that serves story.",
    fieldWork: "",
    eveningTouchpoint: ""
  },
  {
    id: 4,
    slug: "day-4",
    title: "Day 4",
    theme: "Courage and Compassion",
    location: "Jacó",
    isTransferDay: false,
    spiritualAnchor: "Courage and truth in storytelling.",
    creativeFocus: "Directing with compassion. Fundamentals: interviews, sit-downs, and thoughtful listening.",
    fieldWork: "",
    eveningTouchpoint: ""
  },
  {
    id: 5,
    slug: "day-5",
    title: "Day 5",
    theme: "Coverage and Preparation",
    location: "Jacó",
    isTransferDay: false,
    spiritualAnchor: "Faithfulness in the pivot.",
    creativeFocus: "Coverage for edit. Fundamentals: cutaways, inserts, and audio beds.",
    fieldWork: "",
    eveningTouchpoint: ""
  },
  {
    id: 6,
    slug: "day-6",
    title: "Day 6",
    theme: "Rest as Worship",
    location: "Jacó → Santiago de Puriscal",
    isTransferDay: true,
    spiritualAnchor: "Rest as worship.",
    creativeFocus: "Personal reflection and journaling. Fundamentals: shot lists, lookbooks, and intent statements.",
    fieldWork: "",
    eveningTouchpoint: ""
  },
  {
    id: 7,
    slug: "day-7",
    title: "Day 7",
    theme: "Collaboration",
    location: "Santiago de Puriscal",
    isTransferDay: false,
    spiritualAnchor: "Community and service.",
    creativeFocus: "Collaboration. Fundamentals: roles on a doc team, producing the field day.",
    fieldWork: "",
    eveningTouchpoint: ""
  },
  {
    id: 8,
    slug: "day-8",
    title: "Day 8",
    theme: "Edit as Worship",
    location: "Santiago de Puriscal → San José",
    isTransferDay: true,
    spiritualAnchor: "Stewardship and excellence.",
    creativeFocus: "Edit rhythm and color as atmosphere. Fundamentals: selects, structure, and a first pass.",
    fieldWork: "",
    eveningTouchpoint: ""
  },
  {
    id: 9,
    slug: "day-9",
    title: "Day 9",
    theme: "Delivery and Impact",
    location: "San José",
    isTransferDay: false,
    spiritualAnchor: "Commissioning and sending.",
    creativeFocus: "Delivery and impact. Fundamentals: finishing, export, and presentation.",
    fieldWork: "",
    eveningTouchpoint: ""
  }
];

export function getDayBySlug(slug: string): Day | undefined {
  return itinerary.find(day => day.slug === slug);
}

export function getDayById(id: number): Day | undefined {
  return itinerary.find(day => day.id === id);
}