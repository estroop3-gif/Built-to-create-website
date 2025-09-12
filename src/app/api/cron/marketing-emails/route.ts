import { NextRequest, NextResponse } from 'next/server';
import { marketingEmailService } from '@/lib/marketingEmailService';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse query parameters
    const url = new URL(request.url);
    const dryRun = url.searchParams.get('dryRun') === 'true';
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);
    
    // Validate limit
    if (limit < 1 || limit > 200) {
      return NextResponse.json({
        success: false,
        error: 'Limit must be between 1 and 200'
      }, { status: 400 });
    }
    
    console.log(`🚀 Marketing email cron job started (dryRun: ${dryRun}, limit: ${limit})`);
    
    // Process batch of marketing emails
    const result = await marketingEmailService.processBatchEmails(limit, dryRun);
    
    const duration = Date.now() - startTime;
    
    // Log completion
    console.log(`✅ Marketing email cron completed in ${duration}ms`);
    console.log(`📊 Results: ${result.sent} sent, ${result.failed} failed, ${result.processed} processed`);
    
    return NextResponse.json({
      success: true,
      message: 'Marketing emails processed successfully',
      stats: {
        processed: result.processed,
        sent: result.sent,
        failed: result.failed,
        batchDuration: result.duration,
        totalDuration: duration,
      },
      dryRun,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Marketing email cron job failed:', errorMessage);
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// For testing convenience, also allow GET requests
export async function GET(request: NextRequest) {
  return POST(request);
}