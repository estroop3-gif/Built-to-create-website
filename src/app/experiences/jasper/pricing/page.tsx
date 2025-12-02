'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getJasperPricingTiers, getJasperActiveWindow, getJasperCurrentTotal, calculateJasperDueToday, isJasperAfterFullPaymentDeadline, formatJasperPaymentDate, JASPER_RETREAT_START_DATE, JASPER_RETREAT_END_DATE, JASPER_ARRIVAL_TRAVEL_DATE, JASPER_DEPARTURE_TRAVEL_DATE, formatJasperDate } from '@/lib/jasperPricing';
import { RefundPolicyContent } from '@/shared/refundPolicyContent';

export default function JasperPricingPage() {
  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-sage/30 nature-texture opacity-20"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Jasper Retreat Pricing</h1>
          <p className="text-xl text-charcoal/70 mb-4">
            Clear tiered pricing for the Jasper, Georgia filmmaking retreat so you can plan your investment with confidence.
          </p>
          <div className="text-lg text-charcoal/80 space-y-1">
            <p><strong>Retreat Dates:</strong> January 28-30, 2026</p>
            <p className="text-base text-charcoal/70">Arrival: January 27 • Departure: January 31</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Christian retreat intro */}
          <div className="text-center mb-12">
            <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
              Join our Christian retreat in Jasper, Georgia where presence takes priority over performance, and Spirit-led creativity guides every frame. Small group, focused ministry-driven work.
            </p>
          </div>

          <PricingTiersSection />

          <DueTodayPanel />

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-cream rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-charcoal mb-6">What's Included</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-forest mb-3">Expert Instruction</h3>
                  <ul className="space-y-2 text-charcoal/70">
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Focused 4-day mountain retreat
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Expert mentorship and individual guidance
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Small group size for personalized attention
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Daily production support and feedback
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-forest mb-3">Accommodations</h3>
                  <ul className="space-y-2 text-charcoal/70">
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Mountain property lodging (bunks or tents)
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Quiet mountain setting for focused work
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Close to downtown Jasper and church locations
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-forest mb-3">Meals & Activities</h3>
                  <ul className="space-y-2 text-charcoal/70">
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      All meals included - 3 meals daily
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Welcome fire hang and community time
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Mountain hike with guided reflection
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Final commissioning and sending celebration
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-forest text-cream rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-cream mb-6">Camera Gear Access</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-cream mb-3">Professional Equipment During Retreat</h3>
                  <ul className="space-y-2 text-cream/80">
                    <li className="flex items-start">
                      <span className="text-sage-300 mr-2">•</span>
                      Access to professional camera systems during the retreat
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-300 mr-2">•</span>
                      Multiple camera bodies to learn different systems
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-300 mr-2">•</span>
                      Professional lenses, audio, and lighting equipment
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-300 mr-2">•</span>
                      Hands-on instruction with all gear provided
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-earth/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-charcoal mb-6">What's Not Included</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-forest mb-3">Travel & Personal</h3>
                <ul className="space-y-2 text-charcoal/70">
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Travel to/from Jasper, Georgia
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Travel insurance (recommended)
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Personal expenses and items
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-forest mb-3">Extras</h3>
                <ul className="space-y-2 text-charcoal/70">
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Optional off-site activities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest text-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Filmmaking?</h2>
          <p className="text-xl mb-8 text-cream/90">
            Limited spots for personalized attention in this focused mountain retreat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-block bg-cream text-forest px-8 py-4 rounded-full text-lg font-semibold hover:bg-sand transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Register Now
            </Link>
            <Link
              href="/faq"
              className="inline-block border-2 border-cream text-cream px-8 py-4 rounded-full text-lg font-semibold hover:bg-cream hover:text-forest transition-all duration-200"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PricingTiersSection() {
  const activeWindow = getJasperActiveWindow();
  const tiers = getJasperPricingTiers();
  const [showRefundModal, setShowRefundModal] = useState(false);

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">Retreat Pricing Tiers</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {tiers.map((tier) => {
          const isActive = tier.window === activeWindow;
          return (
            <div key={tier.window} className={`relative rounded-2xl p-6 shadow-lg ${isActive ? 'bg-forest-700 text-cream-100 ring-2 ring-forest-700' : 'bg-cream'}`}>
              {isActive && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-cream-100 text-forest-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Currently Active
                  </span>
                </div>
              )}

              <div className={`text-center mb-4 ${isActive ? 'mt-8' : ''}`}>
                <h3 className={`text-xl font-bold mb-1 ${isActive ? 'text-cream-100' : 'text-charcoal'}`}>{tier.label}</h3>
                <p className={`text-xs ${isActive ? 'text-cream-100/60' : 'text-charcoal/60'}`}>
                  {formatJasperPaymentDate(tier.startDate)} - {formatJasperPaymentDate(tier.endDate)}
                </p>
              </div>

              <div className="text-center mb-4">
                <div className={`text-3xl font-bold ${isActive ? 'text-cream-100' : 'text-forest'}`}>
                  ${tier.total.toLocaleString()}
                </div>
                <p className={`text-xs mt-1 ${isActive ? 'text-cream-100/70' : 'text-charcoal/70'}`}>{tier.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center text-sm text-charcoal/60 mb-4">
        Selected automatically based on today's date
      </p>
      <div className="text-center flex flex-col items-center space-y-1">
        <button
          onClick={() => setShowRefundModal(true)}
          className="text-forest underline text-xs hover:text-forest-600 transition-colors"
        >
          Refund policy
        </button>
        <Link
          href="/terms"
          className="text-forest underline text-xs hover:text-forest-600 transition-colors"
        >
          Terms & Agreement
        </Link>
      </div>

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
    </div>
  );
}

function DueTodayPanel() {
  const grandTotal = getJasperCurrentTotal();
  const afterDeadline = isJasperAfterFullPaymentDeadline();
  const depositDue = calculateJasperDueToday('deposit', grandTotal);
  const fullDue = calculateJasperDueToday('full', grandTotal);

  return (
    <div className="bg-sand/30 rounded-2xl p-8 mb-16">
      <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">Payment Options</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {!afterDeadline && (
          <div className="bg-cream rounded-xl p-6">
            <h3 className="text-lg font-semibold text-forest mb-2">$1,000 Deposit</h3>
            <div className="text-2xl font-bold text-charcoal mb-2">
              ${depositDue.toLocaleString()}
            </div>
            <p className="text-xs text-charcoal/70">Reserve your spot today</p>
          </div>
        )}

        <div className="bg-cream rounded-xl p-6">
          <h3 className="text-lg font-semibold text-forest mb-2">Full Payment</h3>
          <div className="text-2xl font-bold text-charcoal mb-2">
            ${fullDue.toLocaleString()}
          </div>
          <p className="text-xs text-charcoal/70">Pay in full today</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        {!afterDeadline ? (
          <p className="text-sm text-charcoal/70">
            The full $4,000 payment is due by January 1, 2026.
          </p>
        ) : (
          <p className="text-sm text-forest font-semibold">
            Full payment is required after the deadline
          </p>
        )}
      </div>
    </div>
  );
}
