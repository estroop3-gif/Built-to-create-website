'use client';

import Link from 'next/link';

export default function JasperTravelPage() {
  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-sand nature-texture opacity-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/images/visit-first-mountain-city-jasper-georgia-featured-1.jpg')"
          }}
        ></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Travel Logistics</h1>
          <p className="text-xl text-charcoal/70">
            Getting to and around Jasper, Georgia
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
                <h2 className="text-2xl font-bold text-charcoal">Getting to Jasper</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-forest mb-3">Nearest Airport</h3>
                  <div className="bg-sand/30 rounded-lg p-4">
                    <p className="font-semibold text-charcoal">Hartsfield-Jackson Atlanta International Airport (ATL)</p>
                    <p className="text-sm text-charcoal/70 mt-1">Atlanta, Georgia</p>
                    <p className="text-sm text-charcoal/70 mt-2">
                      Approximately 1.5 hours north of Atlanta. Most participants fly into ATL and drive or arrange ground transportation to Jasper.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-forest mb-3">Arrival Details</h3>
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <p><strong>Check-in Time:</strong> 12:00 PM to 9:00 PM on Tuesday</p>
                    <p>Plan to arrive at the property during this window. Casual dinner starts at 6:30 PM.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-forest mb-3">Departure Planning</h3>
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <p><strong>Check-out:</strong> Saturday morning after breakfast</p>
                    <p>Airport runs and departures start at 11:00 AM. Coordinate with the group for shared rides.</p>
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
                <h2 className="text-2xl font-bold text-charcoal">Ground Transportation</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-cream rounded-lg p-4">
                  <h3 className="font-semibold text-forest mb-2">Driving</h3>
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <p>If you're driving, the property address will be provided after registration.</p>
                    <p>From Atlanta: Approximately 1.5 hours via GA-400 N</p>
                  </div>
                </div>

                <div className="bg-cream rounded-lg p-4">
                  <h3 className="font-semibold text-forest mb-2">Rideshare or Rental</h3>
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <p>Rental cars available at ATL</p>
                    <p>Rideshare to Jasper is possible but may be expensive from Atlanta</p>
                    <p>Consider coordinating rides with other participants</p>
                  </div>
                </div>

                <div className="bg-forest/10 border-l-4 border-forest rounded-r-lg p-3">
                  <p className="text-xs text-charcoal/70">
                    <strong>Note:</strong> We will coordinate a group chat for participants to arrange carpools from ATL if interested.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-forest/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-charcoal mb-4">What's Included</h3>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Lodging at the mountain property
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  All meals during the retreat
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Transportation to local shoot locations (church, downtown Jasper)
                </li>
              </ul>
            </div>

            <div className="bg-moss/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-charcoal mb-4">What's Not Included</h3>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Flights or transportation to/from Jasper
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Travel insurance (recommended)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Personal expenses
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
          <a href="mailto:parker@thebtcp.com" className="inline-block bg-cream text-charcoal px-8 py-4 rounded-full text-lg font-semibold hover:bg-sand transition-colors">
            Contact Our Team
          </a>
          <div className="mt-6 flex flex-col items-center space-y-2">
            <Link
              href="/terms"
              className="text-cream underline text-xs hover:text-cream/80 transition-colors"
            >
              Terms & Agreement
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
