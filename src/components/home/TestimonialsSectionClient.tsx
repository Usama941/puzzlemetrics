"use client";

import type { Testimonial } from "@prisma/client";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { useResponsiveCount } from "@/hooks/useResponsiveCount";
import { headerViewProps } from "@/lib/motion-helpers";

const AUTO_MS = 4000;

function chunkReviews(reviews: Testimonial[], perSet: number): Testimonial[][] {
  const sets: Testimonial[][] = [];
  for (let i = 0; i < reviews.length; i += perSet) {
    sets.push(reviews.slice(i, i + perSet));
  }
  return sets;
}

export function TestimonialsSectionClient({ reviews }: { reviews: Testimonial[] }) {
  const prefersReduced = useReducedMotion();
  const perSet = useResponsiveCount(1, 2, 3);
  const sets = useMemo(() => chunkReviews(reviews, perSet), [reviews, perSet]);
  const [currentSet, setCurrentSet] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCurrentSet(0);
  }, [perSet, reviews]);

  const goTo = useCallback(
    (index: number) => {
      if (sets.length === 0) return;
      const next = ((index % sets.length) + sets.length) % sets.length;
      setCurrentSet(next);
    },
    [sets.length],
  );

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (prefersReduced || sets.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % sets.length);
    }, AUTO_MS);
  }, [prefersReduced, sets.length]);

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetInterval]);

  const handlePrev = () => {
    goTo(currentSet - 1);
    resetInterval();
  };

  const handleNext = () => {
    goTo(currentSet + 1);
    resetInterval();
  };

  const handleDot = (index: number) => {
    goTo(index);
    resetInterval();
  };

  if (reviews.length === 0) return null;

  const activeReviews = sets[currentSet] ?? [];

  const gridClass =
    perSet === 1 ? "grid-cols-1" : perSet === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="testimonials" className="overflow-x-hidden bg-[var(--bg-card)] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1160px] px-4 text-center sm:px-6">
        <motion.header {...headerViewProps(prefersReduced)} className="flex flex-col items-center">
          <span className="mb-4 inline-flex rounded-[9999px] border-[0.5px] border-[rgba(96,85,217,0.3)] bg-[rgba(96,85,217,0.12)] px-4 py-[5px] text-[12px] font-semibold uppercase tracking-[0.06em] text-[#7B6EE8]">
            Testimonials
          </span>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-[clamp(1.5rem,4vw,2.625rem)] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
            What Our Users Are Saying
          </h2>
          <p className="mb-8 mt-4 max-w-[480px] font-[family-name:var(--font-inter-tight)] text-[clamp(14px,2.5vw,15px)] font-normal leading-[1.7] text-[var(--text-secondary)] sm:mb-10 md:mb-12">
            From solo founders to enterprise teams, PuzzleMetrics is helping businesses automate smarter every day.
          </p>
        </motion.header>

        <div className="relative mx-auto w-full max-w-[1100px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSet}-${perSet}`}
              initial={prefersReduced ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: prefersReduced ? 0 : 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className={`grid ${gridClass} gap-4 sm:gap-5`}
            >
              {activeReviews.map((r) => (
                <TestimonialCard key={r.id} review={r} />
              ))}
            </motion.div>
          </AnimatePresence>

          {sets.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8 sm:gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonials"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--border-brand)] hover:text-[var(--text-primary)] sm:h-10 sm:w-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {sets.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleDot(i)}
                    aria-label={`Go to testimonial set ${i + 1}`}
                    aria-current={i === currentSet ? "true" : undefined}
                    className={`h-2.5 rounded-full transition-all duration-200 ${
                      i === currentSet ? "w-7 bg-[#6055D9]" : "w-2.5 bg-[var(--border-color)] hover:bg-[#6055D9]/50"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonials"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--border-brand)] hover:text-[var(--text-primary)] sm:h-10 sm:w-10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 sm:mt-10">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--pm)] px-5 py-2.5 font-[family-name:var(--font-inter-tight)] text-sm font-semibold text-[var(--pm)] no-underline transition-all duration-200 hover:bg-[rgba(96,85,217,0.08)] sm:px-7 sm:py-3"
          >
            See All Testimonials →
          </Link>
        </div>
      </div>
    </section>
  );
}
