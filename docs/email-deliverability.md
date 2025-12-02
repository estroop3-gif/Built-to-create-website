# Email Deliverability Setup Guide

This guide covers the comprehensive email deliverability system implemented for the Born to Create Project, designed to ensure maximum inbox delivery rates and compliance with modern email provider requirements.

## Overview

The email system uses Resend with a dedicated subdomain (`mail.thebtcp.com`) and implements all modern deliverability best practices including:

- **SPF, DKIM, and DMARC authentication**
- **List-Unsubscribe and One-Click unsubscribe headers**
- **Proper HTML and plain text content**
- **Transactional vs promotional email separation**
- **Comprehensive unsubscribe tracking**

## Domain Setup

### 1. DNS Configuration

The following DNS records must be configured for `thebtcp.com`:

#### Resend Domain Records
Run the setup script to get the exact records:
```bash
cd scripts
node setup-email-domain.js create
```

This will output DNS records in a table format that you can copy directly to your DNS provider.

#### DMARC Record
Add this TXT record separately:

| Record Type | Name | Value | TTL |
|-------------|------|-------|-----|
| TXT | _dmarc.thebtcp.com | v=DMARC1; p=none; rua=mailto:dmarc@thebtcp.com; ruf=mailto:dmarc@thebtcp.com; fo=1 | 3600 |

**Important**: Start with `p=none` (monitor mode) for 1 week, then move to `p=quarantine`, then `p=reject`.

### 2. Domain Verification

After adding DNS records, verify the domain:
```bash
node setup-email-domain.js verify <domain-id>
```

Check domain status:
```bash
node setup-email-domain.js status <domain-id>
```

## Database Setup

### 1. Run SQL Migration

Execute the email unsubscribes table creation:
```sql
-- Run this in Supabase SQL editor
\i sql/email_unsubscribes.sql
```

This creates:
- `email_unsubscribes` table with RLS policies
- `is_email_unsubscribed()` function
- `unsubscribe_email()` function for safe upserts

### 2. Verify Functions

Test the database functions:
```sql
-- Test unsubscribe function
SELECT unsubscribe_email('test@example.com', 'Testing', 'manual');

-- Test check function
SELECT is_email_unsubscribed('test@example.com');
```

## Environment Variables

Ensure these variables are configured:

```env
# Resend API
RESEND_API_KEY=re_your_api_key_here

# Email addresses
CONTACT_FROM_EMAIL=contact@mail.thebtcp.com
CONTACT_INBOX_EMAIL=parker@thebtcp.com
EMAIL_PUBLIC_URL=https://thebtcp.com

# JWT for unsubscribe tokens
JWT_SECRET=your-super-secret-jwt-key-for-unsubscribe-tokens-make-this-very-long-and-random

# Supabase (for unsubscribe tracking)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE=your_service_role_key
```

## Email Implementation

### 1. Sending Transactional Emails

For system notifications, confirmations, and operational emails:

```typescript
import { sendTransactionalEmail } from '@/lib/resend';

await sendTransactionalEmail({
  to: 'user@example.com',
  subject: 'Your order confirmation',
  html: emailHtmlContent,
  text: 'Optional plain text version',
  replyTo: 'support@thebtcp.com'
});
```

### 2. Sending Marketing Emails

For newsletters, campaigns, and promotional content:

```typescript
import { sendPromotionalEmail } from '@/lib/resend';

await sendPromotionalEmail({
  to: 'subscriber@example.com',
  subject: 'New video course available',
  html: emailHtmlContent,
  text: 'Optional plain text version'
});
```

The marketing helper automatically adds:
- List-Unsubscribe headers
- One-Click unsubscribe support
- Proper authentication headers

### 3. Checking Unsubscribe Status

Before sending marketing emails, always check unsubscribe status:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);

const { data } = await supabase.rpc('is_email_unsubscribed', {
  email_address: 'subscriber@example.com'
});

if (!data) {
  // Safe to send marketing email
  await sendPromotionalEmail({ ... });
}
```

## Unsubscribe System

### 1. Unsubscribe Endpoint

The `/api/unsubscribe` endpoint handles both manual clicks and one-click unsubscribes:

- **GET requests**: Show HTML confirmation page
- **POST requests**: Handle one-click unsubscribe from Gmail/Yahoo

### 2. Token Security

Unsubscribe tokens use JWT with:
- 30-day expiration (for email client compatibility)
- Cryptographic signing
- Email address embedded in payload

### 3. Database Tracking

All unsubscribes are tracked with:
- Email address
- Reason for unsubscribe
- Source (manual, one-click, admin)
- IP address and user agent
- Timestamp

## Monitoring & Analytics

### 1. Email Delivery Monitoring

Monitor email delivery through:
- Resend dashboard metrics
- Database logs in `email_sends` table
- Supabase logs for unsubscribe events

### 2. DMARC Reports

Set up DMARC report processing:
1. Monitor `dmarc@thebtcp.com` for aggregate reports
2. Analyze authentication failures
3. Gradually tighten policy from `p=none` to `p=reject`

### 3. List Health

Regularly monitor:
- Unsubscribe rates
- Bounce rates
- Spam complaint rates
- Engagement metrics

## Compliance

### 1. CAN-SPAM Compliance

✅ **Physical address**: Include in email footers
✅ **Clear sender identification**: "Born to Create Project"
✅ **Honest subject lines**: No deceptive subjects
✅ **Unsubscribe mechanism**: One-click and email options
✅ **Honor unsubscribes**: Processed within 10 business days

### 2. GDPR Compliance

✅ **Consent tracking**: Marketing consent in leads table
✅ **Right to withdraw**: Easy unsubscribe process
✅ **Data minimization**: Only necessary data collected
✅ **Audit trail**: Complete unsubscribe logging

## Testing

### 1. Email Content Testing

Test emails using the development endpoints:

```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Testing"}'

# Test marketing email
curl -X POST http://localhost:3000/api/admin/marketing/test-all-emails
```

### 2. Header Verification

Check email headers using tools like:
- [MX Toolbox Email Header Analyzer](https://mxtoolbox.com/EmailHeaders.aspx)
- [Mail Tester](https://www.mail-tester.com/)
- [GlockApps](https://glockapps.com/)

Expected headers for promotional emails:
```
List-Unsubscribe: <mailto:unsubscribe@thebtcp.com?subject=unsubscribe>, <https://thebtcp.com/api/unsubscribe?token=...>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

### 3. Unsubscribe Testing

Test unsubscribe flow:

1. **Manual unsubscribe**: Click link in email
2. **One-click unsubscribe**: Use Gmail's unsubscribe button
3. **Email unsubscribe**: Send email to unsubscribe@thebtcp.com

## Troubleshooting

### Common Issues

1. **DNS propagation delays**: Wait 24-48 hours after adding records
2. **DMARC failures**: Ensure SPF and DKIM records are correct
3. **High unsubscribe rates**: Review email content and frequency
4. **Low engagement**: Improve subject lines and personalization

### Support Resources

- **Resend Documentation**: https://resend.com/docs
- **DMARC Analyzer**: https://dmarc.org/
- **Email Testing Tools**: Listed in Testing section above

## Maintenance

### Monthly Tasks

1. Review email delivery metrics
2. Check DMARC reports
3. Update unsubscribe reasons analysis
4. Monitor domain reputation

### Quarterly Tasks

1. Review and update email templates
2. Audit unsubscribe process
3. Test disaster recovery procedures
4. Update documentation

---

**Last Updated**: February 2025
**Maintained By**: Development Team
**Review Schedule**: Quarterly