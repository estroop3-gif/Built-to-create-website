import Section from '../Section';
import { RetreatData } from '@/lib/retreats';

interface RetreatGearProps {
  retreat: RetreatData;
}

export default function RetreatGear({ retreat }: RetreatGearProps) {
  return (
    <Section spacing="lg" background="white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-forest-50 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-forest-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-heading text-2xl font-bold text-ink-900 mb-4">
            Equipment & Gear
          </h3>
          <p className="font-body text-lg text-ink-700 leading-relaxed">
            {retreat.gearNote || 'Professional equipment kit included worth over $2,800. No need to bring filming gear!'}
          </p>
        </div>
      </div>
    </Section>
  );
}