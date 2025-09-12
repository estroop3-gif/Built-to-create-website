# Marketing Email Automation System

A comprehensive 10-email automated marketing sequence for the Born to Create Project Costa Rica retreat. Each email contains full lesson content with professional filmmaking techniques, biblical integration, and clear calls to action.

## 📧 Email Sequence Overview

1. **Welcome Call** - Your creativity is a calling
2. **Manual Mode** - Master exposure with three decisions  
3. **Lens Anatomy** - Focal length, focus, aperture, stabilization
4. **Story Basics** - A simple structure you can shoot today
5. **Lighting Basics** - Shape contrast, not just exposure
6. **Sound Basics** - Capturing clean dialogue anywhere
7. **Editing Basics** - A calm path from mess to message
8. **Color Basics** - A simple pipeline you can repeat
9. **Interviews** - Questions that go below the surface
10. **Faith & Action** - Bold creativity begins with obedience

## 🚀 Quick Start

### 1. Run Database Migration
```bash
# Apply the email marketing schema
psql -d your_database -f supabase/migrations/002_email_marketing_templates.sql
```

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local` and update:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE=your_service_role_key

# Email
RESEND_API_KEY=re_your_resend_api_key
FROM_EMAIL=Born to Create Project <no-reply@thebtcp.com>

# URLs and Admin
BASE_URL=https://thebtcp.com
ADMIN_EMAIL=parker@thebtcp.com
ADMIN_TEST_EMAIL=your-test-email@example.com
```

### 3. Seed Email Templates
```bash
npm run ts-node scripts/seedMarketingEmails.ts
```

### 4. Test the System
```bash
curl -X POST "http://localhost:3000/api/admin/marketing/test-all-emails"
```

## 🔄 Email Cadence System

**Intelligent scheduling based on proximity to February 20, 2026:**

