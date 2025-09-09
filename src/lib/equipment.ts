export interface EquipmentItem {
  name: string;
  category: 'camera' | 'lens' | 'audio' | 'lighting' | 'storage' | 'accessories';
  description?: string;
}

export const equipmentKit: EquipmentItem[] = [
  // Camera & Core
  {
    name: "Panasonic GH4",
    category: "camera",
    description: "Professional 4K mirrorless camera body"
  },
  {
    name: "Powerextra 2-Pack DMW-BLF19 batteries",
    category: "camera",
    description: "Extended battery system for all-day shooting"
  },
  {
    name: "Transcend RDC8 USB 3.1 Gen 1 card reader",
    category: "storage",
    description: "Fast card reader for media transfer"
  },
  
  // Lenses
  {
    name: "Panasonic Lumix G X Vario PZ 14–42mm f/3.5–5.6 ASPH Power O.I.S. lens",
    category: "lens",
    description: "Versatile zoom lens with optical stabilization"
  },
  {
    name: "TTArtisan 25mm f/2 lens for Micro Four Thirds",
    category: "lens", 
    description: "Fast prime lens for low light and portraits"
  },
  {
    name: "K&F Concept 37mm ND2–ND400 filter",
    category: "lens",
    description: "Variable neutral density filter for exposure control"
  },
  {
    name: "K&F Concept 43mm ND2–ND400 filter",
    category: "lens",
    description: "Variable neutral density filter for exposure control"
  },
  
  // Audio
  {
    name: "Godox Movlink wireless system",
    category: "audio",
    description: "Professional wireless microphone system"
  },
  
  // Lighting
  {
    name: "Amaran 100d light",
    category: "lighting", 
    description: "Powerful daylight-balanced LED"
  },
  {
    name: "SmallRig RA-D55 Parabolic Softbox (21.6\" x 14.6\")",
    category: "lighting",
    description: "Soft, even light modifier"
  },
  {
    name: "2x Neewer LED light panel kit",
    category: "lighting",
    description: "Portable LED panels for fill and accent lighting"
  },
  {
    name: "Flashpoint Nano 8.5' light stand",
    category: "lighting",
    description: "Lightweight support for lighting gear"
  },
  
  // Support & Storage
  {
    name: "KF09.136A tripod",
    category: "accessories",
    description: "Sturdy tripod for stable shots"
  },
  {
    name: "Lexar 128GB SD cards (2-pack)",
    category: "storage",
    description: "High-speed memory cards for 4K recording"
  },
  {
    name: "1TB external hard drive", 
    category: "storage",
    description: "Backup and archive your footage"
  },
  {
    name: "Pelican Vault V525 rolling case with padded dividers",
    category: "accessories",
    description: "Professional hard case for safe transport"
  }
];

export const equipmentByCategory = {
  camera: equipmentKit.filter(item => item.category === 'camera'),
  lens: equipmentKit.filter(item => item.category === 'lens'),
  audio: equipmentKit.filter(item => item.category === 'audio'), 
  lighting: equipmentKit.filter(item => item.category === 'lighting'),
  storage: equipmentKit.filter(item => item.category === 'storage'),
  accessories: equipmentKit.filter(item => item.category === 'accessories'),
} as const;

export const getTotalEquipmentValue = () => {
  // Approximate retail value for marketing purposes
  return 2800; // Over $2,800 worth of equipment
};