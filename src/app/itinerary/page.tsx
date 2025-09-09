import { Metadata } from 'next';
import Link from 'next/link';
import { itinerary } from '@/lib/itinerary';

export const metadata: Metadata = {
  title: 'Itinerary - Built to Create Project | 9-Day Christian Filmmaking Retreat',
  description: 'Faith-centered documentary filmmaking retreat through Costa Rica. Nine days of spiritual growth and creative development.',
};

export default function ItineraryPage() {
  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-sand nature-texture opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/itinerary-header.jpg')"
          }}
        ></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">9-Day Journey</h1>
          <p className="text-xl text-charcoal/70">
            A Christian documentary filmmaking retreat through Costa Rica's diverse landscapes and faithful community
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {itinerary.map((day) => (
              <Link 
                key={day.id}
                href={`/itinerary/${day.slug}`}
                className="group relative bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-forest text-cream rounded-full w-12 h-12 flex items-center justify-center font-bold">
                      {day.id}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-sage">{day.location}</p>
                      <p className="text-xs text-charcoal/60">{day.theme}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-forest transition-colors">
                    {day.title}
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-forest mb-1">Spiritual Anchor</p>
                      <p className="text-sm text-charcoal/70">{day.spiritualAnchor}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-forest mb-1">Creative Focus</p>
                      <p className="text-sm text-charcoal/70">{day.creativeFocus}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-stone/20 flex justify-between items-end">
                    <span className="text-forest font-semibold text-sm group-hover:underline">
                      View Day {day.id} →
                    </span>
                    {day.isTransferDay && (
                      <span className="bg-charcoal/10 text-charcoal px-2 py-1 rounded text-xs font-semibold">
                        Transfer Day
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-sand/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">The Journey Arc</h2>
          
          <div className="space-y-6">
            <div className="bg-cream rounded-xl p-6">
              <h3 className="text-lg font-semibold text-forest mb-2">Days 1-3: San José Foundation</h3>
              <p className="text-charcoal/70">
                Begin in Costa Rica's vibrant capital. Master street cinematography, sound design, and storytelling fundamentals while exploring urban environments.
              </p>
            </div>
            
            <div className="bg-cream rounded-xl p-6">
              <h3 className="text-lg font-semibold text-forest mb-2">Days 4-6: Jacó Coastal Workshop</h3>
              <p className="text-charcoal/70">
                Journey to the Pacific coast for golden hour mastery, waterfall cinematography, and full production days with mentor guidance.
              </p>
            </div>
            
            <div className="bg-cream rounded-xl p-6">
              <h3 className="text-lg font-semibold text-forest mb-2">Days 7-8: Puriscal Mountain Light</h3>
              <p className="text-charcoal/70">
                Ascend into the mountains to explore atmospheric conditions, lens selection for landscapes, and capture dramatic mountain light.
              </p>
            </div>
            
            <div className="bg-cream rounded-xl p-6">
              <h3 className="text-lg font-semibold text-forest mb-2">Day 9: Showcase & Celebration</h3>
              <p className="text-charcoal/70">
                Return to San José for final edits, private screening, and celebration of your creative journey before departures.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}