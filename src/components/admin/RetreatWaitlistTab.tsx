'use client';

import { useState, useEffect, useCallback } from 'react';
import type { WaitlistEntry } from '@/lib/types/waitlist';

interface RetreatWaitlistTabProps {
  experienceId: string;
  slug: string;
}

export default function RetreatWaitlistTab({ experienceId, slug }: RetreatWaitlistTabProps) {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifying, setNotifying] = useState<Set<string>>(new Set());
  const [bulkNotifying, setBulkNotifying] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [composeSubject, setComposeSubject] = useState('');
  const [composeMessage, setComposeMessage] = useState('');
  const [sendToAll, setSendToAll] = useState(true);
  const [sendingUpdate, setSendingUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/experiences/${experienceId}/waitlist`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching waitlist:', error);
    } finally {
      setLoading(false);
    }
  }, [experienceId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const unnotifiedCount = entries.filter((e) => !e.notified).length;

  const handleNotify = async (entryId: string) => {
    setNotifying((prev) => new Set(prev).add(entryId));
    try {
      const res = await fetch(
        `/api/admin/experiences/${experienceId}/waitlist/notify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entryIds: [entryId] }),
        }
      );
      if (!res.ok) throw new Error('Failed to notify');
      await fetchEntries();
    } catch (error) {
      console.error('Error notifying entry:', error);
    } finally {
      setNotifying((prev) => {
        const next = new Set(prev);
        next.delete(entryId);
        return next;
      });
    }
  };

  const handleNotifyAll = async () => {
    setBulkNotifying(true);
    try {
      const res = await fetch(
        `/api/admin/experiences/${experienceId}/waitlist/notify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ all: true }),
        }
      );
      if (!res.ok) throw new Error('Failed to notify all');
      await fetchEntries();
    } catch (error) {
      console.error('Error notifying all:', error);
    } finally {
      setBulkNotifying(false);
    }
  };

  const handleRemove = async (entryId: string) => {
    if (!confirm('Remove this person from the waitlist?')) return;
    try {
      const res = await fetch(
        `/api/admin/experiences/${experienceId}/waitlist`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entryId }),
        }
      );
      if (!res.ok) throw new Error('Failed to remove');
      await fetchEntries();
    } catch (error) {
      console.error('Error removing entry:', error);
    }
  };

  const handleSendUpdate = async () => {
    if (!composeSubject.trim() || !composeMessage.trim()) return;
    setSendingUpdate(true);
    try {
      const res = await fetch(
        `/api/admin/experiences/${experienceId}/waitlist/update-email`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: composeSubject,
            message: composeMessage,
            sendToAll,
          }),
        }
      );
      if (!res.ok) throw new Error('Failed to send');
      const data = await res.json();
      setShowCompose(false);
      setComposeSubject('');
      setComposeMessage('');
      setUpdateMessage(`Update sent to ${data.sent} ${data.sent === 1 ? 'person' : 'people'}`);
      setTimeout(() => setUpdateMessage(''), 4000);
    } catch (error) {
      console.error('Error sending update:', error);
      setUpdateMessage('Failed to send update');
      setTimeout(() => setUpdateMessage(''), 4000);
    } finally {
      setSendingUpdate(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-forest-600"></div>
        <p className="mt-2 text-ink-500 text-sm">Loading waitlist...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Update sent message */}
      {updateMessage && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${updateMessage.includes('Failed') ? 'bg-red-50 border border-red-200 text-red-800' : 'bg-green-50 border border-green-200 text-green-800'}`}>
          {updateMessage}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-xl font-bold text-ink-900">
          Waitlist ({entries.length})
          {unnotifiedCount > 0 && (
            <span className="ml-2 inline-block bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {unnotifiedCount} un-notified
            </span>
          )}
        </h3>
        <div className="flex gap-2">
          {entries.length > 0 && (
            <button
              onClick={() => setShowCompose(!showCompose)}
              className="bg-white text-forest-700 border border-forest-300 px-4 py-2 rounded-lg text-sm hover:bg-forest-50 transition-colors"
            >
              Send Update
            </button>
          )}
          {unnotifiedCount > 0 && (
            <button
              onClick={handleNotifyAll}
              disabled={bulkNotifying}
              className="bg-forest-600 text-cream-50 px-4 py-2 rounded-lg text-sm hover:bg-forest-700 transition-colors disabled:opacity-50"
            >
              {bulkNotifying ? 'Notifying...' : `Notify All Un-notified (${unnotifiedCount})`}
            </button>
          )}
        </div>
      </div>

      {/* Compose update email */}
      {showCompose && (
        <div className="bg-sage-50 border border-sage-200 rounded-lg p-4 mb-6">
          <h4 className="font-heading text-sm font-bold text-ink-800 mb-3 uppercase tracking-wide">
            Send Custom Update to Waitlist
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1">Subject</label>
              <input
                type="text"
                value={composeSubject}
                onChange={(e) => setComposeSubject(e.target.value)}
                placeholder="e.g. New dates added for..."
                className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-200 focus:border-forest-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1">Message</label>
              <textarea
                value={composeMessage}
                onChange={(e) => setComposeMessage(e.target.value)}
                placeholder="Write your update message..."
                rows={4}
                className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-200 focus:border-forest-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sendToAll"
                checked={sendToAll}
                onChange={(e) => setSendToAll(e.target.checked)}
                className="rounded border-sage-300 text-forest-600 focus:ring-forest-200"
              />
              <label htmlFor="sendToAll" className="text-sm text-ink-700">
                Send to all waitlist entries (including already notified)
              </label>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleSendUpdate}
                disabled={sendingUpdate || !composeSubject.trim() || !composeMessage.trim()}
                className="bg-forest-600 text-cream-50 px-4 py-2 rounded-lg text-sm hover:bg-forest-700 disabled:opacity-50"
              >
                {sendingUpdate ? 'Sending...' : `Send to ${sendToAll ? entries.length : unnotifiedCount} ${(sendToAll ? entries.length : unnotifiedCount) === 1 ? 'person' : 'people'}`}
              </button>
              <button
                onClick={() => { setShowCompose(false); setComposeSubject(''); setComposeMessage(''); }}
                className="bg-white text-ink-700 px-4 py-2 rounded-lg text-sm border border-sage-200 hover:bg-sage-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {entries.length === 0 ? (
        <p className="text-ink-500 italic">No one on the waitlist yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sage-200">
                <th className="text-left py-3 px-2 font-medium text-ink-700">Name</th>
                <th className="text-left py-3 px-2 font-medium text-ink-700">Email</th>
                <th className="text-left py-3 px-2 font-medium text-ink-700">Phone</th>
                <th className="text-left py-3 px-2 font-medium text-ink-700">Signed Up</th>
                <th className="text-left py-3 px-2 font-medium text-ink-700">Notified</th>
                <th className="text-right py-3 px-2 font-medium text-ink-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-sage-100 hover:bg-sage-50">
                  <td className="py-3 px-2 text-ink-900">{entry.full_name}</td>
                  <td className="py-3 px-2 text-ink-600">{entry.email}</td>
                  <td className="py-3 px-2 text-ink-600">{entry.phone || '—'}</td>
                  <td className="py-3 px-2 text-ink-500">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2">
                    {entry.notified ? (
                      <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
                        Yes
                        {entry.notified_at && (
                          <span className="ml-1 text-green-600">
                            ({new Date(entry.notified_at).toLocaleDateString()})
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded">
                        No
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-right space-x-2">
                    {!entry.notified && (
                      <button
                        onClick={() => handleNotify(entry.id)}
                        disabled={notifying.has(entry.id)}
                        className="text-forest-600 hover:text-forest-700 text-sm disabled:opacity-50"
                      >
                        {notifying.has(entry.id) ? 'Sending...' : 'Notify'}
                      </button>
                    )}
                    <button
                      onClick={() => handleRemove(entry.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
