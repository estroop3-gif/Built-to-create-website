import { NextRequest, NextResponse } from 'next/server';
import { render } from '@react-email/render';
import { createClient } from '@supabase/supabase-js';

// Import all marketing email templates
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

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Template definitions with comprehensive metadata
const marketingTemplates = [
  {
    template_key: 'welcome-call',
    subject: 'Your creativity is a calling',
    preview_text: 'Start here and build with us',
    order_sequence: 1,
    component: Marketing01Welcome,
    category: 'marketing',
    tags: ['welcome', 'foundational', 'calling', 'intro']
  },
  {
    template_key: 'manual-camera',
    subject: 'Manual camera made simple',
    preview_text: 'Master exposure with three decisions',
    order_sequence: 2,
    component: Marketing02ManualMode,
    category: 'marketing',
    tags: ['technical', 'manual-mode', 'exposure', 'fundamentals']
  },
  {
    template_key: 'lens-anatomy',
    subject: 'Anatomy of a lens and how to operate it',
    preview_text: 'Focal length, focus, aperture, stabilization',
    order_sequence: 3,
    component: Marketing03LensAnatomy,
    category: 'marketing',
    tags: ['technical', 'lenses', 'focal-length', 'operation']
  },
  {
    template_key: 'story-basics',
    subject: 'A simple story structure you can shoot today',
    preview_text: 'Clear beginning, middle, and end',
    order_sequence: 4,
    component: Marketing04StoryBasics,
    category: 'marketing',
    tags: ['storytelling', 'structure', 'narrative', 'fundamentals']
  },
  {
    template_key: 'lighting-basics',
    subject: 'Natural lighting that shapes the story',
    preview_text: 'Shape contrast, not just exposure',
    order_sequence: 5,
    component: Marketing05LightingBasics,
    category: 'marketing',
    tags: ['lighting', 'natural-light', 'contrast', 'mood']
  },
  {
    template_key: 'sound-basics',
    subject: 'Capturing clean dialogue anywhere',
    preview_text: 'Simple tools for professional audio',
    order_sequence: 6,
    component: Marketing06SoundBasics,
    category: 'marketing',
    tags: ['audio', 'dialogue', 'recording', 'equipment']
  },
  {
    template_key: 'editing-basics',
    subject: 'A calm path from mess to message',
    preview_text: 'Organize, assemble, refine',
    order_sequence: 7,
    component: Marketing07EditingBasics,
    category: 'marketing',
    tags: ['editing', 'post-production', 'workflow', 'organization']
  },
  {
    template_key: 'color-basics',
    subject: 'A simple color pipeline you can repeat',
    preview_text: 'Consistent color without complexity',
    order_sequence: 8,
    component: Marketing08ColorBasics,
    category: 'marketing',
    tags: ['color', 'grading', 'pipeline', 'consistency']
  },
  {
    template_key: 'interviews',
    subject: 'Questions that go below the surface',
    preview_text: 'Create connection through conversation',
    order_sequence: 9,
    component: Marketing09Interviews,
    category: 'marketing',
    tags: ['interviews', 'questions', 'connection', 'technique']
  },
  {
    template_key: 'faith-and-action',
    subject: 'Bold creativity begins with obedience',
    preview_text: 'Your next step awaits',
    order_sequence: 10,
    component: Marketing10FaithAndAction,
    category: 'marketing',
    tags: ['faith', 'action', 'calling', 'next-steps']
  }
];

// Helper function to strip HTML tags for plain text
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
    console.log('🌱 Seeding marketing email templates...');
    console.log(`📧 Processing ${marketingTemplates.length} templates`);
    
    const results = [];
    let inserted = 0;
    let updated = 0;
    let errors = 0;
    
    // Process each template
    for (const template of marketingTemplates) {
      try {
        console.log(`📝 Processing: ${template.template_key} - "${template.subject}"`);
        
        // Render the template to get HTML and plain text content
        const baseUrl = process.env.BASE_URL || 'https://thebtcp.com';
        const registerUrl = `${baseUrl}/register`;
        
        const htmlContent = await render(template.component({ 
          firstName: 'Friend',
          registerUrl
        }));
        
        const plainTextContent = stripHtml(htmlContent);
        
        // Insert or update template in database
        const { data, error } = await supabase
          .from('email_templates')
          .upsert({
            template_key: template.template_key,
            subject: template.subject,
            preview_text: template.preview_text,
            html_content: htmlContent,
            plain_text_content: plainTextContent,
            order_sequence: template.order_sequence,
            active: true,
            category: template.category,
            tags: template.tags,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'template_key'
          })
          .select();
        
        if (error) {
          throw error;
        }
        
        results.push({
          templateKey: template.template_key,
          subject: template.subject,
          success: true,
          sequence: template.order_sequence,
          action: data && data.length > 0 ? 'upserted' : 'inserted'
        });
        
        if (data && data.length > 0) {
          updated++;
        } else {
          inserted++;
        }
        
        console.log(`✅ Processed ${template.order_sequence}/10: "${template.subject}"`);
        
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
        
        errors++;
      }
    }
    
    const duration = Date.now() - startTime;
    console.log(`✅ Template seeding completed in ${duration}ms`);
    console.log(`📊 Results: ${inserted} inserted, ${updated} updated, ${errors} errors`);
    
    return NextResponse.json({
      success: errors === 0,
      message: `Marketing templates seeded successfully`,
      stats: {
        total: marketingTemplates.length,
        inserted,
        updated,
        errors
      },
      results: results.sort((a, b) => a.sequence - b.sequence),
      duration,
      next_steps: [
        'Test with: POST /api/admin/marketing/test-all-emails',
        'Run automation: POST /api/cron/marketing-emails'
      ],
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Template seeding failed:', errorMessage);
    
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