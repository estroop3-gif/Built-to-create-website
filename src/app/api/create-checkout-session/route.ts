import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Force production deployment with environment variables

const isLiveKey = (k?: string) => !!k && k.startsWith('sk_live');
if (process.env.NODE_ENV !== 'production' && isLiveKey(process.env.STRIPE_SECRET_KEY)) {
  console.warn('Warning: LIVE Stripe key detected in non-production environment.');
}

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-08-27.basil',
  });
  
  try {
    const body = await request.json();
    const {
      email, planLabel, retreat, retreat_start, retreat_location, retreat_type, first_name, last_name, phone,
      // Extended registration fields
      date_of_birth, address_line1, address_line2, city, state_province, postal_code, country,
      emergency_contact_name, emergency_contact_phone, emergency_contact_relationship,
      experience_level, bring_own_camera, camera_equipment_details,
      dietary_restrictions, medical_conditions, how_did_you_hear, special_requests
    } = body;

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

    // Determine which retreat pricing to use
    const isTexas = retreat_type === 'texas';
    const isWorkshop = retreat_type === 'filmmaking-workshop';

    // Workshop pricing
    const workshopPricing = {
      'Workshop - Full': { name: 'Filmmaking in the Real World Workshop', unit_amount: 5000 }, // $50
    };

    // Costa Rica pricing (in cents)
    const costaRicaPricing = {
      'Full - Early Bird': { name: 'Full - Early Bird', unit_amount: 479000 }, // $4,790
      'Full - Standard': { name: 'Full - Standard', unit_amount: 549000 },     // $5,490
      'Full - Late': { name: 'Full - Late', unit_amount: 595000 },             // $5,950
      'Deposit': { name: 'Deposit', unit_amount: 180000 },                     // $1,800
    };

    // Texas pricing (in cents)
    const texasPricing = {
      'Full - Early Bird': { name: 'Full - Early Bird', unit_amount: 385000 }, // $3,850
      'Full - Standard': { name: 'Full - Standard', unit_amount: 400000 },     // $4,000
      'Full - Late': { name: 'Full - Late', unit_amount: 425000 },             // $4,250
      'Deposit': { name: 'Deposit', unit_amount: 100000 },                     // $1,000
    };

    // Select the correct pricing based on retreat type
    const basePricing: Record<string, { name: string; unit_amount: number }> = isWorkshop ? workshopPricing : isTexas ? texasPricing : costaRicaPricing;
    const selectedPricing = basePricing[planLabel];

    if (!selectedPricing) {
      return NextResponse.json(
        { error: 'Invalid plan label' },
        { status: 400 }
      );
    }

    // Apply $300 discount for bringing own camera (Costa Rica only, non-deposit plans only)
    const cameraDiscount = 30000; // $300 in cents
    let finalAmount = selectedPricing.unit_amount;
    let discountApplied = false;

    if (bring_own_camera && !isTexas && !isWorkshop && planLabel !== 'Deposit') {
      finalAmount -= cameraDiscount;
      discountApplied = true;
    }

    // Handle promo codes — validate against database
    const promoCode = (body.promo_code || '').trim().toUpperCase();
    let matchedPromo: { coupon_id: string; percent_off?: number; amount_off?: number } | null = null;

    if (promoCode) {
      const { validatePromoCode } = await import('@/lib/services/promoCodeService');
      const validation = await validatePromoCode(promoCode);

      if (validation.valid && validation.promo_code) {
        const pc = validation.promo_code;
        const couponId = `PROMO_${pc.code}`;

        if (pc.discount_type === 'percent') {
          matchedPromo = { coupon_id: couponId, percent_off: Number(pc.discount_value) };
        } else {
          // fixed discount — amount_off is in cents for Stripe
          matchedPromo = { coupon_id: couponId, amount_off: Number(pc.discount_value) };
        }

        // Ensure the Stripe coupon exists
        try {
          await stripe.coupons.retrieve(couponId);
        } catch {
          await stripe.coupons.create({
            id: couponId,
            ...(pc.discount_type === 'percent'
              ? { percent_off: Number(pc.discount_value) }
              : { amount_off: Number(pc.discount_value), currency: 'usd' }),
            duration: 'once',
            name: `Promo: ${pc.code}`,
          });
        }
      }
    }

    const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: discountApplied ? `${selectedPricing.name} (w/ Camera Discount)` : selectedPricing.name,
              description: isWorkshop
                ? `Filmmaking in the Real World Workshop - Jasper, GA - ${retreat_start}`
                : isTexas
                  ? `Media Leaders Retreat - Texas Hill Country - ${retreat_start}`
                  : discountApplied
                    ? `9-day Christian filmmaking retreat in Costa Rica - $300 discount for bringing your own camera - ${retreat_start}`
                    : `9-day Christian filmmaking retreat in Costa Rica - ${retreat_start}`,
            },
            unit_amount: finalAmount,
          },
          quantity: 1,
        },
      ],
      ...(matchedPromo
        ? { discounts: [{ coupon: matchedPromo.coupon_id }] }
        : promoCode
          ? { allow_promotion_codes: true }
          : {}
      ),
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
        date_of_birth: date_of_birth || '',
        // Address fields
        address_line1: address_line1 || '',
        address_line2: address_line2 || '',
        city: city || '',
        state_province: state_province || '',
        postal_code: postal_code || '',
        country: country || '',
        // Emergency contact
        emergency_contact_name: emergency_contact_name || '',
        emergency_contact_phone: emergency_contact_phone || '',
        emergency_contact_relationship: emergency_contact_relationship || '',
        // Preferences and equipment
        experience_level: experience_level || '',
        bring_own_camera: String(!!bring_own_camera),
        camera_equipment_details: (camera_equipment_details || '').substring(0, 500),
        // Medical and dietary
        dietary_restrictions: (dietary_restrictions || '').substring(0, 500),
        medical_conditions: (medical_conditions || '').substring(0, 500),
        how_did_you_hear: how_did_you_hear || '',
        special_requests: (special_requests || '').substring(0, 500),
        // Retreat details
        retreat: retreat || 'Born to Create Project Retreat',
        retreat_start: retreat_start || '',
        retreat_location: retreat_location || '',
        retreat_type: retreat_type || 'costa-rica',
        promo_code: promoCode || '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}