'use client';

import { useState, useEffect } from 'react';
import SubscribeForm from './SubscribeForm';

interface ExitIntentModalProps {
  pages?: string[]; // Pages where modal should appear
  cooldownDays?: number; // Days before showing again
}

export default function ExitIntentModal({ 
  pages = ['/', '/retreat'], 
  cooldownDays = 1 
}: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const currentPath = window.location.pathname;
    
    // Check if modal should appear on this page
    if (!pages.includes(currentPath)) return;

    // Check cooldown
    const lastShown = localStorage.getItem('btcp_modal_last_shown');
    if (lastShown) {
      const daysSinceShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSinceShown < cooldownDays) return;
    }

    // Check if user has already subscribed
    const hasSubscribed = localStorage.getItem('btcp_subscribed');
    if (hasSubscribed === 'true') return;

    let mouseLeaveTimer: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves through the top of the window
      if (e.clientY <= 0 && !hasTriggered) {
        setHasTriggered(true);
        
        // Small delay to avoid accidental triggers
        mouseLeaveTimer = setTimeout(() => {
          setIsVisible(true);
          
          // Track modal view for analytics
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'modal_view', {
              event_category: 'engagement',
              event_label: 'exit_intent'
            });
          }
          
          // Set last shown time
          localStorage.setItem('btcp_modal_last_shown', Date.now().toString());
        }, 100);
      }
    };

    // Add event listener after a delay to avoid immediate triggers
    const setupTimer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000); // Wait 3 seconds before enabling

    return () => {
      clearTimeout(setupTimer);
      clearTimeout(mouseLeaveTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pages, cooldownDays, hasTriggered]);

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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-md w-full relative shadow-2xl">
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
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🎬</div>
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-3">
              Wait! Don't miss your free gear checklist
            </h2>
            <p className="text-ink-600 leading-relaxed">
              Join hundreds of filmmakers getting weekly pro tips and get instant access to our essential gear checklist - perfect for travel filmmaking.
            </p>
          </div>

          <SubscribeForm
            variant="modal"
            buttonText="Get My Free Checklist"
            onSuccess={handleSuccess}
            showFirstName={true}
          />

          {/* Value propositions */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-ink-600">
              <svg className="w-4 h-4 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Master manual mode faster than a semester</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-600">
              <svg className="w-4 h-4 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Lens choices for travel storytelling</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-600">
              <svg className="w-4 h-4 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Light anything with a simple kit</span>
            </div>
          </div>

          <p className="text-xs text-ink-400 text-center mt-6">
            No spam, unsubscribe anytime. Join the community of creators who believe creativity is a calling.
          </p>
        </div>
      </div>
    </div>
  );
}