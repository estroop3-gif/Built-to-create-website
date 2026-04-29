import { NextRequest, NextResponse } from 'next/server';
import { getCapacityStatus } from '@/lib/services/experienceService';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const status = await getCapacityStatus(slug);
    return NextResponse.json(status);
  } catch (error) {
    console.error('Error fetching capacity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch capacity status' },
      { status: 500 }
    );
  }
}
