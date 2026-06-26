import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApiAccess } from "@/lib/admin-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  try {
    const { id } = await context.params;
    const project = await prisma.portfolioProject.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    console.error("Portfolio GET error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updated = await prisma.portfolioProject.update({
      where: { id },
      data: {
        slug: body.slug,
        title: body.title,
        client: body.client,
        category: body.category,
        industry: body.industry,
        location: body.location,
        year: body.year,
        tagline: body.tagline,
        description: body.description,
        challenge: body.challenge,
        solution: body.solution,
        results: body.results,
        heroMetric: body.heroMetric,
        heroMetricLabel: body.heroMetricLabel,
        metrics: body.metrics,
        tags: body.tags,
        images: body.images,
        accentColor: body.accentColor,
        metricColor: body.metricColor || "#6055D9",
        textColor: body.textColor ?? null,
        buttonColor: body.buttonColor ?? null,
        backgroundColor: body.backgroundColor ?? null,
        bgGradient: body.bgGradient,
        featured: body.featured,
        published: body.published,
        order: body.order,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Portfolio PUT error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;
  try {
    const { id } = await context.params;
    await prisma.portfolioProject.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Portfolio DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
