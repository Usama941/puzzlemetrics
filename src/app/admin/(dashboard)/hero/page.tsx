import { HeroForm } from "@/components/admin/hero/HeroForm";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export default async function AdminHeroPage() {
  let row = await prisma.heroContent.findFirst();
  if (!row) {
    row = await prisma.heroContent.create({ data: {} });
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-white">Hero Section</h1>
      <p className="mb-6 text-sm text-white/45">Homepage hero copy and CTAs.</p>
      <HeroForm initial={row} />
    </div>
  );
}
