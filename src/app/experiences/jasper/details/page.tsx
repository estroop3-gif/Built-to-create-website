import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retreat Details - Jasper, GA | The Born to Create Project',
  description: 'A closer look at where you will sleep, eat, work, and rest during the Jasper retreat.',
};

export default function JasperDetailsPage() {
  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-sand nature-texture opacity-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/images/visit-first-mountain-city-jasper-georgia-featured-1.jpg')"
          }}
        ></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Retreat Details</h1>
          <p className="text-xl text-charcoal/70">
            A closer look at where you will sleep, eat, work, and rest during the Jasper retreat.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-forest/10 border-l-4 border-forest rounded-r-lg p-6 mb-12">
            <p className="text-charcoal/70">
              The Jasper, Georgia retreat is designed as a glamping style experience: simple, quiet, and close to nature, but with enough comfort that you can actually rest between full days of shooting and learning. This page walks through the on-site details so you know exactly what you are stepping into and what is being provided for you.
            </p>
          </div>

          <div className="space-y-8">
            {/* Retreat Dates and Travel Days */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Retreat Dates and Travel Days</h2>

              <p className="text-charcoal/70 mb-6">
                The Jasper retreat is offered twice, with two sets of dates to choose from. Both runs follow the same three day structure and teaching content.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span><strong>Session 1:</strong> Retreat January 28–30, 2026 • Travel days January 27 and January 31, 2026</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span><strong>Session 2:</strong> Retreat May 6–8, 2026 • Travel days May 5 and May 9, 2026</span>
                </li>
              </ul>
            </div>

            {/* Section 1: Sleeping Setup */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Sleeping Setup</h2>

              <p className="text-charcoal/70 mb-6">
                We will be tent camping on the property, but this is not bare-bones backpacking. Each guest has a full cot with a cot mattress and comfort items so you can get real rest at night. Tents are shared, and the layout is designed to feel like a small glamping village instead of a crowded campground.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Full cots and cot mattresses provided for every participant</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Shared tents arranged to balance personal space and community</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Lantern-style lighting and simple comfort touches to make it easy to wind down at the end of the day</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Quiet hours to keep the camp peaceful once sessions and hangs wrap up</span>
                </li>
              </ul>

              <p className="text-charcoal/70">
                The only sleeping item you need to bring is your own sleeping bag. If you like extra comfort, you are welcome to bring a small pillow or blanket, but a sleeping bag is the only required piece.
              </p>
            </div>

            {/* Section 2: Bathrooms and Showers */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Bathrooms and Showers</h2>

              <p className="text-charcoal/70 mb-6">
                The Jasper retreat uses simple camp style facilities rather than standard house bathrooms. The restroom on site is a clean, well maintained composting toilet instead of a traditional flush toilet. The shower setup is also a camp style shower rather than a fully built indoor bathroom, but it does provide hot water and privacy so you can stay clean and refreshed during the retreat.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Composting toilet for restroom use, kept clean and well maintained</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Camp style shower with privacy and reliable hot water</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Simple, functional setup so you can focus on the work and the people instead of logistics</span>
                </li>
              </ul>
            </div>

            {/* Section 3: Shared Spaces */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Shared Spaces for Teaching and Community</h2>

              <p className="text-charcoal/70 mb-6">
                We are building out shared spaces on the property specifically for this retreat: places where we can teach, eat, edit, and sit around the fire together.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A central teaching area where sessions, demos, and debriefs take place</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Outdoor or covered dining space for meals and hang time</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A fire pit or gathering spot for evening conversations and prayer</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Open areas around the property for small group breakouts and quiet time</span>
                </li>
              </ul>
            </div>

            {/* Section 4: Work and Edit Areas */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Work and Edit Areas</h2>

              <p className="text-charcoal/70 mb-6">
                You will have dedicated spaces to organize footage, work on edits, and walk through live edit sessions together. These spaces are set up to be practical and focused, not flashy, with what you actually need to get the work done.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Tables and surfaces where you can set up laptops and drives during edit blocks</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Access to power so you can charge cameras, laptops, and hard drives</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A central screen or display for live edit demonstrations and group breakdowns</span>
                </li>
              </ul>
            </div>

            {/* Section 5: Meals and Daily Rhythm */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Meals and Daily Rhythm</h2>

              <p className="text-charcoal/70 mb-6">
                The daily flow of the retreat is built around a simple rhythm: time with God, time to learn, time to shoot, time to rest, and time to eat together.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Group meals on site so you are not scrambling to figure out food between sessions</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Coffee and basic snacks available to keep you going during long days</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Built-in free time blocks for rest, walks, or unstructured conversation</span>
                </li>
              </ul>
            </div>

            {/* Section 6: What Is and Is Not Provided */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">What Is Provided and What You Bring</h2>

              <p className="text-charcoal/70 mb-6">
                The goal of Jasper is to remove as many barriers as possible so you can focus on God, your craft, and your calling as a media leader.
              </p>

              <div className="mb-6">
                <p className="text-lg font-bold text-charcoal mb-3">Provided for you</p>
                <ul className="space-y-3">
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>Cots, cot mattresses, and basic comfort items in shared tents</span>
                  </li>
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>Bathrooms and shower access</span>
                  </li>
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>Shared spaces for teaching, meals, editing, and community</span>
                  </li>
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>Camera gear for instruction and shooting during the retreat</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-lg font-bold text-charcoal mb-3">What you bring</p>
                <ul className="space-y-3">
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>A sleeping bag</span>
                  </li>
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>Personal clothing appropriate for mountain weather and outdoor time</span>
                  </li>
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>Toiletries and any personal medications</span>
                  </li>
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>Optional: a laptop and hard drive if you want to offload and work with your own footage during the retreat</span>
                  </li>
                </ul>
              </div>

              <p className="text-charcoal/70">
                You do not need to show up with a full kit or a perfect system. Jasper is built so you can step into a prepared environment, learn by doing, and focus on what God is saying to you as a media leader, knowing that the practical facilities are already taken care of. As we finalize the build-out, this page will be updated with photos so you can see exactly where you will be staying.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
