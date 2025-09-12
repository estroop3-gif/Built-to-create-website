import { createClient } from '@supabase/supabase-js';
import { render } from '@react-email/render';
import { resend, emailConfig } from '@/lib/emailClient';
import { checklistUrlForLead } from '@/lib/linkToken';
import Email1Welcome from '../../emails/Email1Welcome';
import Email2Story from '../../emails/Email2Story';
import Email3ManualMode from '../../emails/Email3ManualMode';

// Email service using Resend with React email templates
class EmailService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  private getRegisterUrl(sequenceStage: number = 0): string {
    return this.addUtmParams('https://thebtcp.com/register', {
      utm_source: 'email',
      utm_medium: 'sequence', 
      utm_campaign: 'pretrip_emails',
      utm_content: `stage_${sequenceStage}`
    });
  }

  private getUnsubscribeUrl(email: string): string {
    return `https://thebtcp.com/api/unsubscribe?email=${encodeURIComponent(email)}`;
  }

  async sendWelcomeEmail(email: string, firstName: string | null) {
    try {
      // Generate signed checklist URL for this specific lead
      const checklistUrl = checklistUrlForLead(`lead:${email}`);
      const registerUrl = this.getRegisterUrl(0);
      const unsubscribeUrl = this.getUnsubscribeUrl(email);
      
      const emailHtml = render(Email1Welcome({
        firstName: firstName || undefined,
        checklistUrl,
        registerUrl,
        unsubscribeUrl
      }));

      const response = await resend.emails.send({
        from: emailConfig.from,
        to: [email],
        subject: 'Welcome to Born to Create Project',
        html: emailHtml,
        replyTo: emailConfig.replyTo
      });

      // Log the send event
      await this.logEmailEvent(email, 'sent', 0, 'Welcome to Born to Create Project', response.data?.id);
      
      return { success: true, messageId: response.data?.id };
    } catch (error) {
      console.error('Welcome email send error:', error);
      await this.logEmailEvent(email, 'send_failed', 0, 'Welcome to Born to Create Project', null, { error: error.message });
      return { success: false, error: error.message };
    }
  }

  async sendSequenceEmail(
    email: string, 
    firstName: string | null, 
    sequenceStage: number
  ) {
    try {
      const registerUrl = this.getRegisterUrl(sequenceStage);
      const unsubscribeUrl = this.getUnsubscribeUrl(email);
      
      let emailHtml: string;
      let subject: string;
      
      switch (sequenceStage) {
        case 1:
          emailHtml = render(Email2Story({
            firstName: firstName || undefined,
            registerUrl,
            unsubscribeUrl
          }));
          subject = 'Why we built Born to Create Project';
          break;
          
        case 2:
          emailHtml = render(Email3ManualMode({
            firstName: firstName || undefined,
            registerUrl,
            unsubscribeUrl
          }));
          subject = 'Manual Mode made simple';
          break;
          
        // Add more cases for additional email templates as needed
        default:
          console.error(`Template not implemented for stage ${sequenceStage}`);
          return { success: false, error: 'Template not implemented' };
      }

      const response = await resend.emails.send({
        from: emailConfig.from,
        to: [email],
        subject,
        html: emailHtml,
        replyTo: emailConfig.replyTo
      });

      // Log the send event
      await this.logEmailEvent(email, 'sent', sequenceStage, subject, response.data?.id);
      
      return { success: true, messageId: response.data?.id };
    } catch (error) {
      console.error(`Sequence email send error (stage ${sequenceStage}):`, error);
      await this.logEmailEvent(email, 'send_failed', sequenceStage, `Stage ${sequenceStage}`, null, { error: error.message });
      return { success: false, error: error.message };
    }
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