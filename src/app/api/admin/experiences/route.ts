import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as experienceService from '@/lib/services/experienceService';
import type { ExperienceStatus, ExperienceType } from '@/lib/types/experience';

export async function GET(request: NextRequest) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status') as ExperienceStatus | null;
    const type = searchParams.get('type') as ExperienceType | null;

    const experiences = await experienceService.listExperiences({
      ...(status && { status }),
      ...(type && { type }),
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error listing experiences:', error);
    return NextResponse.json({ error: 'Failed to list experiences' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const experience = await experienceService.createExperience(body);
    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
