import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retreat Details - Media Leaders Retreat | The Born to Create Project',
  description: 'A closer look at where you will sleep, eat, work, and rest during the Media Leaders Retreat.',
};

export default function TexasDetailsPage() {
  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-sand nature-texture opacity-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/images/hero-jasper.webp')"
          }}
        ></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Retreat Details</h1>
          <p className="text-xl text-charcoal/70">
            A closer look at where you will sleep, eat, work, and rest during the Media Leaders Retreat.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-forest/10 border-l-4 border-forest rounded-r-lg p-6 mb-12">
            <p className="text-charcoal/70">
              This page walks through the on-site details so you know exactly what you are stepping into and what is being provided for you.
            </p>
          </div>

          <div className="space-y-8">
            {/* Retreat Dates and Travel Days */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Retreat Dates and Travel Days</h2>

              <p className="text-charcoal/70 mb-6">
                The Media Leaders Retreat is offered twice, with two sets of dates to choose from. Both runs follow the same three day structure and teaching content.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span><strong>Session 1:</strong> Retreat February 4–6, 2026 • Travel days February 3 and February 7, 2026</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span><strong>Session 2:</strong> Retreat May 6–8, 2026 • Travel days May 5 and May 9, 2026</span>
                </li>
              </ul>
            </div>

            {/* Where You'll Stay */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Where You'll Stay</h2>

              <p className="text-charcoal/70 mb-6">
                You'll stay on a private property in the Texas Hill Country, just outside Wimberley, Texas. Think quiet land, big skies, and a cluster of cozy spaces that become our home base for the week.
              </p>

              <p className="text-charcoal/70 mb-6">
                Every participant gets their own private room. No dorm bunks. No shared beds. At the end of each day you'll have a quiet space to rest, process, pray, and reset.
              </p>

              <p className="text-charcoal/70 mb-4">
                The property includes:
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A main house or lodge where we gather for teaching, meals, and worship</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Multiple private rooms for students, each with a real bed and climate control</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Indoor bathrooms and showers</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Outdoor areas for filming, fireside conversations (when burn bans allow), and night sky watching</span>
                </li>
              </ul>

              <p className="text-charcoal/70">
                The exact venue address is shared with confirmed participants only. We make every effort to host the Retreat at the venue described on this website. However, from time to time changes to the venue may be necessary due to availability, maintenance, safety concerns, or other operational reasons. If a venue change is required, we will move to a comparable property in the same general area with similar room standards and shared spaces, and notify registered participants by email. A change in venue to a reasonably comparable property in or near the Wimberley, Texas area does not constitute grounds for a full refund. See our full Terms and Conditions for details.
              </p>
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
                The goal of this retreat is to remove as many barriers as possible so you can focus on God, your craft, and your calling as a media leader.
              </p>

              <div className="mb-6">
                <p className="text-lg font-bold text-charcoal mb-3">Provided for you</p>
                <ul className="space-y-3">
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>A private bedroom on a retreat property near Wimberley, with bedding and basic comfort items</span>
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
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>Coffee, water, and simple snacks available throughout the day</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-lg font-bold text-charcoal mb-3">What you bring</p>
                <ul className="space-y-3">
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>Personal clothing appropriate for Texas Hill Country weather and light outdoor time</span>
                  </li>
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>Toiletries and any personal medications</span>
                  </li>
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>A Bible and a notebook</span>
                  </li>
                  <li className="flex items-start text-charcoal/70">
                    <span className="text-sage mr-2">•</span>
                    <span>Recommended: a laptop and hard drive if you want to offload footage and work with your own edits during the retreat</span>
                  </li>
                </ul>
              </div>

              <p className="text-charcoal/70">
                You do not need to show up with a full kit or a perfect system. This retreat is built so you can step into a prepared environment, learn by doing, and focus on what God is saying to you as a media leader, knowing that the practical details are already taken care of. As we finalize the property details, this page will be updated with photos so you can see the kind of space you will be staying in.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
