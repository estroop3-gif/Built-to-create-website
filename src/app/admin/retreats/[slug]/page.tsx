import { requireAdmin } from '@/lib/admin';
import { getRetreat } from '@/lib/retreats';
import { notFound } from 'next/navigation';
import AdminRetreatDetailPage from '@/components/admin/AdminRetreatDetailPage';

interface AdminRetreatPageProps {
  params: {
    slug: string;
  };
}

export default async function AdminRetreatPage({ params }: AdminRetreatPageProps) {
  await requireAdmin();

  const { slug } = await params;
  const retreat = getRetreat(slug);

  if (!retreat) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <AdminRetreatDetailPage retreat={retreat} />
    </main>
  );
}