'use client';

import React, { useEffect, useState } from 'react';

export default function VisionWorkshopClient() {
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    // Analytics - track page view
    if (typeof window !== 'undefined' && (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
      (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag?.('event', 'learn_page_view', {
        page_path: '/vision'
      });
    }

    // Check if referrer includes gear-checklist to show back button
    if (typeof document !== 'undefined' && document.referrer.includes('/resources/gear-checklist')) {
      setShowBackButton(true);
    }
  }, []);

  const handleRegisterClick = () => {
    // Analytics - track CTA click
    if (typeof window !== 'undefined' && (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
      (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag?.('event', 'learn_cta_click', {
        page_path: '/vision',
        cta: 'register'
      });
    }

    // Build register URL with preserved UTMs + defaults
    const currentUrl = new URL(window.location.href);
    const utmParams = new URLSearchParams();
    
    // Add default UTM params
    utmParams.set('utm_source', 'email');
    utmParams.set('utm_medium', 'crm');
    utmParams.set('utm_campaign', 'retreat_seq');
    utmParams.set('utm_content', 'learn_vision');

    // Preserve existing UTMs from current URL (without duplication)
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(param => {
      const value = currentUrl.searchParams.get(param);
      if (value) {
        utmParams.set(param, value); // This will override defaults if present
      }
    });

    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://thebtcp.com' 
      : 'http://localhost:3000';
    
    const registerUrl = `${baseUrl}/register?${utmParams.toString()}`;
    window.location.href = registerUrl;
  };

  const handleBackClick = () => {
    if (typeof window !== 'undefined' && window.history) {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          
          {/* Title */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Our Vision for Creators
            </h1>
            
            {/* Intro */}
            <div className="text-lg text-gray-700 leading-relaxed mb-8">
              <p className="mb-4">
                Born to Create Project exists to form filmmakers and storytellers who carry presence and excellence into culture.
              </p>
              <p className="mb-4">
                We believe every creator is born to create and called to reflect the Creator.
              </p>
              <p>
                This workshop clarifies why your work matters, names the outcomes we pursue together, and gives you a simple framework to move your calling forward.
              </p>
            </div>
          </header>

          {/* Scripture */}
          <section className="mb-12">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <blockquote className="text-lg font-serif italic text-gray-800 mb-2">
                "Write the vision. Make it plain on tablets, so he may run who reads it."
              </blockquote>
              <cite className="text-sm text-gray-600">Habakkuk 2:2</cite>
            </div>
          </section>

          {/* Mission and values */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Mission and values</h2>
            <p className="text-gray-700 leading-relaxed">
              We create work with eternal weight. Presence over performance. Excellence as worship. Truth in storytelling. Called not competing. Community over clout. Spirit-led creativity.
            </p>
          </section>

          {/* Workshop outcomes */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Workshop outcomes</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>You will leave with a written one-sentence story statement.</p>
              <p>You will identify a three-beat arc you can film anywhere.</p>
              <p>You will choose one habit that grows your craft this month.</p>
            </div>
          </section>

          {/* Who this is for */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Who this is for</h2>
            <p className="text-gray-700 leading-relaxed">
              Filmmakers. Photographers. Editors. Producers. Anyone who senses a pull to create with purpose and wants a clear next step.
            </p>
          </section>

          {/* Core framework */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Core framework</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>Vision is what you are called to make.</p>
              <p>Formation is who you are becoming while you make it.</p>
              <p>Craft is how you make it well.</p>
              <p>Opportunity is where you faithfully release the work.</p>
            </div>
          </section>

          {/* Exercise one */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Exercise one</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>Write a one-sentence story statement. Use this format.</p>
              <p className="font-medium">
                I feel called to tell stories about [people or theme] in [place or context] so that [audience] encounters [change or truth].
              </p>
              <p>Read it aloud. If it is not clear and short, refine it.</p>
            </div>
          </section>

          {/* Exercise two */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Exercise two</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>Outline a three-beat arc for a two to three minute piece. Beginning. Middle. End.</p>
              <p>Write one action for each beat that you can film in a single afternoon.</p>
              <p>Name one transition idea between each beat.</p>
            </div>
          </section>

          {/* Exercise three */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Exercise three</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>Pick one craft habit for the next thirty days.</p>
              <p>Daily ten minutes of manual mode drills. Weekly one hour of editing practice with found footage. Weekly one short documentary vignette of a real person.</p>
              <p>Put it on your calendar now.</p>
            </div>
          </section>

          {/* Faith integration */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Faith integration</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>Vision is received in prayer and clarified in obedience.</p>
              <p>Take five minutes to be quiet before God. Ask this simple question. Lord what story are You asking me to carry right now.</p>
              <p>Write down what comes. Compare it to Scripture and wise counsel.</p>
            </div>
          </section>

          {/* Production notes for Costa Rica */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Production notes for Costa Rica</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>You will film daily in varied light and locations.</p>
              <p>Travel light. Stay flexible. Focus on people and process.</p>
              <p>Finish small pieces fully rather than starting big ones you cannot complete.</p>
            </div>
          </section>

          {/* Next steps */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Next steps</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>Choose your habit. Commit to your three-beat arc. Bring your sentence with you.</p>
              <p>We will build from there together.</p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">FAQ</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <div>
                <p className="font-medium">What if I am new.</p>
                <p>Clarity lives on the other side of action. Start small and ship something.</p>
              </div>
              <div>
                <p className="font-medium">What if I am advanced.</p>
                <p>Depth grows when you simplify. Practice mastery and mentor a peer.</p>
              </div>
              <div>
                <p className="font-medium">What if I am unsure about faith.</p>
                <p>You are welcome here. We will walk in honesty and respect.</p>
              </div>
            </div>
          </section>

          {/* Call to action */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Call to action</h2>
            <p className="text-gray-700 leading-relaxed">
              If this vision resonates and you want structured growth with a community that will walk with you, join us in Costa Rica.
            </p>
          </section>

          {/* Buttons */}
          <section className="mb-12">
            <div className="space-y-4">
              <button
                onClick={handleRegisterClick}
                className="w-full bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
              >
                Register for the Retreat
              </button>
              
              {showBackButton && (
                <button
                  onClick={handleBackClick}
                  className="w-full bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Back to Checklist
                </button>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}