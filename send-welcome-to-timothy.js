// Send updated welcome email directly to Timothy
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const supabaseUrl = 'https://ozuldebmxmdsckiyydac.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dWxkZWJteG1kc2NraXl5ZGFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQ3NDQ2NSwiZXhwIjoyMDczMDUwNDY1fQ.YVqJTCs6ec7h-774JSgdbZMMv5Uae4ANfOnenhVP7k4';
const resendKey = 're_FytKh5Ms_FGH4BFDGRQJ2nBeugAWNh17M';

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(resendKey);

async function sendWelcomeToTimothy() {
  try {
    console.log('📧 Sending updated welcome email to Timothy...\n');
    
    // Get the welcome template from database
    const { data: template, error } = await supabase
      .from('email_templates')
      .select('template_key, subject, preview_text, html_content, plain_text_content')
      .eq('template_key', 'welcome-call')
      .eq('active', true)
      .single();
    
    if (error || !template) {
      console.error('❌ Error getting template:', error);
      return;
    }
    
    console.log('✅ Template found:');
    console.log('Subject:', template.subject);
    console.log('Preview:', template.preview_text);
    console.log('');
    
    // Send email via Resend
    const emailResult = await resend.emails.send({
      from: 'Born to Create Project <no-reply@thebtcp.com>',
      to: 'timothycoticchia@yahoo.com',
      subject: template.subject,
      html: template.html_content,
      text: template.plain_text_content,
      headers: {
        'X-Preview-Text': template.preview_text,
      },
      tags: [
        { name: 'campaign', value: 'costa-rica-retreat' },
        { name: 'template', value: 'welcome-call' },
        { name: 'manual-send', value: 'true' }
      ]
    });
    
    if (emailResult.error) {
      console.error('❌ Email send failed:', emailResult.error);
      return;
    }
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', emailResult.data?.id);
    console.log('To:', 'timothycoticchia@yahoo.com');
    console.log('Subject:', template.subject);
    
    // Log to database
    const { error: logError } = await supabase
      .from('email_sends')
      .insert({
        template_key: 'welcome-call',
        subscriber_email: 'timothycoticchia@yahoo.com',
        subscriber_first_name: 'Timothy',
        delivery_status: 'sent',
        resend_message_id: emailResult.data?.id,
        utm_source: 'manual',
        utm_medium: 'admin',
        utm_campaign: 'costa-rica-retreat'
      });
    
    if (logError && logError.code !== '23505') {
      console.warn('⚠️  Could not log to database:', logError.message);
    } else {
      console.log('✅ Send logged to database');
    }
    
  } catch (err) {
    console.error('❌ Script error:', err);
  }
}

sendWelcomeToTimothy();