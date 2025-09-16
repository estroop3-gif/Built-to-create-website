# Contact Form Documentation

## Overview

The Contact form system allows users to submit inquiries through a comprehensive form that includes validation, anti-spam protection, email notifications, and database storage.

## Environment Variables

The following environment variables must be configured in your deployment:

### Required Variables
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE=your_service_role_key

# Email Service (Resend)
RESEND_API_KEY=re_your_resend_api_key

# Contact Form Configuration
CONTACT_INBOX_EMAIL=parker@thebtcp.com    # Where notifications are sent
CONTACT_FROM_EMAIL=contact@thebtcp.com    # From address for emails
```

### Optional Variables
```bash
# Analytics (if using Google Analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-your_measurement_id
```

## Database Setup

### Supabase Table

The contact form requires a `contact_messages` table in Supabase. Run this SQL in your Supabase SQL editor:

```sql
-- Contact messages table for contact form submissions
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null check (position('@' in email) > 1),
  phone text,
  subject text not null,
  message text not null check (char_length(message) <= 2000),
  client_ip text,
  user_agent text,
  status text not null default 'received'
);

-- Enable RLS
alter table public.contact_messages enable row level security;

-- Policies for service role access
create policy "allow insert from service role"
on public.contact_messages
for insert
to service_role
with check (true);

create policy "allow read for service role"
on public.contact_messages
for select
to service_role
using (true);
```

### Migration File

A migration file is available at: `supabase/migrations/003_contact_messages.sql`

## System Components

### 1. Contact Form (`/contact`)
- **Location**: `src/app/contact/page.tsx`
- **Form Component**: `src/components/forms/ContactForm.tsx`
- **Features**:
  - Client-side validation with real-time feedback
  - Anti-spam protection (honeypot + math question)
  - Rate limiting (5 submissions per hour per IP)
  - Character counter for message field
  - Accessibility compliant (ARIA labels, focus states)
  - Success/error state handling

### 2. API Route (`/api/contact`)
- **Location**: `src/app/api/contact/route.ts`
- **Features**:
  - Server-side validation using Zod
  - Rate limiting protection
  - Database storage in Supabase
  - Dual email notifications
  - Error handling and logging

### 3. Email Templates
- **Notification Email**: `src/emails/ContactNotification.tsx`
  - Sent to `CONTACT_INBOX_EMAIL` (parker@thebtcp.com)
  - Contains all form data plus metadata (IP, user agent, timestamp)
- **Acknowledgement Email**: `src/emails/ContactAcknowledgement.tsx`
  - Sent to the user from `CONTACT_FROM_EMAIL`
  - Confirms receipt and provides next steps

### 4. Helper Libraries
- **Validation**: `src/lib/validation/contact.ts` (Zod schema)
- **Supabase**: `src/lib/supabase.ts` (Database client)
- **Email**: `src/lib/resend.ts` (Email client)
- **Rate Limiting**: `src/lib/rateLimit.ts` (In-memory rate limiter)

## Form Fields

### Required Fields
- **Full name**: Minimum 2 characters
- **Email**: Valid email format
- **Subject**: Minimum 3 characters
- **Message**: 10-2000 characters with live counter
- **Math question**: "What is 2 plus 3?" (answer must be 5)
- **Consent checkbox**: Must agree to be contacted

### Optional Fields
- **Phone**: Optional contact number

### Hidden Fields
- **Honeypot**: Empty text field (hidden from users)
- **IP Address**: Captured server-side
- **User Agent**: Captured server-side

## Rate Limiting

The system implements rate limiting to prevent spam:
- **Limit**: 5 submissions per hour per IP address
- **Implementation**: In-memory store (for development)
- **Production**: Consider Redis for distributed rate limiting

## Email Flow

### 1. Notification Email (to admin)
- **To**: `CONTACT_INBOX_EMAIL` (parker@thebtcp.com)
- **From**: `CONTACT_FROM_EMAIL` (contact@thebtcp.com)
- **Subject**: "New Contact Form Submission — {subject}"
- **Content**: All form data in formatted table

### 2. Acknowledgement Email (to user)
- **To**: User's email address
- **From**: `CONTACT_FROM_EMAIL` (contact@thebtcp.com)
- **Subject**: "We received your message"
- **Content**: Thank you message with submission summary and links to FAQ/Registration

## Navigation Integration

The Contact page is integrated into site navigation:

### Desktop Navigation
- Added to main navigation bar
- Order: Home, About, Itinerary, Pricing, Packing, Travel, FAQ, **Contact**

### Mobile Navigation
- Included in mobile hamburger menu
- Same order as desktop

### Footer
- Added to "Company" section
- Order: Packing List, FAQ, **Contact**, Register

## Analytics

Contact form submissions trigger Google Analytics events:
- **Event**: `contact_submit`
- **Category**: `engagement`
- **Status**: `success` or `error`
- **Note**: Form content is NOT sent to analytics

## Changing Configuration

### Change Inbox Email
Update the `CONTACT_INBOX_EMAIL` environment variable to redirect notifications to a different email address.

### Change From Email
Update the `CONTACT_FROM_EMAIL` environment variable. This email address must be verified in your Resend account.

### Change Form Fields
Modify the Zod schema in `src/lib/validation/contact.ts` and update the form component accordingly.

## Viewing Submissions

Contact form submissions are stored in the `contact_messages` table in Supabase. You can:

1. **View in Supabase Dashboard**: Navigate to Table Editor → contact_messages
2. **Export Data**: Use Supabase's export functionality
3. **API Access**: Query via the API route or create admin endpoints

## Error Handling

The system includes comprehensive error handling:

### Client-Side
- Field validation with real-time feedback
- Form submission error states
- Network error handling
- User-friendly error messages

### Server-Side
- Request validation
- Rate limiting enforcement
- Database error handling
- Email delivery error handling (non-blocking)
- Structured error responses

## Security Features

1. **Rate Limiting**: Prevents spam submissions
2. **Honeypot Field**: Catches basic bots
3. **Math Question**: Additional anti-spam measure
4. **Input Validation**: Server-side validation with Zod
5. **RLS Policies**: Supabase Row Level Security
6. **Service Role Access**: Secure database operations

## Testing

To test the contact form:

1. **Development**: Visit `/contact` and submit a test form
2. **Email Delivery**: Check both notification and acknowledgement emails
3. **Database**: Verify submission appears in Supabase
4. **Error States**: Test validation errors and rate limiting
5. **Accessibility**: Test with keyboard navigation and screen readers

## Troubleshooting

### Common Issues

**Form won't submit**
- Check environment variables are set
- Verify Supabase service role key has correct permissions
- Check rate limiting (wait 1 hour or clear rate limit store)

**Emails not sending**
- Verify RESEND_API_KEY is valid
- Check sender email is verified in Resend
- Review server logs for email errors

**Database errors**
- Verify Supabase service role key
- Check table exists and has correct permissions
- Review RLS policies

### Logs

Check application logs for detailed error information:
- API route errors are logged to console
- Email delivery failures are logged but don't block form submission
- Rate limiting events are logged

## Future Enhancements

Consider these improvements for production:

1. **Redis Rate Limiting**: Replace in-memory store with Redis
2. **Admin Dashboard**: Create interface to view/manage submissions
3. **Email Templates**: Add more sophisticated email designs
4. **Attachment Support**: Allow file uploads with submissions
5. **Auto-responders**: Set up automated email sequences
6. **Webhook Integration**: Connect to CRM or other systems