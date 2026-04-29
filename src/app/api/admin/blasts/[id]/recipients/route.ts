import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as blastService from '@/lib/services/blastService';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const blast = await blastService.getBlastById(id);
    if (!blast) {
      return NextResponse.json({ error: 'Blast not found' }, { status: 404 });
    }
    if (!blast.experience_id) {
      return NextResponse.json({ error: 'Blast has no linked experience' }, { status: 400 });
    }

    const recipients = await blastService.getBlastRecipients(blast.experience_id);
    return NextResponse.json({ recipients, count: recipients.length });
  } catch (error) {
    console.error('Error fetching recipients:', error);
    return NextResponse.json({ error: 'Failed to fetch recipients' }, { status: 500 });
  }
}
