import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AccountDashboard from '@/components/account/AccountDashboard';

export default async function AccountPage() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  return (
    <main className="min-h-screen">
      <AccountDashboard user={user} />
    </main>
  );
}