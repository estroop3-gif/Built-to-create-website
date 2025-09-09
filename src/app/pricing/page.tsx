'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import EquipmentList from '@/components/EquipmentList';
import { paymentOptions, getPricingTiers, getActiveWindow, getCurrentTotal, calculateDueToday, isAfterFullPaymentDeadline, formatPaymentDate } from '@/lib/pricing';
import { RefundPolicyContent } from '@/shared/refundPolicyContent';

const metadata: Metadata = {
  title: 'Pricing - Costa Rica Filmmaking Retreat | Built to Create Project',
  description: 'All-inclusive 9-day Christian filmmaking retreat. Complete equipment kit included.',
};

export default function PricingPage() {
  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-sage/30 nature-texture opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Retreat Pricing</h1>
          <p className="text-xl text-charcoal/70">
            All-inclusive experience with professional equipment kit
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Christian retreat intro */}
          <div className="text-center mb-12">
            <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
              Join our Christian retreat where presence takes priority over performance, and Spirit-led creativity guides every frame. We believe in truth in storytelling and excellence as worship through the fundamentals of documentary filmmaking.
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
                      9 days of intensive filmmaking workshops
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Expert mentorship and individual guidance
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Small group size (maximum 12 participants)
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Daily production support and feedback
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-forest mb-3">Accommodations & Transport</h3>
                  <ul className="space-y-2 text-charcoal/70">
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Hotel Cultura Plaza (San José) - 5 nights total
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      La Perlita (Jacó) - 3 nights beachfront
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Hotel Cabañas Ensueños (Puriscal) - 1 night mountain lodge
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Airport transfers to/from SJO
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      All ground transportation between locations
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-forest mb-3">Meals & Special Events</h3>
                  <ul className="space-y-2 text-charcoal/70">
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      All meals included - 3 meals daily (breakfast, lunch, dinner)
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Welcome dinner on arrival
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Farewell celebration dinner
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Private film screening and feedback session
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-forest text-cream rounded-2xl p-8 shadow-lg">
              <div className="space-y-4">
                <EquipmentList />
              </div>
              
              <div className="mt-8 p-4 bg-cream/10 rounded-xl">
                <p className="text-center text-cream/90">
                  <strong>Bring your own camera?</strong><br />
                  Save $300 on your tuition
                </p>
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
                    International flights to/from San José (SJO)
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Travel insurance (strongly recommended)
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Personal expenses and souvenirs
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Passport and visa fees (if applicable)
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-forest mb-3">Extras & Upgrades</h3>
                <ul className="space-y-2 text-charcoal/70">
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Alcoholic beverages
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Optional activities and excursions
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
            Limited to 20 participants for personalized attention and meaningful connections.
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
  const activeWindow = getActiveWindow();
  const tiers = getPricingTiers();
  const [showRefundModal, setShowRefundModal] = useState(false);

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">Retreat Pricing Tiers</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {tiers.map((tier) => {
          const isActive = tier.window === activeWindow;
          return (
            <div key={tier.window} className={`relative bg-cream rounded-2xl p-6 shadow-lg ${isActive ? 'ring-2 ring-forest' : ''}`}>
              {isActive && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-forest text-cream px-3 py-1 rounded-full text-xs font-semibold">
                    Currently Active
                  </span>
                </div>
              )}
              
              <div className={`text-center mb-4 ${isActive ? 'mt-8' : ''}`}>
                <h3 className="text-xl font-bold text-charcoal mb-1">{tier.label}</h3>
                <p className="text-xs text-charcoal/60">
                  {formatPaymentDate(tier.startDate)} - {formatPaymentDate(tier.endDate)}
                </p>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-forest">
                  ${tier.total.toLocaleString()}
                </div>
                <p className="text-xs text-charcoal/70 mt-1">{tier.description}</p>
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
  const grandTotal = getCurrentTotal();
  const afterDeadline = isAfterFullPaymentDeadline();
  const depositDue = calculateDueToday('deposit', grandTotal);
  const fullDue = calculateDueToday('full', grandTotal);

  return (
    <div className="bg-sand/30 rounded-2xl p-8 mb-16">
      <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">Payment Options</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {!afterDeadline && (
          <div className="bg-cream rounded-xl p-6">
            <h3 className="text-lg font-semibold text-forest mb-2">Deposit Only</h3>
            <div className="text-2xl font-bold text-charcoal mb-2">
              ${depositDue.toLocaleString()}
            </div>
            <p className="text-xs text-charcoal/70">Due today (includes sales tax)</p>
          </div>
        )}
        
        <div className="bg-cream rounded-xl p-6">
          <h3 className="text-lg font-semibold text-forest mb-2">Full Payment</h3>
          <div className="text-2xl font-bold text-charcoal mb-2">
            ${fullDue.toLocaleString()}
          </div>
          <p className="text-xs text-charcoal/70">Due today (includes sales tax)</p>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-charcoal/70 mb-4">
          Sales tax (7%) is applied to every charge
        </p>
        {afterDeadline && (
          <p className="text-sm text-forest font-semibold">
            Full payment is required after the deadline
          </p>
        )}
      </div>
    </div>
  );
}