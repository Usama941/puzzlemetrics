import { AdminProviders } from "@/components/admin/AdminProviders";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const dynamic = 'force-dynamic';
export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  const newSubmissionsCount = await prisma.formSubmission.count({
    where: { status: "new" },
  });

  return (
    <AdminProviders>
      <div className="min-h-screen bg-[#0B0B14] text-white">
        <AdminSidebar newSubmissionsCount={newSubmissionsCount} />
        <div className="ml-[260px] min-h-screen">
          <AdminTopBar />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AdminProviders>
  );
}
