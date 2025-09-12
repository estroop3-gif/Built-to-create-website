import { render } from '@react-email/render';
import { createClient } from '@supabase/supabase-js';

// Import all marketing email templates
import Marketing01Welcome from '../src/emails/Marketing01Welcome';
import Marketing02ManualMode from '../src/emails/Marketing02ManualMode';
import Marketing03LensAnatomy from '../src/emails/Marketing03LensAnatomy';
import Marketing04StoryBasics from '../src/emails/Marketing04StoryBasics';
import Marketing05LightingBasics from '../src/emails/Marketing05LightingBasics';
import Marketing06SoundBasics from '../src/emails/Marketing06SoundBasics';
import Marketing07EditingBasics from '../src/emails/Marketing07EditingBasics';
import Marketing08ColorBasics from '../src/emails/Marketing08ColorBasics';
import Marketing09Interviews from '../src/emails/Marketing09Interviews';
import Marketing10FaithAndAction from '../src/emails/Marketing10FaithAndAction';

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
    subject: 'Story building basics for short films',
    preview_text: 'A simple structure you can shoot today',
    order_sequence: 4,
    component: Marketing04StoryBasics,
    category: 'marketing',
    tags: ['storytelling', 'structure', 'narrative', 'documentary']
  },
  {
    template_key: 'lighting-basics',
    subject: 'Lighting that serves the story',
    preview_text: 'Shape contrast, not just exposure',
    order_sequence: 5,
    component: Marketing05LightingBasics,
    category: 'marketing',
    tags: ['lighting', 'natural-light', 'cinematography', 'mood']
  },
  {
    template_key: 'sound-basics',
    subject: 'Sound that speaks the truth',
    preview_text: 'Capturing clean dialogue anywhere',
    order_sequence: 6,
    component: Marketing06SoundBasics,
    category: 'marketing',
    tags: ['audio', 'sound-recording', 'dialogue', 'technical']
  },
  {
    template_key: 'editing-basics',
    subject: 'Editing without overwhelm',
    preview_text: 'A calm path from mess to message',
    order_sequence: 7,
    component: Marketing07EditingBasics,
    category: 'marketing',
    tags: ['post-production', 'editing', 'workflow', 'storytelling']
  },
  {
    template_key: 'color-basics',
    subject: 'Color that breathes life into skin tones',
    preview_text: 'A simple pipeline you can repeat',
    order_sequence: 8,
    component: Marketing08ColorBasics,
    category: 'marketing',
    tags: ['color-grading', 'post-production', 'skin-tones', 'workflow']
  },
  {
    template_key: 'interviews',
    subject: 'The interview that unlocks the story',
    preview_text: 'Questions that go below the surface',
    order_sequence: 9,
    component: Marketing09Interviews,
    category: 'marketing',
    tags: ['interviews', 'questions', 'documentary', 'technique']
  },
  {
    template_key: 'faith-and-action',
    subject: 'It is time to step out in faith',
    preview_text: 'Bold creativity begins with obedience',
    order_sequence: 10,
    component: Marketing10FaithAndAction,
    category: 'marketing',
    tags: ['faith', 'calling', 'action', 'final', 'registration']
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

async function seedMarketingEmails() {
  console.log('🚀 Starting comprehensive email template seed...');
  
  let seeded = 0;
  let updated = 0;
  let errors = 0;
  
  for (const template of marketingTemplates) {
    try {
      console.log(`📧 Processing: ${template.template_key} - "${template.subject}"`);
      
      // Render HTML content with sample props
      const htmlContent = await render(
        template.component({ 
          firstName: 'Friend',
          registerUrl: `${process.env.BASE_URL || 'https://thebtcp.com'}/register`
        }) as React.ReactElement
      );
      
      // Generate plain text content
      const plainTextContent = stripHtml(htmlContent);
      
      // Check if template already exists
      const { data: existingTemplate, error: checkError } = await supabase
        .from('email_templates')
        .select('id, updated_at')
        .eq('template_key', template.template_key)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }
      
      const templateData = {
        template_key: template.template_key,
        subject: template.subject,
        preview_text: template.preview_text,
        html_content: htmlContent,
        plain_text_content: plainTextContent,
        order_sequence: template.order_sequence,
        category: template.category,
        tags: template.tags,
        active: true,
        updated_at: new Date().toISOString()
      };
      
      if (existingTemplate) {
        // Update existing template
        const { error: updateError } = await supabase
          .from('email_templates')
          .update(templateData)
          .eq('template_key', template.template_key);
        
        if (updateError) throw updateError;
        
        console.log(`✅ Updated: ${template.template_key}`);
        updated++;
      } else {
        // Insert new template
        const { error: insertError } = await supabase
          .from('email_templates')
          .insert({
            ...templateData,
            created_at: new Date().toISOString()
          });
        
        if (insertError) throw insertError;
        
        console.log(`✅ Created: ${template.template_key}`);
        seeded++;
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${template.template_key}:`, error);
      errors++;
    }
  }
  
  console.log(`\n📊 Seed Summary:`);
  console.log(`   • Created: ${seeded} templates`);
  console.log(`   • Updated: ${updated} templates`);
  console.log(`   • Errors: ${errors} templates`);
  console.log(`   • Total processed: ${seeded + updated + errors}/${marketingTemplates.length}`);
  
  // Update analytics for all templates
  console.log(`\n🔄 Updating template analytics...`);
  
  for (const template of marketingTemplates) {
    try {
      const { error } = await supabase.rpc('update_template_analytics', {
        p_template_key: template.template_key
      });
      
      if (error) {
        console.warn(`⚠️ Analytics update failed for ${template.template_key}:`, error.message);
      }
    } catch (error) {
      console.warn(`⚠️ Analytics update error for ${template.template_key}`);
    }
  }
  
  // Display final template list
  const { data: finalTemplates, error: queryError } = await supabase
    .from('email_templates')
    .select('template_key, subject, active, order_sequence, category')
    .eq('category', 'marketing')
    .order('order_sequence');
  
  if (queryError) {
    console.error('❌ Error querying final templates:', queryError);
  } else {
    console.log(`\n📧 Marketing Email Sequence (${finalTemplates?.length || 0} templates):`);
    finalTemplates?.forEach((template, index) => {
      const status = template.active ? '✅' : '❌';
      console.log(`   ${index + 1}. ${status} ${template.template_key}: "${template.subject}"`);
    });
  }
  
  console.log(`\n🎉 Email template seed completed successfully!`);
  console.log(`\n💡 Next steps:`);
  console.log(`   • Run database migration: supabase/migrations/002_email_marketing_templates.sql`);
  console.log(`   • Test templates: POST /api/test/sendMarketingToAdmin`);
  console.log(`   • Setup cron job: /api/cron/marketing-emails`);
  console.log(`   • Configure environment variables for production`);
}

// Run the seed function if called directly
if (require.main === module) {
  seedMarketingEmails()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Seed failed:', error);
      process.exit(1);
    });
}

export { seedMarketingEmails };
export default seedMarketingEmails;