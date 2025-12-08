// src/components/RetreatRegistrationForm.tsx

'use client';

import { useState } from 'react';
import type { RegisterRetreatRequest, RegisterRetreatResponse } from '@/lib/types/retreatRegistration';

interface RetreatRegistrationFormProps {
  retreatId: string;
  retreatName: string;
  ticketTypes?: { value: string; label: string; price: number }[];
  source?: string;
}

const DEFAULT_TICKET_TYPES = [
  { value: 'early_bird', label: 'Early Bird', price: 3850 },
  { value: 'standard', label: 'Standard', price: 4000 },
  { value: 'late', label: 'Late Registration', price: 4250 },
];

export default function RetreatRegistrationForm({
  retreatId,
  retreatName,
  ticketTypes = DEFAULT_TICKET_TYPES,
  source,
}: RetreatRegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    churchName: '',
    role: '',
    ticketType: ticketTypes[0]?.value || '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const selectedTicket = ticketTypes.find((t) => t.value === formData.ticketType);
  const priceUsd = selectedTicket?.price || 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const payload: RegisterRetreatRequest = {
      retreatId,
      retreatName,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || undefined,
      churchName: formData.churchName || undefined,
      role: formData.role || undefined,
      ticketType: selectedTicket?.label || formData.ticketType,
      priceUsd,
      source,
    };

    try {
      const response = await fetch('/api/retreat/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result: RegisterRetreatResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Registration failed');
      }

      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        churchName: '',
        role: '',
        ticketType: ticketTypes[0]?.value || '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <svg
          className="w-12 h-12 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Registration Successful!</h3>
        <p className="text-green-700">
          Thank you for registering for {retreatName}. Check your email for confirmation details.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-green-600 underline hover:text-green-800"
        >
          Register another attendee
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-colors"
          placeholder="John Smith"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-colors"
          placeholder="john@church.org"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-colors"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="churchName" className="block text-sm font-medium text-gray-700 mb-1">
          Church Name
        </label>
        <input
          type="text"
          id="churchName"
          name="churchName"
          value={formData.churchName}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-colors"
          placeholder="First Community Church"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Role / Position
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-colors"
          placeholder="Media Director"
        />
      </div>

      <div>
        <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700 mb-1">
          Ticket Type <span className="text-red-500">*</span>
        </label>
        <select
          id="ticketType"
          name="ticketType"
          required
          value={formData.ticketType}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-colors"
        >
          {ticketTypes.map((ticket) => (
            <option key={ticket.value} value={ticket.value}>
              {ticket.label} - ${ticket.price.toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Total</span>
          <span className="text-xl font-bold text-gray-900">${priceUsd.toLocaleString()}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-green-700 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-800 focus:ring-4 focus:ring-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Registering...
          </span>
        ) : (
          'Complete Registration'
        )}
      </button>
    </form>
  );
}
