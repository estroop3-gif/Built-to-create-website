import { requireAdmin } from '@/lib/admin';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default async function AdminPage() {
  await requireAdmin();

  return (
    <main className="min-h-screen">
      <AdminDashboard />
    </main>
  );
}