import Link from "next/link";
import { PricingTable } from "@/components/admin/pricing/PricingTable";
import { adminBtnPrimaryClass } from "@/components/admin/admin-ui";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export default async function AdminPricingPage() {
  const rows = await prisma.pricingPlan.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Pricing Plans</h1>
          <p className="mt-1 text-sm text-white/45">Build / Validate / Scale cards.</p>
        </div>
        <Link href="/admin/pricing/new" className={adminBtnPrimaryClass}>
          Add New
        </Link>
      </div>
      <PricingTable initial={rows} />
    </div>
  );
}
