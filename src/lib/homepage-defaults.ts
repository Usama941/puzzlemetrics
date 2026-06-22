import type { HomepagePayload } from "@/types/homepage";

export const defaultHomepagePayload = (): HomepagePayload => ({
  navigation: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Platforms", href: "#platforms" },
    { label: "Insights", href: "#social" },
    { label: "Contact", href: "#newsletter" },
  ],
  servicesIntro: {
    title: "What we deliver",
    subtitle:
      "Six focus areas — composable, measurable, and built to run in production.",
  },
  hero: {
    badge: "UK AI services & products",
    headline: "Intelligent systems that move your business forward",
    subtext:
      "From RAG and AI agents to paid media intelligence — PuzzleMetrics designs, builds, and operates AI that fits your workflows.",
    primaryCta: { label: "Book a strategy call", href: "/contact" },
    secondaryCta: { label: "View services", href: "#services" },
    stats: [
      { value: "1200+", label: "City Rosters users" },
      { value: "24/7", label: "Automation coverage" },
      { value: "UK", label: "Delivery & support" },
    ],
  },
  process: {
    title: "How we work with you",
    subtitle: "A clear path from discovery to production AI.",
    steps: [
      {
        title: "Discover & align",
        description:
          "We map goals, data sources, and constraints so scope stays realistic and measurable.",
      },
      {
        title: "Design & prototype",
        description:
          "Rapid experiments and UX validation before we commit engineering to production paths.",
      },
      {
        title: "Ship & optimise",
        description:
          "Deploy with observability, iterate on prompts and models, and train your team to operate.",
      },
    ],
  },
  platforms: {
    title: "Live products",
    subtitle: "Platforms we build and run with customers every day.",
    cards: [
      {
        badge: "Sports management",
        title: "City Rosters",
        description:
          "Scheduling, rostering, and communications for clubs — trusted by 1200+ users.",
        href: "https://cityrosters.com",
      },
      {
        badge: "Lead generation",
        title: "Lead Gen Platform",
        description:
          "AI-assisted prospecting and enrichment pipelines that feed your CRM with intent.",
        href: "/contact",
      },
    ],
  },
  socialProof: {
    title: "Impact in numbers",
    subtitle: "Outcomes our teams and products drive for operators and marketers.",
    stats: [
      { value: 12, label: "AI programmes", suffix: "+" },
      { value: 48, label: "Integrations", suffix: "" },
      { value: 7, label: "Countries served", suffix: "" },
      { value: 99, label: "Uptime focus", suffix: "%" },
    ],
  },
  ctaBand: {
    headline: "Ready to explore what AI can do for your roadmap?",
    primaryButton: { label: "Talk to us", href: "/contact" },
    secondaryButton: { label: "See platforms", href: "#platforms" },
  },
  newsletter: {
    title: "Stay in the loop",
    subtitle: "Product updates, playbooks, and launch notes — no spam.",
    placeholder: "you@company.com",
    buttonLabel: "Subscribe",
  },
  footer: {
    tagline: "PuzzleMetrics — AI services & products from the UK.",
    columns: [
      {
        heading: "Services",
        links: [
          { label: "AI agents & RAG", href: "#services" },
          { label: "Ads intelligence", href: "#services" },
          { label: "Analytics", href: "#services" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Careers", href: "/careers" },
          { label: "Blog", href: "/blog" },
        ],
      },
      {
        heading: "Platforms",
        links: [
          { label: "City Rosters", href: "https://cityrosters.com" },
          { label: "Lead Gen Platform", href: "/contact" },
        ],
      },
      {
        heading: "Legal",
        links: [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ],
      },
    ],
    social: [
      { network: "linkedin", href: "https://linkedin.com/company/puzzlemetrics" },
      { network: "twitter", href: "https://twitter.com/puzzlemetrics" },
      { network: "github", href: "https://github.com/puzzlemetrics" },
      { network: "youtube", href: "https://youtube.com/@puzzlemetrics" },
    ],
    legalLine: `© ${new Date().getFullYear()} PuzzleMetrics Ltd. All rights reserved.`,
  },
});

export const defaultTickerLabels = (): string[] => [
  "AI agents",
  "RAG systems",
  "Meta & Google Ads",
  "Campaign automation",
  "Data analytics",
  "AI consulting",
  "City Rosters",
  "Lead Gen Platform",
];

export const defaultServiceRows = (): { title: string; description: string; sortOrder: number }[] => [
  {
    sortOrder: 1,
    title: "AI agents & automation",
    description: "Task-specific agents wired to your tools with guardrails and observability.",
  },
  {
    sortOrder: 2,
    title: "Retrieval & knowledge systems",
    description: "RAG pipelines that stay accurate as your documents and policies change.",
  },
  {
    sortOrder: 3,
    title: "Paid media intelligence",
    description: "Creative and performance signals unified for Meta & Google campaigns.",
  },
  {
    sortOrder: 4,
    title: "Data analytics & reporting",
    description: "Dashboards and narratives that leadership can trust and act on.",
  },
  {
    sortOrder: 5,
    title: "Integration & APIs",
    description: "Connect CRMs, warehouses, and ad platforms without brittle one-offs.",
  },
  {
    sortOrder: 6,
    title: "Advisory & enablement",
    description: "Workshops and playbooks so your team can own the roadmap after launch.",
  },
];
