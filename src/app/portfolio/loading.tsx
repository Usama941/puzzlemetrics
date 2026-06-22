import { SkeletonBlock, SkeletonPill } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div style={{ padding: "96px 24px 80px", textAlign: "center", borderBottom: "1px solid var(--border-color)" }}>
        <SkeletonPill width={160} />
        <SkeletonBlock width={540} height={64} style={{ margin: "20px auto 16px" }} />
        <SkeletonBlock width={400} height={20} style={{ margin: "0 auto 36px" }} />
        <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <SkeletonBlock width={56} height={32} style={{ margin: "0 auto 6px" }} />
              <SkeletonBlock width={80} height={12} style={{ margin: "0 auto" }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "var(--bg-secondary)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 56, flexWrap: "wrap" }}>
            {[60, 90, 100, 130, 120, 130].map((w, i) => (
              <SkeletonBlock key={i} width={w} height={38} style={{ borderRadius: 9999 }} />
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <SkeletonBlock width="100%" height={220} style={{ borderRadius: 0 }} />
                <div style={{ padding: "20px 22px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <SkeletonBlock width={80} height={12} />
                    <SkeletonBlock width={70} height={12} />
                  </div>
                  <SkeletonBlock width="90%" height={20} style={{ marginBottom: 6 }} />
                  <SkeletonBlock width="100%" height={13} style={{ marginBottom: 5 }} />
                  <SkeletonBlock width="80%" height={13} style={{ marginBottom: 16 }} />
                  <div style={{ display: "flex", gap: 5 }}>
                    {[50, 60, 55].map((w, j) => (
                      <SkeletonBlock key={j} width={w} height={20} style={{ borderRadius: 9999 }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
