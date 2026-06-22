"use client";

import type { CaseStudy } from "@prisma/client";
import { motion } from "framer-motion";
import BookingButton from "@/components/booking/BookingButton";
import Link from "next/link";
import type { CSSProperties } from "react";

export default function CaseStudiesClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-primary)] px-6 pb-[72px] pt-[88px] text-center">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div
            className="absolute -right-8 top-0 h-[180px] w-[180px]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(96,85,217,0.12) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            className="absolute bottom-0 left-0 h-[150px] w-[150px]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(14,165,233,0.12) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            className="absolute right-1/4 top-1/3 h-[120px] w-[120px]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.1) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative z-[1] mx-auto max-w-[780px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-5 inline-block rounded-full border border-[rgba(96,85,217,0.25)] bg-[rgba(96,85,217,0.1)] px-4 py-1.5 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.08em] text-[#6055D9]">
              CASE STUDIES
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mb-5 font-[family-name:var(--font-inter-tight)] text-[clamp(40px,5.5vw,58px)] font-extrabold leading-[1.08] tracking-[-0.03em]"
          >
            <span className="text-[var(--text-primary)]">Results that speak</span>
            <br />
            <span className="text-[#6055D9]">for themselves.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-10 max-w-[520px] font-[family-name:var(--font-inter-tight)] text-[17px] font-normal leading-[1.65] text-[var(--text-secondary)]"
          >
            Three deep-dives into our highest-impact work. The full story — problem, approach, execution, and outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-10 md:gap-10"
          >
            {[
              { v: "3", l: "Published case studies" },
              { v: "340%", l: "Avg ROAS improvement" },
              { v: "20hrs", l: "Avg time saved/week" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-[family-name:var(--font-inter-tight)] text-[32px] font-extrabold tracking-[-0.02em] text-[#6055D9]">{s.v}</div>
                <div className="mt-0.5 font-[family-name:var(--font-inter-tight)] text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-muted)]">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 pb-[100px] pt-20">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-7">
          {caseStudies.map((cs, index) => (
            <CaseStudyCard key={cs.slug} cs={cs} index={index} />
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-[88px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-[640px]"
        >
          <h2 className="mb-3 font-[family-name:var(--font-inter-tight)] text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.025em] text-[var(--text-primary)]">
            Your results could be next.
          </h2>
          <p className="font-[family-name:var(--font-inter-tight)] text-[16px] leading-[1.7] text-[var(--text-secondary)]">
            Every case study started with one call. We&apos;ll tell you honestly what AI can and can&apos;t do for your business.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BookingButton
              source="case-studies-index"
              className="inline-flex items-center justify-center rounded-full bg-[#6055D9] px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-white shadow-[0_0_24px_rgba(96,85,217,0.35)] no-underline transition-opacity hover:opacity-95"
              style={{ textDecoration: "none" }}
            >
              Book a Discovery Call →
            </BookingButton>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border-color)] bg-transparent px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-medium text-[var(--text-secondary)] no-underline transition-opacity hover:opacity-90"
            >
              View Portfolio →
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}

function caseStudyMetrics(j: unknown): { value: string; label: string; color: string }[] {
  if (!Array.isArray(j)) return [];
  return j
    .filter((x): x is Record<string, unknown> => !!x && typeof x === "object")
    .map((x) => ({
      value: String(x.value ?? ""),
      label: String(x.label ?? ""),
      color: typeof x.color === "string" ? x.color : "#6055D9",
    }));
}

function CaseStudyCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const mini = caseStudyMetrics(cs.metrics).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group overflow-hidden rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-card)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:[border-color:color-mix(in_srgb,var(--accent)_35%,transparent)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
      style={{ "--accent": cs.accentColor } as CSSProperties}
    >
      <div className="flex flex-col lg:flex-row">
        <div
          className="relative flex min-h-[260px] w-full flex-col justify-between p-8 pl-8 pr-8 pt-10 lg:w-[300px] lg:min-h-0 lg:shrink-0 lg:p-10"
          style={{ background: cs.bgGradient }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-90"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-[1]">
            <span className="inline-block rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.12)] px-3 py-1 font-[family-name:var(--font-inter-tight)] text-[11px] font-semibold uppercase tracking-wide text-[rgba(255,255,255,0.85)]">
              {cs.service}
            </span>
            <div className="mt-6 font-[family-name:var(--font-inter-tight)] text-[52px] font-extrabold leading-none tracking-[-0.04em] text-white [text-shadow:0_0_40px_rgba(255,255,255,0.3)]">
              {cs.heroMetric}
            </div>
            <div className="mt-2 font-[family-name:var(--font-inter-tight)] text-[12px] font-medium uppercase tracking-wide text-[rgba(255,255,255,0.6)]">
              {cs.heroMetricLabel}
            </div>
          </div>
          <p className="relative z-[1] mt-8 font-[family-name:var(--font-inter-tight)] text-[12px] text-[rgba(255,255,255,0.55)] lg:mt-10">
            {cs.industry} · {cs.location}
          </p>
        </div>

        <div className="flex flex-1 flex-col px-6 pb-8 pt-8 sm:px-9">
          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <span
                className="inline-block rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-inter-tight)] text-[10px] font-bold uppercase"
                style={{
                  background: cs.accentBg,
                  borderColor: `${cs.accentColor}40`,
                  color: cs.accentColor,
                }}
              >
                CASE STUDY · {cs.year}
              </span>
              <h2 className="mt-2.5 max-w-[480px] font-[family-name:var(--font-inter-tight)] text-[clamp(18px,2.5vw,22px)] font-bold leading-snug tracking-[-0.015em] text-[var(--text-primary)]">
                {cs.title}
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-[family-name:var(--font-inter-tight)] text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">Client</div>
              <div className="font-[family-name:var(--font-inter-tight)] text-[13px] font-semibold text-[var(--text-primary)]">{cs.client}</div>
              <div className="mt-1 font-[family-name:var(--font-inter-tight)] text-[11px] text-[var(--text-muted)]">{cs.duration}</div>
            </div>
          </div>

          <p className="mb-5 line-clamp-3 font-[family-name:var(--font-inter-tight)] text-[14px] leading-[1.7] text-[var(--text-secondary)]">{cs.summary}</p>

          <div className="mb-6 flex flex-wrap items-stretch">
            {mini.map((m, i) => (
              <div key={m.label} className="flex min-w-[28%] flex-1 items-stretch sm:min-w-0">
                {i > 0 ? <div className="mx-2.5 hidden h-auto w-px shrink-0 bg-[var(--border-color)] sm:mx-4 sm:block" aria-hidden /> : null}
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="font-[family-name:var(--font-inter-tight)] text-[17px] font-bold" style={{ color: m.color }}>
                    {m.value}
                  </span>
                  <span className="mt-0.5 font-[family-name:var(--font-inter-tight)] text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                    {m.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-[var(--border-color)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {cs.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2.5 py-0.5 font-[family-name:var(--font-inter-tight)] text-[11px] font-medium text-[var(--text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/case-studies/${cs.slug}`}
              className="inline-flex items-center justify-center gap-1.5 self-start rounded-full px-5 py-2.5 font-[family-name:var(--font-inter-tight)] text-[13px] font-semibold text-white no-underline transition-opacity hover:opacity-95 sm:self-auto"
              style={{
                background: cs.accentColor,
                boxShadow: `0 0 20px ${cs.accentColor}4d`,
              }}
            >
              Read Full Case Study →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
