import Section from '../Section';

const pillars = [
  {
    title: 'Presence over Performance',
    description: 'Authentic storytelling that prioritizes genuine connection over polished facade.'
  },
  {
    title: 'Eternal Impact',
    description: 'Creating content with lasting significance that touches hearts and transforms lives.'
  },
  {
    title: 'Spirit-Led Creativity',
    description: 'Partnering with God in the creative process, allowing His inspiration to guide our work.'
  },
  {
    title: 'Excellence as Worship',
    description: 'Honoring God through excellence in craft, treating our creative gifts as acts of worship.'
  }
];

export default function CoursePillars() {
  return (
    <Section spacing="xl" background="cream">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          Our Brand Pillars
        </h2>
        <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
          Core principles that guide every aspect of our filmmaking education and community.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {pillars.map((pillar, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-3 h-3 bg-forest-600 rounded-full"></div>
            </div>
            <h3 className="font-heading text-xl font-bold text-ink-900 mb-3">
              {pillar.title}
            </h3>
            <p className="font-body text-ink-600 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}