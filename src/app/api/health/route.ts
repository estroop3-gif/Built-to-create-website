import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE!;

export async function GET(_request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Test database connection
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await supabase
      .from('email_templates')
      .select('id')
      .limit(1);
    
    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }
    
    // Test email service environment
    const hasResendKey = !!process.env.RESEND_API_KEY;
    const hasFromEmail = !!process.env.FROM_EMAIL;
    
    const duration = Date.now() - startTime;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      services: {
        database: 'connected',
        emailService: hasResendKey && hasFromEmail ? 'configured' : 'missing_config',
        templates: data ? 'available' : 'not_seeded'
      },
      environment: process.env.NODE_ENV || 'development'
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const duration = Date.now() - startTime;
    
    return NextResponse.json({
      status: 'unhealthy',
      error: errorMessage,
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`
    }, { status: 500 });
  }
}