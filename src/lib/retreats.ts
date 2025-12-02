export interface RetreatData {
  slug: string;
  title: string;
  country: string;
  city?: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  theme: string;
  heroImage: string;
  ogImage: string;
  registerUrl: string;
  emailCtaText: string;
  seoDescription: string;
  overview: string;
  learningOutcomes: string[];
  itinerary: DayItem[];
  faqs: FAQ[];
  gearNote?: string;
}

interface DayItem {
  day: number;
  title: string;
  description: string;
  location?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export const RETREATS: Record<string, RetreatData> = {
  'costa-rica': {
    slug: 'costa-rica',
    title: 'Costa Rica Retreat',
    country: 'Costa Rica',
    city: 'San José • Jacó • Santiago de Puriscal',
    startDate: '2026-02-20',
    endDate: '2026-02-28',
    theme: 'Fundamentals of Documentary',
    heroImage: '/images/hero-costa-rica.jpg',
    ogImage: '/images/og-costa-rica.jpg',
    registerUrl: '/register',
    emailCtaText: 'Join the Email List',
    seoDescription: 'Costa Rica 9-day filmmaking retreat Feb 20-28, 2026. Faith-forward documentary fundamentals in breathtaking locations.',
    overview: 'Where creativity meets calling. Join us for a transformative filmmaking and storytelling retreat in the heart of Costa Rica\'s breathtaking landscapes.',
    learningOutcomes: [
      'Master documentary fundamentals and storytelling techniques',
      'Learn professional camera operation and composition',
      'Develop your unique creative voice through faith-integrated practice',
      'Build lasting connections with fellow filmmakers',
      'Create portfolio-worthy content in stunning locations'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Orientation',
        description: 'Welcome to Costa Rica! Airport pickup, orientation, and equipment introduction.',
        location: 'San José'
      },
      {
        day: 2,
        title: 'Camera Fundamentals',
        description: 'Master your camera settings, composition basics, and begin filming.',
        location: 'San José'
      },
      {
        day: 3,
        title: 'Travel Day & Location Scouting',
        description: 'Journey to Jacó with strategic stops for practice shoots.',
        location: 'En route to Jacó'
      },
      {
        day: 4,
        title: 'Coastal Cinematography',
        description: 'Ocean filming techniques, natural lighting, and interview setups.',
        location: 'Jacó'
      },
      {
        day: 5,
        title: 'Story Development',
        description: 'Craft compelling narratives and practice interview techniques.',
        location: 'Jacó'
      },
      {
        day: 6,
        title: 'Mountain Adventure',
        description: 'Travel to Santiago de Puriscal for mountain and rural filming.',
        location: 'Santiago de Puriscal'
      },
      {
        day: 7,
        title: 'Community Stories',
        description: 'Document local stories and practice cultural sensitivity in filmmaking.',
        location: 'Santiago de Puriscal'
      },
      {
        day: 8,
        title: 'Editing & Review',
        description: 'Post-production basics, feedback sessions, and final touches.',
        location: 'Santiago de Puriscal'
      },
      {
        day: 9,
        title: 'Departure',
        description: 'Final breakfast, equipment return, and airport transfer.',
        location: 'San José'
      }
    ],
    faqs: [
      {
        question: 'What are the exact dates?',
        answer: 'The Costa Rica retreat runs from February 20-28, 2026 (Friday to Saturday, 9 days total).'
      },
      {
        question: 'What\'s included in the retreat?',
        answer: 'Professional equipment kit (worth $2,800+), accommodation, most meals, transportation during the retreat, and expert instruction.'
      },
      {
        question: 'Do I need filming experience?',
        answer: 'No prior experience required! This retreat is designed for beginners through intermediate filmmakers.'
      },
      {
        question: 'What about travel to Costa Rica?',
        answer: 'International flights to San José (SJO) are not included. We provide airport pickup and all local transportation.'
      }
    ],
    gearNote: 'Professional equipment kit included worth over $2,800. No need to bring filming gear!'
  },
  'greece': {
    slug: 'greece',
    title: 'Greece Retreat',
    country: 'Greece',
    city: 'Athens • Santorini • Mykonos',
    startDate: '2026-05-22',
    endDate: '2026-05-30',
    theme: 'Visual Storytelling & Mythic Structure',
    heroImage: '/images/hero-greece.jpg',
    ogImage: '/images/og-greece.jpg',
    registerUrl: '/register',
    emailCtaText: 'Join the Email List',
    seoDescription: 'Greece 9-day filmmaking retreat May 22-30, 2026. Visual storytelling and mythic structure in ancient landscapes.',
    overview: 'Discover the power of visual storytelling amidst Greece\'s timeless beauty. Learn mythic structure and cinematic techniques where stories began.',
    learningOutcomes: [
      'Master visual storytelling and mythic narrative structure',
      'Explore cinematic composition in historic locations',
      'Develop character-driven documentary techniques',
      'Create compelling visual narratives with deeper meaning',
      'Connect ancient storytelling wisdom with modern filmmaking'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Athens',
        description: 'Welcome to Greece! Airport pickup, orientation, and exploring ancient storytelling.',
        location: 'Athens'
      },
      {
        day: 2,
        title: 'Mythic Structure Foundations',
        description: 'Learn storytelling fundamentals where mythology was born.',
        location: 'Athens'
      },
      {
        day: 3,
        title: 'Island Journey Begins',
        description: 'Ferry to Santorini with practice filming during golden hour.',
        location: 'En route to Santorini'
      },
      {
        day: 4,
        title: 'Volcanic Cinematography',
        description: 'Capture dramatic landscapes and practice visual metaphor.',
        location: 'Santorini'
      },
      {
        day: 5,
        title: 'Character Development',
        description: 'Interview techniques and character-driven storytelling.',
        location: 'Santorini'
      },
      {
        day: 6,
        title: 'Island Transitions',
        description: 'Travel to Mykonos, practice transition shots and b-roll.',
        location: 'Mykonos'
      },
      {
        day: 7,
        title: 'Cultural Documentation',
        description: 'Document local traditions and practice cultural storytelling.',
        location: 'Mykonos'
      },
      {
        day: 8,
        title: 'Story Assembly',
        description: 'Edit your visual stories and prepare presentations.',
        location: 'Mykonos'
      },
      {
        day: 9,
        title: 'Departure',
        description: 'Final breakfast, equipment return, and departure.',
        location: 'Athens'
      }
    ],
    faqs: [
      {
        question: 'What are the exact dates?',
        answer: 'The Greece retreat runs from May 22-30, 2026 (Friday to Saturday, 9 days total).'
      },
      {
        question: 'What\'s included in the retreat?',
        answer: 'Professional equipment kit, accommodation, most meals, inter-island ferries, and expert instruction.'
      },
      {
        question: 'Is this suitable for beginners?',
        answer: 'Yes! We welcome filmmakers of all skill levels. The focus is on storytelling fundamentals.'
      },
      {
        question: 'What about international travel?',
        answer: 'Flights to Athens are not included. We provide airport pickup and all local transportation including ferries.'
      }
    ],
    gearNote: 'Gear: bring your own or rental options available.'
  },
  'africa': {
    slug: 'africa',
    title: 'Africa Retreat',
    country: 'Kenya',
    city: 'Nairobi • Maasai Mara • Lake Nakuru',
    startDate: '2026-08-21',
    endDate: '2026-08-29',
    theme: 'Missional Filmmaking & Community',
    heroImage: '/images/hero-africa.jpg',
    ogImage: '/images/og-africa.jpg',
    registerUrl: '/register',
    emailCtaText: 'Join the Email List',
    seoDescription: 'Kenya 9-day filmmaking retreat Aug 21-29, 2026. Missional filmmaking and community storytelling in East Africa.',
    overview: 'Learn missional filmmaking while serving communities in Kenya. Discover how storytelling can bridge cultures and create lasting impact.',
    learningOutcomes: [
      'Develop missional filmmaking and community engagement skills',
      'Practice cultural sensitivity and collaborative storytelling',
      'Master documentary techniques in challenging environments',
      'Create impactful stories that serve and honor communities',
      'Build cross-cultural connections through shared creativity'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Cultural Orientation',
        description: 'Welcome to Kenya! Cultural briefing and community partnership introduction.',
        location: 'Nairobi'
      },
      {
        day: 2,
        title: 'Community Engagement Principles',
        description: 'Learn ethical filmmaking and begin community partnerships.',
        location: 'Nairobi'
      },
      {
        day: 3,
        title: 'Safari Cinematography',
        description: 'Travel to Maasai Mara, wildlife filming, and landscape documentation.',
        location: 'Maasai Mara'
      },
      {
        day: 4,
        title: 'Cultural Exchange',
        description: 'Film with Maasai community, learning traditional storytelling.',
        location: 'Maasai Mara'
      },
      {
        day: 5,
        title: 'Conservation Stories',
        description: 'Document conservation efforts and environmental storytelling.',
        location: 'Maasai Mara'
      },
      {
        day: 6,
        title: 'Lake Nakuru Adventure',
        description: 'Travel to Lake Nakuru for flamingo filming and reflection.',
        location: 'Lake Nakuru'
      },
      {
        day: 7,
        title: 'Community Service Project',
        description: 'Collaborative filming project serving local community needs.',
        location: 'Lake Nakuru'
      },
      {
        day: 8,
        title: 'Story Completion',
        description: 'Final interviews, editing, and community screening.',
        location: 'Nairobi'
      },
      {
        day: 9,
        title: 'Departure & Reflection',
        description: 'Final reflections, equipment return, and departure.',
        location: 'Nairobi'
      }
    ],
    faqs: [
      {
        question: 'What are the exact dates?',
        answer: 'The Africa retreat runs from August 21-29, 2026 (Friday to Saturday, 9 days total).'
      },
      {
        question: 'What\'s included in the retreat?',
        answer: 'Professional equipment kit, accommodation, meals, safari transport, community partnerships, and expert instruction.'
      },
      {
        question: 'Is this retreat safe?',
        answer: 'Yes! We work with experienced local partners and maintain high safety standards throughout the retreat.'
      },
      {
        question: 'What about visas and vaccinations?',
        answer: 'Participants are responsible for obtaining Kenya visas and recommended vaccinations. We provide detailed preparation information.'
      }
    ],
    gearNote: 'Gear: bring your own or rental options available.'
  },
  'japan': {
    slug: 'japan',
    title: 'Japan Retreat',
    country: 'Japan',
    city: 'Tokyo • Kyoto • Nara',
    startDate: '2026-11-20',
    endDate: '2026-11-28',
    theme: 'Intro to Narrative Filmmaking (Role Rotations)',
    heroImage: '/images/hero-japan.jpg',
    ogImage: '/images/og-japan.jpg',
    registerUrl: '/register',
    emailCtaText: 'Join the Email List',
    seoDescription: 'Japan 9-day filmmaking retreat Nov 20-28, 2026. Narrative filmmaking and role rotations in traditional and modern Japan.',
    overview: 'Explore narrative filmmaking in Japan where tradition meets innovation. Learn through role rotations in one of cinema\'s most influential cultures.',
    learningOutcomes: [
      'Master narrative filmmaking fundamentals through hands-on practice',
      'Experience all key film production roles through rotation system',
      'Study Japanese cinema techniques and cultural storytelling',
      'Create short narrative films in iconic locations',
      'Develop collaborative filmmaking and leadership skills'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Tokyo Arrival',
        description: 'Welcome to Japan! Cultural orientation and cinema history introduction.',
        location: 'Tokyo'
      },
      {
        day: 2,
        title: 'Narrative Fundamentals',
        description: 'Learn story structure, character development, and begin role rotations.',
        location: 'Tokyo'
      },
      {
        day: 3,
        title: 'Urban Cinematography',
        description: 'Film in modern Tokyo, practice camera operation and directing.',
        location: 'Tokyo'
      },
      {
        day: 4,
        title: 'Journey to Tradition',
        description: 'Travel to Kyoto, transition filming, and traditional storytelling.',
        location: 'Kyoto'
      },
      {
        day: 5,
        title: 'Temple Narratives',
        description: 'Film in historic temples, practice sound recording and production.',
        location: 'Kyoto'
      },
      {
        day: 6,
        title: 'Nara Adventure',
        description: 'Film with deer in Nara Park, practice editing and post-production.',
        location: 'Nara'
      },
      {
        day: 7,
        title: 'Short Film Production',
        description: 'Complete narrative short films with full role rotations.',
        location: 'Kyoto'
      },
      {
        day: 8,
        title: 'Film Festival',
        description: 'Final edits, film screening, and celebration dinner.',
        location: 'Tokyo'
      },
      {
        day: 9,
        title: 'Sayonara',
        description: 'Final breakfast, equipment return, and departure.',
        location: 'Tokyo'
      }
    ],
    faqs: [
      {
        question: 'What are the exact dates?',
        answer: 'The Japan retreat runs from November 20-28, 2026 (Friday to Saturday, 9 days total).'
      },
      {
        question: 'What\'s included in the retreat?',
        answer: 'Professional equipment kit, accommodation, most meals, bullet train travel, and expert instruction.'
      },
      {
        question: 'Do I need narrative film experience?',
        answer: 'No! This retreat is designed to introduce narrative filmmaking through supportive role rotations.'
      },
      {
        question: 'What about language barriers?',
        answer: 'Our team includes Japanese speakers, and we focus on locations and activities suitable for international visitors.'
      }
    ],
    gearNote: 'Gear: bring your own or rental options available.'
  },
  'panama': {
    slug: 'panama',
    title: 'Panama Retreat',
    country: 'Panama',
    city: 'Panama City • Gamboa • El Valle',
    startDate: '2027-02-26',
    endDate: '2027-03-06',
    theme: 'Advanced Documentary & Investigative Storytelling',
    heroImage: '/images/hero-panama.jpg',
    ogImage: '/images/og-panama.jpg',
    registerUrl: '/register',
    emailCtaText: 'Join the Email List',
    seoDescription: 'Panama 9-day filmmaking retreat Feb 26-Mar 6, 2027. Advanced documentary and investigative storytelling techniques.',
    overview: 'Master advanced documentary techniques in Panama\'s diverse landscapes. Learn investigative storytelling where two worlds meet.',
    learningOutcomes: [
      'Develop advanced documentary and investigative techniques',
      'Master complex story structures and narrative depth',
      'Practice ethical investigative journalism principles',
      'Create compelling long-form documentary content',
      'Build skills in sensitive subject documentation'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Panama City Arrival',
        description: 'Welcome briefing, investigative storytelling introduction.',
        location: 'Panama City'
      },
      {
        day: 2,
        title: 'Urban Investigation',
        description: 'Learn research techniques and begin canal district documentation.',
        location: 'Panama City'
      },
      {
        day: 3,
        title: 'Rainforest Documentation',
        description: 'Travel to Gamboa, environmental storytelling techniques.',
        location: 'Gamboa'
      },
      {
        day: 4,
        title: 'Scientific Collaboration',
        description: 'Film with researchers, practice technical subject documentation.',
        location: 'Gamboa'
      },
      {
        day: 5,
        title: 'Community Stories',
        description: 'Document indigenous communities with cultural sensitivity.',
        location: 'Gamboa'
      },
      {
        day: 6,
        title: 'Mountain Perspectives',
        description: 'Travel to El Valle, practice multiple perspective storytelling.',
        location: 'El Valle'
      },
      {
        day: 7,
        title: 'Advanced Editing',
        description: 'Complex story assembly and advanced post-production.',
        location: 'El Valle'
      },
      {
        day: 8,
        title: 'Documentary Completion',
        description: 'Final interviews, story refinement, and presentation prep.',
        location: 'Panama City'
      },
      {
        day: 9,
        title: 'Departure',
        description: 'Final screening, equipment return, and departure.',
        location: 'Panama City'
      }
    ],
    faqs: [
      {
        question: 'What are the exact dates?',
        answer: 'The Panama retreat runs from February 26 - March 6, 2027 (Friday to Saturday, 9 days total).'
      },
      {
        question: 'What\'s included in the retreat?',
        answer: 'Professional equipment kit, accommodation, meals, transportation, research partnerships, and expert instruction.'
      },
      {
        question: 'Is this suitable for intermediate filmmakers?',
        answer: 'This retreat is designed for filmmakers with some documentary experience ready for advanced techniques.'
      },
      {
        question: 'What about safety in field work?',
        answer: 'We maintain high safety standards and work with experienced local partners for all field documentation.'
      }
    ],
    gearNote: 'Gear: bring your own or rental options available.'
  },
  'london': {
    slug: 'london',
    title: 'United Kingdom Retreat',
    country: 'United Kingdom',
    city: 'London → Oxford → Northern Ireland',
    startDate: '2027-05-21',
    endDate: '2027-05-29',
    theme: 'Narrative Writing & Directing',
    heroImage: '/images/hero-london.jpg',
    ogImage: '/images/og-london.jpg',
    registerUrl: '/register',
    emailCtaText: 'Join the Email List',
    seoDescription: 'United Kingdom 9-day filmmaking retreat May 21-29, 2027. Narrative writing and directing across London, Oxford, and Northern Ireland.',
    overview: 'Master narrative writing and directing where stories have thrived for centuries. From Shakespeare to modern cinema, discover your directorial voice shooting in London\'s urban density, Oxford\'s historical character, and Northern Ireland\'s sweeping landscapes to build varied narrative tones and production design challenges.',
    learningOutcomes: [
      'Develop sophisticated narrative writing and story structure',
      'Master directing techniques for compelling performances',
      'Study British cinema and storytelling traditions',
      'Create character-driven narrative content',
      'Build leadership and collaborative directing skills'
    ],
    itinerary: [
      {
        day: 1,
        title: 'London Arrival',
        description: 'Welcome to the United Kingdom! Theatre district tour and storytelling immersion.',
        location: 'London'
      },
      {
        day: 2,
        title: 'Script Development',
        description: 'Master screenplay writing and story development techniques in urban density.',
        location: 'London'
      },
      {
        day: 3,
        title: 'Directing Fundamentals',
        description: 'Learn directing principles in iconic London locations.',
        location: 'London'
      },
      {
        day: 4,
        title: 'Oxford Literary Journey',
        description: 'Travel to Oxford, film in historic literary settings with historical character.',
        location: 'Oxford'
      },
      {
        day: 5,
        title: 'Performance Direction',
        description: 'Practice actor direction and performance capture in academic environments.',
        location: 'Oxford'
      },
      {
        day: 6,
        title: 'Northern Ireland Adventure',
        description: 'Travel to Northern Ireland, explore sweeping landscapes for production design.',
        location: 'Northern Ireland'
      },
      {
        day: 7,
        title: 'Landscape Narratives',
        description: 'Complete narrative short films utilizing varied landscapes and narrative tones.',
        location: 'Northern Ireland'
      },
      {
        day: 8,
        title: 'Production Design Mastery',
        description: 'Final production work showcasing different environments and visual storytelling.',
        location: 'Northern Ireland'
      },
      {
        day: 9,
        title: 'Farewell',
        description: 'Final breakfast, equipment return, and departure.',
        location: 'London'
      }
    ],
    faqs: [
      {
        question: 'What are the exact dates?',
        answer: 'The United Kingdom retreat runs from May 21-29, 2027 (Friday to Saturday, 9 days total).'
      },
      {
        question: 'What\'s included in the retreat?',
        answer: 'Professional equipment kit, accommodation, meals, travel between London/Oxford/Northern Ireland, location permits, and expert instruction.'
      },
      {
        question: 'Do I need writing experience?',
        answer: 'No prior scriptwriting experience required, but some storytelling background is helpful.'
      },
      {
        question: 'Will we work with actors?',
        answer: 'Yes! We collaborate with local acting students and community theatre groups across all three locations.'
      }
    ],
    gearNote: 'Gear: bring your own or rental options available.'
  },
  'germany': {
    slug: 'germany',
    title: 'Germany Retreat',
    country: 'Germany',
    city: 'Berlin • Munich • Rothenburg',
    startDate: '2027-08-20',
    endDate: '2027-08-28',
    theme: 'Cinematic Collaboration & Production Design',
    heroImage: '/images/hero-germany.jpg',
    ogImage: '/images/og-germany.jpg',
    registerUrl: '/register',
    emailCtaText: 'Join the Email List',
    seoDescription: 'Germany 9-day filmmaking retreat Aug 20-28, 2027. Cinematic collaboration and production design in historic German cities.',
    overview: 'Explore cinematic collaboration and production design in Germany\'s rich cultural landscape. Learn teamwork and visual storytelling in historic settings.',
    learningOutcomes: [
      'Master cinematic collaboration and team-based filmmaking',
      'Develop production design and visual storytelling skills',
      'Study German cinema traditions and Expressionist techniques',
      'Create visually stunning collaborative productions',
      'Build advanced project management and leadership abilities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Berlin Arrival',
        description: 'Welcome to Berlin! Film history tour and collaboration principles.',
        location: 'Berlin'
      },
      {
        day: 2,
        title: 'Production Design Basics',
        description: 'Learn visual design, set decoration, and cinematic aesthetics.',
        location: 'Berlin'
      },
      {
        day: 3,
        title: 'Urban Cinematography',
        description: 'Film in Berlin\'s diverse neighborhoods, practice team coordination.',
        location: 'Berlin'
      },
      {
        day: 4,
        title: 'Bavarian Journey',
        description: 'Travel to Munich, practice location scouting and design.',
        location: 'Munich'
      },
      {
        day: 5,
        title: 'Alpine Production',
        description: 'Film in Bavarian Alps, coordinate complex outdoor productions.',
        location: 'Munich'
      },
      {
        day: 6,
        title: 'Medieval Storytelling',
        description: 'Travel to Rothenburg, explore period filmmaking techniques.',
        location: 'Rothenburg'
      },
      {
        day: 7,
        title: 'Collaborative Projects',
        description: 'Complete team-based productions with full design elements.',
        location: 'Rothenburg'
      },
      {
        day: 8,
        title: 'Berlin Showcase',
        description: 'Return to Berlin for final production and team presentations.',
        location: 'Berlin'
      },
      {
        day: 9,
        title: 'Auf Wiedersehen',
        description: 'Final breakfast, equipment return, and departure.',
        location: 'Berlin'
      }
    ],
    faqs: [
      {
        question: 'What are the exact dates?',
        answer: 'The Germany retreat runs from August 20-28, 2027 (Friday to Saturday, 9 days total).'
      },
      {
        question: 'What\'s included in the retreat?',
        answer: 'Professional equipment kit, accommodation, meals, train travel, production supplies, and expert instruction.'
      },
      {
        question: 'Is this suitable for collaborative learning?',
        answer: 'Absolutely! This retreat is specifically designed for team-based learning and collaborative creation.'
      },
      {
        question: 'What about production budgets?',
        answer: 'All production materials and supplies are included. Focus on creativity, not cost!'
      }
    ],
    gearNote: 'Gear: bring your own or rental options available.'
  },
  'thailand': {
    slug: 'thailand',
    title: 'Thailand Retreat',
    country: 'Thailand',
    city: 'Bangkok • Chiang Mai • Pai',
    startDate: '2027-11-26',
    endDate: '2027-12-04',
    theme: 'Narrative Masterpiece (Festival-ready Short)',
    heroImage: '/images/hero-thailand.jpg',
    ogImage: '/images/og-thailand.jpg',
    registerUrl: '/register',
    emailCtaText: 'Join the Email List',
    seoDescription: 'Thailand 9-day filmmaking retreat Nov 26-Dec 4, 2027. Create festival-ready narrative masterpiece in Southeast Asia.',
    overview: 'Create your festival-ready narrative masterpiece in Thailand\'s stunning landscapes. The culminating experience for serious filmmakers.',
    learningOutcomes: [
      'Produce festival-quality narrative short films',
      'Master advanced cinematography and storytelling techniques',
      'Develop professional post-production and color grading skills',
      'Create portfolio centerpiece for film festival submissions',
      'Build professional filmmaker network and industry connections'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Bangkok Arrival',
        description: 'Welcome to Thailand! Masterpiece planning and pre-production.',
        location: 'Bangkok'
      },
      {
        day: 2,
        title: 'Advanced Pre-Production',
        description: 'Script refinement, storyboarding, and professional planning.',
        location: 'Bangkok'
      },
      {
        day: 3,
        title: 'Urban Production',
        description: 'Begin masterpiece filming in Bangkok\'s dynamic environment.',
        location: 'Bangkok'
      },
      {
        day: 4,
        title: 'Northern Journey',
        description: 'Travel to Chiang Mai, continue production with mountain backdrops.',
        location: 'Chiang Mai'
      },
      {
        day: 5,
        title: 'Cultural Integration',
        description: 'Film in temples and markets, integrate Thai culture authentically.',
        location: 'Chiang Mai'
      },
      {
        day: 6,
        title: 'Mountain Finale',
        description: 'Travel to Pai for stunning mountain cinematography.',
        location: 'Pai'
      },
      {
        day: 7,
        title: 'Advanced Post-Production',
        description: 'Professional editing, color grading, and sound design.',
        location: 'Pai'
      },
      {
        day: 8,
        title: 'Masterpiece Completion',
        description: 'Final touches, festival preparation, and celebration.',
        location: 'Bangkok'
      },
      {
        day: 9,
        title: 'Festival Launch',
        description: 'Final screening, festival strategy, and departure.',
        location: 'Bangkok'
      }
    ],
    faqs: [
      {
        question: 'What are the exact dates?',
        answer: 'The Thailand retreat runs from November 26 - December 4, 2027 (Friday to Saturday, 9 days total).'
      },
      {
        question: 'What\'s included in the retreat?',
        answer: 'Professional equipment kit, accommodation, meals, domestic flights, festival submission prep, and expert instruction.'
      },
      {
        question: 'Is this for advanced filmmakers?',
        answer: 'This is our most advanced retreat, recommended for filmmakers with prior narrative experience.'
      },
      {
        question: 'Will my film be festival-ready?',
        answer: 'Yes! Films will be professionally produced and prepared for festival submission with distribution guidance.'
      }
    ],
    gearNote: 'Gear: bring your own or rental options available.'
  }
};

export function getRetreat(slug: string): RetreatData | null {
  return RETREATS[slug] || null;
}

export function getAllRetreats(): RetreatData[] {
  return Object.values(RETREATS);
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formatOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };

  const startFormatted = start.toLocaleDateString('en-US', formatOptions);
  const endFormatted = end.toLocaleDateString('en-US', formatOptions);

  // If same month, show "Month Day–Day, Year"
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    const monthYear = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return `${monthYear.split(' ')[0]} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`;
  }

  return `${startFormatted} – ${endFormatted}`;
}