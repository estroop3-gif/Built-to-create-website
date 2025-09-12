import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Resend webhook events: delivered, bounced, complained, opened, clicked
    const { type, data } = body;
    
    if (!type || !data?.message_id) {
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
    }
    
    console.log(`📧 Webhook received: ${type} for message ${data.message_id}`);
    
    // Update email_sends record based on event type
    let updateData: Record<string, string> = {};
    
    switch (type) {
      case 'email.delivered':
        updateData = {
          delivery_status: 'delivered',
          delivered_at: new Date().toISOString()
        };
        break;
        
      case 'email.bounced':
        updateData = {
          delivery_status: 'bounced',
          error_message: data.bounce?.reason || 'Email bounced'
        };
        break;
        
      case 'email.complained':
        updateData = {
          delivery_status: 'bounced', // Treat complaints as bounces
          error_message: 'Spam complaint received'
        };
        break;
        
      case 'email.opened':
        updateData = {
          opened_at: new Date().toISOString()
        };
        break;
        
      case 'email.clicked':
        updateData = {
          clicked_at: new Date().toISOString()
        };
        break;
        
      default:
        console.log(`ℹ️ Unhandled webhook event: ${type}`);
        return NextResponse.json({ received: true });
    }
    
    if (Object.keys(updateData).length > 0) {
      const { error } = await supabase
        .from('email_sends')
        .update(updateData)
        .eq('resend_message_id', data.message_id);
      
      if (error) {
        console.error(`❌ Failed to update email record: ${error.message}`);
        // Don't return error to avoid webhook retries
      } else {
        console.log(`✅ Updated email record for message ${data.message_id}`);
      }
    }
    
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Also handle GET for webhook verification if needed
export async function GET(_request: NextRequest) {
  return NextResponse.json({ message: 'Marketing email webhook endpoint' });
}