'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import Section from '../Section';

interface AccountDashboardProps {
  user: User;
}

interface Enrollment {
  id: string;
  program: string;
  active: boolean;
  created_at: string;
}

interface RetreatAccess {
  id: string;
  retreat_slug: string;
  granted_by: string;
  created_at: string;
}

interface UserProfile {
  is_admin: boolean;
}

const retreatNames: Record<string, string> = {
  'costa-rica': 'Costa Rica',
  'greece': 'Greece',
  'africa': 'Africa',
  'japan': 'Japan',
  'panama': 'Panama',
  'london': 'United Kingdom',
  'germany': 'Germany',
  'thailand': 'Thailand'
};

export default function AccountDashboard({ user }: AccountDashboardProps) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [retreatAccess, setRetreatAccess] = useState<RetreatAccess[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Fetch user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        // Fetch enrollments
        const { data: enrollmentData } = await supabase
          .from('enrollments')
          .select('*')
          .eq('user_id', user.id);

        // Fetch retreat access
        const { data: accessData } = await supabase
          .from('retreat_access')
          .select('*')
          .eq('user_id', user.id);

        setUserProfile(profileData);
        setEnrollments(enrollmentData || []);
        setRetreatAccess(accessData || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user.id, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <Section spacing="xl" background="sage">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
          <p className="mt-4 font-body text-ink-600">Loading your dashboard...</p>
        </div>
      </Section>
    );
  }

  return (
    <Section spacing="xl" background="sage">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-4">
            Your Dashboard
          </h1>
          <p className="font-body text-xl text-ink-600">
            Welcome back, {user.user_metadata?.full_name || user.email}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Your Programs */}
          <div className="bg-white rounded-lg shadow-soft p-8">
            <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6">
              Your Programs
            </h2>

            {enrollments.length > 0 ? (
              <div className="space-y-4">
                {enrollments.map((enrollment) => (
                  <div key={enrollment.id} className="bg-sage-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-ink-900">
                          {enrollment.program === 'year1' ? '1-Year Program' : '2-Year Mastery Program'}
                        </h3>
                        <p className="font-body text-ink-600">
                          {enrollment.active ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        enrollment.active
                          ? 'bg-forest-100 text-forest-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {enrollment.active ? 'Enrolled' : 'Inactive'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="font-body text-ink-600 mb-4">
                  You're not enrolled in any programs yet.
                </p>
                <Link
                  href="/course"
                  className="inline-block bg-forest-600 text-cream-50 px-6 py-3 rounded-lg font-medium hover:bg-forest-700 transition-colors"
                >
                  Explore Programs
                </Link>
              </div>
            )}
          </div>

          {/* Your Retreat Access */}
          <div className="bg-white rounded-lg shadow-soft p-8">
            <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6">
              Your Retreat Access
            </h2>

            {retreatAccess.length > 0 ? (
              <div className="space-y-4">
                {retreatAccess.map((access) => (
                  <div key={access.id} className="bg-sage-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-ink-900">
                          {retreatNames[access.retreat_slug] || access.retreat_slug}
                        </h3>
                        <p className="font-body text-ink-600 text-sm">
                          Access granted via {access.granted_by}
                        </p>
                      </div>
                      <Link
                        href={`/account/retreats/${access.retreat_slug}`}
                        className="bg-forest-600 text-cream-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest-700 transition-colors"
                      >
                        Manage
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="font-body text-ink-600 mb-4">
                  You don't have access to any retreats yet.
                </p>
                <Link
                  href="/pricing"
                  className="inline-block bg-forest-600 text-cream-50 px-6 py-3 rounded-lg font-medium hover:bg-forest-700 transition-colors"
                >
                  View Retreats
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-soft p-8">
          <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {userProfile?.is_admin && (
              <Link
                href="/admin"
                className="bg-forest-50 rounded-lg p-4 hover:bg-forest-100 transition-colors border-2 border-forest-200"
              >
                <h3 className="font-heading text-lg font-bold text-forest-700 mb-2">
                  Admin Panel
                </h3>
                <p className="font-body text-forest-600 text-sm">
                  Manage users, retreats, and content
                </p>
              </Link>
            )}

            <Link
              href="/account/billing"
              className="bg-sage-50 rounded-lg p-4 hover:bg-sage-100 transition-colors"
            >
              <h3 className="font-heading text-lg font-bold text-ink-900 mb-2">
                Billing
              </h3>
              <p className="font-body text-ink-600 text-sm">
                View invoices and payment history
              </p>
            </Link>

            <Link
              href="/account/settings"
              className="bg-sage-50 rounded-lg p-4 hover:bg-sage-100 transition-colors"
            >
              <h3 className="font-heading text-lg font-bold text-ink-900 mb-2">
                Settings
              </h3>
              <p className="font-body text-ink-600 text-sm">
                Update profile and preferences
              </p>
            </Link>

            <button
              onClick={handleSignOut}
              className="bg-red-50 rounded-lg p-4 hover:bg-red-100 transition-colors text-left"
            >
              <h3 className="font-heading text-lg font-bold text-red-700 mb-2">
                Sign Out
              </h3>
              <p className="font-body text-red-600 text-sm">
                Sign out of your account
              </p>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}