"use client";

import type { CompanyLogo } from "@prisma/client";
import { CompanyLogoImage } from "@/components/home/CompanyLogoImage";

type Props = {
  partners: CompanyLogo[];
};

const PartnerLogoItem = ({ item }: { item: CompanyLogo }) => {
  const hasLink = Boolean(item.websiteUrl?.trim());

  const inner = (
    <div className={`partner-logo-item${hasLink ? " partner-logo-item--linked" : ""}`}>
      <CompanyLogoImage item={item} variant="partner" />
      <span className="partner-logo-title">{item.name}</span>
    </div>
  );

  if (hasLink) {
    return (
      <a
        href={item.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline"
      >
        {inner}
      </a>
    );
  }

  return inner;
};

export const TechnologyPartnersSection = ({ partners }: Props) => {
  if (partners.length === 0) return null;

  return (
    <section className="border-y border-[var(--border-color)] bg-[var(--bg-primary)] py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6">
        <h2 className="text-[clamp(1.375rem,3.2vw,2rem)] font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
          Our Technology Partners
        </h2>
        <p className="mt-2.5 text-[clamp(13px,2.5vw,14px)] text-[var(--text-secondary)]">The platforms and tools we build with</p>

        <div className="partner-logo-row">
          {partners.map((partner) => (
            <PartnerLogoItem key={partner.id} item={partner} />
          ))}
        </div>
      </div>
    </section>
  );
};
