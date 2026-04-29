import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as experienceService from '@/lib/services/experienceService';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const experience = await experienceService.getExperienceById(id);
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
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
    const experience = await experienceService.updateExperience(id, body);
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    await experienceService.deleteExperience(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
