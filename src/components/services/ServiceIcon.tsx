import type { ReactElement } from "react";

export type ServiceIconName = "agent" | "search" | "zap" | "workflow" | "chart" | "code" | "compass";

export function ServiceIcon({ name, color, size = 22 }: { name: ServiceIconName | string; color: string; size?: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: color,
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  const icons: Record<ServiceIconName, ReactElement> = {
    agent: (
      <svg {...props}>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <line x1="10" y1="7" x2="14" y2="7" />
        <line x1="10" y1="17" x2="14" y2="17" />
        <line x1="7" y1="10" x2="7" y2="14" />
        <line x1="17" y1="10" x2="17" y2="14" />
      </svg>
    ),
    search: (
      <svg {...props}>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
        <line x1="8" y1="11" x2="14" y2="11" />
        <line x1="11" y1="8" x2="11" y2="14" />
      </svg>
    ),
    zap: (
      <svg {...props}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    workflow: (
      <svg {...props}>
        <rect x="3" y="3" width="5" height="5" rx="1" />
        <rect x="16" y="3" width="5" height="5" rx="1" />
        <rect x="16" y="16" width="5" height="5" rx="1" />
        <path d="M5.5 8v3a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8" />
        <line x1="18.5" y1="16" x2="18.5" y2="13" />
      </svg>
    ),
    chart: (
      <svg {...props}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
    code: (
      <svg {...props}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    compass: (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  };

  return icons[name as ServiceIconName] ?? icons.agent;
}
