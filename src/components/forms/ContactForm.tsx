'use client';

import { useState } from 'react';
import Link from 'next/link';
import { contactSchema, type ContactFormData } from '@/lib/validation/contact';

interface ContactFormProps {
  className?: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
    hidden_honeypot: '',
    math_answer: 0
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const baseInputClasses = "w-full px-4 py-3 border border-sand-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-colors";
  const errorInputClasses = "w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors";
  const buttonBaseClasses = "font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const validateField = (name: string, value: string | number | boolean) => {
    try {
      const fieldSchema = contactSchema.shape[name as keyof typeof contactSchema.shape];
      if (fieldSchema) {
        fieldSchema.parse(value);
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        const zodError = error as { errors: Array<{ message: string }> };
        if (zodError.errors?.[0]?.message) {
          setErrors(prev => ({ ...prev, [name]: zodError.errors[0].message }));
        }
      }
    }
  };

  const handleInputChange = (name: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');

    // Validate entire form
    const validationResult = contactSchema.safeParse(formData);

    if (!validationResult.success) {
      const newErrors: FormErrors = {};
      validationResult.error.issues.forEach(issue => {
        if (issue.path[0]) {
          newErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);

        // Analytics tracking
        if (typeof window !== 'undefined' && (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
          (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag('event', 'contact_submit', {
            event_category: 'engagement',
            status: 'success'
          });
        }
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.');

        // Analytics tracking
        if (typeof window !== 'undefined' && (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
          (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag('event', 'contact_submit', {
            event_category: 'engagement',
            status: 'error'
          });
        }
      }
    } catch {
      setSubmitError('Network error. Please try again.');

      // Analytics tracking
      if (typeof window !== 'undefined' && (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
        (window as Window & { gtag?: (event: string, action: string, params?: Record<string, unknown>) => void }).gtag('event', 'contact_submit', {
          event_category: 'engagement',
          status: 'error'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false,
      hidden_honeypot: '',
      math_answer: 0
    });
    setErrors({});
    setSubmitError('');
  };

  const messageLength = formData.message.length;
  const maxLength = 2000;

  if (isSuccess) {
    return (
      <div className={`bg-forest-50 border border-forest-200 rounded-xl p-8 text-center ${className}`}>
        <div className="text-forest-700 text-2xl font-heading font-bold mb-4">
          Message sent
        </div>
        <p className="text-ink-600 mb-6">
          Thanks for reaching out! We will reply as soon as possible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-forest-700 hover:bg-forest-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            Back to Home
          </Link>
          <Link
            href="/register"
            className="border border-forest-700 text-forest-700 hover:bg-forest-50 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            Registration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white ${className}`}>
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" role="alert">
          <div className="text-red-800 font-semibold mb-2">Something went wrong</div>
          <p className="text-red-700">
            {submitError.includes('email parker@thebtcp.com')
              ? submitError
              : `${submitError}. If the issue continues, email parker@thebtcp.com`
            }
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field */}
        <input
          type="text"
          name="company"
          value={formData.hidden_honeypot}
          onChange={(e) => handleInputChange('hidden_honeypot', e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-ink-900 mb-2">
              Full name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={() => validateField('name', formData.name)}
              className={errors.name ? errorInputClasses : baseInputClasses}
              required
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-ink-900 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => validateField('email', formData.email)}
              className={errors.email ? errorInputClasses : baseInputClasses}
              required
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-ink-900 mb-2">
            Phone <span className="text-ink-500 font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={baseInputClasses}
            aria-describedby="phone-help"
          />
          <p id="phone-help" className="mt-1 text-sm text-ink-500">
            Optional
          </p>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-ink-900 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            onBlur={() => validateField('subject', formData.subject)}
            className={errors.subject ? errorInputClasses : baseInputClasses}
            required
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-ink-900 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            onBlur={() => validateField('message', formData.message)}
            className={errors.message ? errorInputClasses : baseInputClasses}
            required
            aria-describedby={errors.message ? "message-error" : "message-help"}
          />
          <div className="mt-2 flex justify-between items-center">
            <div>
              {errors.message && (
                <p id="message-error" className="text-sm text-red-600" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
            <p
              id="message-help"
              className={`text-sm ${messageLength > maxLength ? 'text-red-600' : 'text-ink-500'}`}
            >
              {messageLength}/{maxLength}
            </p>
          </div>
        </div>

        {/* Math Question */}
        <div>
          <label htmlFor="math" className="block text-sm font-semibold text-ink-900 mb-2">
            What is 2 plus 3? *
          </label>
          <input
            type="number"
            id="math"
            name="math"
            value={formData.math_answer || ''}
            onChange={(e) => handleInputChange('math_answer', parseInt(e.target.value) || 0)}
            onBlur={() => validateField('math_answer', formData.math_answer)}
            className={errors.math_answer ? errorInputClasses : baseInputClasses}
            required
            aria-describedby={errors.math_answer ? "math-error" : undefined}
          />
          {errors.math_answer && (
            <p id="math-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.math_answer}
            </p>
          )}
        </div>

        {/* Consent */}
        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => handleInputChange('consent', e.target.checked)}
              onBlur={() => validateField('consent', formData.consent)}
              className="mt-1 rounded border-sand-300 text-forest-600 focus:ring-forest-500"
              required
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span className="text-sm text-ink-700">
              I agree to be contacted about my inquiry *
            </span>
          </label>
          {errors.consent && (
            <p id="consent-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.consent}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`${buttonBaseClasses} bg-forest-700 hover:bg-forest-800 text-white px-8 py-3 flex-1 sm:flex-initial`}
          >
            {isLoading ? 'Sending...' : 'Send message'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className={`${buttonBaseClasses} border border-sand-300 text-ink-700 hover:bg-sand-50 px-6 py-3`}
          >
            Reset
          </button>
        </div>
      </form>

      {/* Live region for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {Object.keys(errors).length > 0 && "Form has errors that need to be corrected"}
        {isLoading && "Submitting form"}
        {isSuccess && "Message sent successfully"}
      </div>
    </div>
  );
}