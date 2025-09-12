import { NextRequest, NextResponse } from 'next/server';
import { render } from '@react-email/render';
import { resend, emailConfig } from '@/lib/emailClient';

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

const templateConfigs = [
  {
    key: 'welcome-call',
    subject: 'Your creativity is a calling',
    component: Marketing01Welcome,
    sequence: 1
  },
  {
    key: 'manual-camera',
    subject: 'Manual camera made simple',
    component: Marketing02ManualMode,
    sequence: 2
  },
  {
    key: 'lens-anatomy',
    subject: 'Anatomy of a lens and how to operate it',
    component: Marketing03LensAnatomy,
    sequence: 3
  },
  {
    key: 'story-basics',
    subject: 'A simple story structure you can shoot today',
    component: Marketing04StoryBasics,
    sequence: 4
  },
  {
    key: 'lighting-basics',
    subject: 'Natural lighting that shapes the story',
    component: Marketing05LightingBasics,
    sequence: 5
  },
  {
    key: 'sound-basics',
    subject: 'Capturing clean dialogue anywhere',
    component: Marketing06SoundBasics,
    sequence: 6
  },
  {
    key: 'editing-basics',
    subject: 'A calm path from mess to message',
    component: Marketing07EditingBasics,
    sequence: 7
  },
  {
    key: 'color-basics',
    subject: 'A simple color pipeline you can repeat',
    component: Marketing08ColorBasics,
    sequence: 8
  },
  {
    key: 'interviews',
    subject: 'Questions that go below the surface',
    component: Marketing09Interviews,
    sequence: 9
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
    // Get admin test email from environment
    const adminEmail = process.env.ADMIN_TEST_EMAIL || process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      return NextResponse.json({
        success: false,
        error: 'ADMIN_TEST_EMAIL or ADMIN_EMAIL environment variable not configured'
      }, { status: 400 });
    }
    
    console.log('🧪 Starting test sequence email blast to:', adminEmail);
    console.log(`📬 Sending ${templateConfigs.length} emails via Resend`);
    
    const results = [];
    let sent = 0;
    let failed = 0;
    
    // Send each template to admin
    for (const template of templateConfigs) {
      try {
        console.log(`📤 Testing: ${template.sequence}/10 - ${template.key} - "${template.subject}"`);
        
        // Render template with test data
        const baseUrl = process.env.BASE_URL || 'https://thebtcp.com';
        const htmlContent = await render(template.component({ 
          firstName: 'Parker',
          registerUrl: `${baseUrl}/register`
        }));
        
        const plainTextContent = stripHtml(htmlContent);
        
        // Send via Resend with test prefix
        const emailData = await resend.emails.send({
          from: process.env.FROM_EMAIL || emailConfig.from,
          to: adminEmail,
          subject: `[TEST ${template.sequence}/10] ${template.subject}`,
          html: htmlContent,
          text: plainTextContent,
          headers: {
            'X-Preview-Text': `Test email for ${template.key} - Marketing sequence ${template.sequence}/10`,
          },
          tags: [
            { name: 'type', value: 'admin-test-sequence' },
            { name: 'template', value: template.key },
            { name: 'sequence', value: template.sequence.toString() }
          ]
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
        
        // Delay to respect Resend's 2 req/sec rate limit
        await new Promise(resolve => setTimeout(resolve, 600));
        
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
    console.log(`✅ Test sequence blast completed in ${duration}ms`);
    console.log(`📊 Results: ${sent} sent, ${failed} failed`);
    
    return NextResponse.json({
      success: true,
      message: `Test sequence emails sent successfully to ${adminEmail}`,
      stats: {
        total: templateConfigs.length,
        sent,
        failed,
        adminEmail
      },
      results: results.sort((a, b) => a.sequence - b.sequence),
      duration,
      resendProvider: 'Resend API',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Test sequence email blast failed:', errorMessage);
    
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