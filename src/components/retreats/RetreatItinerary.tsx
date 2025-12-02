import Section from '../Section';
import { RetreatData } from '@/lib/retreats';

interface RetreatItineraryProps {
  retreat: RetreatData;
}

export default function RetreatItinerary({ retreat }: RetreatItineraryProps) {
  return (
    <Section spacing="xl" background="cream">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          9-Day Itinerary
        </h2>
        <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
          A carefully crafted journey through breathtaking locations and transformative experiences.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {retreat.itinerary.map((day, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
              {/* Day Number */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-forest-600 rounded-full flex items-center justify-center">
                  <span className="font-heading text-cream-50 font-bold text-lg">
                    {day.day}
                  </span>
                </div>
              </div>

              {/* Day Content */}
              <div className="flex-1 bg-white rounded-lg p-6 shadow-soft">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h3 className="font-heading text-xl font-bold text-ink-900 mb-2 sm:mb-0">
                    {day.title}
                  </h3>
                  {day.location && (
                    <span className="font-body text-sm text-forest-600 bg-forest-50 px-3 py-1 rounded-full">
                      {day.location}
                    </span>
                  )}
                </div>
                <p className="font-body text-ink-600 leading-relaxed">
                  {day.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}