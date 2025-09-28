import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getRetreat } from '@/lib/retreats';
import RetreatAccountPage from '@/components/account/RetreatAccountPage';

interface RetreatAccountPageProps {
  params: {
    slug: string;
  };
}

export default async function RetreatAccount({ params }: RetreatAccountPageProps) {
  const { slug } = await params;
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  // Check if user has access to this retreat
  const { data: access } = await supabase
    .from('retreat_access')
    .select('*')
    .eq('user_id', user.id)
    .eq('retreat_slug', slug)
    .single();

  if (!access) {
    notFound();
  }

  const retreat = getRetreat(slug);

  if (!retreat) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <RetreatAccountPage retreat={retreat} user={user} />
    </main>
  );
}