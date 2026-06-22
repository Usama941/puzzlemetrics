import { LogosPageClient } from "@/components/admin/logos/LogosPageClient";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function AdminLogosPage() {
  const [trusted, partners] = await Promise.all([
    prisma.companyLogo.findMany({ where: { type: "trusted" }, orderBy: { order: "asc" } }),
    prisma.companyLogo.findMany({ where: { type: "partner" }, orderBy: { order: "asc" } }),
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Company Logos</h1>
        <p className="mt-1 text-sm text-white/45">Manage Trusted By and Powered By marquee logos on the homepage.</p>
      </div>
      <LogosPageClient trusted={trusted} partners={partners} />
    </div>
  );
}
