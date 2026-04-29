'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UnifiedRegistration } from '@/lib/types/unifiedRegistration';

interface RetreatRegistrationsTabProps {
  slug: string;
}

export default function RetreatRegistrationsTab({ slug }: RetreatRegistrationsTabProps) {
  const [registrations, setRegistrations] = useState<UnifiedRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [exporting, setExporting] = useState(false);

  const fetchRegistrations = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      params.set('experienceId', slug);
      if (search) params.set('search', search);
      if (statusFilter) params.set('paymentStatus', statusFilter);

      const res = await fetch(`/api/admin/registrations?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  }, [slug, search, statusFilter]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleExportCsv = async () => {
    setExporting(true);
    try {
      const headers = ['Name', 'Email', 'Plan', 'Amount', 'Payment Status', 'Date'];
      const rows = registrations.map((r) => [
        `${r.first_name} ${r.last_name}`,
        r.email,
        r.plan_label || '',
        r.amount_paid ? `$${r.amount_paid}` : '',
        r.payment_status || '',
        new Date(r.created_at).toLocaleDateString(),
      ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','));

      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `registrations-${slug}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-forest-600"></div>
        <p className="mt-2 text-ink-500 text-sm">Loading registrations...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-xl font-bold text-ink-900">
          Registrations ({registrations.length})
        </h3>
        <button
          onClick={handleExportCsv}
          disabled={exporting || registrations.length === 0}
          className="bg-forest-600 text-cream-50 px-4 py-2 rounded-lg text-sm hover:bg-forest-700 transition-colors disabled:opacity-50"
        >
          {exporting ? 'Exporting...' : 'Export CSV'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-sage-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-200 focus:border-forest-400"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-sage-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-200 focus:border-forest-400"
        >
          <option value="">All Statuses</option>
          <option value="paid">Paid</option>
          <option value="paid_in_full">Paid in Full</option>
          <option value="deposit_paid">Deposit Paid</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {registrations.length === 0 ? (
        <p className="text-ink-500 italic">No registrations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sage-200">
                <th className="text-left py-3 px-2 font-medium text-ink-700">Name</th>
                <th className="text-left py-3 px-2 font-medium text-ink-700">Email</th>
                <th className="text-left py-3 px-2 font-medium text-ink-700">Plan/Ticket</th>
                <th className="text-left py-3 px-2 font-medium text-ink-700">Amount</th>
                <th className="text-left py-3 px-2 font-medium text-ink-700">Payment</th>
                <th className="text-left py-3 px-2 font-medium text-ink-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} className="border-b border-sage-100 hover:bg-sage-50">
                  <td className="py-3 px-2 text-ink-900">{r.first_name} {r.last_name}</td>
                  <td className="py-3 px-2 text-ink-600">{r.email}</td>
                  <td className="py-3 px-2 text-ink-600">{r.plan_label || '—'}</td>
                  <td className="py-3 px-2 text-ink-600">
                    {r.amount_paid ? `$${r.amount_paid.toLocaleString()}` : '—'}
                  </td>
                  <td className="py-3 px-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      r.payment_status === 'paid' || r.payment_status === 'paid_in_full'
                        ? 'bg-green-100 text-green-700'
                        : r.payment_status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {r.payment_status || 'unknown'}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-ink-500">
                    {new Date(r.created_at).toLocaleDateString()}
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
