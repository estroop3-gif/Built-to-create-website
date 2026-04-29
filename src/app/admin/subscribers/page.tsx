import { requireAdmin } from '@/lib/admin';
import AdminSubscribersPage from '@/components/admin/AdminSubscribersPage';

export default async function SubscribersPage() {
  await requireAdmin();

  return (
    <main className="min-h-screen">
      <AdminSubscribersPage />
    </main>
  );
}
