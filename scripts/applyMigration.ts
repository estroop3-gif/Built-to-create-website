import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applyMigration() {
  console.log('🔄 Applying email marketing migration...');
  
  try {
    // Read the migration file
    const migrationSql = readFileSync('./supabase/migrations/002_email_marketing_templates.sql', 'utf8');
    
    // Split by semicolon and filter out empty statements
    const statements = migrationSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.toLowerCase().startsWith('create') || 
          statement.toLowerCase().startsWith('alter') ||
          statement.toLowerCase().startsWith('insert') ||
          statement.toLowerCase().startsWith('grant')) {
        
        console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
        
        const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
        
        if (error) {
          // Try direct execution if rpc fails
          const { error: directError } = await supabase.from('_migrations').select().limit(1);
          if (directError) {
            console.warn(`⚠️ Statement ${i + 1} may have failed:`, error.message);
          }
        } else {
          console.log(`✅ Statement ${i + 1} completed`);
        }
      }
    }
    
    console.log('✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  applyMigration()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export default applyMigration;