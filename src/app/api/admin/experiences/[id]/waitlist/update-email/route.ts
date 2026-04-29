import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import { getWaitlistEntries } from '@/lib/services/waitlistService';
import { getExperienceById } from '@/lib/services/experienceService';
import { sendTransactionalEmail } from '@/lib/resend';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const experience = await getExperienceById(id);
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    const body = await request.json();
    const { subject, message, sendToAll } = body as {
      subject: string;
      message: string;
      sendToAll?: boolean;
    };

    if (!subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Subject and message are required' },
        { status: 400 }
      );
    }

    // Get waitlist entries — all or just un-notified
    const entries = await getWaitlistEntries(experience.slug, sendToAll ? undefined : { notified: false });

    if (entries.length === 0) {
      return NextResponse.json({ sent: 0 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebtcp.com';

    const emailPromises = entries.map((entry) =>
      sendTransactionalEmail({
        to: entry.email,
        subject,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 16px;">${experience.title} — Update</h1>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
              Hi ${entry.full_name},
            </p>
            <div style="color: #4a4a4a; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">
${message}
            </div>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${siteUrl}/retreats/${experience.slug}" style="display: inline-block; background-color: #2d5016; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                View Details
              </a>
            </div>
            <p style="color: #6a6a6a; font-size: 14px; margin-top: 32px;">
              — The Born to Create Project Team
            </p>
          </div>
        `,
      }).catch((err) => {
        console.error(`Failed to send update email to ${entry.email}:`, err);
      })
    );

    await Promise.allSettled(emailPromises);

    return NextResponse.json({ sent: entries.length });
  } catch (error) {
    console.error('Error sending waitlist update email:', error);
    return NextResponse.json(
      { error: 'Failed to send update emails' },
      { status: 500 }
    );
  }
}
