import React from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { render } from '@react-email/render';
import { sendPromotionalEmail } from '@/lib/resend';

// Import all marketing templates
import Marketing01Welcome from '@/emails/Marketing01Welcome';
import Marketing02ManualMode from '@/emails/Marketing02ManualMode';
import Marketing03LensAnatomy from '@/emails/Marketing03LensAnatomy';
import Marketing04StoryBasics from '@/emails/Marketing04StoryBasics';
import Marketing05LightingBasics from '@/emails/Marketing05LightingBasics';
import Marketing06SoundBasics from '@/emails/Marketing06SoundBasics';
import Marketing07EditingBasics from '@/emails/Marketing07EditingBasics';
import Marketing08ColorBasics from '@/emails/Marketing08ColorBasics';
import Marketing09Interviews from '@/emails/Marketing09Interviews';
import Marketing10FaithAndAction from '@/emails/Marketing10FaithAndAction';

// Supabase client will be initialized inside request handlers

const templateComponents: Record<string, React.FC<{ firstName: string; registerUrl: string }>> = {
  'welcome-call': Marketing01Welcome,
  'manual-camera': Marketing02ManualMode,
  'lens-anatomy': Marketing03LensAnatomy,
  'story-basics': Marketing04StoryBasics,
  'lighting-basics': Marketing05LightingBasics,
  'sound-basics': Marketing06SoundBasics,
  'editing-basics': Marketing07EditingBasics,
  'color-basics': Marketing08ColorBasics,
  'interviews': Marketing09Interviews,
  'faith-and-action': Marketing10FaithAndAction,
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get admin test email from environment
    const adminEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_TEST_EMAIL;
    if (!adminEmail) {
      return NextResponse.json({
        success: false,
        error: 'ADMIN_EMAIL environment variable not configured'
      }, { status: 400 });
    }
    
    console.log('🧪 Starting admin test email blast to:', adminEmail);
    
    // Get all active marketing templates
    const { data: templates, error: templatesError } = await supabase
      .from('email_templates')
      .select('template_key, subject, preview_text, order_sequence')
      .eq('category', 'marketing')
      .eq('active', true)
      .order('order_sequence');
    
    if (templatesError) {
      throw new Error(`Failed to fetch templates: ${templatesError.message}`);
    }
    
    if (!templates || templates.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No active marketing templates found. Run the seed script first.'
      }, { status: 400 });
    }
    
    console.log(`📬 Found ${templates.length} templates to test`);
    
    const results = [];
    let sent = 0;
    let failed = 0;
    
    // Send each template to admin
    for (const template of templates) {
      try {
        console.log(`📤 Testing: ${template.template_key} - "${template.subject}"`);
        
        const TemplateComponent = templateComponents[template.template_key];
        if (!TemplateComponent) {
          throw new Error(`Component not found for ${template.template_key}`);
        }
        
        // Render template with test data
        const baseUrl = process.env.BASE_URL || 'https://thebtcp.com';
        const htmlContent = await render(
          TemplateComponent({ 
            firstName: 'Parker',
            registerUrl: `${baseUrl}/register`
          }) as React.ReactElement
        );
        
        const plainTextContent = stripHtml(htmlContent);
        
        // Send via enhanced promotional email helper
        const emailData = await sendPromotionalEmail({
          to: adminEmail,
          subject: `[TEST ${template.order_sequence}/10] ${template.subject}`,
          html: htmlContent,
          text: plainTextContent,
        });
        
        if (emailData.error) {
          throw new Error(`Resend error: ${emailData.error.message}`);
        }
        
        results.push({
          templateKey: template.template_key,
          subject: template.subject,
          messageId: emailData.data?.id,
          success: true,
          sequence: template.order_sequence
        });
        
        sent++;
        console.log(`✅ Sent ${template.order_sequence}/10: "${template.subject}"`);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`❌ Failed ${template.template_key}:`, errorMessage);
        
        results.push({
          templateKey: template.template_key,
          subject: template.subject,
          success: false,
          error: errorMessage,
          sequence: template.order_sequence
        });
        
        failed++;
      }
    }
    
    const duration = Date.now() - startTime;
    console.log(`✅ Admin test blast completed in ${duration}ms`);
    console.log(`📊 Results: ${sent} sent, ${failed} failed`);
    
    return NextResponse.json({
      success: true,
      message: `Test emails sent successfully to ${adminEmail}`,
      stats: {
        total: templates.length,
        sent,
        failed,
        adminEmail
      },
      results: results.sort((a, b) => a.sequence - b.sequence),
      duration,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Admin test email blast failed:', errorMessage);
    
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