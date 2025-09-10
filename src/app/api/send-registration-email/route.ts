// app/api/registration-email/route.ts
// Complete route to send a registration email via Resend to parker@thebtcp.com

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Registration } from '@/lib/types/database';

// Required env:
// RESEND_API_KEY=your_resend_key
// EMAIL_FROM="Born to Create Project <no-reply@thebtcp.com>"
// Note: verify the sender/domain in Resend. If not verified yet, set EMAIL_FROM=onboarding@resend.dev

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY || '');
const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev'; // safe fallback

export async function POST(request: NextRequest) {
  try {
    // Ensure RESEND_API_KEY is present
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY');
      return NextResponse.json(
        { success: false, error: 'Server misconfigured: RESEND_API_KEY is missing' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { registration, paymentAmount } = body as {
      registration: Registration;
      paymentAmount: number;
    };

    // Basic validation
    if (!registration || typeof paymentAmount !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Invalid payload: registration and paymentAmount are required' },
        { status: 400 }
      );
    }

    const emailSubject = `New Retreat Registration: ${registration.first_name} ${registration.last_name}`;
    const emailHtml = generateRegistrationEmailHtml(registration, paymentAmount);
    const emailText = generateRegistrationEmailText(registration, paymentAmount);

    // Send to Parker
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM, // must be a verified sender/domain in Resend
      to: 'parker@thebtcp.com',
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
      // helpful to be able to reply to the registrant
      replyTo: registration.email || undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email through Resend' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, messageId: data?.id || null });
  } catch (err) {
    console.error('Email sending error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

/**
 * HTML email body
 */
function generateRegistrationEmailHtml(registration: Registration, paymentAmount: number): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Retreat Registration</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2d5016; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .section { margin-bottom: 20px; }
        .label { font-weight: bold; color: #2d5016; }
        .value { margin-bottom: 10px; }
        .payment-info { background: #e8f5e8; padding: 15px; border-left: 4px solid #2d5016; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Retreat Registration</h1>
          <p>The Born to Create Project</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>Personal Information</h2>
            <div class="value"><span class="label">Name:</span> ${registration.first_name} ${registration.last_name}</div>
            <div class="value"><span class="label">Email:</span> ${registration.email}</div>
            <div class="value"><span class="label">Phone:</span> ${registration.phone || 'Not provided'}</div>
            <div class="value"><span class="label">Date of Birth:</span> ${registration.date_of_birth || 'Not provided'}</div>
          </div>

          <div class="section">
            <h2>Emergency Contact</h2>
            <div class="value"><span class="label">Name:</span> ${registration.emergency_contact_name || 'Not provided'}</div>
            <div class="value"><span class="label">Phone:</span> ${registration.emergency_contact_phone || 'Not provided'}</div>
            <div class="value"><span class="label">Relationship:</span> ${registration.emergency_contact_relationship || 'Not provided'}</div>
          </div>

          <div class="section">
            <h2>Address</h2>
            <div class="value">
              ${registration.address_line1 || ''}<br>
              ${registration.address_line2 ? registration.address_line2 + '<br>' : ''}
              ${registration.city || ''}, ${registration.state_province || ''} ${registration.postal_code || ''}<br>
              ${registration.country || ''}
            </div>
          </div>

          <div class="section">
            <h2>Retreat Preferences</h2>
            <div class="value"><span class="label">Experience Level:</span> ${registration.experience_level || 'Not specified'}</div>
            <div class="value"><span class="label">Bringing Own Camera:</span> ${registration.bring_own_camera ? 'Yes' : 'No'}</div>
            ${registration.camera_equipment_details ? `<div class="value"><span class="label">Camera Equipment:</span> ${registration.camera_equipment_details}</div>` : ''}
            ${registration.dietary_restrictions ? `<div class="value"><span class="label">Dietary Restrictions:</span> ${registration.dietary_restrictions}</div>` : ''}
            ${registration.medical_conditions ? `<div class="value"><span class="label">Medical Conditions:</span> ${registration.medical_conditions}</div>` : ''}
          </div>

          <div class="payment-info">
            <h2>Payment Information</h2>
            <div class="value"><span class="label">Payment Type:</span> ${registration.payment_type === 'deposit' ? 'Deposit Only' : 'Full Payment'}</div>
            <div class="value"><span class="label">Amount:</span> $${paymentAmount.toLocaleString()}</div>
            <div class="value"><span class="label">Status:</span> ${registration.payment_status}</div>
          </div>

          ${registration.how_did_you_hear ? `
          <div class="section">
            <h2>How They Heard About Us</h2>
            <div class="value">${registration.how_did_you_hear}</div>
          </div>` : ''}

          ${registration.special_requests ? `
          <div class="section">
            <h2>Special Requests</h2>
            <div class="value">${registration.special_requests}</div>
          </div>` : ''}

          <div class="section">
            <h2>Consent</h2>
            <div class="value"><span class="label">Terms Accepted:</span> ${registration.terms_accepted ? 'Yes' : 'No'}</div>
            <div class="value"><span class="label">Marketing Consent:</span> ${registration.marketing_consent ? 'Yes' : 'No'}</div>
          </div>

          <div class="section">
            <p><small>Registration ID: ${registration.id}</small></p>
            <p><small>Submitted: ${new Date(registration.created_at).toLocaleString()}</small></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Plain text email body
 */
function generateRegistrationEmailText(registration: Registration, paymentAmount: number): string {
  return `
New Retreat Registration - The Born to Create Project

Personal Information:
Name: ${registration.first_name} ${registration.last_name}
Email: ${registration.email}
Phone: ${registration.phone || 'Not provided'}
Date of Birth: ${registration.date_of_birth || 'Not provided'}

Emergency Contact:
Name: ${registration.emergency_contact_name || 'Not provided'}
Phone: ${registration.emergency_contact_phone || 'Not provided'}
Relationship: ${registration.emergency_contact_relationship || 'Not provided'}

Address:
${registration.address_line1 || ''}
${registration.address_line2 || ''}
${registration.city || ''}, ${registration.state_province || ''} ${registration.postal_code || ''}
${registration.country || ''}

Retreat Preferences:
Experience Level: ${registration.experience_level || 'Not specified'}
Bringing Own Camera: ${registration.bring_own_camera ? 'Yes' : 'No'}
${registration.camera_equipment_details ? `Camera Equipment: ${registration.camera_equipment_details}` : ''}
${registration.dietary_restrictions ? `Dietary Restrictions: ${registration.dietary_restrictions}` : ''}
${registration.medical_conditions ? `Medical Conditions: ${registration.medical_conditions}` : ''}

Payment Information:
Payment Type: ${registration.payment_type === 'deposit' ? 'Deposit Only' : 'Full Payment'}
Amount: $${paymentAmount.toLocaleString()}
Status: ${registration.payment_status}

${registration.how_did_you_hear ? `How They Heard About Us: ${registration.how_did_you_hear}` : ''}
${registration.special_requests ? `Special Requests: ${registration.special_requests}` : ''}

Consent:
Terms Accepted: ${registration.terms_accepted ? 'Yes' : 'No'}
Marketing Consent: ${registration.marketing_consent ? 'Yes' : 'No'}

Registration ID: ${registration.id}
Submitted: ${new Date(registration.created_at).toLocaleString()}
  `;
}
