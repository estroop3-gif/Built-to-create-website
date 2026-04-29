import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type {
  Experience,
  ExperienceInsert,
  ExperienceUpdate,
  ExperienceStatus,
  ExperienceType,
  PageSections,
  PricingTier,
} from '@/lib/types/experience';

interface ListFilters {
  status?: ExperienceStatus;
  type?: ExperienceType;
}

export async function listExperiences(filters?: ListFilters): Promise<Experience[]> {
  let query = supabaseAdmin
    .from('experiences')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.type) {
    query = query.eq('type', filters.type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Experience[];
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  const { data, error } = await supabaseAdmin
    .from('experiences')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Experience;
}

export async function getExperienceBySlug(slug: string): Promise<Experience | null> {
  const { data, error } = await supabaseAdmin
    .from('experiences')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Experience;
}

export async function createExperience(data: ExperienceInsert): Promise<Experience> {
  const { data: created, error } = await supabaseAdmin
    .from('experiences')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return created as Experience;
}

export async function updateExperience(id: string, data: ExperienceUpdate): Promise<Experience> {
  const { data: updated, error } = await supabaseAdmin
    .from('experiences')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return updated as Experience;
}

export async function deleteExperience(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('experiences')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function updatePageSections(id: string, sections: PageSections): Promise<Experience> {
  return updateExperience(id, { page_sections: sections });
}

export async function updatePricingTiers(id: string, tiers: PricingTier[]): Promise<Experience> {
  return updateExperience(id, { pricing_tiers: tiers });
}

export async function toggleFeatured(id: string, featured: boolean): Promise<Experience> {
  return updateExperience(id, { featured_on_homepage: featured });
}

export async function toggleNavVisibility(id: string, show: boolean, order?: number): Promise<Experience> {
  const update: ExperienceUpdate = { show_in_nav: show };
  if (order !== undefined) update.nav_order = order;
  return updateExperience(id, update);
}

export async function getCapacityStatus(slug: string): Promise<{
  capacity: number | null;
  registered_count: number;
  available: number | null;
  is_full: boolean;
  waitlist_count: number;
}> {
  // Get experience
  const { data: experience, error: expError } = await supabaseAdmin
    .from('experiences')
    .select('capacity, registered_count')
    .eq('slug', slug)
    .single();

  if (expError) {
    if (expError.code === 'PGRST116') {
      return { capacity: null, registered_count: 0, available: null, is_full: false, waitlist_count: 0 };
    }
    throw expError;
  }

  // Count un-notified waitlist entries
  const { count: waitlistCount, error: wlError } = await supabaseAdmin
    .from('experience_waitlist')
    .select('*', { count: 'exact', head: true })
    .eq('experience_slug', slug)
    .eq('notified', false);

  if (wlError) throw wlError;

  const capacity = experience?.capacity ?? null;
  const registered_count = experience?.registered_count ?? 0;
  const available = capacity !== null ? Math.max(0, capacity - registered_count) : null;
  const is_full = capacity !== null && registered_count >= capacity;

  return {
    capacity,
    registered_count,
    available,
    is_full,
    waitlist_count: waitlistCount || 0,
  };
}

export async function getPublishedExperienceBySlug(slug: string): Promise<Experience | null> {
  const { data, error } = await supabaseAdmin
    .from('experiences')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Experience;
}

export async function listPublishedSlugs(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from('experiences')
    .select('slug')
    .eq('status', 'published');

  if (error) throw error;
  return (data ?? []).map((d: { slug: string }) => d.slug);
}

export async function getNavExperiences(): Promise<Experience[]> {
  const { data, error } = await supabaseAdmin
    .from('experiences')
    .select('*')
    .eq('status', 'published')
    .eq('show_in_nav', true)
    .order('nav_order', { ascending: true });

  if (error) throw error;
  return data as Experience[];
}
