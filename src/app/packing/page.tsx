'use client';

// import { Metadata } from 'next';
import { useState } from 'react';
import { TRAVEL_DATE_START, formatPaymentDate } from '@/lib/pricing';
import { RefundPolicyContent } from '@/shared/refundPolicyContent';

// const metadata: Metadata = {
//   title: 'Packing List - The Born to Create Project | What to Bring',
//   description: 'Essential packing list for your Costa Rica filmmaking retreat. Camera gear, clothing, and personal items for 9 days of creative exploration.',
// };

export default function PackingPage() {
  const [showRefundModal, setShowRefundModal] = useState(false);

  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-moss/30 to-sand nature-texture opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Packing Guide</h1>
          <p className="text-xl text-charcoal/70">
            Everything you need for 9 days of creative adventure in Costa Rica
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <div className="bg-forest/10 border-l-4 border-forest rounded-r-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-charcoal mb-2">Packing Checklist</h2>
            <p className="text-charcoal/70 mb-3">
              <strong>February/March Weather:</strong> Dry season with warm coastal temperatures (75-90°F) in San José and Jacó, 
              cooler mountain weather (60-75°F) in Santiago de Puriscal. Minimal rain expected but pack layers for elevation changes.
            </p>
            <p className="text-charcoal/70">
              <strong>Equipment Note:</strong> Complete professional kit included with retreat. Bring your own camera to save $300 on tuition.
            </p>
          </div>

          <div className="space-y-6">
            {/* Documents & Essentials */}
            <details className="bg-cream rounded-xl p-6 shadow-sm">
              <summary className="flex items-center gap-3 cursor-pointer font-bold text-charcoal text-lg mb-4">
                <div className="bg-forest/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Documents & Essentials
              </summary>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Passport valid 6+ months from {formatPaymentDate(TRAVEL_DATE_START)}
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  ID/driver's license, insurance card
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Printed/phone copy of registration + payment confirmation
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Emergency contacts + medical notes
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Credit/debit card; small amount of cash
                </li>
              </ul>
            </details>

            {/* Faith & Community */}
            <details className="bg-cream rounded-xl p-6 shadow-sm">
              <summary className="flex items-center gap-3 cursor-pointer font-bold text-charcoal text-lg mb-4">
                <div className="bg-forest/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                Faith & Community
              </summary>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Compact Bible/notebook & pen for devotion and reflection
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Comfortable attire for worship/ministry nights
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Small items for testimony/thank-you notes
                </li>
              </ul>
            </details>

            {/* Clothing */}
            <details className="bg-cream rounded-xl p-6 shadow-sm">
              <summary className="flex items-center gap-3 cursor-pointer font-bold text-charcoal text-lg mb-4">
                <div className="bg-sage/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                Clothing (hot/humid + rain)
              </summary>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Breathable shirts, shorts/pants, light jacket/rain layer
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Swimwear; quick-dry towel
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Closed-toe walking shoes + sandals
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Hat, sunglasses
                </li>
              </ul>
            </details>

            {/* Health & Hygiene */}
            <details className="bg-cream rounded-xl p-6 shadow-sm">
              <summary className="flex items-center gap-3 cursor-pointer font-bold text-charcoal text-lg mb-4">
                <div className="bg-moss/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-moss" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                Health & Hygiene
              </summary>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Personal medications (labeled), basic first aid
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Sunscreen, insect repellent
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Toiletries, hand sanitizer, wet wipes
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Electrolyte packets / reusable water bottle
                </li>
              </ul>
            </details>

            {/* Camera & Tech */}
            <details className="bg-cream rounded-xl p-6 shadow-sm">
              <summary className="flex items-center gap-3 cursor-pointer font-bold text-charcoal text-lg mb-4">
                <div className="bg-forest/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Camera & Tech
              </summary>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Bring your own camera setup to receive a $300 tuition discount
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Laptop and charger are Required (does not need to handle editing, but must support media offload/storage)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Phone + charger; power bank
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Plug adapters if needed for Costa Rica outlets
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Cable kit (USB-C/Lightning, etc.)
                </li>
              </ul>
            </details>

            {/* Day Bag & Travel */}
            <details className="bg-cream rounded-xl p-6 shadow-sm">
              <summary className="flex items-center gap-3 cursor-pointer font-bold text-charcoal text-lg mb-4">
                <div className="bg-sage/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                Day Bag & Travel
              </summary>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Daypack for shoots; packing cubes
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Rain cover/dry bag; zip pouches for media
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Snacks for transfer days (3, 5, 7)
                </li>
              </ul>
            </details>

            {/* Do Not Pack */}
            <details className="bg-sand/30 rounded-xl p-6 shadow-sm">
              <summary className="flex items-center gap-3 cursor-pointer font-bold text-charcoal text-lg mb-4">
                <div className="bg-earth/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-earth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                Do Not Pack (site policy)
              </summary>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Weapons, illegal substances, or drones if not pre-approved by staff
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Excessive gear you cannot carry yourself
                </li>
              </ul>
            </details>
          </div>

          {/* Location Notes */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 mt-12">
            <div className="bg-cream rounded-xl p-4">
              <h3 className="font-semibold text-charcoal mb-2">San José (Days 1–3)</h3>
              <p className="text-sm text-charcoal/70">Urban scouting, foundations, interviews. Transfer to Jacó end of Day 3 (dinner).</p>
            </div>
            <div className="bg-cream rounded-xl p-4">
              <h3 className="font-semibold text-charcoal mb-2">Jacó (Days 4–5)</h3>
              <p className="text-sm text-charcoal/70">Coastal vérité, directing & coverage. Transfer to Santiago de Puriscal end of Day 5.</p>
            </div>
            <div className="bg-cream rounded-xl p-4">
              <h3 className="font-semibold text-charcoal mb-2">Santiago de Puriscal (Days 6–8)</h3>
              <p className="text-sm text-charcoal/70">Free day on 6, collaboration & edits, return to San José end of Day 8. Day 9 send-off.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-forest/10 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-forest/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-charcoal">Complete Equipment Kit Provided</h3>
              </div>
              <p className="text-sm text-charcoal/60 mb-3">Over $2,800 worth of professional gear you take home</p>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Panasonic GH4
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Powerextra 2-Pack DMW-BLF19 batteries
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Panasonic Lumix G X Vario PZ 14–42mm f/3.5–5.6 ASPH Power O.I.S. lens
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  TTArtisan 25mm f/2 lens for Micro Four Thirds
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Transcend RDC8 USB 3.1 Gen 1 card reader
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  KF09.136A tripod
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Godox Movlink wireless system
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Amaran 100d light
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  SmallRig RA-D55 Parabolic Softbox (21.6" x 14.6")
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  2x Neewer LED light panel kit
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Flashpoint Nano 8.5' light stand
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Lexar 128GB SD cards (2-pack)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  1TB external hard drive
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Pelican Vault V525 rolling case with padded dividers
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  K&F Concept 37mm ND2–ND400 filter
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  K&F Concept 43mm ND2–ND400 filter
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Refund Policy Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-charcoal">Refund Policy</h3>
              <button
                onClick={() => setShowRefundModal(false)}
                className="text-charcoal/60 hover:text-charcoal transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <RefundPolicyContent />
            <button
              onClick={() => setShowRefundModal(false)}
              className="w-full mt-6 bg-forest text-white px-4 py-2 rounded-lg font-semibold hover:bg-forest-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest text-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Questions About Packing?</h2>
          <p className="text-xl mb-8 text-cream/90">
            We're here to help you prepare for your creative journey.
          </p>
          <a href="mailto:parker@thebtcp.com" className="inline-block bg-cream text-forest px-8 py-4 rounded-full text-lg font-semibold hover:bg-sand transition-colors">
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}