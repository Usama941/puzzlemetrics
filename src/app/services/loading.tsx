import { SkeletonBlock, SkeletonPill } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div style={{ background: "var(--bg-secondary)", minHeight: "100vh" }}>
      <div style={{ padding: "88px 24px 72px", textAlign: "center", borderBottom: "1px solid var(--border-color)" }}>
        <SkeletonPill width={110} />
        <SkeletonBlock width={500} height={60} style={{ margin: "20px auto 16px" }} />
        <SkeletonBlock width={380} height={20} style={{ margin: "0 auto 36px" }} />
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {[90, 100, 120, 150, 120, 130, 100].map((w, i) => (
            <SkeletonBlock key={i} width={w} height={36} style={{ borderRadius: 9999 }} />
          ))}
        </div>
      </div>
      <div style={{ background: "var(--bg-primary)", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <SkeletonBlock width={400} height={40} style={{ margin: "0 auto 14px" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 20,
                  padding: 32,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                  <SkeletonBlock width={40} height={22} style={{ borderRadius: 9999 }} />
                  <SkeletonBlock width={44} height={44} style={{ borderRadius: 12 }} />
                </div>
                <SkeletonBlock width={160} height={20} style={{ marginBottom: 8 }} />
                <SkeletonBlock width={200} height={14} style={{ marginBottom: 14 }} />
                <SkeletonBlock width="100%" height={13} style={{ marginBottom: 5 }} />
                <SkeletonBlock width="90%" height={13} style={{ marginBottom: 5 }} />
                <SkeletonBlock width="75%" height={13} style={{ marginBottom: 20 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
