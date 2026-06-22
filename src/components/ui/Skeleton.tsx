"use client";

interface SkeletonBlockProps {
  width: number | string;
  height: number | string;
  style?: React.CSSProperties;
}

export function SkeletonBlock({ width, height, style = {} }: SkeletonBlockProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 8,
        background:
          "linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        ...style,
      }}
    />
  );
}

export function SkeletonPill({ width }: { width: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SkeletonBlock width={width} height={28} style={{ borderRadius: 9999, margin: "0 auto" }} />
    </div>
  );
}
