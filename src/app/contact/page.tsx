import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Born to Create Project',
  description: 'Contact Born to Create Project to ask questions about the retreat, curriculum, or registration.',
};

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-sage-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-ink-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-ink-600 max-w-2xl mx-auto leading-relaxed">
            Questions about the retreat, curriculum, or registration? Send a note and we will reply soon.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-sand-200 p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="bg-sand-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">
            Other Ways to Connect
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-200">
              <h3 className="font-semibold text-ink-900 mb-3">Have Questions?</h3>
              <p className="text-ink-600 mb-4">
                Check our frequently asked questions for quick answers about the retreat.
              </p>
              <a
                href="/faq"
                className="inline-flex items-center text-forest-700 hover:text-forest-800 font-semibold transition-colors"
              >
                View FAQ
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-200">
              <h3 className="font-semibold text-ink-900 mb-3">Ready to Join?</h3>
              <p className="text-ink-600 mb-4">
                Secure your spot for the Costa Rica filmmaking retreat experience.
              </p>
              <a
                href="/register"
                className="inline-flex items-center text-forest-700 hover:text-forest-800 font-semibold transition-colors"
              >
                Register Now
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}