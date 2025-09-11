import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get('days') || '30')
  const format = searchParams.get('format') || 'html'

  // Sample registrant data
  const testRegistrant = {
    id: 'preview-123',
    email: 'preview@example.com',
    first_name: 'Alex',
    last_name: 'Thompson',
    retreat: 'Born to Create Project Retreat',
    retreat_start: 'February 20-28, 2026',
    retreat_location: 'Costa Rica',
    plan_label: 'Early Bird',
    amount_paid: 3200,
    currency: 'USD'
  }

  const EMAIL_BASE_URL = 'https://www.thebtcp.com'
  const emailData = generatePretripEmail(testRegistrant, days, EMAIL_BASE_URL)

  if (format === 'text') {
    return new NextResponse(emailData.text, {
      headers: { 'Content-Type': 'text/plain' }
    })
  }

  return new NextResponse(emailData.html, {
    headers: { 'Content-Type': 'text/html' }
  })
}

interface Registrant {
  id: string
  email: string
  first_name: string
  last_name: string
  retreat: string
  retreat_start: string
  retreat_location: string
  plan_label: string
  amount_paid: number
  currency: string
}

function generatePretripEmail(registrant: Registrant, daysAhead: number, baseUrl: string) {
  const firstName = registrant.first_name || 'Friend'
  const fullName = `${registrant.first_name || ''} ${registrant.last_name || ''}`.trim()
  
  const urls = {
    itinerary: `${baseUrl}/itinerary`,
    packing: `${baseUrl}/packing`,
    faq: `${baseUrl}/faq`,
    contact: `${baseUrl}/contact`
  }

  // Email content varies by days ahead
  let subject: string
  let preHeader: string
  let mainMessage: string
  let actionItems: string[]
  let urgency: 'high' | 'medium' | 'low'

  switch (daysAhead) {
    case 30:
      subject = `🌟 30 Days to Costa Rica! Time to Get Ready`
      preHeader = 'Your retreat is coming up soon - here\'s what you need to know'
      mainMessage = 'Can you believe it? Your Costa Rica filmmaking retreat is just 30 days away! It\'s time to start preparing for this incredible journey.'
      actionItems = [
        '📋 Review the complete itinerary',
        '🎒 Start gathering items from the packing list',
        '✈️ Book your flights to San José (SJO) if you haven\'t already',
        '🛡️ Consider travel insurance',
        '🎬 Start thinking about what stories you want to tell'
      ]
      urgency = 'low'
      break
    
    case 14:
      subject = `⏰ 2 Weeks to Go! Final Preparations for Costa Rica`
      preHeader = 'Last chance to handle travel essentials before your retreat'
      mainMessage = 'We\'re getting close! Your Costa Rica retreat is just 2 weeks away. Time for some final preparations to ensure everything goes smoothly.'
      actionItems = [
        '✈️ Confirm your flight details and arrival time',
        '🎒 Finalize your packing (check weather forecast)',
        '📱 Download any travel apps you might need',
        '💰 Notify your bank about international travel',
        '📋 Double-check passport expiration date'
      ]
      urgency = 'medium'
      break
    
    case 7:
      subject = `🚀 1 Week Away! Final Details for Your Costa Rica Adventure`
      preHeader = 'Last-minute essentials and what to expect on arrival'
      mainMessage = 'This is it - just ONE WEEK until your Costa Rica filmmaking retreat! Here are the final details you need to know.'
      actionItems = [
        '🧳 Finish packing using our checklist',
        '🔋 Charge all your devices and pack chargers',
        '💊 Pack any medications you need',
        '📱 Save important phone numbers offline',
        '☀️ Check the weather forecast for Costa Rica'
      ]
      urgency = 'high'
      break
    
    case 1:
      subject = `✈️ Tomorrow is the Day! See You in Costa Rica`
      preHeader = 'Final reminders for your departure tomorrow'
      mainMessage = 'This is it! Your Costa Rica retreat starts TOMORROW. We can\'t wait to see you and begin this incredible creative journey together.'
      actionItems = [
        '🧳 Final packing check',
        '📱 Confirm your flight departure time',
        '🚗 Arrange transportation to the airport',
        '💡 Get a good night\'s sleep',
        '🎬 Get excited for the adventure ahead!'
      ]
      urgency = 'high'
      break
    
    default:
      subject = `Costa Rica Retreat Reminder - ${daysAhead} days to go`
      preHeader = 'Information about your upcoming retreat'
      mainMessage = `Your Costa Rica retreat is ${daysAhead} days away!`
      actionItems = ['Review retreat information', 'Check packing list', 'Prepare for your adventure']
      urgency = 'low'
  }

  const html = generatePretripEmailHtml({
    firstName,
    fullName,
    daysAhead,
    subject,
    preHeader,
    mainMessage,
    actionItems,
    urgency,
    retreat: {
      name: registrant.retreat,
      start: registrant.retreat_start,
      location: registrant.retreat_location
    },
    urls
  })

  const text = generatePretripEmailText({
    firstName,
    daysAhead,
    mainMessage,
    actionItems,
    retreat: {
      name: registrant.retreat,
      start: registrant.retreat_start,
      location: registrant.retreat_location
    },
    urls
  })

  return { subject, html, text }
}

