// src/app/admin/registrations/page.tsx

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { RetreatRegistration, PaymentStatus, RegistrationStatus } from '@/lib/types/retreatRegistration';
import RegistrationsTable from './RegistrationsTable';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getRegistrations(): Promise<RetreatRegistration[]> {
  const { data, error } = await supabaseAdmin
    .from('retreat_registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching registrations:', error);
    return [];
  }

  return data as RetreatRegistration[];
}

async function getUniqueRetreatIds(registrations: RetreatRegistration[]): Promise<string[]> {
  const ids = new Set(registrations.map((r) => r.retreat_id));
  return Array.from(ids).sort();
}

export default async function AdminRegistrationsPage() {
  const registrations = await getRegistrations();
  const retreatIds = await getUniqueRetreatIds(registrations);

  const paymentStatuses: PaymentStatus[] = ['pending', 'deposit_paid', 'paid_in_full', 'cancelled'];
  const registrationStatuses: RegistrationStatus[] = ['pending_review', 'confirmed', 'waitlist', 'cancelled'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Retreat Registrations</h1>
          <p className="mt-2 text-gray-600">
            Manage and track all retreat registrations. Total: {registrations.length} registrations
          </p>
        </div>

        <RegistrationsTable
          initialRegistrations={registrations}
          retreatIds={retreatIds}
          paymentStatuses={paymentStatuses}
          registrationStatuses={registrationStatuses}
        />
      </div>
    </div>
  );
}
