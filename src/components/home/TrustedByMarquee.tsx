"use client";

import type { CompanyLogo } from "@prisma/client";
import { useEffect, useState } from "react";
import { LogoMarqueeSection } from "@/components/home/LogoMarqueeSection";

const FALLBACK_TRUSTED: CompanyLogo[] = [
  "Client Co",
  "RetailBrand",
  "FinTech Ltd",
  "MedHealth",
  "LegalPro",
  "EduTech",
  "PropCo",
  "AutoBrand",
].map((name, i) => ({
  id: `fb-trusted-${i}`,
  name,
  logo: "",
  websiteUrl: "",
  type: "trusted",
  order: i,
  active: true,
}));

export const TrustedByMarquee = () => {
  const [logos, setLogos] = useState<CompanyLogo[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/public/logos")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: CompanyLogo[]) => {
        const all = Array.isArray(data) ? data : [];
        const trusted = all.filter((l) => l.type === "trusted");
        console.log("logo data:", trusted);
        setLogos(trusted.length > 0 ? trusted : FALLBACK_TRUSTED);
      })
      .catch(() => setLogos(FALLBACK_TRUSTED))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded) return null;

  return (
    <LogoMarqueeSection
      title="Trusted By Leading Companies"
      subtitle="Brands that trust PuzzleMetrics to power their AI"
      logos={logos}
    />
  );
};

export default TrustedByMarquee;
