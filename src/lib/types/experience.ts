export interface PricingTier {
  label: string;
  price_cents: number;
  start_date?: string;
  end_date?: string;
}

export interface PageSections {
  hero?: Record<string, unknown>;
  about?: Record<string, unknown>;
  itinerary?: Record<string, unknown>;
  packing?: Record<string, unknown>;
  faqs?: Record<string, unknown>;
  gallery?: Record<string, unknown>;
  cta?: Record<string, unknown>;
  [key: string]: Record<string, unknown> | undefined;
}

export interface DayItem {
  day: number;
  title: string;
  description: string;
  location?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type ExperienceType = 'retreat' | 'workshop';
export type ExperienceStatus = 'draft' | 'published' | 'archived';

export interface Experience {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  type: ExperienceType;
  status: ExperienceStatus;
  start_date: string | null;
  end_date: string | null;
  location: string | null;
  description: string | null;
  page_sections: PageSections;
  pricing_tiers: PricingTier[];
  deposit_amount_cents: number | null;
  currency: string;
  featured_on_homepage: boolean;
  show_in_nav: boolean;
  nav_order: number;
  capacity: number | null;
  registered_count: number;
  country: string | null;
  city: string | null;
  theme: string | null;
  hero_image: string | null;
  og_image: string | null;
  register_url: string | null;
  email_cta_text: string | null;
  seo_description: string | null;
  overview: string | null;
  gear_note: string | null;
  price_display: string | null;
  duration_display: string | null;
  start_time: string | null;
  end_time: string | null;
  venue: string | null;
  venue_address: string | null;
  learning_outcomes: string[];
  itinerary: DayItem[];
  faqs: FAQ[];
  created_at: string;
  updated_at: string;
}

export interface ExperienceInsert {
  slug: string;
  title: string;
  subtitle?: string | null;
  type?: ExperienceType;
  status?: ExperienceStatus;
  start_date?: string | null;
  end_date?: string | null;
  location?: string | null;
  description?: string | null;
  page_sections?: PageSections;
  pricing_tiers?: PricingTier[];
  deposit_amount_cents?: number | null;
  currency?: string;
  featured_on_homepage?: boolean;
  show_in_nav?: boolean;
  nav_order?: number;
  capacity?: number | null;
  country?: string | null;
  city?: string | null;
  theme?: string | null;
  hero_image?: string | null;
  og_image?: string | null;
  register_url?: string | null;
  email_cta_text?: string | null;
  seo_description?: string | null;
  overview?: string | null;
  gear_note?: string | null;
  price_display?: string | null;
  duration_display?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  venue?: string | null;
  venue_address?: string | null;
  learning_outcomes?: string[];
  itinerary?: DayItem[];
  faqs?: FAQ[];
}

export interface ExperienceUpdate {
  slug?: string;
  title?: string;
  subtitle?: string | null;
  type?: ExperienceType;
  status?: ExperienceStatus;
  start_date?: string | null;
  end_date?: string | null;
  location?: string | null;
  description?: string | null;
  page_sections?: PageSections;
  pricing_tiers?: PricingTier[];
  deposit_amount_cents?: number | null;
  currency?: string;
  featured_on_homepage?: boolean;
  show_in_nav?: boolean;
  nav_order?: number;
  capacity?: number | null;
  country?: string | null;
  city?: string | null;
  theme?: string | null;
  hero_image?: string | null;
  og_image?: string | null;
  register_url?: string | null;
  email_cta_text?: string | null;
  seo_description?: string | null;
  overview?: string | null;
  gear_note?: string | null;
  price_display?: string | null;
  duration_display?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  venue?: string | null;
  venue_address?: string | null;
  learning_outcomes?: string[];
  itinerary?: DayItem[];
  faqs?: FAQ[];
}
