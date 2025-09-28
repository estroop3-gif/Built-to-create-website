import { requireAdmin } from '@/lib/admin';
import AdminUsersPage from '@/components/admin/AdminUsersPage';

export default async function UsersPage() {
  await requireAdmin();

  return (
    <main className="min-h-screen">
      <AdminUsersPage />
    </main>
  );
}