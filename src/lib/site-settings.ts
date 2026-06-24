import type { SiteSettings } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const SITE_SETTINGS_ID = "default";

export async function getSiteSettings(): Promise<SiteSettings> {
  const canonical = await prisma.siteSettings.findUnique({
    where: { id: SITE_SETTINGS_ID },
  });

  if (canonical?.companyNumber.trim()) {
    return canonical;
  }

  const legacyWithNumber = await prisma.siteSettings.findFirst({
    where: {
      id: { not: SITE_SETTINGS_ID },
      companyNumber: { not: "" },
    },
    orderBy: { updatedAt: "desc" },
  });

  if (legacyWithNumber?.companyNumber.trim()) {
    return prisma.siteSettings.upsert({
      where: { id: SITE_SETTINGS_ID },
      update: { companyNumber: legacyWithNumber.companyNumber.trim() },
      create: {
        id: SITE_SETTINGS_ID,
        companyNumber: legacyWithNumber.companyNumber.trim(),
        phone: "",
        email: "",
      },
    });
  }

  if (canonical) {
    return canonical;
  }

  return prisma.siteSettings.upsert({
    where: { id: SITE_SETTINGS_ID },
    update: {},
    create: { id: SITE_SETTINGS_ID, companyNumber: "", phone: "", email: "" },
  });
}
