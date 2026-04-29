import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendTransactionalEmail } from '@/lib/resend';
import fs from 'fs';
import { upsertRegistration, type RegistrationData } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const isLiveKey = (k?: string) => !!k && k.startsWith('sk_live');
if (process.env.NODE_ENV !== 'production' && isLiveKey(process.env.STRIPE_SECRET_KEY)) {
  throw new Error('Refusing to start: LIVE Stripe key detected in non-production environment.');
}

export async function POST(req: Request) {
  try {
    // Initialize Stripe inside the handler to avoid build-time environment variable issues
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' });
    
    const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';
    const SITE_URL = (process.env.SITE_URL || 'http://localhost:3000').replace(/\/+$/, ''); // no trailing slash
    
    // For emails, always use production URLs regardless of environment
    const EMAIL_BASE_URL = 'https://www.thebtcp.com';

    // --- Verify signature with RAW body ---
    const sig = req.headers.get('stripe-signature') as string;
    const raw = Buffer.from(await req.arrayBuffer());
    const event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    // --- Handle successful Checkout ---
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Build comprehensive profile object from session data
      const clientEmail = session.customer_details?.email || session.customer_email || session.metadata?.form_email || '';
      const fullName = session.customer_details?.name || [session.metadata?.first_name, session.metadata?.last_name].filter(Boolean).join(' ');
      const firstName = session.metadata?.first_name || (fullName?.split(' ')[0] || '');
      const lastName = session.metadata?.last_name || (fullName?.split(' ').slice(1).join(' ') || '');
      const amountPaid = (session.amount_total ?? 0) / 100;
      const currency = (session.currency || 'usd').toUpperCase();

      const retreatType = session.metadata?.retreat_type || '';
      const isWorkshop = retreatType === 'filmmaking-workshop';

      const profile = {
        firstName,
        lastName,
        email: clientEmail,
        phone: session.customer_details?.phone || session.metadata?.phone || '',
        dateOfBirth: session.metadata?.date_of_birth || '',
        address: {
          line1: session.metadata?.address_line1 || '',
          line2: session.metadata?.address_line2 || '',
          city: session.metadata?.city || '',
          state: session.metadata?.state_province || '',
          postalCode: session.metadata?.postal_code || '',
          country: session.metadata?.country || ''
        },
        emergency: {
          name: session.metadata?.emergency_contact_name || '',
          phone: session.metadata?.emergency_contact_phone || '',
          relationship: session.metadata?.emergency_contact_relationship || ''
        },
        preferences: {
          experienceLevel: session.metadata?.experience_level || '',
          bringOwnCamera: session.metadata?.bring_own_camera === 'true',
          cameraEquipmentDetails: session.metadata?.camera_equipment_details || '',
          dietaryRestrictions: session.metadata?.dietary_restrictions || '',
          medicalConditions: session.metadata?.medical_conditions || '',
          howDidYouHear: session.metadata?.how_did_you_hear || '',
          specialRequests: session.metadata?.special_requests || ''
        },
        plan: {
          label: session.metadata?.plan_label || 'Unknown Plan',
          amountPaid,
          currency
        },
        retreat: {
          name: session.metadata?.retreat || 'Born to Create Project Retreat',
          start: session.metadata?.retreat_start || 'February 20-28, 2026',
          location: session.metadata?.retreat_location || 'Costa Rica',
          type: retreatType,
        },
        stripe: {
          sessionId: session.id,
          createdAtISO: new Date((session.created || 0) * 1000).toISOString()
        },
        links: {
          itinerary: `${EMAIL_BASE_URL}/itinerary`,
          packingList: `${EMAIL_BASE_URL}/packing`,
          faq: `${EMAIL_BASE_URL}/faq`,
          terms: `${EMAIL_BASE_URL}/terms`,
          contact: `${EMAIL_BASE_URL}/contact`,
          successPortal: `${SITE_URL}/register/success?session_id=${session.id}`
        }
      };

      // Legacy compatibility extracts (to avoid breaking existing customer email)
      const planLabel = profile.plan.label;
      const retreatName = profile.retreat.name;
      const retreatStart = profile.retreat.start;
      const retreatLocation = profile.retreat.location;
      const phone = profile.phone;

      // Build URLs
      const urls = {
        homepage: `${EMAIL_BASE_URL}/`,
        itinerary: `${EMAIL_BASE_URL}/itinerary`,
        faq: `${EMAIL_BASE_URL}/faq`,
        packingList: `${EMAIL_BASE_URL}/packing`,
        terms: `${EMAIL_BASE_URL}/terms`,
        contact: `${EMAIL_BASE_URL}/contact`,
        successPortal: `${SITE_URL}/register/success?session_id=${session.id}`,
      };

      // Store registration in Supabase
      try {
        const registrationData: RegistrationData = {
          stripe_session_id: session.id,
          email: profile.email,
          first_name: profile.firstName,
          last_name: profile.lastName,
          phone: profile.phone,
          date_of_birth: profile.dateOfBirth,
          address_line1: profile.address.line1,
          address_line2: profile.address.line2,
          city: profile.address.city,
          state_province: profile.address.state,
          postal_code: profile.address.postalCode,
          country: profile.address.country,
          emergency_contact_name: profile.emergency.name,
          emergency_contact_phone: profile.emergency.phone,
          emergency_contact_relationship: profile.emergency.relationship,
          experience_level: profile.preferences.experienceLevel,
          bring_own_camera: profile.preferences.bringOwnCamera,
          camera_equipment_details: profile.preferences.cameraEquipmentDetails,
          dietary_restrictions: profile.preferences.dietaryRestrictions,
          medical_conditions: profile.preferences.medicalConditions,
          how_did_you_hear: profile.preferences.howDidYouHear,
          special_requests: profile.preferences.specialRequests,
          plan_label: profile.plan.label,
          amount_paid: profile.plan.amountPaid,
          currency: profile.plan.currency,
          retreat: profile.retreat.name,
          retreat_start: profile.retreat.start,
          retreat_location: profile.retreat.location
        };

        await upsertRegistration(registrationData);
        console.log('✅ Registration stored in Supabase:', registrationData.email);

        // Increment promo code usage if one was used
        const usedPromo = session.metadata?.promo_code;
        if (usedPromo) {
          try {
            const { validatePromoCode, incrementUsage } = await import('@/lib/services/promoCodeService');
            const validation = await validatePromoCode(usedPromo);
            if (validation.valid && validation.promo_code) {
              await incrementUsage(validation.promo_code.id);
              console.log('✅ Promo code usage incremented:', usedPromo);
            }
          } catch (promoError) {
            console.error('❌ Failed to increment promo code usage:', promoError);
          }
        }

        // Increment experience registered_count if identifiable
        try {
          const { supabaseAdmin: adminClient } = await import('@/lib/supabaseAdmin');
          const retreatName = session.metadata?.retreat;
          if (retreatName) {
            const { data: exp } = await adminClient
              .from('experiences')
              .select('id, registered_count')
              .eq('title', retreatName)
              .single();

            if (exp) {
              await adminClient
                .from('experiences')
                .update({ registered_count: (exp.registered_count || 0) + 1 })
                .eq('id', exp.id);
              console.log('✅ Experience registered_count incremented for:', retreatName);
            }
          }
        } catch (expError) {
          console.error('❌ Failed to increment experience count:', expError);
        }
      } catch (error) {
        console.error('❌ Failed to store registration in Supabase:', error);
      }

      // Send customer confirmation email
      if (clientEmail) {
        const subjectCustomer = isWorkshop
          ? `You're registered! ${retreatName} — Confirmation`
          : `You're in! ${retreatName} — Registration Confirmed`;
        const htmlCustomer = generateCustomerEmailHtml({
          firstName: firstName || 'Friend',
          lastName,
          email: clientEmail,
          phone,
          amountPaid,
          currency,
          planLabel,
          retreatName,
          retreatStart,
          retreatLocation,
          isWorkshop,
          urls,
          sessionId: session.id,
        });
        const textCustomer = generateCustomerEmailText({
          firstName: firstName || 'Friend',
          lastName,
          email: clientEmail,
          phone,
          amountPaid,
          currency,
          planLabel,
          retreatName,
          retreatStart,
          retreatLocation,
          isWorkshop,
          urls,
          sessionId: session.id,
        });

        // DEBUG: Capture client email payload for QA verification
        fs.writeFileSync('/tmp/client_email_rendered.html', htmlCustomer);
        fs.writeFileSync('/tmp/client_email_rendered.txt', textCustomer);
        fs.writeFileSync('/tmp/client_email_meta.txt', `Subject: ${subjectCustomer}\nTo: ${clientEmail}\nFrom: ${EMAIL_FROM}\nReplyTo: estroop3@gmail.com`);

        const result = await sendTransactionalEmail({
          to: clientEmail,
          subject: subjectCustomer,
          html: htmlCustomer,
          text: textCustomer,
          replyTo: 'estroop3@gmail.com',
        });

        if (result.error) {
          console.error('Customer email error:', result.error);
        }
      }

      // Send internal notification to Parker
      {
        const subjectAdmin = `New Registration — ${profile.firstName || 'Guest'} ${profile.lastName || ''} • ${profile.plan.label}`;
        const htmlAdmin = generateAdminEmailHtml(profile);
        const textAdmin = generateAdminEmailText(profile);

        // DEBUG: Capture admin email payload for QA verification
        fs.writeFileSync('/tmp/admin_email_rendered.html', htmlAdmin);
        fs.writeFileSync('/tmp/admin_email_rendered.txt', textAdmin);
        fs.writeFileSync('/tmp/admin_email_meta.txt', `Subject: ${subjectAdmin}\nTo: estroop3@gmail.com\nFrom: ${EMAIL_FROM}\nReplyTo: ${profile.email || 'undefined'}`);

        const adminResult = await sendTransactionalEmail({
          to: 'estroop3@gmail.com',
          subject: subjectAdmin,
          html: htmlAdmin,
          text: textAdmin,
          replyTo: profile.email || undefined,
        });

        if (adminResult.error) {
          console.error('Admin email error:', adminResult.error);
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
  phone: string;
  amountPaid: number;
  currency: string;
  planLabel: string;
  retreatName: string;
  retreatStart: string;
  retreatLocation: string;
  isWorkshop?: boolean;
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

type RegistrantProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  emergency: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferences: {
    experienceLevel: string;
    bringOwnCamera: boolean;
    cameraEquipmentDetails: string;
    dietaryRestrictions: string;
    medicalConditions: string;
    howDidYouHear: string;
    specialRequests: string;
  };
  plan: {
    label: string;
    amountPaid: number;
    currency: string;
  };
  retreat: {
    name: string;
    start: string;
    location: string;
    type: string;
  };
  stripe: {
    sessionId: string;
    createdAtISO: string;
  };
  links: {
    itinerary: string;
    packingList: string;
    faq: string;
    terms: string;
    contact: string;
    successPortal: string;
  };
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
          <div class="row"><span class="label">Plan:</span> ${escapeHtml(d.planLabel)}</div>
          <div class="row"><span class="label">Amount Paid:</span> ${amountFmt} ${escapeHtml(d.currency)}</div>
          <div class="row"><span class="label">Confirmation:</span> ${escapeHtml(d.sessionId)}</div>
        </div>

        <div class="checklist">
          <h3 style="color: #2d5016; margin-top: 0;">🚀 What happens next:</h3>
          ${d.isWorkshop ? `
          <ul>
            <li>📅 Mark your calendar — ${escapeHtml(d.retreatStart)}</li>
            <li>📍 Location: ${escapeHtml(d.retreatLocation)}</li>
            <li>🎬 No gear needed — everything will be provided</li>
            <li>⏰ Arrive about 10 minutes early to get settled</li>
            <li>❓ Browse our FAQ for common questions</li>
            <li>📱 Questions? Reach out anytime</li>
          </ul>
          ` : `
          <ul>
            <li>📋 Review your detailed itinerary and daily schedule</li>
            <li>🎒 Check out the packing list for Costa Rica</li>
            <li>✈️ Plan your travel (we'll send airport/timing details soon)</li>
            <li>❓ Browse our FAQ for common questions</li>
            <li>📱 Connect with us if you need anything</li>
          </ul>
          `}
        </div>

        <div class="button-group">
          ${d.isWorkshop ? '' : `
          <a class="btn" href="${d.urls.itinerary}">📋 View Itinerary</a>
          <a class="btn" href="${d.urls.packingList}">🎒 Packing List</a>
          `}
          <a class="btn" href="${d.urls.faq}">❓ FAQ</a>
          <a class="btn" href="${d.urls.contact}">📱 Contact Us</a>
        </div>

        <p>Your ${d.isWorkshop ? 'registration details' : 'retreat portal'}: <a href="${d.urls.successPortal}">View Registration Details</a></p>

        <p><strong>Need to make changes?</strong> Just reply to this email and we'll take care of it.</p>

        <div class="card">
          ${d.isWorkshop
            ? `<p style="margin: 0;"><strong>Important:</strong> We'll send a reminder as the workshop date approaches. Keep an eye on your inbox!</p>`
            : `<p style="margin: 0;"><strong>Important:</strong> We'll send travel details, packing reminders, and final prep info closer to the retreat date. Keep an eye on your inbox!</p>`
          }
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
  const lines = [
    d.isWorkshop ? `🎉 You're registered, ${d.firstName}!` : `🎉 You're in, ${d.firstName}!`,
    `${d.retreatName}`,
    `${d.retreatLocation} • ${d.retreatStart}`,
    ``,
    `Congratulations! Your registration is confirmed and we received your payment of ${amountFmt}.`,
    ``,
    `Registration Details:`,
    `Name: ${d.firstName} ${d.lastName}`,
    `Email: ${d.email}`,
    `Plan: ${d.planLabel}`,
    `Amount Paid: ${amountFmt}`,
    `Confirmation: ${d.sessionId}`,
    ``,
    `🚀 What happens next:`,
  ];

  if (d.isWorkshop) {
    lines.push(
      `- Mark your calendar: ${d.retreatStart}`,
      `- Location: ${d.retreatLocation}`,
      `- No gear needed — everything will be provided`,
      `- Arrive about 10 minutes early to get settled`,
      `- Browse our FAQ: ${d.urls.faq}`,
      `- Contact us anytime: ${d.urls.contact}`,
    );
  } else {
    lines.push(
      `- Review your itinerary: ${d.urls.itinerary}`,
      `- Check the packing list: ${d.urls.packingList}`,
      `- Browse our FAQ: ${d.urls.faq}`,
      `- Contact us anytime: ${d.urls.contact}`,
    );
  }

  lines.push(
    ``,
    `Your ${d.isWorkshop ? 'registration details' : 'retreat portal'}: ${d.urls.successPortal}`,
    ``,
    `Need to make changes? Just reply to this email and we'll take care of it.`,
    ``,
    d.isWorkshop
      ? `We'll send a reminder as the workshop date approaches!`
      : `We'll send travel details and final prep info closer to the retreat date!`,
  );

  return lines.join('\n');
}

/* ========== Internal Admin Notification (HTML) ========== */
function generateAdminEmailHtml(profile: RegistrantProfile): string {
  const isWorkshop = profile.retreat.type === 'filmmaking-workshop';
  const amountFmt = profile.plan.amountPaid.toLocaleString(undefined, {
    style: 'currency',
    currency: profile.plan.currency || 'USD',
    minimumFractionDigits: 2,
  });

  const formatAddress = () => {
    const parts = [
      profile.address.line1,
      profile.address.line2,
      profile.address.city,
      profile.address.state,
      profile.address.postalCode,
      profile.address.country
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'Not provided';
  };

  return `
  <!doctype html>
  <html>
  <head>
    <meta charSet="utf-8" />
    <title>New Registration — ${escapeHtml(profile.firstName)} ${escapeHtml(profile.lastName)}</title>
    <style>
      body { font-family: Arial, sans-serif; color: #222; background: #fff; margin: 0; padding: 0; }
      .wrap { max-width: 720px; margin: 0 auto; padding: 16px; }
      .h { color: #2d5016; margin-bottom: 16px; }
      .section { margin: 20px 0; }
      .section-title { color: #2d5016; font-size: 16px; font-weight: bold; margin: 16px 0 8px; border-bottom: 2px solid #2d5016; padding-bottom: 4px; }
      .payment { background: #e8f5e8; padding: 16px; border-radius: 6px; margin: 16px 0; }
      .profile-table { width: 100%; border-collapse: collapse; margin: 12px 0; }
      .profile-table th { background: #f7faf7; color: #2d5016; font-weight: bold; padding: 8px 12px; text-align: left; border: 1px solid #ddd; }
      .profile-table td { padding: 8px 12px; border: 1px solid #ddd; vertical-align: top; }
      .profile-table tr:nth-child(even) td { background: #f9f9f9; }
      a { color: #2d5016; }
      .box { background: #f7faf7; border-left: 4px solid #2d5016; padding: 12px; margin: 12px 0; }
      .timestamp { color: #666; font-size: 12px; font-style: italic; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <h2 class="h">🎉 New Registration: ${escapeHtml(profile.firstName)} ${escapeHtml(profile.lastName)}</h2>

      <div class="payment">
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">💰 Payment Confirmed: ${amountFmt}</div>
        <div>Plan: ${escapeHtml(profile.plan.label)} • Session: ${escapeHtml(profile.stripe.sessionId)}</div>
        <div class="timestamp">Registered: ${new Date(profile.stripe.createdAtISO).toLocaleString()}</div>
      </div>

      <div class="section-title">📋 Registrant Profile</div>
      <table class="profile-table">
        <tr><th>Name</th><td>${escapeHtml(profile.firstName)} ${escapeHtml(profile.lastName)}</td></tr>
        <tr><th>Email</th><td>${escapeHtml(profile.email)}</td></tr>
        ${profile.phone ? `<tr><th>Phone</th><td>${escapeHtml(profile.phone)}</td></tr>` : ''}
        ${profile.dateOfBirth ? `<tr><th>Date of Birth</th><td>${escapeHtml(profile.dateOfBirth)}</td></tr>` : ''}
        <tr><th>Address</th><td>${escapeHtml(formatAddress())}</td></tr>
      </table>

      ${!isWorkshop && profile.emergency.name ? `
      <div class="section-title">🚨 Emergency Contact</div>
      <table class="profile-table">
        <tr><th>Name</th><td>${escapeHtml(profile.emergency.name)}</td></tr>
        ${profile.emergency.phone ? `<tr><th>Phone</th><td>${escapeHtml(profile.emergency.phone)}</td></tr>` : ''}
        ${profile.emergency.relationship ? `<tr><th>Relationship</th><td>${escapeHtml(profile.emergency.relationship)}</td></tr>` : ''}
      </table>
      ` : ''}

      ${isWorkshop ? `
      <div class="section-title">🎬 Workshop Information</div>
      <table class="profile-table">
        ${profile.preferences.experienceLevel ? `<tr><th>Experience Level</th><td>${escapeHtml(profile.preferences.experienceLevel)}</td></tr>` : ''}
        ${profile.preferences.howDidYouHear ? `<tr><th>How Did You Hear</th><td>${escapeHtml(profile.preferences.howDidYouHear)}</td></tr>` : ''}
      </table>
      ` : `
      <div class="section-title">🎬 Filmmaking Preferences</div>
      <table class="profile-table">
        ${profile.preferences.experienceLevel ? `<tr><th>Experience Level</th><td>${escapeHtml(profile.preferences.experienceLevel)}</td></tr>` : ''}
        <tr><th>Bringing Own Camera</th><td>${profile.preferences.bringOwnCamera ? 'Yes' : 'No'}</td></tr>
        ${profile.preferences.cameraEquipmentDetails ? `<tr><th>Camera Equipment</th><td>${escapeHtml(profile.preferences.cameraEquipmentDetails)}</td></tr>` : ''}
        ${profile.preferences.howDidYouHear ? `<tr><th>How Did You Hear</th><td>${escapeHtml(profile.preferences.howDidYouHear)}</td></tr>` : ''}
      </table>
      `}

      ${!isWorkshop && (profile.preferences.dietaryRestrictions || profile.preferences.medicalConditions || profile.preferences.specialRequests) ? `
      <div class="section-title">🏥 Health & Special Needs</div>
      <table class="profile-table">
        ${profile.preferences.dietaryRestrictions ? `<tr><th>Dietary Restrictions</th><td>${escapeHtml(profile.preferences.dietaryRestrictions)}</td></tr>` : ''}
        ${profile.preferences.medicalConditions ? `<tr><th>Medical Conditions</th><td>${escapeHtml(profile.preferences.medicalConditions)}</td></tr>` : ''}
        ${profile.preferences.specialRequests ? `<tr><th>Special Requests</th><td>${escapeHtml(profile.preferences.specialRequests)}</td></tr>` : ''}
      </table>
      ` : ''}

      <div class="section-title">${isWorkshop ? '🎬 Workshop Information' : '🏝️ Retreat Information'}</div>
      <table class="profile-table">
        <tr><th>${isWorkshop ? 'Workshop' : 'Retreat'}</th><td>${escapeHtml(profile.retreat.name)}</td></tr>
        <tr><th>${isWorkshop ? 'Date' : 'Dates'}</th><td>${escapeHtml(profile.retreat.start)}</td></tr>
        <tr><th>Location</th><td>${escapeHtml(profile.retreat.location)}</td></tr>
      </table>

      <div class="box">
        <div><strong>Quick Actions:</strong></div>
        <div>
          <a href="${profile.links.successPortal}">Registration Portal</a> •
          ${isWorkshop ? '' : `<a href="${profile.links.itinerary}">Itinerary</a> • `}
          <a href="${profile.links.faq}">FAQ</a> •
          <a href="${profile.links.contact}">Contact</a>
        </div>
      </div>

      <p><em>Customer confirmation email has been sent automatically to ${escapeHtml(profile.email)}.</em></p>
    </div>
  </body>
  </html>
  `;
}

/* ========== Internal Admin Notification (Plain Text) ========== */
function generateAdminEmailText(profile: RegistrantProfile): string {
  const isWorkshop = profile.retreat.type === 'filmmaking-workshop';
  const amountFmt = `${profile.plan.currency} ${profile.plan.amountPaid.toFixed(2)}`;

  const formatAddress = () => {
    const parts = [
      profile.address.line1,
      profile.address.line2,
      profile.address.city,
      profile.address.state,
      profile.address.postalCode,
      profile.address.country
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'Not provided';
  };

  const lines = [
    `🎉 NEW REGISTRATION: ${profile.firstName} ${profile.lastName}`,
    ``,
    `💰 PAYMENT CONFIRMED: ${amountFmt}`,
    `📋 Plan: ${profile.plan.label}`,
    `🔗 Session: ${profile.stripe.sessionId}`,
    `📅 Registered: ${new Date(profile.stripe.createdAtISO).toLocaleString()}`,
    ``,
    `👤 REGISTRANT PROFILE`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `Name: ${profile.firstName} ${profile.lastName}`,
    `Email: ${profile.email}`,
    ...(profile.phone ? [`Phone: ${profile.phone}`] : []),
    ...(profile.dateOfBirth ? [`Date of Birth: ${profile.dateOfBirth}`] : []),
    `Address: ${formatAddress()}`,
    ``
  ];

  if (!isWorkshop && profile.emergency.name) {
    lines.push(
      `🚨 EMERGENCY CONTACT`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `Name: ${profile.emergency.name}`,
      ...(profile.emergency.phone ? [`Phone: ${profile.emergency.phone}`] : []),
      ...(profile.emergency.relationship ? [`Relationship: ${profile.emergency.relationship}`] : []),
      ``
    );
  }

  if (isWorkshop) {
    lines.push(
      `🎬 WORKSHOP INFORMATION`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ...(profile.preferences.experienceLevel ? [`Experience Level: ${profile.preferences.experienceLevel}`] : []),
      ...(profile.preferences.howDidYouHear ? [`How Did You Hear: ${profile.preferences.howDidYouHear}`] : []),
      ``
    );
  } else {
    lines.push(
      `🎬 FILMMAKING PREFERENCES`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ...(profile.preferences.experienceLevel ? [`Experience Level: ${profile.preferences.experienceLevel}`] : []),
      `Bringing Own Camera: ${profile.preferences.bringOwnCamera ? 'Yes' : 'No'}`,
      ...(profile.preferences.cameraEquipmentDetails ? [`Camera Equipment: ${profile.preferences.cameraEquipmentDetails}`] : []),
      ...(profile.preferences.howDidYouHear ? [`How Did You Hear: ${profile.preferences.howDidYouHear}`] : []),
      ``
    );
  }

  if (!isWorkshop && (profile.preferences.dietaryRestrictions || profile.preferences.medicalConditions || profile.preferences.specialRequests)) {
    lines.push(
      `🏥 HEALTH & SPECIAL NEEDS`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ...(profile.preferences.dietaryRestrictions ? [`Dietary Restrictions: ${profile.preferences.dietaryRestrictions}`] : []),
      ...(profile.preferences.medicalConditions ? [`Medical Conditions: ${profile.preferences.medicalConditions}`] : []),
      ...(profile.preferences.specialRequests ? [`Special Requests: ${profile.preferences.specialRequests}`] : []),
      ``
    );
  }

  lines.push(
    isWorkshop ? `🎬 WORKSHOP DETAILS` : `🏝️ RETREAT INFORMATION`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `${isWorkshop ? 'Workshop' : 'Retreat'}: ${profile.retreat.name}`,
    `${isWorkshop ? 'Date' : 'Dates'}: ${profile.retreat.start}`,
    `Location: ${profile.retreat.location}`,
    ``,
    `🔗 QUICK LINKS`,
    `━━━━━━━━━━━━━━`,
    `Registration Portal: ${profile.links.successPortal}`,
    ...(isWorkshop ? [] : [`Itinerary: ${profile.links.itinerary}`]),
    `FAQ: ${profile.links.faq}`,
    `Contact: ${profile.links.contact}`,
    ``,
    `📧 Customer confirmation email sent automatically to ${profile.email}.`
  );

  return lines.join('\n');
}

/* ========== util ========== */
function escapeHtml(s: string) {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}