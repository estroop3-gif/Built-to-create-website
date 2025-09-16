# Contact Form Production Deployment Checklist

## ✅ Prerequisites Completed
- [x] Contact form implementation complete
- [x] Database table created in Supabase
- [x] Local testing successful
- [x] Environment variables configured locally

## 🚀 Production Deployment Steps

### 1. Vercel Environment Variables
Add these environment variables in your Vercel dashboard:

```bash
# Contact Form (Required)
CONTACT_INBOX_EMAIL=parker@thebtcp.com
CONTACT_FROM_EMAIL=contact@thebtcp.com

# Verify these existing variables are set:
NEXT_PUBLIC_SUPABASE_URL=https://ozuldebmxmdsckiyydac.supabase.co
SUPABASE_SERVICE_ROLE=your_service_role_key
RESEND_API_KEY=re_your_api_key
```

### 2. Supabase Database
✅ **Already Complete** - The `contact_messages` table has been created with:
- Proper schema and constraints
- Row Level Security (RLS) enabled
- Service role policies configured

### 3. Email Configuration
Verify in Resend dashboard:
- [ ] `contact@thebtcp.com` domain is verified
- [ ] DNS records are properly configured
- [ ] API key has sending permissions

### 4. Domain Verification
Ensure these emails work:
- [ ] Notifications sent to `parker@thebtcp.com`
- [ ] Acknowledgements sent from `contact@thebtcp.com`

### 5. Testing After Deployment
After deploying to production:

1. **Visit** https://www.thebtcp.com/contact
2. **Submit test form** with valid data
3. **Verify**:
   - [ ] Form submits successfully
   - [ ] Success message appears
   - [ ] Notification email received at parker@thebtcp.com
   - [ ] Acknowledgement email received at your test email
   - [ ] Submission appears in Supabase contact_messages table
   - [ ] Analytics event tracked in Google Analytics

### 6. Error Testing
Test error scenarios:
- [ ] Rate limiting (submit 6+ forms rapidly)
- [ ] Validation errors (empty fields, invalid email)
- [ ] Math question (wrong answer)
- [ ] Network errors (if possible)

## 📧 Email Template Preview

### Notification Email (to parker@thebtcp.com)
- **Subject**: New Contact Form Submission — {subject}
- **Content**: Formatted table with all form data
- **Includes**: Name, email, phone, subject, message, timestamp, IP, user agent

### Acknowledgement Email (to user)
- **Subject**: We received your message
- **Content**: Thank you message with submission summary
- **Links**: FAQ and Registration pages
- **Reply Time**: 1-2 business days mentioned

## 🔒 Security Features Active

- [x] Rate limiting: 5 submissions per hour per IP
- [x] Honeypot field for bot detection
- [x] Math question anti-spam measure
- [x] Server-side validation with Zod
- [x] Supabase RLS policies
- [x] Input sanitization and validation

## 📊 Analytics Integration

Contact form submissions will automatically track:
- **Event**: `contact_submit`
- **Category**: `engagement`
- **Status**: `success` or `error`

View in Google Analytics: Realtime → Events

## 🛠 Troubleshooting Production Issues

### Form Not Submitting
1. Check Vercel environment variables
2. Verify Supabase service role key permissions
3. Check rate limiting (user may have hit limit)

### Emails Not Sending
1. Verify Resend API key in Vercel
2. Check domain verification in Resend
3. Ensure `contact@thebtcp.com` is verified sender

### Database Errors
1. Verify Supabase connection
2. Check service role permissions
3. Confirm table exists and RLS policies are correct

## 📝 Post-Deployment Notes

After successful deployment, document:
- [ ] Deployment date and time
- [ ] Test results and any issues found
- [ ] Performance metrics (form load time, submission response time)
- [ ] Email delivery confirmation

## 🔄 Monitoring

Set up monitoring for:
- Contact form submission rates
- Email delivery success rates
- API error rates
- Database performance

The contact form is now production-ready with comprehensive error handling, security measures, and monitoring capabilities.