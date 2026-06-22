"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { sectionFadeUp } from "@/lib/animations";

const SERVICES: { num: string; title: string; desc: string; slug: string }[] = [
  {
    num: "01",
    title: "SaaS AI Agents",
    desc: "Custom autonomous agents that work inside your existing systems",
    slug: "saas-ai-agents",
  },
  {
    num: "02",
    title: "RAG Systems",
    desc: "Retrieval-augmented generation for intelligent accurate AI responses",
    slug: "rag-systems",
  },
  {
    num: "03",
    title: "Meta & Google Ads AI",
    desc: "Campaign intelligence that maximises ROAS across every ad channel",
    slug: "meta-google-ads-ai",
  },
  {
    num: "04",
    title: "Campaign Automation",
    desc: "End-to-end automation of your marketing workflows and reporting",
    slug: "campaign-automation",
  },
  {
    num: "05",
    title: "Data Analytics",
    desc: "Turn raw business data into clear decisions and competitive advantage",
    slug: "data-analytics",
  },
  {
    num: "06",
    title: "AI Strategy Consulting",
    desc: "Roadmaps architecture and guidance for enterprise AI adoption",
    slug: "ai-strategy-consulting",
  },
];

export function Services() {
  return (
    <section className="bg-[#FAFAFE] px-[clamp(24px,5vw,80px)] py-[clamp(80px,10vh,140px)] dark:bg-[#08071A]">
      <motion.div className="mx-auto max-w-[1280px]" {...sectionFadeUp}>
        <div className="mb-12 flex items-center gap-3">
          <span className="h-6 w-px shrink-0 bg-[#6055D9]" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6055D9]">WHAT WE DO</span>
        </div>

        <h2 className="font-syne text-[clamp(34px,4.5vw,54px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0D0B1A] dark:text-[#FAFAFE]">
          Expertise &
          <br />
          Execution
        </h2>

        <p className="mt-4 max-w-xl font-sans text-[17px] font-light leading-relaxed text-[#4A4870] dark:text-[#C4C2E8]">
          We close the gap between AI potential and real business performance.
        </p>

        <div className="mt-14">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative block border-y border-[#D6D3F0] py-8 transition-colors duration-200 ease-in-out first:border-t hover:bg-[#F4F3FC] dark:border-[#2a2748] dark:hover:bg-[#0F0E28]"
            >
              <span
                className="pointer-events-none absolute right-0 top-2 font-syne text-[clamp(80px,10vw,120px)] font-extrabold leading-none text-[rgba(96,85,217,0.055)] transition-colors duration-200 ease-in-out group-hover:text-[rgba(96,85,217,0.09)] dark:text-[rgba(96,85,217,0.08)]"
                aria-hidden
              >
                {s.num}
              </span>
              <div className="relative z-[1] flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-8 md:pr-24">
                <div>
                  <h3 className="font-syne text-[20px] font-bold text-[#0D0B1A] dark:text-[#FAFAFE]">{s.title}</h3>
                  <p className="mt-1 max-w-2xl font-sans text-[14px] font-light text-[#8A87B0]">{s.desc}</p>
                </div>
                <span className="inline-flex shrink-0 items-center font-sans text-[14px] font-medium text-[#6055D9] transition-transform duration-200 ease-in-out group-hover:translate-x-1 motion-reduce:transform-none">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Services;
