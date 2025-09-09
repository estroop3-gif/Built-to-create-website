import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Packing List - Built to Create | What to Bring',
  description: 'Essential packing list for your Costa Rica filmmaking retreat. Camera gear, clothing, and personal items for 9 days of creative exploration.',
};

export default function PackingPage() {
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
            <h2 className="text-lg font-semibold text-charcoal mb-2">Costa Rica Climate & Packing Notes</h2>
            <p className="text-charcoal/70 mb-3">
              <strong>March Weather:</strong> Dry season with warm coastal temperatures (75-90°F) in San José and Jacó, 
              cooler mountain weather (60-75°F) in Santiago de Puriscal. Minimal rain expected but pack layers for elevation changes.
            </p>
            <p className="text-charcoal/70">
              <strong>Equipment Note:</strong> Complete professional kit included with retreat. Bring your own camera to save $300 on tuition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-cream rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-forest/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-charcoal">Camera Gear (Optional)</h3>
              </div>
              <p className="text-sm text-charcoal/60 mb-3">We provide complete equipment kit, but save $300 by bringing your own</p>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Camera body & backup
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Lenses (24-70mm, 70-200mm recommended)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Extra batteries & chargers
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Memory cards (64GB+ recommended)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Lens cleaning kit
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Rain cover/dry bag
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Laptop for editing
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  External hard drive
                </li>
              </ul>
            </div>

            <div className="bg-cream rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-sage/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-charcoal">Clothing</h3>
              </div>
              <p className="text-sm text-charcoal/60 mb-3">Pack for varied weather and activities</p>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Lightweight, quick-dry shirts (5-6)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Long pants (2) & shorts (3)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Rain jacket (essential)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Light fleece/sweater for mountains
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Swimsuit
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Hiking boots/shoes
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Sandals or water shoes
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Hat & sunglasses
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Sleepwear & undergarments
                </li>
              </ul>
            </div>

            <div className="bg-cream rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-moss/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-moss" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-charcoal">Personal Essentials</h3>
              </div>
              <p className="text-sm text-charcoal/60 mb-3">Don't forget these important items</p>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Passport (valid 6+ months)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Travel insurance documents
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Prescription medications
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Sunscreen (SPF 30+)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Insect repellent
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Personal hygiene items
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Reusable water bottle
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Day pack/backpack
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Power adapter (Type A/B)
                </li>
              </ul>
            </div>

            <div className="bg-sand/30 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-earth/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-earth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-charcoal">Recommended Extras</h3>
              </div>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Portable tripod
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  ND/Polarizing filters
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Headlamp/flashlight
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Notebook & pens
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Snacks from home
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Cash (USD accepted widely)
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Zip-lock bags (gear protection)
                </li>
              </ul>
            </div>

            <div className="bg-forest/10 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-forest/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-charcoal">Complete Equipment Kit Provided</h3>
              </div>
              <p className="text-sm text-charcoal/60 mb-3">Over $3,000 worth of professional gear you take home</p>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Sony NEX 6 camera body
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Prime & telephoto lenses
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Godox Movlink wireless audio
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Amaran 100d LED light
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Professional tripod & stabilizer
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  128GB SD cards & storage
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Complete accessory package
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Professional carrying case
                </li>
              </ul>
            </div>

            <div className="bg-sand/30 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-earth/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-earth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-charcoal">Travel Tips</h3>
              </div>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Pack light - laundry available
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Bring copies of documents
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Label all equipment
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Notify bank of travel
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Download offline maps
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Pack valuables in carry-on
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest text-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Questions About Packing?</h2>
          <p className="text-xl mb-8 text-cream/90">
            We're here to help you prepare for your creative journey.
          </p>
          <a href="mailto:hello@builttocreate.com" className="inline-block bg-cream text-forest px-8 py-4 rounded-full text-lg font-semibold hover:bg-sand transition-colors">
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}