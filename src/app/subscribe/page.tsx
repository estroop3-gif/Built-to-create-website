'use client';

import { useState } from 'react';
import Link from 'next/link';
import SubscribeForm from '@/components/SubscribeForm';

export default function SubscribePage() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSuccess = () => {
    setIsSubscribed(true);
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
      (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag?.('event', 'subscribe_success', {
        event_category: 'engagement',
        event_label: 'dedicated_page'
      });
    }
  };

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12 mb-8">
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-4xl font-heading font-bold text-ink-900 mb-6">
                Welcome to the Community!
              </h1>
              <p className="text-xl text-ink-600 mb-8 leading-relaxed">
                Thank you for joining Born to Create Project. Check your email for the phone-exposure mini workshop!
              </p>
              
              <div className="bg-sage-50 rounded-xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-ink-800 mb-4">What happens next?</h2>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-forest-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-ink-800">Instant Access:</strong>
                      <span className="text-ink-600"> Start with the phone-exposure mini workshop from the welcome email</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-forest-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-ink-800">Weekly Pro Tips:</strong>
                      <span className="text-ink-600"> Receive filmmaker education leading up to our Costa Rica retreat</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-forest-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="text-ink-800">Community Access:</strong>
                      <span className="text-ink-600"> Connect with other filmmakers and storytellers</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/register" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white font-semibold rounded-lg hover:bg-forest-700 transition-colors"
                >
                  Reserve Your Spot in Costa Rica
                </a>
                <Link 
                  href="/" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-ink-200 text-ink-700 font-semibold rounded-lg hover:border-ink-300 hover:bg-ink-50 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🎬🌿</div>
            <h1 className="text-5xl font-heading font-bold text-ink-900 mb-6">
              Learn filmmaking and create from presence
            </h1>
            <p className="text-xl text-ink-600 leading-relaxed mb-4">
              Get a phone-only mini workshop in your first email, then a full series of practical lessons paired with Scripture to grow your craft and your voice.
            </p>
          </div>

          {/* Main signup form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-bold text-ink-900 mb-2">
                Your first email delivers a real lesson
              </h3>
              <p className="text-lg text-ink-600 mb-4">
                Master phone exposure you can trust
              </p>
              <div className="space-y-2 text-left">
                <p className="text-ink-600">• AE AF Lock long press to lock focus and exposure</p>
                <p className="text-ink-600">• Exposure slider set faces with detail not shine</p>
                <p className="text-ink-600">• HDR when to keep highlights and when to turn it off</p>
                <p className="text-ink-600">• Three fast scenarios bright sun backlit window night street</p>
                <p className="text-ink-600">• A simple drill record three ten second clips and check skin detail</p>
              </div>
            </div>
            <SubscribeForm
              variant="inline"
              buttonText="Get the Phone Exposure Workshop"
              onSuccess={handleSuccess}
              showFirstName={true}
            />
            <p className="text-xs text-ink-500 text-center mt-4">
              We never sell your data. You can unsubscribe any time.
            </p>
          </div>

          {/* Lesson preview section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-4 text-center">
              What the email series covers next
            </h2>
            <p className="text-lg text-ink-600 text-center mb-8">
              Each lesson includes a short Scripture to center your process.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-forest-600 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-800">Manual camera made simple</p>
                    <p className="text-sm text-ink-600">Three exposure decisions that change everything</p>
                    <p className="text-xs text-ink-500 italic">Scripture Psalm 90 17</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-forest-600 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-800">Anatomy of a lens and how to operate it</p>
                    <p className="text-sm text-ink-600">Focal length focus aperture stabilization drills</p>
                    <p className="text-xs text-ink-500 italic">Scripture Proverbs 4 7</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-forest-600 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-800">Lighting that serves the story</p>
                    <p className="text-sm text-ink-600">Direction size distance contrast</p>
                    <p className="text-xs text-ink-500 italic">Scripture James 1 17</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-forest-600 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-800">Sound basics</p>
                    <p className="text-sm text-ink-600">Clean dialogue gain staging wind kit</p>
                    <p className="text-xs text-ink-500 italic">Scripture Proverbs 18 13</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-forest-600 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-800">Editing basics</p>
                    <p className="text-sm text-ink-600">From radio cut to rhythm</p>
                    <p className="text-xs text-ink-500 italic">Scripture 2 Timothy 1 7</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-forest-600 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-800">Color basics</p>
                    <p className="text-sm text-ink-600">Natural skin first then mood</p>
                    <p className="text-xs text-ink-500 italic">Scripture Isaiah 1 18</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-forest-600 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-800">Story building basics</p>
                    <p className="text-sm text-ink-600">Who wants what what stands in the way what changes</p>
                    <p className="text-xs text-ink-500 italic">Scripture Habakkuk 2 2</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-forest-600 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-800">Interviews that unlock truth</p>
                    <p className="text-sm text-ink-600">Question ladders silence second answers</p>
                    <p className="text-xs text-ink-500 italic">Scripture Proverbs 20 5</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-forest-600 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-800">Faith and creativity</p>
                    <p className="text-sm text-ink-600">Presence over pressure daily practice</p>
                    <p className="text-xs text-ink-500 italic">Scripture John 15 5</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-forest-600 mt-1">•</span>
                  <div>
                    <p className="font-semibold text-ink-800">Final action plan</p>
                    <p className="text-sm text-ink-600">One story to finish one date to commit</p>
                    <p className="text-xs text-ink-500 italic">Scripture Matthew 5 14 to 16</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Retreat CTA */}
          <div className="bg-forest-600 rounded-2xl text-white p-8 text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Ready to Take It Further?
            </h2>
            <p className="text-forest-100 text-lg mb-6">
              Join us in Costa Rica for an immersive filmmaking retreat that will transform your creative practice.
            </p>
            <div className="flex items-center justify-center gap-2 text-forest-200 mb-6">
              <span className="text-xl font-semibold">February 20–28, 2026</span>
              <span>•</span>
              <span className="text-xl font-semibold">Costa Rica</span>
            </div>
            <a 
              href="/register" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-forest-600 font-bold rounded-lg hover:bg-forest-50 transition-colors"
            >
              Reserve Your Spot
            </a>
          </div>

          {/* Trust indicators */}
          <div className="text-center mt-8">
            <p className="text-sm text-ink-400 mb-3">
              First email arrives with the phone-exposure mini workshop.
            </p>
            <p className="text-xs text-ink-400">
              Born to Create Project - where creativity meets calling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}