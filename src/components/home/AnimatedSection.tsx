"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export const AnimatedSection = ({ children, className = "w-full" }: AnimatedSectionProps) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial={prefersReduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
};
