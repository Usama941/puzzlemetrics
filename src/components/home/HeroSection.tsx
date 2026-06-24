import { getHeroContentRow, getStatCards } from "@/lib/db-cache";
import { HeroSectionClient, type HeroContentProps } from "./HeroSectionClient";

const defaultHero: HeroContentProps = {
  headline1: "AI you can build,",
  headline2: "deploy, and grow",
  subtext:
    "We design, build and deploy AI systems that create real business value.",
  ctaPrimary: "Get Started",
  ctaSecondary: "Book a demo",
  badge: "1,200+ businesses trust PuzzleMetrics",
};

export async function HeroSection() {
  const [row, statRows] = await Promise.all([getHeroContentRow(), getStatCards()]);
  const hero: HeroContentProps = row
    ? {
        headline1: row.headline1,
        headline2: row.headline2,
        subtext: row.subtext,
        ctaPrimary: row.ctaPrimary,
        ctaSecondary: row.ctaSecondary,
        badge: row.badge,
      }
    : defaultHero;

  const stats = statRows.map((s) => ({
    label: s.label,
    value: s.value,
    color: s.color || "#6055D9",
  }));

  return <HeroSectionClient hero={hero} stats={stats} />;
}

export default HeroSection;
