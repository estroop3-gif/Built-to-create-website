import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { PromoCode, PromoCodeInsert, PromoCodeValidation } from '@/lib/types/promoCode';

interface ListFilters {
  experience_id?: string;
  is_active?: boolean;
}

export async function listPromoCodes(filters?: ListFilters): Promise<PromoCode[]> {
  let query = supabaseAdmin
    .from('promo_codes')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.experience_id) {
    query = query.eq('experience_id', filters.experience_id);
  }
  if (filters?.is_active !== undefined) {
    query = query.eq('is_active', filters.is_active);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as PromoCode[];
}

export async function getPromoCodeById(id: string): Promise<PromoCode | null> {
  const { data, error } = await supabaseAdmin
    .from('promo_codes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as PromoCode;
}

export async function createPromoCode(data: PromoCodeInsert): Promise<PromoCode> {
  const { data: created, error } = await supabaseAdmin
    .from('promo_codes')
    .insert({ ...data, code: data.code.toUpperCase() })
    .select()
    .single();

  if (error) throw error;
  return created as PromoCode;
}

export async function updatePromoCode(
  id: string,
  data: Partial<PromoCodeInsert>
): Promise<PromoCode> {
  const update = data.code ? { ...data, code: data.code.toUpperCase() } : data;
  const { data: updated, error } = await supabaseAdmin
    .from('promo_codes')
    .update(update)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return updated as PromoCode;
}

export async function deletePromoCode(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('promo_codes')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function validatePromoCode(
  code: string,
  experienceId?: string
): Promise<PromoCodeValidation> {
  const { data, error } = await supabaseAdmin
    .from('promo_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .single();

  if (error || !data) {
    return { valid: false, reason: 'Invalid promo code' };
  }

  const promo = data as PromoCode;

  if (!promo.is_active) {
    return { valid: false, reason: 'Promo code is no longer active' };
  }

  if (promo.expires_at && new Date(promo.expires_at) < new Date()) {
    return { valid: false, reason: 'Promo code has expired' };
  }

  if (promo.max_uses !== null && promo.current_uses >= promo.max_uses) {
    return { valid: false, reason: 'Promo code has reached its usage limit' };
  }

  if (promo.experience_id && experienceId && promo.experience_id !== experienceId) {
    return { valid: false, reason: 'Promo code is not valid for this experience' };
  }

  return { valid: true, promo_code: promo };
}

export async function incrementUsage(id: string): Promise<void> {
  const { data: current, error: fetchError } = await supabaseAdmin
    .from('promo_codes')
    .select('current_uses')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  const { error } = await supabaseAdmin
    .from('promo_codes')
    .update({ current_uses: (current?.current_uses ?? 0) + 1 })
    .eq('id', id);

  if (error) throw error;
}
