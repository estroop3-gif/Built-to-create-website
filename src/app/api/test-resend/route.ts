import { sendTransactionalEmail } from '@/lib/resend';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('Testing enhanced email deliverability system');

    // Test 1: Send transactional test email
    const clientResult = await sendTransactionalEmail({
      to: ['estroop3@gmail.com'],
      subject: '🔧 Test - Enhanced Transactional Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>🔧 Enhanced Email System Test</h1>
          <p>This is a test of the enhanced transactional email system.</p>
          <ul>
            <li>✅ Uses sendTransactionalEmail() helper</li>
            <li>✅ No List-Unsubscribe headers (transactional)</li>
            <li>✅ Automatic HTML-to-text conversion</li>
            <li>✅ Proper authentication headers</li>
          </ul>
          <p>Sent from: Born to Create Project Enhanced Email System</p>
        </div>
      `,
    });
    console.log('Enhanced client email result:', clientResult);

    // Test 2: Send to admin
    const adminResult = await sendTransactionalEmail({
      to: ['estroop3@gmail.com'],
      subject: '🔧 Test - Enhanced Admin Notification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>🔧 Enhanced Admin Notification Test</h1>
          <p>This is a test of the enhanced admin notification system.</p>
          <ul>
            <li>✅ Uses sendTransactionalEmail() helper</li>
            <li>✅ Proper deliverability headers</li>
            <li>✅ Enhanced authentication</li>
            <li>✅ HTML and plain text versions</li>
          </ul>
          <p>System status: All email enhancements operational</p>
        </div>
      `,
    });
    console.log('Enhanced admin email result:', adminResult);

    return NextResponse.json({
      success: true,
      clientResult,
      adminResult,
      message: 'Enhanced email system test completed - check inbox and console for results'
    });
  } catch (error) {
    console.error('Enhanced email test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';