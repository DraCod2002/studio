
import PageWrapper from '@/components/layout/PageWrapper';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';

export const metadata = {
  title: 'Admin Dashboard | Xstrees',
  robots: 'noindex, nofollow', // Evitar que los motores de búsqueda indexen esta página
};

export default function AdminDashboardPage() {
  return (
    <PageWrapper>
      <AdminDashboardClient />
    </PageWrapper>
  );
}
