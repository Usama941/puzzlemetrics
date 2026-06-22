import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { parseOptionalUrl, parseRouteId, sanitizeString, sanitizeStringFields } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

function parseLogoUpdateBody(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== "object") return null;
  const body = sanitizeStringFields(raw as Record<string, unknown>, {
    name: 100,
    logo: 2048,
    type: 50,
  });
  delete body.id;
  delete body.createdAt;
  delete body.updatedAt;

  if (body.websiteUrl !== undefined) {
    const url = parseOptionalUrl(body.websiteUrl);
    if (url === null) return null;
    body.websiteUrl = url;
  }

  if (body.name !== undefined) {
    body.name = sanitizeString(body.name, 100);
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

  const body = parseLogoUpdateBody(raw);
  if (!body) {
    return NextResponse.json({ error: "Invalid logo data" }, { status: 400 });
  }

  const row = await prisma.companyLogo.update({ where: { id }, data: body });
  revalidateTag("logos");
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

  await prisma.companyLogo.delete({ where: { id } });
  revalidateTag("logos");
  return NextResponse.json({ ok: true });
}
