# Born to Create Project

Costa Rica 9-Day Filmmaking Retreat website built with Next.js 14 App Router, Supabase, and Resend.

## Features

- **Email Marketing System**: Automated 9-stage email sequence with React Email templates
- **Registration System**: Stripe integration with comprehensive form fields
- **Internal Notifications**: Automatic notifications to parker@thebtcp.com for new signups
- **Database**: Supabase with Row Level Security for leads, registrations, and email events
- **Authentication**: Secure tokenized access for gear checklist
- **Payment Processing**: Stripe integration with webhook handling

## Environment Variables

### Required
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
RESEND_API_KEY=your_resend_api_key
STRIPE_SECRET_KEY=sk_live_or_test_key
STRIPE_PUBLISHABLE_KEY=pk_live_or_test_key
TOKEN_SECRET=your_secure_random_string
```

### Optional
```env
# Internal notifications (set to false in development to disable)
SEND_NOTIFICATIONS=true

# Seed list for ops team notifications (comma-separated emails)
SEED_LIST=ops@thebtcp.com,team@thebtcp.com

# Cron job security
CRON_SECRET=your_cron_secret

# Webhook endpoint secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Email System

### Internal Notifications
Every time a new person signs up for the email list, an internal notification is automatically sent to parker@thebtcp.com with:
- Subscriber details (email, first name, timestamp)
- UTM tracking parameters and referrer information
- Professional HTML template with plain-text fallback
- Reply-to set to parker@thebtcp.com for easy responses

The notification system includes:
- **Test flag**: Set `SEND_NOTIFICATIONS=false` to disable in development
- **Seed list**: Include ops team with `SEED_LIST` environment variable
- **Professional template**: React Email component with proper styling
- **Error handling**: Notifications won't break the subscription flow

### Email Sequence
- Welcome email with gear checklist access
- 9-stage automated follow-up sequence
- UTM parameter tracking
- Unsubscribe handling
- Event logging in Supabase

## Getting Started

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
Copy `.env.local.example` to `.env.local` and fill in your values.

3. **Set up Supabase database**
Run the SQL from `supabase/schema.sql` in your Supabase dashboard.

4. **Run development server**
```bash
npm run dev
```

5. **Set up Stripe webhooks** (optional)
```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

## Database Setup

The application uses three main tables:
- `leads` - Email marketing subscribers
- `registrations` - Retreat registrations with payment info
- `email_events` - Email delivery and engagement tracking

Run the database setup API to create tables:
```bash
curl -X POST http://localhost:3000/api/setup-db \
  -H "Authorization: Bearer your_cron_secret"
```

## Testing

### Email Notifications
Test the complete notification system:
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "first_name": "Test",
    "utm_source": "test",
    "utm_campaign": "signup_test"
  }'
```

This will send:
1. Welcome email to the subscriber
2. Internal notification to parker@thebtcp.com

### Disable Notifications in Development
```env
SEND_NOTIFICATIONS=false
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add all environment variables in the Vercel dashboard
3. Set `SEND_NOTIFICATIONS=true` in production
4. Deploy automatically on git push

### Environment Variables in Production
Make sure to set these in your production environment:
- `SEND_NOTIFICATIONS=true` - Enable internal notifications
- `SEED_LIST=ops@thebtcp.com` - Include ops team in notifications
- All other required environment variables

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── subscribe/          # Email signup with notifications
│   │   │   ├── create-checkout-session/  # Stripe payment
│   │   │   ├── stripe-webhook/     # Payment processing
│   │   │   └── cron/pretrip-emails/  # Automated email sequence
│   │   └── ...
│   └── lib/
│       ├── emailClient.ts          # Resend integration with notifications
│       ├── services/email.ts       # Email service with templates
│       └── ...
├── emails/
│   ├── InternalNewSignup.tsx      # Internal notification template
│   ├── Email1Welcome.tsx          # Welcome email template
│   └── ...
└── supabase/
    └── schema.sql                 # Database schema
```

## License

Private project for Born to Create Project.
