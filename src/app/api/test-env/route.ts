import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
    hasStripePublic: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    hasSiteUrl: !!process.env.SITE_URL,
    siteUrl: process.env.SITE_URL,
    stripeSecretPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 10) || 'missing',
    timestamp: new Date().toISOString()
  });
}