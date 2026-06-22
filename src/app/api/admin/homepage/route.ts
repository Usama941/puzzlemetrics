import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { sanitizeStringFields } from "@/lib/validation";
import { defaultHomepagePayload } from "@/lib/homepage-defaults";
import type { HomepagePayload } from "@/types/homepage";

const putBodySchema = z.object({
  data: z.unknown(),
});

const ensureHeroRow = async () => {
  const existing = await prisma.heroContent.findFirst();
  if (existing) {
    return existing;
  }
  return prisma.heroContent.create({ data: {} });
};

function payloadFromHeroRow(row: {
  headline1: string;
  headline2: string;
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  badge: string;
}): HomepagePayload {
  const defaults = defaultHomepagePayload();
  const headline = [row.headline1, row.headline2].filter(Boolean).join("\n") || defaults.hero.headline;
  return {
    ...defaults,
    hero: {
      ...defaults.hero,
      badge: row.badge || defaults.hero.badge,
      headline,
      subtext: row.subtext || defaults.hero.subtext,
      primaryCta: {
        label: row.ctaPrimary || defaults.hero.primaryCta.label,
        href: defaults.hero.primaryCta.href,
      },
      secondaryCta: {
        label: row.ctaSecondary || defaults.hero.secondaryCta.label,
        href: defaults.hero.secondaryCta.href,
      },
    },
  };
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;

  try {
    const row = await ensureHeroRow();
    const data = payloadFromHeroRow(row);
    return NextResponse.json({ data, updatedAt: row.updatedAt });
  } catch {
    return NextResponse.json({ error: "Could not load homepage content" }, { status: 500 });
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

  const { data } = parsed.data;
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return NextResponse.json(
      { error: "Field `data` must be a JSON object" },
      { status: 400 },
    );
  }

  const payload = data as Partial<HomepagePayload>;
  const hero = payload.hero;
  if (!hero) {
    return NextResponse.json({ error: "Field `data.hero` is required" }, { status: 400 });
  }

  const lines = (hero.headline ?? "").split(/\n/).map((s) => s.trim());
  const headline1 = lines[0] ?? "";
  const headline2 = lines.slice(1).join(" ") ?? "";

  try {
    const existing = await ensureHeroRow();
    const row = await prisma.heroContent.update({
      where: { id: existing.id },
      data: {
        headline1: headline1 || existing.headline1,
        headline2: headline2 || existing.headline2,
        subtext: hero.subtext ?? existing.subtext,
        ctaPrimary: hero.primaryCta?.label ?? existing.ctaPrimary,
        ctaSecondary: hero.secondaryCta?.label ?? existing.ctaSecondary,
        badge: hero.badge ?? existing.badge,
      },
    });
    const merged = payloadFromHeroRow(row);
    revalidateTag("hero");
    return NextResponse.json({ data: merged, updatedAt: row.updatedAt });
  } catch {
    return NextResponse.json({ error: "Could not save homepage content" }, { status: 500 });
  }
}
