"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { headerViewProps } from "@/lib/motion-helpers";
import type { Variants } from "framer-motion";
import { LayoutGrid, Layers, Search, Zap, type LucideIcon } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

type Feature = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

const FEATURES: Feature[] = [
  {
    title: "Build, Deploy, Automate",
    body: "No PhD required. Build powerful AI agents with our visual interface and deploy them into your existing systems — automating decisions, reporting, and workflows 24/7.",
    Icon: LayoutGrid,
  },
  {
    title: "Scale Without the Headaches",
    body: "Whether you have 10 users or 10,000, PuzzleMetrics grows with you — from startup to enterprise without re-platforming, re-building, or re-hiring.",
    Icon: Layers,
  },
  {
    title: "RAG That Actually Works",
    body: "Connect your documents, databases, and knowledge bases. Our RAG systems deliver accurate, grounded AI responses — not hallucinations — over your own data.",
    Icon: Search,
  },
  {
    title: "Ads AI on Autopilot",
    body: "Our AI optimises your Meta and Google campaigns around the clock — real-time bidding, creative scoring, and attribution. Clients average 340% ROAS improvement.",
    Icon: Zap,
  },
];

const FeatureCard = ({ feature, itemVariants }: { feature: Feature; itemVariants: Variants }) => {
  const { Icon, title, body } = feature;
  return (
    <motion.article
      variants={itemVariants}
      className="group relative overflow-hidden rounded-[20px] border-[0.5px] border-[var(--border-color)] bg-[var(--bg-card)] p-9 transition-[border-color,box-shadow] duration-[250ms] ease-in-out hover:border-[rgba(96,85,217,0.4)] hover:shadow-[0_0_40px_rgba(96,85,217,0.08)]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-[250ms] ease-in-out group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(96,85,217,0.5), transparent)",
        }}
        aria-hidden
      />
      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border-[0.5px] border-[var(--border-brand)] bg-[rgba(96,85,217,0.12)]">
          <Icon className="h-6 w-6 text-[#7B6EE8]" strokeWidth={1.75} aria-hidden />
        </div>
        <h3 className="mb-2.5 text-[19px] font-bold leading-tight text-[var(--text-primary)]">{title}</h3>
        <p className="text-[14px] font-normal leading-[1.7] text-[var(--text-secondary)]">{body}</p>
      </div>
    </motion.article>
  );
};

export const FeaturesSection = () => {
  const prefersReduced = useReducedMotion();

  const gridContainer = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReduced ? 0 : 0.1,
          delayChildren: prefersReduced ? 0 : 0.05,
        },
      },
    }),
    [prefersReduced],
  );

  const gridItem = useMemo(
    () => ({
      hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: prefersReduced ? 0 : 0.5, ease },
      },
    }),
    [prefersReduced],
  );

  return (
    <section id="features" className="bg-[var(--bg-secondary)] py-[100px]">
      <div className="mx-auto max-w-[1160px] px-4">
        <motion.header {...headerViewProps(prefersReduced)} className="flex flex-col items-center text-center">
          <span className="mb-4 inline-flex rounded-[9999px] border-[0.5px] border-[rgba(96,85,217,0.3)] bg-[rgba(96,85,217,0.12)] px-4 py-[5px] text-[12px] font-semibold uppercase tracking-[0.06em] text-[#7B6EE8]">
            Featured
          </span>
          <h2 className="max-w-[600px] text-[42px] font-bold leading-[1.15] tracking-[-0.025em] text-[var(--text-primary)]">
            Power Features to Supercharge Your AI Operations
          </h2>
          <p className="mb-16 mt-4 max-w-[480px] text-[15px] font-normal leading-[1.7] text-[var(--text-secondary)]">
            PuzzleMetrics is packed with smart, scalable AI tools designed to simplify workflows, boost efficiency, and
            deliver measurable results.
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} itemVariants={gridItem} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
