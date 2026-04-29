import { NextRequest, NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/apiAdmin';
import {
  getWaitlistEntries,
  notifyWaitlistEntries,
} from '@/lib/services/waitlistService';
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
    const { entryIds, all } = body as { entryIds?: string[]; all?: boolean };

    let idsToNotify: string[];

    if (all) {
      const unnotified = await getWaitlistEntries(experience.slug, {
        notified: false,
      });
      idsToNotify = unnotified.map((e) => e.id);
    } else if (entryIds && entryIds.length > 0) {
      idsToNotify = entryIds;
    } else {
      return NextResponse.json(
        { error: 'Provide entryIds array or { all: true }' },
        { status: 400 }
      );
    }

    if (idsToNotify.length === 0) {
      return NextResponse.json({ notified: 0 });
    }

    const notified = await notifyWaitlistEntries(idsToNotify);

    // Send "spot available" emails
    const registerUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thebtcp.com'}/register`;
    const emailPromises = notified.map((entry) =>
      sendTransactionalEmail({
        to: entry.email,
        subject: `A spot opened up for ${experience.title}!`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 16px;">Great News!</h1>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
              Hi ${entry.full_name},
            </p>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
              A spot has opened up for <strong>${experience.title}</strong>!
              Register now before it fills up again.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${registerUrl}" style="display: inline-block; background-color: #2d5016; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                Register Now
              </a>
            </div>
            <p style="color: #6a6a6a; font-size: 14px;">
              Spots fill quickly, so don't wait!
            </p>
            <p style="color: #6a6a6a; font-size: 14px; margin-top: 32px;">
              — The Born to Create Project Team
            </p>
          </div>
        `,
      }).catch((err) => {
        console.error(`Failed to send notification to ${entry.email}:`, err);
      })
    );

    await Promise.allSettled(emailPromises);

    return NextResponse.json({ notified: notified.length });
  } catch (error) {
    console.error('Error notifying waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to notify waitlist entries' },
      { status: 500 }
    );
  }
}
