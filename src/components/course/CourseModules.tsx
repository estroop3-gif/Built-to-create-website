import Section from '../Section';

const modules = [
  {
    number: '01',
    title: 'Foundations',
    description: 'Camera basics, exposure, composition, and essential filmmaking fundamentals.'
  },
  {
    number: '02',
    title: 'Story & Visual Language',
    description: 'Narrative structure, visual storytelling, and cinematic communication techniques.'
  },
  {
    number: '03',
    title: 'Missional Filmmaking',
    description: 'Faith integration, cultural sensitivity, and ministry-focused content creation.'
  },
  {
    number: '04',
    title: 'Narrative Excellence',
    description: 'Advanced storytelling, directing principles, and professional production methods.'
  }
];

export default function CourseModules() {
  return (
    <Section spacing="xl" background="sage" id="modules">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          Four Comprehensive Modules
        </h2>
        <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
          Progressive learning path that builds from basic camera operation to professional filmmaking.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {modules.map((module, index) => (
          <div key={index} className="bg-white rounded-lg p-8 shadow-soft">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-forest-600 rounded-lg flex items-center justify-center">
                  <span className="font-heading text-cream-50 font-bold text-lg">
                    {module.number}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-2xl font-bold text-ink-900 mb-3">
                  {module.title}
                </h3>
                <p className="font-body text-ink-600 leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}