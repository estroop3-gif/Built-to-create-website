import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as registrationService from '@/lib/services/registrationService';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getWaitlistCount } from '@/lib/services/waitlistService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const source = (request.nextUrl.searchParams.get('source') || 'stripe') as 'stripe' | 'retreat';
    const registration = await registrationService.getRegistrationById(id, source);

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json(registration);
  } catch (error) {
    console.error('Error fetching registration:', error);
    return NextResponse.json({ error: 'Failed to fetch registration' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const body = await request.json();
    const source = (body.source || 'stripe') as 'stripe' | 'retreat';
    const updated = await registrationService.updateRegistration(id, source, body.updates || {});

    if (!updated) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating registration:', error);
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const body = await request.json();
    const source = (body.source || 'stripe') as 'stripe' | 'retreat';

    const deleted = await registrationService.deleteRegistration(id, source);
    if (!deleted) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // Determine the slug to decrement registered_count
    const slug = source === 'stripe'
      ? (deleted.retreat_slug as string | null)
      : null;
    const retreatId = source === 'retreat'
      ? (deleted.retreat_id as string | null)
      : null;

    let decremented = false;
    let has_waitlist = false;
    let waitlist_count = 0;
    let experience_slug = slug || '';

    if (slug) {
      // Stripe registration — decrement by slug
      const { error } = await supabaseAdmin.rpc('decrement_registered_count', { p_slug: slug });
      if (!error) decremented = true;
      else {
        // Fallback: manual decrement
        const { data: exp } = await supabaseAdmin
          .from('experiences')
          .select('registered_count')
          .eq('slug', slug)
          .single();
        if (exp) {
          await supabaseAdmin
            .from('experiences')
            .update({ registered_count: Math.max(0, (exp.registered_count || 0) - 1) })
            .eq('slug', slug);
          decremented = true;
        }
      }
      experience_slug = slug;
    } else if (retreatId) {
      // Retreat registration — decrement by retreat_id (which is the experience slug or id)
      const { data: exp } = await supabaseAdmin
        .from('experiences')
        .select('slug, registered_count')
        .or(`slug.eq.${retreatId},id.eq.${retreatId}`)
        .single();
      if (exp) {
        await supabaseAdmin
          .from('experiences')
          .update({ registered_count: Math.max(0, (exp.registered_count || 0) - 1) })
          .eq('slug', exp.slug);
        decremented = true;
        experience_slug = exp.slug;
      }
    }

    // Check waitlist
    if (experience_slug) {
      waitlist_count = await getWaitlistCount(experience_slug);
      has_waitlist = waitlist_count > 0;
    }

    return NextResponse.json({
      success: true,
      decremented,
      has_waitlist,
      waitlist_count,
      experience_slug,
    });
  } catch (error) {
    console.error('Error deleting registration:', error);
    return NextResponse.json({ error: 'Failed to delete registration' }, { status: 500 });
  }
}
