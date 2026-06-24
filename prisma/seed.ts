import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── 1. ADMIN USER ──────────────────────────────────
  const hashedPassword = await bcrypt.hash("PuzzleMetrics2024!", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@puzzlemetrics.com" },
    update: {},
    create: {
      email: "admin@puzzlemetrics.com",
      password: hashedPassword,
      name: "PuzzleMetrics Admin",
      role: "admin",
    },
  });
  console.log("✅ Admin user created");

  // ── 2. HERO CONTENT ───────────────────────────────
  await prisma.heroContent.upsert({
    where: { id: "hero-main" },
    update: {},
    create: {
      id: "hero-main",
      headline1: "AI you can build,",
      headline2: "deploy, and grow",
      subtext:
        "We design, build and deploy AI systems — agents, RAG, ads intelligence, and full-stack products — that create measurable business value.",
      ctaPrimary: "Get Started",
      ctaSecondary: "Book a demo",
      badge: "1,200+ businesses trust PuzzleMetrics",
    },
  });
  console.log("✅ Hero content seeded");

  // ── 3. TEAM MEMBERS ───────────────────────────────
  const teamData = [
    {
      id: "tm-alex",
      name: "Alex Khan",
      role: "Head of AI & Architecture",
      bio: "Designs and builds core LLM systems, RAG pipelines, and AI agent frameworks. 7+ years in ML engineering across fintech and SaaS.",
      gradient: "linear-gradient(135deg, #6055D9, #4038B0)",
      initials: "AK",
      skills: ["LLMs", "RAG", "Python", "Architecture"],
      photo: "/team1.jpeg",
      avatarBg: "6055D9",
      order: 0,
    },
    {
      id: "tm-sarah",
      name: "Sarah Mitchell",
      role: "Full-Stack Engineer",
      bio: "Leads frontend and API development across all PuzzleMetrics platforms. Next.js expert with a sharp eye for product design.",
      gradient: "linear-gradient(135deg, #0EA5E9, #0284C7)",
      initials: "SM",
      skills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
      photo: "/team2.jpeg",
      avatarBg: "0EA5E9",
      order: 1,
    },
    {
      id: "tm-omar",
      name: "Omar Siddiqui",
      role: "Ads Intelligence Lead",
      bio: "Owns our Meta and Google Ads AI systems. Former performance marketing analyst who now automates what used to take 15 hours a week.",
      gradient: "linear-gradient(135deg, #10B981, #059669)",
      initials: "OS",
      skills: ["Meta API", "Google Ads", "ML Bidding", "Python"],
      photo: "/team3.jpeg",
      avatarBg: "10B981",
      order: 2,
    },
    {
      id: "tm-priya",
      name: "Priya Sharma",
      role: "Data Engineer",
      bio: "Builds ETL pipelines, real-time analytics dashboards, and predictive models. Makes messy data clean and useful.",
      gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
      initials: "PS",
      skills: ["BigQuery", "dbt", "SQL", "Airflow"],
      photo: "/team1.jpeg",
      avatarBg: "F59E0B",
      order: 3,
    },
    {
      id: "tm-james",
      name: "James Rowland",
      role: "AI Strategy Consultant",
      bio: "Guides enterprise clients on AI adoption roadmaps, vendor evaluation, and architecture decisions.",
      gradient: "linear-gradient(135deg, #EF4444, #DC2626)",
      initials: "JR",
      skills: ["Strategy", "Architecture", "Enterprise", "Roadmaps"],
      photo: "/team2.jpeg",
      avatarBg: "EF4444",
      order: 4,
    },
    {
      id: "tm-fatima",
      name: "Fatima Al-Zahrani",
      role: "Product Manager",
      bio: "Manages product roadmaps across City Rosters and the Lead Gen Platform. Deeply user-obsessed and relentlessly focused on outcomes.",
      gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
      initials: "FA",
      skills: ["Product", "Roadmaps", "User Research", "Analytics"],
      photo: "/team3.jpeg",
      avatarBg: "8B5CF6",
      order: 5,
    },
    {
      id: "tm-liu",
      name: "Liu Wei",
      role: "RAG Systems Engineer",
      bio: "Specialises in vector databases, embeddings, and knowledge retrieval systems. Builds RAG pipelines that are fast, accurate, and production-ready.",
      gradient: "linear-gradient(135deg, #EC4899, #DB2777)",
      initials: "LW",
      skills: ["Pinecone", "Embeddings", "LangChain", "RAG"],
      photo: "/team1.jpeg",
      avatarBg: "EC4899",
      order: 6,
    },
    {
      id: "tm-david",
      name: "David Okonkwo",
      role: "DevOps & Infrastructure",
      bio: "Manages deployment pipelines, cloud infrastructure, and system monitoring. Keeps everything running at 99.9% uptime.",
      gradient: "linear-gradient(135deg, #14B8A6, #0D9488)",
      initials: "DO",
      skills: ["AWS", "Docker", "CI/CD", "Monitoring"],
      photo: "/team2.jpeg",
      avatarBg: "14B8A6",
      order: 7,
    },
  ];
  for (const m of teamData) {
    const { id, ...rest } = m;
    await prisma.teamMember.upsert({
      where: { id },
      update: rest,
      create: m,
    });
  }
  console.log("✅ Team members seeded");

  // ── 4. PRICING PLANS ──────────────────────────────
  await prisma.pricingPlan.upsert({
    where: { id: "plan-build" },
    update: {},
    create: {
      id: "plan-build",
      name: "Build",
      tagline: "From idea → working MVP in days",
      price: "£2,500",
      delivery: "Delivery: 5–7 days",
      features: [
        "Founder strategy session (idea clarity + refinement)",
        "Problem → solution mapping",
        "AI integration (OpenAI, Claude, automation where relevant)",
        "Lean MVP development (core features only)",
        "1 feedback & iteration cycle",
        "Clear roadmap for next steps",
      ],
      bestFor: ["Early-stage founders", "Startup MVP development", "AI prototypes / proof of concept"],
      quote: "A real, working product you can test with users — not just an idea.",
      highlighted: false,
      ctaText: "Book a Meeting →",
      icon: "rocket",
      order: 0,
    },
  });
  await prisma.pricingPlan.upsert({
    where: { id: "plan-validate" },
    update: {},
    create: {
      id: "plan-validate",
      name: "Validate",
      tagline: "Build the right product — not just a fast one",
      price: "£5,000",
      delivery: "Delivery: 2–3 weeks",
      features: [
        "Market & competitor analysis",
        "SWOT + business viability assessment",
        "Monetisation strategy",
        "AI opportunity mapping",
        "Full MVP development (scalable foundation)",
        "Multiple iteration cycles",
        "Ongoing consultation throughout",
      ],
      bestFor: ["Founders preparing for launch", "AI SaaS startups", "Businesses integrating AI into operations"],
      quote: "A validated, scalable MVP backed by real insights, ready to launch with confidence.",
      highlighted: true,
      ctaText: "Book a Meeting →",
      icon: "target",
      order: 1,
    },
  });
  await prisma.pricingPlan.upsert({
    where: { id: "plan-scale" },
    update: {},
    create: {
      id: "plan-scale",
      name: "Scale",
      tagline: "Turn your product into a system that compounds",
      price: "£10,000+",
      pricePrefix: "Starting from",
      delivery: "Delivery: Custom timeline",
      features: [
        "Full product & system architecture",
        "AI agents, automation workflows, integrations",
        "Custom backend & scalable infrastructure",
        "Data pipelines, dashboards & analytics",
        "Continuous optimisation (build → measure → improve)",
        "Dedicated AI + engineering team",
        "Long-term technical partnership",
      ],
      bestFor: ["Funded startups scaling fast", "Enterprises building AI-first products", "Companies needing a technical co-founder"],
      quote: "A production-ready system built to scale — with a team that grows with you.",
      highlighted: false,
      ctaText: "Book a Meeting →",
      icon: "trending-up",
      order: 2,
    },
  });
  console.log("✅ Pricing plans seeded");

  // ── 5. TESTIMONIALS ───────────────────────────────
  const testimonialsData = [
    {
      id: "test-1",
      author: "James T.",
      role: "Founder, E-commerce Brand",
      location: "Dubai, UAE",
      avatar: "JT",
      avatarColor: "#6055D9",
      rating: 5,
      text: "PuzzleMetrics transformed our ad spend. ROAS went from 1.8x to over 8x in three months. The AI system works 24/7 and catches things we'd never manually spot.",
      platform: "clutch",
      platformLabel: "Clutch",
      platformColor: "#E44D26",
      reviewUrl: "https://clutch.co",
      date: "March 2025",
      verified: true,
      order: 0,
    },
    {
      id: "test-2",
      author: "Sarah K.",
      role: "Managing Partner",
      location: "London, UK",
      avatar: "SK",
      avatarColor: "#0EA5E9",
      rating: 5,
      text: "The RAG system they built reduced research time from 3 hours to under 10 minutes per case. The accuracy is remarkable — our senior partners trust it completely.",
      platform: "google",
      platformLabel: "Google",
      platformColor: "#4285F4",
      reviewUrl: "https://google.com",
      date: "February 2025",
      verified: true,
      order: 1,
    },
    {
      id: "test-3",
      author: "Marcus R.",
      role: "CTO, B2B SaaS",
      location: "London, UK",
      avatar: "MR",
      avatarColor: "#10B981",
      rating: 5,
      text: "We hired PuzzleMetrics to build our lead qualification agent. SDR productive time went from 30% to 75% overnight. Exceptional technical team.",
      platform: "upwork",
      platformLabel: "Upwork",
      platformColor: "#14A800",
      reviewUrl: "https://upwork.com",
      date: "January 2025",
      verified: true,
      order: 2,
    },
    {
      id: "test-4",
      author: "Aisha M.",
      role: "Head of Digital",
      location: "UAE",
      avatar: "AM",
      avatarColor: "#F59E0B",
      rating: 5,
      text: "City Rosters solved a problem we'd had for years. Managing 200+ players across 12 teams is now completely frictionless. The scheduling AI saves us 8 hours a week.",
      platform: "trustpilot",
      platformLabel: "Trustpilot",
      platformColor: "#00B67A",
      reviewUrl: "https://trustpilot.com",
      date: "December 2024",
      verified: true,
      order: 3,
    },
    {
      id: "test-5",
      author: "David C.",
      role: "E-commerce Director",
      location: "Europe",
      avatar: "DC",
      avatarColor: "#EC4899",
      rating: 5,
      text: "The Google Ads automation went live and immediately started outperforming what our agency had been doing for 2 years. ROI on the build paid back in week 3.",
      platform: "fiverr",
      platformLabel: "Fiverr",
      platformColor: "#1DBF73",
      reviewUrl: "https://fiverr.com",
      date: "November 2024",
      verified: true,
      order: 4,
    },
    {
      id: "test-6",
      author: "Priya N.",
      role: "Product Manager",
      location: "UK",
      avatar: "PN",
      avatarColor: "#8B5CF6",
      rating: 5,
      text: "Brought PuzzleMetrics in for AI strategy consulting. They gave us a brutally honest assessment of what would and wouldn't work. That clarity was worth more than the deliverables.",
      platform: "clutch",
      platformLabel: "Clutch",
      platformColor: "#E44D26",
      reviewUrl: "https://clutch.co",
      date: "October 2024",
      verified: true,
      order: 5,
    },
  ];
  for (const t of testimonialsData) {
    const { id, ...rest } = t;
    await prisma.testimonial.upsert({
      where: { id },
      update: rest,
      create: t,
    });
  }
  console.log("✅ Testimonials seeded");

  // ── 6. SERVICES ───────────────────────────────────
  const servicesData = [
    {
      id: "svc-agents",
      number: "01",
      slug: "ai-agents",
      title: "SaaS AI Agents",
      shortTitle: "AI Agents",
      tagline: "Autonomous systems that work 24/7",
      description:
        "Custom AI agents that operate inside your existing systems — making decisions, executing tasks, and reporting results without human intervention.",
      outcomes: ["40–60% reduction in manual work", "Sub-second decision making", "24/7 autonomous operation"],
      tags: ["LangChain", "OpenAI", "Python", "APIs"],
      icon: "agent",
      accentColor: "#6055D9",
      accentBg: "rgba(96,85,217,0.08)",
      accentBorder: "rgba(96,85,217,0.2)",
      order: 0,
    },
    {
      id: "svc-rag",
      number: "02",
      slug: "rag-systems",
      title: "RAG Systems",
      shortTitle: "RAG Systems",
      tagline: "Your data. Grounded AI answers.",
      description:
        "Retrieval-Augmented Generation systems that connect your documents, databases, and knowledge bases to AI — delivering accurate, cited responses.",
      outcomes: ["Query 50,000+ documents in seconds", "98%+ accuracy on domain questions", "Full citation and source tracking"],
      tags: ["Pinecone", "Embeddings", "LangChain", "Vector DB"],
      icon: "search",
      accentColor: "#0EA5E9",
      accentBg: "rgba(14,165,233,0.08)",
      accentBorder: "rgba(14,165,233,0.2)",
      order: 1,
    },
    {
      id: "svc-ads",
      number: "03",
      slug: "ads-intelligence",
      title: "Meta & Google Ads AI",
      shortTitle: "Ads Intelligence",
      tagline: "ROAS on autopilot",
      description:
        "AI systems that monitor, optimise, and automate your paid campaigns around the clock. Real-time bidding adjustments without a media buyer.",
      outcomes: ["Average 340% ROAS improvement", "15 hours/week saved per campaign", "Real-time bid optimisation"],
      tags: ["Meta API", "Google Ads", "ML Bidding", "Python"],
      icon: "zap",
      accentColor: "#F59E0B",
      accentBg: "rgba(245,158,11,0.08)",
      accentBorder: "rgba(245,158,11,0.2)",
      order: 2,
    },
    {
      id: "svc-auto",
      number: "04",
      slug: "campaign-automation",
      title: "Campaign Automation",
      shortTitle: "Automation",
      tagline: "Marketing that runs itself",
      description:
        "End-to-end automation of your marketing workflows — from creative testing and audience segmentation to performance reporting.",
      outcomes: ["Full funnel automation", "Multi-channel orchestration", "Real-time performance dashboards"],
      tags: ["Zapier", "n8n", "Webhooks", "CRM APIs"],
      icon: "workflow",
      accentColor: "#10B981",
      accentBg: "rgba(16,185,129,0.08)",
      accentBorder: "rgba(16,185,129,0.2)",
      order: 3,
    },
    {
      id: "svc-analytics",
      number: "05",
      slug: "data-analytics",
      title: "Data Analytics",
      shortTitle: "Analytics",
      tagline: "Data that actually guides decisions",
      description: "ETL pipelines, real-time dashboards, predictive models, and AI-generated insights that highlight what matters.",
      outcomes: ["Unified multi-source dashboards", "Predictive revenue modelling", "Automated anomaly detection"],
      tags: ["BigQuery", "dbt", "SQL", "Looker"],
      icon: "chart",
      accentColor: "#8B5CF6",
      accentBg: "rgba(139,92,246,0.08)",
      accentBorder: "rgba(139,92,246,0.2)",
      order: 4,
    },
    {
      id: "svc-dev",
      number: "06",
      slug: "full-stack-dev",
      title: "Full-Stack AI Dev",
      shortTitle: "Product Dev",
      tagline: "From idea to production",
      description: "End-to-end AI product development — architecture, UI/UX, API, database, deployment, and monitoring.",
      outcomes: ["Production-ready in weeks, not months", "Scalable cloud architecture", "Full codebase handoff"],
      tags: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
      icon: "code",
      accentColor: "#EC4899",
      accentBg: "rgba(236,72,153,0.08)",
      accentBorder: "rgba(236,72,153,0.2)",
      order: 5,
    },
    {
      id: "svc-strategy",
      number: "07",
      slug: "ai-strategy",
      title: "AI Strategy Consulting",
      shortTitle: "Strategy",
      tagline: "Invest correctly, not just fast",
      description: "Strategic roadmaps, architecture guidance, and vendor evaluation for organisations adopting AI.",
      outcomes: ["AI readiness audit", "Prioritised implementation roadmap", "Vendor & build/buy analysis"],
      tags: ["Strategy", "Architecture", "Roadmaps", "Enterprise"],
      icon: "compass",
      accentColor: "#14B8A6",
      accentBg: "rgba(20,184,166,0.08)",
      accentBorder: "rgba(20,184,166,0.2)",
      order: 6,
    },
  ];
  for (const s of servicesData) {
    const { id, ...rest } = s;
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: rest,
      create: s,
    });
  }
  console.log("✅ Services seeded");

  // ── 7. PORTFOLIO PROJECTS ─────────────────────────
  const portfolioPlaceholderImages = [
    "https://placehold.co/1200x675/6055D9/ffffff?text=Project+Screenshot+1",
    "https://placehold.co/1200x675/4038B0/ffffff?text=Project+Screenshot+2",
    "https://placehold.co/1200x675/0a0a14/6055D9?text=Project+Screenshot+3",
  ];

  const portfolioData = [
    {
      id: "port-meta",
      slug: "meta-ads-ai-dubai",
      title: "Meta Ads AI System",
      client: "E-commerce Brand",
      category: "Ads Intelligence",
      industry: "E-commerce",
      location: "Dubai, UAE",
      year: "2024",
      tagline: "340% ROAS lift in 90 days",
      description: "Built an autonomous Meta Ads AI that monitors performance, adjusts bids, and reallocates budget 24/7.",
      challenge: "The client was manually managing 3 Meta ad accounts, spending 15+ hours per week on optimisation.",
      solution:
        "We built an AI agent monitoring performance every 15 minutes, adjusting bids and pausing underperforming creatives automatically.",
      results:
        "ROAS improved from 1.8× to 8.0× within 90 days. Weekly management time dropped from 15 hours to under 2 hours.",
      heroMetric: "340%",
      heroMetricLabel: "ROAS improvement",
      metrics: [
        { value: "8.0×", label: "Final ROAS", color: "#6055D9" },
        { value: "90", label: "Days to result", color: "#0EA5E9" },
        { value: "15h→2h", label: "Weekly time saved", color: "#10B981" },
        { value: "£40k", label: "Media buyer savings", color: "#F59E0B" },
      ],
      tags: ["Meta API", "Python", "ML Bidding", "Automated Creative"],
      images: portfolioPlaceholderImages,
      accentColor: "#6055D9",
      bgGradient: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1a0533 100%)",
      featured: true,
      order: 0,
    },
    {
      id: "port-legal",
      slug: "legal-rag-london",
      title: "Legal Research RAG",
      client: "Legal Tech Firm",
      category: "RAG Systems",
      industry: "Legal Technology",
      location: "London, UK",
      year: "2024",
      tagline: "20 hours saved per researcher weekly",
      description: "Deployed a RAG system over 50,000+ legal documents enabling lawyers to query case history in plain English.",
      challenge: "A team of 8 researchers spent 2–3 hours daily searching through 50,000+ documents.",
      solution: "We built a RAG system with semantic search, returning ranked, cited results in under 3 seconds.",
      results: "Each researcher saves 20+ hours per week. Complex briefs reduced from 3 days to 4 hours.",
      heroMetric: "20hrs",
      heroMetricLabel: "saved per researcher/week",
      metrics: [
        { value: "50,000+", label: "Documents indexed", color: "#0EA5E9" },
        { value: "<3s", label: "Query response time", color: "#6055D9" },
        { value: "98%", label: "Accuracy rate", color: "#10B981" },
        { value: "20hrs", label: "Saved per person/week", color: "#F59E0B" },
      ],
      tags: ["Pinecone", "OpenAI", "LangChain", "RAG"],
      images: portfolioPlaceholderImages,
      accentColor: "#0EA5E9",
      bgGradient: "linear-gradient(135deg, #0c1a2e 0%, #0a3d5c 50%, #0c1a2e 100%)",
      featured: true,
      order: 1,
    },
    {
      id: "port-city",
      slug: "city-rosters-platform",
      title: "City Rosters",
      client: "Own Product",
      category: "SaaS Products",
      industry: "Sports Technology",
      location: "UK & Pakistan",
      year: "2022–Present",
      tagline: "1,200+ users across 5 global markets",
      description: "Full-stack AI sports management SaaS built from zero — roster management, scheduling, payments, and analytics.",
      challenge: "Sports clubs were managing rosters, payments, and schedules across WhatsApp, spreadsheets, and paper.",
      solution: "We designed and built a complete SaaS platform with AI-assisted smart scheduling and payment processing.",
      results: "Now serves 1,200+ active users across 5 countries with 99.9% uptime over 3+ years.",
      heroMetric: "1,200+",
      heroMetricLabel: "active users",
      metrics: [
        { value: "1,200+", label: "Active users", color: "#10B981" },
        { value: "5", label: "Global markets", color: "#6055D9" },
        { value: "3+ yrs", label: "In production", color: "#0EA5E9" },
        { value: "99.9%", label: "Uptime", color: "#F59E0B" },
      ],
      tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AI Scheduling"],
      images: portfolioPlaceholderImages,
      accentColor: "#10B981",
      bgGradient: "linear-gradient(135deg, #0a2018 0%, #0d3d28 50%, #0a2018 100%)",
      featured: true,
      order: 2,
    },
    {
      id: "port-ecom",
      slug: "ecommerce-analytics",
      title: "E-commerce Analytics Dashboard",
      client: "Retail Group",
      category: "Data Analytics",
      industry: "Retail",
      location: "UAE",
      year: "2024",
      tagline: "2M+ events processed daily in real time",
      description: "Real-time analytics platform consolidating Shopify, Meta, and Google data with custom dashboards.",
      challenge: "Data scattered across Shopify, Meta, Google, warehouse system, and CRM with no unified view.",
      solution: "Built a real-time pipeline ingesting from all sources every 5 minutes with AI anomaly detection.",
      results: "Real-time visibility replacing weekly Excel reports. AI caught a checkout bug worth £18k.",
      heroMetric: "2M+",
      heroMetricLabel: "events processed daily",
      metrics: [
        { value: "2M+", label: "Events/day", color: "#F59E0B" },
        { value: "5min", label: "Data freshness", color: "#6055D9" },
        { value: "£18k", label: "Bug catch savings", color: "#10B981" },
        { value: "4", label: "Data sources unified", color: "#0EA5E9" },
      ],
      tags: ["BigQuery", "dbt", "Looker", "Python", "Shopify API"],
      images: portfolioPlaceholderImages,
      accentColor: "#F59E0B",
      bgGradient: "linear-gradient(135deg, #1a1200 0%, #3d2c00 50%, #1a1200 100%)",
      featured: false,
      order: 3,
    },
    {
      id: "port-lead",
      slug: "lead-qualification-agent",
      title: "Lead Qualification Agent",
      client: "B2B SaaS Company",
      category: "AI Agents",
      industry: "B2B SaaS",
      location: "London, UK",
      year: "2023",
      tagline: "60% reduction in SDR workload",
      description: "An AI agent that scores inbound leads using 40+ signals, enriches data, and routes qualified leads automatically.",
      challenge: "6 SDRs spending 70% of time manually qualifying leads — most of which were low quality.",
      solution: "Built an agent that enriches contacts, scores across 40+ signals, and routes to CRM automatically.",
      results: "SDR productive selling time increased from 30% to 75%. Lead response time dropped from 4 hours to 8 minutes.",
      heroMetric: "60%",
      heroMetricLabel: "less SDR manual work",
      metrics: [
        { value: "40+", label: "Scoring signals", color: "#8B5CF6" },
        { value: "8min", label: "Response time (was 4hrs)", color: "#6055D9" },
        { value: "60%", label: "Less manual work", color: "#10B981" },
        { value: "30%→75%", label: "SDR selling time", color: "#F59E0B" },
      ],
      tags: ["LangChain", "HubSpot API", "Clearbit", "OpenAI", "Python"],
      images: portfolioPlaceholderImages,
      accentColor: "#8B5CF6",
      bgGradient: "linear-gradient(135deg, #0f0a1a 0%, #2a1a50 50%, #0f0a1a 100%)",
      featured: false,
      order: 4,
    },
    {
      id: "port-google",
      slug: "google-ads-automation",
      title: "Google Ads Automation",
      client: "DTC Brand",
      category: "Ads Intelligence",
      industry: "Direct-to-Consumer",
      location: "Europe",
      year: "2024",
      tagline: "+180% ROAS in 60 days",
      description: "ML-powered Google Ads automation trained on 18 months of historical data with continuous learning.",
      challenge: "Manual bid changes twice weekly could not react to real-time demand signals or competitor activity.",
      solution: "Trained bidding models on 18 months of data with 4-hourly adjustments and continuous retraining.",
      results: "ROAS improved from 2.1× to 5.9× in 60 days. Wasted spend dropped 42%. Budget scaled 3×.",
      heroMetric: "+180%",
      heroMetricLabel: "ROAS improvement",
      metrics: [
        { value: "5.9×", label: "Final ROAS (was 2.1×)", color: "#EC4899" },
        { value: "60", label: "Days to result", color: "#6055D9" },
        { value: "42%", label: "Wasted spend reduced", color: "#10B981" },
        { value: "3×", label: "Budget scaled", color: "#F59E0B" },
      ],
      tags: ["Google Ads API", "Python", "ML", "Scikit-learn", "BigQuery"],
      images: portfolioPlaceholderImages,
      accentColor: "#EC4899",
      bgGradient: "linear-gradient(135deg, #1a0a14 0%, #3d0a28 50%, #1a0a14 100%)",
      featured: false,
      order: 5,
    },
  ];
  for (const p of portfolioData) {
    const { id: _id, ...updateFields } = p;
    await prisma.portfolioProject.upsert({
      where: { slug: p.slug },
      update: { ...updateFields, images: p.images, metrics: p.metrics },
      create: { ...p, images: p.images, metrics: p.metrics },
    });
  }
  console.log("✅ Portfolio projects seeded");

  // ── 8. CASE STUDIES ───────────────────────────────
  const caseStudiesData = [
    {
      id: "cs-meta",
      slug: "meta-ads-ai-ecommerce-dubai",
      title: "340% ROAS in 90 Days with Autonomous Meta Ads AI",
      client: "E-commerce Brand",
      industry: "E-commerce",
      location: "Dubai, UAE",
      year: "2024",
      service: "Ads Intelligence",
      duration: "6 weeks build · 8 months running",
      tagline: "How we replaced a media buyer with an AI that never sleeps",
      summary:
        "A Dubai-based e-commerce brand was managing three Meta ad accounts manually, spending 15+ hours a week on optimisation with diminishing returns. We built an AI agent that monitors performance every 15 minutes, adjusts bids autonomously, and reallocates budget in real time.",
      problem:
        "The client had three Meta ad accounts running across fashion, accessories, and homeware. A dedicated media buyer was spending 15 hours per week on manual optimisation.\n\nDespite the effort, ROAS had plateaued at 1.8× for four consecutive months. Creative fatigue was going undetected — ads were running well past their effective lifespan, burning budget on audiences that had already converted.",
      approach:
        "We started with a two-week data audit, ingesting 18 months of historical performance data. We identified patterns that predicted ROAS degradation 48 hours in advance.\n\nOur architecture: a Python-based monitoring agent connected directly to the Meta Ads API, running on a 15-minute polling cycle with three decision modules: bid optimisation, creative fatigue detector, and budget reallocation engine.",
      execution:
        "Week 1–2: Data ingestion and model training.\nWeek 3: Shadow mode — predictions without execution.\nWeek 4: Partial live deployment on one account.\nWeek 5: Full live deployment across all three accounts.\nWeek 6+: Continuous operation with weekly reports.",
      outcome:
        "ROAS improved from 1.8× to 8.0× within 90 days. Weekly management time dropped from 15 hours to under 2 hours. The brand scaled monthly ad spend from £12,000 to £38,000 while maintaining ROAS.",
      heroMetric: "340%",
      heroMetricLabel: "ROAS improvement",
      metrics: [
        { value: "8.0×", label: "Final ROAS achieved", color: "#6055D9" },
        { value: "90", label: "Days to peak result", color: "#0EA5E9" },
        { value: "15h→2h", label: "Weekly management time", color: "#10B981" },
        { value: "22,000+", label: "Autonomous decisions made", color: "#F59E0B" },
      ],
      testimonial: {
        quote: "We were sceptical that AI could outperform an experienced media buyer. After 90 days, the data was undeniable.",
        name: "Head of Growth",
        role: "E-commerce Brand, Dubai",
      },
      tags: ["Meta Ads API", "Python", "ML Bidding", "Automated Budget"],
      accentColor: "#6055D9",
      accentBg: "rgba(96,85,217,0.08)",
      bgGradient: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1a0533 100%)",
      featured: true,
      order: 0,
    },
    {
      id: "cs-legal",
      slug: "legal-rag-london",
      title: "How a Legal Team Cut Research Time by 75% with RAG",
      client: "Legal Tech Firm",
      industry: "Legal Technology",
      location: "London, UK",
      year: "2024",
      service: "RAG Systems",
      duration: "5 weeks build · ongoing",
      tagline: "From 3-hour document searches to 3-second answers",
      summary:
        "A London legal firm with 8 researchers was losing 2–3 hours per person daily to manual document search across 50,000+ files. We built a RAG system that lets them query the entire library in plain English with full citations in under 3 seconds.",
      problem:
        "Eight legal researchers were spending 2–3 hours daily searching through a document library of over 50,000 files.\n\nThe search tool was keyword-based with no semantic understanding. Junior researchers were consistently missing relevant precedents.",
      approach:
        "RAG was the right architecture because the problem was retrieval, not generation. We ingested 50,000+ documents with custom chunking logic that respects legal document structure.\n\nEmbeddings were generated using a model fine-tuned on legal text with Pinecone configured with rich metadata for filtered retrieval.",
      execution:
        "Week 1: Data audit and ingestion pipeline.\nWeek 2: Embedding generation (38 hours processing time).\nWeek 3: Retrieval testing — 200 benchmark queries, initial accuracy 87%.\nWeek 4: Accuracy reached 98%, UI integration.\nWeek 5: Full rollout to all 8 researchers.",
      outcome:
        "Each researcher saves 20+ hours per week. Complex briefs reduced from 3 days to 4 hours. Research quality standardised upward — every researcher now has access to the same comprehensive retrieval that previously required senior partner knowledge.",
      heroMetric: "75%",
      heroMetricLabel: "reduction in research time",
      metrics: [
        { value: "50,000+", label: "Documents indexed", color: "#0EA5E9" },
        { value: "<3s", label: "Query response time", color: "#6055D9" },
        { value: "98%", label: "Retrieval accuracy", color: "#10B981" },
        { value: "20hrs", label: "Saved per researcher/week", color: "#F59E0B" },
      ],
      testimonial: {
        quote:
          "The difference is like going from a library with no index to one where you can ask the librarian anything in plain English.",
        name: "Managing Partner",
        role: "Legal Technology Firm, London",
      },
      tags: ["Pinecone", "OpenAI Embeddings", "LangChain", "OCR Pipeline"],
      accentColor: "#0EA5E9",
      accentBg: "rgba(14,165,233,0.08)",
      bgGradient: "linear-gradient(135deg, #0c1a2e 0%, #0a3d5c 50%, #0c1a2e 100%)",
      featured: true,
      order: 1,
    },
    {
      id: "cs-city",
      slug: "city-rosters-saas",
      title: "Building City Rosters: Zero to 1,200 Users in 18 Months",
      client: "PuzzleMetrics (Own Product)",
      industry: "Sports Technology",
      location: "UK & Pakistan",
      year: "2022–Present",
      service: "Full-Stack AI Development",
      duration: "18 months to v1 · ongoing",
      tagline: "How we built a live SaaS product with no external funding",
      summary:
        "We identified a gap in sports management tooling for grassroots clubs. We designed, built, and launched City Rosters from first commit to 1,200 paying users across 5 countries with zero external funding.",
      problem:
        "Sports clubs were managing operations across WhatsApp, Google Sheets, cash payments, and paper.\n\nNo existing platform served this market. Professional solutions cost £2,000+/month — overkill for grassroots clubs.",
      approach:
        "We ran 40 discovery interviews across UK and Pakistani sports clubs. The core insight: these users needed everything integrated.\n\nArchitecture: Next.js, Node.js, PostgreSQL, Stripe, and a custom AI scheduling engine built with constraint satisfaction algorithms.",
      execution:
        "Months 1–3: Core platform, auth, roster management.\nMonths 4–6: Payment processing, multi-currency.\nMonths 7–9: AI scheduling engine.\nMonths 10–12: Analytics, mobile optimisation.\nMonth 13: Soft launch to 50 beta clubs.\nMonth 17: Public launch.\nMonth 18: 400+ clubs, 1,200+ users.",
      outcome:
        "City Rosters has operated for 3+ years at 99.9% uptime. Processes payments across 5 currencies. Club managers report saving 8+ hours per week. The AI scheduler has resolved 12,000+ scheduling conflicts.",
      heroMetric: "1,200+",
      heroMetricLabel: "active users in 18 months",
      metrics: [
        { value: "1,200+", label: "Active users", color: "#10B981" },
        { value: "5", label: "Global markets", color: "#6055D9" },
        { value: "99.9%", label: "Uptime over 3 years", color: "#0EA5E9" },
        { value: "12,000+", label: "Scheduling conflicts resolved", color: "#F59E0B" },
      ],
      testimonial: {
        quote:
          "Before City Rosters, managing our academy across three sites was a full-time job just in admin. Now I can see everything on my phone.",
        name: "Academy Director",
        role: "Sports Academy, UK",
      },
      tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AI Scheduling"],
      accentColor: "#10B981",
      accentBg: "rgba(16,185,129,0.08)",
      bgGradient: "linear-gradient(135deg, #0a2018 0%, #0d3d28 50%, #0a2018 100%)",
      featured: true,
      order: 2,
    },
  ];
  for (const cs of caseStudiesData) {
    const { id: _id, ...updateFields } = cs;
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: {
        ...updateFields,
        metrics: cs.metrics,
        testimonial: cs.testimonial,
      },
      create: cs,
    });
  }
  console.log("✅ Case studies seeded");

  // ── 9. BLOG POSTS ────────────────────────────────
  const blogData = [
    {
      id: "blog-ai-wrong",
      slug: "why-most-businesses-get-ai-wrong",
      title: "Why Most Businesses Are Getting AI Wrong — And How to Fix It",
      excerpt:
        "Most companies jump straight to AI solutions before solving the data problem. Here's the diagnostic framework we use before writing a single line of code.",
      category: "AI Strategy",
      author: "James Rowland",
      authorRole: "AI Strategy Consultant",
      authorInitials: "JR",
      authorColor: "#6055D9",
      date: "April 2025",
      readTime: "8 min read",
      featured: true,
      published: true,
      accentColor: "#6055D9",
      accentBg: "rgba(96,85,217,0.08)",
      tags: ["AI Strategy", "Enterprise AI", "Data Readiness"],
      content: {
        intro:
          "Every week we talk to companies that have already tried AI. They've hired a consultant, bought a tool, maybe even shipped something. And they're frustrated.\n\nThe failure pattern is almost always the same: they started with a solution instead of a problem.",
        sections: [
          {
            heading: "The Three Root Causes of Failed AI Projects",
            body: "Data poverty, process ambiguity, and integration debt. In our experience across 40+ AI engagements, failed projects cluster into these three categories.\n\nData poverty means the AI system has nothing meaningful to learn from. Process ambiguity means nobody has clearly defined what the AI is supposed to decide. Integration debt means the company's systems can't receive the AI's output.",
          },
          {
            heading: "The Diagnostic Framework",
            body: "Before we write a single line of code, we run every client through four questions: Can you show me the data? What decision does the AI make? What does success look like in numbers? What happens to the AI's output?\n\nIf any of these can't be answered clearly, the project isn't ready to start.",
          },
        ],
        conclusion:
          "AI is not magic. The companies that get real results treat it as an engineering problem with defined inputs, outputs, and measurable outcomes.",
      },
    },
    {
      id: "blog-rag",
      slug: "building-production-rag-that-works",
      title: "Building Production RAG Systems That Actually Work",
      excerpt:
        "Chunking, embedding, retrieval ranking — the practical lessons from shipping RAG into production for 5 different clients.",
      category: "Technical",
      author: "Alex Khan",
      authorRole: "Head of AI & Architecture",
      authorInitials: "AK",
      authorColor: "#0EA5E9",
      date: "March 2025",
      readTime: "6 min read",
      featured: true,
      published: true,
      accentColor: "#0EA5E9",
      accentBg: "rgba(14,165,233,0.08)",
      tags: ["RAG", "LangChain", "Pinecone", "Production AI"],
      content: {
        intro:
          "RAG looks simple in demos. You ingest a PDF, ask a question, get an answer. Then you try it on 50,000 real documents and the wheels fall off.\n\nWe've shipped RAG systems for 5 different clients. Here's what actually matters in production.",
        sections: [
          {
            heading: "Chunking Is Not a Default Setting",
            body: "Every tutorial shows recursive character splitting at 512 tokens. That's a starting point. Optimal chunking depends on your document structure.\n\nLegal documents have clause hierarchies. Technical docs have code blocks. Each needs a custom chunking strategy.",
          },
          {
            heading: "Retrieval Is a Pipeline, Not a Lookup",
            body: "Production retrieval has four stages: dense retrieval, metadata filtering, reranking, and context assembly.\n\nSkip any stage and you leave significant accuracy on the table. Reranking alone typically improves precision by 20-40%.",
          },
        ],
        conclusion:
          "The gap between a RAG demo and a production RAG system is real but well-defined. The solutions exist — they just require deliberate implementation decisions.",
      },
    },
    {
      id: "blog-meta",
      slug: "meta-ads-api-ai-layer",
      title: "How We Built an AI Layer on Top of Meta's Ads API",
      excerpt:
        "Meta gives you data. Here's how we turned that data into autonomous decisions running 24/7 without a media buyer.",
      category: "Ads Intelligence",
      author: "Omar Siddiqui",
      authorRole: "Ads Intelligence Lead",
      authorInitials: "OS",
      authorColor: "#F59E0B",
      date: "February 2025",
      readTime: "5 min read",
      featured: false,
      published: true,
      accentColor: "#F59E0B",
      accentBg: "rgba(245,158,11,0.08)",
      tags: ["Meta API", "Autonomous Ads", "Python", "AI Bidding"],
      content: {
        intro:
          "The Meta Ads API gives you full programmatic control over your campaigns. What it doesn't give you is intelligence. That's what we build.\n\nHere's the architecture of a production Meta Ads AI system.",
        sections: [
          {
            heading: "The Data Layer",
            body: "Every 15 minutes, our polling agent calls the Meta Insights API for each active ad set. We store everything in a time-series database with rolling windows for different decision types.",
          },
          {
            heading: "The Decision Engine",
            body: "Three modules: bid optimisation (adjusts based on real-time ROAS), creative fatigue detection (frequency × CTR decline score), and budget reallocation (shifts from bottom quartile to top quartile).",
          },
        ],
        conclusion:
          "The system's power comes from consistency, frequency, and scale. It makes the right call at 3AM on a Saturday without fatigue. That compound reliability creates the ROAS improvement.",
      },
    },
    {
      id: "blog-data",
      slug: "three-data-problems-before-ai",
      title: "The Only 3 Data Problems That Matter Before You Add AI",
      excerpt:
        "Every AI project that fails does so because of bad data, not bad models. Here's how to spot and fix the three root causes.",
      category: "Data Engineering",
      author: "Priya Sharma",
      authorRole: "Data Engineer",
      authorInitials: "PS",
      authorColor: "#10B981",
      date: "January 2025",
      readTime: "7 min read",
      featured: false,
      published: true,
      accentColor: "#10B981",
      accentBg: "rgba(16,185,129,0.08)",
      tags: ["Data Engineering", "ETL", "Data Quality", "AI Readiness"],
      content: {
        intro:
          "Garbage in, garbage out. After auditing data infrastructure for a dozen AI projects, the same three problems appear every time.",
        sections: [
          {
            heading: "Problem 1: Siloed Data with No Unified Identity",
            body: "Customer data in CRM, purchases in Shopify, ads in Meta, support in Zendesk — each with different ID formats. Build a unified identity layer first.",
          },
          {
            heading: "Problem 2: Missing Historical Data",
            body: "AI learns from history. A bidding model needs 6-12 months of data. If you haven't been storing the right data, start now while assessing if you have enough for a meaningful model.",
          },
        ],
        conclusion:
          "The hardest work in AI is usually not the AI. It's the plumbing. Treat data infrastructure as a first-class investment.",
      },
    },
    {
      id: "blog-pricing",
      slug: "pricing-your-ai-project",
      title: "Pricing Your AI Project: What Actually Drives Cost",
      excerpt:
        "Token costs, infra, fine-tuning — a transparent breakdown of what enterprise AI projects really cost.",
      category: "AI Strategy",
      author: "James Rowland",
      authorRole: "AI Strategy Consultant",
      authorInitials: "JR",
      authorColor: "#8B5CF6",
      date: "December 2024",
      readTime: "4 min read",
      featured: false,
      published: true,
      accentColor: "#8B5CF6",
      accentBg: "rgba(139,92,246,0.08)",
      tags: ["AI Pricing", "Cost Analysis", "Enterprise AI", "Budget"],
      content: {
        intro:
          "\"How much does AI cost?\" is the wrong question. The right question: what drives cost for a specific system?\n\nWe've built systems costing £2,000 one-time and systems with £3,000/month in operational costs.",
        sections: [
          {
            heading: "The Build Cost",
            body: "Integration complexity (40-60% of total cost), decision logic complexity (rules vs ML — 3-5x difference), and reliability requirements (99.9% uptime vs best-effort).",
          },
          {
            heading: "The Run Cost",
            body: "API costs scale linearly with usage. A RAG system processing 1,000 queries/day costs ~£450/month in OpenAI API costs alone. Model this before committing.",
          },
        ],
        conclusion:
          "Map the integrations, define the decision logic, model the token costs, audit the data. Do that before any scoping conversation.",
      },
    },
    {
      id: "blog-city",
      slug: "city-rosters-build-story",
      title: "From Spreadsheets to SaaS: Building City Rosters",
      excerpt:
        "How we went from a customer problem to a live SaaS platform with 1,200+ users in under 18 months.",
      category: "Product",
      author: "Sarah Mitchell",
      authorRole: "Full-Stack Engineer",
      authorInitials: "SM",
      authorColor: "#EC4899",
      date: "October 2024",
      readTime: "9 min read",
      featured: false,
      published: true,
      accentColor: "#EC4899",
      accentBg: "rgba(236,72,153,0.08)",
      tags: ["SaaS", "Next.js", "Product Build", "Startup"],
      content: {
        intro:
          "City Rosters started as a conversation with a cricket academy director in Birmingham who was managing 200 players across 12 age groups using WhatsApp and Google Sheets.\n\nThat conversation led to 40 more. Across UK and Pakistani sports clubs, the same frustrations surfaced.",
        sections: [
          {
            heading: "The Architecture Decisions That Mattered",
            body: "PostgreSQL over NoSQL (sports data is inherently relational). Custom constraint satisfaction scheduler over generic libraries (handles both hard and soft constraints with our performance requirements).",
          },
          {
            heading: "Getting to 1,200 Users Without Marketing Spend",
            body: "Find one power user per sport, onboard them personally, watch them use it, fix what's broken, ask for two introductions. Month 1: 8 clubs. Month 18: 400+ clubs.\n\nThe Pakistan market opened unexpectedly — Urdu language support turned out to be the feature that unlocked an entire market.",
          },
        ],
        conclusion:
          "City Rosters is the most important proof point we have. It demonstrates we can identify a real problem, build the right product, and operate it reliably over years.",
      },
    },
  ];
  for (const b of blogData) {
    const { id: _id, ...updateFields } = b;
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: { ...updateFields, content: b.content },
      create: b,
    });
  }
  console.log("✅ Blog posts seeded");

  // ── 10. STAT CARDS ────────────────────────────────
  const statCardsData = [
    { id: "stat-users", label: "Active Users", value: "1,200+", color: "#10B981", icon: "users", order: 0 },
    { id: "stat-leads", label: "Leads Generated/Month", value: "2,400+", color: "#0EA5E9", icon: "leads", order: 1 },
    { id: "stat-agents", label: "AI Agents Deployed", value: "50+", color: "#6055D9", icon: "agents", order: 2 },
    { id: "stat-satisfaction", label: "Client Satisfaction", value: "98%", color: "#F59E0B", icon: "satisfaction", order: 3 },
  ];
  for (const s of statCardsData) {
    await prisma.statCard.upsert({
      where: { id: s.id },
      update: { label: s.label, value: s.value, color: s.color, icon: s.icon, order: s.order },
      create: s,
    });
  }
  console.log("✅ Stat cards seeded");

  // ── 11. COMPANY LOGOS ─────────────────────────────
  const trustedCompanies = [
    "Client Co",
    "RetailBrand",
    "FinTech Ltd",
    "MedHealth",
    "LegalPro",
    "EduTech",
    "PropCo",
    "AutoBrand",
  ];
  const partnerCompanies = [
    "OpenAI",
    "Anthropic",
    "Meta AI",
    "Google AI",
    "n8n",
    "Make",
    "Zapier",
    "Supabase",
    "Vercel",
    "AWS",
  ];

  for (let i = 0; i < trustedCompanies.length; i++) {
    const id = `logo-trusted-${i}`;
    await prisma.companyLogo.upsert({
      where: { id },
      update: { name: trustedCompanies[i], type: "trusted", order: i, active: true },
      create: { id, name: trustedCompanies[i], logo: "", websiteUrl: "", type: "trusted", order: i, active: true },
    });
  }
  for (let i = 0; i < partnerCompanies.length; i++) {
    const id = `logo-partner-${i}`;
    await prisma.companyLogo.upsert({
      where: { id },
      update: { name: partnerCompanies[i], type: "partner", order: i, active: true },
      create: { id, name: partnerCompanies[i], logo: "", websiteUrl: "", type: "partner", order: i, active: true },
    });
  }
  console.log("✅ Company logos seeded");

  // ── 12. SOCIAL LINKS ──────────────────────────────
  const socialLinksData = [
    { id: "social-linkedin", platform: "linkedin", url: "https://linkedin.com/company/puzzlemetrics", active: true, order: 1 },
    { id: "social-twitter", platform: "twitter", url: "https://twitter.com/puzzlemetrics", active: true, order: 2 },
    { id: "social-instagram", platform: "instagram", url: "https://instagram.com/puzzlemetrics", active: true, order: 3 },
  ];
  for (const link of socialLinksData) {
    await prisma.socialLink.upsert({
      where: { id: link.id },
      update: { platform: link.platform, url: link.url, active: link.active, order: link.order },
      create: link,
    });
  }
  console.log("✅ Social links seeded");

  // ── 13. EMAIL SETTINGS ────────────────────────────
  await prisma.emailSettings.upsert({
    where: { id: "email-settings-main" },
    update: {},
    create: {
      id: "email-settings-main",
      smtpHost: "send.one.com",
      smtpPort: 587,
      smtpUser: "website@puzzlemetrics.com",
      smtpPass: "",
      fromName: "PuzzleMetrics",
      fromEmail: "website@puzzlemetrics.com",
      adminEmail: "admin@puzzlemetrics.com",
    },
  });
  console.log("✅ Email settings seeded");

  // ── 14. SITE SETTINGS ─────────────────────────────
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      companyNumber: "16809669",
      phone: "+44 20 7946 0958",
      email: "hello@puzzlemetrics.com",
    },
    create: {
      id: "default",
      companyNumber: "16809669",
      phone: "+44 20 7946 0958",
      email: "hello@puzzlemetrics.com",
    },
  });
  console.log("✅ Site settings seeded");

  console.log("\n🎉 All done! Database seeded with all dummy data.");
  console.log("👤 Admin login: admin@puzzlemetrics.com / PuzzleMetrics2024!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
