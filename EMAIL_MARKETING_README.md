# Born to Create Project - Email Marketing System

## Deploy Steps

### 1. Install Dependencies
The system uses Resend (which should already be installed). If not:
```bash
npm install resend
```

### 2. Database Setup
Execute the SQL schema in your Supabase project:
```bash
psql -h your-project.supabase.co -U postgres -d postgres -f supabase/schema.sql
```

### 3. Resend Setup
1. Use your existing Resend account and API key
2. Verify domain thebtcp.com in Resend dashboard
3. DNS records should already be configured from your existing setup

If you need to add DNS records for thebtcp.com:
```dns
# SPF Record (if not already set)
TXT @ v=spf1 include:_spf.resend.com ~all

# DKIM Record (get actual values from Resend dashboard)
CNAME resend._domainkey your-domain-key.resend.com
```

### 4. No External Templates Needed
Email templates are built into the code (`src/lib/services/email-templates.ts`). No external template setup required!

### 5. Environment Variables in Vercel
Set these environment variables in your Vercel project settings:

```env
# Resend (use your existing key)
RESEND_API_KEY=your_resend_api_key
RESEND_WEBHOOK_SECRET=your_webhook_secret (optional)

# Email Configuration  
SEND_FROM=parker@thebtcp.com
SEND_REPLY_TO=parker@thebtcp.com

# Cron Security
CRON_SECRET=your_secure_random_string

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 6. Configure Webhooks (Optional)
In Resend dashboard, set up webhook endpoint for tracking:
- URL: `https://thebtcp.com/api/email/webhook`
- Events: email.delivered, email.opened, email.clicked, email.bounced, email.complaint

### 7. Deploy Components
Add components to your pages:

**Homepage Hero:**
```tsx
import SubscribeForm from '@/components/SubscribeForm';
import ExitIntentModal from '@/components/ExitIntentModal';

// In your page component:
<SubscribeForm variant="inline" className="mb-8" />
<ExitIntentModal pages={['/', '/retreat']} />
```

**Footer:**
```tsx
<SubscribeForm 
  variant="footer" 
  showFirstName={false}
  buttonText="Subscribe"
/>
```

### 8. Lead Magnet Setup
1. Create "The Filmmaker's Essential Gear Checklist" PDF
2. Upload to `/public/downloads/filmmaker-gear-checklist.pdf`
3. Or use a protected URL and update the email service

### 9. Test the System
Run smoke tests:
1. Subscribe via homepage form
2. Check Supabase leads table
3. Verify welcome email arrives
4. Test unsubscribe link
5. Manual cron trigger: `GET /api/cron/pretrip-emails` (dev only)

### 10. Monitor and Analytics
- Check Vercel Functions logs for cron job results
- Monitor SendGrid delivery statistics
- Set up Google Analytics events (already implemented in SubscribeForm)

## Production Checklist

- [ ] DNS records configured and verified
- [ ] SendGrid domain authenticated
- [ ] All 10 email templates created with correct IDs
- [ ] Environment variables set in Vercel
- [ ] Webhook endpoint configured in SendGrid
- [ ] Components added to website pages
- [ ] Lead magnet PDF uploaded
- [ ] Database schema applied
- [ ] Smoke tests passing
- [ ] Analytics tracking verified

## Email Sequence Schedule

| Stage | Email | Send Timing | Subject |
|-------|--------|-------------|---------|
| 0 | Welcome + Gear Checklist | Immediate | Welcome to Born to Create Project |
| 1 | Story and Vision | +3 days | Why we built Born to Create Project |
| 2 | Manual Mode | +7 days | Manual Mode made simple |
| 3 | Lens Anatomy | +7 days | Choose the right lens every time |
| 4 | Exposure Mastery | +7 days | Perfect exposure in any light |
| 5 | Composition | +9 days | Frame like a filmmaker |
| 6 | Editing Basics | +15 days | Edit with rhythm and emotion |
| 7 | Lighting | +15 days | Light any scene with confidence |
| 8 | Countdown | 30 days before retreat | Thirty days to level up your craft |
| 9 | Scarcity | When capacity hits 80% | Limited spots remaining |

## API Endpoints

- `POST /api/subscribe` - Lead capture
- `POST /api/unsubscribe` - Unsubscribe handling  
- `GET /api/unsubscribe?token=xxx` - Email unsubscribe link
- `POST /api/email/webhook` - SendGrid webhooks
- `POST /api/cron/pretrip-emails` - Daily sequence progression

## Compliance Features

- Double opt-in ready (currently single opt-in)
- Unsubscribe links in all emails
- Bounce/complaint handling
- Consent tracking
- UTM parameter preservation
- GDPR-ready data retention controls

## Troubleshooting

**Emails not sending:**
1. Check SendGrid API key
2. Verify domain authentication
3. Check template IDs match environment variable
4. Review Vercel function logs

**Cron job not running:**
1. Verify vercel.json is deployed
2. Check CRON_SECRET environment variable
3. Monitor function logs at scheduled time

**Forms not submitting:**
1. Check console for JavaScript errors
2. Verify API endpoints are accessible
3. Check Supabase connection

**Database errors:**
1. Verify RLS policies allow service role access
2. Check table structure matches schema
3. Confirm service role key is correct