/**
 * Manual-only product seed — NOT wired into prisma/seed.ts or deploy hooks.
 * Run: npm run db:seed:products
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    id: "prod-city-rosters",
    order: 0,
    published: true,
    badge: "LIVE",
    label: "PRODUCT 01",
    name: "City Rosters",
    tagline: "The AI-powered sports management platform",
    description:
      "City Rosters gives sports clubs, academies, and coaches a single platform to manage rosters, schedules, player payments, and performance analytics. AI powers smart scheduling, player matching, and financial reporting.",
    features: [
      "Smart roster & schedule management",
      "AI-powered player performance analytics",
      "Integrated payment processing",
      "Multi-club & multi-market support",
    ],
    stats: [
      { value: "1,200+", label: "Active Users" },
      { value: "5", label: "Global Markets" },
      { value: "3+", label: "Years Running" },
    ],
    primaryCtaText: "Explore City Rosters →",
    primaryCtaUrl: null,
    secondaryCtaText: null,
    secondaryCtaUrl: null,
    theme: "violet",
    mockupSide: "right",
    mockup: {
      urlBar: "app.cityrosters.com",
      title: "City Rosters Dashboard",
      statusLabel: "Live",
      accentColor: "#6055D9",
      badgeColor: "#22C55E",
      miniStats: [
        { value: "284", label: "Players" },
        { value: "12", label: "Clubs" },
        { value: "98%", label: "Uptime" },
      ],
      rowsSection: {
        title: "UPCOMING MATCHES",
        rows: [
          { left: "Lions FC vs Eagles", right: "Today 3PM" },
          { left: "Tigers vs Wolves", right: "Fri 5PM" },
          { left: "Hawks vs Bears", right: "Sat 11AM" },
        ],
      },
      bottomStats: [
        { value: "£12,450", label: "Revenue MTD" },
        { value: "94%", label: "Payment Rate" },
      ],
    },
  },
  {
    id: "prod-lead-gen",
    order: 1,
    published: true,
    badge: "LIVE",
    label: "PRODUCT 02",
    name: "Lead Gen Platform",
    tagline: "AI that finds, qualifies, and nurtures leads automatically",
    description:
      "Our proprietary lead generation platform uses AI scoring models to identify high-intent prospects, qualify them in real-time, and trigger automated nurture sequences — all without manual intervention.",
    features: [
      "AI-powered lead scoring (40+ signals)",
      "Real-time qualification & enrichment",
      "Automated multi-channel nurture sequences",
      "CRM integration & live reporting",
    ],
    stats: [
      { value: "10,000+", label: "Monthly Leads" },
      { value: "340%", label: "Avg ROAS Lift" },
      { value: "Zero", label: "Manual Work" },
    ],
    primaryCtaText: "Explore Lead Gen →",
    primaryCtaUrl: null,
    secondaryCtaText: null,
    secondaryCtaUrl: null,
    theme: null,
    mockupSide: "left",
    mockup: {
      urlBar: "app.leadgen.puzzlemetrics.com",
      title: "AI Lead Engine",
      statusLabel: "Live · Scoring active",
      accentColor: "#0EA5E9",
      badgeColor: "#0EA5E9",
      pipelineScore: {
        label: "Today's Pipeline Score",
        value: "94",
        suffix: "/100",
        progressPercent: 94,
      },
      table: {
        headers: ["Company", "Score", "Status"],
        rows: [
          {
            cells: ["Acme Corp", "97", "Hot Lead"],
            scoreColor: "#22C55E",
            statusPillBg: "#DCFCE7",
            statusPillText: "#166534",
          },
          {
            cells: ["TechFlow Ltd", "84", "Qualified"],
            scoreColor: "#CA8A04",
            statusPillBg: "#FEF9C3",
            statusPillText: "#854D0E",
          },
          {
            cells: ["DataSync Inc", "71", "Nurturing"],
            scoreColor: "#0EA5E9",
            statusPillBg: "#E0F2FE",
            statusPillText: "#0369A1",
          },
        ],
      },
      footerStats: [
        { value: "1,247", label: "Leads Today", valueColor: "#0EA5E9" },
        { value: "340%", label: "Avg ROAS", valueColor: "#22C55E" },
        { value: "2.4s", label: "Response", valueColor: "#6055D9" },
      ],
    },
  },
];

async function main() {
  console.log("🌱 Seeding products (manual)...");
  for (const product of products) {
    const { id, ...rest } = product;
    await prisma.product.upsert({
      where: { id },
      update: { ...rest },
      create: { id, ...rest },
    });
  }
  console.log(`✅ ${products.length} products seeded`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
