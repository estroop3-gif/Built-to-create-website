import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as promoCodeService from '@/lib/services/promoCodeService';

export async function POST(request: NextRequest) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { code, experienceId } = await request.json();
    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const result = await promoCodeService.validatePromoCode(code, experienceId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error validating promo code:', error);
    return NextResponse.json({ error: 'Failed to validate promo code' }, { status: 500 });
  }
}
