import { createClient } from '@supabase/supabase-js';

// Client-side Supabase client (using anon key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side admin client (using service role key)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
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