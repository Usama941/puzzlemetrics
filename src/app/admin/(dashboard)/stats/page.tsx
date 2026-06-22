import { StatsTable } from "@/components/admin/stats/StatsTable";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function AdminStatsPage() {
  const rows = await prisma.statCard.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Homepage Stats</h1>
        <p className="mt-1 text-sm text-white/45">Edit the analytics numbers shown on the homepage.</p>
      </div>
      <StatsTable initial={rows} />
    </div>
  );
}
