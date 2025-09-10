import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Initialize Stripe and Resend inside the handler to avoid build-time environment variable issues
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' });
    const resend = new Resend(process.env.RESEND_API_KEY!);
    
    const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';
    const SITE_URL = (process.env.SITE_URL || 'http://localhost:3000').replace(/\/+$/, ''); // no trailing slash

    // --- Verify signature with RAW body ---
    const sig = req.headers.get('stripe-signature') as string;
    const raw = Buffer.from(await req.arrayBuffer());
    const event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    // --- Handle successful Checkout ---
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract useful info
      const email = session.customer_details?.email || '';
      const name = session.customer_details?.name || '';
      const [firstName, ...lastNameArr] = name.trim().split(' ');
      const lastName = lastNameArr.join(' ');
      const amountPaid = (session.amount_total ?? 0) / 100; // USD
      const currency = (session.currency || 'usd').toUpperCase();

      // Extract metadata
      const retreatName = session.metadata?.retreat || 'Born to Create Project Retreat';
      const retreatStart = session.metadata?.retreat_start || 'February 14-22, 2026';
      const retreatLocation = session.metadata?.retreat_location || 'Costa Rica';

      // Build URLs
      const urls = {
        homepage: `${SITE_URL}/`,
        itinerary: `${SITE_URL}/itinerary`,
        faq: `${SITE_URL}/faq`,
        packingList: `${SITE_URL}/packing`,
        terms: `${SITE_URL}/terms`,
        contact: `${SITE_URL}/contact`,
        successPortal: `${SITE_URL}/register/success?session_id=${session.id}`,
      };

      // Send customer confirmation email
      if (email) {
        const subjectCustomer = `You're in! ${retreatName} — Registration Confirmed`;
        const htmlCustomer = generateCustomerEmailHtml({
          firstName: firstName || 'Friend',
          lastName,
          email,
          amountPaid,
          currency,
          retreatName,
          retreatStart,
          retreatLocation,
          urls,
          sessionId: session.id,
        });
        const textCustomer = generateCustomerEmailText({
          firstName: firstName || 'Friend',
          lastName,
          email,
          amountPaid,
          currency,
          retreatName,
          retreatStart,
          retreatLocation,
          urls,
          sessionId: session.id,
        });

        const { error } = await resend.emails.send({
          from: EMAIL_FROM,
          to: email,
          subject: subjectCustomer,
          html: htmlCustomer,
          text: textCustomer,
          replyTo: 'parker@thebtcp.com',
        });

        if (error) {
          console.error('Resend customer email error:', error);
        }
      }

      // Send internal notification to Parker
      {
        const subjectAdmin = `New Registration: ${firstName} ${lastName} — ${retreatName}`;
        const htmlAdmin = generateAdminEmailHtml({
          firstName,
          lastName,
          email,
          amountPaid,
          currency,
          retreatName,
          retreatStart,
          retreatLocation,
          urls,
          sessionId: session.id,
        });
        const textAdmin = generateAdminEmailText({
          firstName,
          lastName,
          email,
          amountPaid,
          currency,
          retreatName,
          retreatStart,
          retreatLocation,
          urls,
          sessionId: session.id,
        });

        const { error } = await resend.emails.send({
          from: EMAIL_FROM,
          to: 'parker@thebtcp.com',
          subject: subjectAdmin,
          html: htmlAdmin,
          text: textAdmin,
          replyTo: email || undefined,
        });

        if (error) {
          console.error('Resend admin email error:', error);
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: unknown) {
    console.error('Webhook error:', err instanceof Error ? err.message : String(err));
    return new NextResponse('Webhook Error', { status: 400 });
  }
}

/* ------------------------- EMAIL TEMPLATES ------------------------- */

type SharedEmailData = {
  firstName: string;
  lastName: string;
  email: string;
  amountPaid: number;
  currency: string;
  retreatName: string;
  retreatStart: string;
  retreatLocation: string;
  urls: {
    homepage: string;
    itinerary: string;
    faq: string;
    packingList: string;
    terms: string;
    contact: string;
    successPortal: string;
  };
  sessionId: string;
};

