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
    const sections = await request.json();
    const experience = await experienceService.updatePageSections(id, sections);
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error updating page sections:', error);
    return NextResponse.json({ error: 'Failed to update page sections' }, { status: 500 });
  }
}
