import { NextRequest, NextResponse } from 'next/server';
import { addToWaitlist } from '@/lib/services/waitlistService';
import { getCapacityStatus } from '@/lib/services/experienceService';
import { getExperienceBySlug } from '@/lib/services/experienceService';
import { sendTransactionalEmail } from '@/lib/resend';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { email, full_name, phone } = body;

    if (!email || !full_name) {
      return NextResponse.json(
        { error: 'Email and full name are required' },
        { status: 400 }
      );
    }

    // Verify the experience is actually full (or allow waitlist regardless)
    const capacity = await getCapacityStatus(slug);
    if (capacity.capacity !== null && !capacity.is_full) {
      return NextResponse.json(
        { error: 'This experience still has spots available. Please register directly.' },
        { status: 400 }
      );
    }

    const entry = await addToWaitlist(slug, { email, full_name, phone });

    // Send confirmation email
    const experience = await getExperienceBySlug(slug);
    const experienceTitle = experience?.title || slug;

    try {
      await sendTransactionalEmail({
        to: email,
        subject: `You're on the waitlist for ${experienceTitle}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 16px;">You're on the Waitlist!</h1>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
              Hi ${full_name},
            </p>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
              You've been added to the waitlist for <strong>${experienceTitle}</strong>.
              We'll notify you as soon as a spot becomes available.
            </p>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
              Spots fill quickly when they open up, so keep an eye on your inbox!
            </p>
            <p style="color: #6a6a6a; font-size: 14px; margin-top: 32px;">
              — The Born to Create Project Team
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send waitlist confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    // Handle unique constraint violation (already on waitlist)
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as { code: string }).code === '23505'
    ) {
      return NextResponse.json(
        { error: 'You are already on the waitlist for this experience.' },
        { status: 409 }
      );
    }
    console.error('Error joining waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
