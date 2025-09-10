import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-08-27.basil',
  });
  
  try {
    const body = await request.json();
    const { email, retreat_option = 'with_equipment' } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const pricing = {
      with_equipment: {
        name: 'Costa Rica Retreat - With Equipment Included',
        unit_amount: 399700, // $3,997
      },
      without_equipment: {
        name: 'Costa Rica Retreat - Bring Your Own Equipment',
        unit_amount: 369700, // $3,697
      },
    };

    const selectedPricing = pricing[retreat_option as keyof typeof pricing];
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
        retreat_option,
        retreat: 'Born to Create Project Retreat',
        retreat_start: 'February 14-22, 2026',
        retreat_location: 'Costa Rica',
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