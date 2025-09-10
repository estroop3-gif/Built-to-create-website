import { Metadata } from 'next';
import Container from '@/components/Container';

export const metadata: Metadata = {
  title: 'Terms & Agreement - The Born to Create Project',
  description: 'Terms and conditions for The Born to Create Project Christian filmmaking retreat in Costa Rica.',
  robots: 'noindex, nofollow'
};

export default function TermsPage() {
  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-sand nature-texture opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">Terms & Agreement</h1>
          <p className="text-xl text-charcoal/70">
            Terms and conditions for The Born to Create Project retreat participation
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <Container size="lg">
          <div className="prose prose-lg prose-ink max-w-none">
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              
              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">1. Agreement to Terms</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                By registering for and participating in The Born to Create Project retreat ("the Retreat"), you agree to be bound by these Terms & Agreement. If you do not agree to these terms, you may not participate in the Retreat.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">2. Retreat Description and Dates</h2>
              <p className="text-ink-700 mb-4 leading-relaxed">
                The Born to Create Project is a 9-day Christian filmmaking and storytelling retreat taking place February 20-28, 2026, in Costa Rica. The retreat includes:
              </p>
              <ul className="list-disc list-inside text-ink-700 mb-6 ml-4 space-y-2">
                <li>Professional filmmaking instruction and mentorship</li>
                <li>All meals as specified in the itinerary</li>
                <li>Accommodations at specified hotels</li>
                <li>Ground transportation within Costa Rica</li>
                <li>Professional equipment kit (value $2,800+) to keep</li>
                <li>Spiritual and creative development activities</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">3. Registration & Payment Terms</h2>
              <p className="text-ink-700 mb-4 leading-relaxed">
                Registration requires a non-refundable $1,800 deposit to secure a spot. The remaining balance must be paid in full no later than December 31, 2025. After December 31, 2025, deposits will no longer be accepted; the full amount will be due at the time of purchase.
              </p>
              <p className="text-ink-700 mb-6 leading-relaxed">
                Flexible payment plans are available upon request. Please contact us directly to arrange.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">4. Pricing Tiers</h2>
              <p className="text-ink-700 mb-4 leading-relaxed">
                The following pricing tiers are currently active:
              </p>
              <ul className="list-disc list-inside text-ink-700 mb-6 ml-4 space-y-2">
                <li><strong>Early Bird:</strong> January 1, 2025 – October 31, 2025 → $4,790 (save $1,160)</li>
                <li><strong>Standard:</strong> November 1, 2025 – December 31, 2025 → $5,490 (regular pricing)</li>
                <li><strong>Late Registration:</strong> January 1, 2026 – February 20, 2026 → $5,950 (last-minute registration)</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">5. Refund & Cancellation Policy</h2>
              <p className="text-ink-700 mb-4 leading-relaxed">
                All deposits are non-refundable. Cancellations after full payment has been made are non-refundable unless otherwise stated in writing.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">6. Travel and Health Requirements</h2>
              <p className="text-ink-700 mb-4 leading-relaxed">
                Participants are responsible for:
              </p>
              <ul className="list-disc list-inside text-ink-700 mb-6 ml-4 space-y-2">
                <li>Valid passport with 6+ months remaining validity</li>
                <li>Travel insurance (recommended)</li>
                <li>Any required vaccinations or health documentation</li>
                <li>International airfare to/from San José, Costa Rica (SJO)</li>
                <li>Disclosure of any medical conditions that may affect participation</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">7. Code of Conduct</h2>
              <p className="text-ink-700 mb-4 leading-relaxed">
                The Born to Create Project maintains Christian values. Participants agree to:
              </p>
              <ul className="list-disc list-inside text-ink-700 mb-6 ml-4 space-y-2">
                <li>Treat all participants, instructors, and staff with respect and kindness</li>
                <li>Refrain from behavior that disrupts the learning environment</li>
                <li>Abstain from illegal drug use and excessive alcohol consumption</li>
                <li>Respect local customs and laws in Costa Rica</li>
                <li>Participate fully in scheduled activities unless excused for health reasons</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">8. Equipment and Materials</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                Each participant receives a professional equipment kit valued at $2,800+ to keep. This equipment becomes the participant's property upon completion of the retreat. Participants who leave early forfeit their right to the equipment.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">9. Photography and Video Release</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                By participating, you grant The Born to Create Project permission to photograph and video record your participation for promotional purposes. You waive any rights to compensation for such use and agree that all materials created become property of The Born to Create Project.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">10. Limitation of Liability</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                The Born to Create Project, its organizers, and partners are not liable for injuries, illness, loss of property, or other damages that may occur during the retreat. Participants assume all risks associated with international travel and retreat activities. Travel insurance is strongly recommended.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">11. Force Majeure</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                If the retreat must be cancelled or significantly modified due to circumstances beyond our control (including but not limited to natural disasters, political instability, pandemic restrictions, or acts of God), The Born to Create Project will work to reschedule or provide alternative arrangements but cannot guarantee full refunds.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">12. Intellectual Property</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                Participants retain rights to their own creative works produced during the retreat. However, The Born to Create Project retains rights to use participant works for promotional and educational purposes. All curriculum, teaching materials, and proprietary methods remain property of The Born to Create Project.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">13. Dispute Resolution</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                Any disputes arising from these terms or retreat participation shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in [Your State/City].
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">14. Changes to Terms</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                The Born to Create Project reserves the right to modify these terms with 30 days written notice to registered participants. Continued participation after notice constitutes acceptance of modified terms.
              </p>

              <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">15. Contact Information</h2>
              <p className="text-ink-700 mb-6 leading-relaxed">
                Questions regarding these terms should be directed to: <a href="mailto:parker@thebtcp.com" className="text-forest-700 hover:text-forest-800 underline">parker@thebtcp.com</a>
              </p>

              <hr className="my-8 border-sand-300" />

              <p className="text-sm text-ink-600 leading-relaxed">
                <strong>Last Updated:</strong> [Date]<br />
                <strong>Effective Date:</strong> [Date]<br />
                By registering for The Born to Create Project retreat, you acknowledge that you have read, understood, and agree to be bound by these Terms & Agreement.
              </p>

            </div>
          </div>
        </Container>
      </section>
    </>
  );
}