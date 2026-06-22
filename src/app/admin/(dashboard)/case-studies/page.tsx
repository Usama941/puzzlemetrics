import Link from "next/link";
import { CaseStudyTable } from "@/components/admin/case-studies/CaseStudyTable";
import { adminBtnPrimaryClass } from "@/components/admin/admin-ui";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export default async function AdminCaseStudiesPage() {
  const rows = await prisma.caseStudy.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Case Studies</h1>
          <p className="mt-1 text-sm text-white/45">Long-form stories and metrics.</p>
        </div>
        <Link href="/admin/case-studies/new" className={adminBtnPrimaryClass}>
          Add New
        </Link>
      </div>
      <CaseStudyTable initial={rows} />
    </div>
  );
}
