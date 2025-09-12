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
                Thank you for joining Born to Create Project. Check your email for your free filmmaker's gear checklist!
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
                      <span className="text-ink-600"> Download your free gear checklist from the welcome email</span>
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
              Join the Born to Create Project
            </h1>
            <p className="text-xl text-ink-600 leading-relaxed mb-4">
              Connect with a community of filmmakers and storytellers who believe creativity is a calling.
            </p>
            <p className="text-lg text-ink-600">
              Get your <strong>free filmmaker's gear checklist</strong> plus weekly pro tips leading up to our Costa Rica retreat.
            </p>
          </div>

          {/* Main signup form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <SubscribeForm
              variant="inline"
              buttonText="Get My Free Gear Checklist"
              onSuccess={handleSuccess}
              showFirstName={true}
            />
          </div>

          {/* Value propositions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6 text-center">
              What You'll Learn
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-800 mb-2">Master Manual Mode</h3>
                  <p className="text-ink-600">Learn camera settings faster than a semester-long course</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-800 mb-2">Smart Lens Choices</h3>
                  <p className="text-ink-600">Pick the perfect lens for travel storytelling every time</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-800 mb-2">Lighting Simplified</h3>
                  <p className="text-ink-600">Light anything beautifully with a simple, portable kit</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-800 mb-2">Story Structure</h3>
                  <p className="text-ink-600">Craft compelling narratives that connect with audiences</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-800 mb-2">Travel Filmmaking</h3>
                  <p className="text-ink-600">Capture authentic moments in stunning locations</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-800 mb-2">Post-Production</h3>
                  <p className="text-ink-600">Edit with rhythm, emotion, and professional polish</p>
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
              Free instant download • Weekly filmmaker tips • Unsubscribe anytime
            </p>
            <p className="text-xs text-ink-400">
              Join 1,000+ filmmakers who trust Born to Create Project for their creative education
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}