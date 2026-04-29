import Section from '../Section';
import Button from '../Button';
import { RetreatData, formatDateRange } from '@/lib/retreats';

interface RetreatCTAProps {
  retreat: RetreatData;
}

export default function RetreatCTA({ retreat }: RetreatCTAProps) {
  const dateRange = formatDateRange(retreat.startDate, retreat.endDate);
  const isWorkshop = retreat.type === 'workshop';

  return (
    <Section spacing="xl" background="forest">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-cream-50 mb-6">
          {isWorkshop ? 'Ready to Learn?' : 'Ready to Create?'}
        </h2>
        <p className="font-body text-xl text-cream-200 mb-4">
          {isWorkshop
            ? `Join us for ${retreat.title}`
            : `Join us in ${retreat.country} for an unforgettable filmmaking journey`}
        </p>
        <div className="space-y-2 mb-12">
          <p className="font-body text-lg text-cream-300">
            {dateRange}
            {retreat.startTime && retreat.endTime && (
              <span> &bull; {retreat.startTime} – {retreat.endTime}</span>
            )}
            {!isWorkshop && ' • 9 transformative days'}
          </p>
          {retreat.venue && (
            <p className="font-body text-lg text-cream-200 font-medium">
              {retreat.venue}
            </p>
          )}
          {retreat.venueAddress && (
            <p className="font-body text-base text-cream-400">
              {retreat.venueAddress}
            </p>
          )}
          {retreat.price && (
            <p className="font-body text-2xl text-cream-50 font-bold mt-4">
              {retreat.price}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button as="link" href={retreat.registerUrl} size="lg" variant="primary">
            {isWorkshop ? 'Reserve Your Seat' : 'Register Now'}
          </Button>
          <Button as="link" href="/subscribe" size="lg" variant="ghost">
            {retreat.emailCtaText}
          </Button>
        </div>

        <p className="font-body text-sm text-cream-400">
          Questions? Contact us at{' '}
          <a
            href="mailto:estroop3@gmail.com"
            className="text-cream-200 hover:text-cream-100 underline transition-colors duration-200"
          >
            estroop3@gmail.com
          </a>
        </p>
      </div>
    </Section>
  );
}
