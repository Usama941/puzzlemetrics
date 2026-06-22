import { SkeletonBlock, SkeletonPill } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <div style={{ padding: "100px 24px", textAlign: "center" }}>
        <SkeletonPill width={140} />
        <SkeletonBlock width={560} height={56} style={{ margin: "20px auto 16px" }} />
        <SkeletonBlock width={380} height={56} style={{ margin: "0 auto 20px" }} />
        <SkeletonBlock width={480} height={20} style={{ margin: "0 auto 10px" }} />
        <SkeletonBlock width={360} height={20} style={{ margin: "0 auto" }} />
      </div>
    </div>
  );
}
