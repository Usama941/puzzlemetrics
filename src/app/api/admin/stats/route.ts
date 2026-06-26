import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApiAccess } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  const stats = await prisma.statCard.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  try {
    const body = await request.json();
    const stat = await prisma.statCard.create({
      data: {
        label: body.label,
        value: body.value,
        color: body.color || "#6055D9",
        icon: body.icon || "chart",
        order: body.order ?? 0,
      },
    });
    revalidateTag("stats");
    revalidatePath("/");
    revalidatePath("/admin/stats");
    return NextResponse.json(stat);
  } catch (error) {
    console.error("Stats create error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
