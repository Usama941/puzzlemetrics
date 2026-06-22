import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { parseOptionalUrl, sanitizeString, sanitizeStringFields } from "@/lib/validation";

export const dynamic = 'force-dynamic';

function parseLogoCreateBody(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== "object") return null;
  const body = sanitizeStringFields(raw as Record<string, unknown>, {
    name: 100,
    logo: 2048,
    type: 50,
  });

  const name = sanitizeString(body.name, 100);
  if (!name) return null;

  const websiteUrlRaw = body.websiteUrl;
  if (websiteUrlRaw !== undefined && websiteUrlRaw !== null && websiteUrlRaw !== "") {
    const url = parseOptionalUrl(websiteUrlRaw);
    if (url === null) return null;
    body.websiteUrl = url;
  }

  body.name = name;
  return body;
}

export async function GET(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  const { searchParams } = new URL(request.url);
  const type = sanitizeString(searchParams.get("type"), 50);
  const rows = await prisma.companyLogo.findMany({
    where: type ? { type } : undefined,
    orderBy: { order: "asc" },
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

  const data = parseLogoCreateBody(raw);
  if (!data) {
    return NextResponse.json({ error: "Invalid logo data" }, { status: 400 });
  }

  const row = await prisma.companyLogo.create({ data: data as Parameters<typeof prisma.companyLogo.create>[0]["data"] });
  revalidateTag("logos");
  return NextResponse.json(row);
}
