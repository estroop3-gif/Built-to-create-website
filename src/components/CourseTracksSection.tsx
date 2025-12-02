import Section from './Section';
import Button from './Button';

export default function CourseTracksSection() {
  return (
    <Section spacing="xl" background="cream">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          Online Course Programs
        </h2>
        <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
          Learn filmmaking from the ground up with a faith-forward curriculum. The course unlocks the retreats
          and prepares you to create anywhere.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* 1-Year Program */}
        <div className="bg-white rounded-lg p-8 shadow-soft">
          <div className="text-center mb-6">
            <h3 className="font-heading text-2xl font-bold text-ink-900 mb-2">
              1-Year Program
            </h3>
            <div className="text-3xl font-bold text-forest-600 mb-2">
              $35,000
            </div>
            <div className="text-lg text-ink-600">
              or $2,995 per month for 12 months
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span className="font-body text-ink-700">Video curriculum, mentorship, assignments, feedback</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span className="font-body text-ink-700">Private community, retreat preparation</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span className="font-body text-ink-700">Includes one-on-one mentorship session</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span className="font-body text-ink-700"><strong>Outcome:</strong> proficient solo filmmaker, retreat-ready</span>
            </div>
          </div>

          <Button as="link" href="/course" size="md" variant="primary" className="w-full justify-center">
            Learn More
          </Button>
        </div>

        {/* 2-Year Mastery Program */}
        <div className="bg-white rounded-lg p-8 shadow-soft border-2 border-forest-200">
          <div className="text-center mb-6">
            <div className="inline-block bg-forest-100 text-forest-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
              Most Popular
            </div>
            <h3 className="font-heading text-2xl font-bold text-ink-900 mb-2">
              2-Year Mastery Program
            </h3>
            <div className="text-3xl font-bold text-forest-600 mb-2">
              Year 1 $35,000 <span className="text-base text-ink-500">or $2,995/mo</span>
            </div>
            <div className="text-3xl font-bold text-forest-600 mb-4">
              Year 2 $32,000 <span className="text-base text-ink-500">or $2,795/mo</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span className="font-body text-ink-700">All 1-Year benefits + advanced workshops</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span className="font-body text-ink-700">Festival-ready post workflow, deeper discipleship</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span className="font-body text-ink-700">Includes one-on-one mentorship session each year</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-forest-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span className="font-body text-ink-700"><strong>Outcome:</strong> specialization and mastery with deeper discipleship</span>
            </div>
          </div>

          <Button as="link" href="/course" size="md" variant="primary" className="w-full justify-center">
            Learn More
          </Button>
        </div>
      </div>
    </Section>
  );
}