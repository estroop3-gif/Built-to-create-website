export interface EquipmentItem {
  name: string;
  category: 'camera' | 'lens' | 'audio' | 'lighting' | 'storage' | 'accessories';
  description?: string;
}

export const equipmentKit: EquipmentItem[] = [
  // Camera & Core
  {
    name: "Sony NEX 6",
    category: "camera",
    description: "Professional mirrorless camera body"
  },
  {
    name: "NP-FW50 Battery and Three Slot Charger (3-Pack)", 
    category: "camera",
    description: "Extended battery system for all-day shooting"
  },
  
  // Lenses
  {
    name: "Sony 18–55mm OSS Lens",
    category: "lens",
    description: "Versatile zoom lens with optical stabilization"
  },
  {
    name: "TTartisan APS-C 25mm F2 Lens",
    category: "lens", 
    description: "Fast prime lens for low light and portraits"
  },
  
  // Audio
  {
    name: "Godox Movlink Wireless Lav System",
    category: "audio",
    description: "Professional wireless microphone system"
  },
  {
    name: "Sony Wired Headphones",
    category: "audio",
    description: "Monitor audio during recording"
  },
  
  // Lighting
  {
    name: "Amaran 100d Light",
    category: "lighting", 
    description: "Powerful daylight-balanced LED"
  },
  {
    name: "SmallRig RA-D55 Parabolic Softbox (21.6\" x 14.6\")",
    category: "lighting",
    description: "Soft, even light modifier"
  },
  {
    name: "Neewer LED Light Panels Kit (2 Pack)",
    category: "lighting",
    description: "Portable LED panels for fill and accent lighting"
  },
  {
    name: "Flashpoint Nano Light Stand (8.5 feet)",
    category: "lighting",
    description: "Lightweight support for lighting gear"
  },
  {
    name: "LumoPro Universal Hot Shoe Adapter II", 
    category: "accessories",
    description: "Mount lights and accessories to camera"
  },
  
  // Support & Storage
  {
    name: "KF09.136A Tripod",
    category: "accessories",
    description: "Sturdy tripod for stable shots"
  },
  {
    name: "Lexar 128GB SD Cards (2 Pack)",
    category: "storage",
    description: "High-speed memory cards for 4K recording"
  },
  {
    name: "One Terabyte External Hard Drive", 
    category: "storage",
    description: "Backup and archive your footage"
  },
  {
    name: "Pelican Vault V525 Rolling Case with Padded Dividers",
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
  return 3200; // Over $3,000 worth of equipment
};