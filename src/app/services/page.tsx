import type { Metadata } from "next";
import Link from "next/link";
import BookingButton from "@/components/booking/BookingButton";
import ServicesGrid from "@/components/services/ServicesGrid";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { getServicesPublished } from "@/lib/db-cache";

export const metadata: Metadata = {
  title: "Services — PuzzleMetrics",
  description:
    "AI agents, RAG systems, Ads intelligence, and full-stack AI product development. Services built to deliver measurable results.",
};

const PROCESS_STEPS = [
  {
    title: "Discovery",
    body: "We audit your data, systems, and goals to identify where AI creates the most leverage. Deliverable: a prioritised opportunity map.",
  },
  {
    title: "Architecture",
    body: "We design your AI system — models, pipelines, integrations, and infrastructure. Deliverable: a full technical specification.",
  },
  {
    title: "Build",
    body: "We build in two-week sprints with weekly demos. You see progress from day one. Deliverable: working software every sprint.",
  },
  {
    title: "Deploy",
    body: "We launch to production, handle integration, and monitor performance. Deliverable: live system with full monitoring.",
  },
  {
    title: "Optimise",
    body: "We run continuous improvement cycles based on real data. Deliverable: performance reports and iterative improvements.",
  },
] as const;

function IncludeCheck() {
  return (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.1)]">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" aria-hidden stroke="#22C55E" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function RocketIcon({ color, size = 26 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function CalendarIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function TrendingUpIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function UsersIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function GlobeIconSmall({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default async function ServicesPage() {
  const services = await getServicesPublished();

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 pb-[72px] pt-[88px] text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-[-30%] z-0 h-[500px] w-[700px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse, rgba(96,85,217,0.08) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-[1] mx-auto max-w-[800px]">
          <span className="mb-5 inline-block rounded-full border border-[rgba(96,85,217,0.25)] bg-[rgba(96,85,217,0.1)] px-4 py-1.5 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.08em] text-[#6055D9]">
            AI SERVICES
          </span>
          <h1 className="mb-5 font-[family-name:var(--font-inter-tight)] text-[clamp(40px,5.5vw,60px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-[var(--text-primary)]">
            AI that creates
            <br />
            <span className="text-[#6055D9]">measurable results</span>
          </h1>
          <p className="mx-auto max-w-[560px] font-[family-name:var(--font-inter-tight)] text-[17px] font-normal leading-[1.7] text-[var(--text-secondary)]">
            From autonomous AI agents to Ads intelligence — every service we offer is engineered around one metric: your business outcomes.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg-primary)] px-6 py-24">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-14 text-center">
            <p className="mb-3 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.1em] text-[#6055D9]" style={{ fontSize: 11, fontWeight: 700, color: "#6055D9", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
              WHAT WE BUILD
            </p>
            <h2
              className="font-[family-name:var(--font-inter-tight)] font-bold text-[var(--text-primary)]"
              style={{
                fontFamily: "Inter Tight, sans-serif",
                fontSize: "clamp(28px,4vw,40px)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.025em",
              }}
            >
              Seven ways we deploy AI for your business
            </h2>
          </div>
          <ServicesGrid services={services} />
        </div>
      </section>

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-24">
        <div className="mx-auto mb-16 max-w-[1160px] text-center">
          <p className="mb-3 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.08em] text-[#6055D9]">THE PROCESS</p>
          <h2 className="mb-4 font-[family-name:var(--font-inter-tight)] text-[clamp(26px,3.5vw,36px)] font-bold tracking-[-0.02em] text-[var(--text-primary)]">
            From first call to live system
          </h2>
          <p className="mx-auto max-w-[640px] font-[family-name:var(--font-inter-tight)] text-[15px] leading-[1.65] text-[var(--text-secondary)]">
            Every engagement follows the same battle-tested process. No surprises, no pivots — just a clear path from problem to production.
          </p>
        </div>

        <div className="relative mx-auto hidden max-w-5xl md:block">
          <div
            className="pointer-events-none absolute left-14 right-14 top-[28px] z-0 h-px"
            style={{
              background: "linear-gradient(90deg, rgba(96,85,217,0.3) 0%, rgba(96,85,217,0.1) 100%)",
              borderTop: "1px dashed rgba(96,85,217,0.25)",
            }}
          />
          <div className="relative z-10 flex gap-0">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="flex flex-1 flex-col items-center px-4 text-center">
                <div
                  className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] font-[family-name:var(--font-inter-tight)] text-[18px] font-extrabold"
                  style={{
                    background: i === 0 ? "#6055D9" : "var(--bg-card)",
                    borderColor: i === 0 ? "#6055D9" : "rgba(96,85,217,0.35)",
                    color: i === 0 ? "#fff" : "var(--text-muted)",
                    boxShadow: i === 0 ? "0 0 0 6px rgba(96,85,217,0.06)" : undefined,
                  }}
                >
                  {i + 1}
                </div>
                <h3 className="mb-1.5 font-[family-name:var(--font-inter-tight)] text-[15px] font-bold text-[var(--text-primary)]">{step.title}</h3>
                <p className="max-w-[180px] font-[family-name:var(--font-inter-tight)] text-[13px] leading-[1.6] text-[var(--text-secondary)]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex max-w-[1100px] flex-col gap-8 md:hidden">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.title} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] font-[family-name:var(--font-inter-tight)] text-[15px] font-extrabold"
                  style={{
                    background: i === 0 ? "#6055D9" : "var(--bg-card)",
                    borderColor: i === 0 ? "#6055D9" : "rgba(96,85,217,0.35)",
                    color: i === 0 ? "#fff" : "var(--text-muted)",
                  }}
                >
                  {i + 1}
                </div>
                {i < PROCESS_STEPS.length - 1 ? (
                  <div className="min-h-[24px] w-px flex-1 border-l border-dashed" style={{ borderColor: "rgba(96,85,217,0.25)" }} />
                ) : null}
              </div>
              <div className="pb-2">
                <h3 className="mb-1.5 font-[family-name:var(--font-inter-tight)] text-[15px] font-bold text-[var(--text-primary)]">{step.title}</h3>
                <p className="font-[family-name:var(--font-inter-tight)] text-[13px] leading-[1.6] text-[var(--text-secondary)]">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-24">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-16 lg:grid-cols-[380px_1fr]">
          <div className="max-w-[400px] lg:sticky lg:top-24">
            <p className="mb-3 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.08em] text-[#6055D9]">WHY US</p>
            <h2 className="mb-4 font-[family-name:var(--font-inter-tight)] text-[clamp(26px,3vw,34px)] font-bold tracking-[-0.02em] text-[var(--text-primary)]">
              Built by people who ship, not just advise
            </h2>
            <p className="mb-8 font-[family-name:var(--font-inter-tight)] text-[15px] leading-[1.65] text-[var(--text-secondary)]">
              Most AI agencies hand you a strategy deck. We hand you working code. Here&apos;s what makes our approach different.
            </p>
            <div>
              <p className="font-[family-name:var(--font-inter-tight)] text-[56px] font-extrabold leading-none tracking-[-0.04em] text-[#6055D9]">15+</p>
              <p className="mt-1 font-[family-name:var(--font-inter-tight)] text-[14px] text-[var(--text-muted)]">AI systems shipped to production</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {[
              {
                title: "We Build, We Don't Just Advise",
                body: "Two live products with 1,200+ real users prove we can take ideas to production. You're not our first build.",
                iconBg: "rgba(96,85,217,0.1)",
                icon: <RocketIcon color="#6055D9" size={22} />,
              },
              {
                title: "100% In-House Engineering",
                body: "The engineers you meet in the first call build your product. No outsourcing, no handoffs, no surprises.",
                iconBg: "rgba(14,165,233,0.1)",
                icon: <UsersIcon color="#0EA5E9" />,
              },
              {
                title: "Results-First Everything",
                body: "Every sprint is measured against real outcomes. If it doesn't move a number that matters, we change direction.",
                iconBg: "rgba(16,185,129,0.1)",
                icon: <TrendingUpIcon color="#10B981" />,
              },
              {
                title: "Global-Ready from Day One",
                body: "UK-based with active deployments across US, EU, UAE, and Pakistan. We build for scale by default.",
                iconBg: "rgba(245,158,11,0.1)",
                icon: <GlobeIconSmall color="#F59E0B" />,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group flex gap-[18px] rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 pl-7 transition-colors duration-200 hover:border-[rgba(96,85,217,0.3)]"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]" style={{ backgroundColor: item.iconBg }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="mb-1 font-[family-name:var(--font-inter-tight)] text-[15px] font-bold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="font-[family-name:var(--font-inter-tight)] text-[13px] leading-[1.6] text-[var(--text-secondary)]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-24">
        <div className="mx-auto mb-[60px] max-w-[1160px] text-center">
          <p className="mb-3 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.08em] text-[#6055D9]">HOW WE ENGAGE</p>
          <h2 className="mb-4 font-[family-name:var(--font-inter-tight)] text-[clamp(26px,3.5vw,36px)] font-bold tracking-[-0.02em] text-[var(--text-primary)]">
            Three ways to work with us
          </h2>
          <p className="mx-auto max-w-[560px] font-[family-name:var(--font-inter-tight)] text-[15px] leading-[1.65] text-[var(--text-secondary)]">
            Pick the model that fits your stage. All three deliver the same quality of engineering.
          </p>
        </div>
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-5 md:grid-cols-3">
          <div className="relative rounded-[20px] border-2 border-[#6055D9] bg-[var(--bg-card)] p-8 shadow-[0_0_0_4px_rgba(96,85,217,0.07),0_8px_32px_rgba(96,85,217,0.1)]">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#22C55E] px-3 py-1 font-[family-name:var(--font-inter-tight)] text-[10px] font-bold uppercase tracking-wide text-white">
              MOST POPULAR
            </span>
            <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-[rgba(96,85,217,0.1)]">
              <RocketIcon color="#6055D9" size={26} />
            </div>
            <h3 className="mb-1 font-[family-name:var(--font-inter-tight)] text-[22px] font-extrabold text-[var(--text-primary)]">Project-Based</h3>
            <p className="mb-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-medium text-[#6055D9]">Fixed scope. Fixed timeline.</p>
            <p className="font-[family-name:var(--font-inter-tight)] text-[14px] leading-[1.65] text-[var(--text-secondary)]">
              Best for defined problems — build an AI agent, a RAG system, or a full product. We scope it, price it, and deliver it.
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {["Scoped discovery session", "Fixed-price delivery", "Full codebase handoff", "30-day post-launch support"].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <IncludeCheck />
                  <span className="font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-secondary)]">{line}</span>
                </li>
              ))}
            </ul>
            <BookingButton
              source="services-project"
              className="mt-7 flex w-full items-center justify-center rounded-full bg-[#6055D9] px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-white no-underline transition-opacity hover:opacity-95"
              style={{ textDecoration: "none" }}
            >
              Start a Project →
            </BookingButton>
          </div>

          <div className="rounded-[20px] border border-[var(--border-color)] bg-[var(--bg-card)] p-8">
            <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-[rgba(14,165,233,0.1)]">
              <CalendarIcon color="#0EA5E9" />
            </div>
            <h3 className="mb-1 font-[family-name:var(--font-inter-tight)] text-[22px] font-extrabold text-[var(--text-primary)]">Monthly Retainer</h3>
            <p className="mb-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-medium text-[#0EA5E9]">Ongoing AI engineering.</p>
            <p className="font-[family-name:var(--font-inter-tight)] text-[14px] leading-[1.65] text-[var(--text-secondary)]">
              Best for companies that want continuous AI development — new features, optimisations, and support on a monthly basis.
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {["Dedicated engineering time", "Weekly progress syncs", "Priority response time", "Flexible scope month-to-month"].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <IncludeCheck />
                  <span className="font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-secondary)]">{line}</span>
                </li>
              ))}
            </ul>
            <BookingButton
              source="services-retainer"
              className="mt-7 flex w-full items-center justify-center rounded-full border-2 border-[#0EA5E9] bg-transparent px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-[#0EA5E9] no-underline transition-opacity hover:opacity-90"
              style={{ textDecoration: "none" }}
            >
              Discuss Retainer →
            </BookingButton>
          </div>

          <div className="rounded-[20px] border border-[var(--border-color)] bg-[var(--bg-card)] p-8">
            <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-[rgba(20,184,166,0.1)]">
              <ServiceIcon name="compass" color="#14B8A6" size={26} />
            </div>
            <h3 className="mb-1 font-[family-name:var(--font-inter-tight)] text-[22px] font-extrabold text-[var(--text-primary)]">AI Advisory</h3>
            <p className="mb-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-medium text-[#14B8A6]">Strategy without the build.</p>
            <p className="font-[family-name:var(--font-inter-tight)] text-[14px] leading-[1.65] text-[var(--text-secondary)]">
              Best for leadership teams who need clarity on AI investments — where to start, what to build or buy, and how to sequence it.
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {["AI readiness audit", "Prioritised roadmap", "Vendor & tool evaluation", "Board-ready deliverables"].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <IncludeCheck />
                  <span className="font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-secondary)]">{line}</span>
                </li>
              ))}
            </ul>
            <BookingButton
              source="services-advisory"
              className="mt-7 flex w-full items-center justify-center rounded-full border-2 border-[#14B8A6] bg-transparent px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-[#14B8A6] no-underline transition-opacity hover:opacity-90"
              style={{ textDecoration: "none" }}
            >
              Book Advisory →
            </BookingButton>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-24">
        <div className="relative mx-auto max-w-[820px] overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,#130F2A_0%,#1D1745_100%)] px-8 py-[72px] text-center sm:px-14">
          <div
            className="pointer-events-none absolute left-1/2 top-[-40%] z-0 h-[500px] w-[700px] -translate-x-1/2"
            style={{ background: "radial-gradient(ellipse, rgba(96,85,217,0.25) 0%, transparent 65%)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[0] opacity-100"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-[1]">
            <span className="mb-5 inline-block rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.08)] px-4 py-1.5 font-[family-name:var(--font-inter-tight)] text-[11px] font-semibold uppercase tracking-[0.08em] text-[rgba(255,255,255,0.7)]">
              READY TO START?
            </span>
            <h2 className="mb-3.5 font-[family-name:var(--font-inter-tight)] text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.025em] text-white">
              Let&apos;s scope your first AI project
            </h2>
            <p className="mx-auto mb-9 max-w-[460px] font-[family-name:var(--font-inter-tight)] text-[16px] leading-[1.7] text-[rgba(255,255,255,0.6)]">
              Discovery calls are free, 30 minutes, and no-pitch. We&apos;ll tell you honestly if AI is the right solution for your problem.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <BookingButton
                source="services-cta"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-bold text-[#0A0A14] no-underline transition-opacity hover:opacity-95"
                style={{ textDecoration: "none" }}
              >
                Book a Free Discovery Call →
              </BookingButton>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-transparent px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-medium text-[rgba(255,255,255,0.75)] no-underline transition-opacity hover:opacity-95"
              >
                See Our Work →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
