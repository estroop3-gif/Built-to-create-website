import { Metadata } from 'next';
import Link from 'next/link';
import { StandardPricingCard, DiscountPricingCard } from '@/components/PricingCard';
import EquipmentList from '@/components/EquipmentList';
import { pricing, paymentOptions } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Pricing - Costa Rica Filmmaking Retreat | Built to Create',
  description: `All-inclusive 9-day filmmaking retreat for $${pricing.standardTuition.toLocaleString()}. Complete equipment kit included. Save $${pricing.cameraDiscount} by bringing your own camera.`,
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
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <StandardPricingCard />
            <DiscountPricingCard />
          </div>

          <div className="bg-sand/30 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">Payment Plan Options</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {paymentOptions.map((option, idx) => {
                const amount = Math.round(pricing.standardTuition * option.multiplier);
                return (
                  <div key={idx} className="bg-cream rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-forest mb-2">{option.name}</h3>
                    <p className="text-sm text-charcoal/70 mb-4">{option.description}</p>
                    <div className="text-2xl font-bold text-charcoal mb-2">
                      ${amount.toLocaleString()}
                      {option.name !== "Full Payment" && <span className="text-sm text-charcoal/60 font-normal">/month</span>}
                    </div>
                    {option.note && (
                      <p className="text-xs text-charcoal/60">{option.note}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

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
                      Welcome dinner on arrival
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Farewell celebration dinner
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage mr-2">•</span>
                      Daily breakfast at all hotels
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
              <h2 className="text-2xl font-bold mb-6">Complete Equipment Kit</h2>
              <p className="text-cream/90 mb-6">
                Take home over $3,000 worth of professional equipment, including:
              </p>
              
              <div className="space-y-4">
                <EquipmentList showByCategory={true} compact={true} />
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
                <h3 className="text-lg font-semibold text-forest mb-3">Meals & Extras</h3>
                <ul className="space-y-2 text-charcoal/70">
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Most lunches and dinners (7 meals total)
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Alcoholic beverages
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Optional activities and excursions
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    Single room upgrades (+$600)
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
            Limited to 12 participants for personalized attention and meaningful connections.
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