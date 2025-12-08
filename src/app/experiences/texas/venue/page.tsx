import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Check Out The Venue - Media Leaders Retreat | The Born to Create Project',
  description: 'Get a feel for where you\'ll be staying, creating, and resting during Media Leaders Retreat in the Texas Hill Country.',
};

export default function VenuePage() {
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
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Check Out The Venue</h1>
          <p className="text-xl text-charcoal/70">
            Get a feel for where you'll be staying, creating, and resting during Media Leaders Retreat.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-forest/10 border-l-4 border-forest rounded-r-lg p-6 mb-12">
            <p className="text-charcoal/70">
              Media Leaders Retreat is hosted at a private Hill Country estate outside Wimberley, Texas. Think quiet mornings, big skies, and a property built for people to be together without feeling crowded.
            </p>
            <p className="text-charcoal/70 mt-4">
              You have your own room, space to breathe, and a campus that makes it easy to move between teaching, shooting, editing, and unhurried conversations around the fire.
            </p>
          </div>

          <div className="space-y-8">
            {/* A Hill Country retreat built for focus */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">A Hill Country retreat built for focus</h2>

              <p className="text-charcoal/70 mb-6">
                The retreat takes place on a five acre property tucked into the Texas Hill Country near Wimberley. It is surrounded by trees, open sky, and enough distance from town to actually feel away from your normal life, while still being a short drive to restaurants and coffee if needed.
              </p>

              <p className="text-charcoal/70 mb-4">The estate includes</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Multiple standalone cottages grouped around firepits and gathering areas</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A central lodge style home that serves as the hub for meals and teaching</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Outdoor seating areas and porches for early morning coffee and late night talks</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A mix of quiet corners and open spaces, all with WiFi access</span>
                </li>
              </ul>

              <p className="text-charcoal/70">
                At night, the sky actually gets dark. You can see stars, hear the crickets, and let your nervous system slow down.
              </p>
            </div>

            {/* Your room */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Your room</h2>

              <p className="text-charcoal/70 mb-6">
                Every Media Leaders Retreat participant gets their own bedroom.
              </p>

              <p className="text-charcoal/70 mb-4">Rooms are simple and comfortable, with</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Quality bedding and a real mattress</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Heating and air conditioning</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Access to shared bathrooms and showers</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A place to drop your gear, close the door, and actually rest</span>
                </li>
              </ul>

              <p className="text-charcoal/70">
                Some rooms are in cozy cottages, others in the main lodge, but all are on the same property so you are never far from the action.
              </p>
            </div>

            {/* Spaces for learning and creating */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Spaces for learning and creating</h2>

              <p className="text-charcoal/70 mb-6">
                The property gives us a lot of flexibility to teach, shoot, and edit without feeling like we are always in the same room.
              </p>

              <p className="text-charcoal/70 mb-4">You can expect</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>A central gathering space for teaching, worship, and group sessions</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Indoor areas that can be turned into interview sets and practical locations</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Outdoor pockets for natural light shooting and small crew exercises</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Shared tables and lounge spaces for laptops, edits, and note taking</span>
                </li>
              </ul>

              <p className="text-charcoal/70">
                Everything is close enough to walk between, but spread out enough that it never feels like a hotel conference center.
              </p>
            </div>

            {/* Evenings, firepits, and unhurried community */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Evenings, firepits, and unhurried community</h2>

              <p className="text-charcoal/70 mb-6">
                The cottages are grouped in small clusters around outdoor firepits, which become the natural gathering place once the workday winds down.
              </p>

              <p className="text-charcoal/70 mb-4">Evenings often look like</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Dinners together around the table</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Stories, questions, and honest conversations about calling and life</span>
                </li>
                <li className="flex items-start text-charcoal/70">
                  <span className="text-sage mr-2">•</span>
                  <span>Space for silence if you need to slip away and be alone with God</span>
                </li>
              </ul>

              <p className="text-charcoal/70">
                You can lean in or step back as needed. The property makes room for both.
              </p>
            </div>

            {/* Location and logistics */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Location and logistics</h2>

              <p className="text-charcoal/70 mb-4">
                The venue is in the Wimberley area of the Texas Hill Country, within an easy drive of local shops, restaurants, and parks. Exact address and arrival details are shared with registered participants in your welcome packet before the retreat.
              </p>

              <p className="text-charcoal/70">
                On rare occasions, we may host the retreat at a comparable property in the same area if availability or other factors require a change. In that case, we will notify registered participants as soon as possible. See our Terms and Conditions for details.
              </p>
            </div>

            {/* Image Gallery */}
            <div className="bg-cream rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-forest mb-6">Gallery</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/media-leaders-venue-1.avif"
                    alt="Media Leaders Retreat venue – exterior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/media-leaders-venue-2.avif"
                    alt="Media Leaders Retreat venue – cottages"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/media-leaders-venue-3.avif"
                    alt="Media Leaders Retreat venue – gathering space"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/media-leaders-venue-4.avif"
                    alt="Media Leaders Retreat venue – cottage interior"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
