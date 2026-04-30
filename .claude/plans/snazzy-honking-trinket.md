# Plan: Adaptive Success Page + Email Fix

## Context
Three issues:
1. **Success page is hardcoded for Costa Rica** — shows "Review Itinerary", "Check Packing List", Costa Rica defaults even for the Jasper workshop registration
2. **Admin notification emails go to `parker@thebtcp.com`** which isn't working — need to change to `estroop3@gmail.com`
3. **Confirmation email not being received** — likely because `replyTo` and admin `to` use the broken `parker@thebtcp.com` domain; need to update all instances

## Changes

### 1. Adaptive Success Page (`src/app/register/success/page.tsx`)

Read `retreat_type` from Stripe metadata and render experience-specific content:

- **Extract** `retreatType = session.metadata?.retreat_type || 'costa-rica'`
- **Define experience configs** with per-type next steps, action buttons, and descriptions:
  - `filmmaking-workshop`: "Get ready for the workshop" steps (no itinerary/packing list), buttons → FAQ + Contact only
  - `costa-rica`: Current content (itinerary, packing list, travel planning)
  - `texas`: Similar to Costa Rica but Texas-specific links
- **Conditionally render** the "What happens next" steps and action buttons based on type
- **Update metadata description** to be generic instead of "Costa Rica"

### 2. Email Recipient Update — All `parker@thebtcp.com` → `estroop3@gmail.com`

Files to update (admin/notification `to:` addresses and `replyTo:` only — NOT public-facing mailto links on pages):

- `src/app/api/stripe-webhook/route.ts` (lines 187, 194, 211, 214) — admin notification + replyTo
- `src/app/api/send-registration-email/route.ts` (line 37) — admin notification
- `src/app/api/subscribe/route.ts` (lines 129, 196) — subscriber notification
- `src/app/api/test-resend/route.ts` (line 30) — test email
- `src/app/api/test/pretrip-emails/route.ts` (line 59) — test replyTo
- `src/lib/resend.ts` (line 6) — `CONTACT_INBOX_EMAIL` default
- `src/lib/retreatEmail.ts` (line 7) — `HOST_EMAIL` default
- `src/lib/emailClient.ts` (line 7) — default replyTo

### 3. Customer Confirmation Email — Workshop-Specific Content

In `src/app/api/stripe-webhook/route.ts`, the customer email template (`generateCustomerEmailHtml`/`Text`) has Costa Rica-specific content:
- Line 368: "Check out the packing list for Costa Rica"
- Line 375-378: Buttons for Itinerary, Packing List — not relevant for workshop

Need to pass `retreat_type` through to the email generators and conditionally render next steps.

## Verification
- `npx tsc --noEmit` compiles clean
- Register for workshop → Stripe checkout → success page shows workshop-specific content (no itinerary/packing buttons)
- Register for Costa Rica → success page shows full retreat content
- Admin email arrives at estroop3@gmail.com
- Customer confirmation email has correct content per experience type
