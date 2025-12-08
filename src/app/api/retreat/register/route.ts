// src/app/api/retreat/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendRegistrationEmails } from '@/lib/retreatEmail';
import type {
  RegisterRetreatRequest,
  RegisterRetreatResponse,
  RetreatRegistration,
  RetreatRegistrationInsert,
} from '@/lib/types/retreatRegistration';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateRequest(body: unknown): { valid: true; data: RegisterRetreatRequest } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body is required' };
  }

  const data = body as Record<string, unknown>;

  // Required fields
  if (!data.retreatId || typeof data.retreatId !== 'string' || data.retreatId.trim() === '') {
    return { valid: false, error: 'retreatId is required and must be a non-empty string' };
  }

  if (!data.retreatName || typeof data.retreatName !== 'string' || data.retreatName.trim() === '') {
    return { valid: false, error: 'retreatName is required and must be a non-empty string' };
  }

  if (!data.fullName || typeof data.fullName !== 'string' || data.fullName.trim() === '') {
    return { valid: false, error: 'fullName is required and must be a non-empty string' };
  }

  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email)) {
    return { valid: false, error: 'email is required and must be a valid email address' };
  }

  if (!data.ticketType || typeof data.ticketType !== 'string' || data.ticketType.trim() === '') {
    return { valid: false, error: 'ticketType is required and must be a non-empty string' };
  }

  if (data.priceUsd === undefined || data.priceUsd === null || typeof data.priceUsd !== 'number' || data.priceUsd < 0) {
    return { valid: false, error: 'priceUsd is required and must be a non-negative number' };
  }

  // Optional fields validation
  if (data.phone !== undefined && data.phone !== null && typeof data.phone !== 'string') {
    return { valid: false, error: 'phone must be a string if provided' };
  }

  if (data.churchName !== undefined && data.churchName !== null && typeof data.churchName !== 'string') {
    return { valid: false, error: 'churchName must be a string if provided' };
  }

  if (data.role !== undefined && data.role !== null && typeof data.role !== 'string') {
    return { valid: false, error: 'role must be a string if provided' };
  }

  if (data.source !== undefined && data.source !== null && typeof data.source !== 'string') {
    return { valid: false, error: 'source must be a string if provided' };
  }

  return {
    valid: true,
    data: {
      retreatId: data.retreatId.trim(),
      retreatName: data.retreatName.trim(),
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: typeof data.phone === 'string' ? data.phone.trim() : undefined,
      churchName: typeof data.churchName === 'string' ? data.churchName.trim() : undefined,
      role: typeof data.role === 'string' ? data.role.trim() : undefined,
      ticketType: data.ticketType.trim(),
      priceUsd: data.priceUsd,
      source: typeof data.source === 'string' ? data.source.trim() : undefined,
    },
  };
}

export async function POST(request: NextRequest): Promise<NextResponse<RegisterRetreatResponse>> {
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

    const data = validation.data;

    // Prepare the insert data
    const insertData: RetreatRegistrationInsert = {
      retreat_id: data.retreatId,
      retreat_name: data.retreatName,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || null,
      church_name: data.churchName || null,
      role: data.role || null,
      ticket_type: data.ticketType,
      price_usd: data.priceUsd,
      payment_status: 'pending',
      registration_status: 'confirmed',
      source: data.source || null,
    };

    // Insert into database
    const { data: registration, error: dbError } = await supabaseAdmin
      .from('retreat_registrations')
      .insert(insertData)
      .select()
      .single();

    if (dbError) {
      console.error('Database error inserting retreat registration:', dbError);
      return NextResponse.json(
        { success: false, error: 'Failed to save registration. Please try again.' },
        { status: 500 }
      );
    }

    const typedRegistration = registration as RetreatRegistration;

    // Send emails (don't fail the request if emails fail)
    const emailResults = await sendRegistrationEmails(typedRegistration);

    if (!emailResults.attendee.success) {
      console.error('Failed to send attendee confirmation email:', emailResults.attendee.error);
    }

    if (!emailResults.host.success) {
      console.error('Failed to send host notification email:', emailResults.host.error);
    }

    console.log('Retreat registration created successfully:', {
      id: typedRegistration.id,
      email: typedRegistration.email,
      retreat: typedRegistration.retreat_name,
      emailsSent: {
        attendee: emailResults.attendee.success,
        host: emailResults.host.success,
      },
    });

    return NextResponse.json({
      success: true,
      registration: typedRegistration,
    });
  } catch (error) {
    console.error('Unexpected error in retreat registration:', error);

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
