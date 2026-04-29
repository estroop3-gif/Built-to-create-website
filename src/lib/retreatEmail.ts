// src/lib/retreatEmail.ts

import { sendTransactionalEmail } from '@/lib/resend';
import type { RetreatRegistration } from '@/lib/types/retreatRegistration';

// Host email for notifications - change this to your actual email
const HOST_EMAIL = process.env.RETREAT_HOST_EMAIL || 'estroop3@gmail.com';

interface SendConfirmationEmailParams {
  registration: RetreatRegistration;
}

interface SendHostNotificationParams {
  registration: RetreatRegistration;
}

/**
 * Send confirmation email to the attendee
 */
export async function sendAttendeeConfirmationEmail({ registration }: SendConfirmationEmailParams) {
  const subject = `You're registered for ${registration.retreat_name}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #2d5a3d 0%, #3d7a50 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">You're In!</h1>
  </div>

  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Hi ${registration.full_name},</p>

    <p style="margin-bottom: 20px;">
      Your registration for <strong>${registration.retreat_name}</strong> has been confirmed.
    </p>

    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="margin-top: 0; color: #2d5a3d;">Registration Details</h3>
      <p style="margin: 5px 0;"><strong>Name:</strong> ${registration.full_name}</p>
      <p style="margin: 5px 0;"><strong>Retreat:</strong> ${registration.retreat_name}</p>
      <p style="margin: 5px 0;"><strong>Location:</strong> Near Austin, Texas</p>
      ${registration.ticket_type ? `<p style="margin: 5px 0;"><strong>Ticket Type:</strong> ${registration.ticket_type}</p>` : ''}
      ${registration.price_usd ? `<p style="margin: 5px 0;"><strong>Amount:</strong> $${registration.price_usd.toLocaleString()}</p>` : ''}
    </div>

    <h3 style="color: #2d5a3d;">What's Next?</h3>
    <p style="margin-bottom: 20px;">
      As we get closer to the retreat dates, we'll send you detailed logistics including:
    </p>
    <ul style="margin-bottom: 20px; padding-left: 20px;">
      <li>Exact venue location and directions</li>
      <li>Arrival and departure times</li>
      <li>Packing list and what to bring</li>
      <li>Schedule and itinerary</li>
    </ul>

    <p style="margin-bottom: 20px;">
      In the meantime, if you have any questions, feel free to reply to this email or reach out to us directly.
    </p>

    <p style="margin-bottom: 20px;">
      We're excited to have you join us!
    </p>

    <p style="margin-bottom: 0;">
      Grace and peace,<br>
      <strong>The Born to Create Team</strong>
    </p>
  </div>

  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p style="margin: 0;">Born to Create Project</p>
    <p style="margin: 5px 0;">Faith-centered filmmaking retreats</p>
  </div>
</body>
</html>
  `.trim();

  const text = `
Hi ${registration.full_name},

Your registration for ${registration.retreat_name} has been confirmed.

REGISTRATION DETAILS
--------------------
Name: ${registration.full_name}
Retreat: ${registration.retreat_name}
Location: Near Austin, Texas
${registration.ticket_type ? `Ticket Type: ${registration.ticket_type}` : ''}
${registration.price_usd ? `Amount: $${registration.price_usd.toLocaleString()}` : ''}

WHAT'S NEXT?
------------
As we get closer to the retreat dates, we'll send you detailed logistics including:
- Exact venue location and directions
- Arrival and departure times
- Packing list and what to bring
- Schedule and itinerary

In the meantime, if you have any questions, feel free to reply to this email or reach out to us directly.

We're excited to have you join us!

Grace and peace,
The Born to Create Team
  `.trim();

  try {
    const result = await sendTransactionalEmail({
      to: registration.email,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error('Failed to send attendee confirmation email:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log(`Attendee confirmation email sent to ${registration.email}`);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending attendee confirmation email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Send notification email to the retreat host
 */
export async function sendHostNotificationEmail({ registration }: SendHostNotificationParams) {
  const subject = `New retreat registration – ${registration.retreat_name}`;

  const createdAt = new Date(registration.created_at).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Chicago',
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #2d5a3d; padding: 20px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Registration</h1>
  </div>

  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
    <p style="font-size: 16px; margin-bottom: 20px;">
      A new registration has been submitted for <strong>${registration.retreat_name}</strong>.
    </p>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Name</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${registration.full_name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${registration.email}">${registration.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${registration.phone || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Church</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${registration.church_name || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Role</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${registration.role || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Ticket Type</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${registration.ticket_type || 'Not specified'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Price</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${registration.price_usd ? `$${registration.price_usd.toLocaleString()}` : 'Not specified'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Payment Status</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${registration.payment_status}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Source</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${registration.source || 'Direct'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold;">Created At</td>
        <td style="padding: 8px 0;">${createdAt}</td>
      </tr>
    </table>

    <p style="margin: 0; font-size: 14px; color: #666;">
      Registration ID: ${registration.id}
    </p>
  </div>
</body>
</html>
  `.trim();

  const text = `
NEW REGISTRATION - ${registration.retreat_name}

Name: ${registration.full_name}
Email: ${registration.email}
Phone: ${registration.phone || 'Not provided'}
Church: ${registration.church_name || 'Not provided'}
Role: ${registration.role || 'Not provided'}
Ticket Type: ${registration.ticket_type || 'Not specified'}
Price: ${registration.price_usd ? `$${registration.price_usd.toLocaleString()}` : 'Not specified'}
Payment Status: ${registration.payment_status}
Source: ${registration.source || 'Direct'}
Created At: ${createdAt}

Registration ID: ${registration.id}
  `.trim();

  try {
    const result = await sendTransactionalEmail({
      to: HOST_EMAIL,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error('Failed to send host notification email:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log(`Host notification email sent to ${HOST_EMAIL}`);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending host notification email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Send both confirmation and notification emails
 */
export async function sendRegistrationEmails(registration: RetreatRegistration) {
  const [attendeeResult, hostResult] = await Promise.allSettled([
    sendAttendeeConfirmationEmail({ registration }),
    sendHostNotificationEmail({ registration }),
  ]);

  return {
    attendee: attendeeResult.status === 'fulfilled' ? attendeeResult.value : { success: false, error: 'Failed to send' },
    host: hostResult.status === 'fulfilled' ? hostResult.value : { success: false, error: 'Failed to send' },
  };
}
