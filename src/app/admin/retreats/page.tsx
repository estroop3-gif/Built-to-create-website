import { requireAdmin } from '@/lib/admin';
import AdminRetreatsPage from '@/components/admin/AdminRetreatsPage';

export default async function RetreatsPage() {
  await requireAdmin();

  return (
    <main className="min-h-screen">
      <AdminRetreatsPage />
    </main>
  );
}