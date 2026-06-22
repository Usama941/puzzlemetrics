"use client";

import { useEffect, useRef, useState } from "react";

type UseCountUpOptions = {
  durationMs?: number;
};

export const useCountUp = (
  end: number,
  options?: UseCountUpOptions,
): { ref: React.RefObject<HTMLSpanElement | null>; display: string } => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const durationMs = options?.durationMs ?? 1600;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }
    const el = ref.current;
    if (!el) {
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }
        const startTs = performance.now();
        const from = 0;
        const tick = (now: number): void => {
          const t = Math.min(1, (now - startTs) / durationMs);
          const eased = 1 - (1 - t) ** 3;
          setValue(from + (end - from) * eased);
          if (t < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            setValue(end);
          }
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      io.disconnect();
    };
  }, [durationMs, end]);

  const display = Math.round(value).toLocaleString();

  return { ref, display };
};
