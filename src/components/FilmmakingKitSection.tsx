import Section from './Section';

export default function FilmmakingKitSection() {
  const kitItems = [
    'Camera body, lens, audio, portable light, support, essentials',
    'Optimized for travel, doc and small narrative crews',
    'Yours to keep after the retreat'
  ];

  return (
    <Section spacing="xl" background="white">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          Your First Retreat Includes A Filmmaking Kit
        </h2>
        <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
          When you register for your first Born to Create retreat, you receive a filmmaker's starter kit
          designed for solo production. It's the gear you need to complete every assignment with excellence.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="grid gap-6 mb-8">
          {kitItems.map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <div className="w-2 h-2 bg-cream-50 rounded-full"></div>
              </div>
              <p className="font-body text-lg text-ink-700 leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>

        <p className="font-body text-sm text-ink-500 text-center italic">
          Kit value: $2,800. Included on your first retreat only.
        </p>
      </div>
    </Section>
  );
}