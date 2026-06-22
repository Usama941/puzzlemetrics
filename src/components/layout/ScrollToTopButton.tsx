"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUp } from "lucide-react";

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={prefersReduced ? undefined : { opacity: 0, scale: 0.92 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 right-8 z-[150] flex h-10 w-10 items-center justify-center rounded-full bg-[#6055D9] text-white shadow-[0_4px_24px_rgba(96,85,217,0.45)] transition-[background-color,box-shadow] duration-200 ease-out hover:bg-[#7B6EE8] hover:shadow-[0_6px_28px_rgba(96,85,217,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6055D9]"
          onClick={scrollUp}
        >
          <ChevronUp className="h-5 w-5" strokeWidth={2.25} aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};
