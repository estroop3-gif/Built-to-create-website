import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendTransactionalEmail } from '@/lib/resend';
import type { BlastNotification, BlastNotificationInsert } from '@/lib/types/blastNotification';

export async function listBlasts(experienceId?: string): Promise<BlastNotification[]> {
  let query = supabaseAdmin
    .from('blast_notifications')
    .select('*')
    .order('created_at', { ascending: false });

  if (experienceId) {
    query = query.eq('experience_id', experienceId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as BlastNotification[];
}

export async function getBlastById(id: string): Promise<BlastNotification | null> {
  const { data, error } = await supabaseAdmin
    .from('blast_notifications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as BlastNotification;
}

export async function createBlastDraft(data: BlastNotificationInsert): Promise<BlastNotification> {
  const { data: created, error } = await supabaseAdmin
    .from('blast_notifications')
    .insert({ ...data, status: 'draft' })
    .select()
    .single();

  if (error) throw error;
  return created as BlastNotification;
}

export async function updateBlastDraft(
  id: string,
  data: Partial<BlastNotificationInsert>
): Promise<BlastNotification> {
  const { data: updated, error } = await supabaseAdmin
    .from('blast_notifications')
    .update(data)
    .eq('id', id)
    .eq('status', 'draft') // only drafts can be updated
    .select()
    .single();

  if (error) throw error;
  return updated as BlastNotification;
}

export async function deleteBlast(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('blast_notifications')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Get list of paid attendees who would receive a blast for a given experience.
 */
export async function getBlastRecipients(
  experienceId: string
): Promise<Array<{ email: string; name: string }>> {
  // Query both registration tables for paid attendees
  const [stripeResult, retreatResult] = await Promise.all([
    supabaseAdmin
      .from('registrations')
      .select('email, first_name, last_name')
      .eq('retreat', experienceId),
    supabaseAdmin
      .from('retreat_registrations')
      .select('email, full_name')
      .eq('retreat_id', experienceId)
      .in('payment_status', ['paid_in_full', 'deposit_paid']),
  ]);

  if (stripeResult.error) throw stripeResult.error;
  if (retreatResult.error) throw retreatResult.error;

  const seen = new Set<string>();
  const recipients: Array<{ email: string; name: string }> = [];

  for (const r of stripeResult.data || []) {
    const email = (r.email || '').toLowerCase();
    if (email && !seen.has(email)) {
      seen.add(email);
      recipients.push({
        email,
        name: [r.first_name, r.last_name].filter(Boolean).join(' ') || email,
      });
    }
  }

  for (const r of retreatResult.data || []) {
    const email = (r.email || '').toLowerCase();
    if (email && !seen.has(email)) {
      seen.add(email);
      recipients.push({ email, name: r.full_name || email });
    }
  }

  return recipients;
}

/**
 * Send a blast email to all paid attendees.
 * Throttles at 2 emails/second to respect Resend rate limits.
 */
export async function sendBlast(id: string, sentByUserId: string): Promise<BlastNotification> {
  const blast = await getBlastById(id);
  if (!blast) throw new Error('Blast not found');
  if (blast.status !== 'draft') throw new Error('Blast has already been sent or is sending');

  if (!blast.experience_id) throw new Error('Blast must be linked to an experience');

  // Mark as sending
  await supabaseAdmin
    .from('blast_notifications')
    .update({ status: 'sending', sent_by: sentByUserId })
    .eq('id', id);

  const recipients = await getBlastRecipients(blast.experience_id);
  let sentCount = 0;

  try {
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];

      await sendTransactionalEmail({
        to: recipient.email,
        subject: blast.subject,
        html: blast.html_content,
        text: blast.text_content || undefined,
      });

      sentCount++;

      // Throttle: 2 emails per second
      if (i < recipients.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    // Mark as sent
    const { data: updated, error } = await supabaseAdmin
      .from('blast_notifications')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString(),
        recipient_count: sentCount,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return updated as BlastNotification;
  } catch (error) {
    // Mark as failed
    await supabaseAdmin
      .from('blast_notifications')
      .update({
        status: 'failed',
        recipient_count: sentCount,
      })
      .eq('id', id);

    throw error;
  }
}
