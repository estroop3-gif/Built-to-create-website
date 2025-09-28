import Section from '../Section';
import Button from '../Button';
import { RetreatData, formatDateRange } from '@/lib/retreats';

interface RetreatCTAProps {
  retreat: RetreatData;
}

export default function RetreatCTA({ retreat }: RetreatCTAProps) {
  const dateRange = formatDateRange(retreat.startDate, retreat.endDate);

  return (
    <Section spacing="xl" background="forest">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-cream-50 mb-6">
          Ready to Create?
        </h2>
        <p className="font-body text-xl text-cream-200 mb-4">
          Join us in {retreat.country} for an unforgettable filmmaking journey
        </p>
        <p className="font-body text-lg text-cream-300 mb-12">
          {dateRange} • 9 transformative days
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button as="link" href={retreat.registerUrl} size="lg" variant="primary">
            Register Now
          </Button>
          <Button as="link" href="/subscribe" size="lg" variant="ghost">
            {retreat.emailCtaText}
          </Button>
        </div>

        <p className="font-body text-sm text-cream-400">
          Questions? Contact us at{' '}
          <a
            href="mailto:parker@thebtcp.com"
            className="text-cream-200 hover:text-cream-100 underline transition-colors duration-200"
          >
            parker@thebtcp.com
          </a>
        </p>
      </div>
    </Section>
  );
}