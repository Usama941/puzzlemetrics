import type { Metadata } from "next";
import Link from "next/link";
import BookingButton from "@/components/booking/BookingButton";
import { ProductSection } from "@/components/products/ProductSection";
import { getProducts } from "@/lib/db-cache";

export const metadata: Metadata = {
  title: "Products — PuzzleMetrics",
  description:
    "City Rosters and Lead Gen Platform — two live AI-powered products built in-house by PuzzleMetrics.",
};

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

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
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

      {products.map((product, index) => (
        <ProductSection key={product.id} product={product} index={index} />
      ))}

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
