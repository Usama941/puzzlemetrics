import { SkeletonBlock, SkeletonPill } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div
        style={{
          background: "var(--bg-secondary)",
          padding: "80px 24px 64px",
          textAlign: "center",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <SkeletonPill width={100} />
        <SkeletonBlock width={480} height={52} style={{ margin: "20px auto 16px" }} />
        <SkeletonBlock width={360} height={20} style={{ margin: "0 auto" }} />
      </div>
      <div style={{ padding: "40px 24px", display: "flex", justifyContent: "center", gap: 60 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <SkeletonBlock width={60} height={36} style={{ margin: "0 auto 8px" }} />
            <SkeletonBlock width={100} height={14} style={{ margin: "0 auto" }} />
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {[...Array(8)].map((_, i) => (
            <TeamCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamCardSkeleton() {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <SkeletonBlock width="100%" height={240} style={{ borderRadius: 0 }} />
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <SkeletonBlock width={120} height={16} />
          <div style={{ display: "flex", gap: 6 }}>
            <SkeletonBlock width={28} height={28} style={{ borderRadius: "50%" }} />
            <SkeletonBlock width={28} height={28} style={{ borderRadius: "50%" }} />
          </div>
        </div>
        <SkeletonBlock width={90} height={12} style={{ marginBottom: 10 }} />
        <SkeletonBlock width="100%" height={1} style={{ marginBottom: 10, background: "var(--border-color)" }} />
        <SkeletonBlock width="100%" height={12} style={{ marginBottom: 6 }} />
        <SkeletonBlock width="80%" height={12} style={{ marginBottom: 12 }} />
        <div style={{ display: "flex", gap: 5 }}>
          <SkeletonBlock width={50} height={22} style={{ borderRadius: 9999 }} />
          <SkeletonBlock width={60} height={22} style={{ borderRadius: 9999 }} />
          <SkeletonBlock width={45} height={22} style={{ borderRadius: 9999 }} />
        </div>
      </div>
    </div>
  );
}
