import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { sanitizeStringFields } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  const rows = await prisma.portfolioProject.findMany({ orderBy: { order: "asc" } });
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
  if (!body.slug || (typeof body.slug === "string" && body.slug.includes(" "))) {
    const title = typeof body.title === "string" ? body.title : "";
    body.slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  const row = await prisma.portfolioProject.create({ data: body });
  revalidateTag("portfolio");
  return NextResponse.json(row);
}
