'use client';

import React, { useState, useEffect } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  note?: string;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

interface GearChecklistClientProps {
  userEmail?: string;
}

const checklistData: ChecklistSection[] = [
  {
    title: "Camera & Recording",
    items: [
      { id: "camera", text: "Camera body (mirrorless preferred for travel)", note: "Sony FX30, Canon R5, or similar" },
      { id: "lenses", text: "24-70mm f/2.8 lens (versatile for most shots)" },
      { id: "prime", text: "50mm or 85mm prime lens (for interviews/portraits)" },
      { id: "wide", text: "16-35mm wide angle lens (for landscapes/establishing shots)" },
      { id: "batteries", text: "Extra batteries (minimum 4 total)", note: "Cold weather drains batteries faster" },
      { id: "chargers", text: "Battery chargers and charging cables" },
      { id: "memory", text: "High-speed memory cards (minimum 128GB total)", note: "Bring spares - cards can fail" },
      { id: "tripod", text: "Carbon fiber tripod (lightweight but stable)" },
      { id: "monopod", text: "Monopod for handheld stability" }
    ]
  },
  {
    title: "Audio Equipment",
    items: [
      { id: "recorder", text: "External audio recorder (Zoom H5/H6 or similar)" },
      { id: "lav-mics", text: "Wireless lavalier microphone system", note: "Essential for interviews" },
      { id: "shotgun", text: "Shotgun microphone for directional audio" },
      { id: "windscreen", text: "Windscreen/deadcat for outdoor recording" },
      { id: "headphones", text: "Closed-back headphones for monitoring" },
      { id: "audio-cables", text: "XLR and 3.5mm audio cables" },
      { id: "audio-batteries", text: "AA batteries for wireless systems" }
    ]
  },
  {
    title: "Lighting & Support",
    items: [
      { id: "led-panel", text: "Portable LED panel with diffusion", note: "Battery-powered for flexibility" },
      { id: "reflector", text: "5-in-1 reflector for natural light modification" },
      { id: "c-stands", text: "Compact C-stands or light stands" },
      { id: "sandbags", text: "Sandbags for stabilizing stands in wind" },
      { id: "extension", text: "Extension cords and power strips" },
      { id: "gaffer-tape", text: "Gaffer tape for cables and mounting" }
    ]
  },
  {
    title: "Post-Production & Backup",
    items: [
      { id: "laptop", text: "Powerful laptop for editing (16GB RAM minimum)" },
      { id: "editing-software", text: "Editing software licenses/subscriptions" },
      { id: "external-drive", text: "Portable SSD for backup and additional storage" },
      { id: "card-reader", text: "High-speed card reader" },
      { id: "usb-hub", text: "USB hub with multiple ports" },
      { id: "laptop-charger", text: "Laptop charger and power adapter" }
    ]
  },
  {
    title: "Essential Accessories",
    items: [
      { id: "lens-filters", text: "Polarizing and ND filters" },
      { id: "lens-cleaning", text: "Lens cleaning kit (cloths, solution, brush)" },
      { id: "rain-cover", text: "Rain covers for camera equipment" },
      { id: "dry-bags", text: "Waterproof dry bags for gear protection" },
      { id: "multi-tool", text: "Multi-tool with screwdrivers" },
      { id: "cable-ties", text: "Cable ties and velcro straps for organization" },
      { id: "backup-plan", text: "Backup equipment list and rental contacts" }
    ]
  },
  {
    title: "Travel & Documentation",
    items: [
      { id: "gear-insurance", text: "Equipment insurance documentation" },
      { id: "customs-list", text: "Detailed gear list for customs (with serial numbers)" },
      { id: "power-adapters", text: "International power adapters" },
      { id: "pelican-case", text: "Hard case for air travel (Pelican or similar)" },
      { id: "carry-on-bag", text: "Camera bag that fits airline carry-on requirements" },
      { id: "gear-tags", text: "Luggage tags and contact information on all cases" }
    ]
  }
];

