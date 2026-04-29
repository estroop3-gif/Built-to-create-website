import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as experienceService from '@/lib/services/experienceService';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const { featured, show_in_nav, nav_order } = await request.json();

    let experience;
    if (featured !== undefined) {
      experience = await experienceService.toggleFeatured(id, featured);
    }
    if (show_in_nav !== undefined) {
      experience = await experienceService.toggleNavVisibility(id, show_in_nav, nav_order);
    }

    if (!experience) {
      return NextResponse.json({ error: 'No visibility field provided' }, { status: 400 });
    }

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error updating visibility:', error);
    return NextResponse.json({ error: 'Failed to update visibility' }, { status: 500 });
  }
}
