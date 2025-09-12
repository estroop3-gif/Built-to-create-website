import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { render } from '@react-email/render';
import { resend, emailConfig } from '@/lib/emailClient';

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

// Template component mapping
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

interface EmailTemplate {
  template_key: string;
  subject: string;
  preview_text: string;
  html_content: string;
  plain_text_content: string;
  order_sequence: number;
}

interface Subscriber {
  lead_id: string;
  email: string;
  first_name: string | null;
  signup_date: string;
  days_since_signup: number;
  last_sent_at: string;
  next_template_key: string;
}

interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  templateKey: string;
  subscriberEmail: string;
}

class MarketingEmailService {
  private supabase;
  
  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase credentials not configured');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  // Helper function to strip HTML tags for plain text
  private stripHtml(html: string): string {
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

  // Get subscribers ready for their next email based on cadence
  async getSubscribersReadyForEmail(limit: number = 50): Promise<Subscriber[]> {
    const { data, error } = await this.supabase.rpc('get_subscribers_ready_for_email', {
      p_reference_date: '2025-02-20T00:00:00Z',
      p_limit: limit
    });
    
    if (error) {
      console.error('Error getting subscribers ready for email:', error);
      throw error;
    }
    
    return data || [];
  }

  // Get next unsent template for a subscriber
  async getNextTemplateForSubscriber(subscriberEmail: string): Promise<EmailTemplate | null> {
    const { data, error } = await this.supabase.rpc('get_next_unsent_template', {
      p_subscriber_email: subscriberEmail
    });
    
    if (error) {
      console.error('Error getting next template:', error);
      return null;
    }
    
    return data?.[0] || null;
  }

  // Render email template with dynamic content
  async renderEmailTemplate(templateKey: string, firstName: string = 'Friend'): Promise<{ html: string; text: string } | null> {
    const TemplateComponent = templateComponents[templateKey];
    
    if (!TemplateComponent) {
      console.error(`Template component not found for: ${templateKey}`);
      return null;
    }
    
    try {
      const baseUrl = process.env.BASE_URL || 'https://thebtcp.com';
      const registerUrl = `${baseUrl}/register`;
      
      const htmlContent = await render(TemplateComponent({ 
        firstName,
        registerUrl
      }));
      
      const plainTextContent = this.stripHtml(htmlContent);
      
      return {
        html: htmlContent,
        text: plainTextContent
      };
    } catch (error) {
      console.error(`Error rendering template ${templateKey}:`, error);
      return null;
    }
  }

  // Log email send to database
  async logEmailSend(
    templateKey: string,
    subscriberEmail: string,
    subscriberFirstName: string | null,
    status: 'sent' | 'delivered' | 'bounced' | 'failed',
    resendMessageId?: string,
    errorMessage?: string
  ): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('email_sends')
        .insert({
          template_key: templateKey,
          subscriber_email: subscriberEmail,
          subscriber_first_name: subscriberFirstName,
          delivery_status: status,
          resend_message_id: resendMessageId,
          error_message: errorMessage,
          utm_source: 'email',
          utm_medium: 'marketing',
          utm_campaign: 'costa-rica-retreat',
        });
      
      if (error && error.code !== '23505') { // Ignore unique constraint violations
        console.error('Error logging email send:', error);
      }
    } catch (error) {
      console.error('Error in logEmailSend:', error);
    }
  }

  // Send individual marketing email
  async sendMarketingEmail(
    subscriber: Subscriber,
    dryRun: boolean = false
  ): Promise<EmailSendResult> {
    const { email, first_name: firstName, next_template_key: templateKey } = subscriber;
    
    try {
      // Get template data
      const template = await this.getNextTemplateForSubscriber(email);
      if (!template) {
        return {
          success: false,
          error: 'No template available',
          templateKey,
          subscriberEmail: email
        };
      }
      
      // Render email content
      const renderedContent = await this.renderEmailTemplate(templateKey, firstName || 'Friend');
      if (!renderedContent) {
        return {
          success: false,
          error: 'Failed to render template',
          templateKey,
          subscriberEmail: email
        };
      }
      
      if (dryRun) {
        console.log(`[DRY RUN] Would send "${template.subject}" to ${email}`);
        return {
          success: true,
          templateKey,
          subscriberEmail: email
        };
      }
      
      // Send via Resend
      const fromEmail = process.env.FROM_EMAIL || emailConfig.from;
      const emailData = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: template.subject,
        html: renderedContent.html,
        text: renderedContent.text,
        headers: {
          'X-Preview-Text': template.preview_text,
        },
        tags: [
          { name: 'campaign', value: 'costa-rica-retreat' },
          { name: 'template', value: templateKey },
          { name: 'sequence', value: template.order_sequence.toString() }
        ]
      });
      
      if (emailData.error) {
        await this.logEmailSend(templateKey, email, firstName, 'failed', undefined, emailData.error.message);
        return {
          success: false,
          error: emailData.error.message,
          templateKey,
          subscriberEmail: email
        };
      }
      
      // Log successful send
      await this.logEmailSend(templateKey, email, firstName, 'sent', emailData.data?.id);
      
      return {
        success: true,
        messageId: emailData.data?.id,
        templateKey,
        subscriberEmail: email
      };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error sending email to ${email}:`, errorMessage);
      
      await this.logEmailSend(templateKey, email, firstName, 'failed', undefined, errorMessage);
      
      return {
        success: false,
        error: errorMessage,
        templateKey,
        subscriberEmail: email
      };
    }
  }

  // Process batch of marketing emails
  async processBatchEmails(limit: number = 50, dryRun: boolean = false): Promise<{
    processed: number;
    sent: number;
    failed: number;
    results: EmailSendResult[];
    duration: number;
  }> {
    const startTime = Date.now();
    
    try {
      console.log(`📧 Processing marketing emails (limit: ${limit}, dryRun: ${dryRun})`);
      
      // Get subscribers ready for email
      const subscribers = await this.getSubscribersReadyForEmail(limit);
      
      if (subscribers.length === 0) {
        return {
          processed: 0,
          sent: 0,
          failed: 0,
          results: [],
          duration: Date.now() - startTime
        };
      }
      
      console.log(`📬 Found ${subscribers.length} subscribers ready for email`);
      
      const results: EmailSendResult[] = [];
      let sent = 0;
      let failed = 0;
      
      // Process each subscriber
      for (const subscriber of subscribers) {
        const result = await this.sendMarketingEmail(subscriber, dryRun);
        results.push(result);
        
        if (result.success) {
          sent++;
          console.log(`✅ Sent "${result.templateKey}" to ${subscriber.email}`);
        } else {
          failed++;
          console.log(`❌ Failed "${result.templateKey}" to ${subscriber.email}: ${result.error}`);
        }
        
        // Rate limiting delay - adjusted for Resend's 2 req/sec limit
        if (!dryRun) {
          await new Promise(resolve => setTimeout(resolve, 600));
        }
      }
      
      const duration = Date.now() - startTime;
      console.log(`📊 Batch complete: ${sent} sent, ${failed} failed in ${duration}ms`);
      
      return {
        processed: subscribers.length,
        sent,
        failed,
        results,
        duration
      };
      
    } catch (error) {
      console.error('Error in processBatchEmails:', error);
      throw error;
    }
  }

  // Get marketing email statistics
  async getEmailStats(): Promise<{
    totalTemplates: number;
    totalSends: number;
    totalSubscribers: number;
    templateStats: Array<{
      template_key: string;
      total_sent: number;
      total_delivered: number;
      total_opened: number;
      total_clicked: number;
    }>;
  }> {
    try {
      // Get template count
      const { count: templateCount } = await this.supabase
        .from('email_templates')
        .select('*', { count: 'exact' })
        .eq('category', 'marketing')
        .eq('active', true);
      
      // Get total sends
      const { count: sendCount } = await this.supabase
        .from('email_sends')
        .select('*', { count: 'exact' });
      
      // Get subscriber count
      const { count: subscriberCount } = await this.supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .eq('consent_marketing', true)
        .eq('registered', false);
      
      // Get template analytics
      const { data: templateStats } = await this.supabase
        .from('email_template_analytics')
        .select('*')
        .order('total_sent', { ascending: false });
      
      return {
        totalTemplates: templateCount || 0,
        totalSends: sendCount || 0,
        totalSubscribers: subscriberCount || 0,
        templateStats: templateStats || []
      };
    } catch (error) {
      console.error('Error getting email stats:', error);
      throw error;
    }
  }
}

export const marketingEmailService = new MarketingEmailService();
export default MarketingEmailService;