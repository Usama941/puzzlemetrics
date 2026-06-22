export type NavLink = {
  label: string;
  href: string;
};

export type CtaLink = {
  label: string;
  href: string;
};

export type HeroStat = {
  value: string;
  label: string;
};

export type HeroContent = {
  badge: string;
  headline: string;
  subtext: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  stats: HeroStat[];
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type ProcessContent = {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
};

export type PlatformCard = {
  badge: string;
  title: string;
  description: string;
  href: string;
};

export type PlatformsContent = {
  title: string;
  subtitle: string;
  cards: PlatformCard[];
};

export type SocialStat = {
  value: number;
  label: string;
  suffix?: string;
};

export type SocialProofContent = {
  title: string;
  subtitle: string;
  stats: SocialStat[];
};

export type CtaBandContent = {
  headline: string;
  primaryButton: CtaLink;
  secondaryButton: CtaLink;
};

export type NewsletterContent = {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonLabel: string;
};

export type FooterColumn = {
  heading: string;
  links: NavLink[];
};

export type SocialNetwork = "linkedin" | "twitter" | "github" | "youtube";

export type FooterSocialLink = {
  network: SocialNetwork;
  href: string;
};

export type FooterContent = {
  tagline: string;
  columns: FooterColumn[];
  social: FooterSocialLink[];
  legalLine: string;
};

export type ServicesIntro = {
  title: string;
  subtitle: string;
};

export type HomepagePayload = {
  navigation: NavLink[];
  hero: HeroContent;
  servicesIntro: ServicesIntro;
  process: ProcessContent;
  platforms: PlatformsContent;
  socialProof: SocialProofContent;
  ctaBand: CtaBandContent;
  newsletter: NewsletterContent;
  footer: FooterContent;
};

export type TickerItemDto = {
  id: string;
  label: string;
};

export type ServiceItemDto = {
  id: string;
  title: string;
  description: string;
  sortOrder: number;
};
