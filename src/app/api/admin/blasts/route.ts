import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as blastService from '@/lib/services/blastService';

export async function GET(request: NextRequest) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const experienceId = request.nextUrl.searchParams.get('experienceId') || undefined;
    const blasts = await blastService.listBlasts(experienceId);
    return NextResponse.json(blasts);
  } catch (error) {
    console.error('Error listing blasts:', error);
    return NextResponse.json({ error: 'Failed to list blasts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const blast = await blastService.createBlastDraft(body);
    return NextResponse.json(blast, { status: 201 });
  } catch (error) {
    console.error('Error creating blast draft:', error);
    return NextResponse.json({ error: 'Failed to create blast' }, { status: 500 });
  }
}
