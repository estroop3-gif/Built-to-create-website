'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { RetreatData } from '@/lib/retreats';
import Section from '../Section';

interface AdminRetreatDetailPageProps {
  retreat: RetreatData;
}

interface RetreatContent {
  id: string;
  section: string;
  title: string;
  body: string;
  order_index: number;
}

interface UserAccess {
  id: string;
  user_id: string;
  profiles?: {
    email: string;
    full_name: string;
  };
  granted_by: string;
  created_at: string;
}

const sectionOptions = [
  { value: 'itinerary', label: 'Itinerary' },
  { value: 'packing', label: 'Packing List' },
  { value: 'travel', label: 'Travel Information' },
  { value: 'flights', label: 'Flights & Arrival' },
  { value: 'lodging', label: 'Lodging Information' },
  { value: 'safety', label: 'Safety & Medical' },
  { value: 'visa', label: 'Visa & Entry Requirements' }
];

export default function AdminRetreatDetailPage({ retreat }: AdminRetreatDetailPageProps) {
  const [activeTab, setActiveTab] = useState('content');
  const [content, setContent] = useState<RetreatContent[]>([]);
  const [userAccess, setUserAccess] = useState<UserAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<RetreatContent | null>(null);
  const [newContent, setNewContent] = useState({
    section: 'itinerary',
    title: '',
    body: '',
    order_index: 0
  });

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retreat.slug]);

  async function fetchData() {
    try {
      // Fetch content
      const { data: contentData } = await supabase
        .from('retreat_content')
        .select('*')
        .eq('retreat_slug', retreat.slug)
        .order('section', { ascending: true })
        .order('order_index', { ascending: true });

      // Fetch user access
      const { data: accessData } = await supabase
        .from('retreat_access')
        .select(`
          *,
          profiles(email, full_name)
        `)
        .eq('retreat_slug', retreat.slug);

      setContent(contentData || []);
      setUserAccess(accessData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveContent() {
    try {
      const { error } = await supabase
        .from('retreat_content')
        .insert({
          retreat_slug: retreat.slug,
          ...newContent
        });

      if (error) throw error;

      // Log the action
      await supabase
        .from('audit_log')
        .insert({
          action: 'CONTENT_CREATE',
          target: `${retreat.slug}:${newContent.section}`,
          payload: { title: newContent.title }
        });

      setNewContent({
        section: 'itinerary',
        title: '',
        body: '',
        order_index: 0
      });

      fetchData();
    } catch (error) {
      console.error('Error saving content:', error);
    }
  }

  async function updateContent() {
    if (!editingContent) return;

    try {
      const { error } = await supabase
        .from('retreat_content')
        .update({
          title: editingContent.title,
          body: editingContent.body,
          order_index: editingContent.order_index
        })
        .eq('id', editingContent.id);

      if (error) throw error;

      // Log the action
      await supabase
        .from('audit_log')
        .insert({
          action: 'CONTENT_UPDATE',
          target: `${retreat.slug}:${editingContent.section}`,
          payload: { title: editingContent.title }
        });

      setEditingContent(null);
      fetchData();
    } catch (error) {
      console.error('Error updating content:', error);
    }
  }

  async function deleteContent(contentId: string) {
    try {
      const { error } = await supabase
        .from('retreat_content')
        .delete()
        .eq('id', contentId);

      if (error) throw error;

      // Log the action
      await supabase
        .from('audit_log')
        .insert({
          action: 'CONTENT_DELETE',
          target: `${retreat.slug}:content`,
          payload: { contentId }
        });

      fetchData();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  }

  async function revokeAccess(accessId: string, userEmail?: string) {
    try {
      const { error } = await supabase
        .from('retreat_access')
        .delete()
        .eq('id', accessId);

      if (error) throw error;

      // Log the action
      await supabase
        .from('audit_log')
        .insert({
          action: 'REVOKE_ACCESS',
          target: `${retreat.slug}:${userEmail || 'unknown'}`
        });

      fetchData();
    } catch (error) {
      console.error('Error revoking access:', error);
    }
  }

  const displayTitle = retreat.slug === 'london' ? 'United Kingdom' : retreat.country;

  if (loading) {
    return (
      <Section spacing="xl" background="sage">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
          <p className="mt-4 font-body text-ink-600">Loading retreat data...</p>
        </div>
      </Section>
    );
  }

  return (
    <Section spacing="xl" background="sage">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/admin/retreats"
            className="inline-flex items-center text-forest-600 hover:text-forest-700 font-medium mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Retreats
          </Link>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-ink-900 mb-4">
            {displayTitle} Retreat
          </h1>
          <p className="font-body text-xl text-ink-600">
            Manage content and user access for this retreat
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-soft mb-8">
          <div className="border-b border-sage-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('content')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'content'
                    ? 'text-forest-700 border-b-2 border-forest-600'
                    : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                Content Management
              </button>
              <button
                onClick={() => setActiveTab('access')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'access'
                    ? 'text-forest-700 border-b-2 border-forest-600'
                    : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                User Access
              </button>
            </div>
          </div>

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="p-6">
              <h3 className="font-heading text-xl font-bold text-ink-900 mb-6">
                Retreat Content
              </h3>

              {/* Add New Content Form */}
              <div className="bg-sage-50 rounded-lg p-6 mb-8">
                <h4 className="font-heading text-lg font-bold text-ink-900 mb-4">
                  Add New Content
                </h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-2">
                      Section
                    </label>
                    <select
                      value={newContent.section}
                      onChange={(e) => setNewContent({ ...newContent, section: e.target.value })}
                      className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400"
                    >
                      {sectionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-2">
                      Order Index
                    </label>
                    <input
                      type="number"
                      value={newContent.order_index}
                      onChange={(e) => setNewContent({ ...newContent, order_index: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-ink-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newContent.title}
                    onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-ink-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={newContent.body}
                    onChange={(e) => setNewContent({ ...newContent, body: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400"
                  />
                </div>
                <button
                  onClick={saveContent}
                  className="bg-forest-600 text-cream-50 px-4 py-2 rounded-lg hover:bg-forest-700 transition-colors"
                >
                  Add Content
                </button>
              </div>

              {/* Existing Content */}
              <div className="space-y-4">
                {sectionOptions.map((section) => {
                  const sectionContent = content.filter(c => c.section === section.value);

                  return (
                    <div key={section.value} className="border border-sage-200 rounded-lg">
                      <div className="bg-sage-50 px-4 py-3 border-b border-sage-200">
                        <h4 className="font-heading text-lg font-bold text-ink-900">
                          {section.label} ({sectionContent.length} items)
                        </h4>
                      </div>
                      <div className="p-4">
                        {sectionContent.length > 0 ? (
                          <div className="space-y-3">
                            {sectionContent.map((item) => (
                              <div key={item.id} className="bg-white p-4 rounded-lg border border-sage-100">
                                {editingContent?.id === item.id ? (
                                  <div className="space-y-3">
                                    <input
                                      type="text"
                                      value={editingContent.title}
                                      onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                                      className="w-full px-3 py-2 border border-sage-200 rounded-lg"
                                    />
                                    <textarea
                                      value={editingContent.body}
                                      onChange={(e) => setEditingContent({ ...editingContent, body: e.target.value })}
                                      rows={3}
                                      className="w-full px-3 py-2 border border-sage-200 rounded-lg"
                                    />
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={updateContent}
                                        className="bg-forest-600 text-cream-50 px-3 py-1 rounded text-sm hover:bg-forest-700"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => setEditingContent(null)}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <h5 className="font-heading text-base font-bold text-ink-900 mb-2">
                                          {item.title}
                                        </h5>
                                        <p className="font-body text-ink-600 text-sm whitespace-pre-wrap">
                                          {item.body.substring(0, 200)}
                                          {item.body.length > 200 && '...'}
                                        </p>
                                      </div>
                                      <div className="flex space-x-2 ml-4">
                                        <button
                                          onClick={() => setEditingContent(item)}
                                          className="text-forest-600 hover:text-forest-700 text-sm"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() => deleteContent(item.id)}
                                          className="text-red-600 hover:text-red-700 text-sm"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-ink-500 italic">No content added yet</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Access Tab */}
          {activeTab === 'access' && (
            <div className="p-6">
              <h3 className="font-heading text-xl font-bold text-ink-900 mb-6">
                User Access ({userAccess.length} users)
              </h3>

              <div className="space-y-3">
                {userAccess.map((access) => (
                  <div key={access.id} className="flex items-center justify-between p-4 bg-sage-50 rounded-lg">
                    <div>
                      <p className="font-body font-medium text-ink-900">
                        {access.profiles?.full_name || 'Unknown User'}
                      </p>
                      <p className="font-body text-sm text-ink-600">
                        {access.profiles?.email}
                      </p>
                      <p className="font-body text-xs text-ink-500">
                        Granted by {access.granted_by} on {new Date(access.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => revokeAccess(access.id, access.profiles?.email)}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors"
                    >
                      Revoke Access
                    </button>
                  </div>
                ))}

                {userAccess.length === 0 && (
                  <p className="text-ink-500 italic">No users have access to this retreat yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}