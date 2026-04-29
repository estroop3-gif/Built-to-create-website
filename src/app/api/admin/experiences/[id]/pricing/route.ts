import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import * as experienceService from '@/lib/services/experienceService';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const { tiers } = await request.json();
    const experience = await experienceService.updatePricingTiers(id, tiers);
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error updating pricing tiers:', error);
    return NextResponse.json({ error: 'Failed to update pricing tiers' }, { status: 500 });
  }
}
