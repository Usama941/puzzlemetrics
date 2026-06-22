import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { isValidUrl, parseRouteId, sanitizeString, sanitizeStringFields } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

function parseSocialLinkUpdateBody(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== "object") return null;
  const body = sanitizeStringFields(raw as Record<string, unknown>, {
    platform: 50,
    url: 2048,
  });
  delete body.id;
  delete body.createdAt;
  delete body.updatedAt;

  if (body.platform !== undefined) {
    body.platform = sanitizeString(body.platform, 50);
  }
  if (body.url !== undefined) {
    const url = sanitizeString(body.url, 2048);
    if (!url || !isValidUrl(url)) return null;
    body.url = url;
  }

  return body;
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

  const body = parseSocialLinkUpdateBody(raw);
  if (!body) {
    return NextResponse.json({ error: "Invalid social link data" }, { status: 400 });
  }

  const row = await prisma.socialLink.update({ where: { id }, data: body });
  revalidateTag("social-links");
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

  await prisma.socialLink.delete({ where: { id } });
  revalidateTag("social-links");
  return NextResponse.json({ ok: true });
}
