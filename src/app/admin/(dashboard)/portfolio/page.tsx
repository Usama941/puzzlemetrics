import Link from "next/link";
import { PortfolioTable } from "@/components/admin/portfolio/PortfolioTable";
import { adminBtnPrimaryClass } from "@/components/admin/admin-ui";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export default async function AdminPortfolioPage() {
  const rows = await prisma.portfolioProject.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          <p className="mt-1 text-sm text-white/45">Case highlights and project pages.</p>
        </div>
        <Link href="/admin/portfolio/new" className={adminBtnPrimaryClass}>
          Add New
        </Link>
      </div>
      <PortfolioTable initial={rows} />
    </div>
  );
}
