'use client';

import { useState } from 'react';
import Section from '../Section';
import Button from '../Button';

export default function CourseWaitlist() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          tags: ['online-course-waitlist'],
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');

        // Fire analytics event for course waitlist signup (production only)
        if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
          (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag('event', 'course_waitlist_signup', {
            event_category: 'engagement',
            event_label: 'online_course'
          });
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to join waitlist. Please try again.');
      }
    } catch {
      setError('Failed to join waitlist. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section spacing="xl" background="forest" id="waitlist">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-cream-50 mb-6">
          Join the Waitlist
        </h2>
        <p className="font-body text-xl text-cream-200 mb-12">
          Be the first to know when the Born to Create Project Online Course launches.
          Get exclusive early access and special pricing.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-cream-300 bg-cream-50 text-ink-900 placeholder-ink-500 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                size="md"
                variant="primary"
                disabled={isSubmitting}
                className="whitespace-nowrap"
              >
                {isSubmitting ? 'Joining...' : 'Notify Me'}
              </Button>
            </div>
            {error && (
              <p className="mt-3 text-sm text-red-300" role="alert">
                {error}
              </p>
            )}
          </form>
        ) : (
          <div className="bg-forest-800 rounded-lg p-6 border border-forest-600">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-cream-50 mb-2">
              You're on the list!
            </h3>
            <p className="font-body text-cream-200">
              We'll notify you as soon as the course is ready to launch.
            </p>
          </div>
        )}

        <p className="font-body text-sm text-cream-400 mt-8">
          Questions about the course? Contact us at{' '}
          <a
            href="mailto:parker@thebtcp.com"
            className="text-cream-200 hover:text-cream-100 underline transition-colors duration-200"
          >
            parker@thebtcp.com
          </a>
        </p>
      </div>
    </Section>
  );
}