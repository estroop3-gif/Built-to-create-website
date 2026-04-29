export interface PromoCode {
  id: string;
  code: string;
  discount_type: 'percent' | 'fixed';
  discount_value: number;
  experience_id: string | null;
  max_uses: number | null;
  current_uses: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

export interface PromoCodeInsert {
  code: string;
  discount_type: 'percent' | 'fixed';
  discount_value: number;
  experience_id?: string | null;
  max_uses?: number | null;
  expires_at?: string | null;
  is_active?: boolean;
}

export interface PromoCodeValidation {
  valid: boolean;
  promo_code?: PromoCode;
  reason?: string;
}
