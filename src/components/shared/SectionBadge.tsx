import type { ReactNode } from "react";

type SectionBadgeProps = {
  children: ReactNode;
  className?: string;
};

export const SectionBadge = ({ children, className = "" }: SectionBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border2 bg-bg3/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-pm2 ${className}`}
    >
      {children}
    </span>
  );
};
