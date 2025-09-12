import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { emailService } from '@/lib/services/email';
import { sendInternalNotification } from '@/lib/emailClient';
import InternalNewSignup, { InternalNewSignupText } from '@/emails/InternalNewSignup';

export const runtime = 'nodejs';

// Input validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      first_name,
      consent = true,
      utm_source,
      utm_medium, 
      utm_campaign,
      utm_content,
      referrer,
      page_path,
      lead_source,
      honeypot // Anti-spam field
    } = body;

    // Honeypot check - if filled, it's likely a bot
    if (honeypot) {
      return NextResponse.json(
        { success: false, error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, error: 'Consent is required' },
        { status: 400 }
      );
    }

    // Initialize Supabase with service role key for server-side operations
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if email already exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id, email, registered, consent_marketing, first_name, utm_source, utm_medium, utm_campaign, utm_content, referrer, source, sequence_stage')
      .eq('email', email.toLowerCase())
      .single();

    const now = new Date().toISOString();
    const nextSendAt = new Date();
    // Set to send welcome email immediately
    nextSendAt.setMinutes(nextSendAt.getMinutes() + 1);

    if (existingLead) {
      // Update existing lead if they've re-subscribed or provide new info
      const { error } = await supabase
        .from('leads')
        .update({
          first_name: first_name || existingLead.first_name,
          consent_marketing: consent,
          utm_source: utm_source || existingLead.utm_source,
          utm_medium: utm_medium || existingLead.utm_medium,
          utm_campaign: utm_campaign || existingLead.utm_campaign,
          utm_content: utm_content || existingLead.utm_content,
          referrer: referrer || existingLead.referrer,
          source: lead_source || page_path || existingLead.source,
          sequence_stage: existingLead.registered ? existingLead.sequence_stage : 0,
          next_send_at: existingLead.registered ? null : nextSendAt.toISOString(),
          updated_at: now
        })
        .eq('email', email.toLowerCase());

      if (error) {
        console.error('Supabase update error:', error);
        return NextResponse.json(
          { success: false, error: 'Database error' },
          { status: 500 }
        );
      }

      // Send welcome email if they haven't registered and are re-consenting
      if (!existingLead.registered && consent) {
        const emailResult = await emailService.sendWelcomeEmail(
          email.toLowerCase(),
          first_name || null
        );

        if (!emailResult.success) {
          console.error('Welcome email failed:', emailResult.error);
          // Don't fail the subscription if email fails
        }

        // Send internal notification for re-subscription
        await sendInternalNotification({
          to: 'parker@thebtcp.com',
          subject: `New Email List Signup: ${email}`,
          template: InternalNewSignup,
          templateProps: {
            email,
            firstName: first_name,
            timestamp: now,
            utmSource: utm_source,
            utmMedium: utm_medium,
            utmCampaign: utm_campaign,
            utmContent: utm_content,
            referrer,
            source: lead_source || page_path
          },
          textTemplate: InternalNewSignupText
        });
      }

    } else {
      // Insert new lead
      const { error } = await supabase
        .from('leads')
        .insert({
          email: email.toLowerCase(),
          first_name: first_name || null,
          consent_marketing: consent,
          utm_source,
          utm_medium,
          utm_campaign,
          utm_content,
          referrer,
          source: lead_source || page_path || 'website',
          sequence_stage: 0,
          next_send_at: nextSendAt.toISOString(),
          created_at: now,
          updated_at: now
        });

      if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json(
          { success: false, error: 'Database error' },
          { status: 500 }
        );
      }

      // Send welcome email
      const emailResult = await emailService.sendWelcomeEmail(
        email.toLowerCase(),
        first_name || null
      );

      if (!emailResult.success) {
        console.error('Welcome email failed:', emailResult.error);
        // Don't fail the subscription if email fails
      }

      // Send internal notification for new signup
      await sendInternalNotification({
        to: 'parker@thebtcp.com',
        subject: `New Email List Signup: ${email}`,
        template: InternalNewSignup,
        templateProps: {
          email,
          firstName: first_name,
          timestamp: now,
          utmSource: utm_source,
          utmMedium: utm_medium,
          utmCampaign: utm_campaign,
          utmContent: utm_content,
          referrer,
          source: lead_source || page_path
        },
        textTemplate: InternalNewSignupText
      });
    }

    // Track analytics event (could be sent to GA4 or other analytics)
    // This would be implemented based on your analytics setup

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed! Check your email for the gear checklist.' 
    });

  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}