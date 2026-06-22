import { SkeletonBlock, SkeletonPill } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div
        style={{
          background: "var(--bg-secondary)",
          padding: "88px 24px 64px",
          textAlign: "center",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <SkeletonPill width={140} />
        <SkeletonBlock width={520} height={56} style={{ margin: "20px auto 12px" }} />
        <SkeletonBlock width={420} height={18} style={{ margin: "0 auto" }} />
      </div>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: 20,
                padding: 28,
              }}
            >
              <SkeletonBlock width="40%" height={14} style={{ marginBottom: 16 }} />
              <SkeletonBlock width="90%" height={24} style={{ marginBottom: 10 }} />
              <SkeletonBlock width="100%" height={14} style={{ marginBottom: 6 }} />
              <SkeletonBlock width="85%" height={14} style={{ marginBottom: 20 }} />
              <SkeletonBlock width={120} height={36} style={{ borderRadius: 9999 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
