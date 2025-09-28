import { sendTransactionalEmail } from '@/lib/resend';
import { render } from '@react-email/render';
import React from 'react';

export const emailConfig = {
  from: 'Born to Create Project <noreply@thebtcp.com>',
  replyTo: 'parker@thebtcp.com',
} as const;

// Get seed list for notifications (ops team)
function getSeedList(): string[] {
  const seedList = process.env.SEED_LIST;
  if (!seedList) return [];
  return seedList.split(',').map(email => email.trim()).filter(Boolean);
}

// Check if notifications should be sent
function shouldSendNotifications(): boolean {
  return process.env.SEND_NOTIFICATIONS !== 'false';
}

interface InternalNotificationOptions {
  to: string | string[];
  subject: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  template: React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  templateProps: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  textTemplate?: (props: any) => string;
}

export async function sendInternalNotification({
  to,
  subject,
  template: Template,
  templateProps,
  textTemplate
}: InternalNotificationOptions) {
  // Skip if notifications disabled
  if (!shouldSendNotifications()) {
    console.log('Internal notifications disabled, skipping email');
    return { success: true, skipped: true };
  }

  try {
    // Prepare recipient list
    const recipients = Array.isArray(to) ? to : [to];
    const seedList = getSeedList();
    const allRecipients = [...new Set([...recipients, ...seedList])];

    // Render HTML template
    const html = await render(React.createElement(Template, templateProps));
    
    // Generate text version
    let text: string | undefined;
    if (textTemplate) {
      text = textTemplate(templateProps);
    }

    // Send email using transactional helper
    const result = await sendTransactionalEmail({
      to: allRecipients,
      subject,
      html,
      text,
      replyTo: emailConfig.replyTo,
    });

    if (result.error) {
      console.error('Internal notification email error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log(`Internal notification sent to: ${allRecipients.join(', ')}`);
    return {
      success: true,
      messageId: result.data?.id,
      recipients: allRecipients.length,
      seedListIncluded: seedList.length > 0
    };

  } catch (error) {
    console.error('Internal notification send error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}