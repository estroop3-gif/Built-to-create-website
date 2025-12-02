'use client';

import Link from 'next/link';
import { getAllRetreats, formatDateRange } from '@/lib/retreats';
import Section from '../Section';

export default function AdminRetreatsPage() {
  const retreats = getAllRetreats();

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
              Retreat Management
            </h1>
            <p className="font-body text-xl text-ink-600">
              Manage retreat content, access, and information
            </p>
          </div>
        </div>

        {/* Retreat Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {retreats.map((retreat) => {
            const displayTitle = retreat.slug === 'london' ? 'United Kingdom' : retreat.country;

            return (
              <div key={retreat.slug} className="bg-white rounded-lg shadow-soft p-6">
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-2">
                  {displayTitle}
                </h3>
                <p className="font-body text-ink-600 mb-4">
                  {retreat.city} • {formatDateRange(retreat.startDate, retreat.endDate)}
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