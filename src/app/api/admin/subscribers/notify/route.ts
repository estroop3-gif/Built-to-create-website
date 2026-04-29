import { NextRequest, NextResponse } from 'next/server';
import { checkIsAdmin } from '@/lib/admin';
import { getEmailSubscribers, supabaseAdmin } from '@/lib/supabase';
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

    const subscribers = await getEmailSubscribers('subscribed');

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: 'No subscribers to notify', sent: 0 });
    }

    let sent = 0;
    let failed = 0;

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

        // Track the send
        try {
          await supabaseAdmin.from('email_sends').insert({
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
        console.error(`Failed to send to ${subscriber.email}:`, err);
        failed++;
      }
    }

    return NextResponse.json({
      message: `Notification sent to ${sent} subscribers`,
      sent,
      failed,
      total: subscribers.length,
    });
  } catch (error) {
    console.error('Error sending notifications:', error);
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}
