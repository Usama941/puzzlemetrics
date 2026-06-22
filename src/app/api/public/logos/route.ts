import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const logos = await prisma.companyLogo.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(logos);
  } catch (error) {
    console.error("Failed to fetch logos:", error);
    return NextResponse.json([]);
  }
}
