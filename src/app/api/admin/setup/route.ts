import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(_request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log('🔄 Running database setup...');
    
    // Create email_templates table
    const _createTemplatesQuery = `
      CREATE TABLE IF NOT EXISTS email_templates (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        template_key text UNIQUE NOT NULL,
        subject text NOT NULL,
        preview_text text NOT NULL,
        html_content text NOT NULL,
        plain_text_content text NOT NULL,
        
        -- Template metadata
        order_sequence int NOT NULL DEFAULT 0,
        active boolean NOT NULL DEFAULT true,
        category text DEFAULT 'marketing',
        
        -- Content tags for filtering
        tags text[] DEFAULT '{}',
        
        -- Timestamps
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      );
    `;
    
    const { error: templatesError } = await supabase
      .from('_supabase_migrations')
      .select()
      .limit(1);
    
    if (templatesError) {
      // Try creating tables through raw SQL
      console.log('📝 Creating email_templates table...');
      
      // Since we can't execute raw SQL directly, let's try inserting a test record to see if table exists
      const { error: testError } = await supabase
        .from('email_templates')
        .select('id')
        .limit(1);
        
      if (testError && testError.message.includes('relation "email_templates" does not exist')) {
        return NextResponse.json({
          success: false,
          error: 'Database tables not found. Please run the migration manually using the Supabase dashboard.',
          instructions: [
            '1. Open your Supabase project dashboard',
            '2. Go to the SQL Editor',
            '3. Run the migration file: supabase/migrations/002_email_marketing_templates.sql',
            '4. Then come back and run this setup again'
          ]
        }, { status: 400 });
      }
    }
    
    // Create email_sends table
    console.log('📝 Creating email_sends table...');
    const { error: sendsTestError } = await supabase
      .from('email_sends')
      .select('id')
      .limit(1);
      
    if (sendsTestError && sendsTestError.message.includes('relation "email_sends" does not exist')) {
      return NextResponse.json({
        success: false,
        error: 'email_sends table not found. Please run the migration manually.',
        instructions: [
          '1. Open your Supabase project dashboard',
          '2. Go to the SQL Editor', 
          '3. Run the migration file: supabase/migrations/002_email_marketing_templates.sql'
        ]
      }, { status: 400 });
    }
    
    // Test database functions
    console.log('🔍 Testing database functions...');
    try {
      const { data: _functionTest, error: functionError } = await supabase.rpc('get_subscribers_ready_for_email', {
        p_reference_date: '2025-02-20T00:00:00Z',
        p_limit: 1
      });
      
      if (functionError) {
        return NextResponse.json({
          success: false,
          error: 'Database functions not found. Please run the full migration.',
          details: functionError.message
        }, { status: 400 });
      }
    } catch (functionError) {
      return NextResponse.json({
        success: false,
        error: 'Database functions test failed',
        details: functionError
      }, { status: 400 });
    }
    
    const duration = Date.now() - startTime;
    console.log('✅ Database setup completed successfully!');
    
    return NextResponse.json({
      success: true,
      message: 'Database setup completed successfully',
      duration,
      next_steps: [
        'Run: POST /api/admin/marketing/seed-templates',
        'Test: POST /api/admin/marketing/test-all-emails'
      ],
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Database setup failed:', errorMessage);
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// For convenience, also allow GET
export async function GET(_request: NextRequest) {
  return POST(_request);
}