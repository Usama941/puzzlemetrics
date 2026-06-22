"use client";

import { motion } from "framer-motion";
import { sectionFadeUp } from "@/lib/animations";

const STATS: { value: string; label: string }[] = [
  { value: "1,200+", label: "PLATFORM USERS" },
  { value: "5", label: "GLOBAL MARKETS" },
  { value: "3+", label: "YEARS BUILDING AI" },
  { value: "100%", label: "IN-HOUSE BUILT" },
];

export function SocialProof() {
  return (
    <section className="bg-[#6055D9] px-[clamp(24px,5vw,80px)] py-[clamp(56px,8vh,96px)]">
      <motion.div className="mx-auto max-w-[1280px]" {...sectionFadeUp}>
        <div className="grid grid-cols-1 divide-y divide-[rgba(255,255,255,0.15)] md:grid-cols-4 md:divide-x md:divide-y-0">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 px-4 py-8 text-center md:py-6">
              <span className="font-syne text-[clamp(44px,5.5vw,68px)] font-extrabold tracking-[-0.04em] text-white">
                {s.value}
              </span>
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-[rgba(255,255,255,0.6)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default SocialProof;
