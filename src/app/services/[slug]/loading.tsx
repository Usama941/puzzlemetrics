import { SkeletonBlock, SkeletonPill } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div style={{ background: "var(--bg-secondary)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 96px" }}>
        <SkeletonPill width={90} />
        <SkeletonBlock width="75%" height={44} style={{ margin: "20px 0 16px" }} />
        <SkeletonBlock width="60%" height={18} style={{ marginBottom: 40 }} />
        <div style={{ display: "grid", gap: 16 }}>
          <SkeletonBlock width="100%" height={120} style={{ borderRadius: 16 }} />
          <SkeletonBlock width="100%" height={14} style={{ marginBottom: 6 }} />
          <SkeletonBlock width="100%" height={14} style={{ marginBottom: 6 }} />
          <SkeletonBlock width="78%" height={14} />
        </div>
      </div>
    </div>
  );
}
