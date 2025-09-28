import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    redirect('/account');
  }

  return { user, profile };
}

export async function checkIsAdmin() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  return profile?.is_admin || false;
}

export async function logAdminAction(action: string, target?: string, payload?: any) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from('audit_log')
    .insert({
      actor: user.id,
      action,
      target,
      payload
    });
}