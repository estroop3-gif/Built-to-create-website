# Born to Create Project - Secure Gear Checklist Feature

## Overview

This implements a secure, tokenized gear checklist page accessible only via signed links sent in email campaigns. The checklist features interactive checkboxes, PDF generation with personalization, and complete integration with the Resend email system.

## Features Implemented

- **Secure Access**: HMAC-signed tokens with expiration for link security
- **Interactive Checklist**: 40+ gear items across 6 categories with browser-based checking
- **PDF Generation**: Both default and personalized PDF downloads using @react-pdf/renderer
- **Email Integration**: React email templates with dynamic signed links per lead
- **Analytics Tracking**: Google Analytics events for page views and downloads
- **SEO Protection**: No-index headers and middleware-level access control

## Environment Variables Required

Add these to your Vercel environment variables:

```env
# Required - Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Required - Link Security
BORN_TO_CREATE_LINK_SECRET=your_very_long_random_secret_string_here_minimum_32_chars

# Optional - Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Existing variables (should already be set)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
CRON_SECRET=your_cron_secret
```

## Files Added/Modified

### Core Security & Token System
- `middleware.ts` - Token validation and no-index headers
- `src/lib/linkToken.ts` - HMAC token signing/verification system

### Gear Checklist Feature
- `src/app/resources/gear-checklist/page.tsx` - Interactive checklist page
- `src/app/resources/gear-checklist/download/route.ts` - PDF download API
- `src/components/GearChecklistPdf.tsx` - PDF generation component

### Email System Updates
- `src/lib/emailClient.ts` - Resend client configuration
- `emails/Email1Welcome.tsx` - Welcome email with signed checklist link
- `emails/Email2Story.tsx` - Story & vision email
- `emails/Email3ManualMode.tsx` - Manual mode tutorial email
- `src/lib/services/email.ts` - Updated to use React templates with Resend

## Deployment Steps

### 1. Environment Variables
Set all required environment variables in Vercel dashboard under Settings > Environment Variables.

### 2. Database (Already Complete)
The existing Supabase schema supports the new email system.

### 3. Resend Setup

#### Domain Verification
1. Go to Resend dashboard → Domains
2. Add `thebtcp.com` if not already verified
3. Add required DNS records:

```dns
# SPF Record (if not already set)
TXT @ "v=spf1 include:_spf.resend.com ~all"

# DKIM Record (get actual values from Resend dashboard)
CNAME resend._domainkey "xxx.resend.com"
```

#### Webhook Configuration (Optional)
- URL: `https://thebtcp.com/api/email/webhook`
- Events: `email.delivered`, `email.opened`, `email.clicked`, `email.bounced`, `email.complaint`

### 4. Generate Link Secret
Generate a secure random string for `BORN_TO_CREATE_LINK_SECRET`:

```bash
openssl rand -hex 32
```

### 5. Deploy to Vercel
Push to GitHub and deploy. The middleware and new routes will be automatically deployed.

## Testing the System

### 1. Access Control Tests
```bash
# Should return 404 (no token)
curl -I https://thebtcp.com/resources/gear-checklist

# Should return 404 (invalid token) 
curl -I "https://thebtcp.com/resources/gear-checklist?t=invalid"

# Should return 200 (valid token) - get token from email
curl -I "https://thebtcp.com/resources/gear-checklist?t=VALID_TOKEN_HERE"
```

### 2. Email Integration Test
```bash
# Test subscription (should send welcome email with signed link)
curl -X POST https://thebtcp.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","first_name":"Test"}'
```

### 3. PDF Generation Test
1. Access checklist with valid token
2. Select some items
3. Download both "Quick Download" and "Personalized" PDFs
4. Verify personalized PDF shows checked items

### 4. Analytics Verification
- Open browser dev tools → Network tab
- Visit checklist page → should see `checklist_view` event
- Download PDF → should see `checklist_download` event

## Code Examples

### Generate Signed Links (for use in emails)
```typescript
import { checklistUrlForLead } from '@/lib/linkToken';

// For email campaigns
const signedUrl = checklistUrlForLead('lead:user@example.com');
// Returns: https://thebtcp.com/resources/gear-checklist?t=eyJ0eXAi...
```

### Email Template Usage
```typescript
import { render } from '@react-email/render';
import Email1Welcome from '@/emails/Email1Welcome';
import { checklistUrlForLead } from '@/lib/linkToken';

const emailHtml = render(Email1Welcome({
  firstName: 'John',
  checklistUrl: checklistUrlForLead('lead:john@example.com'),
  registerUrl: 'https://thebtcp.com/register',
  unsubscribeUrl: 'https://thebtcp.com/api/unsubscribe?email=john@example.com'
}));
```

## Security Features

### Token Security
- HMAC-SHA256 signed tokens with shared secret
- 30-day expiration by default
- Timing-safe comparison to prevent timing attacks
- Base64URL encoding for URL safety

### Access Control
- Middleware-level token validation (fast, runs on edge)
- 404 responses for invalid/missing tokens (no information leakage)
- No-index headers prevent search engine indexing
- Referrer validation for PDF downloads

### Privacy Protection
- No personal data in URLs (tokens contain only lead identifiers)
- Unguessable URLs prevent casual discovery
- No sitemap inclusion
- No internal linking from main site

## Performance Optimizations

- **Edge Runtime**: Middleware and API routes use edge runtime for global performance
- **PDF Caching**: PDF generation is per-request but uses efficient React PDF renderer
- **Email Templates**: React email templates compiled at runtime for personalization
- **Client-Side State**: Checkbox state managed in browser, not server

## Analytics & Monitoring

### Tracked Events
- `checklist_view` - Page accessed with valid token
- `checklist_download` - PDF downloaded (includes type and item count)

### Email Events (via Resend webhooks)
- Email delivered, opened, clicked, bounced, complained
- Automatic unsubscribe for bounces/complaints

### Logs to Monitor
- Vercel Functions logs for email sending
- Middleware logs for token validation failures
- PDF generation errors

## Troubleshooting

### Common Issues

**"Token invalid" errors**
- Check `BORN_TO_CREATE_LINK_SECRET` is set correctly
- Verify token hasn't expired (30 days default)
- Ensure no URL encoding issues with token parameter

**PDF downloads fail**
- Check if @react-pdf/renderer dependencies installed
- Verify referrer header contains valid token
- Check Node.js runtime (PDFs use nodejs runtime)

**Emails not sending**
- Verify `RESEND_API_KEY` is valid
- Check domain verification in Resend
- Review email service logs in Vercel

**Access denied (404)**
- Confirm middleware is deployed (check `middleware.ts`)
- Verify token format and signature
- Check network tab for actual response

## Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Resend domain verified with DNS records
- [ ] `BORN_TO_CREATE_LINK_SECRET` is secure (32+ characters)
- [ ] Email templates render correctly
- [ ] PDF generation works for both default and personalized
- [ ] Analytics events firing correctly
- [ ] Token security tested (invalid tokens return 404)
- [ ] Webhook endpoint configured in Resend (optional)
- [ ] No-index headers present on checklist page

## Next Steps

1. **Additional Email Templates**: Create templates for stages 4-9 in the sequence
2. **Enhanced Analytics**: Add more detailed tracking for checkbox interactions
3. **A/B Testing**: Test different checklist layouts or copy
4. **Mobile Optimization**: Enhance mobile PDF viewing experience

---

For technical support, check Vercel logs and Resend dashboard. All sensitive operations log errors for debugging.