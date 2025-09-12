# Production Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. Database Setup (Supabase)
- [ ] Run the SQL migration from `supabase/migrations/002_email_marketing_templates.sql` in your Supabase SQL editor
- [ ] Verify all tables and functions were created successfully
- [ ] Test database functions work: `SELECT * FROM get_subscribers_ready_for_email('2025-02-20T00:00:00Z', 1);`

### 2. Environment Variables
Copy all variables from `.env.example` to your deployment platform:

**Required for Email System:**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE=your_service_role_key

# Resend API
RESEND_API_KEY=re_your_resend_api_key
FROM_EMAIL=Born to Create Project <no-reply@thebtcp.com>

# Admin & URLs
BASE_URL=https://thebtcp.com
ADMIN_EMAIL=parker@thebtcp.com
ADMIN_TEST_EMAIL=your-test-email@example.com

# Cron Security
CRON_SECRET=your_secure_random_string
```

### 3. Seed Email Templates
After deployment, run once to populate templates:
```bash
curl -X POST "https://thebtcp.com/api/admin/marketing/seed-templates"
```

## 🚀 Deployment Steps

### Vercel (Recommended)
1. **Connect Repository:** Link your GitHub repo to Vercel
2. **Environment Variables:** Add all env vars in Vercel dashboard
3. **Deploy:** Vercel will automatically deploy on push to main
4. **Cron Jobs:** Already configured in `vercel.json` - runs daily at 9 AM UTC

### Manual Cron Setup (Alternative Platforms)
If not using Vercel, set up external cron job:
```bash
# Daily at 9 AM
0 9 * * * curl -X POST "https://thebtcp.com/api/cron/marketing-emails?limit=100" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## ✅ Post-Deployment Testing

### 1. Test Database Connection
```bash
curl "https://thebtcp.com/api/admin/marketing/stats"
```
Should return template and subscriber counts.

### 2. Test Email Templates
```bash
curl -X POST "https://thebtcp.com/api/admin/marketing/test-all-emails"
```
Sends all 10 emails to ADMIN_EMAIL.

### 3. Test Automation (Dry Run)
```bash
curl -X POST "https://thebtcp.com/api/cron/marketing-emails?dryRun=true&limit=5"
```
Tests subscriber selection without sending emails.

### 4. Verify Cron Job
Check Vercel function logs or your platform's cron logs to ensure the daily job runs successfully.

## 📊 Monitoring & Maintenance

### Daily Monitoring
- Check `/api/admin/marketing/stats` for send counts and failures
- Monitor email delivery rates in Resend dashboard
- Review Vercel function logs for any errors

### Email Analytics
- Track performance via `email_template_analytics` table
- Monitor subscriber progression through sequence
- Watch for bounces and failures

### Scaling Considerations
- Current rate limit: 50 emails per run (Resend free tier: 100/day)
- Increase `limit` parameter as subscriber base grows
- Consider upgrading Resend plan for higher volume

## 🔧 Troubleshooting

### Common Issues

**Templates not sending:**
- Verify database migration ran successfully
- Check email templates were seeded: `SELECT COUNT(*) FROM email_templates;`
- Test Resend API key works

**Cron job not running:**
- Verify `CRON_SECRET` environment variable is set
- Check Vercel cron job logs
- Test endpoint manually with Bearer token

**Rate limiting errors:**
- Reduce `limit` parameter in cron job
- Increase delay in `marketingEmailService.ts`
- Upgrade Resend plan

### Support
- Email system logs: Vercel function logs
- Database issues: Supabase logs and query performance
- Email delivery: Resend dashboard and webhook logs

---

**Built for Born to Create Project • Costa Rica 2026**