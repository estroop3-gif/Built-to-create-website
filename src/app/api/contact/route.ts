import { NextRequest, NextResponse } from 'next/server';
import { contactSchemaServer } from '@/lib/validation/contact';
import { insertContactMessage } from '@/lib/supabase';
import { sendTransactionalEmail, CONTACT_INBOX_EMAIL } from '@/lib/resend';
import { checkRateLimit } from '@/lib/rateLimit';
import { render } from '@react-email/render';
import ContactNotification from '@/emails/ContactNotification';
import ContactAcknowledgement from '@/emails/ContactAcknowledgement';

export const runtime = 'nodejs';

function getClientIP(request: NextRequest): string {
  // Try various headers for IP detection
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const real = request.headers.get('x-real-ip');
  if (real) {
    return real;
  }

  const cf = request.headers.get('cf-connecting-ip');
  if (cf) {
    return cf;
  }

  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Get client information
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Rate limiting
    const { isLimited, remaining, resetTime } = checkRateLimit(clientIP);

    if (isLimited) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many submissions',
          code: 'RATE_LIMITED',
          resetTime
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();

    // Add server-only fields
    const dataWithMeta = {
      ...body,
      client_ip: clientIP,
      user_agent: userAgent
    };

    const validationResult = contactSchemaServer.safeParse(dataWithMeta);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          code: 'VALIDATION_ERROR',
          details: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Anti-spam checks
    if (validatedData.hidden_honeypot) {
      return NextResponse.json(
        { success: false, error: 'Invalid submission', code: 'SPAM_DETECTED' },
        { status: 400 }
      );
    }

    if (validatedData.math_answer !== 5) {
      return NextResponse.json(
        { success: false, error: 'Incorrect math answer', code: 'MATH_ERROR' },
        { status: 400 }
      );
    }

    // Prepare data for database
    const contactData = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || undefined,
      subject: validatedData.subject,
      message: validatedData.message,
      client_ip: validatedData.client_ip,
      user_agent: validatedData.user_agent,
      status: 'received'
    };

    // Insert into database
    await insertContactMessage(contactData);

    const now = new Date().toISOString();

    // Send notification email to admin
    try {
      const notificationHtml = await render(ContactNotification({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
        createdAt: now,
        clientIp: validatedData.client_ip,
        userAgent: validatedData.user_agent,
      }));

      await sendTransactionalEmail({
        to: CONTACT_INBOX_EMAIL,
        subject: `New Contact Form Submission — ${validatedData.subject}`,
        html: notificationHtml,
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the request if admin notification fails
    }

    // Send acknowledgement email to user
    try {
      const acknowledgementHtml = await render(ContactAcknowledgement({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
      }));

      await sendTransactionalEmail({
        to: validatedData.email,
        subject: 'We received your message',
        html: acknowledgementHtml,
      });
    } catch (emailError) {
      console.error('Failed to send acknowledgement email:', emailError);
      // Don't fail the request if user acknowledgement fails
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      remaining: remaining - 1
    });

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        code: 'SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}