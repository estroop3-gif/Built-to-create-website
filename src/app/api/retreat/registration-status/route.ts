// src/app/api/retreat/registration-status/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type {
  UpdateRegistrationStatusRequest,
  UpdateRegistrationStatusResponse,
  RetreatRegistration,
  RetreatRegistrationUpdate,
  PaymentStatus,
  RegistrationStatus,
} from '@/lib/types/retreatRegistration';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_PAYMENT_STATUSES: PaymentStatus[] = ['pending', 'deposit_paid', 'paid_in_full', 'cancelled'];
const VALID_REGISTRATION_STATUSES: RegistrationStatus[] = ['pending_review', 'confirmed', 'waitlist', 'cancelled'];

function validateRequest(body: unknown): { valid: true; data: UpdateRegistrationStatusRequest } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body is required' };
  }

  const data = body as Record<string, unknown>;

  if (!data.id || typeof data.id !== 'string' || data.id.trim() === '') {
    return { valid: false, error: 'id is required and must be a non-empty string' };
  }

  // At least one status field must be provided
  if (data.registrationStatus === undefined && data.paymentStatus === undefined) {
    return { valid: false, error: 'At least one of registrationStatus or paymentStatus must be provided' };
  }

  // Validate registrationStatus if provided
  if (data.registrationStatus !== undefined) {
    if (typeof data.registrationStatus !== 'string' || !VALID_REGISTRATION_STATUSES.includes(data.registrationStatus as RegistrationStatus)) {
      return { valid: false, error: `registrationStatus must be one of: ${VALID_REGISTRATION_STATUSES.join(', ')}` };
    }
  }

  // Validate paymentStatus if provided
  if (data.paymentStatus !== undefined) {
    if (typeof data.paymentStatus !== 'string' || !VALID_PAYMENT_STATUSES.includes(data.paymentStatus as PaymentStatus)) {
      return { valid: false, error: `paymentStatus must be one of: ${VALID_PAYMENT_STATUSES.join(', ')}` };
    }
  }

  return {
    valid: true,
    data: {
      id: data.id.trim(),
      registrationStatus: data.registrationStatus as RegistrationStatus | undefined,
      paymentStatus: data.paymentStatus as PaymentStatus | undefined,
    },
  };
}

export async function PATCH(request: NextRequest): Promise<NextResponse<UpdateRegistrationStatusResponse>> {
  try {
    const body = await request.json();

    // Validate request body
    const validation = validateRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const { id, registrationStatus, paymentStatus } = validation.data;

    // Build update object
    const updateData: RetreatRegistrationUpdate = {};
    if (registrationStatus !== undefined) {
      updateData.registration_status = registrationStatus;
    }
    if (paymentStatus !== undefined) {
      updateData.payment_status = paymentStatus;
    }

    // Update in database
    const { data: registration, error: dbError } = await supabaseAdmin
      .from('retreat_registrations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (dbError) {
      console.error('Database error updating retreat registration:', dbError);

      if (dbError.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Registration not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: false, error: 'Failed to update registration. Please try again.' },
        { status: 500 }
      );
    }

    const typedRegistration = registration as RetreatRegistration;

    console.log('Retreat registration status updated:', {
      id: typedRegistration.id,
      registrationStatus: typedRegistration.registration_status,
      paymentStatus: typedRegistration.payment_status,
    });

    return NextResponse.json({
      success: true,
      registration: typedRegistration,
    });
  } catch (error) {
    console.error('Unexpected error updating retreat registration status:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