export default function GearChecklistClient({ userEmail }: GearChecklistClientProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadType, setDownloadType] = useState<'default' | 'personalized'>('default');

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
      (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag?.('event', 'checklist_view', {
        event_category: 'engagement',
        event_label: 'gear_checklist_page'
      });
    }
  }, []);

  const handleItemToggle = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const handleDownload = async (type: 'default' | 'personalized') => {
    setIsDownloading(true);
    setDownloadType(type);

    try {
      const params = new URLSearchParams();
      if (type === 'personalized') {
        params.set('selected', Array.from(checkedItems).join(','));
      }

      const response = await fetch(`/resources/gear-checklist/download?${params}`);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = type === 'personalized' 
        ? 'filmmaker-gear-checklist-personalized.pdf'
        : 'filmmaker-gear-checklist.pdf';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Track download
      if (typeof window !== 'undefined' && (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
        (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag?.('event', 'checklist_download', {
          event_category: 'engagement',
          event_label: type,
          value: Array.from(checkedItems).length
        });
      }

    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const totalItems = checklistData.reduce((sum, section) => sum + section.items.length, 0);
  const checkedCount = checkedItems.size;
  const completionPercentage = Math.round((checkedCount / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🎬📋</div>
            <h1 className="text-4xl font-heading font-bold text-ink-900 mb-6">
              The Filmmaker's Essential Gear Checklist
            </h1>
            <p className="text-xl text-ink-600 leading-relaxed mb-4">
              Everything you need for professional filmmaking in Costa Rica
            </p>
            {userEmail && (
              <p className="text-sm text-forest-600 mb-4">
                Personalized for: {userEmail}
              </p>
            )}
            <div className="bg-sage-100 rounded-lg px-6 py-4 inline-block">
              <p className="text-forest-700 font-semibold">
                Progress: {checkedCount}/{totalItems} items ({completionPercentage}%)
              </p>
              <div className="w-64 bg-white rounded-full h-2 mt-2">
                <div 
                  className="bg-forest-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6 text-center">
              Download Your Checklist
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => handleDownload('default')}
                disabled={isDownloading}
                className="group relative bg-forest-600 text-white px-8 py-6 rounded-xl hover:bg-forest-700 transition-all duration-200 disabled:opacity-50"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-lg">Quick Download</div>
                    <div className="text-forest-100 text-sm">Complete PDF checklist</div>
                  </div>
                </div>
                {isDownloading && downloadType === 'default' && (
                  <div className="absolute inset-0 bg-forest-700 bg-opacity-50 rounded-xl flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
              </button>

              <button
                onClick={() => handleDownload('personalized')}
                disabled={isDownloading}
                className="group relative bg-ink-600 text-white px-8 py-6 rounded-xl hover:bg-ink-700 transition-all duration-200 disabled:opacity-50"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-lg">My Personalized List</div>
                    <div className="text-ink-200 text-sm">PDF with your selections ({checkedCount} items)</div>
                  </div>
                </div>
                {isDownloading && downloadType === 'personalized' && (
                  <div className="absolute inset-0 bg-ink-700 bg-opacity-50 rounded-xl flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Checklist */}
          <div className="space-y-8">
            {checklistData.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6 pb-3 border-b-2 border-sage-200">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="group">
                      <label className="flex items-start gap-4 cursor-pointer p-3 rounded-lg hover:bg-sage-50 transition-colors">
                        <div className="relative flex-shrink-0 mt-1">
                          <input
                            type="checkbox"
                            checked={checkedItems.has(item.id)}
                            onChange={() => handleItemToggle(item.id)}
                            className="sr-only"
                          />
                          <div className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all duration-200 ${
                            checkedItems.has(item.id)
                              ? 'bg-forest-600 border-forest-600'
                              : 'border-ink-300 hover:border-forest-400'
                          }`}>
                            {checkedItems.has(item.id) && (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <span className={`text-ink-800 font-medium transition-colors ${
                            checkedItems.has(item.id) ? 'text-forest-700' : ''
                          }`}>
                            {item.text}
                          </span>
                          {item.note && (
                            <p className="text-sm text-ink-500 mt-1 italic">
                              {item.note}
                            </p>
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-forest-600 rounded-2xl text-white p-8 mt-12 text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Ready to Use This Gear in Paradise?
            </h2>
            <p className="text-forest-100 text-lg mb-6">
              Join us in Costa Rica for 9 days of intensive filmmaking in stunning natural locations.
            </p>
            <div className="flex items-center justify-center gap-2 text-forest-200 mb-6">
              <span className="text-xl font-semibold">February 20–28, 2026</span>
              <span>•</span>
              <span className="text-xl font-semibold">Costa Rica</span>
            </div>
            <a 
              href="/register" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-forest-600 font-bold rounded-lg hover:bg-forest-50 transition-colors"
            >
              Reserve Your Spot in Costa Rica
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}