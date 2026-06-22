import { SkeletonBlock, SkeletonPill } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <article style={{ maxWidth: 760, margin: "0 auto", padding: "72px 24px 96px" }}>
        <SkeletonPill width={100} />
        <SkeletonBlock width="90%" height={40} style={{ margin: "20px 0 12px" }} />
        <SkeletonBlock width={200} height={14} style={{ marginBottom: 32 }} />
        <SkeletonBlock width="100%" height={14} style={{ marginBottom: 10 }} />
        <SkeletonBlock width="100%" height={14} style={{ marginBottom: 10 }} />
        <SkeletonBlock width="88%" height={14} style={{ marginBottom: 24 }} />
        <SkeletonBlock width="100%" height={14} style={{ marginBottom: 10 }} />
        <SkeletonBlock width="95%" height={14} />
      </article>
    </div>
  );
}
