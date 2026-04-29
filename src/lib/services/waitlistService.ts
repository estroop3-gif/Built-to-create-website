import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { WaitlistEntry } from '@/lib/types/waitlist';

interface ListFilters {
  notified?: boolean;
}

export async function getWaitlistEntries(
  slug: string,
  filters?: ListFilters
): Promise<WaitlistEntry[]> {
  let query = supabaseAdmin
    .from('experience_waitlist')
    .select('*')
    .eq('experience_slug', slug)
    .order('created_at', { ascending: false });

  if (filters?.notified !== undefined) {
    query = query.eq('notified', filters.notified);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as WaitlistEntry[];
}

export async function addToWaitlist(
  slug: string,
  entry: { email: string; full_name: string; phone?: string }
): Promise<WaitlistEntry> {
  const { data, error } = await supabaseAdmin
    .from('experience_waitlist')
    .upsert(
      {
        experience_slug: slug,
        email: entry.email,
        full_name: entry.full_name,
        phone: entry.phone || null,
      },
      { onConflict: 'experience_slug,email' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as WaitlistEntry;
}

export async function removeFromWaitlist(entryId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('experience_waitlist')
    .delete()
    .eq('id', entryId);

  if (error) throw error;
}

export async function notifyWaitlistEntries(
  entryIds: string[]
): Promise<WaitlistEntry[]> {
  const { data, error } = await supabaseAdmin
    .from('experience_waitlist')
    .update({ notified: true, notified_at: new Date().toISOString() })
    .in('id', entryIds)
    .select();

  if (error) throw error;
  return data as WaitlistEntry[];
}

export async function getWaitlistCount(slug: string): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from('experience_waitlist')
    .select('*', { count: 'exact', head: true })
    .eq('experience_slug', slug)
    .eq('notified', false);

  if (error) throw error;
  return count || 0;
}
