
import PageWrapper from '@/components/layout/PageWrapper';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <PageWrapper className="flex min-h-[calc(100vh-150px)] flex-col items-center justify-center">
      <AdminLoginForm />
    </PageWrapper>
  );
}
