import Section from './Section';

export default function LoyaltyDiscountSection() {
  return (
    <Section spacing="xl" background="sage">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-6">
          Loyal Creators Save
        </h2>
        <p className="font-body text-xl text-ink-600 leading-relaxed mb-8">
          Attended a Born to Create retreat before? You'll receive $500 off each additional retreat you book.
          We reward growth and commitment.
        </p>

        <div className="bg-white rounded-lg p-8 shadow-soft">
          <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="font-heading text-2xl font-bold text-ink-900 mb-2">
            $500 Off
          </h3>
          <p className="font-body text-lg text-ink-600">
            Each additional retreat after your first
          </p>
        </div>

        <p className="font-body text-sm text-ink-500 mt-6 italic">
          Returning-student discount applies per additional retreat. Cannot be combined with other offers.
        </p>
      </div>
    </Section>
  );
}