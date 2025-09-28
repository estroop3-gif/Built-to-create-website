import { Metadata } from 'next';
import Section from '@/components/Section';
import Button from '@/components/Button';

export const metadata: Metadata = {
  title: 'Pricing — Born to Create Project',
  description: 'See tuition for the online course and global retreats. First retreat includes a filmmaking kit. Returning students save $500 per trip.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-forest-50">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900/20 to-sage-600/30 nature-texture opacity-20"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl sm:text-6xl font-bold text-ink-900 mb-6">Pricing</h1>
          <p className="font-body text-xl text-ink-600">
            Investment in your filmmaking journey and calling
          </p>
        </div>
      </section>

      {/* Online Course Pricing */}
      <Section spacing="xl" background="white">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
            Online Course Tuition
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 1-Year Program */}
          <div className="bg-sage-50 rounded-lg p-8 shadow-soft">
            <div className="text-center mb-6">
              <h3 className="font-heading text-2xl font-bold text-ink-900 mb-4">
                1-Year Program
              </h3>
              <div className="text-4xl font-bold text-forest-600 mb-2">
                $35,000
              </div>
              <div className="text-lg text-ink-600 mb-4">
                Monthly: $2,995 for 12 months
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="font-body text-ink-700">Video curriculum, mentorship, assignments, feedback</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="font-body text-ink-700">Private community, retreat preparation</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="font-body text-ink-700">Includes one-on-one mentorship session</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="font-body text-ink-700"><strong>Outcome:</strong> Proficient solo filmmaker, retreat-ready</span>
              </div>
            </div>

            <Button as="link" href="/course" size="md" variant="primary" className="w-full justify-center">
              Learn More
            </Button>
          </div>

          {/* 2-Year Mastery Program */}
          <div className="bg-sage-50 rounded-lg p-8 shadow-soft border-2 border-forest-200">
            <div className="text-center mb-6">
              <div className="inline-block bg-forest-100 text-forest-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Most Comprehensive
              </div>
              <h3 className="font-heading text-2xl font-bold text-ink-900 mb-4">
                2-Year Mastery Program
              </h3>
              <div className="text-4xl font-bold text-forest-600 mb-2">
                Year 1: $35,000 <span className="text-base text-ink-500">or $2,995/mo</span>
              </div>
              <div className="text-4xl font-bold text-forest-600 mb-4">
                Year 2: $32,000 <span className="text-base text-ink-500">or $2,795/mo</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="font-body text-ink-700">All 1-Year benefits + advanced workshops</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="font-body text-ink-700">Festival-ready post workflow, deeper discipleship</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="font-body text-ink-700">Includes one-on-one mentorship session each year</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="font-body text-ink-700"><strong>Outcome:</strong> specialization and mastery with deeper discipleship</span>
              </div>
            </div>

            <Button as="link" href="/course" size="md" variant="primary" className="w-full justify-center">
              Learn More
            </Button>
          </div>
        </div>
      </Section>

      {/* Retreat Pricing */}
      <Section spacing="xl" background="sage">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
            Retreat Tuition
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Per-Retreat Pricing */}
          <div className="bg-white rounded-lg p-8 shadow-soft mb-8">
            <div className="text-center mb-8">
              <h3 className="font-heading text-3xl font-bold text-ink-900 mb-4">
                Per-Retreat Tuition (Standalone)
              </h3>
              <div className="text-5xl font-bold text-forest-600 mb-4">
                $5,950
              </div>
              <p className="font-body text-lg text-ink-600">
                9-day intensive with instruction, on-location production support, lodging, most ground transport, most meals, permits where applicable
              </p>
            </div>

            <div className="bg-forest-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-forest-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-xl font-bold text-ink-900">First Retreat Bonus</h4>
                  <p className="font-body text-ink-600">The Filmmaking Kit is included with your first retreat only</p>
                </div>
              </div>
              <p className="font-body text-sm text-ink-500 text-center italic">
                Kit value: $2,800
              </p>
            </div>

            <div className="bg-sage-50 rounded-lg p-6">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-forest-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-xl font-bold text-ink-900">Returning-Student Discount</h4>
                  <p className="font-body text-ink-600">$500 off each additional retreat after your first</p>
                </div>
              </div>
            </div>

            <p className="font-body text-sm text-ink-500 mt-6 text-center">
              Airfare not included. Some specialty activities, rentals, or optional excursions may incur additional costs; see each retreat page.
            </p>
          </div>
        </div>
      </Section>

      {/* Deposit & Payment Plans */}
      <Section spacing="xl" background="cream">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
            Deposit & Payment Plans
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-soft text-center">
            <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ink-900 mb-3">Deposit</h3>
            <div className="text-2xl font-bold text-forest-600 mb-2">$750</div>
            <p className="font-body text-ink-600 text-sm">
              To reserve your spot (applied to tuition, non-refundable)
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-soft text-center">
            <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 16l-4-4m4 4l4-4m-4 4V9" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ink-900 mb-3">Payment Plans</h3>
            <p className="font-body text-ink-600 text-sm">
              Monthly or milestone-based plans available through the site checkout
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-soft text-center">
            <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ink-900 mb-3">Final Balance</h3>
            <p className="font-body text-ink-600 text-sm">
              Due 30 days before departure
            </p>
          </div>
        </div>
      </Section>

      {/* What's Included */}
      <Section spacing="xl" background="white">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
            What's Included
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <div className="w-2 h-2 bg-cream-50 rounded-full"></div>
              </div>
              <span className="font-body text-lg text-ink-700">Instruction and mentorship</span>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <div className="w-2 h-2 bg-cream-50 rounded-full"></div>
              </div>
              <span className="font-body text-lg text-ink-700">Curriculum and assignments</span>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <div className="w-2 h-2 bg-cream-50 rounded-full"></div>
              </div>
              <span className="font-body text-lg text-ink-700">Production support and location coordination</span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <div className="w-2 h-2 bg-cream-50 rounded-full"></div>
              </div>
              <span className="font-body text-lg text-ink-700">Lodging, in-country transport, most meals</span>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <div className="w-2 h-2 bg-cream-50 rounded-full"></div>
              </div>
              <span className="font-body text-lg text-ink-700">Filmmaking Kit on your first retreat</span>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <div className="w-2 h-2 bg-cream-50 rounded-full"></div>
              </div>
              <span className="font-body text-lg text-ink-700">Community, accountability, and post-retreat feedback</span>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" background="forest">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-cream-50 mb-6">
            Ready to Begin?
          </h2>
          <p className="font-body text-xl text-cream-200 mb-12">
            Start your filmmaking journey with confidence. Every path leads to transformation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button as="link" href="/register" size="lg" variant="primary">
              Register for Retreat
            </Button>
            <Button as="link" href="/course" size="lg" variant="ghost">
              Explore Online Course
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}