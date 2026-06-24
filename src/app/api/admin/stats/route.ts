import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { sanitizeString } from "@/lib/validation";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  const rows = await prisma.statCard.findMany({ orderBy: { order: "asc" } });
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
  const row = await prisma.statCard.create({
    data: {
      label: sanitizeString(body.label, 200),
      value: sanitizeString(body.value, 100),
      color: sanitizeString(body.color, 20) || "#6055D9",
      icon: sanitizeString(body.icon, 50) || "chart",
      order: typeof body.order === "number" ? body.order : parseInt(String(body.order ?? 0), 10) || 0,
    },
  });
  revalidateTag("stats");
  return NextResponse.json(row);
}
