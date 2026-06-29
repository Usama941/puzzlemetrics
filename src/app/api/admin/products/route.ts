import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { sanitizeStringFields } from "@/lib/validation";

function normalizeStats(input: unknown) {
  if (!Array.isArray(input)) return [];
  return input
    .filter((x): x is { value?: unknown; label?: unknown } => !!x && typeof x === "object")
    .map((x) => ({
      value: String(x.value ?? ""),
      label: String(x.label ?? ""),
    }))
    .filter((x) => x.value.trim() && x.label.trim());
}

export async function GET(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  const rows = await prisma.product.findMany({ orderBy: { order: "asc" } });
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
  const body = sanitizeStringFields(raw as Record<string, unknown>);
  if (body.stats !== undefined) {
    body.stats = normalizeStats(body.stats);
  }
  const row = await prisma.product.create({ data: body });
  revalidateTag("products");
  return NextResponse.json(row);
}
