// src/app/api/stripe-webhook/route.ts
// Webhook that sends:
// 1) Customer confirmation email (to the registrant)
// 2) Internal notification (to parker@thebtcp.com)
//
// Requirements:
// - Next.js App Router
// - npm i stripe resend
// - Env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, RESEND_API_KEY, EMAIL_FROM, SITE_URL
//
// Notes:
// - Ensure your Stripe Dashboard webhook points to https://www.thebtcp.com/api/stripe-webhook
// - If your “retreat” metadata or other fields differ, adjust the mapping below.

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
const resend = new Resend(process.env.RESEND_API_KEY!);

const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';
const SITE_URL = (process.env.SITE_URL || 'https://www.thebtcp.com').replace(/\/+$/, ''); // no trailing slash

export async function POST(req: Request) {
  try {
    // --- Verify signature with RAW body ---
    const sig = req.headers.get('stripe-signature') as string;
    const raw = Buffer.from(await req.arrayBuffer());
    const event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    // --- Handle successful Checkout ---
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract useful info (customize if you pass more via metadata)
      const email = session.customer_details?.email || '';
      const name = session.customer_details?.name || '';
      const [firstName, ...lastNameArr] = name.trim().split(' ');
      const lastName = lastNameArr.join(' ');
      const amountPaid = (session.amount_total ?? 0) / 100; // USD
      const currency = (session.currency || 'usd').toUpperCase();

      // Optional metadata you may set when creating the Checkout Session
      const retreatName =
        session.metadata?.retreat ||
        'Born to Create Project Retreat';
      const retreatStart = session.metadata?.retreat_start || ''; // e.g. "Sept 14, 2025"
      const retreatLocation = session.metadata?.retreat_location || ''; // e.g. "Costa Rica"

      // Build URLs we’ll link in emails (edit if your site uses different slugs)
      const urls = {
        homepage: `${SITE_URL}/`,
        itinerary: `${SITE_URL}/itinerary`,
        faq: `${SITE_URL}/faq`,
        packingList: `${SITE_URL}/packing-list`,
        terms: `${SITE_URL}/terms`,
        contact: `${SITE_URL}/contact`,
        successPortal: `${SITE_URL}/register/success`,
      };

      // Send customer confirmation (only if we have their email)
      if (email) {
        const subjectCustomer = `You’re in! ${retreatName} — Registration Confirmed`;
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
          replyTo: 'parker@thebtcp.com', // reply goes to you
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
  } catch (err: any) {
    console.error('Webhook error:', err?.message || err);
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
  retreatStart?: string;
  retreatLocation?: string;
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
      .btn { display: inline-block; padding: 10px 16px; background: #2d5016; color: #fff !important; text-decoration: none; border-radius: 6px; }
      .muted { color: #666; font-size: 12px; }
      .list a { color: #2d5016; }
      .row { margin: 8px 0; }
      .label { color: #2d5016; font-weight: bold; }
      a { color: #2d5016; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="hero">
        <h1>You're in, ${escapeHtml(d.firstName)}!</h1>
        <p>${escapeHtml(d.retreatName)}${d.retreatLocation ? ` — ${escapeHtml(d.retreatLocation)}` : ''}${d.retreatStart ? ` • ${escapeHtml(d.retreatStart)}` : ''}</p>
      </div>

      <div class="content">
        <p>Thank you for registering. We’ve received your payment of <strong>${amountFmt}</strong>.</p>

        <div class="card">
          <div class="row"><span class="label">Name:</span> ${escapeHtml(d.firstName)} ${escapeHtml(d.lastName)}</div>
          <div class="row"><span class="label">Email:</span> ${escapeHtml(d.email)}</div>
          <div class="row"><span class="label">Amount Paid:</span> ${amountFmt} ${escapeHtml(d.currency)}</div>
          <div class="row"><span class="label">Stripe Session ID:</span> ${escapeHtml(d.sessionId)}</div>
        </div>

        <p>Next steps & helpful links:</p>
        <ul class="list">
          <li><a href="${d.urls.itinerary}">Retreat Itinerary</a></li>
          <li><a href="${d.urls.packingList}">Packing List & Gear Guide</a></li>
          <li><a href="${d.urls.faq}">Frequently Asked Questions</a></li>
          <li><a href="${d.urls.terms}">Terms & Policies</a></li>
          <li><a href="${d.urls.contact}">Contact our team</a></li>
        </ul>

        <p style="margin: 20px 0;">
          <a class="btn" href="${d.urls.successPortal}">View Your Registration Details</a>
        </p>

        <p>If any of your details are incorrect, just reply to this email and we’ll fix it.</p>

        <p class="muted">If you didn’t initiate this registration, please <a href="${d.urls.contact}">contact us</a>.</p>
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
    `You're in, ${d.firstName}!`,
    `${d.retreatName}${d.retreatLocation ? ` — ${d.retreatLocation}` : ''}${d.retreatStart ? ` • ${d.retreatStart}` : ''}`,
    ``,
    `We received your payment of ${amountFmt}.`,
    ``,
    `Name: ${d.firstName} ${d.lastName}`,
    `Email: ${d.email}`,
    `Amount Paid: ${amountFmt}`,
    `Stripe Session ID: ${d.sessionId}`,
    ``,
    `Helpful links:`,
    `- Itinerary: ${d.urls.itinerary}`,
    `- Packing List: ${d.urls.packingList}`,
    `- FAQ: ${d.urls.faq}`,
    `- Terms & Policies: ${d.urls.terms}`,
    `- Contact: ${d.urls.contact}`,
    ``,
    `View your registration details: ${d.urls.successPortal}`,
    ``,
    `If anything looks wrong, reply to this email and we’ll help.`,
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
    </style>
  </head>
  <body>
    <div class="wrap">
      <h2 class="h">New Registration</h2>
      <div class="row"><span class="label">Name:</span> ${escapeHtml(d.firstName)} ${escapeHtml(d.lastName)}</div>
      <div class="row"><span class="label">Email:</span> ${escapeHtml(d.email)}</div>
      <div class="row"><span class="label">Amount Paid:</span> ${amountFmt} (${escapeHtml(d.currency)})</div>
      <div class="row"><span class="label">Session ID:</span> ${escapeHtml(d.sessionId)}</div>
      <div class="row"><span class="label">Retreat:</span> ${escapeHtml(d.retreatName)}</div>
      ${d.retreatLocation ? `<div class="row"><span class="label">Location:</span> ${escapeHtml(d.retreatLocation)}</div>` : ''}
      ${d.retreatStart ? `<div class="row"><span class="label">Start:</span> ${escapeHtml(d.retreatStart)}</div>` : ''}

      <div class="box">
        <div><a href="${d.urls.successPortal}">Registration Portal</a></div>
        <div><a href="${d.urls.faq}">FAQ</a> • <a href="${d.urls.itinerary}">Itinerary</a> • <a href="${d.urls.packingList}">Packing</a> • <a href="${d.urls.terms}">Terms</a> • <a href="${d.urls.contact}">Contact</a></div>
      </div>
    </div>
  </body>
  </html>
  `;
}

/* ========== Internal Admin Notification (Plain Text) ========== */
function generateAdminEmailText(d: SharedEmailData): string {
  const amountFmt = `${d.currency} ${d.amountPaid.toFixed(2)}`;
  return [
    `New Registration`,
    `Name: ${d.firstName} ${d.lastName}`,
    `Email: ${d.email}`,
    `Amount Paid: ${amountFmt}`,
    `Session ID: ${d.sessionId}`,
    `Retreat: ${d.retreatName}`,
    d.retreatLocation ? `Location: ${d.retreatLocation}` : '',
    d.retreatStart ? `Start: ${d.retreatStart}` : '',
    ``,
    `Links:`,
    `- Portal: ${d.urls.successPortal}`,
    `- FAQ: ${d.urls.faq}`,
    `- Itinerary: ${d.urls.itinerary}`,
    `- Packing: ${d.urls.packingList}`,
    `- Terms: ${d.urls.terms}`,
    `- Contact: ${d.urls.contact}`,
  ].filter(Boolean).join('\n');
}

/* ========== util ========== */
function escapeHtml(s: string) {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
