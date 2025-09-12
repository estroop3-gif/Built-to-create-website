// Update welcome email template with proper phone exposure subject
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ozuldebmxmdsckiyydac.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dWxkZWJteG1kc2NraXl5ZGFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQ3NDQ2NSwiZXhwIjoyMDczMDUwNDY1fQ.YVqJTCs6ec7h-774JSgdbZMMv5Uae4ANfOnenhVP7k4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateWelcomeEmailSubject() {
  try {
    console.log('🔄 Updating welcome email subject line...');
    
    // Update the welcome-call template with proper phone exposure subject
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
    
    console.log('✅ Updated welcome email template:', data);
    
    // Verify the update
    const { data: verifyData, error: verifyError } = await supabase
      .from('email_templates')
      .select('template_key, subject, preview_text')
      .eq('template_key', 'welcome-call')
      .single();
    
    if (verifyError) {
      console.error('❌ Error verifying update:', verifyError);
    } else {
      console.log('📧 Verified template:');
      console.log(`  Subject: "${verifyData.subject}"`);
      console.log(`  Preview: "${verifyData.preview_text}"`);
    }
    
  } catch (err) {
    console.error('❌ Script error:', err);
  }
}

updateWelcomeEmailSubject();