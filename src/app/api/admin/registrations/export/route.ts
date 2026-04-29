import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as registrationService from '@/lib/services/registrationService';

export async function GET(request: NextRequest) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const experienceId = request.nextUrl.searchParams.get('experienceId') || undefined;
    const csv = await registrationService.exportRegistrationsCsv(experienceId);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="registrations-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting registrations:', error);
    return NextResponse.json({ error: 'Failed to export registrations' }, { status: 500 });
  }
}
