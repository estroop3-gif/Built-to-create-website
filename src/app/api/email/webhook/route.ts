import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/services/email';

export const runtime = 'edge';

// Resend webhook verification
function verifyResendWebhook(payload: string, signature: string, secret: string): boolean {
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
      await emailService.handleWebhookEvent(event);
      
      // Log successful processing
      console.log(`Processed Resend webhook event: ${event.type} for ${event.data?.to}`);
      
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
export async function GET(request: NextRequest) {
  // Some providers require GET endpoint for verification
  return NextResponse.json({ status: 'Webhook endpoint active' });
}