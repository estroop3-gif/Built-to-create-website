import Section from '../Section';
import { RetreatData } from '@/lib/retreats';

interface RetreatOverviewProps {
  retreat: RetreatData;
}

export default function RetreatOverview({ retreat }: RetreatOverviewProps) {
  const isWorkshop = retreat.type === 'workshop';

  return (
    <Section spacing="xl" background="white">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          {retreat.theme}
        </h2>
        <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
          {retreat.overview}
        </p>
      </div>

      {/* Details bar for workshops */}
      {isWorkshop && (retreat.venue || retreat.price || retreat.duration) && (
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-forest-50 rounded-xl p-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
              {retreat.venue && (
                <div>
                  <div className="w-12 h-12 bg-forest-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ink-900 mb-1">{retreat.venue}</h3>
                  {retreat.venueAddress && (
                    <p className="font-body text-sm text-ink-600">{retreat.venueAddress}</p>
                  )}
                </div>
              )}
              {retreat.startTime && retreat.endTime && (
                <div>
                  <div className="w-12 h-12 bg-forest-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ink-900 mb-1">{retreat.startTime} – {retreat.endTime}</h3>
                  {retreat.duration && (
                    <p className="font-body text-sm text-ink-600">{retreat.duration}</p>
                  )}
                </div>
              )}
              {retreat.price && (
                <div>
                  <div className="w-12 h-12 bg-forest-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ink-900 mb-1">{retreat.price}</h3>
                  <p className="font-body text-sm text-ink-600">per person</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-forest-600 rounded-full"></div>
          </div>
          <h3 className="font-heading text-xl font-bold text-ink-900 mb-3">Experience</h3>
          <p className="font-body text-ink-600 leading-relaxed">
            {isWorkshop
              ? 'Hands-on workshop combining practical skills with real-world filmmaking techniques.'
              : 'Immersive 9-day journey combining technical mastery with creative awakening in stunning locations.'}
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-forest-600 rounded-full"></div>
          </div>
          <h3 className="font-heading text-xl font-bold text-ink-900 mb-3">Faith Integration</h3>
          <p className="font-body text-ink-600 leading-relaxed">
            Discover how creativity and calling intersect, using filmmaking as a tool for ministry and impact.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-forest-600 rounded-full"></div>
          </div>
          <h3 className="font-heading text-xl font-bold text-ink-900 mb-3">Film Learning</h3>
          <p className="font-body text-ink-600 leading-relaxed">
            {retreat.theme.includes('Documentary') ? 'Master documentary storytelling and capture authentic human stories.' :
             retreat.theme.includes('Narrative') ? 'Learn narrative filmmaking fundamentals and storytelling techniques.' :
             retreat.theme.includes('Visual') ? 'Develop visual storytelling skills and cinematic composition.' :
             retreat.theme.includes('Missional') ? 'Practice ethical filmmaking that serves and honors communities.' :
             retreat.theme.includes('Collaboration') ? 'Build teamwork skills and collaborative creation techniques.' :
             retreat.theme.includes('Camera') ? 'Learn camera fundamentals and start creating better video with any gear.' :
             'Professional instruction tailored to develop your unique creative voice and technical skills.'}
          </p>
        </div>
      </div>
    </Section>
  );
}
