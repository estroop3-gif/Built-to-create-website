import { NextRequest, NextResponse } from 'next/server';
import { marketingEmailService } from '@/lib/marketingEmailService';

export async function GET(request: NextRequest) {
  try {
    console.log('📊 Fetching marketing email statistics...');
    
    const stats = await marketingEmailService.getEmailStats();
    
    return NextResponse.json({
      success: true,
      stats,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Failed to fetch marketing email stats:', errorMessage);
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}