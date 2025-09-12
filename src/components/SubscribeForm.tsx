'use client';

import { useState, useEffect } from 'react';

interface SubscribeFormProps {
  variant?: 'inline' | 'footer' | 'modal';
  className?: string;
  showFirstName?: boolean;
  placeholder?: string;
  buttonText?: string;
  onSuccess?: () => void;
}

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}

export default function SubscribeForm({
  variant = 'inline',
  className = '',
  showFirstName = true,
  placeholder = 'Enter your email address',
  buttonText = 'Get Free Gear Checklist',
  onSuccess
}: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam field
  const [consent, setConsent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [utmParams, setUtmParams] = useState<UTMParams>({});

  // Capture UTM parameters on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const captured = {
        utm_source: searchParams.get('utm_source') || undefined,
        utm_medium: searchParams.get('utm_medium') || undefined,
        utm_campaign: searchParams.get('utm_campaign') || undefined,
        utm_content: searchParams.get('utm_content') || undefined,
      };
      
      // Also check localStorage for previously captured UTMs
      const stored = localStorage.getItem('btcp_utm_params');
      if (stored) {
        try {
          const storedParams = JSON.parse(stored);
          setUtmParams({ ...storedParams, ...captured });
        } catch {
          setUtmParams(captured);
        }
      } else {
        setUtmParams(captured);
      }
      
      // Store for future use
      if (Object.values(captured).some(v => v)) {
        localStorage.setItem('btcp_utm_params', JSON.stringify({ ...captured }));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (honeypot) {
      return; // Silently fail for bots
    }
    
    if (!email.trim()) {
      setMessage('Email is required');
      return;
    }

    if (!consent) {
      setMessage('Please agree to receive our emails');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          first_name: firstName.trim() || null,
          consent,
          ...utmParams,
          referrer: document.referrer,
          page_path: window.location.pathname,
          lead_source: `website_${variant}`
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setMessage(data.message || 'Thank you! Check your email for the gear checklist.');
        setEmail('');
        setFirstName('');
        
        // Analytics event
        if (typeof window !== 'undefined' && (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
          (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag?.('event', 'email_signup', {
            event_category: 'engagement',
            event_label: variant,
            value: 1
          });
        }
        
        // Track modal opens for analytics
        if (variant === 'modal' && typeof window !== 'undefined' && (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
          (window as { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag?.('event', 'modal_signup', {
            event_category: 'engagement',
            event_label: 'exit_intent'
          });
        }
        
        onSuccess?.();
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const baseInputClasses = "w-full px-4 py-3 border border-sand-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-colors";
  const buttonBaseClasses = "font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant-specific styling
  const getVariantClasses = () => {
    switch (variant) {
      case 'footer':
        return {
          container: 'bg-sand-50 rounded-xl p-6',
          button: `${buttonBaseClasses} bg-forest-700 hover:bg-forest-800 text-white px-6 py-3 w-full sm:w-auto`,
          layout: 'flex flex-col sm:flex-row gap-3'
        };
      case 'modal':
        return {
          container: 'bg-white',
          button: `${buttonBaseClasses} bg-forest-700 hover:bg-forest-800 text-white px-8 py-4 text-lg`,
          layout: 'space-y-4'
        };
      default: // inline
        return {
          container: 'bg-sage-50 rounded-xl p-6',
          button: `${buttonBaseClasses} bg-forest-700 hover:bg-forest-800 text-white px-6 py-3 w-full sm:w-auto`,
          layout: 'flex flex-col sm:flex-row gap-3'
        };
    }
  };

  const variantClasses = getVariantClasses();

  if (isSuccess) {
    return (
      <div className={`${variantClasses.container} ${className}`}>
        <div className="text-center">
          <div className="text-forest-700 font-semibold mb-2">🎉 You're in!</div>
          <p className="text-ink-600">{message}</p>
          {variant !== 'modal' && (
            <p className="text-sm text-ink-500 mt-2">
              Check your email for "The Filmmaker's Essential Gear Checklist"
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${variantClasses.container} ${className}`}>
      {variant === 'modal' && (
        <div className="text-center mb-6">
          <h3 className="text-2xl font-heading font-bold text-ink-900 mb-3">
            Get Your Free Filmmaker's Gear Checklist
          </h3>
          <p className="text-ink-600">
            Plus join 15 minutes a week of pro-level filmmaking training leading up to the retreat
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={variantClasses.layout}>
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />
        
        <div className="flex-1 space-y-3">
          {showFirstName && (
            <input
              type="text"
              placeholder="First name (optional)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={baseInputClasses}
            />
          )}
          
          <input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={baseInputClasses}
          />
          
          <label className="flex items-start gap-2 text-sm text-ink-600">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 rounded border-sand-300 text-forest-600 focus:ring-forest-500"
            />
            <span>
              I agree to receive emails about filmmaking tips and the Born to Create Project retreat. 
              You can unsubscribe at any time.
            </span>
          </label>
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className={variantClasses.button}
          >
            {isLoading ? 'Subscribing...' : buttonText}
          </button>
          
          {variant !== 'modal' && (
            <p className="text-xs text-ink-500 text-center">
              Free download • No spam • Unsubscribe anytime
            </p>
          )}
        </div>
      </form>
      
      {message && !isSuccess && (
        <div className="mt-3 text-red-600 text-sm text-center">
          {message}
        </div>
      )}
    </div>
  );
}