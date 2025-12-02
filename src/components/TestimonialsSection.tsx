import Section from './Section';

export default function TestimonialsSection() {
  return (
    <Section spacing="xl" background="white">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          Stories From Our Community
        </h2>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-sage-50 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-forest-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>
          <p className="font-body text-xl text-ink-700 leading-relaxed mb-6 italic">
            Coming soon: Hear from our community of faith-forward filmmakers about their transformative experiences
            creating films that carry eternal weight.
          </p>
          <p className="font-body text-sm text-ink-500">
            Testimonials will be featured here as our community grows.
          </p>
        </div>
      </div>
    </Section>
  );
}