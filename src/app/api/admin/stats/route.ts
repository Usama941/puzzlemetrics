import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { sanitizeString } from "@/lib/validation";

export const dynamic = 'force-dynamic';

const DEFAULT_STAT_COLOR = "#6055D9";

export async function GET(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  const rows = await prisma.statCard.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      label: true,
      value: true,
      color: true,
      icon: true,
      order: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const body = raw as Record<string, unknown>;
  const color = sanitizeString(body.color, 32);
  const row = await prisma.statCard.create({
    data: {
      label: sanitizeString(body.label, 200),
      value: sanitizeString(body.value, 100),
      color: color || DEFAULT_STAT_COLOR,
      icon: sanitizeString(body.icon, 50) || "chart",
      order: typeof body.order === "number" ? body.order : parseInt(String(body.order ?? 0), 10) || 0,
    },
  });
  revalidateTag("stats");
  revalidatePath("/");
  revalidatePath("/admin/stats");
  return NextResponse.json(row);
}
