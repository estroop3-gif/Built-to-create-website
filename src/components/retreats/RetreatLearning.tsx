import Section from '../Section';
import { RetreatData } from '@/lib/retreats';

interface RetreatLearningProps {
  retreat: RetreatData;
}

export default function RetreatLearning({ retreat }: RetreatLearningProps) {
  return (
    <Section spacing="xl" background="sage">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          What You'll Learn
        </h2>
        <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
          Professional skills and creative insights that will transform your filmmaking journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {retreat.learningOutcomes.map((outcome, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-soft">
            <div className="w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center mb-4">
              <span className="font-heading text-forest-700 font-bold text-lg">
                {(index + 1).toString().padStart(2, '0')}
              </span>
            </div>
            <p className="font-body text-ink-700 leading-relaxed font-medium">
              {outcome}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}