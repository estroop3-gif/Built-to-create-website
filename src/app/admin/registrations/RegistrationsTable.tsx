// src/app/admin/registrations/RegistrationsTable.tsx

'use client';

import { useState, useMemo } from 'react';
import type { RetreatRegistration, PaymentStatus, RegistrationStatus } from '@/lib/types/retreatRegistration';

interface RegistrationsTableProps {
  initialRegistrations: RetreatRegistration[];
  retreatIds: string[];
  paymentStatuses: PaymentStatus[];
  registrationStatuses: RegistrationStatus[];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'confirmed':
    case 'paid_in_full':
      return 'bg-green-100 text-green-800';
    case 'pending':
    case 'pending_review':
    case 'deposit_paid':
      return 'bg-yellow-100 text-yellow-800';
    case 'waitlist':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default function RegistrationsTable({
  initialRegistrations,
  retreatIds,
  paymentStatuses,
  registrationStatuses,
}: RegistrationsTableProps) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [filters, setFilters] = useState({
    retreatId: '',
    registrationStatus: '',
    paymentStatus: '',
    search: '',
  });
  const [updating, setUpdating] = useState<string | null>(null);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      if (filters.retreatId && reg.retreat_id !== filters.retreatId) return false;
      if (filters.registrationStatus && reg.registration_status !== filters.registrationStatus) return false;
      if (filters.paymentStatus && reg.payment_status !== filters.paymentStatus) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesName = reg.full_name.toLowerCase().includes(searchLower);
        const matchesEmail = reg.email.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesEmail) return false;
      }
      return true;
    });
  }, [registrations, filters]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleStatusUpdate = async (
    id: string,
    field: 'registrationStatus' | 'paymentStatus',
    value: string
  ) => {
    setUpdating(id);

    try {
      const response = await fetch('/api/retreat/registration-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, [field]: value }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Update failed');
      }

      // Update local state
      setRegistrations((prev) =>
        prev.map((reg) =>
          reg.id === id ? { ...reg, ...result.registration } : reg
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Retreat</label>
            <select
              value={filters.retreatId}
              onChange={(e) => handleFilterChange('retreatId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Retreats</option>
              {retreatIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Status</label>
            <select
              value={filters.registrationStatus}
              onChange={(e) => handleFilterChange('registrationStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Statuses</option>
              {registrationStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              value={filters.paymentStatus}
              onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Payments</option>
              {paymentStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search name or email..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredRegistrations.length} of {registrations.length} registrations
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Retreat
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No registrations found
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className={updating === reg.id ? 'opacity-50' : ''}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(reg.created_at)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{reg.full_name}</div>
                      {reg.church_name && (
                        <div className="text-sm text-gray-500">{reg.church_name}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <a
                        href={`mailto:${reg.email}`}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {reg.email}
                      </a>
                      {reg.phone && <div className="text-sm text-gray-500">{reg.phone}</div>}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reg.retreat_name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reg.ticket_type || '-'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reg.price_usd ? `$${reg.price_usd.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select
                        value={reg.payment_status}
                        onChange={(e) =>
                          handleStatusUpdate(reg.id, 'paymentStatus', e.target.value)
                        }
                        disabled={updating === reg.id}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${getStatusColor(
                          reg.payment_status
                        )}`}
                      >
                        {paymentStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select
                        value={reg.registration_status}
                        onChange={(e) =>
                          handleStatusUpdate(reg.id, 'registrationStatus', e.target.value)
                        }
                        disabled={updating === reg.id}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${getStatusColor(
                          reg.registration_status
                        )}`}
                      >
                        {registrationStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
