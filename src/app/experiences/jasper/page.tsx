import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Jasper, GA Experience — The Born to Create Project',
  description: 'Mountain filmmaking retreat in Jasper, Georgia for Christian creatives',
};

export default function JasperExperience() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center bg-forest-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-jasper.jpg"
            alt="Jasper Georgia mountain lake with fall foliage"
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSorjrdOzW2g=="
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/70 via-forest-900/50 to-forest-800/60"></div>
        </div>

        {/* Content */}
        <Container className="relative z-10" size="lg">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-cream-50 mb-8 leading-tight tracking-wide mt-8">
              <span className="block">JASPER, GEORGIA</span>
              <span className="block">FILMMAKING RETREAT</span>
            </h1>

            {/* Supporting Text */}
            <div className="space-y-4 mb-10">
              <p className="font-body text-xl sm:text-2xl text-cream-200 font-medium">
                A mountain retreat for Christian creatives who need focus, stillness, and a clear path forward in their craft.
              </p>
            </div>

            <p className="font-body text-base sm:text-lg text-cream-300/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Jasper, Georgia is a quiet mountain town at the gateway to the North Georgia mountains. The Jasper retreat is a focused, small group experience for filmmakers, photographers, and storytellers who want to step away from distraction, hear God clearly, and do real work with their cameras.
            </p>

            <p className="font-body text-base sm:text-lg text-cream-300/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Over this retreat you will plan, shoot, and edit a series of real ministry and community-driven pieces: testimonies, interviews, church coverage, and a short film that captures the heart of Jasper and what God is doing there. You will leave with usable footage, practical tools for your next season, and a deeper sense of calling as a creative.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button as="link" href="/experiences/jasper/itinerary" size="lg" variant="ghost">
                View Itinerary
              </Button>
              <Button as="link" href="/experiences/jasper/pricing" size="lg" variant="primary">
                See Pricing
              </Button>
            </div>

            {/* Equipment Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-cream-200/20 text-cream-100 mb-20">
              <div className="w-3 h-3 bg-forest-400 rounded-full mr-3"></div>
              <span className="font-body text-sm font-medium">
                Professional equipment kit included
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Secondary Navigation for Jasper sub-pages */}
      <Section spacing="sm" background="cream">
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-wrap justify-center gap-4">
            <Link
              href="/experiences/jasper/itinerary"
              className="px-6 py-2 text-base font-medium text-ink-700 hover:text-forest-700 hover:bg-sage-100 rounded-full transition-colors duration-200"
            >
              Itinerary
            </Link>
            <Link
              href="/experiences/jasper/pricing"
              className="px-6 py-2 text-base font-medium text-ink-700 hover:text-forest-700 hover:bg-sage-100 rounded-full transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link
              href="/experiences/jasper/packing"
              className="px-6 py-2 text-base font-medium text-ink-700 hover:text-forest-700 hover:bg-sage-100 rounded-full transition-colors duration-200"
            >
              Packing
            </Link>
            <Link
              href="/experiences/jasper/travel"
              className="px-6 py-2 text-base font-medium text-ink-700 hover:text-forest-700 hover:bg-sage-100 rounded-full transition-colors duration-200"
            >
              Travel
            </Link>
          </nav>
        </div>
      </Section>

      {/* Why Jasper, Georgia Section */}
      <Section spacing="xl" background="white">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              Why Jasper, Georgia
            </h2>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Jasper sits just far enough outside the city that you can actually breathe. The pace is slower. The mountains are close. It is the kind of place where you can wake up to quiet, grab a coffee, and be at a scenic overlook or tucked cabin location in minutes.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                This retreat is built around that environment. Less noise. Less hurry. More presence with God and more intentional creative work. It is designed for a smaller group so you get real time with Parker and real reps behind the camera rather than getting lost in a crowd.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* What You Will Create Section */}
      <Section spacing="xl" background="sage">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              What You Will Create
            </h2>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                During the Jasper retreat you will work on real ministry-driven pieces that translate directly back to your church and city.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Examples of what you will create and practice:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Testimony and interview setups</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Multi-camera worship and teaching coverage</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Street-level stories and b-roll sequences that capture the feel of a town</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>A short, one-minute "Jasper" or retreat piece, built live from the footage you capture together</span>
                </li>
              </ul>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                The goal is not just "practice", but real workflows you can take home and repeat with your church and community.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* What To Expect Section */}
      <Section spacing="xl" background="white">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              What To Expect
            </h2>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                This is an immersive working retreat, not a conference.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                You can expect:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Morning time in Scripture and prayer</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Short teaching blocks that lead straight into action</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Small crews rotating roles on set so everyone gets time directing, shooting, and assisting</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Guided edit sessions where you get feedback as you work</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Honest conversations about calling, money, and what it means to build a life as a Christian creative</span>
                </li>
              </ul>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                The pace is full but intentional. The goal is not to crush you with work. The goal is to stretch you in a setting where you feel safe to try, miss, adjust, and grow.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" background="cream">
        <Container size="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8">
              Ready to Join the Jasper Retreat?
            </h2>
            <p className="font-body text-xl text-ink-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              Space is limited for this focused, small group experience. Explore the full itinerary and secure your spot today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as="link" href="/experiences/jasper/itinerary" size="lg" variant="primary">
                View Full Itinerary
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
