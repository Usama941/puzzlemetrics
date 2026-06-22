const easeDefault = [0.22, 1, 0.36, 1] as const;

/** When `reduced` is true, returns props that show content immediately with no motion. */
export function viewFadeDelay(
  delay: number,
  reduced: boolean | null,
  options?: { amount?: number },
): {
  initial: { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  viewport: { once: boolean; amount: number };
  transition: { duration: number; ease?: readonly [number, number, number, number]; delay?: number };
} {
  const amount = options?.amount ?? 0.2;
  if (reduced) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { duration: 0.6, ease: easeDefault, delay },
  };
}

export function headerViewProps(
  reduced: boolean | null,
  options?: { duration?: number; y?: number; amount?: number },
): {
  initial: { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  transition: { duration: number; ease: readonly [number, number, number, number] };
  viewport: { once: boolean; amount: number };
} {
  const duration = options?.duration ?? 0.5;
  const y = options?.y ?? 24;
  const amount = options?.amount ?? 0.15;
  const ease = [0.25, 0.1, 0.25, 1] as const;
  if (reduced) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0, ease },
      viewport: { once: true, amount },
    };
  }
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration, ease },
    viewport: { once: true, amount },
  };
}
