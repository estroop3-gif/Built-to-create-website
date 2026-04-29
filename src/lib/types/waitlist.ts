export interface WaitlistEntry {
  id: string;
  experience_slug: string;
  email: string;
  full_name: string;
  phone: string | null;
  notified: boolean;
  notified_at: string | null;
  created_at: string;
}
