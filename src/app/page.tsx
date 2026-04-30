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
            alt="Born to Create Project"
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
              Born to Create Project is a gathering place for creatives who feel called to tell stories that matter. Through hands-on workshops and immersive experiences, we help you grow your craft, build real skills, and connect with a community of storytellers who take filmmaking seriously.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
              <Button as="link" href="/experiences" size="lg" variant="primary">
                View Workshops
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
            <div className="grid grid-cols-2 gap-4 mb-10">
              <img
                src="/images/dinner-scene-bw.jpg"
                alt="Film crew shooting a dinner scene on set"
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
              <img
                src="/images/slate-greenscreen.jpg"
                alt="Film slate on set with green screen"
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
            </div>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Born to Create Project is a series of filmmaking workshops and experiences designed for people who know they were made to create, but feel stuck, scattered, or alone in the process.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Each experience combines real world production with practical teaching. You will not just sit in a classroom and take notes. You will get behind real cameras, learn how productions actually work, and leave with the skills and confidence to start creating on your own.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Whether you are just starting out or already working in the industry, these workshops are built to help you:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Understand how real productions actually work</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Level up your craft with hands on experience and professional gear</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Connect with other creators and storytellers in your area</span>
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
            <div className="grid grid-cols-2 gap-4 mb-10">
              <img
                src="/images/cinema-camera-rig.jpg"
                alt="Professional cinema camera rig on set"
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
              <img
                src="/images/filmmaker-garage.jpg"
                alt="Filmmaker operating camera on location"
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
            </div>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                We believe every creative has something worth saying — and the skills to say it well can be learned.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Born to Create Project exists to raise up a generation of visual storytellers who shape narratives with truth, create work that matters, and build real careers doing what they love.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                We do this by creating spaces where:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Learning comes before showing off</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Excellence is the standard, not the exception</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Honest storytelling is valued over flashy content</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Community replaces comparison and competition</span>
                </li>
              </ul>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                These workshops are not about chasing clout. They are about building a real foundation in your craft and taking the next step forward as a filmmaker.
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
            <div className="flex justify-center mb-8">
              <img
                src="/images/parker-mountain.jpg"
                alt="Parker Stroop with camera in the mountains"
                className="w-64 h-64 object-cover rounded-full shadow-lg"
              />
            </div>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Born to Create Project is led by filmmaker and camera operator Edward Parker Stroop, with nearly a decade of experience across TV, documentary, motorsports, and narrative work.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Parker has worked with major networks and brands including National Geographic, History Channel, ABC, HGTV, Lifetime, and Fox. His passion is helping new creators understand how the industry actually works and build real skills they can use immediately.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                In each workshop, Parker is not just lecturing. He is working alongside you:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Walking you through how real productions work</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Giving direct feedback on your shots, technique, and story choices</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>Helping you figure out your next steps — whether that is personal projects, paid work, or building a reel</span>
                </li>
              </ul>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                You will not be left to figure it out later. The goal is that you leave each workshop with real skills and a clear plan for what to do next.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                <a href="https://www.imdb.com/name/nm10358218/" target="_blank" rel="noopener noreferrer" className="font-semibold text-forest-700 underline underline-offset-2 hover:text-forest-900 transition-colors">Check out his work on IMDb &rarr;</a>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Upcoming Workshops Section */}
      <Section spacing="xl" background="cream">
        <Container size="xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
              Upcoming Workshops
            </h2>
            <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Our &ldquo;Filmmaking in the Real World&rdquo; workshops are practical, hands-on sessions taught by a working professional. In two hours you will learn real-world camera fundamentals, understand how productions actually work, and walk away knowing how to start creating with what you already have.
            </p>
            <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
              Each workshop includes time with professional cinema cameras, direct feedback, and a clear plan for your next steps — whether that is personal projects, paid work, or building a reel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* Jasper Workshop Card */}
            <div className="bg-sage-50 rounded-lg overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 group">
              <div className="p-8">
                <h3 className="font-heading text-3xl font-bold text-ink-900 mb-2">
                  Jasper, GA
                </h3>
                <p className="font-body text-sm font-medium text-ink-500 mb-4">
                  May 16, 2026 · 2:00 – 4:00 PM
                </p>
                <p className="font-body text-base text-ink-600 mb-6 leading-relaxed">
                  Camera basics, real set experience, documentary storytelling, and how to start creating better video with what you already have. Held at Pickens County Recreation Center.
                </p>
                <p className="font-heading text-2xl font-bold text-forest-700 mb-6">$50</p>
                <Button
                  as="link"
                  href="/experiences/filmmaking-in-the-real-world"
                  size="md"
                  variant="primary"
                  className="group-hover:bg-forest-700 transition-colors duration-200"
                >
                  View Workshop
                </Button>
              </div>
            </div>

            {/* Canton Workshop Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 group">
              <div className="p-8">
                <h3 className="font-heading text-3xl font-bold text-ink-900 mb-2">
                  Canton, GA
                </h3>
                <p className="font-body text-sm font-medium text-ink-500 mb-4">
                  May 23, 2026 · 2:00 – 4:00 PM
                </p>
                <p className="font-body text-base text-ink-600 mb-6 leading-relaxed">
                  The same practical, hands-on workshop — camera fundamentals, production workflow, and documentary storytelling. Held at River Church Canton — Community Room.
                </p>
                <p className="font-heading text-2xl font-bold text-forest-700 mb-6">$50</p>
                <Button
                  as="link"
                  href="/experiences/filmmaking-canton"
                  size="md"
                  variant="secondary"
                  className="group-hover:bg-sage-100 transition-colors duration-200"
                >
                  View Workshop
                </Button>
              </div>
            </div>
          </div>

          <p className="font-body text-lg text-ink-600 text-center max-w-3xl mx-auto leading-relaxed mb-8">
            Each workshop includes teaching, hands-on time with professional gear, and a Q&amp;A session with practical next steps.
          </p>

          <div className="text-center">
            <Button as="link" href="/register" size="lg" variant="primary">
              Register Now
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
            <div className="grid grid-cols-2 gap-4 mb-10">
              <img
                src="/images/camera-ocean-bw.jpg"
                alt="Filmmaker operating cinema camera by the ocean"
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
              <img
                src="/images/interview-setup.jpg"
                alt="Professional interview setup with lighting and cameras"
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
            </div>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                These workshops are for you if:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>You are curious about filmmaking but do not know where to start</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>You want practical, real-world skills taught by someone who works in the industry</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>You are a student, creator, church media volunteer, or small business owner who wants to make better video</span>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3">•</span>
                  <span>You want hands-on time with professional cinema cameras and honest feedback on your next steps</span>
                </li>
              </ul>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                You do not need experience or expensive gear. You just have to be willing to show up and learn.
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
              Check out our upcoming workshops, pick a date that works, and reserve your seat. Spaces are limited so everyone gets real attention.
            </p>
            <p className="font-body text-lg text-ink-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              If you have questions about gear, skill level, or whether a workshop is the right fit, reach out. We are happy to talk it through with you.
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