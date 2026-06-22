import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { getSiteSettings, SITE_SETTINGS_ID } from "@/lib/site-settings";
import { internalServerError } from "@/lib/api-error";
import { sanitizeString } from "@/lib/validation";

export const dynamic = 'force-dynamic';
const putBodySchema = z.object({
  companyNumber: z.string().max(100),
});

export async function GET(request: NextRequest): Promise<NextResponse> {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;

  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ companyNumber: settings.companyNumber });
  } catch (err) {
    return internalServerError("admin settings GET", err);
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = putBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: SITE_SETTINGS_ID },
      update: { companyNumber: sanitizeString(parsed.data.companyNumber, 100) },
      create: { id: SITE_SETTINGS_ID, companyNumber: sanitizeString(parsed.data.companyNumber, 100) },
    });
    return NextResponse.json({ companyNumber: settings.companyNumber });
  } catch (err) {
    return internalServerError("admin settings PUT", err);
  }
}
