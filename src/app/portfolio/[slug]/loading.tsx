import { SkeletonBlock, SkeletonPill } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div style={{ padding: "64px 24px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <SkeletonPill width={100} />
        <SkeletonBlock width="70%" height={48} style={{ margin: "20px 0 12px" }} />
        <SkeletonBlock width={340} height={16} style={{ marginBottom: 36 }} />
        <SkeletonBlock width="100%" height={320} style={{ borderRadius: 20, marginBottom: 40 }} />
        <SkeletonBlock width="100%" height={14} style={{ marginBottom: 8 }} />
        <SkeletonBlock width="95%" height={14} style={{ marginBottom: 8 }} />
        <SkeletonBlock width="80%" height={14} />
      </div>
    </div>
  );
}
