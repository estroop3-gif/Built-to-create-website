import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filmmaking in the Real World — Workshop in Jasper, GA | The Born to Create Project',
  description: 'A 2-hour in-person workshop in Jasper, GA covering camera basics, real set experience, documentary storytelling, and how to start creating better video with what you already have. $50.',
};

export default function FilmmakingInTheRealWorldPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-forest-900 overflow-hidden">
        <img src="/images/hero-filmmaking.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900/90 via-forest-800/80 to-forest-900/90"></div>
        <Container className="relative z-10" size="lg">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-cream-50 mb-8 leading-tight tracking-wide">
              FILMMAKING IN THE REAL WORLD
            </h1>
            <p className="font-body text-xl sm:text-2xl text-cream-200 font-medium mb-8 max-w-3xl mx-auto">
              Camera basics, set experience, documentary storytelling, and how to start creating with what you already have.
            </p>
            <p className="font-body text-lg text-cream-300/90 leading-relaxed mb-10 max-w-2xl mx-auto">
              A 2-hour in-person workshop in Jasper, Georgia for students, creators, church media teams, small business owners, photographers, and anyone who wants to understand how real productions work and start making better video.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-cream-50/10 text-cream-100 border border-cream-200/20">
                Jasper, Georgia
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-cream-50/10 text-cream-100 border border-cream-200/20">
                2 Hours
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-cream-50/10 text-cream-100 border border-cream-200/20">
                In Person
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-cream-50/10 text-cream-100 border border-cream-200/20">
                $50
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-cream-50/10 text-cream-100 border border-cream-200/20">
                Limited Seats
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-cream-50/10 text-cream-100 border border-cream-200/20">
                May 16, 2026
              </span>
            </div>
            <Button as="link" href="/register" size="lg" variant="primary">
              Reserve Your Seat
            </Button>
          </div>
        </Container>
      </section>

      {/* Overview Section */}
      <Section spacing="xl" background="white">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              Overview
            </h2>
            <div className="space-y-6 text-left">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Filmmaking in the Real World is designed to bridge the gap between knowing camera terms and understanding how real productions actually work. In two hours, you will learn practical camera fundamentals, see what happens on a real set, understand how to think through a simple shoot from start to finish, and walk away knowing how to start creating with the gear you already have.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                This is not a replacement for film school or a technical education program. It is a focused, practical workshop taught by someone who has spent nearly a decade working on real productions — from network television to independent documentaries. You will learn real-world production skills that take years to pick up on your own: how to work fast, think in coverage, handle interviews, avoid common mistakes, and start making yourself useful on real projects.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                This is for the person who wants to stop guessing, stop waiting for perfect gear, and start understanding how real shoots are built.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* What You'll Learn Section */}
      <Section spacing="xl" background="sage">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              What You&apos;ll Learn
            </h2>
            <div className="space-y-4 text-left">
              <ul className="space-y-4 ml-6">
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3 mt-1 shrink-0">&bull;</span>
                  <div>
                    <span className="font-semibold text-ink-900">How real productions actually work</span>
                    <p className="text-sm text-ink-600">What happens on set, who does what, how projects move from idea to finished product</p>
                  </div>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3 mt-1 shrink-0">&bull;</span>
                  <div>
                    <span className="font-semibold text-ink-900">How to make yourself useful on set</span>
                    <p className="text-sm text-ink-600">The habits, awareness, and attitude that separate someone who gets called back from someone who does not</p>
                  </div>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3 mt-1 shrink-0">&bull;</span>
                  <div>
                    <span className="font-semibold text-ink-900">Camera basics that matter in the real world</span>
                    <p className="text-sm text-ink-600">Frame rate, shutter speed, aperture, ISO, lenses, and composition — taught the way working professionals think about them</p>
                  </div>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3 mt-1 shrink-0">&bull;</span>
                  <div>
                    <span className="font-semibold text-ink-900">Simple multicam thinking</span>
                    <p className="text-sm text-ink-600">How to think about coverage instead of random shots, and how to plan angles that cut together</p>
                  </div>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3 mt-1 shrink-0">&bull;</span>
                  <div>
                    <span className="font-semibold text-ink-900">Basic lighting and audio mistakes to avoid</span>
                    <p className="text-sm text-ink-600">The common errors that ruin otherwise good footage and how to fix them fast</p>
                  </div>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3 mt-1 shrink-0">&bull;</span>
                  <div>
                    <span className="font-semibold text-ink-900">Documentary interview and B-roll fundamentals</span>
                    <p className="text-sm text-ink-600">How to find story in real people and real situations, capture interviews that connect, and shoot B-roll that actually supports the narrative</p>
                  </div>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3 mt-1 shrink-0">&bull;</span>
                  <div>
                    <span className="font-semibold text-ink-900">How to start creating with what you already have</span>
                    <p className="text-sm text-ink-600">You do not need expensive gear to make something worth watching — learn how to start projects now</p>
                  </div>
                </li>
                <li className="font-body text-lg text-ink-600 leading-relaxed flex items-start">
                  <span className="text-forest-600 mr-3 mt-1 shrink-0">&bull;</span>
                  <div>
                    <span className="font-semibold text-ink-900">How to take first steps toward paid work or personal projects</span>
                    <p className="text-sm text-ink-600">Practical advice on building a reel, finding opportunities, and growing from here</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Workshop Breakdown Section */}
      <Section spacing="xl" background="white">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              Workshop Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-sage-50 rounded-2xl p-6">
                <p className="font-heading text-sm font-semibold text-forest-700 uppercase tracking-wide mb-2">First 20 Minutes</p>
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-2">How Real Productions Work</h3>
                <p className="font-body text-base text-ink-600 leading-relaxed">
                  What actually happens on a real set, who does what, how people get hired, what different types of production look like, and where you can realistically start. No sugarcoating — just a clear picture of how the industry works.
                </p>
              </div>
              <div className="bg-sage-50 rounded-2xl p-6">
                <p className="font-heading text-sm font-semibold text-forest-700 uppercase tracking-wide mb-2">Next 45 Minutes</p>
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-2">Camera Basics, Coverage, and Common Mistakes</h3>
                <p className="font-body text-base text-ink-600 leading-relaxed">
                  Frame rate, shutter speed, aperture, ISO, lenses, composition, and simple multicam thinking — taught the way working professionals use them, not the way textbooks explain them. Enough time to actually understand these concepts, see how they connect, and learn the production mistakes that trip up beginners.
                </p>
              </div>
              <div className="bg-sage-50 rounded-2xl p-6">
                <p className="font-heading text-sm font-semibold text-forest-700 uppercase tracking-wide mb-2">Next 30 Minutes</p>
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-2">Documentary Fundamentals</h3>
                <p className="font-body text-base text-ink-600 leading-relaxed">
                  How to set up interviews that feel real, capture B-roll that supports the story, find emotional arc in everyday situations, and avoid common lighting and audio mistakes that ruin otherwise good footage.
                </p>
              </div>
              <div className="bg-sage-50 rounded-2xl p-6">
                <p className="font-heading text-sm font-semibold text-forest-700 uppercase tracking-wide mb-2">Final 25 Minutes</p>
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-2">Q&amp;A and Next Steps</h3>
                <p className="font-body text-base text-ink-600 leading-relaxed">
                  Open questions, direct answers, and a practical plan for how to keep building after the workshop — whether that means personal projects, paid work, building a reel, or figuring out your next move.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Get Behind Real Gear Section */}
      <Section spacing="xl" background="sage">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-4 text-center">
              Get Behind Real Gear
            </h2>
            <p className="font-body text-lg text-ink-600 leading-relaxed text-center mb-10 max-w-3xl mx-auto">
              You will not just hear about cameras — you will hold them, adjust settings, and see how they work in person. Production cameras used on real sets, the same gear working professionals use on TV, documentary, and commercial shoots. No need to bring your own equipment. Everything you need will be there.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/images/workshop-cinema-cameras.jpg"
                  alt="Sony cinema cameras on tripods at a live production event"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/images/workshop-canon-lens.jpg"
                  alt="Canon 5D Mark III with a 70-200mm L lens ready for production"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Who It's For Section */}
      <Section spacing="xl" background="cream">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              Who It&apos;s For
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start">
                <span className="text-forest-600 mr-3 mt-1">&bull;</span>
                <p className="font-body text-lg text-ink-600 leading-relaxed">Aspiring filmmakers who want to understand how the industry actually works</p>
              </div>
              <div className="flex items-start">
                <span className="text-forest-600 mr-3 mt-1">&bull;</span>
                <p className="font-body text-lg text-ink-600 leading-relaxed">Technical school students who want more real-world context alongside their coursework</p>
              </div>
              <div className="flex items-start">
                <span className="text-forest-600 mr-3 mt-1">&bull;</span>
                <p className="font-body text-lg text-ink-600 leading-relaxed">High school students interested in media, film, or video production</p>
              </div>
              <div className="flex items-start">
                <span className="text-forest-600 mr-3 mt-1">&bull;</span>
                <p className="font-body text-lg text-ink-600 leading-relaxed">Church media volunteers who want a stronger foundation in how productions are built</p>
              </div>
              <div className="flex items-start">
                <span className="text-forest-600 mr-3 mt-1">&bull;</span>
                <p className="font-body text-lg text-ink-600 leading-relaxed">Small business owners who want to create better video content for their brand</p>
              </div>
              <div className="flex items-start">
                <span className="text-forest-600 mr-3 mt-1">&bull;</span>
                <p className="font-body text-lg text-ink-600 leading-relaxed">Photographers moving into video who want to understand how motion production works</p>
              </div>
              <div className="flex items-start">
                <span className="text-forest-600 mr-3 mt-1">&bull;</span>
                <p className="font-body text-lg text-ink-600 leading-relaxed">YouTubers and content creators who want to level up beyond phone video</p>
              </div>
              <div className="flex items-start">
                <span className="text-forest-600 mr-3 mt-1">&bull;</span>
                <p className="font-body text-lg text-ink-600 leading-relaxed">Parents with creative kids who want to give them a real introduction to the craft</p>
              </div>
              <div className="flex items-start">
                <span className="text-forest-600 mr-3 mt-1">&bull;</span>
                <p className="font-body text-lg text-ink-600 leading-relaxed">Anyone in Jasper or the surrounding area who wants to learn how video production actually works</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Instructor Section */}
      <Section spacing="xl" background="sage">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-8 text-center">
              Your Instructor
            </h2>
            <div className="grid md:grid-cols-3 gap-8 items-start text-left">
              <div className="md:col-span-1">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/images/parker-stroop.jpg"
                    alt="Parker Stroop on set at Indianapolis Motor Speedway"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-6">
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                <span className="font-semibold text-ink-900">Parker Stroop</span> is a freelance Director of Photography and Camera Operator with nearly 10 years of experience across television, documentary, commercials, YouTube, marketing content, and narrative filmmaking.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                Parker started as a Production Assistant and worked his way up to Director of Photography. Along the way, he has worked with or on productions for National Geographic, History Channel, ABC, HGTV, Lifetime, Fox, and a wide range of commercial and independent projects. He has shot documentary series, reality and lifestyle shows, motorsports coverage, branded content, and faith-driven stories.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                His teaching is rooted in real production experience, not theory alone. Parker teaches the way he works — direct, practical, and focused on what actually matters when you are on set and the clock is running. You will learn the same fundamentals that working professionals rely on every day, delivered in a way that makes sense whether you have never picked up a camera or you have been creating for years and want a clearer foundation.
              </p>
              <p className="font-body text-lg text-ink-600 leading-relaxed">
                <a href="https://www.imdb.com/name/nm10358218/" target="_blank" rel="noopener noreferrer" className="font-semibold text-forest-700 underline underline-offset-2 hover:text-forest-900 transition-colors">Check out his work on IMDb &rarr;</a>
              </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Video Section */}
      <section className="w-full py-24 sm:py-32 lg:py-40 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/eR40vtIqn2M"
              title="Filmmaking in the Real World — Workshop Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0"
            ></iframe>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video mt-8">
            <iframe
              src="https://www.youtube-nocookie.com/embed/f7wXyUgmL1U"
              title="Filmmaking in the Real World"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-forest-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900"></div>
        <Container className="relative z-10" size="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-cream-50 mb-6">
              Ready to Get Started?
            </h2>
            <p className="font-body text-xl text-cream-200 leading-relaxed mb-10 max-w-2xl mx-auto">
              Seats are limited so everyone gets real attention. Reserve your spot or reach out with any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as="link" href="/register" size="lg" variant="primary">
                Reserve Your Seat
              </Button>
              <Button as="link" href="/contact" size="lg" variant="ghost">
                Ask a Question
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
