import { AdminProviders } from '@/components/admin/AdminProviders';

export const dynamic = 'force-dynamic';
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminProviders>{children}</AdminProviders>;
}
