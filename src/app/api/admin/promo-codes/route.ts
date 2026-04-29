import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as promoCodeService from '@/lib/services/promoCodeService';

export async function GET(request: NextRequest) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { searchParams } = request.nextUrl;
    const experienceId = searchParams.get('experienceId') || undefined;
    const isActive = searchParams.get('isActive');

    const codes = await promoCodeService.listPromoCodes({
      experience_id: experienceId,
      ...(isActive !== null && { is_active: isActive === 'true' }),
    });

    return NextResponse.json(codes);
  } catch (error) {
    console.error('Error listing promo codes:', error);
    return NextResponse.json({ error: 'Failed to list promo codes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const code = await promoCodeService.createPromoCode(body);
    return NextResponse.json(code, { status: 201 });
  } catch (error) {
    console.error('Error creating promo code:', error);
    return NextResponse.json({ error: 'Failed to create promo code' }, { status: 500 });
  }
}
