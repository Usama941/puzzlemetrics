import BookingButton from "@/components/booking/BookingButton";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/db-cache";
import { Calendar, Clock, MapPin, Quote } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function caseStudyMetrics(j: unknown): { value: string; label: string; color: string }[] {
  if (!Array.isArray(j)) return [];
  return j
    .filter((x): x is Record<string, unknown> => !!x && typeof x === "object")
    .map((x) => ({
      value: String(x.value ?? ""),
      label: String(x.label ?? ""),
      color: typeof x.color === "string" ? x.color : "#6055D9",
    }));
}

function parseTestimonial(j: unknown): { quote: string; name: string; role: string } | null {
  if (!j || typeof j !== "object") return null;
  const o = j as Record<string, unknown>;
  if (typeof o.quote !== "string" || typeof o.name !== "string" || typeof o.role !== "string") return null;
  return { quote: o.quote, name: o.name, role: o.role };
}

export async function generateStaticParams() {
  const items = await getCaseStudies();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return { title: "Not Found" };
  return {
    title: `${cs.title} — PuzzleMetrics`,
    description: cs.summary,
  };
}

function metricCardStyle(color: string): CSSProperties {
  return {
    background: `color-mix(in srgb, ${color} 8%, transparent)`,
    border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
  };
}

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const ordered = await getCaseStudies();
  const idx = ordered.findIndex((c) => c.id === cs.id);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;

  const metrics = caseStudyMetrics(cs.metrics);
  const testimonial = parseTestimonial(cs.testimonial);

  const narrative: { n: string; label: string; title: string; body: string }[] = [
    { n: "01", label: "Problem", title: "The Problem", body: cs.problem },
    { n: "02", label: "Approach", title: "Our Approach", body: cs.approach },
    { n: "03", label: "Execution", title: "Execution", body: cs.execution },
    { n: "04", label: "Outcome", title: "The Outcome", body: cs.outcome },
  ];

  return (
    <>
      <section
        className="relative overflow-hidden px-6 pb-20 pt-[100px]"
        style={{ background: cs.bgGradient }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-[1] mx-auto grid max-w-[1060px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-[13px]" aria-label="Breadcrumb">
              <Link href="/case-studies" className="text-[rgba(255,255,255,0.5)] no-underline hover:text-white/80">
                Case Studies
              </Link>
              <span className="text-[rgba(255,255,255,0.35)]" aria-hidden>
                ›
              </span>
              <span className="font-semibold text-[rgba(255,255,255,0.85)]" style={{ color: cs.accentColor }}>
                {cs.service}
              </span>
            </nav>

            <div className="mb-5 flex flex-wrap gap-2">
              <span className="inline-block rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.12)] px-3 py-1 font-[family-name:var(--font-inter-tight)] text-[11px] font-semibold uppercase tracking-wide text-[rgba(255,255,255,0.9)]">
                {cs.service}
              </span>
              <span className="inline-block rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.12)] px-3 py-1 font-[family-name:var(--font-inter-tight)] text-[11px] font-semibold uppercase tracking-wide text-[rgba(255,255,255,0.9)]">
                {cs.industry}
              </span>
            </div>

            <h1 className="mb-4 font-[family-name:var(--font-inter-tight)] text-[clamp(28px,4vw,46px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
              {cs.title}
            </h1>
            <p className="mb-7 font-[family-name:var(--font-inter-tight)] text-[18px] font-medium leading-snug text-[rgba(255,255,255,0.7)]">
              {cs.tagline}
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-3 font-[family-name:var(--font-inter-tight)] text-[13px] text-[rgba(255,255,255,0.55)]">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-[14px] w-[14px] shrink-0" stroke="rgba(255,255,255,0.45)" strokeWidth={1.5} />
                {cs.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-[14px] w-[14px] shrink-0" stroke="rgba(255,255,255,0.45)" strokeWidth={1.5} />
                {cs.year}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-[14px] w-[14px] shrink-0" stroke="rgba(255,255,255,0.45)" strokeWidth={1.5} />
                {cs.duration}
              </span>
            </div>
          </div>

          <div className="text-center lg:text-right">
            <div
              className="case-study-hero-metric font-[family-name:var(--font-inter-tight)] text-[clamp(64px,8vw,96px)] font-extrabold leading-none tracking-[-0.05em] text-white [text-shadow:0_0_80px_rgba(255,255,255,0.25)]"
            >
              {cs.heroMetric}
            </div>
            <div className="mb-8 mt-2 font-[family-name:var(--font-inter-tight)] text-[13px] font-medium uppercase tracking-[0.08em] text-[rgba(255,255,255,0.55)]">
              {cs.heroMetricLabel}
            </div>

            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-3 lg:ml-auto lg:mr-0">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-4 py-3.5 text-center"
                >
                  <div className="font-[family-name:var(--font-inter-tight)] text-[20px] font-bold text-white">{m.value}</div>
                  <div className="mt-1 font-[family-name:var(--font-inter-tight)] text-[11px] font-normal uppercase tracking-wide text-[rgba(255,255,255,0.5)]">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-color)] bg-[var(--bg-card)] px-6 py-10">
        <div className="relative mx-auto max-w-[900px] text-center">
          <span
            className="pointer-events-none absolute left-2 top-0 font-[family-name:var(--font-inter-tight)] text-[120px] font-extrabold leading-none opacity-40 sm:left-6"
            style={{ color: cs.accentColor }}
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote className="relative z-[1] mx-auto max-w-[760px] px-4 font-[family-name:var(--font-inter-tight)] text-[18px] font-normal italic leading-[1.75] text-[var(--text-secondary)]">
            {cs.summary}
          </blockquote>
        </div>
      </section>

      <section className="bg-[var(--bg-primary)] px-6 py-[88px]">
        <div className="mx-auto flex max-w-[860px] flex-col">
          {narrative.map((block, i) => (
            <article
              key={block.label}
              className={`grid grid-cols-1 gap-10 py-[52px] lg:grid-cols-[180px_1fr] lg:items-start lg:gap-12 ${
                i < narrative.length - 1 ? "border-b border-[var(--border-color)]" : ""
              }`}
            >
              <div className="lg:sticky lg:top-24">
                <div
                  className="font-[family-name:var(--font-inter-tight)] text-[48px] font-extrabold leading-none tracking-[-0.05em] opacity-20"
                  style={{ color: cs.accentColor }}
                >
                  {block.n}
                </div>
                <div
                  className="-mt-2 font-[family-name:var(--font-inter-tight)] text-[13px] font-bold uppercase tracking-[0.1em]"
                  style={{ color: cs.accentColor }}
                >
                  {block.label}
                </div>
              </div>
              <div>
                <h3 className="mb-5 font-[family-name:var(--font-inter-tight)] text-[22px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">
                  {block.title}
                </h3>
                {block.body.split("\n\n").map((para, j) => (
                  <p
                    key={j}
                    className="mb-4 font-[family-name:var(--font-inter-tight)] text-[16px] font-normal leading-[1.8] text-[var(--text-secondary)] last:mb-0"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-[72px]">
        <div className="mx-auto mb-11 max-w-[900px] text-center">
          <p className="mb-2 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.14em] text-[#6055D9]">
            BY THE NUMBERS
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-[clamp(24px,3.5vw,34px)] font-extrabold tracking-[-0.02em] text-[var(--text-primary)]">
            Measurable outcomes
          </h2>
        </div>

        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-2">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-[20px] px-6 py-7 text-center"
              style={metricCardStyle(m.color)}
            >
              <div
                className="font-[family-name:var(--font-inter-tight)] text-[42px] font-extrabold tracking-[-0.03em]"
                style={{ color: m.color }}
              >
                {m.value}
              </div>
              <div className="mt-2 font-[family-name:var(--font-inter-tight)] text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--text-muted)]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {testimonial ? (
        <section className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-[72px]">
          <div className="mx-auto max-w-[780px]">
            <Quote className="h-12 w-12 opacity-30" stroke={cs.accentColor} strokeWidth={1.5} aria-hidden />
            <blockquote className="mt-4 font-[family-name:var(--font-inter-tight)] text-[20px] font-normal italic leading-[1.7] text-[var(--text-primary)]">
              {testimonial.quote}
            </blockquote>
            <div className="mt-7 flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-[family-name:var(--font-inter-tight)] text-[14px] font-bold"
                style={{
                  background: cs.accentBg,
                  borderColor: `${cs.accentColor}33`,
                  color: cs.accentColor,
                }}
              >
                {initialsFromName(testimonial.name)}
              </div>
              <div>
                <div className="font-[family-name:var(--font-inter-tight)] text-[15px] font-semibold text-[var(--text-primary)]">
                  {testimonial.name}
                </div>
                <div className="font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-muted)]">{testimonial.role}</div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-12">
        <div className="mx-auto flex max-w-[860px] flex-wrap items-center gap-4">
          <span className="shrink-0 font-[family-name:var(--font-inter-tight)] text-[12px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            Technologies used:
          </span>
          <div className="flex flex-wrap gap-2">
            {cs.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] px-[14px] py-[5px] font-[family-name:var(--font-inter-tight)] text-[13px] font-medium text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-12">
        <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-between gap-4">
          <div className="min-w-[200px] flex-1">
            {prev ? (
              <Link href={`/case-studies/${prev.slug}`} className="block no-underline">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">← Previous Case Study</span>
                <span className="mt-1 block font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-[var(--text-primary)]">{prev.client}</span>
                <span className="mt-0.5 block font-[family-name:var(--font-inter-tight)] text-[12px]" style={{ color: prev.accentColor }}>
                  {prev.heroMetric} {prev.heroMetricLabel}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <Link
            href="/case-studies"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-[rgba(96,85,217,0.35)] bg-[rgba(96,85,217,0.08)] px-5 py-2 font-[family-name:var(--font-inter-tight)] text-[13px] font-semibold text-[#6055D9] no-underline"
          >
            All Case Studies
          </Link>

          <div className="min-w-[200px] flex-1 text-right">
            {next ? (
              <Link href={`/case-studies/${next.slug}`} className="inline-block text-right no-underline">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">Next Case Study →</span>
                <span className="mt-1 block font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-[var(--text-primary)]">{next.client}</span>
                <span className="mt-0.5 block font-[family-name:var(--font-inter-tight)] text-[12px]" style={{ color: next.accentColor }}>
                  {next.heroMetric} {next.heroMetricLabel}
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <BottomCta />
    </>
  );
}

function BottomCta() {
  return (
    <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-[88px] text-center">
      <div className="relative mx-auto max-w-[680px] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#130F2A] to-[#1D1745] px-8 py-14 sm:px-12 sm:py-16">
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(96,85,217,0.45) 0%, transparent 65%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-[1]">
          <h2 className="font-[family-name:var(--font-inter-tight)] text-[clamp(26px,4vw,38px)] font-extrabold leading-tight tracking-[-0.02em] text-white">
            Ready to see results like these?
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] font-[family-name:var(--font-inter-tight)] text-[15px] leading-[1.65] text-[rgba(255,255,255,0.6)]">
            Discovery calls are free and no-pitch. We&apos;ll tell you honestly if we can deliver results like this for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BookingButton
              source="case-study-detail"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-[#130F2A] no-underline transition-opacity hover:opacity-95"
              style={{ textDecoration: "none" }}
            >
              Book a Discovery Call →
            </BookingButton>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.45)] bg-transparent px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-medium text-white no-underline transition-opacity hover:opacity-95"
            >
              View Portfolio →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
