'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Section from '../Section';

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  source: string;
  status: string;
  created_at: string;
  unsubscribed_at: string | null;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [totalSubscribed, setTotalSubscribed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'subscribed' | 'unsubscribed'>('all');
  const [notifyForm, setNotifyForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: '',
    ctaUrl: '',
    ctaText: 'Learn More',
  });
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? `?status=${filter}` : '';
      const res = await fetch(`/api/admin/subscribers${params}`);
      const data = await res.json();
      setSubscribers(data.subscribers || []);
      setTotalSubscribed(data.totalSubscribed || 0);
    } catch (err) {
      console.error('Error fetching subscribers:', err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyForm.title || !notifyForm.description) return;

    setSending(true);
    setSendResult(null);

    try {
      const res = await fetch('/api/admin/subscribers/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifyForm),
      });
      const data = await res.json();
      setSendResult(data.message || 'Sent!');
    } catch {
      setSendResult('Failed to send notifications');
    } finally {
      setSending(false);
    }
  };

  const sourceLabel = (source: string) => {
    switch (source) {
      case 'contact_form': return 'Contact Form';
      case 'registration': return 'Registration';
      case 'waitlist': return 'Waitlist';
      case 'manual': return 'Manual';
      default: return source;
    }
  };

  const sourceBadgeColor = (source: string) => {
    switch (source) {
      case 'contact_form': return 'bg-blue-100 text-blue-800';
      case 'registration': return 'bg-green-100 text-green-800';
      case 'waitlist': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Section spacing="xl" background="sage">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-4xl font-bold text-ink-900 mb-2">
              Email Subscribers
            </h1>
            <p className="font-body text-ink-600">
              {totalSubscribed} active subscriber{totalSubscribed !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/admin"
            className="text-forest-600 hover:text-forest-700 font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'subscribed', 'unsubscribed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === f
                  ? 'bg-forest-700 text-white'
                  : 'bg-white text-ink-600 hover:bg-forest-50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Subscribers Table */}
        <div className="bg-white rounded-lg shadow-soft overflow-hidden mb-12">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
            </div>
          ) : subscribers.length === 0 ? (
            <div className="p-8 text-center text-ink-500">No subscribers found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-sage-50 border-b border-sage-200">
                    <th className="text-left px-6 py-3 text-sm font-semibold text-ink-700">Email</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-ink-700">Name</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-ink-700">Phone</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-ink-700">Source</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-ink-700">Status</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-ink-700">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="border-b border-sage-100 hover:bg-sage-50/50">
                      <td className="px-6 py-4 text-sm text-ink-900 font-medium">{sub.email}</td>
                      <td className="px-6 py-4 text-sm text-ink-600">{sub.name || '—'}</td>
                      <td className="px-6 py-4 text-sm text-ink-600">{sub.phone || '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${sourceBadgeColor(sub.source)}`}>
                          {sourceLabel(sub.source)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          sub.status === 'subscribed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-ink-500">
                        {new Date(sub.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Send Notification Form */}
        <div className="bg-white rounded-lg shadow-soft p-8">
          <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6">
            Send Notification to All Subscribers
          </h2>
          <p className="font-body text-ink-600 mb-6 text-sm">
            Use this to notify subscribers about new workshops, retreats, or experiences.
          </p>

          <form onSubmit={handleNotify} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-ink-900 mb-1">Title *</label>
                <input
                  type="text"
                  value={notifyForm.title}
                  onChange={(e) => setNotifyForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
                  placeholder="e.g. Filmmaking in the Real World — Canton, GA"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-900 mb-1">Date</label>
                <input
                  type="text"
                  value={notifyForm.date}
                  onChange={(e) => setNotifyForm(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
                  placeholder="e.g. May 23, 2026 · 2:00 – 4:00 PM"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-900 mb-1">Description *</label>
              <textarea
                value={notifyForm.description}
                onChange={(e) => setNotifyForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
                rows={3}
                placeholder="Brief description of the experience..."
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-ink-900 mb-1">Location</label>
                <input
                  type="text"
                  value={notifyForm.location}
                  onChange={(e) => setNotifyForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
                  placeholder="e.g. Canton, GA"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-900 mb-1">Price</label>
                <input
                  type="text"
                  value={notifyForm.price}
                  onChange={(e) => setNotifyForm(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
                  placeholder="e.g. $50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-900 mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={notifyForm.ctaText}
                  onChange={(e) => setNotifyForm(prev => ({ ...prev, ctaText: e.target.value }))}
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
                  placeholder="e.g. Register Now"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-900 mb-1">CTA Link URL</label>
              <input
                type="url"
                value={notifyForm.ctaUrl}
                onChange={(e) => setNotifyForm(prev => ({ ...prev, ctaUrl: e.target.value }))}
                className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
                placeholder="e.g. https://www.thebtcp.com/experiences/filmmaking-canton"
              />
            </div>

            {sendResult && (
              <div className={`p-4 rounded-lg ${sendResult.includes('Failed') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
                {sendResult}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="bg-forest-700 hover:bg-forest-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {sending ? 'Sending...' : `Send to ${totalSubscribed} Subscriber${totalSubscribed !== 1 ? 's' : ''}`}
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}
