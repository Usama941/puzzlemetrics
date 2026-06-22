"use client";

import type { CompanyLogo } from "@prisma/client";
import { useEffect, useState } from "react";
import { TechnologyPartnersSection } from "@/components/home/TechnologyPartnersSection";
import { hasCompanyLogo } from "@/lib/company-logo-url";

const FALLBACK_PARTNERS: CompanyLogo[] = [
  {
    id: "fb-partner-anthropic",
    name: "Anthropic",
    logo: "https://www.anthropic.com/images/icons/apple-touch-icon.png",
    websiteUrl: "",
    type: "partner",
    order: 0,
    active: true,
  },
  {
    id: "fb-partner-make",
    name: "Make",
    logo:
      "https://images.g2crowd.com/uploads/product/image/social_proof_image/social_proof_image/b6f6b6e6b6f6b6e6b6f6b6e6b6f6b6e6/make-formerly-integromat.png",
    websiteUrl: "",
    type: "partner",
    order: 1,
    active: true,
  },
  {
    id: "fb-partner-n8n",
    name: "n8n",
    logo: "https://n8n.io/favicon.ico",
    websiteUrl: "",
    type: "partner",
    order: 2,
    active: true,
  },
];

function mergePartnerLogos(db: CompanyLogo[], fallbacks: CompanyLogo[]): CompanyLogo[] {
  const fallbackByName = new Map(fallbacks.map((f) => [f.name.toLowerCase(), f]));
  return db.map((partner) => {
    if (hasCompanyLogo(partner.logo)) return partner;
    const fb = fallbackByName.get(partner.name.toLowerCase());
    return fb ? { ...partner, logo: fb.logo } : partner;
  });
}

export const TechnologyPartners = () => {
  const [partners, setPartners] = useState<CompanyLogo[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/public/logos")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: CompanyLogo[]) => {
        const all = Array.isArray(data) ? data : [];
        const filtered = all.filter((l) => l.type === "partner");
        console.log("logo data:", filtered);
        const base = filtered.length > 0 ? filtered : FALLBACK_PARTNERS;
        setPartners(mergePartnerLogos(base, FALLBACK_PARTNERS));
      })
      .catch(() => setPartners(FALLBACK_PARTNERS))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded) return null;

  return <TechnologyPartnersSection partners={partners} />;
};

export default TechnologyPartners;
