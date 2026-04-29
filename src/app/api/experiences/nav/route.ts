import { NextResponse } from 'next/server';
import * as experienceService from '@/lib/services/experienceService';

export async function GET() {
  try {
    const experiences = await experienceService.getNavExperiences();
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching nav experiences:', error);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}