interface EmailData {
  firstName: string
  fullName: string
  daysAhead: number
  subject: string
  preHeader: string
  mainMessage: string
  actionItems: string[]
  urgency: 'high' | 'medium' | 'low'
  retreat: {
    name: string
    start: string
    location: string
  }
  urls: {
    itinerary: string
    packing: string
    faq: string
    contact: string
  }
}

function generatePretripEmailHtml(data: EmailData): string {
  const urgencyColors = {
    high: '#d32f2f',
    medium: '#f57c00',
    low: '#2d5016'
  }
  
  const urgencyColor = urgencyColors[data.urgency]

  return `
<!doctype html>
<html>
<head>
  <meta charSet="utf-8" />
  <title>${data.subject}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #222; margin: 0; padding: 0; background: #f7faf7; }
    .wrap { max-width: 640px; margin: 0 auto; background: #fff; }
    .hero { background: ${urgencyColor}; color: #fff; padding: 24px; text-align: center; }
    h1 { margin: 0 0 6px; font-size: 24px; }
    .countdown { font-size: 18px; font-weight: bold; margin: 10px 0; }
    p { line-height: 1.55; }
    .content { padding: 24px; }
    .card { background: #f4fbf4; border-left: 4px solid #2d5016; padding: 16px; margin: 16px 0; }
    .urgent-card { background: #fff3e0; border-left: 4px solid ${urgencyColor}; padding: 16px; margin: 16px 0; }
    .btn { display: inline-block; padding: 12px 20px; background: #2d5016; color: #fff !important; text-decoration: none; border-radius: 6px; margin: 8px 4px; }
    .urgent-btn { background: ${urgencyColor}; }
    .checklist { background: #f9fcf9; padding: 16px; border-radius: 6px; margin: 16px 0; }
    .checklist li { margin: 10px 0; font-size: 16px; }
    .button-group { text-align: center; margin: 20px 0; }
    .countdown-big { font-size: 48px; font-weight: bold; margin: 16px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
    a { color: #2d5016; }
    .preview-banner { background: #4CAF50; color: white; padding: 12px; text-align: center; font-weight: bold; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="preview-banner">
      📧 EMAIL PREVIEW - ${data.daysAhead} Days Before Retreat
      <br><small>This is how the automated email will look</small>
    </div>
    <div class="hero">
      <div class="countdown-big">${data.daysAhead}</div>
      <h1>${data.daysAhead === 1 ? 'Day' : 'Days'} to Go!</h1>
      <p>Costa Rica Filmmaking Retreat</p>
      <div class="countdown">${data.retreat.location} • ${data.retreat.start}</div>
    </div>

    <div class="content">
      <p>Hi ${escapeHtml(data.firstName)},</p>
      <p>${data.mainMessage}</p>

      <div class="${data.urgency === 'high' ? 'urgent-card' : 'card'}">
        <h3 style="margin-top: 0; color: ${urgencyColor};">🎯 Action Items:</h3>
        <ul class="checklist">
          ${data.actionItems.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>

      <div class="button-group">
        <a class="btn" href="${data.urls.itinerary}">📋 View Itinerary</a>
        <a class="btn" href="${data.urls.packing}">🎒 Packing List</a>
        <a class="btn" href="${data.urls.faq}">❓ FAQ</a>
        <a class="btn ${data.urgency === 'high' ? 'urgent-btn' : ''}" href="${data.urls.contact}">📱 Contact Us</a>
      </div>

      ${data.daysAhead <= 7 ? `
      <div class="urgent-card">
        <p style="margin: 0;"><strong>Need help or have questions?</strong> Don't wait - reach out to us now! We're here to make sure everything goes smoothly.</p>
      </div>
      ` : ''}

      <div class="card">
        <p style="margin: 0;"><strong>Questions?</strong> Just reply to this email and we'll get back to you quickly!</p>
      </div>
    </div>
  </div>
</body>
</html>
`
}

interface TextEmailData {
  firstName: string
  daysAhead: number
  mainMessage: string
  actionItems: string[]
  retreat: {
    name: string
    start: string
    location: string
  }
  urls: {
    itinerary: string
    packing: string
    faq: string
    contact: string
  }
}

function generatePretripEmailText(data: TextEmailData): string {
  return [
    `📧 EMAIL PREVIEW - ${data.daysAhead} Days Before Retreat`,
    `This is how the automated email will look`,
    ``,
    `🌟 ${data.daysAhead} ${data.daysAhead === 1 ? 'Day' : 'Days'} to Costa Rica!`,
    `${data.retreat.location} • ${data.retreat.start}`,
    ``,
    `Hi ${data.firstName},`,
    ``,
    data.mainMessage,
    ``,
    `🎯 Action Items:`,
    ...data.actionItems.map(item => `- ${item}`),
    ``,
    `📋 Quick Links:`,
    `- Itinerary: ${data.urls.itinerary}`,
    `- Packing List: ${data.urls.packing}`,
    `- FAQ: ${data.urls.faq}`,
    `- Contact Us: ${data.urls.contact}`,
    ``,
    `Questions? Just reply to this email and we'll get back to you quickly!`,
    ``,
    `See you soon in Costa Rica! 🌴🎬`
  ].join('\n')
}

function escapeHtml(s: string) {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}