import { Metadata } from 'next';
import Section from '@/components/Section';
import AnalyticsButton from '@/components/AnalyticsButton';

export const metadata: Metadata = {
  title: 'The Experience — Born to Create Project',
  description: 'Discover The Experience: a 9-day Costa Rica filmmaking retreat designed to equip creators with hands-on training, community, and spiritual growth.',
};

export default function ExperiencePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Section spacing="xl" background="sage">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-ink-900 mb-6">
            The Experience
          </h1>
          <p className="text-xl sm:text-2xl text-ink-600 leading-relaxed">
            A transformative 9-day filmmaking experience in the heart of Costa Rica
          </p>
        </div>
      </Section>

      {/* Overview Section */}
      <Section spacing="xl" background="white">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink-900 mb-8 text-center">
            A 9-Day Creative Pilgrimage in Costa Rica
          </h2>
          <div className="prose prose-lg prose-ink max-w-none">
            <p className="text-xl text-ink-600 leading-relaxed mb-6">
              The Born to Create Project retreat is a 9-day immersive filmmaking experience that blends hands-on shooting,
              comprehensive post-production teaching, and spiritual formation in the stunning landscapes of Costa Rica.
            </p>
            <p className="text-lg text-ink-600 leading-relaxed">
              More than just a skills workshop, this retreat is designed to raise up visual storytellers who carry God's
              presence into culture. We believe that creativity and calling intersect, and that the best stories emerge when
              technical excellence meets spiritual authenticity. Join us as we explore the art of filmmaking through the lens
              of faith, community, and purpose.
            </p>
          </div>
        </div>
      </Section>

      {/* Who It's For Section */}
      <Section spacing="xl" background="sand">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink-900 mb-12 text-center">
            Who The Experience is For
          </h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 text-left">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-ink-900 mb-3">Aspiring Filmmakers</h3>
                  <p className="text-ink-600 leading-relaxed">
                    Beginners who want structured, hands-on learning in a supportive environment where questions are welcomed
                    and creativity is nurtured.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-ink-900 mb-3">Intermediate Creators</h3>
                  <p className="text-ink-600 leading-relaxed">
                    Photographers, videographers, or editors who want to refine their craft and gain confidence in both
                    shooting and storytelling techniques.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-ink-900 mb-3">Faith-Driven Artists</h3>
                  <p className="text-ink-600 leading-relaxed">
                    Christians who want to merge their creativity with calling, anchoring their art in God's presence and
                    creating work with eternal significance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-ink-900 mb-3">Adventure Seekers</h3>
                  <p className="text-ink-600 leading-relaxed">
                    Those who thrive in community and travel, wanting to experience Costa Rica's diverse landscapes while
                    telling stories that matter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* What's Included Section */}
      <Section spacing="xl" background="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink-900 mb-12 text-center">
            What's Included in the 9 Days
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-forest-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-ink-700">Daily filmmaking workshops and on-location shoots</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-forest-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-ink-700">Complete gear kit provided (camera, audio, lighting) to take home</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-forest-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-ink-700">Two major video projects: one product video and one travel story</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-forest-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-ink-700">5-day virtual post-production teaching series after the trip</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-forest-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-ink-700">Guided devotionals and scripture woven into lessons</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-forest-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-ink-700">Community meals, group discussions, and fellowship</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-forest-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-ink-700">Scenic shoots across Costa Rica (urban, coastal, rainforest)</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-forest-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-ink-700">Professional instruction from industry veterans</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Placeholder for imagery */}
      <Section spacing="lg" background="cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-soft">
              <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-ink-900 mb-2">Professional Gear</h3>
              <p className="text-sm text-ink-600">Complete kit worth $2,800+ yours to keep</p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center shadow-soft">
              <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-ink-900 mb-2">Costa Rica Locations</h3>
              <p className="text-sm text-ink-600">Urban, coastal, and rainforest environments</p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center shadow-soft">
              <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-ink-900 mb-2">Community</h3>
              <p className="text-sm text-ink-600">Lifelong connections with fellow creators</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission Section */}
      <Section spacing="xl" background="sage">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink-900 mb-8 text-center">
            More Than Just Filmmaking
          </h2>
          <div className="prose prose-lg prose-ink max-w-none">
            <p className="text-xl text-ink-600 leading-relaxed mb-6">
              The Born to Create Project operates from core values that shape every moment of the retreat:
              <strong>Presence Over Performance</strong>, <strong>Eternal Impact</strong>, <strong>Spirit-Led Creativity</strong>,
              <strong>Excellence as Worship</strong>, and <strong>Truth in Storytelling</strong>.
            </p>
            <p className="text-lg text-ink-600 leading-relaxed">
              This is not just a skills workshop but a place to encounter God, refine your gifts, and create work with eternal weight.
              We believe that the best stories emerge when technical excellence meets spiritual authenticity, when community supersedes
              competition, and when creativity becomes a form of worship. Join us as we explore what it means to tell stories that matter,
              rooted in truth and anchored in God's presence.
            </p>
          </div>
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section spacing="xl" background="white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink-900 mb-6">
            Ready to Join Us in Costa Rica?
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed mb-8">
            Limited spots available for this life-changing filmmaking retreat. Reserve your place today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnalyticsButton
              href="/register"
              size="lg"
              eventName="experience_cta_register"
            >
              Register Now
            </AnalyticsButton>
            <AnalyticsButton
              href="/faq"
              variant="secondary"
              size="lg"
              eventName="experience_cta_faq"
            >
              View FAQ
            </AnalyticsButton>
          </div>
        </div>
      </Section>
    </div>
  );
}