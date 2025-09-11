import { Metadata } from 'next';
import Container from '@/components/Container';

export const metadata: Metadata = {
  title: 'Privacy Policy - The Born to Create Project',
  description: 'Privacy policy for The Born to Create Project Christian filmmaking retreat in Costa Rica.',
  robots: 'noindex, nofollow'
};

export default function PrivacyPage() {
  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-sand nature-texture opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Privacy Policy</h1>
          <p className="text-xl text-charcoal/70">
            Your privacy and data protection for The Born to Create Project
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <Container size="lg">
          <div className="prose prose-lg prose-ink max-w-none">
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              
              <p className="text-sm text-ink-600 leading-relaxed mb-8">
                <strong>Last Updated:</strong> [Insert Date]
              </p>

              <p className="text-ink-700 mb-6 leading-relaxed">
                Born to Create Project ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us through this website, registration forms, and related services. This Privacy Policy explains what information we collect, how we use it, and the rights you have regarding your data.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">1. Information We Collect</h2>
              <ul className="list-disc list-inside text-ink-700 mb-6 ml-4 space-y-2">
                <li>Personal details (name, email address, phone number, billing address).</li>
                <li>Payment information (processed securely by our third-party payment providers such as Stripe or Square — we never store full card details).</li>
                <li>Travel or logistical information you voluntarily provide for retreat planning.</li>
                <li>Technical data (IP address, browser type, device information, site usage data).</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-ink-700 mb-6 ml-4 space-y-2">
                <li>Process registrations and payments.</li>
                <li>Communicate important updates, confirmations, or travel details.</li>
                <li>Provide customer support.</li>
                <li>Improve our retreats, programs, and website.</li>
                <li>Share future opportunities, if you opt in.</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">3. Sharing of Information</h2>
              <p className="text-ink-700 mb-4 leading-relaxed">
                We do not sell or rent your personal information. We may share information with trusted third parties only to:
              </p>
              <ul className="list-disc list-inside text-ink-700 mb-6 ml-4 space-y-2">
                <li>Process payments (e.g., Stripe, Square, PayPal).</li>
                <li>Manage email communications.</li>
                <li>Comply with legal obligations or enforce our Terms & Agreement.</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">4. Data Retention</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                We retain your information only as long as necessary to provide services, fulfill legal obligations, or resolve disputes.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">5. Your Rights</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                Depending on your location, you may have the right to access, update, or delete your personal information. To exercise these rights, contact us at <a href="mailto:parker@thebtcp.com" className="text-forest-700 hover:text-forest-800 underline">parker@thebtcp.com</a>.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">6. Security</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                We use reasonable administrative and technical safeguards to protect your personal data. However, no method of transmission over the Internet or method of storage is 100% secure.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">7. Third-Party Links</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                Our website may contain links to third-party sites. We are not responsible for their privacy practices.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">8. Updates to this Policy</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                We may update this Privacy Policy from time to time. The updated version will always be posted on this page with a revised "Last Updated" date.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">9. Contact Us</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                For questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-ink-700 mb-6 leading-relaxed">
                <a href="mailto:parker@thebtcp.com" className="text-forest-700 hover:text-forest-800 underline">parker@thebtcp.com</a>
              </p>

            </div>
          </div>
        </Container>
      </section>
    </>
  );
}