'use client';

export default function JasperPackingPage() {
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
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">What To Pack For Jasper, Georgia</h1>
          <p className="text-xl text-charcoal/70">
            Jasper is a mountain town, so weather can shift from cool mornings and evenings to comfortable afternoons. You do not need to bring a full camera kit for this retreat. The goal is for you to focus on learning, shooting, and being present with God, not stressing about gear.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-forest/10 border-l-4 border-forest rounded-r-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-charcoal mb-2">Before You Pack</h2>
            <p className="text-charcoal/70 mb-3">
              <strong>Camera Gear:</strong> Cameras are provided for instruction and shooting. You do not need to bring your own camera kit unless you want to.
            </p>
            <p className="text-charcoal/70">
              <strong>Sleeping Gear:</strong> A sleeping bag is required. You will be in bunks or tents depending on the final setup.
            </p>
          </div>

          <div className="space-y-6">
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

            <details className="bg-cream rounded-xl p-6 shadow-sm">
              <summary className="flex items-center gap-3 cursor-pointer font-bold text-charcoal text-lg mb-4">
                <div className="bg-sage/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                Clothing for mountain weather
              </summary>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Comfortable, modest clothing appropriate for mountain weather
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Layers you can add or remove as the temperature changes
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Light jacket or hoodie for mornings and evenings
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Comfortable shoes for walking on uneven ground around the property and during light outings
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Normal personal items and toiletries you would bring for a 3–5 day trip
                </li>
              </ul>
            </details>

            <details className="bg-cream rounded-xl p-6 shadow-sm">
              <summary className="flex items-center gap-3 cursor-pointer font-bold text-charcoal text-lg mb-4">
                <div className="bg-forest/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Sleeping gear
              </summary>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  A sleeping bag is required
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  You will be in bunks or tents depending on the final setup, so bring a sleeping bag you are comfortable in for cool mountain nights
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  If you normally use a small travel pillow or extra blanket, you can bring it, but a sleeping bag is the only required sleep item
                </li>
              </ul>
            </details>

            <details className="bg-cream rounded-xl p-6 shadow-sm">
              <summary className="flex items-center gap-3 cursor-pointer font-bold text-charcoal text-lg mb-4">
                <div className="bg-sage/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                Laptops and hard drives
              </summary>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Laptops are not required but are recommended
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  All footage from the retreat will be posted online for everyone to access after the retreat
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  However, bringing a laptop and an external hard drive will allow you to offload and work with your own footage during the retreat
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  <strong>Recommended but optional:</strong> Laptop you are comfortable editing on; External hard drive or SSD for backing up and organizing your footage
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  The retreat is fully doable without a laptop, but having one is helpful if you want to edit or organize personally captured footage on site
                </li>
              </ul>
            </details>

            <details className="bg-cream rounded-xl p-6 shadow-sm">
              <summary className="flex items-center gap-3 cursor-pointer font-bold text-charcoal text-lg mb-4">
                <div className="bg-forest/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Camera gear provided for you
              </summary>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  Cameras are provided for instruction and shooting
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  You do not need to bring your own camera kit unless you want to
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  The main teaching and shooting kit will consist of Panasonic GH4 cameras
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  In addition to the GH4s, there will be several other camera systems available so you can compare and feel the differences:
                </li>
                <li className="flex items-start ml-4">
                  <span className="text-sage mr-2">◦</span>
                  2 Sony FS100 kits
                </li>
                <li className="flex items-start ml-4">
                  <span className="text-sage mr-2">◦</span>
                  1 Sony FS7 kit
                </li>
                <li className="flex items-start ml-4">
                  <span className="text-sage mr-2">◦</span>
                  1 Panasonic AF100 kit
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  These systems will be used to explore:
                </li>
                <li className="flex items-start ml-4">
                  <span className="text-sage mr-2">◦</span>
                  Different multicamera setups at different price ranges
                </li>
                <li className="flex items-start ml-4">
                  <span className="text-sage mr-2">◦</span>
                  Functionality and ergonomics between camera families
                </li>
                <li className="flex items-start ml-4">
                  <span className="text-sage mr-2">◦</span>
                  Low light performance comparisons
                </li>
                <li className="flex items-start ml-4">
                  <span className="text-sage mr-2">◦</span>
                  The restraints and strengths of older systems versus newer systems
                </li>
                <li className="flex items-start ml-4">
                  <span className="text-sage mr-2">◦</span>
                  What those differences look like in a real church setting
                </li>
                <li className="flex items-start ml-4">
                  <span className="text-sage mr-2">◦</span>
                  The question "Is newer actually necessary?" and how to think about upgrades with a Kingdom mindset
                </li>
                <li className="flex items-start">
                  <span className="text-sage mr-2">•</span>
                  If you already own a camera you love and want to learn with, you are welcome to bring it, but it is not required. The retreat is designed so you can fully participate using the provided gear.
                </li>
              </ul>
            </details>
          </div>
        </div>
      </section>

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
