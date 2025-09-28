import Section from './Section';
import { getAllRetreats, formatDateRange } from '@/lib/retreats';
import Link from 'next/link';

export default function RetreatsOverviewSection() {
  const retreats = getAllRetreats();

  return (
    <Section spacing="xl" background="white">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          Global 9-Day Intensives
        </h2>
        <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
          Four 9-day retreats with Friday departures, each focused on a distinct pillar of craft and calling.
          Travel solo, learn in community, and create films that carry eternal weight.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {retreats.map((retreat) => {
          const displayTitle = retreat.slug === 'london' ? 'United Kingdom' : retreat.country;
          const displaySubline = retreat.slug === 'london' ? 'London → Oxford → Northern Ireland' : retreat.city;

          return (
            <Link
              key={retreat.slug}
              href={`/retreats/${retreat.slug}`}
              className="bg-white rounded-lg p-6 shadow-soft hover:shadow-button transition-all duration-200 hover:-translate-y-1 border border-sage-100 hover:border-forest-200"
            >
              <div className="text-center">
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-2">
                  {displayTitle}
                </h3>
                {displaySubline && (
                  <p className="font-body text-sm text-ink-500 mb-4">
                    {displaySubline}
                  </p>
                )}
                <p className="font-body text-base text-ink-600 mb-3">
                  {formatDateRange(retreat.startDate, retreat.endDate)}
                </p>
                <p className="font-body text-sm text-forest-600 font-medium">
                  {retreat.theme}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}