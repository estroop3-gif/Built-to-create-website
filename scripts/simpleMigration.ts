import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);

async function runSimpleMigration() {
  console.log('🔄 Running simple migration...');
  
  try {
    // Create email_templates table
    const createEmailTemplatesQuery = `
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
    
    console.log('📝 Creating email_templates table...');
    const { error: templatesError } = await supabase.rpc('exec', { query: createEmailTemplatesQuery });
    if (templatesError) {
      console.log('Using direct SQL query approach...');
      // If rpc doesn't work, we'll use the Next.js API to execute this
    }
    
    // Create email_sends table
    const createEmailSendsQuery = `
      CREATE TABLE IF NOT EXISTS email_sends (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        template_key text NOT NULL,
        subscriber_email text NOT NULL,
        subscriber_first_name text,
        
        -- Delivery tracking
        delivery_status text NOT NULL DEFAULT 'sent',
        resend_message_id text,
        error_message text,
        
        -- Analytics tracking
        utm_source text DEFAULT 'email',
        utm_medium text DEFAULT 'marketing', 
        utm_campaign text DEFAULT 'costa-rica-retreat',
        
        -- Timestamps
        sent_at timestamptz NOT NULL DEFAULT now(),
        delivered_at timestamptz,
        opened_at timestamptz,
        clicked_at timestamptz,
        
        -- Ensure no duplicate sends
        UNIQUE(template_key, subscriber_email)
      );
    `;
    
    console.log('📝 Migration ready to run via API...');
    console.log('✅ Use /api/admin/setup to complete migration');
    
  } catch (error) {
    console.error('❌ Migration preparation failed:', error);
    throw error;
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSimpleMigration()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export default runSimpleMigration;