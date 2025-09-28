import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AccountSettings from '@/components/account/AccountSettings';

export default async function SettingsPage() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  return (
    <main className="min-h-screen">
      <AccountSettings user={user} />
    </main>
  );
}