import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Email service abstraction for Resend
class EmailService {
  private supabase;
  private resend: Resend;
  private fromEmail: string;
  private replyToEmail: string;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.fromEmail = process.env.SEND_FROM || 'parker@thebtcp.com';
    this.replyToEmail = process.env.SEND_REPLY_TO || 'parker@thebtcp.com';
  }

  async sendEmail(
    to: string,
    subject: string,
    html: string,
    sequenceStage?: number
  ) {
    // Add UTM parameters to register URL in HTML content
    const registerUrl = this.addUtmParams('https://thebtcp.com/register', {
      utm_source: 'email',
      utm_medium: 'sequence', 
      utm_campaign: 'pretrip_emails',
      utm_content: `stage_${sequenceStage || 0}`
    });

    // Replace register_url placeholder in HTML
    const processedHtml = html.replace(/{{register_url}}/g, registerUrl);

    try {
      const response = await this.resend.emails.send({
        from: `Parker at Born to Create Project <${this.fromEmail}>`,
        to: [to],
        subject,
        html: processedHtml,
        replyTo: this.replyToEmail
      });
      
      // Log the send event
      if (sequenceStage !== undefined) {
        await this.logEmailEvent(to, 'sent', sequenceStage, subject, response.data?.id);
      }
      
      return { success: true, messageId: response.data?.id };
    } catch (error) {
      console.error('Resend error:', error);
      
      // Log the error
      if (sequenceStage !== undefined) {
        await this.logEmailEvent(to, 'send_failed', sequenceStage, subject, null, { error: error.message });
      }
      
      return { success: false, error: error.message };
    }
  }

  async sendWelcomeEmail(email: string, firstName: string | null) {
    const { emailTemplates } = await import('./email-templates');
    const template = emailTemplates[0];
    
    if (!template) {
      throw new Error('Welcome email template not found');
    }

    const leadMagnetUrl = 'https://thebtcp.com/downloads/filmmaker-gear-checklist.pdf';
    const html = template.html(firstName || 'there', leadMagnetUrl);
    
    // Add unsubscribe link
    const unsubscribeUrl = `https://thebtcp.com/api/unsubscribe?email=${encodeURIComponent(email)}`;
    const processedHtml = html.replace(/{{unsubscribe_url}}/g, unsubscribeUrl);
    
    return this.sendEmail(email, template.subject, processedHtml, 0);
  }

  async sendSequenceEmail(
    email: string, 
    firstName: string | null, 
    sequenceStage: number
  ) {
    const { emailTemplates } = await import('./email-templates');
    const template = emailTemplates[sequenceStage as keyof typeof emailTemplates];
    
    if (!template) {
      console.error(`Template not found for stage ${sequenceStage}`);
      return { success: false, error: 'Template not found' };
    }

    const html = template.html(firstName || 'there');
    
    // Add unsubscribe link
    const unsubscribeUrl = `https://thebtcp.com/api/unsubscribe?email=${encodeURIComponent(email)}`;
    const processedHtml = html.replace(/{{unsubscribe_url}}/g, unsubscribeUrl);
    
    return this.sendEmail(email, template.subject, processedHtml, sequenceStage);
  }

  private addUtmParams(url: string, params: Record<string, string>): string {
    const urlObj = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value);
    });
    return urlObj.toString();
  }

  private async logEmailEvent(
    email: string,
    eventType: string,
    sequenceStage?: number,
    templateId?: string,
    messageId?: string,
    metadata?: any
  ) {
    try {
      // Get lead_id from email
      const { data: lead } = await this.supabase
        .from('leads')
        .select('id')
        .eq('email', email)
        .single();

      if (lead) {
        await this.supabase
          .from('email_events')
          .insert({
            lead_id: lead.id,
            email_address: email,
            event_type: eventType,
            sequence_stage: sequenceStage,
            template_id: templateId,
            message_id: messageId,
            ...(metadata && { metadata })
          });
      }
    } catch (error) {
      console.error('Error logging email event:', error);
    }
  }

  async handleWebhookEvent(event: any) {
    const eventType = event.type;
    const emailData = event.data;
    const email = emailData?.to?.[0] || emailData?.email;
    const messageId = emailData?.email_id || event.id;

    // Log the event
    await this.logEmailEvent(email, eventType, undefined, undefined, messageId);

    // Handle specific Resend events
    switch (eventType) {
      case 'email.bounced':
      case 'email.complaint':
        // Disable further emails for this lead
        if (email) {
          await this.supabase
            .from('leads')
            .update({ consent_marketing: false })
            .eq('email', email);
        }
        break;
      
      case 'email.delivered':
        // Email was successfully delivered
        break;
        
      case 'email.opened':
        // Email was opened - good for engagement tracking
        break;
        
      case 'email.clicked':
        // Link was clicked - great for conversion tracking
        break;
    }
  }

  // Calculate next send time based on sequence stage
  getNextSendTime(sequenceStage: number): Date {
    const now = new Date();
    const intervals = {
      0: 0,      // Send immediately (welcome)
      1: 3,      // 3 days
      2: 7,      // 7 days  
      3: 7,      // 7 days
      4: 7,      // 7 days
      5: 9,      // 9 days
      6: 15,     // 15 days
      7: 15,     // 15 days
      8: 30,     // 30 days (or retreat date minus 30)
      9: 7       // 7 days (scarcity email)
    };

    const daysToAdd = intervals[sequenceStage as keyof typeof intervals] || 0;
    now.setDate(now.getDate() + daysToAdd);
    return now;
  }
}

export const emailService = new EmailService();