import { NextRequest, NextResponse } from 'next/server';
import { checkIsAdmin } from '@/lib/admin';
import { getEmailSubscribers, getSupabaseAdmin } from '@/lib/supabase';
import { sendPromotionalEmail } from '@/lib/resend';
import { render } from '@react-email/render';
import NewExperienceNotification from '@/emails/NewExperienceNotification';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, date, location, price, ctaUrl, ctaText } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    // Get subscribers from email_subscribers table
    const emailSubscribers = await getEmailSubscribers('subscribed');

    // Also get leads with consent who may not be in email_subscribers yet
    const supabase = getSupabaseAdmin();
    const { data: leads } = await supabase
      .from('leads')
      .select('email, first_name')
      .eq('consent_marketing', true);

    // Merge both sources, deduplicate by email
    const emailSet = new Set<string>();
    const subscribers: { email: string; name: string | null }[] = [];

    for (const sub of emailSubscribers) {
      const key = sub.email.toLowerCase();
      if (!emailSet.has(key)) {
        emailSet.add(key);
        subscribers.push({ email: sub.email, name: sub.name });
      }
    }
    for (const lead of (leads || [])) {
      const key = lead.email.toLowerCase();
      if (!emailSet.has(key)) {
        emailSet.add(key);
        subscribers.push({ email: lead.email, name: lead.first_name });
      }
    }

    if (subscribers.length === 0) {
      return NextResponse.json({ message: 'No subscribers to notify', sent: 0 });
    }

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const subscriber of subscribers) {
      try {
        const html = await render(NewExperienceNotification({
          name: subscriber.name || 'Friend',
          title,
          description,
          date,
          location,
          price,
          ctaUrl: ctaUrl || 'https://www.thebtcp.com/experiences',
          ctaText: ctaText || 'Learn More',
        }));

        await sendPromotionalEmail({
          to: subscriber.email,
          subject: `New from Born to Create Project: ${title}`,
          html,
        });

        // Track the send (non-critical)
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (getSupabaseAdmin() as any).from('email_sends').insert({
            template_key: `notification_${Date.now()}`,
            subscriber_email: subscriber.email,
            subscriber_first_name: subscriber.name,
            delivery_status: 'sent',
          });
        } catch {
          // non-critical
        }

        sent++;
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.error(`Failed to send to ${subscriber.email}:`, errMsg);
        errors.push(`${subscriber.email}: ${errMsg}`);
        failed++;
      }
    }

    return NextResponse.json({
      message: failed > 0
        ? `Sent ${sent}, failed ${failed} of ${subscribers.length}. Errors: ${errors.slice(0, 3).join('; ')}`
        : `Notification sent to ${sent} subscribers`,
      sent,
      failed,
      total: subscribers.length,
    });
  } catch (error) {
    console.error('Error sending notifications:', error);
    const details = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Failed to send notifications: ${details}` }, { status: 500 });
  }
}
