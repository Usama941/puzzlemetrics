import { getHeroContentRow } from "@/lib/db-cache";
import { defaultHomepagePayload } from "@/lib/homepage-defaults";
import { toRelativeSitePath } from "@/lib/site-path";
import type { HomepagePayload } from "@/types/homepage";

function normalizeHomepageLinks(payload: HomepagePayload): HomepagePayload {
  return {
    ...payload,
    navigation: payload.navigation.map((link) => ({
      ...link,
      href: toRelativeSitePath(link.href),
    })),
    hero: {
      ...payload.hero,
      primaryCta: {
        ...payload.hero.primaryCta,
        href: toRelativeSitePath(payload.hero.primaryCta.href),
      },
      secondaryCta: {
        ...payload.hero.secondaryCta,
        href: toRelativeSitePath(payload.hero.secondaryCta.href),
      },
    },
    platforms: {
      ...payload.platforms,
      cards: payload.platforms.cards.map((card) => ({
        ...card,
        href: toRelativeSitePath(card.href),
      })),
    },
    ctaBand: {
      ...payload.ctaBand,
      primaryButton: {
        ...payload.ctaBand.primaryButton,
        href: toRelativeSitePath(payload.ctaBand.primaryButton.href),
      },
      secondaryButton: {
        ...payload.ctaBand.secondaryButton,
        href: toRelativeSitePath(payload.ctaBand.secondaryButton.href),
      },
    },
    footer: {
      ...payload.footer,
      columns: payload.footer.columns.map((column) => ({
        ...column,
        links: column.links.map((link) => ({
          ...link,
          href: toRelativeSitePath(link.href),
        })),
      })),
      social: payload.footer.social.map((item) => ({
        ...item,
        href: toRelativeSitePath(item.href),
      })),
    },
  };
}

export const getHomepagePayloadFromSource = async (): Promise<HomepagePayload> => {
  const defaults = defaultHomepagePayload();
  try {
    const row = await getHeroContentRow();
    if (!row) {
      return normalizeHomepageLinks(defaults);
    }
    const headline =
      [row.headline1, row.headline2].filter(Boolean).join("\n") || defaults.hero.headline;
    const merged: HomepagePayload = {
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
    return normalizeHomepageLinks(merged);
  } catch {
    return normalizeHomepageLinks(defaults);
  }
};
