import { Metadata } from 'next';
import FAQItem from '@/components/FAQItem';
import { faqData } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'FAQ - Costa Rica Filmmaking Retreat | Built to Create Project',
  description: 'Frequently asked questions about the Costa Rica filmmaking retreat. Equipment, travel, pricing, and logistics information.',
};

export default function FAQPage() {
  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/20 to-moss/30 nature-texture opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-charcoal mb-6">FAQ</h1>
          <p className="text-xl text-charcoal/70">
            Common questions about your Costa Rica filmmaking adventure
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-cream rounded-2xl p-8 shadow-lg">
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="mt-12 text-center bg-sand/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Still Have Questions?</h2>
            <p className="text-charcoal/70 mb-6">
              We're here to help you prepare for your creative journey. Don't hesitate to reach out with any questions or concerns.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:parker@builttocreateproject.com" 
                className="bg-forest text-cream px-6 py-3 rounded-full hover:bg-moss transition-colors font-semibold"
              >
                Email Us
              </a>
              <a 
                href="tel:+15551234567" 
                className="bg-charcoal text-cream px-6 py-3 rounded-full hover:bg-charcoal/90 transition-colors font-semibold"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}