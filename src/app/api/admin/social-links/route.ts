import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { isValidUrl, sanitizeString, sanitizeStringFields } from "@/lib/validation";

export const dynamic = 'force-dynamic';

function parseSocialLinkBody(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== "object") return null;
  const body = sanitizeStringFields(raw as Record<string, unknown>, {
    platform: 50,
    url: 2048,
  });

  const platform = sanitizeString(body.platform, 50);
  const url = sanitizeString(body.url, 2048);
  if (!platform || !url || !isValidUrl(url)) return null;

  body.platform = platform;
  body.url = url;
  return body;
}

export async function GET(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  const rows = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
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

  const data = parseSocialLinkBody(raw);
  if (!data) {
    return NextResponse.json({ error: "Invalid social link data" }, { status: 400 });
  }

  const row = await prisma.socialLink.create({ data: data as Parameters<typeof prisma.socialLink.create>[0]["data"] });
  revalidateTag("social-links");
  return NextResponse.json(row);
}
