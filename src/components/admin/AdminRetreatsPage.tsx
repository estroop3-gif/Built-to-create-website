'use client';

import Link from 'next/link';
import { getAllRetreats, formatDateRange } from '@/lib/retreats';
import Section from '../Section';

export default function AdminRetreatsPage() {
  const allExperiences = getAllRetreats();
  const retreats = allExperiences.filter((e) => e.type !== 'workshop');
  const workshops = allExperiences.filter((e) => e.type === 'workshop');

  return (
    <Section spacing="xl" background="sage">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center text-forest-600 hover:text-forest-700 font-medium mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Admin Dashboard
            </Link>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-4">
              Experience Management
            </h1>
            <p className="font-body text-xl text-ink-600">
              Manage retreats, workshops, content, and access
            </p>
          </div>
        </div>

        {/* Workshops Section */}
        {workshops.length > 0 && (
          <>
            <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Workshops
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {workshops.map((workshop) => (
                <div key={workshop.slug} className="bg-white rounded-lg shadow-soft p-6 border-l-4 border-forest-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-forest-100 text-forest-700">
                      Workshop
                    </span>
                    {workshop.price && (
                      <span className="text-sm font-medium text-ink-500">{workshop.price}</span>
                    )}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-ink-900 mb-2">
                    {workshop.title}
                  </h3>
                  <p className="font-body text-ink-600 mb-2">
                    {workshop.city} {workshop.duration && `\u2022 ${workshop.duration}`}
                  </p>
                  <p className="font-body text-ink-500 text-sm mb-4">
                    {formatDateRange(workshop.startDate, workshop.endDate)}
                  </p>
                  <p className="font-body text-sm text-forest-600 font-medium mb-6">
                    {workshop.theme}
                  </p>

                  <Link
                    href={`/admin/retreats/${workshop.slug}`}
                    className="inline-block bg-forest-600 text-cream-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest-700 transition-colors"
                  >
                    Manage Workshop
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Retreats Section */}
        <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Retreats
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {retreats.map((retreat) => {
            const displayTitle = retreat.slug === 'london' ? 'United Kingdom' : retreat.country;

            return (
              <div key={retreat.slug} className="bg-white rounded-lg shadow-soft p-6">
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-2">
                  {displayTitle}
                </h3>
                <p className="font-body text-ink-600 mb-4">
                  {retreat.city} {'\u2022'} {formatDateRange(retreat.startDate, retreat.endDate)}
                </p>
                <p className="font-body text-sm text-forest-600 font-medium mb-6">
                  {retreat.theme}
                </p>

                <Link
                  href={`/admin/retreats/${retreat.slug}`}
                  className="inline-block bg-forest-600 text-cream-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest-700 transition-colors"
                >
                  Manage Retreat
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
