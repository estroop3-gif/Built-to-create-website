'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface LearnLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  currentSlug?: string;
  userEmail?: string;
}

const navigationItems = [
  { slug: 'vision', title: 'Our Vision & Mission', path: '/vision' },
  { slug: 'manual-mode', title: 'Manual Mode Mastery', path: '/learn/manual-mode' },
  { slug: 'lenses', title: 'Lens Selection Guide', path: '/learn/lenses' },
  { slug: 'exposure', title: 'Perfect Exposure', path: '/learn/exposure' },
  { slug: 'composition', title: 'Cinematic Composition', path: '/learn/composition' },
  { slug: 'editing', title: 'Post-Production Flow', path: '/learn/editing' },
  { slug: 'lighting', title: 'Natural Light Mastery', path: '/learn/lighting' }
];

export default function LearnLayout({ 
  children, 
  title, 
  subtitle, 
  currentSlug,
  userEmail 
}: LearnLayoutProps) {
  const searchParams = useSearchParams();
  const token = searchParams?.get('t');

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
      (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag?.('event', 'learn_page_view', {
        event_category: 'engagement',
        event_label: currentSlug || 'unknown',
        page_title: title
      });
    }
  }, [currentSlug, title]);

  const handleCTAClick = (action: string) => {
    // Track CTA click
    if (typeof window !== 'undefined' && (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
      (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag?.('event', 'learn_cta_click', {
        event_category: 'engagement',
        event_label: action,
        page_slug: currentSlug
      });
    }

    // Preserve UTM parameters in CTA links
    const currentUrl = new URL(window.location.href);
    const utmParams = new URLSearchParams();
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(param => {
      const value = currentUrl.searchParams.get(param);
      if (value) utmParams.set(param, value);
    });

    const targetUrl = `/register${utmParams.toString() ? `?${utmParams.toString()}` : ''}`;
    window.location.href = targetUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold text-ink-900 mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-ink-600 leading-relaxed mb-4">
                {subtitle}
              </p>
            )}
            {userEmail && (
              <p className="text-sm text-forest-600">
                Personalized for: {userEmail}
              </p>
            )}
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-lg font-heading font-bold text-ink-900 mb-4">
                  Learning Path
                </h2>
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <a
                      key={item.slug}
                      href={`${item.path}?t=${token}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentSlug === item.slug
                          ? 'bg-forest-100 text-forest-700 font-semibold'
                          : 'text-ink-600 hover:bg-sage-50 hover:text-ink-900'
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>

                {/* Progress Indicator */}
                <div className="mt-6 pt-6 border-t border-sage-200">
                  <div className="text-xs text-ink-500 mb-2">Progress</div>
                  <div className="w-full bg-sage-100 rounded-full h-2">
                    <div 
                      className="bg-forest-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${((navigationItems.findIndex(item => item.slug === currentSlug) + 1) / navigationItems.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-ink-500 mt-1">
                    {navigationItems.findIndex(item => item.slug === currentSlug) + 1} of {navigationItems.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {children}

                {/* CTA Section */}
                <div className="bg-forest-600 rounded-2xl text-white p-8 mt-12">
                  <h3 className="text-2xl font-heading font-bold mb-4 text-center">
                    Ready to Put This Into Practice?
                  </h3>
                  <p className="text-forest-100 text-lg mb-6 text-center">
                    Join us in Costa Rica for 9 days of intensive filmmaking with professional mentorship.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-forest-200 mb-6">
                    <span className="text-xl font-semibold">February 20–28, 2026</span>
                    <span>•</span>
                    <span className="text-xl font-semibold">Costa Rica</span>
                  </div>
                  <div className="text-center">
                    <button 
                      onClick={() => handleCTAClick('register')}
                      className="inline-flex items-center justify-center px-8 py-4 bg-white text-forest-600 font-bold rounded-lg hover:bg-forest-50 transition-colors"
                    >
                      Reserve Your Spot in Costa Rica
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}