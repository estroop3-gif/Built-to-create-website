// src/lib/types/retreatRegistration.ts

export type PaymentStatus = 'pending' | 'deposit_paid' | 'paid_in_full' | 'cancelled';
export type RegistrationStatus = 'pending_review' | 'confirmed' | 'waitlist' | 'cancelled';

export interface RetreatRegistration {
  id: string;
  created_at: string;
  updated_at: string;
  retreat_id: string;
  retreat_name: string;
  full_name: string;
  email: string;
  phone: string | null;
  church_name: string | null;
  role: string | null;
  ticket_type: string | null;
  price_usd: number | null;
  payment_status: PaymentStatus;
  registration_status: RegistrationStatus;
  source: string | null;
  internal_notes: string | null;
}

export interface RetreatRegistrationInsert {
  retreat_id: string;
  retreat_name: string;
  full_name: string;
  email: string;
  phone?: string | null;
  church_name?: string | null;
  role?: string | null;
  ticket_type?: string | null;
  price_usd?: number | null;
  payment_status?: PaymentStatus;
  registration_status?: RegistrationStatus;
  source?: string | null;
  internal_notes?: string | null;
}

export interface RetreatRegistrationUpdate {
  retreat_id?: string;
  retreat_name?: string;
  full_name?: string;
  email?: string;
  phone?: string | null;
  church_name?: string | null;
  role?: string | null;
  ticket_type?: string | null;
  price_usd?: number | null;
  payment_status?: PaymentStatus;
  registration_status?: RegistrationStatus;
  source?: string | null;
  internal_notes?: string | null;
}

// API request/response types
export interface RegisterRetreatRequest {
  retreatId: string;
  retreatName: string;
  fullName: string;
  email: string;
  phone?: string;
  churchName?: string;
  role?: string;
  ticketType: string;
  priceUsd: number;
  source?: string;
}

export interface RegisterRetreatResponse {
  success: boolean;
  registration?: RetreatRegistration;
  error?: string;
}

export interface UpdateRegistrationStatusRequest {
  id: string;
  registrationStatus?: RegistrationStatus;
  paymentStatus?: PaymentStatus;
}

export interface UpdateRegistrationStatusResponse {
  success: boolean;
  registration?: RetreatRegistration;
  error?: string;
}

// Admin filter types
export interface RegistrationFilters {
  retreatId?: string;
  registrationStatus?: RegistrationStatus;
  paymentStatus?: PaymentStatus;
  search?: string;
}
