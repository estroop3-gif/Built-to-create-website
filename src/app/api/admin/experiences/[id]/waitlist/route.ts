import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import {
  getWaitlistEntries,
  removeFromWaitlist,
} from '@/lib/services/waitlistService';
import { getExperienceById } from '@/lib/services/experienceService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const experience = await getExperienceById(id);
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    const { searchParams } = request.nextUrl;
    const notifiedParam = searchParams.get('notified');
    const filters =
      notifiedParam !== null ? { notified: notifiedParam === 'true' } : undefined;

    const entries = await getWaitlistEntries(experience.slug, filters);
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    // Validate experience exists
    const { id } = await params;
    const experience = await getExperienceById(id);
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    const body = await request.json();
    const { entryId } = body;

    if (!entryId) {
      return NextResponse.json({ error: 'entryId is required' }, { status: 400 });
    }

    await removeFromWaitlist(entryId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing waitlist entry:', error);
    return NextResponse.json(
      { error: 'Failed to remove waitlist entry' },
      { status: 500 }
    );
  }
}
