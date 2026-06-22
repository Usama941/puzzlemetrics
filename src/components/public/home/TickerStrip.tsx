"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { sectionFadeUp } from "@/lib/animations";

const LABELS = [
  "SaaS AI Agents",
  "RAG Systems",
  "Meta Ads Intelligence",
  "Google Ads AI",
  "Campaign Automation",
  "Data Analytics",
  "Full-Stack AI Dev",
  "AI Strategy Consulting",
] as const;

export function TickerStrip() {
  const loop = [...LABELS, ...LABELS];

  return (
    <motion.section aria-label="Capabilities" className="w-full overflow-hidden" {...sectionFadeUp}>
      <div className="flex h-[52px] w-full items-center border-y border-[#D6D3F0] bg-[#F4F3FC] dark:border-[#2a2748] dark:bg-[#0F0E28]">
        <div className="group relative w-full overflow-hidden">
          <div className="flex w-max min-w-full animate-marquee-32 items-center gap-0 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {loop.map((label, i) => (
              <Fragment key={`${label}-${i}`}>
                <span className="whitespace-nowrap px-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[#8A87B0]">
                  {label}
                </span>
                <span
                  className="h-1 w-1 shrink-0 rounded-full bg-[#6055D9]"
                  aria-hidden
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default TickerStrip;
