import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts (optional - uses default if not available)
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Inter'
  },
  header: {
    marginBottom: 30,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20
  },
  section: {
    marginBottom: 25
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 5
  },
  checkbox: {
    width: 12,
    height: 12,
    border: '1.5pt solid #6b7280',
    marginRight: 10,
    marginTop: 2,
    backgroundColor: '#ffffff'
  },
  checkedBox: {
    width: 12,
    height: 12,
    border: '1.5pt solid #2d5016',
    backgroundColor: '#2d5016',
    marginRight: 10,
    marginTop: 2
  },
  checkmark: {
    fontSize: 8,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 1.2
  },
  itemText: {
    fontSize: 11,
    color: '#374151',
    flex: 1,
    lineHeight: 1.4
  },
  note: {
    fontSize: 9,
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 2,
    paddingLeft: 22
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    textAlign: 'center'
  },
  footerText: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4
  },
  brandText: {
    fontSize: 12,
    color: '#2d5016',
    fontWeight: 'bold'
  }
});

interface ChecklistItem {
  id: string;
  text: string;
  note?: string;
  checked?: boolean;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

interface GearChecklistPdfProps {
  selectedItems?: string[];
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

export default function GearChecklistPdf({ selectedItems = [], userEmail }: GearChecklistPdfProps) {
  const isItemChecked = (itemId: string) => selectedItems.includes(itemId);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>The Filmmaker's Essential Gear Checklist</Text>
          <Text style={styles.subtitle}>Costa Rica Filmmaking Retreat • Born to Create Project</Text>
          {userEmail && (
            <Text style={styles.subtitle}>Prepared for: {userEmail}</Text>
          )}
        </View>

        {checklistData.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex}>
                <View style={styles.item}>
                  <View style={isItemChecked(item.id) ? styles.checkedBox : styles.checkbox}>
                    {isItemChecked(item.id) && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.itemText}>{item.text}</Text>
                </View>
                {item.note && (
                  <Text style={styles.note}>{item.note}</Text>
                )}
              </View>
            ))}
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Complete your gear preparation for the ultimate filmmaking experience</Text>
          <Text style={styles.brandText}>Born to Create Project</Text>
          <Text style={styles.footerText}>Costa Rica • February 20-28, 2026</Text>
          <Text style={styles.footerText}>thebtcp.com</Text>
        </View>
      </Page>
    </Document>
  );
}