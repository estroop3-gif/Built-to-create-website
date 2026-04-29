import { createClient } from '@supabase/supabase-js';

// Client-side Supabase client (using anon key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side admin client (using service role key)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Contact message types
export interface ContactMessage {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  client_ip?: string;
  user_agent?: string;
  status?: string;
}

// Insert contact message using admin client
export async function insertContactMessage(data: ContactMessage) {
  const { error } = await supabaseAdmin
    .from('contact_messages')
    .insert(data);

  if (error) {
    console.error('Error inserting contact message:', error);
    throw error;
  }
}

// Email subscriber types
export interface EmailSubscriber {
  id?: string;
  email: string;
  name?: string;
  phone?: string;
  source: 'contact_form' | 'registration' | 'manual' | 'waitlist';
  status?: 'subscribed' | 'unsubscribed';
  created_at?: string;
  unsubscribed_at?: string;
}

// Upsert email subscriber (won't overwrite if already exists)
export async function upsertEmailSubscriber(data: EmailSubscriber) {
  const { error } = await supabaseAdmin
    .from('email_subscribers')
    .upsert(
      {
        email: data.email.toLowerCase(),
        name: data.name,
        phone: data.phone,
        source: data.source,
        status: 'subscribed',
      },
      { onConflict: 'email', ignoreDuplicates: true }
    );

  if (error) {
    console.error('Error upserting email subscriber:', error);
    // Don't throw — subscribing is not critical to the contact form
  }
}

// Get all email subscribers
export async function getEmailSubscribers(statusFilter?: 'subscribed' | 'unsubscribed') {
  let query = supabaseAdmin
    .from('email_subscribers')
    .select('*')
    .order('created_at', { ascending: false });

  if (statusFilter) {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching email subscribers:', error);
    throw error;
  }

  return data;
}

// Get subscriber count
export async function getSubscriberCount() {
  const { count, error } = await supabaseAdmin
    .from('email_subscribers')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'subscribed');

  if (error) {
    console.error('Error fetching subscriber count:', error);
    return 0;
  }

  return count || 0;
}

// Unsubscribe by email
export async function unsubscribeEmail(email: string) {
  const { error } = await supabaseAdmin
    .from('email_subscribers')
    .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
    .eq('email', email.toLowerCase());

  if (error) {
    console.error('Error unsubscribing email:', error);
    throw error;
  }
}