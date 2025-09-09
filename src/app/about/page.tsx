export default function About() {
  return (
    <>
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sand to-cream"></div>
        <div className="absolute inset-0 nature-texture opacity-30"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Our Story</h1>
          <p className="text-xl text-charcoal/70">
            Born from a passion for authentic storytelling and creative expression
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-charcoal mb-4">Our Mission</h2>
              <p className="text-charcoal/70 mb-4">
                To empower creatives to discover and share their unique voice through the art of filmmaking and storytelling. We believe that everyone has a story worth telling, and our retreat provides the tools, guidance, and community to bring those stories to life.
              </p>
              <p className="text-charcoal/70">
                We create a sacred space where creativity meets purpose, where technical skills merge with personal growth, and where individual expression contributes to collective inspiration.
              </p>
            </div>
            <div className="h-96 bg-sage/20 rounded-2xl flex items-center justify-center">
              <span className="text-sage text-sm">Full-bleed photography placeholder</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sand/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 h-96 bg-forest/20 rounded-2xl flex items-center justify-center">
              <span className="text-forest text-sm">Full-bleed photography placeholder</span>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-charcoal mb-4">Our Vision</h2>
              <p className="text-charcoal/70 mb-4">
                We envision a world where creative expression is accessible to all, where stories bridge divides, and where filmmaking becomes a tool for personal transformation and social change.
              </p>
              <p className="text-charcoal/70">
                Through our retreats, we're building a global community of conscious creators who use their skills not just to entertain, but to inspire, educate, and elevate the human experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-charcoal mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Creativity</h3>
              <p className="text-charcoal/70 text-sm">
                Fostering innovative thinking and artistic expression in everything we do
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Authenticity</h3>
              <p className="text-charcoal/70 text-sm">
                Encouraging genuine self-expression and honest storytelling
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Community</h3>
              <p className="text-charcoal/70 text-sm">
                Building supportive networks that nurture growth and collaboration
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Purpose</h3>
              <p className="text-charcoal/70 text-sm">
                Connecting creativity with meaningful impact and personal calling
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-forest text-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">The Experience</h2>
          <div className="prose prose-lg mx-auto text-cream/90 text-center">
            <p className="mb-6">
              Nestled in nature, away from the distractions of daily life, our retreat offers a unique opportunity to reconnect with your creative spirit. Over five transformative days, you'll learn from industry professionals, collaborate with fellow creatives, and produce work that reflects your authentic voice.
            </p>
            <p>
              From sunrise meditation sessions to late-night editing workshops, every moment is designed to deepen your craft and expand your creative horizons. You'll leave not just with new skills, but with a renewed sense of purpose and a community that will support your journey long after the retreat ends.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}