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
              <span className="block">MEDIA LEADERS RETREAT</span>
            </h1>

            {/* Supporting Text */}
            <div className="space-y-4 mb-10">
              <p className="font-body text-xl sm:text-2xl text-cream-200 font-medium">
                A mountain retreat for church media leaders who need focus, stillness, and a clear path forward in their calling.
              </p>
              <p className="font-body text-xl sm:text-2xl text-cream-200 font-medium">
                Two sessions: January 28–30, 2026 & May 6–8, 2026
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button as="link" href="/experiences/jasper/itinerary" size="lg" variant="ghost">
                View Itinerary
              </Button>
              <Button as="link" href="/experiences/jasper/pricing" size="lg" variant="primary">
                See Pricing
              </Button>
            </div>

            <p className="font-body text-base sm:text-lg text-cream-300/90 mb-20 max-w-3xl mx-auto leading-relaxed">
              Set in the quiet mountain town of Jasper, Georgia, this small group retreat is designed for media leaders and creatives serving in the local church who want to step away from distraction, hear God clearly, and sharpen their craft. Across three days you will capture real testimonies, interviews, worship and teaching coverage, and a short film, while learning simple, repeatable workflows you can take back home. You will leave with usable footage, practical systems for Sundays and special events, and a renewed vision for how your media team can serve your pastor, your people, and what God is doing in your church.
            </p>
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
            <Link
              href="/experiences/jasper/what-you-bring-back"
              className="px-6 py-2 text-base font-medium text-ink-700 hover:text-forest-700 hover:bg-sage-100 rounded-full transition-colors duration-200"
            >
              Church Media Toolkit
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

      {/* Who Will Be Leading This Retreat Section */}
      <Section spacing="xl" background="sage">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              Who Will Be Leading This Retreat
            </h2>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                The Jasper retreat is led by filmmaker and camera operator Edward Parker Stroop, a faith based storyteller with nearly a decade of experience across TV, documentary, motorsports, and narrative work. Parker grew up in the local church and has spent much of his career capturing testimonial interviews and long form stories that highlight real people and what God is doing in their lives.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                His credits include work with major TV networks and brands, docu follow series, reality and lifestyle shows, and fast paced motorsports projects, alongside faith driven projects. That mix means your media team will be learning from someone who understands both the technical demands of high level production and the heart behind telling honest, God centered stories.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                As a leader, you can expect your team to be coached by someone who:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Speaks the language of directors, camera ops, and editors, while honoring pastors, elders, and church leadership</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Builds simple, repeatable systems for testimonies, multi camera services, and community stories that can work on normal Sundays</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Gives clear, practical feedback on framing, movement, audio, and pacing without shaming or overwhelming your team</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Cares as much about your team's spiritual health and sense of calling as their technical skill set</span>
                </li>
              </ul>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Alongside Parker, a trusted local pastor will be part of the retreat to provide spiritual guidance, teaching, and pastoral care. This gives your media leaders space to process what God is doing in them, not just what they are doing with a camera. Sessions, prayer times, and conversations are anchored in Scripture and a local church perspective, so you can trust that what they receive here will support the discipleship and culture you are already building at home.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                For senior pastors and church leaders, the heart of this retreat is simple: send your media team away to be invested in, challenged, and refreshed, and they will come home with clearer vision, healthier rhythms, and practical tools that directly serve your people and your Sunday gatherings.
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
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>A glamping style camp setup where we are tent camping, but full cots, cot mattresses, and comfort items are provided so you can actually rest between full days of shooting and learning</span>
                </li>
              </ul>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                You only need to bring a sleeping bag.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                We are building out the property specifically for this experience, with simple but intentional shared spaces for teaching, meals, editing, and hanging out around the fire. The facilities are designed to be comfortable without being distracting, so you can step away from your normal routine, breathe in the mountain air, and focus on God, your craft, and the people you are here to serve.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                The pace is full but intentional. The goal is not to crush you with work. The goal is to stretch you in a setting where you feel safe to try, miss, adjust, and grow.
              </p>
              <div className="mt-8 text-center">
                <Link
                  href="/experiences/jasper/details"
                  className="inline-block bg-forest-600 text-cream-50 px-6 py-3 rounded-lg font-medium hover:bg-forest-700 transition-colors"
                >
                  View Retreat Details
                </Link>
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
