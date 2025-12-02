'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { RetreatData, formatDateRange } from '@/lib/retreats';
import Section from '../Section';

interface RetreatAccountPageProps {
  retreat: RetreatData;
  user: User;
}

interface RetreatContent {
  id: string;
  section: string;
  title: string;
  body: string;
  order_index: number;
}

const sectionTitles: Record<string, string> = {
  overview: 'Overview',
  itinerary: 'Itinerary',
  packing: 'Packing List',
  travel: 'Travel Information',
  flights: 'Flights & Arrival',
  lodging: 'Lodging Information',
  safety: 'Safety & Medical',
  visa: 'Visa & Entry Requirements'
};

const travelSubsections = ['flights', 'lodging', 'safety', 'visa'];

export default function RetreatAccountPage({ retreat, user }: RetreatAccountPageProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [content, setContent] = useState<Record<string, RetreatContent[]>>({});
  const [loading, setLoading] = useState(true);
  const [travelOpen, setTravelOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchContent() {
      try {
        const { data } = await supabase
          .from('retreat_content')
          .select('*')
          .eq('retreat_slug', retreat.slug)
          .order('order_index');

        if (data) {
          const grouped = data.reduce((acc, item) => {
            if (!acc[item.section]) {
              acc[item.section] = [];
            }
            acc[item.section].push(item);
            return acc;
          }, {} as Record<string, RetreatContent[]>);

          setContent(grouped);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [retreat.slug, supabase]);

  const renderContent = (section: string) => {
    if (section === 'overview') {
      return (
        <div className="prose prose-lg max-w-none">
          <h2 className="font-heading text-3xl font-bold text-ink-900 mb-6">
            {retreat.title}
          </h2>
          <p className="font-body text-xl text-ink-600 mb-6">
            {retreat.city} • {formatDateRange(retreat.startDate, retreat.endDate)}
          </p>
          <div className="bg-sage-50 rounded-lg p-6 mb-8">
            <h3 className="font-heading text-xl font-bold text-ink-900 mb-4">
              {retreat.theme}
            </h3>
            <p className="font-body text-ink-700">
              {retreat.overview}
            </p>
          </div>
        </div>
      );
    }

    const sectionContent = content[section] || [];

    if (sectionContent.length === 0 && !loading) {
      return (
        <div className="text-center py-8">
          <p className="font-body text-ink-600">
            Content for this section will be available closer to your retreat date.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {sectionContent.map((item) => (
          <div key={item.id} className="bg-sage-50 rounded-lg p-6">
            <h3 className="font-heading text-xl font-bold text-ink-900 mb-4">
              {item.title}
            </h3>
            <div className="font-body text-ink-700 whitespace-pre-wrap">
              {item.body}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Section spacing="xl" background="cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/account"
            className="inline-flex items-center text-forest-600 hover:text-forest-700 font-medium mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-4">
            {retreat.title}
          </h1>
          <p className="font-body text-xl text-ink-600">
            Your retreat resources and information
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-soft p-6 sticky top-6">
              <h3 className="font-heading text-lg font-bold text-ink-900 mb-4">
                Sections
              </h3>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection('overview')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeSection === 'overview'
                      ? 'bg-forest-100 text-forest-700'
                      : 'hover:bg-sage-50 text-ink-600'
                  }`}
                >
                  Overview
                </button>

                <button
                  onClick={() => setActiveSection('itinerary')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeSection === 'itinerary'
                      ? 'bg-forest-100 text-forest-700'
                      : 'hover:bg-sage-50 text-ink-600'
                  }`}
                >
                  Itinerary
                </button>

                <button
                  onClick={() => setActiveSection('packing')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeSection === 'packing'
                      ? 'bg-forest-100 text-forest-700'
                      : 'hover:bg-sage-50 text-ink-600'
                  }`}
                >
                  Packing List
                </button>

                {/* Travel Dropdown */}
                <div>
                  <button
                    onClick={() => setTravelOpen(!travelOpen)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      travelSubsections.includes(activeSection)
                        ? 'bg-forest-100 text-forest-700'
                        : 'hover:bg-sage-50 text-ink-600'
                    }`}
                  >
                    <span>Travel</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${travelOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {travelOpen && (
                    <div className="ml-4 mt-2 space-y-1">
                      <button
                        onClick={() => setActiveSection('flights')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'flights'
                            ? 'bg-forest-100 text-forest-700'
                            : 'hover:bg-sage-50 text-ink-600'
                        }`}
                      >
                        Flights & Arrival
                      </button>
                      <button
                        onClick={() => setActiveSection('lodging')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'lodging'
                            ? 'bg-forest-100 text-forest-700'
                            : 'hover:bg-sage-50 text-ink-600'
                        }`}
                      >
                        Lodging
                      </button>
                      <button
                        onClick={() => setActiveSection('safety')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'safety'
                            ? 'bg-forest-100 text-forest-700'
                            : 'hover:bg-sage-50 text-ink-600'
                        }`}
                      >
                        Safety & Medical
                      </button>
                      <button
                        onClick={() => setActiveSection('visa')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'visa'
                            ? 'bg-forest-100 text-forest-700'
                            : 'hover:bg-sage-50 text-ink-600'
                        }`}
                      >
                        Visa & Entry
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-soft p-8">
              <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6">
                {sectionTitles[activeSection] || activeSection}
              </h2>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
                  <p className="mt-4 font-body text-ink-600">Loading content...</p>
                </div>
              ) : (
                renderContent(activeSection)
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}