import { Resend } from 'resend';
import { generateUnsubscribeUrl } from './token';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const CONTACT_INBOX_EMAIL = process.env.CONTACT_INBOX_EMAIL || 'parker@thebtcp.com';
export const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'contact@mail.thebtcp.com';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  isTransactional?: boolean; // If true, omits unsubscribe headers
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

/**
 * Enhanced sendMail helper that ensures deliverability best practices
 */
export async function sendMail(options: SendMailOptions) {
  const {
    to,
    subject,
    html,
    text,
    isTransactional = false,
    replyTo,
    attachments,
  } = options;

  // Generate text version if not provided
  const plainText = text || htmlToText(html);

  // Prepare headers
  const headers: Record<string, string> = {};

  // Add unsubscribe headers for promotional emails
  if (!isTransactional) {
    // For promotional emails, add List-Unsubscribe headers
    const recipientEmail = Array.isArray(to) ? to[0] : to;
    const unsubscribeUrl = generateUnsubscribeUrl(recipientEmail);

    headers['List-Unsubscribe'] = `<mailto:unsubscribe@thebtcp.com?subject=unsubscribe>, <${unsubscribeUrl}>`;
    headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
  }

  // Prepare the email payload
  const emailPayload = {
    from: `Born to Create Project <${CONTACT_FROM_EMAIL}>`,
    to,
    subject,
    html,
    text: plainText,
    headers,
    ...(replyTo && { replyTo }),
    ...(attachments && { attachments }),
  };

  try {
    const result = await resend.emails.send(emailPayload);

    console.log(`Email sent successfully:`, {
      id: result.data?.id,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      isTransactional,
    });

    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

/**
 * Simple HTML to text converter
 * For production, consider using a library like 'html-to-text'
 */
function htmlToText(html: string): string {
  return html
    // Remove script and style elements
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    // Convert common HTML elements to text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    // Convert links to text with URL
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '$2 ($1)')
    // Remove all remaining HTML tags
    .replace(/<[^>]*>/g, '')
    // Clean up whitespace
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Normalize line breaks
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

/**
 * Send a transactional email (no unsubscribe headers)
 */
export async function sendTransactionalEmail(options: Omit<SendMailOptions, 'isTransactional'>) {
  return sendMail({ ...options, isTransactional: true });
}

/**
 * Send a promotional/marketing email (includes unsubscribe headers)
 */
export async function sendPromotionalEmail(options: Omit<SendMailOptions, 'isTransactional'>) {
  return sendMail({ ...options, isTransactional: false });
}