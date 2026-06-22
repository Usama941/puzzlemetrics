import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  const links = await prisma.socialLink.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    select: { id: true, platform: true, url: true, order: true },
  });
  return NextResponse.json(links);
}
