'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Section from '../Section';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  created_at: string;
  enrollment_count: number;
  retreat_count: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showGrantModal, setShowGrantModal] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data } = await supabase
        .from('profiles')
        .select(`
          *,
          enrollments(count),
          retreat_access(count)
        `)
        .order('created_at', { ascending: false });

      if (data) {
        const usersWithCounts = data.map((user: UserProfile & { enrollments?: unknown[]; retreat_access?: unknown[] }) => ({
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          is_admin: user.is_admin,
          created_at: user.created_at,
          enrollment_count: user.enrollments?.length || 0,
          retreat_count: user.retreat_access?.length || 0
        }));
        setUsers(usersWithCounts);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleAdminStatus(userId: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      // Log the action
      await supabase
        .from('audit_log')
        .insert({
          action: currentStatus ? 'DEMOTE_ADMIN' : 'PROMOTE_ADMIN',
          target: userId
        });

      fetchUsers();
    } catch (error) {
      console.error('Error toggling admin status:', error);
    }
  }

  async function grantRetreatAccess(userId: string, retreatSlug: string) {
    try {
      const { error } = await supabase
        .from('retreat_access')
        .insert({
          user_id: userId,
          retreat_slug: retreatSlug,
          granted_by: 'admin'
        });

      if (error) throw error;

      // Log the action
      await supabase
        .from('audit_log')
        .insert({
          action: 'GRANT_ACCESS',
          target: `${userId}:${retreatSlug}`
        });

      setShowGrantModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Error granting access:', error);
    }
  }

  const retreatOptions = [
    { slug: 'costa-rica', name: 'Costa Rica' },
    { slug: 'greece', name: 'Greece' },
    { slug: 'africa', name: 'Africa' },
    { slug: 'japan', name: 'Japan' },
    { slug: 'panama', name: 'Panama' },
    { slug: 'london', name: 'United Kingdom' },
    { slug: 'germany', name: 'Germany' },
    { slug: 'thailand', name: 'Thailand' }
  ];

  if (loading) {
    return (
      <Section spacing="xl" background="sage">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
          <p className="mt-4 font-body text-ink-600">Loading users...</p>
        </div>
      </Section>
    );
  }

  return (
    <Section spacing="xl" background="sage">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center text-forest-600 hover:text-forest-700 font-medium mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Admin Dashboard
            </Link>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-4">
              User Management
            </h1>
            <p className="font-body text-xl text-ink-600">
              Manage user accounts, admin privileges, and retreat access
            </p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sage-50">
                <tr>
                  <th className="px-6 py-4 text-left font-heading text-sm font-bold text-ink-900">Email</th>
                  <th className="px-6 py-4 text-left font-heading text-sm font-bold text-ink-900">Name</th>
                  <th className="px-6 py-4 text-left font-heading text-sm font-bold text-ink-900">Admin</th>
                  <th className="px-6 py-4 text-left font-heading text-sm font-bold text-ink-900">Enrollments</th>
                  <th className="px-6 py-4 text-left font-heading text-sm font-bold text-ink-900">Retreats</th>
                  <th className="px-6 py-4 text-left font-heading text-sm font-bold text-ink-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-sage-100">
                    <td className="px-6 py-4 font-body text-ink-900">{user.email}</td>
                    <td className="px-6 py-4 font-body text-ink-700">{user.full_name || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        user.is_admin
                          ? 'bg-forest-100 text-forest-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.is_admin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body text-ink-700">{user.enrollment_count}</td>
                    <td className="px-6 py-4 font-body text-ink-700">{user.retreat_count}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleAdminStatus(user.id, user.is_admin)}
                          className="text-xs bg-forest-100 text-forest-700 px-3 py-1 rounded hover:bg-forest-200 transition-colors"
                        >
                          {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowGrantModal(true);
                          }}
                          className="text-xs bg-sage-100 text-ink-700 px-3 py-1 rounded hover:bg-sage-200 transition-colors"
                        >
                          Grant Access
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grant Access Modal */}
        {showGrantModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="font-heading text-xl font-bold text-ink-900 mb-4">
                Grant Retreat Access
              </h3>
              <p className="font-body text-ink-600 mb-6">
                Grant access to {selectedUser.email} for:
              </p>

              <div className="space-y-3 mb-6">
                {retreatOptions.map((retreat) => (
                  <button
                    key={retreat.slug}
                    onClick={() => grantRetreatAccess(selectedUser.id, retreat.slug)}
                    className="w-full text-left p-3 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors"
                  >
                    <span className="font-body text-ink-900">{retreat.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowGrantModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}