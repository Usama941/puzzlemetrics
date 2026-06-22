import type { Metadata } from "next";
import Link from "next/link";
import BookingButton from "@/components/booking/BookingButton";

export const metadata: Metadata = {
  title: "Products — PuzzleMetrics",
  description:
    "City Rosters and Lead Gen Platform — two live AI-powered products built in-house by PuzzleMetrics.",
};

const checkIcon = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6055D9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-[rgba(96,85,217,0.15)] bg-[rgba(96,85,217,0.08)]"
      aria-hidden
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6055D9" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      {/* —— HERO —— */}
      <section
        className="relative overflow-hidden px-6 pb-20 pt-[100px] text-center"
        style={{
          background: "linear-gradient(160deg, #0A0814 0%, #130F2A 40%, #1A1040 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-90"
          style={{ background: "radial-gradient(circle, rgba(96,85,217,0.18) 0%, transparent 65%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full opacity-90"
          style={{ background: "radial-gradient(circle, rgba(96,85,217,0.12) 0%, transparent 65%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96,85,217,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(96,85,217,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-[1] mx-auto max-w-[720px]">
          <span
            className="mb-5 inline-block rounded-full border px-4 py-1.5 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.08em] text-[#7B6EE8]"
            style={{
              background: "rgba(96,85,217,0.15)",
              borderColor: "rgba(96,85,217,0.35)",
              borderWidth: 1,
            }}
          >
            LIVE PRODUCTS
          </span>
          <h1 className="mb-[18px] font-[family-name:var(--font-inter-tight)] text-[clamp(38px,5vw,56px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
            Products We&apos;ve Shipped
          </h1>
          <p className="mx-auto mb-9 max-w-[520px] font-[family-name:var(--font-inter-tight)] text-[17px] font-normal leading-[1.7] text-[rgba(255,255,255,0.6)]">
            Two live AI-powered platforms — built in-house, running in production across 5 global markets. Real users. Real revenue.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span
              className="inline-flex items-center rounded-full border px-[18px] py-2 font-[family-name:var(--font-inter-tight)] text-[13px] font-medium text-[rgba(255,255,255,0.75)]"
              style={{
                background: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.12)",
                borderWidth: 1,
              }}
            >
              🟢 1,200+ Active Users
            </span>
            <span
              className="inline-flex items-center rounded-full border px-[18px] py-2 font-[family-name:var(--font-inter-tight)] text-[13px] font-medium text-[rgba(255,255,255,0.75)]"
              style={{
                background: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.12)",
                borderWidth: 1,
              }}
            >
              🌍 5 Global Markets
            </span>
          </div>
        </div>
      </section>

      {/* —— CITY ROSTERS —— */}
      <section className="bg-[var(--bg-primary)] px-6 py-24">
        <div className="mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.1)] px-3 py-1 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.08em] text-[#22C55E]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                </span>
                LIVE
              </span>
              <span className="font-[family-name:var(--font-inter-tight)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                PRODUCT 01
              </span>
            </div>
            <h2 className="mb-3.5 font-[family-name:var(--font-inter-tight)] text-[clamp(32px,4vw,46px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)]">
              City Rosters
            </h2>
            <p className="mb-[18px] font-[family-name:var(--font-inter-tight)] text-[18px] font-medium text-[#6055D9]">
              The AI-powered sports management platform
            </p>
            <p className="mb-8 font-[family-name:var(--font-inter-tight)] text-[15px] font-normal leading-[1.7] text-[var(--text-secondary)]">
              City Rosters gives sports clubs, academies, and coaches a single platform to manage rosters, schedules, player payments, and
              performance analytics. AI powers smart scheduling, player matching, and financial reporting.
            </p>
            <ul className="mb-8 space-y-2.5">
              {[
                "Smart roster & schedule management",
                "AI-powered player performance analytics",
                "Integrated payment processing",
                "Multi-club & multi-market support",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 font-[family-name:var(--font-inter-tight)] text-[14px] text-[var(--text-secondary)]">
                  <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[rgba(96,85,217,0.2)] bg-[rgba(96,85,217,0.1)]">
                    {checkIcon}
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mb-8 flex flex-wrap gap-7 border-t border-[var(--border-color)] pt-7">
              {[
                { n: "1,200+", l: "Active Users" },
                { n: "5", l: "Global Markets" },
                { n: "3+", l: "Years Running" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-[family-name:var(--font-inter-tight)] text-[26px] font-extrabold tracking-[-0.02em] text-[#6055D9]">{s.n}</div>
                  <div className="mt-0.5 font-[family-name:var(--font-inter-tight)] text-[12px] font-normal uppercase tracking-[0.06em] text-[var(--text-muted)]">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <BookingButton
              source="products-city-rosters"
              className="inline-flex items-center gap-2 rounded-full bg-[#6055D9] px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-white shadow-[0_0_24px_rgba(96,85,217,0.35)] transition-opacity duration-200 hover:opacity-95"
              style={{ textDecoration: "none" }}
            >
              Explore City Rosters →
            </BookingButton>
          </div>

          <div
            className="overflow-hidden rounded-[20px] border border-[rgba(96,85,217,0.12)] bg-[#F8F9FF] shadow-[0_24px_64px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] dark:border-[rgba(96,85,217,0.2)]"
          >
            <div className="flex items-center gap-2 bg-[#EEEEF8] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
              <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 font-[family-name:var(--font-inter-tight)] text-[11px] text-[rgba(0,0,0,0.35)]">
                app.cityrosters.com
              </div>
            </div>
            <div className="bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-[family-name:var(--font-inter-tight)] text-[14px] font-bold text-[#0a0a14]">City Rosters Dashboard</span>
                <span className="flex items-center gap-1 font-[family-name:var(--font-inter-tight)] text-[11px] text-[#22C55E]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  Live
                </span>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-2.5">
                {[
                  { n: "284", l: "Players" },
                  { n: "12", l: "Clubs" },
                  { n: "98%", l: "Uptime" },
                ].map((x) => (
                  <div key={x.l} className="rounded-[10px] bg-[#F4F3FD] p-3">
                    <div className="font-[family-name:var(--font-inter-tight)] text-[18px] font-bold text-[#6055D9]">{x.n}</div>
                    <div className="mt-0.5 font-[family-name:var(--font-inter-tight)] text-[10px] uppercase tracking-[0.05em] text-[rgba(0,0,0,0.45)]">
                      {x.l}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-3 rounded-[10px] bg-[#F4F3FD] p-3">
                <div className="mb-2 font-[family-name:var(--font-inter-tight)] text-[9px] font-semibold uppercase tracking-wide text-[#6055D9]">
                  UPCOMING MATCHES
                </div>
                {[
                  ["Lions FC vs Eagles", "Today 3PM"],
                  ["Tigers vs Wolves", "Fri 5PM"],
                  ["Hawks vs Bears", "Sat 11AM"],
                ].map(([a, b]) => (
                  <div key={a} className="flex justify-between border-b border-[rgba(0,0,0,0.06)] py-1.5 last:border-0">
                    <span className="font-[family-name:var(--font-inter-tight)] text-[12px] text-[#0a0a14]">{a}</span>
                    <span className="font-[family-name:var(--font-inter-tight)] text-[11px] text-[rgba(0,0,0,0.45)]">{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="flex-1 rounded-[10px] bg-[#F4F3FD] px-3 py-2.5">
                  <div className="font-[family-name:var(--font-inter-tight)] text-[16px] font-bold text-[#0a0a14]">£12,450</div>
                  <div className="font-[family-name:var(--font-inter-tight)] text-[10px] text-[rgba(0,0,0,0.45)]">Revenue MTD</div>
                </div>
                <div className="flex-1 rounded-[10px] bg-[#F4F3FD] px-3 py-2.5">
                  <div className="font-[family-name:var(--font-inter-tight)] text-[16px] font-bold text-[#22C55E]">94%</div>
                  <div className="font-[family-name:var(--font-inter-tight)] text-[10px] text-[rgba(0,0,0,0.45)]">Payment Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* —— LEAD GEN —— */}
      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-24">
        <div className="mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
          <div className="order-2 overflow-hidden rounded-[20px] border border-[rgba(14,165,233,0.15)] bg-[#F5FAFF] shadow-[0_24px_64px_rgba(14,165,233,0.08),0_0_0_1px_rgba(14,165,233,0.06)] lg:order-1">
            <div className="flex items-center gap-2 bg-[#E8F4FC] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
              <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 font-[family-name:var(--font-inter-tight)] text-[11px] text-[rgba(0,0,0,0.35)]">
                app.leadgen.puzzlemetrics.com
              </div>
            </div>
            <div className="bg-white p-5">
              <div className="mb-3.5 flex items-center justify-between">
                <span className="font-[family-name:var(--font-inter-tight)] text-[14px] font-bold text-[#0a0a14]">AI Lead Engine</span>
                <span className="font-[family-name:var(--font-inter-tight)] text-[11px] text-[#22C55E]">
                  Live · Scoring active
                </span>
              </div>
              <div className="mb-3.5">
                <div className="mb-1 font-[family-name:var(--font-inter-tight)] text-[11px] uppercase text-[rgba(0,0,0,0.45)]">
                  Today&apos;s Pipeline Score
                </div>
                <div className="mb-2 flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-inter-tight)] text-[32px] font-extrabold text-[#0EA5E9]">94</span>
                  <span className="font-[family-name:var(--font-inter-tight)] text-[16px] text-[rgba(0,0,0,0.35)]">/100</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#EFF6FF]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "94%",
                      background: "linear-gradient(90deg, #0EA5E9, #6055D9)",
                    }}
                  />
                </div>
              </div>
              <div className="mb-3 overflow-hidden rounded-[10px] border border-[rgba(0,0,0,0.06)]">
                <div className="grid grid-cols-3 gap-0 bg-[#F0F9FF] px-3 py-2 font-[family-name:var(--font-inter-tight)] text-[10px] font-medium uppercase tracking-wide text-[rgba(0,0,0,0.45)]">
                  <span>Company</span>
                  <span className="text-center">Score</span>
                  <span className="text-right">Status</span>
                </div>
                {(
                  [
                    ["Acme Corp", "97", "Hot Lead", "text-[#22C55E]", "bg-[#DCFCE7] text-[#166534]"],
                    ["TechFlow Ltd", "84", "Qualified", "text-[#CA8A04]", "bg-[#FEF9C3] text-[#854D0E]"],
                    ["DataSync Inc", "71", "Nurturing", "text-[#0EA5E9]", "bg-[#E0F2FE] text-[#0369A1]"],
                  ] as const
                ).map(([co, sc, st, scCol, pill], i) => (
                  <div
                    key={co}
                    className={`grid grid-cols-3 items-center border-t border-[rgba(0,0,0,0.06)] px-3 py-2.5 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFEFF]"}`}
                  >
                    <span className="font-[family-name:var(--font-inter-tight)] text-[12px] text-[#0a0a14]">{co}</span>
                    <span className={`text-center font-[family-name:var(--font-inter-tight)] text-[12px] font-semibold ${scCol}`}>{sc}</span>
                    <span className="text-right">
                      <span className={`inline-block rounded-full px-2 py-0.5 font-[family-name:var(--font-inter-tight)] text-[10px] font-medium ${pill}`}>{st}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <div className="rounded-lg bg-[#F0F9FF] px-3 py-2">
                  <div className="font-[family-name:var(--font-inter-tight)] text-[14px] font-bold text-[#0EA5E9]">1,247</div>
                  <div className="font-[family-name:var(--font-inter-tight)] text-[10px] text-[rgba(0,0,0,0.45)]">Leads Today</div>
                </div>
                <div className="rounded-lg bg-[#F0F9FF] px-3 py-2">
                  <div className="font-[family-name:var(--font-inter-tight)] text-[14px] font-bold text-[#22C55E]">340%</div>
                  <div className="font-[family-name:var(--font-inter-tight)] text-[10px] text-[rgba(0,0,0,0.45)]">Avg ROAS</div>
                </div>
                <div className="rounded-lg bg-[#F0F9FF] px-3 py-2">
                  <div className="font-[family-name:var(--font-inter-tight)] text-[14px] font-bold text-[#6055D9]">2.4s</div>
                  <div className="font-[family-name:var(--font-inter-tight)] text-[10px] text-[rgba(0,0,0,0.45)]">Response</div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(14,165,233,0.25)] bg-[rgba(14,165,233,0.1)] px-3 py-1 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.08em] text-[#0EA5E9]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0EA5E9] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0EA5E9]" />
                </span>
                LIVE
              </span>
              <span className="font-[family-name:var(--font-inter-tight)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                PRODUCT 02
              </span>
            </div>
            <h2 className="mb-3.5 font-[family-name:var(--font-inter-tight)] text-[clamp(32px,4vw,46px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)]">
              Lead Gen Platform
            </h2>
            <p className="mb-[18px] font-[family-name:var(--font-inter-tight)] text-[18px] font-medium text-[#0EA5E9]">
              AI that finds, qualifies, and nurtures leads automatically
            </p>
            <p className="mb-8 font-[family-name:var(--font-inter-tight)] text-[15px] font-normal leading-[1.7] text-[var(--text-secondary)]">
              Our proprietary lead generation platform uses AI scoring models to identify high-intent prospects, qualify them in real-time, and
              trigger automated nurture sequences — all without manual intervention.
            </p>
            <ul className="mb-8 space-y-2.5">
              {[
                "AI-powered lead scoring (40+ signals)",
                "Real-time qualification & enrichment",
                "Automated multi-channel nurture sequences",
                "CRM integration & live reporting",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 font-[family-name:var(--font-inter-tight)] text-[14px] text-[var(--text-secondary)]">
                  <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[rgba(96,85,217,0.2)] bg-[rgba(96,85,217,0.1)]">
                    {checkIcon}
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mb-8 flex flex-wrap gap-7 border-t border-[var(--border-color)] pt-7">
              {[
                { n: "10,000+", l: "Monthly Leads" },
                { n: "340%", l: "Avg ROAS Lift" },
                { n: "Zero", l: "Manual Work" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-[family-name:var(--font-inter-tight)] text-[26px] font-extrabold tracking-[-0.02em] text-[#0EA5E9]">{s.n}</div>
                  <div className="mt-0.5 font-[family-name:var(--font-inter-tight)] text-[12px] font-normal uppercase tracking-[0.06em] text-[var(--text-muted)]">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <BookingButton
              source="products-lead-gen"
              className="inline-flex items-center gap-2 rounded-full bg-[#0EA5E9] px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-white shadow-[0_0_24px_rgba(14,165,233,0.35)] transition-opacity duration-200 hover:opacity-95"
              style={{ textDecoration: "none" }}
            >
              Explore Lead Gen →
            </BookingButton>
          </div>
        </div>
      </section>

      {/* —— SHARED CAPABILITIES —— */}
      <section className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-[88px]">
        <div className="mx-auto max-w-[1160px] text-center">
          <span className="mb-3 inline-block font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.1em] text-[#6055D9]">
            WHAT POWERS THEM
          </span>
          <h2 className="mb-3 font-[family-name:var(--font-inter-tight)] text-[clamp(26px,3.5vw,36px)] font-extrabold tracking-[-0.025em] text-[var(--text-primary)]">
            Built on the same AI foundation
          </h2>
          <p className="mx-auto max-w-[560px] font-[family-name:var(--font-inter-tight)] text-[15px] leading-[1.65] text-[var(--text-secondary)]">
            Both platforms share our core AI infrastructure — battle-tested across 5 markets and 1,200+ users.
          </p>
        </div>

        <div className="mx-auto mt-[52px] grid max-w-[960px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "AI Decision Engine",
              body: "Custom ML models trained on your domain data, making autonomous decisions at scale.",
              icon: (
                <>
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
                </>
              ),
            },
            {
              title: "99.9% Uptime SLA",
              body: "Production-grade infrastructure with auto-scaling, failover, and 24/7 monitoring.",
              icon: (
                <>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </>
              ),
            },
            {
              title: "Multi-Market Ready",
              body: "Localised for UK, US, EU, UAE and Pakistan — currencies, compliance, and timezones built in.",
              icon: (
                <>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </>
              ),
            },
            {
              title: "Real-Time Processing",
              body: "Sub-second response times with event-driven architecture processing millions of operations daily.",
              icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
            },
            {
              title: "Enterprise Security",
              body: "SOC2-aligned, end-to-end encryption, role-based access control, and audit logging.",
              icon: (
                <>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </>
              ),
            },
            {
              title: "Live Analytics",
              body: "Unified dashboards showing real-time KPIs, trend analysis, and AI-generated insights.",
              icon: (
                <>
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </>
              ),
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(96,85,217,0.3)] hover:shadow-[0_8px_24px_rgba(96,85,217,0.08)]"
            >
              <FeatureIcon>{card.icon}</FeatureIcon>
              <h3 className="mb-2 mt-4 font-[family-name:var(--font-inter-tight)] text-[16px] font-bold text-[var(--text-primary)]">{card.title}</h3>
              <p className="font-[family-name:var(--font-inter-tight)] text-[13px] leading-[1.65] text-[var(--text-secondary)]">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* —— STATS BAND —— */}
      <section className="relative overflow-hidden px-6 py-16" style={{ background: "linear-gradient(135deg, #6055D9 0%, #4038B0 50%, #5048C8 100%)" }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-[1] mx-auto grid max-w-[900px] grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.12)] md:grid-cols-4">
          {[
            ["1,200+", "PLATFORM USERS"],
            ["10,000+", "MONTHLY LEADS"],
            ["5", "GLOBAL MARKETS"],
            ["99.9%", "UPTIME SLA"],
          ].map(([num, lab]) => (
            <div key={lab} className="bg-transparent px-5 py-9 text-center md:px-5">
              <div className="font-[family-name:var(--font-inter-tight)] text-[clamp(36px,6vw,48px)] font-extrabold leading-none tracking-[-0.03em] text-white">
                {num}
              </div>
              <div className="mt-2 font-[family-name:var(--font-inter-tight)] text-[11px] font-medium uppercase tracking-[0.1em] text-[rgba(255,255,255,0.6)]">
                {lab}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* —— CTA —— */}
      <section className="bg-[var(--bg-secondary)] px-6 py-[88px] text-center">
        <div className="relative mx-auto max-w-[780px] overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-8 py-16 shadow-[0_4px_32px_rgba(96,85,217,0.06)] sm:px-12">
          <div
            className="pointer-events-none absolute left-1/2 top-[-40%] h-[500px] w-[500px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(96,85,217,0.07) 0%, transparent 65%)" }}
          />
          <div className="relative z-[1]">
            <span className="mb-3 inline-block font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.1em] text-[#6055D9]">
              WANT YOUR OWN?
            </span>
            <h2 className="mb-3 font-[family-name:var(--font-inter-tight)] text-[clamp(24px,3.5vw,32px)] font-extrabold tracking-[-0.02em] text-[var(--text-primary)]">
              We build AI products for your business too.
            </h2>
            <p className="mx-auto max-w-[520px] font-[family-name:var(--font-inter-tight)] text-[15px] leading-[1.65] text-[var(--text-secondary)]">
              Our platforms are proof. If you have a problem worth solving with AI, we can design, build, and ship it.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <BookingButton
                source="products-cta"
                className="inline-flex items-center justify-center rounded-full bg-[#6055D9] px-8 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-white transition-opacity duration-200 hover:opacity-95"
                style={{ textDecoration: "none" }}
              >
                Start a Project →
              </BookingButton>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border-color)] bg-transparent px-8 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-[var(--text-primary)] transition-colors duration-200 hover:border-[rgba(96,85,217,0.35)]"
              >
                See Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
