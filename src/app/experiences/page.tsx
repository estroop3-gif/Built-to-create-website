import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experiences - Born to Create Project | Filmmaking Workshops',
  description: 'Explore our hands-on filmmaking workshops in Jasper and Canton, Georgia. Real-world production skills, professional gear, and practical next steps.',
};

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-forest-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-filmmaking.jpg"
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
              Hands-on filmmaking workshops where you learn real-world production skills from a working professional. Practical, focused, and designed to help you start creating with confidence.
            </p>
          </div>
        </Container>
      </section>

      {/* Workshops Section */}
      <Section spacing="xl" background="white">
        <Container size="lg">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
              Filmmaking in the Real World
            </h2>
            <p className="font-body text-xl text-ink-600 leading-relaxed max-w-3xl mx-auto">
              A 2-hour in-person workshop covering camera basics, real set experience, documentary storytelling, and how to start creating better video with what you already have. Practical, focused, and taught by a working professional.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Jasper Card */}
            <div className="bg-sage-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="font-heading text-2xl font-bold text-ink-900 mb-2">
                Jasper, GA
              </h3>
              <p className="font-body text-sm font-medium text-forest-700 mb-4">
                May 16, 2026 · 2:00 – 4:00 PM
              </p>
              <div className="space-y-2 mb-6">
                <p className="font-body text-base text-ink-600 leading-relaxed">
                  Pickens County Recreation Center
                </p>
                <p className="font-body text-sm text-ink-500">
                  1329 Camp Rd, Jasper, GA 30143
                </p>
              </div>
              <p className="font-heading text-2xl font-bold text-forest-700 mb-6">$50</p>
              <Button as="link" href="/experiences/filmmaking-in-the-real-world" variant="primary">
                View Workshop
              </Button>
            </div>

            {/* Canton Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-sage-100 hover:shadow-xl transition-all duration-300">
              <h3 className="font-heading text-2xl font-bold text-ink-900 mb-2">
                Canton, GA
              </h3>
              <p className="font-body text-sm font-medium text-forest-700 mb-4">
                May 23, 2026 · 2:00 – 4:00 PM
              </p>
              <div className="space-y-2 mb-6">
                <p className="font-body text-base text-ink-600 leading-relaxed">
                  River Church Canton — Community Room
                </p>
                <p className="font-body text-sm text-ink-500">
                  2335 Sixes Rd, Canton, GA 30144
                </p>
              </div>
              <p className="font-heading text-2xl font-bold text-forest-700 mb-6">$50</p>
              <Button as="link" href="/experiences/filmmaking-canton" variant="primary">
                View Workshop
              </Button>
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
              Every Born to Create Project workshop is built around the same core elements — practical teaching, real gear, and honest next steps.
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
                  Real cameras, real settings, real techniques you can apply immediately to your own projects.
                </p>
              </div>
              <div>
                <div className="bg-sage-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-3 text-center">
                  Expert Teaching
                </h3>
                <p className="font-body text-base text-ink-600 leading-relaxed text-center">
                  Learn from a working Director of Photography with nearly a decade of experience across TV, documentary, and commercial work.
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
                  Connect with other aspiring filmmakers, ask questions, and leave with a network of people on the same journey.
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
              Pick the workshop date and location that works for you, reserve your seat, and come ready to learn. If you have questions, we are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as="link" href="/register" size="lg" variant="primary">
                Register Now
              </Button>
              <Button as="link" href="/contact" size="lg" variant="secondary">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
