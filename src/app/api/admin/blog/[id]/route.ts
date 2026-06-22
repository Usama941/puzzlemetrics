import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { parseRouteId, sanitizeStringFields } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  const { id: rawId } = await context.params;
  const id = parseRouteId(rawId);
  if (!id) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const row = await prisma.blogPost.findUnique({ where: { id } });
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
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
  const body = sanitizeStringFields(raw as Record<string, unknown>);
  delete body.id;
  const row = await prisma.blogPost.update({ where: { id }, data: body });
  revalidateTag("blog");
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
  await prisma.blogPost.delete({ where: { id } });
  revalidateTag("blog");
  return NextResponse.json({ ok: true });
}
