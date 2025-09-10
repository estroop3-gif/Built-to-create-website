# Database & Registration System Setup

## Overview
This system captures retreat registrations in Supabase and sends email notifications to parker@thebtcp.com.

## 🗄️ Database Setup

### 1. Run the Migration
Execute the SQL migration in your Supabase dashboard:
```bash
# File: supabase/migrations/001_create_registrations.sql
```

This creates:
- `registrations` table with all form fields
- Row Level Security (RLS) policies
- Indexes for performance
- Auto-updating `updated_at` column

### 2. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

**Required Variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE=your_service_role_key_here
ADMIN_EMAIL=parker@thebtcp.com
```

## 📧 Email Setup

### Option 1: Resend (Recommended)
1. Sign up at https://resend.com
2. Add your domain and verify DNS
3. Get API key and add to `.env.local`:
```env
RESEND_API_KEY=your_resend_api_key
```

### Option 2: SendGrid
1. Sign up at https://sendgrid.com
2. Get API key and add to `.env.local`:
```env
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Option 3: Mailgun
1. Sign up at https://mailgun.com
2. Add domain and get API key:
```env
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_domain.com
```

## 🔗 Integration Steps

### 1. Update Registration Form
The existing registration form needs to be updated to use the new database service. Key changes:

- Import `registrationService` and types
- Update form fields to match database schema
- Replace mock submission with real database call
- Add success/error handling

### 2. Email Service Integration
Update `/app/api/send-registration-email/route.ts`:

```typescript
// Example for Resend
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'no-reply@thebtcp.com',
  to: 'parker@thebtcp.com',
  subject: emailSubject,
  html: emailHtml,
});
```

## 🎯 Features Included

### Database Features
- ✅ Complete registration data storage
- ✅ Payment status tracking
- ✅ Row Level Security (RLS)
- ✅ Automatic timestamps
- ✅ Data validation with constraints
- ✅ Admin dashboard view

### Email Features  
- ✅ Automatic email notifications
- ✅ HTML and plain text formats
- ✅ Complete registration details
- ✅ Professional email template
- ✅ Error handling

### Registration Form Integration
- ✅ TypeScript types for type safety
- ✅ Validation and error handling  
- ✅ Payment amount calculation
- ✅ Success confirmation
- ✅ Database persistence

## 🔒 Security

### Row Level Security (RLS)
- Public can insert registrations
- Only admin can view all data
- Individual users can view their own data by email

### Data Protection
- All sensitive data encrypted at rest
- API routes validate input
- Environment variables for secrets
- No client-side sensitive operations

## 📊 Admin Features

### Database Views
Query registration summary:
```sql
SELECT * FROM admin_registrations_summary;
```

### Registration Management
Use the `RegistrationService` class methods:
- `getRegistration(id)` - Get single registration
- `updateRegistrationStatus()` - Update approval status  
- `updatePaymentStatus()` - Update payment status

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Other Platforms
Add all environment variables to your deployment platform:
- Railway
- Netlify
- AWS Amplify

## 🧪 Testing

### Test Registration Submission
1. Fill out registration form
2. Check Supabase dashboard for new record
3. Verify email sent to parker@thebtcp.com
4. Check browser network tab for API responses

### Test Database Queries
```javascript
import { registrationService } from '@/lib/services/registration';

// Test in browser console
const registration = await registrationService.getRegistrationByEmail('test@example.com');
console.log(registration);
```

## 📝 Next Steps

1. **Set up environment variables** with your Supabase credentials
2. **Run the migration** in Supabase dashboard  
3. **Choose and configure email service**
4. **Update registration form** to use database service
5. **Test end-to-end flow**
6. **Deploy to production**

## 💡 Optional Enhancements

- **Payment Integration**: Add Stripe for actual payment processing
- **Admin Dashboard**: Create admin interface for managing registrations
- **Email Templates**: Customize email design and content
- **Analytics**: Track registration metrics and conversion rates
- **Waitlist**: Implement automatic waitlist management