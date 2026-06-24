import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { parseRouteId, sanitizeString } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

const DEFAULT_STAT_COLOR = "#6055D9";

function parseStatPayload(raw: Record<string, unknown>) {
  const color = sanitizeString(raw.color, 32);
  return {
    label: sanitizeString(raw.label, 200),
    value: sanitizeString(raw.value, 100),
    color: color || DEFAULT_STAT_COLOR,
    icon: sanitizeString(raw.icon, 50) || "chart",
    order: typeof raw.order === "number" ? raw.order : parseInt(String(raw.order ?? 0), 10) || 0,
  };
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  const { id: rawId } = await context.params;
  const id = parseRouteId(rawId);
  if (!id) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
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
  const data = parseStatPayload(body);

  const row = await prisma.statCard.update({
    where: { id },
    data: {
      label: data.label,
      value: data.value,
      color: data.color,
      icon: data.icon,
      order: data.order,
    },
  });

  revalidateTag("stats");
  revalidatePath("/");
  revalidatePath("/admin/stats");

  return NextResponse.json(row);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  const { id: rawId } = await context.params;
  const id = parseRouteId(rawId);
  if (!id) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  await prisma.statCard.delete({ where: { id } });
  revalidateTag("stats");
  revalidatePath("/");
  revalidatePath("/admin/stats");
  return NextResponse.json({ ok: true });
}