- **Immediately on signup:** Welcome email (Email #1)
- **Outside 30 days from Feb 20:** Every 7 days
- **Inside 30 days from Feb 20:** Every 3 days  
- **Inside 7 days from Feb 20:** Daily

## 📁 File Structure

```
├── emails/
│   ├── MarketingBaseTemplate.tsx       # Shared template with branding
│   ├── Marketing01Welcome.tsx          # Welcome & calling
│   ├── Marketing02ManualMode.tsx       # Exposure fundamentals
│   ├── Marketing03LensAnatomy.tsx      # Lens operation
│   ├── Marketing04StoryBasics.tsx      # Story structure
│   ├── Marketing05LightingBasics.tsx   # Natural lighting
│   ├── Marketing06SoundBasics.tsx      # Audio recording
│   ├── Marketing07EditingBasics.tsx    # Post-production
│   ├── Marketing08ColorBasics.tsx      # Color grading
│   ├── Marketing09Interviews.tsx       # Interview techniques
│   └── Marketing10FaithAndAction.tsx   # Final call to action
├── scripts/
│   └── seedMarketingEmails.ts          # Populates database templates
├── src/
│   ├── lib/
│   │   └── marketingEmailService.ts    # Core email automation service
│   └── app/api/
│       ├── cron/marketing-emails/      # Automated sending
│       └── admin/marketing/            # Testing & stats endpoints
└── supabase/
    └── migrations/
        └── 002_email_marketing_templates.sql  # Database schema
```

## 🛠 API Endpoints

### Production Endpoints

#### `POST /api/cron/marketing-emails`
Automated email processing (called by cron job)

**Query Parameters:**
- `limit` (optional): Number of emails to process (default: 50, max: 200)
- `dryRun` (optional): Test run without sending emails (`true`/`false`)

**Example:**
```bash
curl -X POST "https://thebtcp.com/api/cron/marketing-emails?limit=25&dryRun=true"
```

### Admin/Testing Endpoints

#### `POST /api/admin/marketing/test-all-emails`
Send all 10 emails to admin for testing

```bash
curl -X POST "http://localhost:3000/api/admin/marketing/test-all-emails"
```

#### `GET /api/admin/marketing/stats`
Get email campaign statistics

```bash
curl "http://localhost:3000/api/admin/marketing/stats"
```

## 🗄️ Database Schema

### `email_templates`
Stores template content and metadata
- `template_key` - Unique identifier
- `subject` - Email subject line
- `preview_text` - Email preview text
- `html_content` - Rendered HTML
- `plain_text_content` - Plain text version
- `order_sequence` - Sequence order (1-10)
- `active` - Enable/disable template

### `email_sends`  
Tracks sent emails with idempotency
- `template_key` - Reference to template
- `subscriber_email` - Recipient email
- `delivery_status` - sent, delivered, bounced, failed
- `resend_message_id` - External service tracking
- Unique constraint on `(template_key, subscriber_email)`

### `email_template_analytics`
Performance metrics per template
- `total_sent`, `total_delivered`, `total_opened`, `total_clicked`
- `delivery_rate`, `open_rate`, `click_rate`
- Updated automatically via database triggers

## 📊 Key Features

### ✅ Production Ready
- **Idempotent sending** - No duplicate emails
- **Error handling** - Comprehensive logging and recovery
- **Rate limiting** - Built-in delays to avoid provider limits
- **HTML + Plain text** - Both formats for compatibility
- **Template versioning** - Update templates without breaking sends

### ✅ Advanced Scheduling
- **Dynamic cadence** - Adjusts based on retreat proximity
- **Batch processing** - Configurable limits for performance
- **Dry run support** - Test without sending
- **Comprehensive analytics** - Track performance metrics

### ✅ Content Rich
- **Full lesson content** - Complete tutorials in email body
- **Biblical integration** - Scripture and faith-based perspectives
- **Professional techniques** - Industry-standard filmmaking education
- **Visual formatting** - Clean, skimmable layout with sections

### ✅ Developer Experience
- **TypeScript throughout** - Full type safety
- **React Email templates** - Modern template system
- **Database functions** - Efficient queries with Postgres functions
- **Admin tools** - Testing and monitoring endpoints

## 🚀 Deployment

### Vercel (Recommended)
1. Deploy Next.js app to Vercel
2. Configure environment variables in dashboard
3. Set up cron job for `/api/cron/marketing-emails`

### Cron Job Setup
Add to Vercel cron jobs or external scheduler:

```bash
# Every hour during business days
0 9-17 * * 1-5 curl -X POST "https://thebtcp.com/api/cron/marketing-emails?limit=50"

# Daily at 9 AM
0 9 * * * curl -X POST "https://thebtcp.com/api/cron/marketing-emails?limit=100"
```

## 🧪 Testing Workflow

### 1. Seed Templates
```bash
npm run ts-node scripts/seedMarketingEmails.ts
```

### 2. Test Individual Components
```bash
# Test email rendering
npm run test:emails

# Test database functions
npm run test:db
```

### 3. Send Test Emails
```bash
# Send all templates to admin
curl -X POST "http://localhost:3000/api/admin/marketing/test-all-emails"

# Dry run automation
curl -X POST "http://localhost:3000/api/cron/marketing-emails?dryRun=true"
```

### 4. Monitor Statistics
```bash
curl "http://localhost:3000/api/admin/marketing/stats"
```

## 📈 Analytics & Monitoring

The system automatically tracks:
- **Send rates** - Successful vs failed sends
- **Template performance** - Which emails perform best
- **Subscriber progression** - How users move through sequence
- **Delivery metrics** - Integration with Resend webhooks

## 🔧 Customization

### Adding New Templates
1. Create new template component in `emails/Marketing##TemplateName.tsx`
2. Add to `templateComponents` mapping in services
3. Update seed script with template metadata
4. Run seed script to populate database

### Modifying Cadence
Update the `get_subscribers_ready_for_email` function in the database migration to change timing logic.

### Custom Branding
Modify `MarketingBaseTemplate.tsx` to update header, footer, and styling.

## 🎯 Next Steps

1. **Run database migration**
2. **Configure environment variables**
3. **Seed email templates**
4. **Test with admin emails**
5. **Set up production cron job**
6. **Monitor analytics and optimize**

---

**Built for Born to Create Project • Costa Rica 2026**