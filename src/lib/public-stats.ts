import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";

export type PublicStatCard = {
  id: string;
  label: string;
  value: string;
  color: string;
  icon: string;
  order: number;
};

export async function getPublicStats(): Promise<PublicStatCard[]> {
  const rows = await prisma.statCard.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      label: true,
      value: true,
      color: true,
      icon: true,
      order: true,
    },
  });

  return rows.map((s) => ({
    ...s,
    color: s.color || "#6055D9",
  }));
}

export async function getPublicStatsCached(): Promise<PublicStatCard[]> {
  return unstable_cache(
    async () => getPublicStats(),
    ["public-stat-cards"],
    { revalidate: 60, tags: ["stats"] },
  )();
}
