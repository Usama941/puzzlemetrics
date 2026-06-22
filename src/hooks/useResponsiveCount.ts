"use client";

import { useEffect, useState } from "react";

/** Returns a count that updates at sm (640px), md (768px), and lg (1024px) breakpoints. */
export const useResponsiveCount = (mobile: number, tablet: number, desktop: number): number => {
  const [count, setCount] = useState(mobile);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(mobile);
      else if (w < 1024) setCount(tablet);
      else setCount(desktop);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [mobile, tablet, desktop]);

  return count;
};
