import Section from './Section';

export default function WhatYoullMakeSection() {
  const outcomes = [
    'Solo short documentary',
    'Visual/narrative hybrid piece',
    'Cause-based community film',
    'Festival-ready short narrative'
  ];

  return (
    <Section spacing="xl" background="sage">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          What You'll Make
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
        {outcomes.map((outcome, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-soft text-center">
            <div className="w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="font-heading text-forest-700 font-bold text-lg">
                {(index + 1).toString().padStart(2, '0')}
              </span>
            </div>
            <p className="font-body text-ink-700 leading-relaxed font-medium">
              {outcome}
            </p>
          </div>
        ))}
      </div>

      <p className="font-body text-lg text-ink-600 text-center max-w-2xl mx-auto">
        You'll finish with a global portfolio that proves you can create anywhere.
      </p>
    </Section>
  );
}