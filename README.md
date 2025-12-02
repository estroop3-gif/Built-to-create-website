# Born to Create Project

Global filmmaking retreat platform with 8 destinations and online course, built with Next.js 15 App Router, Supabase, and Resend.

## Features

- **Multi-Destination Retreats**: 8 global filmmaking retreat destinations with dynamic routing
- **Online Course Platform**: Coming soon page with waitlist functionality
- **Email Marketing System**: Automated 9-stage email sequence with React Email templates
- **Registration System**: Stripe integration with comprehensive form fields
- **Internal Notifications**: Automatic notifications to parker@thebtcp.com for new signups
- **Database**: Supabase with Row Level Security for leads, registrations, and email events
- **Authentication**: Secure tokenized access for gear checklist
- **Payment Processing**: Stripe integration with webhook handling
- **Responsive Navigation**: Hamburger menu with dropdown support for retreat categories

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

## Retreat Routes

The platform now supports 8 global retreat destinations with dynamic routing:

### Available Routes
- `/retreats/costa-rica` - Costa Rica (Feb 20–28, 2026) - Fundamentals of Documentary
- `/retreats/greece` - Greece (May 22–30, 2026) - Visual Storytelling & Mythic Structure
- `/retreats/africa` - Africa (Aug 21–29, 2026) - Missional Filmmaking & Community
- `/retreats/japan` - Japan (Nov 20–28, 2026) - Intro to Narrative Filmmaking (Role Rotations)
- `/retreats/panama` - Panama (Feb 26–Mar 6, 2027) - Advanced Documentary & Investigative Storytelling
- `/retreats/london` - London (May 21–29, 2027) - Narrative Writing & Directing
- `/retreats/germany` - Germany (Aug 20–28, 2027) - Cinematic Collaboration & Production Design
- `/retreats/thailand` - Thailand (Nov 26–Dec 4, 2027) - Narrative Masterpiece (Festival-ready Short)

### Retreat Data Structure
Each retreat is configured in `/src/lib/retreats.ts` with:
```typescript
interface RetreatData {
  slug: string;
  title: string;
  country: string;
  city?: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  theme: string;
  heroImage: string;
  ogImage: string;
  registerUrl: string;
  emailCtaText: string;
  seoDescription: string;
  overview: string;
  learningOutcomes: string[];
  itinerary: DayItem[];
  faqs: FAQ[];
  gearNote?: string;
}
```

### Route Generation
All retreat routes are automatically generated using Next.js dynamic routing at `/retreats/[slug]`. The route params are validated against the retreat data and return 404 for invalid slugs.

## Online Course

The platform includes an online course coming soon page at `/course` with:
- Course overview and modules
- Brand pillars section
- Waitlist signup form with "online-course-waitlist" tagging
- Integration with existing email marketing system

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
│   │   ├── retreats/[slug]/        # Dynamic retreat routes
│   │   │   └── page.tsx            # Retreat page template
│   │   ├── course/                 # Online course coming soon
│   │   │   └── page.tsx            # Course landing page
│   │   └── ...
│   ├── components/
│   │   ├── retreats/               # Retreat-specific components
│   │   │   ├── RetreatHero.tsx     # Hero section
│   │   │   ├── RetreatOverview.tsx # Overview section
│   │   │   ├── RetreatLearning.tsx # Learning outcomes
│   │   │   ├── RetreatItinerary.tsx # Day-by-day itinerary
│   │   │   ├── RetreatGear.tsx     # Equipment info
│   │   │   ├── RetreatFAQ.tsx      # FAQ section
│   │   │   └── RetreatCTA.tsx      # Call to action
│   │   ├── course/                 # Course-specific components
│   │   │   ├── CourseHero.tsx      # Course hero section
│   │   │   ├── CourseOverview.tsx  # Course overview
│   │   │   ├── CourseModules.tsx   # Module breakdown
│   │   │   ├── CoursePillars.tsx   # Brand pillars
│   │   │   └── CourseWaitlist.tsx  # Waitlist signup
│   │   └── site/
│   │       ├── NavBar.tsx          # Main navigation
│   │       └── MobileDrawer.tsx    # Mobile menu with dropdowns
│   └── lib/
│       ├── retreats.ts             # Retreat data and utilities
│       ├── navigation.ts           # Navigation configuration
│       ├── emailClient.ts          # Resend integration with notifications
│       ├── services/email.ts       # Email service with templates
│       └── ...
├── emails/
│   ├── InternalNewSignup.tsx      # Internal notification template
│   ├── Email1Welcome.tsx          # Welcome email template
│   └── ...
├── public/images/                  # Hero and OG images for all retreats
│   ├── hero-costa-rica.jpg
│   ├── hero-greece.jpg
│   ├── og-costa-rica.jpg
│   └── ... (all retreat images)
└── supabase/
    └── schema.sql                 # Database schema
```

## Navigation System

The navigation supports a hierarchical structure with dropdowns:
- Regular navigation items link directly to pages
- Parent items with `children` array create dropdown menus
- Mobile navigation uses an accordion-style dropdown
- All retreat pages are grouped under a "Retreats" dropdown

## License

Private project for Born to Create Project.
