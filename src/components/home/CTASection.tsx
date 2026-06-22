"use client";

import { useMemo } from "react";
import BookingButton from "@/components/booking/BookingButton";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

export const CTASection = () => {
  const prefersReduced = useReducedMotion();

  const container = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReduced ? 0 : 0.15,
          delayChildren: 0,
        },
      },
    }),
    [prefersReduced],
  );

  const item = useMemo(
    () => ({
      hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 28 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: prefersReduced ? 0 : 0.55, ease },
      },
    }),
    [prefersReduced],
  );

  return (
    <section className="relative overflow-x-hidden overflow-y-hidden bg-[var(--bg-secondary)] py-[100px] text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[700px] w-[min(900px,100vw)] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_50%_50%,rgba(96,85,217,0.2)_0%,transparent_65%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[min(55%,420px)] bg-[linear-gradient(to_top,rgba(180,50,10,0.07)_0%,transparent_70%)]"
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.span
          variants={item}
          className="mb-5 inline-flex rounded-[9999px] border-[0.5px] border-[rgba(96,85,217,0.3)] bg-[rgba(96,85,217,0.12)] px-4 py-[5px] text-[12px] font-semibold uppercase tracking-[0.06em] text-[#7B6EE8]"
        >
          Try it now
        </motion.span>

        <motion.h2
          variants={item}
          className="mb-5 text-[clamp(2rem,6vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)]"
        >
          Ready to Automate Smarter?
        </motion.h2>

        <motion.p
          variants={item}
          className="mb-11 max-w-[500px] text-[16px] font-normal leading-[1.7] text-[var(--text-secondary)]"
        >
          Start deploying powerful AI in minutes. Whether you&apos;re launching a startup or scaling an enterprise,
          PuzzleMetrics gives you the tools to move faster — no complexity required.
        </motion.p>

        <motion.div variants={item} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <BookingButton
            source="cta-get-started"
            className="inline-flex items-center justify-center rounded-[9999px] bg-[#6055D9] px-9 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_32px_rgba(96,85,217,0.45)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px hover:bg-[#7B6EE8] hover:shadow-[0_0_48px_rgba(96,85,217,0.6)]"
            style={{ textDecoration: "none" }}
          >
            Get started
          </BookingButton>
          <BookingButton
            source="cta-book-demo"
            className="inline-flex items-center justify-center rounded-[9999px] border-[0.5px] border-[var(--border-color)] bg-transparent px-9 py-3.5 text-[15px] font-medium text-[var(--text-secondary)] transition-colors duration-200 ease-out hover:border-[var(--border-brand)] hover:bg-[var(--bg-tertiary)] dark:border-[rgba(255,255,255,0.2)] dark:text-[rgba(255,255,255,0.8)] dark:hover:border-[rgba(255,255,255,0.3)] dark:hover:bg-[rgba(255,255,255,0.06)]"
            style={{ textDecoration: "none" }}
          >
            Book a demo
          </BookingButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
