import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { sanitizeStringFields } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  const row = await prisma.emailSettings.findFirst();
  return NextResponse.json(row);
}

export async function PUT(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const body = sanitizeStringFields(raw as Record<string, unknown>);
  delete body.id;
  const existing = await prisma.emailSettings.findFirst();
  if (existing) {
    const row = await prisma.emailSettings.update({
      where: { id: existing.id },
      data: body,
    });
    return NextResponse.json(row);
  }
  const row = await prisma.emailSettings.create({ data: body });
  return NextResponse.json(row);
}
