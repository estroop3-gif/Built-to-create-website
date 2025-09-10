import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const isLiveKey = (k?: string) => !!k && k.startsWith('sk_live');
if (process.env.NODE_ENV !== 'production' && isLiveKey(process.env.STRIPE_SECRET_KEY)) {
  throw new Error('Refusing to start: LIVE Stripe key detected in non-production environment.');
}

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-08-27.basil',
  });
  
  try {
    const body = await request.json();
    const { email, planLabel, retreat, retreat_start, retreat_location, first_name, last_name, phone } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!planLabel) {
      return NextResponse.json(
        { error: 'Plan label is required' },
        { status: 400 }
      );
    }

    const isTestMode = process.env.NODE_ENV !== 'production';
    const testAmount = 100; // $1.00 for testing

    const pricing = {
      'Full - Early Bird': {
        name: 'Full - Early Bird',
        unit_amount: isTestMode ? testAmount : 479000, // $1.00 test / $4,790 prod
      },
      'Full - Standard': {
        name: 'Full - Standard',
        unit_amount: isTestMode ? testAmount : 549000, // $1.00 test / $5,490 prod
      },
      'Full - Late': {
        name: 'Full - Late',
        unit_amount: isTestMode ? testAmount : 595000, // $1.00 test / $5,950 prod
      },
      'Deposit': {
        name: 'Deposit',
        unit_amount: isTestMode ? testAmount : 180000, // $1.00 test / $1,800 prod
      },
    };

    const selectedPricing = pricing[planLabel as keyof typeof pricing];
    
    if (!selectedPricing) {
      return NextResponse.json(
        { error: 'Invalid plan label' },
        { status: 400 }
      );
    }
    const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPricing.name,
              description: '9-day Christian filmmaking retreat in Costa Rica',
            },
            unit_amount: selectedPricing.unit_amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${siteUrl}/register/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/register/cancel`,
      customer_email: email,
      metadata: {
        plan_label: planLabel,
        form_email: email,
        first_name: first_name || '',
        last_name: last_name || '',
        phone: phone || '',
        retreat: retreat || 'Born to Create Project Retreat',
        retreat_start: retreat_start || 'February 14-22, 2026',
        retreat_location: retreat_location || 'Costa Rica',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}