/* ========== Customer Confirmation (HTML) ========== */
function generateCustomerEmailHtml(d: SharedEmailData): string {
  const amountFmt = d.amountPaid.toLocaleString(undefined, {
    style: 'currency',
    currency: d.currency || 'USD',
    minimumFractionDigits: 2,
  });

  return `
  <!doctype html>
  <html>
  <head>
    <meta charSet="utf-8" />
    <title>${d.retreatName} — Registration Confirmed</title>
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
      .list a { color: #2d5016; }
      .row { margin: 8px 0; }
      .label { color: #2d5016; font-weight: bold; }
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

        <div class="card">
          <div class="row"><span class="label">Name:</span> ${escapeHtml(d.firstName)} ${escapeHtml(d.lastName)}</div>
          <div class="row"><span class="label">Email:</span> ${escapeHtml(d.email)}</div>
          <div class="row"><span class="label">Amount Paid:</span> ${amountFmt} ${escapeHtml(d.currency)}</div>
          <div class="row"><span class="label">Confirmation:</span> ${escapeHtml(d.sessionId)}</div>
        </div>

        <div class="checklist">
          <h3 style="color: #2d5016; margin-top: 0;">🚀 What happens next:</h3>
          <ul>
            <li>📋 Review your detailed itinerary and daily schedule</li>
            <li>🎒 Check out the packing list for Costa Rica</li>
            <li>✈️ Plan your travel (we'll send airport/timing details soon)</li>
            <li>❓ Browse our FAQ for common questions</li>
            <li>📱 Connect with us if you need anything</li>
          </ul>
        </div>

        <div class="button-group">
          <a class="btn" href="${d.urls.itinerary}">📋 View Itinerary</a>
          <a class="btn" href="${d.urls.packingList}">🎒 Packing List</a>
          <a class="btn" href="${d.urls.faq}">❓ FAQ</a>
          <a class="btn" href="${d.urls.contact}">📱 Contact Us</a>
        </div>

        <p>Your retreat portal: <a href="${d.urls.successPortal}">View Registration Details</a></p>

        <p><strong>Need to make changes?</strong> Just reply to this email and we'll take care of it.</p>

        <div class="card">
          <p style="margin: 0;"><strong>Important:</strong> We'll send travel details, packing reminders, and final prep info closer to the retreat date. Keep an eye on your inbox!</p>
        </div>

        <p class="muted">If you didn't make this registration, please <a href="${d.urls.contact}">contact us immediately</a>.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

/* ========== Customer Confirmation (Plain Text) ========== */
function generateCustomerEmailText(d: SharedEmailData): string {
  const amountFmt = `${d.currency} ${d.amountPaid.toFixed(2)}`;
  return [
    `🎉 You're in, ${d.firstName}!`,
    `${d.retreatName}`,
    `${d.retreatLocation} • ${d.retreatStart}`,
    ``,
    `Congratulations! Your registration is confirmed and we received your payment of ${amountFmt}.`,
    ``,
    `Registration Details:`,
    `Name: ${d.firstName} ${d.lastName}`,
    `Email: ${d.email}`,
    `Amount Paid: ${amountFmt}`,
    `Confirmation: ${d.sessionId}`,
    ``,
    `🚀 What happens next:`,
    `- Review your itinerary: ${d.urls.itinerary}`,
    `- Check the packing list: ${d.urls.packingList}`,
    `- Browse our FAQ: ${d.urls.faq}`,
    `- Contact us anytime: ${d.urls.contact}`,
    ``,
    `Your retreat portal: ${d.urls.successPortal}`,
    ``,
    `Need to make changes? Just reply to this email and we'll take care of it.`,
    ``,
    `We'll send travel details and final prep info closer to the retreat date!`,
  ].join('\n');
}

/* ========== Internal Admin Notification (HTML) ========== */
function generateAdminEmailHtml(d: SharedEmailData): string {
  const amountFmt = d.amountPaid.toLocaleString(undefined, {
    style: 'currency',
    currency: d.currency || 'USD',
    minimumFractionDigits: 2,
  });

  return `
  <!doctype html>
  <html>
  <head>
    <meta charSet="utf-8" />
    <title>New Registration — ${escapeHtml(d.firstName)} ${escapeHtml(d.lastName)}</title>
    <style>
      body { font-family: Arial, sans-serif; color: #222; background: #fff; }
      .wrap { max-width: 680px; margin: 0 auto; padding: 16px; }
      .h { color: #2d5016; }
      .row { margin: 6px 0; }
      .label { font-weight: bold; color: #2d5016; }
      a { color: #2d5016; }
      .box { background: #f7faf7; border-left: 4px solid #2d5016; padding: 12px; margin: 12px 0; }
      .payment { background: #e8f5e8; padding: 12px; border-radius: 6px; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <h2 class="h">🎉 New Registration Confirmed</h2>
      
      <div class="payment">
        <div class="row"><span class="label">💰 Amount Received:</span> ${amountFmt} (${escapeHtml(d.currency)})</div>
        <div class="row"><span class="label">📧 Customer:</span> ${escapeHtml(d.firstName)} ${escapeHtml(d.lastName)} (${escapeHtml(d.email)})</div>
      </div>

      <div class="row"><span class="label">🎯 Retreat:</span> ${escapeHtml(d.retreatName)}</div>
      <div class="row"><span class="label">📅 Dates:</span> ${escapeHtml(d.retreatStart)}</div>
      <div class="row"><span class="label">📍 Location:</span> ${escapeHtml(d.retreatLocation)}</div>
      <div class="row"><span class="label">🔗 Session ID:</span> ${escapeHtml(d.sessionId)}</div>

      <div class="box">
        <div><strong>Quick Links:</strong></div>
        <div><a href="${d.urls.successPortal}">Registration Portal</a> • <a href="${d.urls.itinerary}">Itinerary</a> • <a href="${d.urls.packingList}">Packing</a> • <a href="${d.urls.faq}">FAQ</a> • <a href="${d.urls.terms}">Terms</a></div>
      </div>
      
      <p><em>Customer confirmation email has been sent automatically.</em></p>
    </div>
  </body>
  </html>
  `;
}

/* ========== Internal Admin Notification (Plain Text) ========== */
function generateAdminEmailText(d: SharedEmailData): string {
  const amountFmt = `${d.currency} ${d.amountPaid.toFixed(2)}`;
  return [
    `🎉 New Registration Confirmed`,
    ``,
    `💰 Amount Received: ${amountFmt}`,
    `📧 Customer: ${d.firstName} ${d.lastName} (${d.email})`,
    `🎯 Retreat: ${d.retreatName}`,
    `📅 Dates: ${d.retreatStart}`,
    `📍 Location: ${d.retreatLocation}`,
    `🔗 Session ID: ${d.sessionId}`,
    ``,
    `Quick Links:`,
    `- Registration Portal: ${d.urls.successPortal}`,
    `- Itinerary: ${d.urls.itinerary}`,
    `- Packing List: ${d.urls.packingList}`,
    `- FAQ: ${d.urls.faq}`,
    `- Terms: ${d.urls.terms}`,
    ``,
    `Customer confirmation email sent automatically.`,
  ].join('\n');
}

/* ========== util ========== */
function escapeHtml(s: string) {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}