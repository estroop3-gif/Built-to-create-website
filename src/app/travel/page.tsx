'use client';

import { Metadata } from 'next';
import { useState } from 'react';
import { TRAVEL_DATE_START, TRAVEL_DATE_END, FULL_PAYMENT_DEADLINE, formatPaymentDate } from '@/lib/pricing';
import { RefundPolicyContent } from '@/shared/refundPolicyContent';

const metadata: Metadata = {
  title: 'Travel Logistics - Built to Create | Getting There',
  description: 'Complete travel information for your Costa Rica filmmaking retreat. Flight details, airport transfers, and ground transportation.',
};

export default function TravelPage() {
  const [showRefundModal, setShowRefundModal] = useState(false);

  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-earth/20 to-sand nature-texture opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Travel Logistics</h1>
          <p className="text-xl text-charcoal/70">
            Everything you need to know about getting to and around Costa Rica
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-cream rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-forest/20 rounded-full p-3">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-charcoal">Flight Information</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-forest mb-3">Arrival Airport</h3>
                  <div className="bg-sand/30 rounded-lg p-4">
                    <p className="font-semibold text-charcoal">Juan Santamaría International Airport (SJO)</p>
                    <p className="text-sm text-charcoal/70 mt-1">San José, Costa Rica</p>
                    <p className="text-sm text-charcoal/70 mt-2">
                      This is Costa Rica's main international airport, served by major airlines including American, Delta, United, JetBlue, and Southwest.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-forest mb-3">Recommended Arrival</h3>
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <p><strong>Day 1 ({formatPaymentDate(TRAVEL_DATE_START)}):</strong> Arrive by 2:00 PM</p>
                    <p>This allows time for customs, baggage claim, and airport transfer to Hotel Cultura Plaza before our welcome dinner at 6:30 PM.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-forest mb-3">Departure Planning</h3>
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <p><strong>Day 9 ({formatPaymentDate(TRAVEL_DATE_END)}):</strong> Departures after 3:00 PM</p>
                    <p>Final screening and celebration lunch wraps by 2:00 PM. We recommend booking flights departing 5:00 PM or later to account for transfer time to SJO.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-sand/30 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-sage/20 rounded-full p-3">
                  <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-charcoal">Airport Transfers</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-cream rounded-lg p-4">
                  <h3 className="font-semibold text-forest mb-2">Included Transfers</h3>
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <p><strong>Day 1:</strong> SJO → Hotel Cultura Plaza (3:00 PM pickup)</p>
                    <p><strong>Day 9:</strong> Hotel Cultura Plaza → SJO (staggered departures starting 3:30 PM)</p>
                  </div>
                </div>

                <div className="bg-cream rounded-lg p-4">
                  <h3 className="font-semibold text-forest mb-2">Transfer Details</h3>
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <p>• Professional, air-conditioned vehicles</p>
                    <p>• English-speaking drivers</p>
                    <p>• Meet at SJO arrivals with Built to Create sign</p>
                    <p>• 45-minute drive to central San José</p>
                  </div>
                </div>

                <div className="bg-forest/10 border-l-4 border-forest rounded-r-lg p-3">
                  <p className="text-xs text-charcoal/70">
                    <strong>Note:</strong> If your flight is significantly delayed, please contact us immediately. We monitor flights but appreciate updates for group coordination.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cream rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">Our Route & Transfers</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-sand/30 rounded-lg">
                <div className="bg-forest text-cream rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  1-3
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-charcoal">San José</p>
                  <p className="text-sm text-charcoal/60">Hotel Cultura Plaza • 3 nights</p>
                </div>
                <div className="text-right text-sm text-charcoal/60">
                  Days 1-3
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-sage/20 rounded-lg">
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <p className="text-sm text-charcoal/70">Transfer: San José → Jacó (1.5 hours)</p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-sand/30 rounded-lg">
                <div className="bg-forest text-cream rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  4-6
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-charcoal">Jacó</p>
                  <p className="text-sm text-charcoal/60">La Perlita • 3 nights</p>
                </div>
                <div className="text-right text-sm text-charcoal/60">
                  Days 4-6
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-sage/20 rounded-lg">
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <p className="text-sm text-charcoal/70">Transfer: Jacó → Santiago de Puriscal (2 hours)</p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-sand/30 rounded-lg">
                <div className="bg-forest text-cream rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  7
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-charcoal">Santiago de Puriscal</p>
                  <p className="text-sm text-charcoal/60">Hotel Cabañas Ensueños • 1 night</p>
                </div>
                <div className="text-right text-sm text-charcoal/60">
                  Day 7
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-sage/20 rounded-lg">
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <p className="text-sm text-charcoal/70">Transfer: Puriscal → San José (1.5 hours)</p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-sand/30 rounded-lg">
                <div className="bg-forest text-cream rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  8-9
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-charcoal">San José</p>
                  <p className="text-sm text-charcoal/60">Hotel Cultura Plaza • 2 nights</p>
                </div>
                <div className="text-right text-sm text-charcoal/60">
                  Days 8-9
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-forest/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-charcoal mb-4">Travel Requirements</h3>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Valid passport (6+ months remaining)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  No visa required for US citizens (≤90 days)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Return/onward ticket required
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Travel insurance recommended
                </li>
              </ul>
            </div>

            <div className="bg-moss/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-charcoal mb-4">Helpful Tips</h3>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  USD widely accepted (bring small bills)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  ATMs available in all locations
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  SIM cards available at SJO airport
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Power plugs: Type A/B (same as US)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Download offline maps before arrival
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal text-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Need Travel Assistance?</h2>
          <p className="text-xl mb-8 text-cream/90">
            We're happy to help coordinate your travel plans and answer any logistics questions.
          </p>
          <a href="mailto:hello@builttocreate.com" className="inline-block bg-cream text-charcoal px-8 py-4 rounded-full text-lg font-semibold hover:bg-sand transition-colors">
            Contact Our Team
          </a>
          <div className="mt-6">
            <button
              onClick={() => setShowRefundModal(true)}
              className="text-cream underline text-xs hover:text-cream/80 transition-colors"
            >
              Refund policy
            </button>
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
    </>
  );
}