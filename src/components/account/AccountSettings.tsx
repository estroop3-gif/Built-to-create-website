'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import Section from '../Section';

interface AccountSettingsProps {
  user: User;
}

export default function AccountSettings({ user }: AccountSettingsProps) {
  const [fullName, setFullName] = useState(user.user_metadata?.full_name || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const supabase = createClient();

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
        },
      });

      if (error) throw error;

      setMessage('Profile updated successfully!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <Section spacing="xl" background="sage">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/account"
            className="inline-flex items-center text-forest-600 hover:text-forest-700 font-medium mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-4">
            Account Settings
          </h1>
          <p className="font-body text-xl text-ink-600">
            Manage your profile and preferences
          </p>
        </div>

        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-soft p-8 mb-8">
          <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6">
            Profile Information
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-green-600 text-sm">{message}</p>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={user.email || ''}
                disabled
                className="w-full px-4 py-3 border border-sage-200 rounded-lg bg-sage-50 text-ink-500"
              />
              <p className="text-sm text-ink-500 mt-1">
                Email cannot be changed. Contact support if you need to update your email.
              </p>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-ink-700 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400 transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-forest-600 text-cream-50 py-3 px-4 rounded-lg font-medium hover:bg-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-lg shadow-soft p-8">
          <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6">
            Account Actions
          </h2>

          <div className="space-y-4">
            <div className="border border-red-200 rounded-lg p-4">
              <h3 className="font-heading text-lg font-bold text-red-700 mb-2">
                Sign Out
              </h3>
              <p className="font-body text-ink-600 text-sm mb-4">
                Sign out of your account on this device.
              </p>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}