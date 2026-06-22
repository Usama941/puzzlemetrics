import Link from "next/link";
import { TeamTable } from "@/components/admin/team/TeamTable";
import { adminBtnPrimaryClass } from "@/components/admin/admin-ui";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export default async function AdminTeamPage() {
  const rows = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Members</h1>
          <p className="mt-1 text-sm text-white/45">Manage people shown on the team page.</p>
        </div>
        <Link href="/admin/team/new" className={adminBtnPrimaryClass}>
          Add New
        </Link>
      </div>
      <TeamTable initial={rows} />
    </div>
  );
}
