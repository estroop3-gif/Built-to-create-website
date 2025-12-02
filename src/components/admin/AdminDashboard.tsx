'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Section from '../Section';

interface DashboardStats {
  totalUsers: number;
  totalEnrollments: number;
  totalRetreatAccess: number;
  recentActivity: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalEnrollments: 0,
    totalRetreatAccess: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      try {
        // Get user count
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Get enrollment count
        const { count: enrollmentCount } = await supabase
          .from('enrollments')
          .select('*', { count: 'exact', head: true });

        // Get retreat access count
        const { count: accessCount } = await supabase
          .from('retreat_access')
          .select('*', { count: 'exact', head: true });

        // Get recent audit activity
        const { data: recentActivity } = await supabase
          .from('audit_log')
          .select(`
            *,
            profiles!audit_log_actor_fkey(full_name, email)
          `)
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          totalUsers: userCount || 0,
          totalEnrollments: enrollmentCount || 0,
          totalRetreatAccess: accessCount || 0,
          recentActivity: recentActivity || []
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [supabase]);

  if (loading) {
    return (
      <Section spacing="xl" background="sage">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
          <p className="mt-4 font-body text-ink-600">Loading admin dashboard...</p>
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
            Admin Dashboard
          </h1>
          <p className="font-body text-xl text-ink-600">
            Manage users, enrollments, and retreat content
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-ink-600 text-sm">Total Users</p>
                <p className="font-heading text-3xl font-bold text-ink-900">{stats.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-ink-600 text-sm">Active Enrollments</p>
                <p className="font-heading text-3xl font-bold text-ink-900">{stats.totalEnrollments}</p>
              </div>
              <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-ink-600 text-sm">Retreat Access Grants</p>
                <p className="font-heading text-3xl font-bold text-ink-900">{stats.totalRetreatAccess}</p>
              </div>
              <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-soft p-8">
            <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <Link
                href="/admin/users"
                className="block bg-forest-50 rounded-lg p-4 hover:bg-forest-100 transition-colors"
              >
                <h3 className="font-heading text-lg font-bold text-ink-900 mb-2">
                  Manage Users
                </h3>
                <p className="font-body text-ink-600 text-sm">
                  View users, grant admin privileges, manage retreat access
                </p>
              </Link>

              <Link
                href="/admin/retreats"
                className="block bg-forest-50 rounded-lg p-4 hover:bg-forest-100 transition-colors"
              >
                <h3 className="font-heading text-lg font-bold text-ink-900 mb-2">
                  Manage Retreats
                </h3>
                <p className="font-body text-ink-600 text-sm">
                  Edit retreat content, manage access, update information
                </p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-8">
            <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {stats.recentActivity.length > 0 ? (
                stats.recentActivity.map((activity: any) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-sage-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-body text-sm text-ink-900">
                        <span className="font-medium">{activity.profiles?.full_name || 'Admin'}</span>
                        {' '}
                        <span className="text-ink-600">{activity.action.toLowerCase().replace('_', ' ')}</span>
                        {activity.target && (
                          <span className="text-ink-600"> for {activity.target}</span>
                        )}
                      </p>
                      <p className="font-body text-xs text-ink-500">
                        {new Date(activity.created_at).toLocaleDateString()} at{' '}
                        {new Date(activity.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-body text-ink-600 text-sm italic">No recent activity</p>
              )}
            </div>
          </div>
        </div>

        {/* Back to Account */}
        <div className="text-center">
          <Link
            href="/account"
            className="inline-flex items-center text-forest-600 hover:text-forest-700 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Account
          </Link>
        </div>
      </div>
    </Section>
  );
}