import { Metadata } from 'next';
import Link from 'next/link';
import { itinerary } from '@/lib/itinerary';

export const metadata: Metadata = {
  title: 'Itinerary - Built to Create | 9-Day Filmmaking Retreat',
  description: 'Complete 9-day filmmaking journey through Costa Rica. From San José streets to Jacó beaches to Puriscal mountains.',
};

export default function ItineraryPage() {
  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-sand nature-texture opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">9-Day Journey</h1>
          <p className="text-xl text-charcoal/70">
            From urban streets to coastal shores to mountain peaks - master filmmaking across Costa Rica's diverse landscapes
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {itinerary.map((day) => (
              <Link 
                key={day.day}
                href={`/itinerary/day-${day.day}`}
                className="group relative bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover-lift"
              >
                {day.transferFlag && (
                  <div className="absolute top-4 right-4 z-10 bg-forest/90 text-cream px-3 py-1 rounded-full text-xs font-semibold">
                    Transfer Day
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-forest text-cream rounded-full w-12 h-12 flex items-center justify-center font-bold">
                      {day.day}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-sage">{day.city}</p>
                      <p className="text-xs text-charcoal/60">{day.hotel}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-forest transition-colors">
                    {day.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    {day.highlights.slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-charcoal/70">
                        <span className="text-sage mr-2">•</span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-stone/20">
                    <span className="text-forest font-semibold text-sm group-hover:underline">
                      View Day {day.day} →
                    </span>
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