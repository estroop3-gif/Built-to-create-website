// Quick script to update production welcome email template
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ozuldebmxmdsckiyydac.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dWxkZWJteG1kc2NraXl5ZGFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQ3NDQ2NSwiZXhwIjoyMDczMDUwNDY1fQ.YVqJTCs6ec7h-774JSgdbZMMv5Uae4ANfOnenhVP7k4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateWelcomeTemplate() {
  try {
    console.log('🔄 Updating welcome-call template...');
    
    // Try to update the welcome-call template directly
    const { data, error } = await supabase
      .from('email_templates')
      .update({
        subject: 'Master phone exposure you can trust',
        preview_text: 'A mini workshop using AE/AF Lock, HDR, and the exposure slider',
        updated_at: new Date().toISOString()
      })
      .eq('template_key', 'welcome-call')
      .select();
    
    if (error) {
      console.error('❌ Error updating template:', error);
      return;
    }
    
    console.log('✅ Updated template:', data);
    
    // Also check what templates exist
    const { data: templates, error: listError } = await supabase
      .from('email_templates')
      .select('template_key, subject, preview_text')
      .eq('category', 'marketing')
      .order('order_sequence');
    
    if (listError) {
      console.error('❌ Error listing templates:', listError);
    } else {
      console.log('📧 Current templates:');
      templates?.forEach(t => {
        console.log(`  ${t.template_key}: "${t.subject}"`);
      });
    }
    
  } catch (err) {
    console.error('❌ Script error:', err);
  }
}

updateWelcomeTemplate();