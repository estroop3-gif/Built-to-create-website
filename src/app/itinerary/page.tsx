import { Metadata } from 'next';
import { itinerary } from '@/lib/itinerary';
import { getShortDateForDay } from './dateUtils';

export const metadata: Metadata = {
  title: 'Itinerary - The Born to Create Project | 9-Day Christian Filmmaking Retreat',
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
            {itinerary.map((day) => {
              const computedDate = getShortDateForDay(day.id);
              return (
                <div 
                  key={day.id}
                  className="relative bg-cream rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="p-6">
                    {/* Day label in top-left */}
                    <div className="absolute top-6 left-6">
                      <span 
                        className="text-forest font-semibold text-sm"
                        aria-label={`Day ${day.id}`}
                      >
                        Day {day.id}
                      </span>
                    </div>
                    
                    {/* Location and Theme in top area */}
                    <div className="flex items-start justify-end mb-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-sage">{day.location}</p>
                        <p className="text-xs text-charcoal/60">{day.theme}</p>
                      </div>
                    </div>
                    
                    {/* Content sections */}
                    <div className="space-y-3 mt-8 mb-12">
                      <div>
                        <p className="text-xs font-semibold text-forest mb-1">Spiritual Anchor</p>
                        <p className="text-sm text-charcoal/70">{day.spiritualAnchor}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-forest mb-1">Creative Focus</p>
                        <p className="text-sm text-charcoal/70">{day.creativeFocus}</p>
                      </div>
                    </div>
                    
                    {/* Date in bottom-left */}
                    <div className="absolute bottom-6 left-6">
                      <span 
                        className="text-charcoal/60 text-xs"
                        aria-label={computedDate}
                      >
                        {computedDate}
                      </span>
                    </div>
                    
                    {/* Transfer day badge if applicable */}
                    {day.isTransferDay && (
                      <div className="absolute bottom-6 right-6">
                        <span className="bg-charcoal/10 text-charcoal px-2 py-1 rounded text-xs font-semibold">
                          Transfer Day
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-sand/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">The Journey Arc</h2>
          
          <div className="space-y-6">
            <div className="bg-cream rounded-xl p-6">
              <h3 className="text-lg font-semibold text-forest mb-2">Days 1-2: San José Foundation</h3>
              <p className="text-charcoal/70">
                Begin in Costa Rica's vibrant capital. Establish presence-first filmmaking, story foundations through a Christian lens, and visual language as worship.
              </p>
            </div>
            
            <div className="bg-cream rounded-xl p-6">
              <h3 className="text-lg font-semibold text-forest mb-2">Days 3-5: Jacó Coastal Workshop</h3>
              <p className="text-charcoal/70">
                Journey to the Pacific coast for documentary mindset development, directing with compassion, and mastering coverage for the edit.
              </p>
            </div>
            
            <div className="bg-cream rounded-xl p-6">
              <h3 className="text-lg font-semibold text-forest mb-2">Days 6-8: Puriscal Mountain Reflection</h3>
              <p className="text-charcoal/70">
                Ascend into the mountains for rest as worship, collaborative documentary work, and edit rhythm as atmosphere.
              </p>
            </div>
            
            <div className="bg-cream rounded-xl p-6">
              <h3 className="text-lg font-semibold text-forest mb-2">Day 9: Commissioning & Sending</h3>
              <p className="text-charcoal/70">
                Return to San José for final delivery, presentation of work, and commissioning for the creative calling ahead.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}