import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApiAccess } from "@/lib/admin-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updated = await prisma.statCard.update({
      where: { id },
      data: {
        label: body.label,
        value: body.value,
        color: body.color,
        icon: body.icon || "chart",
        order: body.order ?? 0,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Stats update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  try {
    const { id } = await context.params;
    await prisma.statCard.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Stats delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
