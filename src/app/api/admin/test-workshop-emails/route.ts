import { NextResponse } from 'next/server';
import { sendTransactionalEmail } from '@/lib/resend';

export const runtime = 'nodejs';

// Reuse the same email generator from the webhook
function escapeHtml(s: string) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function generateWorkshopConfirmationHtml(d: {
  firstName: string;
  lastName: string;
  email: string;
  amountPaid: number;
  currency: string;
  planLabel: string;
  retreatName: string;
  retreatStart: string;
  retreatLocation: string;
  sessionId: string;
  urls: { faq: string; contact: string; successPortal: string };
}): string {
  const amountFmt = d.amountPaid.toLocaleString(undefined, {
    style: 'currency',
    currency: d.currency || 'USD',
    minimumFractionDigits: 2,
  });

  const venue = d.retreatLocation === 'Canton, GA'
    ? 'River Church Canton — Community Room, 2335 Sixes Rd, Canton, GA 30144'
    : 'Pickens County Recreation Center, 1329 Camp Rd, Jasper, GA 30143';

  return `
  <!doctype html>
  <html>
  <head>
    <meta charSet="utf-8" />
    <title>${escapeHtml(d.retreatName)} — Registration Confirmed</title>
    <style>
      body { font-family: Arial, sans-serif; color: #222; margin: 0; padding: 0; background: #f7faf7; }
      .wrap { max-width: 640px; margin: 0 auto; background: #fff; }
      .hero { background: #2d5016; color: #fff; padding: 24px; text-align: center; }
      h1 { margin: 0 0 6px; font-size: 22px; }
      p { line-height: 1.55; }
      .content { padding: 24px; }
      .card { background: #f4fbf4; border-left: 4px solid #2d5016; padding: 16px; margin: 16px 0; }
      .btn { display: inline-block; padding: 10px 16px; background: #2d5016; color: #fff !important; text-decoration: none; border-radius: 6px; margin: 4px; }
      .muted { color: #666; font-size: 12px; }
      a { color: #2d5016; }
      .checklist { background: #f9fcf9; padding: 16px; border-radius: 6px; margin: 16px 0; }
      .checklist li { margin: 8px 0; }
      .button-group { text-align: center; margin: 20px 0; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="hero">
        <h1>🎉 You're in, ${escapeHtml(d.firstName)}!</h1>
        <p>${escapeHtml(d.retreatName)}</p>
        <p>${escapeHtml(d.retreatLocation)} • ${escapeHtml(d.retreatStart)}</p>
      </div>

      <div class="content">
        <p>Congratulations! Your registration is confirmed and we've received your payment of <strong>${amountFmt}</strong>.</p>

        <!-- Receipt -->
        <div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden; margin: 20px 0;">
          <div style="background: #2d5016; color: #fff; padding: 12px 16px;">
            <div style="font-size: 16px; font-weight: bold;">Payment Receipt</div>
            <div style="font-size: 12px; opacity: 0.8;">Receipt #${escapeHtml(d.sessionId.slice(-8).toUpperCase())} &bull; ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
          <div style="padding: 16px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #666; width: 120px;">Name</td>
                <td style="padding: 6px 0;">${escapeHtml(d.firstName)} ${escapeHtml(d.lastName)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666;">Email</td>
                <td style="padding: 6px 0;">${escapeHtml(d.email)}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 12px 0;" />
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #eee;">
                <th style="text-align: left; padding: 8px 0; color: #2d5016; font-size: 12px;">Description</th>
                <th style="text-align: left; padding: 8px 0; color: #2d5016; font-size: 12px;">Plan</th>
                <th style="text-align: right; padding: 8px 0; color: #2d5016; font-size: 12px;">Amount</th>
              </tr>
              <tr>
                <td style="padding: 8px 0;">${escapeHtml(d.retreatName)}</td>
                <td style="padding: 8px 0;">${escapeHtml(d.planLabel)}</td>
                <td style="padding: 8px 0; text-align: right;">${amountFmt}</td>
              </tr>
              <tr style="border-top: 2px solid #2d5016;">
                <td colspan="2" style="padding: 8px 0; font-weight: bold;">Total Paid</td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 16px;">${amountFmt} ${escapeHtml(d.currency)}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 12px 0;" />
            <div style="font-size: 11px; color: #999;">
              Transaction ID: ${escapeHtml(d.sessionId)}<br/>
              Born to Create Project &bull; thebtcp.com
            </div>
          </div>
        </div>

        <div class="checklist">
          <h3 style="color: #2d5016; margin-top: 0;">🚀 What happens next:</h3>
          <ul>
            <li>📅 <strong>Date:</strong> ${escapeHtml(d.retreatStart)}</li>
            <li>⏰ <strong>Time:</strong> 2:00 – 4:00 PM</li>
            <li>📍 <strong>Venue:</strong> ${venue}</li>
            <li>🎬 No gear needed — professional cinema cameras and all equipment will be provided</li>
            <li>⏰ Please arrive about 10 minutes early to get settled</li>
          </ul>

          <h3 style="color: #2d5016; margin-top: 20px;">🎬 What You'll Cover</h3>
          <div style="background: #f9fcf9; padding: 16px; border-radius: 6px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; vertical-align: top; width: 110px; font-weight: bold; color: #2d5016;">First 20 min</td>
                <td style="padding: 8px 0;"><strong>How Real Productions Work</strong> — What happens on set, who does what, how projects move from idea to finished product</td>
              </tr>
              <tr style="border-top: 1px solid #e8f0e8;">
                <td style="padding: 8px 0; vertical-align: top; font-weight: bold; color: #2d5016;">Next 45 min</td>
                <td style="padding: 8px 0;"><strong>Camera Basics &amp; Coverage</strong> — Frame rate, shutter speed, aperture, ISO, lenses, composition, and multicam thinking</td>
              </tr>
              <tr style="border-top: 1px solid #e8f0e8;">
                <td style="padding: 8px 0; vertical-align: top; font-weight: bold; color: #2d5016;">Next 30 min</td>
                <td style="padding: 8px 0;"><strong>Documentary Fundamentals</strong> — Interviews, B-roll, finding story in real situations, avoiding common lighting and audio mistakes</td>
              </tr>
              <tr style="border-top: 1px solid #e8f0e8;">
                <td style="padding: 8px 0; vertical-align: top; font-weight: bold; color: #2d5016;">Final 25 min</td>
                <td style="padding: 8px 0;"><strong>Q&amp;A and Next Steps</strong> — Open questions, direct answers, and a practical plan for what to do after the workshop</td>
              </tr>
            </table>
          </div>

          <h3 style="color: #2d5016; margin-top: 20px;">📋 What to Know</h3>
          <ul>
            <li><strong>No experience required</strong> — this workshop is designed for beginners and anyone who wants a stronger foundation</li>
            <li><strong>No gear needed</strong> — you will get hands-on time with professional cinema cameras used on real TV and documentary sets</li>
            <li><strong>Bring something to take notes with</strong> — phone, notebook, whatever works for you</li>
            <li><strong>Dress comfortably</strong> — you may be standing and moving around during hands-on portions</li>
            <li><strong>Questions?</strong> Reply to this email or <a href="${d.urls.contact}" style="color: #2d5016;">contact us</a> anytime</li>
          </ul>
        </div>

        <div class="button-group">
          <a class="btn" href="${d.urls.faq}">❓ FAQ</a>
          <a class="btn" href="${d.urls.contact}">📱 Contact Us</a>
        </div>

        <p>Your registration details: <a href="${d.urls.successPortal}">View Registration Details</a></p>

        <p><strong>Need to make changes?</strong> Just reply to this email and we'll take care of it.</p>

        <div class="card">
          <p style="margin: 0;"><strong>Important:</strong> We'll send a reminder as the workshop date approaches. Keep an eye on your inbox!</p>
        </div>

        <p class="muted">If you didn't make this registration, please <a href="${d.urls.contact}">contact us immediately</a>.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

export async function GET() {
  const EMAIL_BASE_URL = 'https://www.thebtcp.com';
  const results = [];

  // Send Jasper test email
  try {
    const jasperHtml = generateWorkshopConfirmationHtml({
      firstName: 'Parker',
      lastName: 'Stroop',
      email: 'estroop3@gmail.com',
      amountPaid: 50,
      currency: 'USD',
      planLabel: 'Workshop - Full',
      retreatName: 'Filmmaking in the Real World Workshop',
      retreatStart: 'May 16, 2026',
      retreatLocation: 'Jasper, GA',
      sessionId: 'cs_test_jasper_preview_00000001',
      urls: {
        faq: `${EMAIL_BASE_URL}/faq`,
        contact: `${EMAIL_BASE_URL}/contact`,
        successPortal: `${EMAIL_BASE_URL}/register/success?session_id=cs_test_jasper`,
      },
    });

    const jasperResult = await sendTransactionalEmail({
      to: 'estroop3@gmail.com',
      subject: '[TEST] Workshop Confirmation — Jasper, GA · May 16, 2026',
      html: jasperHtml,
      replyTo: 'estroop3@gmail.com',
    });

    results.push({ location: 'Jasper', success: !jasperResult.error, id: jasperResult.data?.id, error: jasperResult.error });
  } catch (err) {
    results.push({ location: 'Jasper', success: false, error: String(err) });
  }

  // Send Canton test email
  try {
    const cantonHtml = generateWorkshopConfirmationHtml({
      firstName: 'Parker',
      lastName: 'Stroop',
      email: 'estroop3@gmail.com',
      amountPaid: 50,
      currency: 'USD',
      planLabel: 'Workshop - Full',
      retreatName: 'Filmmaking in the Real World Workshop',
      retreatStart: 'May 23, 2026',
      retreatLocation: 'Canton, GA',
      sessionId: 'cs_test_canton_preview_00000001',
      urls: {
        faq: `${EMAIL_BASE_URL}/faq`,
        contact: `${EMAIL_BASE_URL}/contact`,
        successPortal: `${EMAIL_BASE_URL}/register/success?session_id=cs_test_canton`,
      },
    });

    const cantonResult = await sendTransactionalEmail({
      to: 'estroop3@gmail.com',
      subject: '[TEST] Workshop Confirmation — Canton, GA · May 23, 2026',
      html: cantonHtml,
      replyTo: 'estroop3@gmail.com',
    });

    results.push({ location: 'Canton', success: !cantonResult.error, id: cantonResult.data?.id, error: cantonResult.error });
  } catch (err) {
    results.push({ location: 'Canton', success: false, error: String(err) });
  }

  return NextResponse.json({
    message: 'Test workshop confirmation emails sent to estroop3@gmail.com',
    results,
  });
}
