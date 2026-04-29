import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as promoCodeService from '@/lib/services/promoCodeService';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const code = await promoCodeService.getPromoCodeById(id);
    if (!code) {
      return NextResponse.json({ error: 'Promo code not found' }, { status: 404 });
    }
    return NextResponse.json(code);
  } catch (error) {
    console.error('Error fetching promo code:', error);
    return NextResponse.json({ error: 'Failed to fetch promo code' }, { status: 500 });
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
    const code = await promoCodeService.updatePromoCode(id, body);
    return NextResponse.json(code);
  } catch (error) {
    console.error('Error updating promo code:', error);
    return NextResponse.json({ error: 'Failed to update promo code' }, { status: 500 });
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
    await promoCodeService.deletePromoCode(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting promo code:', error);
    return NextResponse.json({ error: 'Failed to delete promo code' }, { status: 500 });
  }
}
