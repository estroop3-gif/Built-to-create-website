/**
 * Normalized registration shape that merges both `registrations` (Stripe checkout)
 * and `retreat_registrations` (manual/retreat) tables into a single interface.
 */
export interface UnifiedRegistration {
  id: string;
  source: 'stripe' | 'retreat';
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  retreat_name: string | null;
  plan_label: string | null;
  amount_paid: number | null;
  currency: string | null;
  payment_status: string | null;
  registration_status: string | null;
  experience_id: string | null;
  created_at: string;
}
