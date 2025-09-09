export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  skillsFocus?: string[];
  gearNotes?: string;
  terrainNotes?: string;
}

export interface Day {
  day: number;
  date: string;
  city: string;
  hotel: string;
  title: string;
  highlights: string[];
  transferFlag?: boolean;
  safetyNotes?: string[];
  schedule: ScheduleItem[];
  blurb: string;
}

export const itinerary: Day[] = [
  {
    day: 1,
    date: "Friday, February 20, 2026",
    city: "San José",
    hotel: "Hotel Cultura Plaza",
    title: "Arrival & Welcome",
    blurb: "Land in Costa Rica's vibrant capital, settle in, and begin your creative journey with welcome dinner and neighborhood scout.",
    highlights: ["SJO Airport arrival", "Hotel check-in", "Welcome dinner", "Neighborhood scout", "Safety briefing"],
    safetyNotes: ["Keep gear minimal during scout", "Stay with buddy system", "Secure valuables in hotel safe"],
    schedule: [
      {
        time: "2:00 PM",
        title: "Airport Pickup & Transfer",
        description: "Meet at SJO arrivals, transfer to Hotel Cultura Plaza in downtown San José",
        gearNotes: "Keep cameras packed during transfer"
      },
      {
        time: "4:00 PM", 
        title: "Check-in & Gear Setup",
        description: "Hotel check-in, room assignments, and initial equipment distribution",
        terrainNotes: "Urban environment, paved surfaces"
      },
      {
        time: "6:30 PM",
        title: "Welcome Dinner",
        description: "Group introductions and retreat overview at traditional Costa Rican restaurant",
        skillsFocus: ["Team building", "Project expectations"]
      },
      {
        time: "8:00 PM",
        title: "Neighborhood Scout & Safety Briefing",
        description: "Light neighborhood exploration and comprehensive safety briefing for urban filming",
        skillsFocus: ["Urban safety", "Location awareness"],
        gearNotes: "Cameras optional for this initial scout",
        terrainNotes: "Well-lit city streets and plazas"
      }
    ]
  },
  {
    day: 2,
    date: "Saturday, February 21, 2026",
    city: "San José",
    hotel: "Hotel Cultura Plaza", 
    title: "City Workshop",
    blurb: "Master street cinematography foundations, sound design, composition, and movement techniques in Costa Rica's bustling capital.",
    highlights: ["Street coverage foundations", "Sound beds recording", "Composition techniques", "Movement exercises", "Evening critique"],
    safetyNotes: ["Watch for traffic", "Secure equipment when moving", "Stay hydrated"],
    schedule: [
      {
        time: "7:00 AM",
        title: "Breakfast",
        description: "Hotel breakfast and daily briefing"
      },
      {
        time: "8:30 AM",
        title: "Street Coverage Foundations",
        description: "Learn composition, framing, and movement techniques for urban environments",
        skillsFocus: ["Rule of thirds", "Leading lines", "Frame composition", "Camera movement"],
        gearNotes: "Sony NEX 6, 18-55mm lens recommended",
        terrainNotes: "City streets, markets, Central Avenue"
      },
      {
        time: "12:00 PM",
        title: "Lunch Break",
        description: "Local cuisine and morning footage review"
      },
      {
        time: "2:00 PM",
        title: "Sound Beds Workshop",
        description: "Recording ambient soundscapes and city audio layers",
        skillsFocus: ["Room tone", "Ambient recording", "Audio levels", "Wind protection"],
        gearNotes: "Godox Movlink system, Sony headphones"
      },
      {
        time: "4:30 PM",
        title: "Composition & Movement",
        description: "Camera movement techniques: pans, tilts, tracking shots",
        skillsFocus: ["Smooth camera movement", "Handheld stability", "Tripod techniques"],
        gearNotes: "KF tripod, stabilization practice"
      },
      {
        time: "7:00 PM",
        title: "Evening Critique",
        description: "Review daily footage, provide feedback, discuss techniques",
        skillsFocus: ["Constructive critique", "Technical analysis", "Story development"]
      }
    ]
  },
  {
    day: 3,
    date: "Sunday, February 22, 2026",
    city: "San José",
    hotel: "Hotel Cultura Plaza",
    title: "Storycraft",
    blurb: "Develop advanced storytelling with character beats, vérité coverage, interview lighting on the move, and night sequences.",
    highlights: ["Character beats", "Vérité coverage", "Interview lighting on the move", "Night sequences", "Mixed color temperatures"],
    safetyNotes: ["Night shoot protocols", "Equipment security after dark", "Buddy system required"],
    schedule: [
      {
        time: "7:00 AM",
        title: "Breakfast", 
        description: "Hotel breakfast and story development discussion"
      },
      {
        time: "8:30 AM",
        title: "Character Beats Workshop",
        description: "Finding and following compelling subjects in documentary style",
        skillsFocus: ["Anticipation", "Decisive moments", "Non-intrusive filming", "Subject interaction"],
        gearNotes: "TTartisan 25mm prime lens for intimate coverage"
      },
      {
        time: "11:00 AM", 
        title: "Vérité Coverage Practice",
        description: "Real-world documentary filming in local markets and plazas",
        skillsFocus: ["Following action", "Multiple angles", "B-roll integration", "Natural behavior"],
        terrainNotes: "Crowded markets, uneven surfaces"
      },
      {
        time: "1:00 PM",
        title: "Working Lunch",
        description: "Lunch with location scouting for afternoon interviews"
      },
      {
        time: "2:30 PM",
        title: "Interview Lighting on the Move", 
        description: "Quick setup techniques for impromptu interviews",
        skillsFocus: ["Natural light modification", "Portable lighting", "Quick setup", "Audio sync"],
        gearNotes: "Amaran 100d, SmallRig softbox, Godox Movlink"
      },
      {
        time: "5:00 PM",
        title: "Dinner Break",
        description: "Early dinner and preparation for night filming"
      },
      {
        time: "7:30 PM",
        title: "Night Sequences & Mixed Color",
        description: "Working with artificial lighting and mixed color temperatures",
        skillsFocus: ["Low light techniques", "Color temperature matching", "LED panels", "Safety protocols"],
        gearNotes: "Neewer LED panels, tripod essential",
        terrainNotes: "Urban night environments"
      }
    ]
  },
  {
    day: 4,
    date: "Monday, February 23, 2026",
    city: "Jacó",
    hotel: "La Perlita",
    title: "Transfer to Jacó & Golden Hour",
    blurb: "Journey to the Pacific coast, check in at beachfront La Perlita, and master sunset golden hour coverage with ND workflow.",
    highlights: ["Transfer to Jacó", "Check in at La Perlita", "Sunset coastal scout", "Golden hour coverage", "ND workflow"],
    transferFlag: true,
    safetyNotes: ["Secure gear during 1.5 hour transfer", "Sand and salt protection", "Tide awareness"],
    schedule: [
      {
        time: "7:00 AM",
        title: "Breakfast & Checkout",
        description: "Final San José breakfast and hotel checkout"
      },
      {
        time: "8:30 AM", 
        title: "Transfer to Jacó",
        description: "Scenic 1.5 hour drive through mountains to Pacific coast",
        gearNotes: "Equipment secured in Pelican cases for transport",
        terrainNotes: "Mountain roads descending to coastal highway"
      },
      {
        time: "10:30 AM",
        title: "Check in at La Perlita",
        description: "Beachfront hotel check-in with ocean views",
        terrainNotes: "Beachfront property, sandy environment"
      },
      {
        time: "12:00 PM",
        title: "Coastal Lunch",
        description: "Fresh seafood lunch with Pacific Ocean views"
      },
      {
        time: "2:00 PM",
        title: "Sunset Coastal Scout", 
        description: "Explore beach locations and identify optimal sunset positions",
        skillsFocus: ["Location scouting", "Tide patterns", "Wind considerations", "Composition planning"],
        safetyNotes: ["Never turn back on ocean", "Protect gear from sand and spray"]
      },
      {
        time: "4:30 PM",
        title: "Golden Hour Coverage",
        description: "Master magic hour lighting with ocean as backdrop",
        skillsFocus: ["Color temperature", "Backlighting", "Silhouettes", "Exposure latitude"],
        gearNotes: "Both lenses, clean frequently"
      },
      {
        time: "5:30 PM",
        title: "ND Workflow Workshop",
        description: "Using neutral density filters for motion control and shallow DOF",
        skillsFocus: ["ND filter selection", "Long exposures", "Motion blur effects", "Bright light management"],
        gearNotes: "Clean filters essential in beach environment"
      },
      {
        time: "7:00 PM",
        title: "Beachside Wrap",
        description: "Review sunset footage and plan tomorrow's waterfall expedition"
      }
    ]
  },
  {
    day: 5,
    date: "Tuesday, February 24, 2026",
    city: "Jacó", 
    hotel: "La Perlita",
    title: "Waterfalls & Motion",
    blurb: "Venture into lush rainforest for waterfall cinematography, mastering shutter techniques and filtration for water with terrain safety.",
    highlights: ["Waterfalls and motion", "Shutter and filtration for water", "Terrain safety", "Midday shade coverage"],
    safetyNotes: ["Slick rock and moss surfaces", "Waterproof all equipment", "First aid accessible", "Stay on designated paths"],
    schedule: [
      {
        time: "6:00 AM",
        title: "Early Breakfast",
        description: "Quick breakfast and gear prep for jungle conditions"
      },
      {
        time: "7:00 AM",
        title: "Depart for Waterfalls", 
        description: "Drive to Manuel Antonio area waterfall locations",
        gearNotes: "All equipment in waterproof bags, extra lens cloths",
        terrainNotes: "Jungle paths, stream crossings, elevated terrain"
      },
      {
        time: "8:30 AM",
        title: "Shutter and Filtration for Water",
        description: "Control water appearance through shutter speed and filter selection",
        skillsFocus: ["Silky water effects", "Frozen droplets", "Motion blur creativity", "Filter combinations"],
        gearNotes: "KF tripod mandatory for slow shutter work"
      },
      {
        time: "10:30 AM",
        title: "Terrain Safety Workshop",
        description: "Waterfall safety protocols and equipment protection techniques", 
        skillsFocus: ["Slick surface navigation", "Equipment security", "Emergency procedures", "Buddy system"],
        safetyNotes: ["Test footing before moving", "Secure all gear with straps"]
      },
      {
        time: "12:00 PM",
        title: "Jungle Lunch",
        description: "Pack lunch at scenic waterfall viewpoint"
      },
      {
        time: "1:30 PM",
        title: "Midday Shade Coverage",
        description: "Working in dappled light and high contrast jungle environments", 
        skillsFocus: ["Exposure for highlights", "Fill light techniques", "Shadow detail", "Dynamic range management"],
        gearNotes: "Neewer LED panels for fill light",
        terrainNotes: "Uneven jungle floor, hanging branches"
      },
      {
        time: "3:30 PM",
        title: "Equipment Care & Return",
        description: "Clean all equipment, check for damage, return to hotel",
        safetyNotes: ["Thorough equipment inspection", "Remove all moisture"]
      },
      {
        time: "5:00 PM",
        title: "Maintenance Hour",
        description: "Deep clean cameras and lenses, check memory cards"
      },
      {
        time: "7:00 PM",
        title: "Dinner & Dailies Review",
        description: "Review waterfall footage, discuss motion techniques"
      }
    ]
  },
  {
    day: 6,
    date: "Wednesday, February 25, 2026",
    city: "Jacó",
    hotel: "La Perlita", 
    title: "Production Day",
    blurb: "Full production mode with dawn pickups, dusk team shoots, and mini edits at night with mentor guidance.",
    highlights: ["Production day", "Dawn pickups", "Dusk team shoots", "Mini edits at night"],
    schedule: [
      {
        time: "5:00 AM",
        title: "Dawn Pickups",
        description: "Early team captures sunrise sequences and morning coastal activity",
        skillsFocus: ["Blue hour", "First light", "Wildlife behavior", "Morning atmospherics"],
        gearNotes: "Headlamps, TTartisan 25mm for low light",
        terrainNotes: "Beach, tide pools, rocky outcrops"
      },
      {
        time: "7:30 AM",
        title: "Rotating Breakfast",
        description: "Staggered breakfast allows continuous coverage"
      },
      {
        time: "9:00 AM",
        title: "Individual Project Development",
        description: "Work on personal filming projects with mentor guidance",
        skillsFocus: ["Story development", "Shot planning", "Personal style", "Technical problem solving"]
      },
      {
        time: "12:00 PM", 
        title: "Working Lunch",
        description: "Lunch break with footage backup and card management"
      },
      {
        time: "2:00 PM",
        title: "Team Collaboration Session",
        description: "Collaborative filming exercises and peer learning",
        skillsFocus: ["Teamwork", "Multi-camera coordination", "Communication", "Role rotation"]
      },
      {
        time: "4:30 PM",
        title: "Dusk Team Shoots",
        description: "Coordinated team efforts for golden hour and sunset coverage", 
        skillsFocus: ["Team coordination", "Multiple perspectives", "Shared equipment", "Time management"],
        gearNotes: "All lighting gear available"
      },
      {
        time: "7:00 PM",
        title: "Dinner Break",
        description: "Quick dinner before evening editing session"
      },
      {
        time: "8:30 PM",
        title: "Mini Edits at Night",
        description: "Introduction to editing workflow and rough cut assembly",
        skillsFocus: ["Basic editing", "Footage organization", "Story structure", "Technical workflow"],
        gearNotes: "External hard drives for backup"
      }
    ]
  },
  {
    day: 7,
    date: "Thursday, February 26, 2026",
    city: "Santiago de Puriscal",
    hotel: "Hotel Cabañas Ensueños",
    title: "Transfer to Santiago de Puriscal",
    blurb: "Journey to the central mountains, check in at Hotel Cabañas Ensueños, and explore mountain light with atmospheric and lens depth exercises.",
    highlights: ["Transfer to Santiago de Puriscal", "Check in at Hotel Cabañas Ensueños", "Mountain light", "Atmospherics", "Lens depth exercises"],
    transferFlag: true, 
    safetyNotes: ["Altitude adjustment period", "Temperature changes", "Cloud forest navigation"],
    schedule: [
      {
        time: "7:00 AM",
        title: "Breakfast & Checkout", 
        description: "Final beachside breakfast and checkout from La Perlita"
      },
      {
        time: "8:30 AM",
        title: "Transfer to Santiago de Puriscal",
        description: "Scenic 2-hour drive ascending into central mountains",
        gearNotes: "Cameras accessible for scenic stops", 
        terrainNotes: "Winding mountain roads, significant elevation gain"
      },
      {
        time: "11:00 AM",
        title: "Check in at Hotel Cabañas Ensueños",
        description: "Mountain lodge check-in with valley views and cloud forest access",
        terrainNotes: "Mountain terrain, cooler temperatures, possible mist"
      },
      {
        time: "12:30 PM",
        title: "Mountain Lunch",
        description: "Traditional Costa Rican lunch with panoramic valley views"
      },
      {
        time: "2:00 PM",
        title: "Mountain Light Workshop",
        description: "Understanding atmospheric conditions and mountain lighting patterns",
        skillsFocus: ["Atmospheric haze", "Layered landscapes", "UV effects", "Cloud interaction"],
        gearNotes: "Both lenses for different compression effects"
      },
      {
        time: "4:00 PM",
        title: "Atmospherics Practice",
        description: "Working with mist, clouds, and changing mountain weather",
        skillsFocus: ["Weather anticipation", "Mood creation", "Atmosphere as story element", "Timing"], 
        terrainNotes: "Cloud forest paths, possible sudden weather changes"
      },
      {
        time: "5:30 PM",
        title: "Lens Depth Exercises",
        description: "Using different focal lengths to control depth perception in landscapes",
        skillsFocus: ["Telephoto compression", "Wide angle distortion", "Depth of field", "Foreground/background relationships"],
        gearNotes: "Compare 18-55mm vs 25mm prime effects"
      },
      {
        time: "7:30 PM",
        title: "Mountain Dinner",
        description: "Farm-to-table dinner and preparation for tomorrow's early start"
      }
    ]
  },
  {
    day: 8,
    date: "Friday, February 27, 2026",
    city: "San José",
    hotel: "Hotel Cultura Plaza", 
    title: "Puriscal Field Day & Return to San José",
    blurb: "Morning field work in Puriscal, then return to San José for afternoon reset at Hotel Cultura Plaza, edit lab, rough cuts, and mentor reviews.",
    highlights: ["Puriscal field day", "Return to San José afternoon", "Reset at Hotel Cultura Plaza", "Edit lab", "Rough cuts", "Mentor reviews"],
    transferFlag: true,
    schedule: [
      {
        time: "6:00 AM",
        title: "Sunrise Mountain Session",
        description: "Capture mountain sunrise and morning valley mist",
        skillsFocus: ["Mountain light", "Mist effects", "Color temperature shifts", "Atmospheric depth"],
        gearNotes: "KF tripods essential for low light",
        terrainNotes: "Pre-positioned for sunrise viewpoints"
      },
      {
        time: "8:00 AM",
        title: "Breakfast & Pack",
        description: "Mountain breakfast and preparation for return journey"
      },
      {
        time: "9:00 AM", 
        title: "Final Field Session",
        description: "Last mountain coverage and project completion shots",
        skillsFocus: ["Project completion", "Missing elements", "B-roll collection", "Establishing shots"]
      },
      {
        time: "11:00 AM",
        title: "Checkout & Travel Lunch",
        description: "Hotel checkout and early lunch before returning to San José"
      },
      {
        time: "12:30 PM",
        title: "Return to San José",
        description: "Return journey to capital city in afternoon",
        terrainNotes: "Mountain descent, 1.5 hours to San José"
      },
      {
        time: "2:30 PM",
        title: "Reset at Hotel Cultura Plaza",
        description: "Final hotel check-in and editing station setup",
        gearNotes: "All equipment organization for editing phase"
      },
      {
        time: "3:30 PM",
        title: "Edit Lab Begins",
        description: "Import all footage, organize projects, begin rough cut assembly", 
        skillsFocus: ["File organization", "Project setup", "Rough cutting", "Story structure"],
        gearNotes: "External drives, memory card management"
      },
      {
        time: "6:00 PM",
        title: "Working Dinner",
        description: "Dinner while projects render and process"
      },
      {
        time: "7:30 PM",
        title: "Rough Cuts and Mentor Reviews",
        description: "Individual mentor sessions and rough cut feedback",
        skillsFocus: ["Story refinement", "Pacing", "Technical feedback", "Creative direction"]
      },
      {
        time: "10:00 PM",
        title: "Save & Backup",
        description: "Project backup and preparation for final day"
      }
    ]
  },
  {
    day: 9,
    date: "Saturday, February 28, 2026",
    city: "San José",
    hotel: "Hotel Cultura Plaza",
    title: "Final Edits & Showcase", 
    blurb: "Complete final edits and export in San José, enjoy private showcase with feedback, then departures out of SJO.",
    highlights: ["Final edits and export", "Private showcase", "Feedback", "Departures out of SJO"],
    schedule: [
      {
        time: "7:00 AM",
        title: "Final Group Breakfast",
        description: "Last breakfast together and final day overview"
      },
      {
        time: "8:30 AM",
        title: "Final Edits and Export",
        description: "Complete final cuts, color correction, and prepare export masters",
        skillsFocus: ["Final cut polish", "Color grading", "Audio mixing", "Export settings"],
        gearNotes: "External drives for final deliverables"
      },
      {
        time: "11:00 AM",
        title: "Export Mastering",
        description: "Render final films in multiple formats for different platforms",
        skillsFocus: ["Export specifications", "Compression settings", "Platform optimization", "Archive copies"]
      },
      {
        time: "12:30 PM",
        title: "Celebration Lunch", 
        description: "Group celebration lunch and informal project sharing"
      },
      {
        time: "2:00 PM", 
        title: "Private Showcase",
        description: "Watch everyone's completed films in theater-style setting",
        skillsFocus: ["Presentation", "Peer feedback", "Achievement celebration"]
      },
      {
        time: "3:30 PM",
        title: "Feedback and Wrap",
        description: "Final feedback circle, contact exchange, and retreat wrap-up",
        skillsFocus: ["Constructive feedback", "Future goals", "Network building", "Continued learning"]
      },
      {
        time: "5:00 PM",
        title: "Departures Begin",
        description: "Staggered airport transfers to SJO coordinated with flight schedules",
        gearNotes: "All personal equipment packed in Pelican cases for travel",
        terrainNotes: "SJO airport transfers - allow 2.5 hours for international flights"
      }
    ]
  }
];

export function getDayBySlug(slug: string): Day | undefined {
  const dayNumber = parseInt(slug);
  return itinerary.find(day => day.day === dayNumber);
}