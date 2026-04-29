'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UnifiedRegistration } from '@/lib/types/unifiedRegistration';

interface RetreatRegistrationsTabProps {
  slug: string;
}

interface RegistrationDetail {
  id: string;
  stripe_session_id?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  date_of_birth?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state_province?: string;
  postal_code?: string;
  country?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;
  experience_level?: string;
  bring_own_camera?: boolean;
  camera_equipment_details?: string;
  dietary_restrictions?: string;
  medical_conditions?: string;
  how_did_you_hear?: string;
  special_requests?: string;
  plan_label?: string;
  amount_paid?: number;
  payment_amount?: number;
  currency?: string;
  payment_currency?: string;
  payment_status?: string;
  retreat?: string;
  retreat_start?: string;
  retreat_location?: string;
  retreat_slug?: string;
  created_at: string;
  updated_at?: string;
}

function DetailRow({ label, value }: { label: string; value: string | undefined | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start py-2 border-b border-sage-100 last:border-0">
      <dt className="text-sm font-medium text-ink-500 sm:w-48 flex-shrink-0">{label}</dt>
      <dd className="text-sm text-ink-900 mt-1 sm:mt-0">{value}</dd>
    </div>
  );
}

export default function RetreatRegistrationsTab({ slug }: RetreatRegistrationsTabProps) {
  const [registrations, setRegistrations] = useState<UnifiedRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [exporting, setExporting] = useState(false);
  const [selectedId, setSelectedId] = useState<{ id: string; source: string } | null>(null);
  const [detail, setDetail] = useState<RegistrationDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [statusSaving, setStatusSaving] = useState(false);

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

  const openDetail = async (reg: UnifiedRegistration) => {
    setSelectedId({ id: reg.id, source: reg.source });
    setDetailLoading(true);
    setDetail(null);
    try {
      const res = await fetch(`/api/admin/registrations/${reg.id}?source=${reg.source}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setDetail(data);
    } catch (error) {
      console.error('Error fetching detail:', error);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setSelectedId(null);
    setDetail(null);
  };

  const downloadReceipt = () => {
    if (!detail) return;
    const amount = detail.amount_paid ?? detail.payment_amount ?? 0;
    const currency = (detail.currency ?? detail.payment_currency ?? 'USD').toUpperCase();
    const amountFmt = `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    const date = new Date(detail.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const receiptNum = (detail.stripe_session_id || detail.id || '').slice(-8).toUpperCase();

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Receipt - ${detail.first_name} ${detail.last_name}</title>
<style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #222; margin: 0; padding: 40px; background: #fff; }
  .receipt { max-width: 600px; margin: 0 auto; }
  .header { border-bottom: 3px solid #2d5016; padding-bottom: 20px; margin-bottom: 30px; }
  .company { font-size: 24px; font-weight: bold; color: #2d5016; }
  .company-sub { color: #666; font-size: 13px; margin-top: 4px; }
  .receipt-title { font-size: 18px; color: #333; margin-top: 16px; }
  .receipt-meta { color: #666; font-size: 13px; margin-top: 4px; }
  .section { margin: 24px 0; }
  .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #2d5016; font-weight: bold; margin-bottom: 8px; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; padding: 10px 12px; background: #f4fbf4; border: 1px solid #e0e0e0; font-size: 13px; color: #2d5016; }
  td { padding: 10px 12px; border: 1px solid #e0e0e0; font-size: 13px; }
  .total-row td { font-weight: bold; font-size: 15px; background: #f4fbf4; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .info-block label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 2px; }
  .info-block p { margin: 0; font-size: 14px; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888; text-align: center; }
  @media print { body { padding: 20px; } .no-print { display: none; } }
</style>
</head>
<body>
<div class="receipt">
  <div class="header">
    <div class="company">Born to Create Project</div>
    <div class="company-sub">thebtcp.com &bull; estroop3@gmail.com</div>
    <div class="receipt-title">Payment Receipt</div>
    <div class="receipt-meta">Receipt #${receiptNum} &bull; ${date}</div>
  </div>

  <div class="section">
    <div class="section-title">Bill To</div>
    <div class="info-grid">
      <div class="info-block">
        <label>Name</label>
        <p>${detail.first_name || ''} ${detail.last_name || ''}</p>
      </div>
      <div class="info-block">
        <label>Email</label>
        <p>${detail.email}</p>
      </div>
      ${detail.phone ? `<div class="info-block"><label>Phone</label><p>${detail.phone}</p></div>` : ''}
      ${detail.address_line1 ? `<div class="info-block"><label>Address</label><p>${[detail.address_line1, detail.address_line2, detail.city, detail.state_province, detail.postal_code, detail.country].filter(Boolean).join(', ')}</p></div>` : ''}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Payment Details</div>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Plan</th>
          <th style="text-align:right">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${detail.retreat || 'Registration'}</td>
          <td>${detail.plan_label || '—'}</td>
          <td style="text-align:right">${amountFmt} ${currency}</td>
        </tr>
        <tr class="total-row">
          <td colspan="2">Total Paid</td>
          <td style="text-align:right">${amountFmt} ${currency}</td>
        </tr>
      </tbody>
    </table>
  </div>

  ${detail.retreat ? `
  <div class="section">
    <div class="section-title">Event Details</div>
    <div class="info-grid">
      <div class="info-block">
        <label>Event</label>
        <p>${detail.retreat}</p>
      </div>
      ${detail.retreat_start ? `<div class="info-block"><label>Date</label><p>${detail.retreat_start}</p></div>` : ''}
      ${detail.retreat_location ? `<div class="info-block"><label>Location</label><p>${detail.retreat_location}</p></div>` : ''}
    </div>
  </div>
  ` : ''}

  ${detail.stripe_session_id ? `
  <div class="section">
    <div class="section-title">Reference</div>
    <div class="info-block">
      <label>Transaction ID</label>
      <p style="font-family: monospace; font-size: 12px;">${detail.stripe_session_id}</p>
    </div>
  </div>
  ` : ''}

  <div class="footer">
    <p>Thank you for your registration!</p>
    <p>Born to Create Project &bull; thebtcp.com</p>
  </div>

  <div class="no-print" style="text-align:center; margin-top: 30px;">
    <button onclick="window.print()" style="padding: 10px 24px; background: #2d5016; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">Print / Save as PDF</button>
  </div>
</div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, '_blank');
    if (!w) {
      // Fallback: download as file
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${(detail.first_name || '').toLowerCase()}-${(detail.last_name || '').toLowerCase()}-${receiptNum}.html`;
      a.click();
    }
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const updateStatus = async (field: string, value: string) => {
    if (!selectedId || !detail) return;
    setStatusSaving(true);
    try {
      const res = await fetch(`/api/admin/registrations/${selectedId.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: selectedId.source,
          updates: { [field]: value },
        }),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setDetail(updated);
      // Refresh the list to reflect changes
      fetchRegistrations();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setStatusSaving(false);
    }
  };

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
                <tr
                  key={r.id}
                  onClick={() => openDetail(r)}
                  className="border-b border-sage-100 hover:bg-sage-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-2 text-ink-900">{r.first_name} {r.last_name}</td>
                  <td className="py-3 px-2 text-ink-600">{r.email}</td>
                  <td className="py-3 px-2 text-ink-600">{r.plan_label || '—'}</td>
                  <td className="py-3 px-2 text-ink-600">
                    {r.amount_paid != null ? `$${Number(r.amount_paid).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '—'}
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

      {/* Detail Modal */}
      {selectedId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeDetail}>
          <div
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {detailLoading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
                <p className="mt-4 text-ink-500">Loading details...</p>
              </div>
            ) : detail ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-sage-200">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ink-900">
                      {detail.first_name} {detail.last_name}
                    </h3>
                    <p className="text-sm text-ink-500 mt-1">
                      Registered {new Date(detail.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={downloadReceipt}
                      className="bg-forest-600 text-cream-50 px-3 py-1.5 rounded-lg text-sm hover:bg-forest-700 transition-colors"
                    >
                      Receipt
                    </button>
                    <button
                      onClick={closeDetail}
                      className="text-ink-400 hover:text-ink-700 p-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Payment Info */}
                  <div className="bg-forest-50 rounded-lg p-4">
                    <h4 className="font-heading text-sm font-bold text-forest-800 mb-3 uppercase tracking-wide">Payment</h4>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-forest-600 font-medium">Amount</p>
                        <p className="text-lg font-bold text-ink-900">
                          ${(detail.amount_paid ?? detail.payment_amount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          <span className="text-xs text-ink-500 ml-1">{(detail.currency ?? detail.payment_currency ?? 'USD').toUpperCase()}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-forest-600 font-medium">Plan</p>
                        <p className="text-sm font-medium text-ink-900">{detail.plan_label || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-forest-600 font-medium mb-1">Payment Status</p>
                        <select
                          value={detail.payment_status || ''}
                          onChange={(e) => updateStatus('payment_status', e.target.value)}
                          disabled={statusSaving}
                          className={`text-sm font-medium px-2 py-1 rounded border cursor-pointer disabled:opacity-50 ${
                            detail.payment_status === 'paid' || detail.payment_status === 'paid_in_full' || detail.payment_status === 'completed'
                              ? 'bg-green-50 border-green-200 text-green-700'
                              : detail.payment_status === 'cancelled' || detail.payment_status === 'failed' || detail.payment_status === 'refunded'
                              ? 'bg-red-50 border-red-200 text-red-700'
                              : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="paid_in_full">Paid in Full</option>
                          <option value="deposit_paid">Deposit Paid</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="refunded">Refunded</option>
                          <option value="failed">Failed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="font-heading text-sm font-bold text-ink-700 mb-2 uppercase tracking-wide">Contact Information</h4>
                    <dl>
                      <DetailRow label="Email" value={detail.email} />
                      <DetailRow label="Phone" value={detail.phone} />
                      <DetailRow label="Date of Birth" value={detail.date_of_birth} />
                      <DetailRow label="Address" value={[detail.address_line1, detail.address_line2, detail.city, detail.state_province, detail.postal_code, detail.country].filter(Boolean).join(', ') || undefined} />
                    </dl>
                  </div>

                  {/* Emergency Contact */}
                  {(detail.emergency_contact_name || detail.emergency_contact_phone) && (
                    <div>
                      <h4 className="font-heading text-sm font-bold text-ink-700 mb-2 uppercase tracking-wide">Emergency Contact</h4>
                      <dl>
                        <DetailRow label="Name" value={detail.emergency_contact_name} />
                        <DetailRow label="Phone" value={detail.emergency_contact_phone} />
                        <DetailRow label="Relationship" value={detail.emergency_contact_relationship} />
                      </dl>
                    </div>
                  )}

                  {/* Preferences */}
                  {(detail.experience_level || detail.bring_own_camera || detail.camera_equipment_details || detail.how_did_you_hear) && (
                    <div>
                      <h4 className="font-heading text-sm font-bold text-ink-700 mb-2 uppercase tracking-wide">Preferences</h4>
                      <dl>
                        <DetailRow label="Experience Level" value={detail.experience_level} />
                        <DetailRow label="Bringing Own Camera" value={detail.bring_own_camera ? 'Yes' : detail.bring_own_camera === false ? 'No' : undefined} />
                        <DetailRow label="Camera Equipment" value={detail.camera_equipment_details} />
                        <DetailRow label="How Did You Hear" value={detail.how_did_you_hear} />
                      </dl>
                    </div>
                  )}

                  {/* Health & Special Needs */}
                  {(detail.dietary_restrictions || detail.medical_conditions || detail.special_requests) && (
                    <div>
                      <h4 className="font-heading text-sm font-bold text-ink-700 mb-2 uppercase tracking-wide">Health & Special Needs</h4>
                      <dl>
                        <DetailRow label="Dietary Restrictions" value={detail.dietary_restrictions} />
                        <DetailRow label="Medical Conditions" value={detail.medical_conditions} />
                        <DetailRow label="Special Requests" value={detail.special_requests} />
                      </dl>
                    </div>
                  )}

                  {/* Retreat Info */}
                  <div>
                    <h4 className="font-heading text-sm font-bold text-ink-700 mb-2 uppercase tracking-wide">Retreat/Workshop</h4>
                    <dl>
                      <DetailRow label="Name" value={detail.retreat} />
                      <DetailRow label="Dates" value={detail.retreat_start} />
                      <DetailRow label="Location" value={detail.retreat_location} />
                    </dl>
                  </div>

                  {/* Stripe Reference */}
                  {detail.stripe_session_id && (
                    <div className="pt-2 border-t border-sage-200">
                      <p className="text-xs text-ink-400">
                        Stripe Session: <span className="font-mono">{detail.stripe_session_id}</span>
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <p className="text-ink-500">Could not load registration details.</p>
                <button onClick={closeDetail} className="mt-4 text-forest-600 hover:text-forest-700 text-sm font-medium">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
