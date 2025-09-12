import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);

async function checkMigration() {
  console.log('🔍 Checking migration status...');
  
  try {
    // Try to query email_templates table
    const { data, error } = await supabase
      .from('email_templates')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      console.log('❌ email_templates table does not exist:', error.message);
      return false;
    } else {
      console.log('✅ email_templates table exists');
    }
    
    // Check email_sends table
    const { data: sendsData, error: sendsError } = await supabase
      .from('email_sends')
      .select('count(*)')
      .limit(1);
      
    if (sendsError) {
      console.log('❌ email_sends table does not exist:', sendsError.message);
      return false;
    } else {
      console.log('✅ email_sends table exists');
    }
    
    // Check functions
    const { data: functionData, error: functionError } = await supabase.rpc('get_subscribers_ready_for_email', {
      p_reference_date: '2025-02-20T00:00:00Z',
      p_limit: 1
    });
    
    if (functionError) {
      console.log('❌ Database functions not working:', functionError.message);
      return false;
    } else {
      console.log('✅ Database functions working');
    }
    
    console.log('✅ Migration appears successful!');
    return true;
    
  } catch (error) {
    console.error('❌ Error checking migration:', error);
    return false;
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  checkMigration()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Check failed:', error);
      process.exit(1);
    });
}

export default checkMigration;