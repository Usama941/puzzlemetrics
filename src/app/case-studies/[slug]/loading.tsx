import { SkeletonBlock, SkeletonPill } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div style={{ padding: "72px 24px 48px", maxWidth: 900, margin: "0 auto" }}>
        <SkeletonPill width={120} />
        <SkeletonBlock width="85%" height={44} style={{ margin: "24px 0 16px" }} />
        <SkeletonBlock width={280} height={16} style={{ marginBottom: 40 }} />
        <SkeletonBlock width="100%" height={200} style={{ marginBottom: 32, borderRadius: 16 }} />
        <SkeletonBlock width="100%" height={14} style={{ marginBottom: 8 }} />
        <SkeletonBlock width="100%" height={14} style={{ marginBottom: 8 }} />
        <SkeletonBlock width="72%" height={14} style={{ marginBottom: 24 }} />
        <SkeletonBlock width="100%" height={14} style={{ marginBottom: 8 }} />
        <SkeletonBlock width="92%" height={14} />
      </div>
    </div>
  );
}
