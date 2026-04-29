import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as registrationService from '@/lib/services/registrationService';

export async function GET(request: NextRequest) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { searchParams } = request.nextUrl;
    const experienceId = searchParams.get('experienceId') || undefined;
    const paymentStatus = searchParams.get('paymentStatus') || undefined;
    const search = searchParams.get('search') || undefined;

    const registrations = await registrationService.listRegistrations({
      experienceId,
      paymentStatus,
      search,
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Error listing registrations:', error);
    return NextResponse.json({ error: 'Failed to list registrations' }, { status: 500 });
  }
}
