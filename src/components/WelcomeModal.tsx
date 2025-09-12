'use client';

import { useState, useEffect } from 'react';
import SubscribeForm from './SubscribeForm';

export default function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if user has already seen the welcome modal
    const hasSeenWelcome = localStorage.getItem('btcp_welcome_shown');
    const hasSubscribed = localStorage.getItem('btcp_subscribed');

    // Don't show if they've already seen it or subscribed
    if (hasSeenWelcome === 'true' || hasSubscribed === 'true') return;

    // Show modal after a short delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem('btcp_welcome_shown', 'true');
      
      // Track modal view for analytics
      if (typeof window !== 'undefined' && (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
        (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag?.('event', 'modal_view', {
          event_category: 'engagement',
          event_label: 'welcome_modal'
        });
      }
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(showTimer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSuccess = () => {
    localStorage.setItem('btcp_subscribed', 'true');
    setIsVisible(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-lg w-full relative shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-ink-400 hover:text-ink-600 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8 pt-12">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🎬🌿</div>
            <h2 className="text-3xl font-heading font-bold text-ink-900 mb-3">
              Welcome to Born to Create Project
            </h2>
            <p className="text-lg text-ink-600 leading-relaxed mb-4">
              Join our community of filmmakers and storytellers who believe creativity is a calling.
            </p>
            <p className="text-ink-600">
              Get your <strong>free filmmaker's gear checklist</strong> plus weekly pro tips leading up to our Costa Rica retreat.
            </p>
          </div>

          <SubscribeForm
            variant="modal"
            buttonText="Get My Free Gear Checklist"
            onSuccess={handleSuccess}
            showFirstName={true}
          />

          {/* Value propositions */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-3 text-sm text-ink-600">
              <svg className="w-5 h-5 text-forest-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Master manual mode faster than a semester</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-ink-600">
              <svg className="w-5 h-5 text-forest-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Lens choices for travel storytelling</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-ink-600">
              <svg className="w-5 h-5 text-forest-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Light anything with a simple kit</span>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-ink-400 mb-3">
              Free instant download • Weekly filmmaker tips • Unsubscribe anytime
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-ink-400">
              <span>February 20–28, 2026</span>
              <span>•</span>
              <span>Costa Rica</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}