import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Check admin status from app_metadata (JWT) first, then profiles table as fallback.
 * app_metadata.is_admin is set via supabase.auth.admin.updateUserById() and
 * embedded in the JWT — no extra DB query needed.
 */
async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>, userId: string, appMetadata?: Record<string, unknown>): Promise<boolean> {
  // Primary: check app_metadata (from JWT, no DB call)
  if (appMetadata?.is_admin === true) return true;

  // Fallback: check profiles table (if it exists)
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();

    if (profile?.is_admin) return true;
  } catch {
    // profiles table may not exist yet — that's OK
  }

  return false;
}

export async function requireAdmin() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  const admin = await isAdmin(supabase, user.id, user.app_metadata);

  if (!admin) {
    redirect('/account');
  }

  return { user, profile: { is_admin: true } };
}

export async function checkIsAdmin() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;

  return isAdmin(supabase, user.id, user.app_metadata);
}

export async function logAdminAction(action: string, target?: string, payload?: Record<string, unknown>) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  try {
    await supabase
      .from('audit_log')
      .insert({
        actor: user.id,
        action,
        target,
        payload
      });
  } catch {
    // audit_log table may not exist yet
    console.warn('Failed to log admin action (audit_log table may not exist):', action);
  }
}
