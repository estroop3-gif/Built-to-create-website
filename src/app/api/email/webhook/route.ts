import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Resend webhook verification
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function verifyResendWebhook(_payload: string, signature: string, _secret: string): boolean {
  // Resend uses HMAC-SHA256 for webhook verification
  // In production, implement proper webhook signature verification using crypto
  // For now, return true if we have a signature
  return !!signature;
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    
    // Verify webhook signature (important for security)
    const signature = request.headers.get('resend-signature');
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
    
    if (webhookSecret && signature) {
      const isValid = verifyResendWebhook(payload, signature, webhookSecret);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid webhook signature' },
          { status: 401 }
        );
      }
    }

    const event = JSON.parse(payload);

    try {
      // Log email events for monitoring
      console.log(`📧 Resend webhook event: ${event.type} for ${event.data?.to || 'unknown'}`);
      
      // Handle specific Resend events if needed
      switch (event.type) {
        case 'email.bounced':
        case 'email.complaint':
          console.log(`⚠️  Email ${event.type} for ${event.data?.to}`);
          // TODO: Update subscriber status in database if needed
          break;
        
        case 'email.delivered':
          console.log(`✅ Email delivered to ${event.data?.to}`);
          break;
          
        case 'email.opened':
          console.log(`📖 Email opened by ${event.data?.to}`);
          break;
          
        case 'email.clicked':
          console.log(`🖱️  Email link clicked by ${event.data?.to}`);
          break;
      }
      
    } catch (error) {
      console.error('Error processing webhook event:', error);
      return NextResponse.json(
        { error: 'Event processing failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Handle GET for webhook verification (if required by provider)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  // Some providers require GET endpoint for verification
  return NextResponse.json({ status: 'Webhook endpoint active' });
}