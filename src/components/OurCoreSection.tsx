import Section from './Section';

export default function OurCoreSection() {
  const pillars = [
    'Presence Over Performance',
    'Eternal Impact',
    'Spirit-Led Creativity',
    'Excellence As Worship'
  ];

  return (
    <Section spacing="xl" background="cream">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          Our Core
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {pillars.map((pillar, index) => (
          <div key={index} className="text-center">
            <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-4 h-4 bg-forest-600 rounded-full"></div>
            </div>
            <h3 className="font-heading text-lg font-bold text-ink-900 leading-tight">
              {pillar}
            </h3>
          </div>
        ))}
      </div>
    </Section>
  );
}