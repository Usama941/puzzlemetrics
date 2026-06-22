"use client";

import { useEffect, useState } from "react";

export const useMaxWidth = (maxPx: number): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mq = window.matchMedia(`(max-width: ${maxPx}px)`);
    const update = (): void => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [maxPx]);

  return matches;
};
