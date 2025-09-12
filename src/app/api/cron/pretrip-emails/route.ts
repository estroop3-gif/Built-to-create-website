import { NextRequest, NextResponse } from 'next/server';
import { marketingEmailService } from '@/lib/marketingEmailService';

export const runtime = 'nodejs';

// Verify this is called by Vercel Cron or authorized source
function isAuthorizedCronCall(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || 'dev-cron-secret';
  
  // In development, allow calls without auth header
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // In production, verify the cron secret
  return authHeader === `Bearer ${cronSecret}`;
}

export async function POST(request: NextRequest) {
  // Verify authorization
  if (!isAuthorizedCronCall(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    console.log('🚀 Starting marketing email cron job...');
    
    // Process batch of marketing emails (limit to 50 per run to respect rate limits)
    const results = await marketingEmailService.processBatchEmails(50, false);
    
    console.log('✅ Marketing email cron job completed:', results);

    return NextResponse.json({
      success: true,
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Marketing email cron job error:', error);
    return NextResponse.json(
      { error: 'Cron job failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// Allow manual triggering in development
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }
  
  // Manual trigger for testing
  return POST(request);
}