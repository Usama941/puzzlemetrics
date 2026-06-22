"use client";

import type { CompanyLogo } from "@prisma/client";
import { CompanyLogoImage } from "@/components/home/CompanyLogoImage";
import { useResponsiveCount } from "@/hooks/useResponsiveCount";
import { useReducedMotion } from "framer-motion";
import { useMemo, type CSSProperties } from "react";

type Props = {
  title: string;
  subtitle: string;
  logos: CompanyLogo[];
};

const TrustedLogoItem = ({ item }: { item: CompanyLogo }) => {
  const inner = <CompanyLogoImage item={item} variant="trusted" />;

  if (item.websiteUrl) {
    return (
      <a
        href={item.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="trusted-logo-link no-underline"
      >
        {inner}
      </a>
    );
  }

  return <span className="trusted-logo-link">{inner}</span>;
};

function buildMarqueeLogos(logos: CompanyLogo[], visibleCount: number): CompanyLogo[] {
  if (logos.length === 0) return [];
  const base = logos.slice(0, visibleCount);
  const padded: CompanyLogo[] = [];
  for (let i = 0; i < visibleCount; i++) {
    padded.push(base[i % base.length]);
  }
  return [...padded, ...padded];
}

export const LogoMarqueeSection = ({ title, subtitle, logos }: Props) => {
  const prefersReduced = useReducedMotion();
  const visibleCount = useResponsiveCount(2, 4, 6);

  const padded = useMemo(() => {
    if (logos.length === 0) return [];
    const base = logos.slice(0, visibleCount);
    const items: CompanyLogo[] = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(base[i % base.length]);
    }
    return items;
  }, [logos, visibleCount]);

  const looped = useMemo(() => buildMarqueeLogos(logos, visibleCount), [logos, visibleCount]);
  const slotCount = visibleCount * 2;

  if (logos.length === 0) return null;

  const staticGridClass =
    visibleCount <= 2
      ? "grid-cols-2"
      : visibleCount <= 4
        ? "grid-cols-2 sm:grid-cols-4"
        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6";

  return (
    <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)] py-10 sm:py-14 md:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-[clamp(1.375rem,3.2vw,2rem)] font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
            {title}
          </h2>
          <p className="mt-2.5 text-[clamp(13px,2.5vw,14px)] text-[var(--text-secondary)]">{subtitle}</p>
        </div>

        {prefersReduced ? (
          <div className={`grid ${staticGridClass} gap-4 sm:gap-6`}>
            {padded.map((logo, i) => (
              <div key={`${logo.id}-static-${i}`} className="flex items-center justify-center px-1">
                <TrustedLogoItem item={logo} />
              </div>
            ))}
          </div>
        ) : (
          <div className="trusted-marquee-viewport relative py-1">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent sm:w-12 md:w-20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent sm:w-12 md:w-20"
              aria-hidden
            />

            <div
              className="trusted-marquee-track"
              style={{ "--marquee-slots": slotCount } as CSSProperties}
            >
              {looped.map((logo, i) => (
                <div key={`${logo.id}-${i}`} className="trusted-marquee-slot">
                  <TrustedLogoItem item={logo} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
