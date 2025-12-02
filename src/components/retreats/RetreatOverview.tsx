import Section from '../Section';
import { RetreatData } from '@/lib/retreats';

interface RetreatOverviewProps {
  retreat: RetreatData;
}

export default function RetreatOverview({ retreat }: RetreatOverviewProps) {
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

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-forest-600 rounded-full"></div>
          </div>
          <h3 className="font-heading text-xl font-bold text-ink-900 mb-3">Experience</h3>
          <p className="font-body text-ink-600 leading-relaxed">
            Immersive 9-day journey combining technical mastery with creative awakening in stunning locations.
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
             'Professional instruction tailored to develop your unique creative voice and technical skills.'}
          </p>
        </div>
      </div>
    </Section>
  );
}