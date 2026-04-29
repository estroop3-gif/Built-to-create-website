import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as blastService from '@/lib/services/blastService';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const blast = await blastService.sendBlast(id, auth.user.id);
    return NextResponse.json(blast);
  } catch (error) {
    console.error('Error sending blast:', error);
    const message = error instanceof Error ? error.message : 'Failed to send blast';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
