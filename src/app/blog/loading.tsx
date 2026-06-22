import { SkeletonBlock, SkeletonPill } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div
        style={{
          background: "var(--bg-secondary)",
          padding: "88px 24px 72px",
          textAlign: "center",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <SkeletonPill width={180} />
        <SkeletonBlock width={500} height={64} style={{ margin: "20px auto 16px" }} />
        <SkeletonBlock width={380} height={20} style={{ margin: "0 auto" }} />
      </div>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 56, flexWrap: "wrap" }}>
          {[80, 100, 90, 130, 110, 80, 90].map((w, i) => (
            <SkeletonBlock key={i} width={w} height={38} style={{ borderRadius: 9999 }} />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[...Array(6)].map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogCardSkeleton() {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <SkeletonBlock width="100%" height={4} style={{ borderRadius: 0 }} />
      <div style={{ padding: "22px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <SkeletonBlock width={80} height={22} style={{ borderRadius: 9999 }} />
          <SkeletonBlock width={60} height={14} />
        </div>
        <SkeletonBlock width="95%" height={18} style={{ marginBottom: 6 }} />
        <SkeletonBlock width="75%" height={18} style={{ marginBottom: 14 }} />
        <SkeletonBlock width="100%" height={14} style={{ marginBottom: 6 }} />
        <SkeletonBlock width="85%" height={14} style={{ marginBottom: 20 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 16,
            borderTop: "1px solid var(--border-color)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SkeletonBlock width={28} height={28} style={{ borderRadius: "50%" }} />
            <SkeletonBlock width={80} height={12} />
          </div>
          <SkeletonBlock width={60} height={12} />
        </div>
      </div>
    </div>
  );
}
