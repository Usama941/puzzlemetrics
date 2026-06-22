"use client";

import { useEffect } from "react";

type LoaderScreenProps = {
  onComplete?: () => void;
};

export default function LoaderScreen({ onComplete }: LoaderScreenProps) {
  useEffect(() => {
    const id = window.setTimeout(() => {
      onComplete?.();
    }, 400);
    return () => window.clearTimeout(id);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#08071A]"
      role="status"
      aria-label="Loading"
    >
      <span className="font-syne text-xl font-extrabold text-[#FAFAFE]">PuzzleMetrics</span>
    </div>
  );
}
