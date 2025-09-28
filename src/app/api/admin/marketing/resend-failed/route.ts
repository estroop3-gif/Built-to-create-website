import { NextRequest, NextResponse } from 'next/server';
import { render } from '@react-email/render';
import { sendPromotionalEmail } from '@/lib/resend';
import { emailConfig } from '@/lib/emailClient';

// Import the failed templates
import Marketing07EditingBasics from '@/emails/Marketing07EditingBasics';
import Marketing10FaithAndAction from '@/emails/Marketing10FaithAndAction';

const failedTemplates = [
  {
    key: 'editing-basics',
    subject: 'A calm path from mess to message',
    component: Marketing07EditingBasics,
    sequence: 7
  },
  {
    key: 'faith-and-action',
    subject: 'Bold creativity begins with obedience',
    component: Marketing10FaithAndAction,
    sequence: 10
  }
];

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

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Use ADMIN_TEST_EMAIL specifically for this resend
    const adminEmail = process.env.ADMIN_TEST_EMAIL;
    if (!adminEmail) {
      return NextResponse.json({
        success: false,
        error: 'ADMIN_TEST_EMAIL environment variable not configured'
      }, { status: 400 });
    }
    
    console.log('🔄 Resending failed emails 7 & 10 to:', adminEmail);
    
    const results = [];
    let sent = 0;
    let failed = 0;
    
    // Send each failed template
    for (const template of failedTemplates) {
      try {
        console.log(`📤 Resending: ${template.sequence}/10 - ${template.key} - "${template.subject}"`);
        
        // Render template with test data
        const baseUrl = process.env.BASE_URL || 'https://thebtcp.com';
        const htmlContent = await render(
          template.component({ 
            firstName: 'Parker',
            registerUrl: `${baseUrl}/register`
          }) as React.ReactElement
        );
        
        const plainTextContent = stripHtml(htmlContent);
        
        // Send via enhanced promotional email helper
        const emailData = await sendPromotionalEmail({
          to: adminEmail,
          subject: `[RETRY ${template.sequence}/10] ${template.subject}`,
          html: htmlContent,
          text: plainTextContent,
        });
        
        if (emailData.error) {
          throw new Error(`Resend error: ${emailData.error.message}`);
        }
        
        results.push({
          templateKey: template.key,
          subject: template.subject,
          messageId: emailData.data?.id,
          success: true,
          sequence: template.sequence
        });
        
        sent++;
        console.log(`✅ Sent ${template.sequence}/10: "${template.subject}" - ID: ${emailData.data?.id}`);
        
        // Delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 800));
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`❌ Failed ${template.sequence}/10 - ${template.key}:`, errorMessage);
        
        results.push({
          templateKey: template.key,
          subject: template.subject,
          success: false,
          error: errorMessage,
          sequence: template.sequence
        });
        
        failed++;
      }
    }
    
    const duration = Date.now() - startTime;
    console.log(`✅ Failed email retry completed in ${duration}ms`);
    console.log(`📊 Results: ${sent} sent, ${failed} failed`);
    
    return NextResponse.json({
      success: sent > 0,
      message: `Retry emails sent to ${adminEmail}`,
      stats: {
        attempted: failedTemplates.length,
        sent,
        failed,
        adminEmail
      },
      results: results.sort((a, b) => a.sequence - b.sequence),
      duration,
      note: 'These are clean retries of emails 7 and 10 that previously failed',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Failed email retry failed:', errorMessage);
    
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