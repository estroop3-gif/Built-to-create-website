import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center bg-forest-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-costa-rica.jpg"
            alt="Filmmaking retreat location"
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
              <span className="block">BORN TO CREATE</span>
              <span className="block">PROJECT</span>
            </h1>

            {/* Supporting Text */}
            <div className="space-y-4 mb-10">
              <p className="font-body text-xl sm:text-2xl text-cream-200 font-medium">
                Where creativity meets calling
              </p>
            </div>

            <p className="font-body text-base sm:text-lg text-cream-300/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Born to Create Project is a gathering place for Christian creatives who feel called to tell stories that matter. Through immersive retreats and hands-on experiences, we help you step away from the noise, encounter God, and return home with real projects, real community, and a renewed sense of purpose.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
              <Button as="link" href="/experiences" size="lg" variant="primary">
                Explore Experiences
              </Button>
              <Button as="link" href="#who-leads" size="lg" variant="ghost">
                Meet Your Guide
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What is Born to Create Project Section */}
      <Section spacing="xl" background="white">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              What is Born to Create Project?
            </h2>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Born to Create Project is a series of faith centered filmmaking and storytelling retreats designed for people who know they were made to create, but feel stuck, scattered, or alone in the process.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Each experience combines real world production, practical teaching, and dedicated time in God's presence. You will not just sit in a classroom and take notes. You will shoot, direct, edit, and leave with finished work in your hands, spiritual momentum in your heart, and a community of creatives walking alongside you.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Whether you are just starting out or already working in the industry, these retreats are built to help you:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Hear God more clearly in your creative process</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Level up your craft with hands on production days</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Build lifelong friendships with like minded storytellers</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Go home with clarity on your next steps</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Mission Section */}
      <Section spacing="xl" background="sage">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              Our Mission
            </h2>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                We believe every artist is born to create and called to reflect the Creator.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Born to Create Project exists to raise up a generation of visual storytellers who carry the presence of God into culture, shape narratives with truth, and create work that reverberates into eternity.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                We do this by creating spaces where:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Presence comes before performance</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Excellence is an act of worship, not self promotion</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Truth is told even when it is raw, uncomfortable, or costly</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Community replaces comparison and competition</span>
                </li>
              </ul>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                These retreats are not about chasing clout. They are about becoming the kind of person who can carry what God wants to entrust to you.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Who Leads These Trips Section */}
      <Section spacing="xl" background="white" id="who-leads">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              Who Leads These Trips?
            </h2>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Born to Create Project is led by filmmaker and camera operator Edward Parker Stroop, a faith based storyteller with nearly a decade of experience across TV, documentary, motorsports, and narrative work.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Parker has worked with major networks and brands, but his deepest passion is helping believers step into their calling as creatives. He carries a unique blend of industry experience and pastoral heart, creating environments that are both technically challenging and spiritually safe.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                On each trip, Parker is not just teaching. He is in the field with you:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Walking you through real productions</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Giving feedback on your shots, edits, and story choices</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Helping you listen for what God is saying in the middle of the process</span>
                </li>
              </ul>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                You will not be left to figure it out later. The goal is that you leave each experience with work you are proud of and a renewed sense of why you create.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* The Experiences Section */}
      <Section spacing="xl" background="cream">
        <Container size="xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
              The Experience
            </h2>
            <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Each retreat offers a unique opportunity to reconnect with your creative spirit while immersed in purposeful environments—from vibrant international landscapes to quiet mountain settings—where you can step away from distraction and focus on what matters most.
            </p>
            <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Over multiple transformative days, you'll learn fundamentals of filmmaking from industry professionals, collaborate with fellow creatives, and produce work that reflects your authentic voice and faith.
            </p>
            <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Mornings begin with devotion and prayer; evenings may include testimony circles, worship nights, or reflection. Field work spans practical projects like travel sequences, portraits, interviews, testimonies, and worship coverage across real locations.
            </p>
            <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
              You'll leave not just with sharpened skills, but with a renewed sense of calling and a community that will support your creative and spiritual journey long after the retreat ends.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* Costa Rica Card */}
            <div className="bg-sage-50 rounded-lg overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 group">
              <div className="p-8">
                <h3 className="font-heading text-3xl font-bold text-ink-900 mb-4">
                  Costa Rica
                </h3>
                <p className="font-body text-base text-ink-600 mb-6 leading-relaxed">
                  A filmmaking retreat set in lush landscapes, where you will shoot both travel and product style projects, learn on location storytelling, and encounter God away from the noise of everyday life.
                </p>
                <Button
                  as="link"
                  href="/experiences/costa-rica"
                  size="md"
                  variant="primary"
                  className="group-hover:bg-forest-700 transition-colors duration-200"
                >
                  Explore Costa Rica
                </Button>
              </div>
            </div>

            {/* Jasper Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 group">
              <div className="p-8">
                <h3 className="font-heading text-3xl font-bold text-ink-900 mb-4">
                  Jasper, GA
                </h3>
                <p className="font-body text-base text-ink-600 mb-6 leading-relaxed">
                  A mountain retreat designed for focused, intimate teaching, with space to breathe, create, and connect deeply with God and other filmmakers.
                </p>
                <Button
                  as="link"
                  href="/experiences/jasper"
                  size="md"
                  variant="secondary"
                  className="group-hover:bg-sage-100 transition-colors duration-200"
                >
                  Explore Jasper
                </Button>
              </div>
            </div>
          </div>

          <p className="font-body text-lg text-ink-600 text-center max-w-3xl mx-auto leading-relaxed mb-8">
            Each experience includes hands on production days, teaching sessions, time in Scripture and prayer, and structured feedback on your work.
          </p>

          <div className="text-center">
            <Button as="link" href="/experiences" size="lg" variant="primary">
              View All Experiences
            </Button>
          </div>
        </Container>
      </Section>

      {/* Is This For Me Section */}
      <Section spacing="xl" background="sage">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              Is Born to Create Project for Me?
            </h2>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                These retreats are for you if:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>You sense a call to create but feel stuck, burnt out, or alone</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>You want to grow technically without losing sight of what God is doing in your heart</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>You are hungry for community with other believers who take both Jesus and filmmaking seriously</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>You are ready to step out of your normal routine and give God focused time and attention in your craft</span>
                </li>
              </ul>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                You do not have to be established or successful to come. You just have to be willing to show up, be honest, and give your yes.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Next Steps Section */}
      <Section spacing="xl" background="white">
        <Container size="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8">
              Ready to Take the Next Step?
            </h2>
            <p className="font-body text-xl text-ink-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              Start by exploring our current experiences, reading through the itineraries, and praying about where God might be leading you.
            </p>
            <p className="font-body text-lg text-ink-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              If you have questions about gear, skill level, travel, or whether a specific retreat is the right fit, reach out. We are happy to talk it through with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as="link" href="/experiences" size="lg" variant="primary">
                Explore Experiences
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