import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { User } from '@supabase/supabase-js';

type AdminResult =
  | { user: User; profile: { is_admin: boolean } }
  | NextResponse;

/**
 * API-safe admin auth check. Unlike requireAdmin() which calls redirect(),
 * this returns a NextResponse on failure so it works in API route handlers.
 *
 * Checks app_metadata.is_admin (JWT) first, profiles table as fallback.
 *
 * Usage:
 *   const auth = await requireApiAdmin();
 *   if (auth instanceof NextResponse) return auth;
 *   const { user } = auth;
 */
export async function requireApiAdmin(): Promise<AdminResult> {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Primary: check app_metadata (from JWT, no DB call)
  if (user.app_metadata?.is_admin === true) {
    return { user, profile: { is_admin: true } };
  }

  // Fallback: check profiles table
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (profile?.is_admin) {
      return { user, profile: { is_admin: true } };
    }
  } catch {
    // profiles table may not exist yet
  }

  return NextResponse.json(
    { error: 'Admin access required' },
    { status: 403 }
  );
}
