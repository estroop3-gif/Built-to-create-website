import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experiences - Born to Create Project | Filmmaking Retreats',
  description: 'Explore our faith-centered filmmaking retreats in Costa Rica and Jasper, GA. Hands-on production, spiritual growth, and creative community.',
};

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-forest-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-costa-rica.jpg"
            alt="Born to Create Project experiences"
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSorjrdOzW2g=="
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 via-forest-900/60 to-forest-800/70"></div>
        </div>

        {/* Content */}
        <Container className="relative z-10" size="lg">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-cream-50 mb-8 leading-tight tracking-wide">
              OUR EXPERIENCES
            </h1>
            <p className="font-body text-xl sm:text-2xl text-cream-200 leading-relaxed max-w-3xl mx-auto mb-8">
              Faith-centered filmmaking retreats where creativity meets calling. Each experience is designed to help you grow in your craft, encounter God, and build lasting community with other Christian storytellers.
            </p>
          </div>
        </Container>
      </section>

      {/* Costa Rica Experience */}
      <Section spacing="xl" background="white">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
                Costa Rica
              </h2>
              <p className="font-body text-lg text-ink-600 leading-relaxed mb-6">
                A 9-day filmmaking retreat set in the diverse landscapes of Costa Rica. From the bustling streets of San José to the beach town of Jacó and the mountain community of Santiago de Puriscal, you will capture travel sequences, product-style pieces, interviews, and documentary vérité while learning the fundamentals of visual storytelling.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed mb-6">
                This experience combines hands-on production with spiritual rhythms: daily devotion, worship nights, testimony circles, and structured time to hear from God about your calling as a creative. You will leave with finished projects, new friendships, and a clearer sense of how your craft fits into God's story.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <span className="text-forest-600 mr-3 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-900">9 days</p>
                    <p className="text-sm text-ink-600">Multiple locations across Costa Rica</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-forest-600 mr-3 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-900">All-inclusive</p>
                    <p className="text-sm text-ink-600">Lodging, meals, and transportation included</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-forest-600 mr-3 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-900">Production focused</p>
                    <p className="text-sm text-ink-600">Documentary, travel, and product filmmaking</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button as="link" href="/experiences/costa-rica" size="lg" variant="primary">
                  Explore Costa Rica
                </Button>
                <Button as="link" href="/experiences/costa-rica/itinerary" size="lg" variant="ghost">
                  View Itinerary
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/hero-costa-rica.jpg"
                  alt="Costa Rica filmmaking retreat"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Jasper, GA Experience */}
      <Section spacing="xl" background="sage">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/visit-first-mountain-city-jasper-georgia-featured-1.jpg"
                  alt="Jasper Georgia mountain retreat"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-2">
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
                Jasper, Georgia
              </h2>
              <p className="font-body text-lg text-ink-600 leading-relaxed mb-6">
                A mountain retreat for church media leaders who need focus, stillness, and a clear path forward in their calling. Set in the quiet town of Jasper, Georgia, this small group experience is designed for media leaders and creatives serving in the local church.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed mb-6">
                Across three days you will capture real testimonies, interviews, worship and teaching coverage, and a short film, while learning simple, repeatable workflows you can take back home. You will leave with usable footage, practical systems for Sundays and special events, and a renewed vision for how your media team can serve your church.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <span className="text-forest-600 mr-3 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-900">3 days + travel (two sessions)</p>
                    <p className="text-sm text-ink-600">Session 1: Jan 28-30 • Session 2: May 6-8, 2026</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-forest-600 mr-3 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-900">Glamping setup</p>
                    <p className="text-sm text-ink-600">Simple mountain lodging, all meals included</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-forest-600 mr-3 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-900">Church media focused</p>
                    <p className="text-sm text-ink-600">Testimonies, worship coverage, and practical workflows</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button as="link" href="/experiences/jasper" size="lg" variant="primary">
                  Explore Jasper
                </Button>
                <Button as="link" href="/experiences/jasper/itinerary" size="lg" variant="ghost">
                  View Itinerary
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* What to Expect Section */}
      <Section spacing="xl" background="white">
        <Container size="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8">
              What to Expect
            </h2>
            <p className="font-body text-xl text-ink-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              Every Born to Create Project experience includes the same core elements, shaped to fit the location and focus of each retreat.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <div className="bg-forest-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-3 text-center">
                  Hands-On Production
                </h3>
                <p className="font-body text-base text-ink-600 leading-relaxed text-center">
                  Real shoots, real edits, real projects you can take home and use in your portfolio or ministry.
                </p>
              </div>
              <div>
                <div className="bg-sage-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-3 text-center">
                  Spiritual Rhythms
                </h3>
                <p className="font-body text-base text-ink-600 leading-relaxed text-center">
                  Daily devotion, worship, prayer, and space to encounter God in the middle of the creative process.
                </p>
              </div>
              <div>
                <div className="bg-cream-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-3 text-center">
                  Creative Community
                </h3>
                <p className="font-body text-base text-ink-600 leading-relaxed text-center">
                  Build genuine friendships with other Christian filmmakers who understand your calling and your struggles.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" background="cream">
        <Container size="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8">
              Ready to Take the Next Step?
            </h2>
            <p className="font-body text-xl text-ink-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              Explore the full details of each experience, read through the itineraries, and pray about where God might be leading you. If you have questions, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as="link" href="/contact" size="lg" variant="primary">
                Contact Us
              </Button>
              <Button as="link" href="/faq" size="lg" variant="secondary">
                View FAQ
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
