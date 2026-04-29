import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { UnifiedRegistration } from '@/lib/types/unifiedRegistration';

interface ListFilters {
  experienceId?: string;
  paymentStatus?: string;
  search?: string;
}

/**
 * Queries both `registrations` and `retreat_registrations` tables,
 * normalizes results into UnifiedRegistration[].
 */
export async function listRegistrations(filters?: ListFilters): Promise<UnifiedRegistration[]> {
  // Query stripe registrations
  let stripeQuery = supabaseAdmin
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.paymentStatus) {
    stripeQuery = stripeQuery.eq('payment_status', filters.paymentStatus);
  }
  if (filters?.search) {
    stripeQuery = stripeQuery.or(
      `email.ilike.%${filters.search}%,first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%`
    );
  }
  if (filters?.experienceId) {
    stripeQuery = stripeQuery.eq('retreat_slug', filters.experienceId);
  }

  // Query retreat registrations
  let retreatQuery = supabaseAdmin
    .from('retreat_registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.paymentStatus) {
    retreatQuery = retreatQuery.eq('payment_status', filters.paymentStatus);
  }
  if (filters?.search) {
    retreatQuery = retreatQuery.or(
      `email.ilike.%${filters.search}%,full_name.ilike.%${filters.search}%`
    );
  }
  if (filters?.experienceId) {
    retreatQuery = retreatQuery.eq('retreat_id', filters.experienceId);
  }

  const [stripeResult, retreatResult] = await Promise.all([
    stripeQuery,
    retreatQuery,
  ]);

  if (stripeResult.error) throw stripeResult.error;
  if (retreatResult.error) throw retreatResult.error;

  // Normalize stripe registrations
  const stripeRegs: UnifiedRegistration[] = (stripeResult.data || []).map((r) => ({
    id: r.id,
    source: 'stripe' as const,
    email: r.email || '',
    first_name: r.first_name || '',
    last_name: r.last_name || '',
    phone: r.phone || null,
    retreat_name: r.retreat || null,
    plan_label: r.plan_label || null,
    amount_paid: r.amount_paid ?? r.payment_amount ?? null,
    currency: r.currency ?? r.payment_currency ?? null,
    payment_status: r.payment_status || 'paid',
    registration_status: r.status || 'confirmed',
    experience_id: null,
    created_at: r.created_at,
  }));

  // Normalize retreat registrations
  const retreatRegs: UnifiedRegistration[] = (retreatResult.data || []).map((r) => {
    const nameParts = (r.full_name || '').split(' ');
    return {
      id: r.id,
      source: 'retreat' as const,
      email: r.email || '',
      first_name: nameParts[0] || '',
      last_name: nameParts.slice(1).join(' ') || '',
      phone: r.phone || null,
      retreat_name: r.retreat_name || null,
      plan_label: r.ticket_type || null,
      amount_paid: r.price_usd ?? null,
      currency: 'usd',
      payment_status: r.payment_status || null,
      registration_status: r.registration_status || null,
      experience_id: r.retreat_id || null,
      created_at: r.created_at,
    };
  });

  // Merge and sort by created_at descending
  return [...stripeRegs, ...retreatRegs].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getRegistrationById(
  id: string,
  source: 'stripe' | 'retreat'
): Promise<Record<string, unknown> | null> {
  const table = source === 'stripe' ? 'registrations' : 'retreat_registrations';
  const { data, error } = await supabaseAdmin
    .from(table)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

export async function updateRegistration(
  id: string,
  source: 'stripe' | 'retreat',
  updates: Record<string, unknown>
): Promise<Record<string, unknown> | null> {
  const table = source === 'stripe' ? 'registrations' : 'retreat_registrations';
  const { data, error } = await supabaseAdmin
    .from(table)
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

export async function deleteRegistration(
  id: string,
  source: 'stripe' | 'retreat'
): Promise<Record<string, unknown> | null> {
  const table = source === 'stripe' ? 'registrations' : 'retreat_registrations';
  const { data, error } = await supabaseAdmin
    .from(table)
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

export async function exportRegistrationsCsv(experienceId?: string): Promise<string> {
  const registrations = await listRegistrations(
    experienceId ? { experienceId } : undefined
  );

  const headers = [
    'Source',
    'Email',
    'First Name',
    'Last Name',
    'Phone',
    'Retreat',
    'Plan',
    'Amount Paid',
    'Currency',
    'Payment Status',
    'Registration Status',
    'Registered At',
  ];

  const rows = registrations.map((r) =>
    [
      r.source,
      r.email,
      r.first_name,
      r.last_name,
      r.phone || '',
      r.retreat_name || '',
      r.plan_label || '',
      r.amount_paid?.toString() || '',
      r.currency || '',
      r.payment_status || '',
      r.registration_status || '',
      r.created_at,
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

export async function getRegistrationStats(experienceId?: string) {
  const registrations = await listRegistrations(
    experienceId ? { experienceId } : undefined
  );

  const total = registrations.length;
  const paid = registrations.filter(
    (r) => r.payment_status === 'paid' || r.payment_status === 'paid_in_full'
  ).length;
  const pending = registrations.filter(
    (r) => r.payment_status === 'pending' || r.payment_status === 'deposit_paid'
  ).length;
  const cancelled = registrations.filter(
    (r) => r.payment_status === 'cancelled'
  ).length;
  const totalRevenue = registrations.reduce(
    (sum, r) => sum + (r.amount_paid || 0),
    0
  );

  return { total, paid, pending, cancelled, totalRevenue };
}
