import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Initialize Resend inside the handler to avoid build-time environment variable issues
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('Testing Resend with EMAIL_FROM:', process.env.EMAIL_FROM);
    
    // Test 1: Send to verified email (should work)
    const clientResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: ['estroop3@gmail.com'],
      subject: 'Test - Client Email (Should Work)',
      html: '<h1>Client Test Email</h1><p>This should work because estroop3@gmail.com is the verified account owner.</p>',
    });
    console.log('Client email result:', clientResult);

    // Test 2: Send to unverified email (should fail with 403)
    const adminResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: ['parker@thebtcp.com'],
      subject: 'Test - Admin Email (Should Fail)',
      html: '<h1>Admin Test Email</h1><p>This should fail because parker@thebtcp.com is not the verified account owner.</p>',
    });
    console.log('Admin email result:', adminResult);

    return NextResponse.json({ 
      success: true, 
      clientResult, 
      adminResult,
      message: 'Both emails attempted - check console for results'
    });
  } catch (error) {
    console.error('Resend test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';