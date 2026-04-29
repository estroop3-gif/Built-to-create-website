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
    return NextResponse.json(blast);
  } catch (error) {
    console.error('Error fetching blast:', error);
    return NextResponse.json({ error: 'Failed to fetch blast' }, { status: 500 });
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
    const blast = await blastService.updateBlastDraft(id, body);
    return NextResponse.json(blast);
  } catch (error) {
    console.error('Error updating blast:', error);
    return NextResponse.json({ error: 'Failed to update blast' }, { status: 500 });
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
    await blastService.deleteBlast(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blast:', error);
    return NextResponse.json({ error: 'Failed to delete blast' }, { status: 500 });
  }
}
