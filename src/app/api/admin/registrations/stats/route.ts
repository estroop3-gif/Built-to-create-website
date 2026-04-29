import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as registrationService from '@/lib/services/registrationService';

export async function GET(request: NextRequest) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const experienceId = request.nextUrl.searchParams.get('experienceId') || undefined;
    const stats = await registrationService.getRegistrationStats(experienceId);
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching registration stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
