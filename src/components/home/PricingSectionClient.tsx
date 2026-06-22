"use client";

import type { PricingPlan } from "@prisma/client";
import type { ReactNode } from "react";
import BookingButton from "@/components/booking/BookingButton";
import { motion, useReducedMotion } from "framer-motion";
import { headerViewProps } from "@/lib/motion-helpers";

function CheckRow({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.1)]">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <polyline points="2 5 4 7 8 3" stroke="#22C55E" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="font-[family-name:var(--font-inter-tight)] text-[14px] font-normal leading-[1.5] text-[var(--text-secondary)]">{children}</span>
    </li>
  );
}

function BestFor({ items }: { items: string[] }) {
  return (
    <div className="mb-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3.5">
      <p className="mb-2 font-[family-name:var(--font-inter-tight)] text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">BEST FOR</p>
      <ul className="flex flex-col gap-2">
        {items.map((line) => (
          <li key={line} className="flex gap-2 font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-secondary)]">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6055D9]" aria-hidden />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Quote({ children }: { children: ReactNode }) {
  return (
    <p className="mb-7 border-l-[3px] border-[rgba(96,85,217,0.3)] pl-3 font-[family-name:var(--font-inter-tight)] text-[13px] font-normal italic leading-[1.5] text-[var(--text-muted)]">
      {children}
    </p>
  );
}

const rocketIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6055D9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4.5 16.5c-1.5 1.5-2 4-2 4s2.5-.5 4-2L17 8l-2.5-2.5L4.5 16.5z" />
    <path d="M14.5 5.5l4 4" />
    <path d="M20 4s-1 .5-3 2.5c-.5.5-1 1-1.5 1.7L17 9.5l1.5 1.5c.7-.5 1.2-1 1.7-1.5C22 7.5 20 4 20 4z" />
  </svg>
);

const targetIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6055D9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const chartIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6055D9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

function PlanIcon({ icon }: { icon: string }) {
  if (icon === "target") return targetIcon;
  if (icon === "chart" || icon === "trending-up") return chartIcon;
  return rocketIcon;
}

export function PricingSectionClient({ plans }: { plans: PricingPlan[] }) {
  const prefersReduced = useReducedMotion();

  return (
    <section id="pricing" className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-[100px]">
      <div className="mx-auto max-w-[1160px] text-center">
        <motion.header {...headerViewProps(prefersReduced)} className="mx-auto mb-[60px] flex max-w-[1160px] flex-col items-center">
          <span className="mb-4 inline-flex rounded-full border border-[rgba(96,85,217,0.3)] bg-[rgba(96,85,217,0.12)] px-4 py-1.5 font-[family-name:var(--font-inter-tight)] text-[12px] font-semibold uppercase tracking-[0.06em] text-[#7B6EE8]">
            SIMPLE PRICING
          </span>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-[clamp(32px,5vw,42px)] font-bold leading-tight tracking-[-0.025em] text-[var(--text-primary)]">
            Start where you are. Scale as you grow.
          </h2>
          <p className="mt-4 max-w-[560px] font-[family-name:var(--font-inter-tight)] text-[15px] font-normal leading-[1.7] text-[var(--text-secondary)]">
            Three engagement tiers designed around your stage — from idea to enterprise.
          </p>
        </motion.header>

        <div className="mx-auto grid max-w-[1060px] grid-cols-1 gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const source = `pricing-${plan.id.replace(/^plan-/, "")}`;
            const isFeatured = plan.highlighted;
            return (
              <article
                key={plan.id}
                className={
                  isFeatured
                    ? "relative flex flex-col rounded-[24px] border-2 border-[#6055D9] bg-[var(--bg-card)] px-8 py-9 shadow-[0_0_0_4px_rgba(96,85,217,0.08),0_16px_48px_rgba(96,85,217,0.15)]"
                    : "flex flex-col rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-card)] px-8 py-9"
                }
              >
                {isFeatured ? (
                  <span className="absolute left-1/2 top-[-14px] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#6055D9] px-4 py-1.5 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.06em] text-white">
                    MOST POPULAR
                  </span>
                ) : null}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(96,85,217,0.15)] bg-[rgba(96,85,217,0.08)]">
                  <PlanIcon icon={plan.icon} />
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-inter-tight)] text-[22px] font-bold text-[var(--text-primary)]">{plan.name}</h3>
                <p className="mb-6 mt-1 font-[family-name:var(--font-inter-tight)] text-[14px] text-[var(--text-secondary)]">{plan.tagline}</p>
                {plan.pricePrefix ? (
                  <p className="font-[family-name:var(--font-inter-tight)] text-[15px] text-[var(--text-muted)]">{plan.pricePrefix}</p>
                ) : null}
                <div className="font-[family-name:var(--font-inter-tight)] text-[42px] font-extrabold leading-none tracking-[-0.03em] text-[#6055D9]">{plan.price}</div>
                <p className="mb-7 mt-1.5 font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-muted)]">{plan.delivery}</p>
                <div className="mb-6 h-px w-full bg-[var(--border-color)]" />
                <p className="mb-3.5 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">WHAT YOU GET</p>
                <ul className="mb-7 flex flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <CheckRow key={f}>{f}</CheckRow>
                  ))}
                </ul>
                <BestFor items={plan.bestFor} />
                <Quote>{plan.quote}</Quote>
                <BookingButton
                  source={source}
                  className={
                    isFeatured
                      ? "mt-auto block w-full rounded-full bg-[#6055D9] py-3.5 text-center font-[family-name:var(--font-inter-tight)] text-[14px] font-bold text-white shadow-[0_0_20px_rgba(96,85,217,0.35)] no-underline transition-opacity hover:opacity-95"
                      : "mt-auto block w-full rounded-full border-[1.5px] border-[var(--border-color)] py-3.5 text-center font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-[var(--text-primary)] no-underline transition-colors hover:border-[#6055D9] hover:text-[#6055D9]"
                  }
                  style={{ textDecoration: "none" }}
                >
                  {plan.ctaText}
                </BookingButton>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
