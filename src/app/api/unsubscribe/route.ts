import { NextRequest, NextResponse } from 'next/server';
import { verifyUnsubscribeToken } from '@/lib/token';
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new NextResponse('Missing token', { status: 400 });
  }

  try {
    const body = await request.text();

    if (body !== 'List-Unsubscribe=One-Click') {
      return new NextResponse('Invalid request body', { status: 400 });
    }

    const decoded = verifyUnsubscribeToken(token);
    const email = decoded.email;

    const userAgent = request.headers.get('user-agent') || undefined;
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    const { error } = await supabase.rpc('unsubscribe_email', {
      email_address: email,
      unsubscribe_reason: 'One-click unsubscribe',
      unsubscribe_source: 'one-click',
      request_user_agent: userAgent,
      request_ip: ip
    });

    if (error) {
      console.error('Database error during one-click unsubscribe:', error);
      return new NextResponse('Internal server error', { status: 500 });
    }

    await supabase
      .from('leads')
      .update({
        consent_marketing: false,
        next_send_at: null,
        updated_at: new Date().toISOString()
      })
      .eq('email', email.toLowerCase());

    return new NextResponse('Success', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    });

  } catch (error) {
    console.error('One-click unsubscribe error:', error);
    return new NextResponse('Invalid or expired token', { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new NextResponse(
      generateHtmlPage('Invalid Request', 'Missing unsubscribe token.'),
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  try {
    const decoded = verifyUnsubscribeToken(token);
    const email = decoded.email;

    const userAgent = request.headers.get('user-agent') || undefined;
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    const { error } = await supabase.rpc('unsubscribe_email', {
      email_address: email,
      unsubscribe_reason: 'User clicked unsubscribe link',
      unsubscribe_source: 'manual',
      request_user_agent: userAgent,
      request_ip: ip
    });

    if (error) {
      console.error('Database error during unsubscribe:', error);
      return new NextResponse(
        generateHtmlPage('Error', 'An error occurred while unsubscribing. Please try again.'),
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    await supabase
      .from('leads')
      .update({
        consent_marketing: false,
        next_send_at: null,
        updated_at: new Date().toISOString()
      })
      .eq('email', email.toLowerCase());

    return new NextResponse(
      generateHtmlPage(
        'Successfully Unsubscribed',
        `The email ${email} has been successfully unsubscribed from our mailing list.`
      ),
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );

  } catch (error) {
    console.error('Unsubscribe error:', error);
    const message = error instanceof Error ? error.message : 'Invalid or expired unsubscribe link.';

    return new NextResponse(
      generateHtmlPage('Invalid Link', message),
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

function generateHtmlPage(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Born to Create Project</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 40px 20px;
            background-color: #f8fafc;
            color: #334155;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: #1e293b;
            margin-bottom: 20px;
        }
        p {
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 30px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            font-size: 14px;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">Born to Create Project</div>
        <h1>${title}</h1>
        <p>${message}</p>
        <div class="footer">
            <p>Visit us at <a href="https://thebtcp.com" style="color: #3b82f6;">thebtcp.com</a></p>
        </div>
    </div>
</body>
</html>`;
}