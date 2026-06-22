import Link from "next/link";
import { ServiceTable } from "@/components/admin/services/ServiceTable";
import { adminBtnPrimaryClass } from "@/components/admin/admin-ui";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export default async function AdminServicesPage() {
  const rows = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="mt-1 text-sm text-white/45">Service offerings and detail pages.</p>
        </div>
        <Link href="/admin/services/new" className={adminBtnPrimaryClass}>
          Add New
        </Link>
      </div>
      <ServiceTable initial={rows} />
    </div>
  );
}
