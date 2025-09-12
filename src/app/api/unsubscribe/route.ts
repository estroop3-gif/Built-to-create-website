import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token } = body;

    // Initialize Supabase with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let targetEmail = email;

    // If token is provided, verify it and extract email
    if (token && !email) {
      try {
        // Simple base64 decode for now - in production use proper JWT
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const tokenData = JSON.parse(decoded);
        
        if (tokenData.email && isValidEmail(tokenData.email)) {
          targetEmail = tokenData.email;
        } else {
          return NextResponse.json(
            { success: false, error: 'Invalid token' },
            { status: 400 }
          );
        }
      } catch {
        return NextResponse.json(
          { success: false, error: 'Invalid token format' },
          { status: 400 }
        );
      }
    }

    if (!targetEmail || !isValidEmail(targetEmail)) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Update the lead to opt out of marketing
    const { error } = await supabase
      .from('leads')
      .update({
        consent_marketing: false,
        next_send_at: null, // Stop future sends
        updated_at: new Date().toISOString()
      })
      .eq('email', targetEmail.toLowerCase());

    if (error) {
      console.error('Supabase unsubscribe error:', error);
      return NextResponse.json(
        { success: false, error: 'Database error' },
        { status: 500 }
      );
    }

    // Log the unsubscribe event
    const { data: lead } = await supabase
      .from('leads')
      .select('id')
      .eq('email', targetEmail.toLowerCase())
      .single();

    if (lead) {
      await supabase
        .from('email_events')
        .insert({
          lead_id: lead.id,
          email_address: targetEmail.toLowerCase(),
          event_type: 'unsubscribed'
        });
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from all marketing emails.'
    });

  } catch (error) {
    console.error('Unsubscribe API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests for email unsubscribe links
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  if (!token && !email) {
    return NextResponse.json(
      { success: false, error: 'Token or email required' },
      { status: 400 }
    );
  }

  // Process unsubscribe
  const response = await POST(new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ token, email }),
    headers: { 'Content-Type': 'application/json' }
  }));

  const result = await response.json();

  if (result.success) {
    // Return a simple HTML page confirming unsubscribe
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Unsubscribed - Born to Create Project</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
            h1 { color: #2d5016; }
            p { color: #666; line-height: 1.6; }
            .success { color: #2d5016; font-weight: 500; }
          </style>
        </head>
        <body>
          <h1>You've been unsubscribed</h1>
          <p class="success">You will no longer receive marketing emails from Born to Create Project.</p>
          <p>If you change your mind, you can always re-subscribe on our website.</p>
          <p><a href="https://thebtcp.com" style="color: #2d5016;">Return to thebtcp.com</a></p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  } else {
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error - Born to Create Project</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
            h1 { color: #dc2626; }
            p { color: #666; line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>Error</h1>
          <p>There was an error processing your unsubscribe request. Please try again or contact us directly.</p>
          <p><a href="mailto:parker@thebtcp.com" style="color: #2d5016;">Contact Support</a></p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
      status: 400
    });
  }
}