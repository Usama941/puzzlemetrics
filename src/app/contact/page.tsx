import type { Metadata } from "next";
import type { ReactNode } from "react";
import BookingButton from "@/components/booking/BookingButton";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — PuzzleMetrics",
  description:
    "Book a free 30-minute discovery call with PuzzleMetrics. No pitch deck, no obligation — just an honest conversation about your AI project.",
};

const SOCIAL: { href: string; label: string; icon: ReactNode }[] = [
  {
    href: "https://github.com/puzzlemetrics",
    label: "GitHub",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://facebook.com/puzzlemetrics",
    label: "Facebook",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com/puzzlemetrics",
    label: "Instagram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/company/puzzlemetrics",
    label: "LinkedIn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/puzzlemetrics",
    label: "X",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

function InfoCard({
  iconWrapClass,
  icon,
  title,
  value,
  sub,
  valueIsLink,
}: {
  iconWrapClass: string;
  icon: ReactNode;
  title: string;
  value: string;
  sub: string;
  valueIsLink?: boolean;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] px-[22px] py-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${iconWrapClass}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-inter-tight)] text-[15px] font-semibold text-[var(--text-primary)]">{title}</p>
        {valueIsLink ? (
          <a href={`mailto:${value}`} className="mt-0.5 block font-[family-name:var(--font-inter-tight)] text-sm text-[#6055D9] no-underline">
            {value}
          </a>
        ) : (
          <p className="mt-0.5 font-[family-name:var(--font-inter-tight)] text-sm text-[var(--text-primary)]">{value}</p>
        )}
        <p className="mt-1 font-[family-name:var(--font-inter-tight)] text-xs text-[var(--text-muted)]">{sub}</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 pb-16 pt-20 text-center md:px-8 md:pb-20 md:pt-[80px]">
        <div
          className="pointer-events-none absolute left-1/2 top-[-40%] h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-100"
          style={{ background: "radial-gradient(ellipse, rgba(96,85,217,0.08) 0%, transparent 65%)" }}
          aria-hidden
        />
        <div className="relative z-[1] mx-auto max-w-[660px]">
          <p className="mb-3 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.12em] text-[#6055D9]">GET IN TOUCH</p>
          <h1 className="font-[family-name:var(--font-inter-tight)] text-[clamp(32px,5vw,44px)] font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            Let&apos;s talk about your project
          </h1>
          <p className="mt-4 font-[family-name:var(--font-inter-tight)] text-base leading-relaxed text-[var(--text-secondary)]">
            Discovery calls are free, 30 minutes, and completely no-pitch. We&apos;ll give you an honest assessment of what AI can do for your business.
          </p>
          <BookingButton
            source="contact-hero"
            className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-[#6055D9] px-8 py-[14px] font-[family-name:var(--font-inter-tight)] text-[15px] font-bold text-white shadow-[0_0_28px_rgba(96,85,217,0.35)] transition-opacity hover:opacity-95"
            style={{ textDecoration: "none" }}
          >
            Book a Free Discovery Call →
          </BookingButton>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {["✓ Free 30-min call", "✓ No pitch deck", "✓ Response within 2 hrs"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] px-[14px] py-1.5 font-[family-name:var(--font-inter-tight)] text-xs font-medium text-[var(--text-secondary)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Two columns */}
      <section className="bg-[var(--bg-primary)] px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-[1060px] grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_440px]">
          <div>
            <h2 className="mb-8 font-[family-name:var(--font-inter-tight)] text-[28px] font-bold tracking-[-0.02em] text-[var(--text-primary)]">
              Four ways to reach us
            </h2>
            <div className="flex flex-col gap-3.5">
              <InfoCard
                iconWrapClass="border-[rgba(96,85,217,0.15)] bg-[rgba(96,85,217,0.08)] text-[#6055D9]"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
                title="Email us"
                value="hello@puzzlemetrics.com"
                sub="We reply within 4 business hours"
                valueIsLink
              />
              <InfoCard
                iconWrapClass="border-[rgba(14,165,233,0.2)] bg-[rgba(14,165,233,0.08)] text-[#0EA5E9]"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                }
                title="Call us"
                value="+44 20 7946 0958"
                sub="Mon–Fri, 9am–6pm GMT"
              />
              <InfoCard
                iconWrapClass="border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.08)] text-[#10B981]"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
                title="Based in"
                value="London, United Kingdom"
                sub="Serving clients globally across 5 markets"
              />
              <InfoCard
                iconWrapClass="border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.08)] text-[#F59E0B]"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                }
                title="Response time"
                value="Within 2 hours"
                sub="For discovery call requests"
              />
            </div>

            <div className="mt-6">
              <p className="mb-3 font-[family-name:var(--font-inter-tight)] text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Follow us</p>
              <div className="flex flex-wrap gap-2.5">
                {SOCIAL.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-muted)] transition-all hover:border-[#6055D9] hover:text-[#6055D9]"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-[100px]">
            <div className="overflow-hidden rounded-[20px] border border-[var(--border-color)] bg-[var(--bg-card)]">
              <div className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-5">
                <h3 className="font-[family-name:var(--font-inter-tight)] text-base font-bold text-[var(--text-primary)]">Quick message</h3>
                <p className="mt-1 font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-muted)]">Prefer not to book a call? Send us a message.</p>
              </div>
              <div className="p-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-[72px] md:px-8">
        <div className="mx-auto mb-11 max-w-[900px] text-center">
          <p className="mb-2 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.1em] text-[#6055D9]">WHAT TO EXPECT</p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-[clamp(26px,4vw,34px)] font-bold tracking-[-0.02em] text-[var(--text-primary)]">
            What happens on the discovery call
          </h2>
        </div>
        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "We listen first",
              body: "You tell us the problem. We ask questions. No slides, no demos, no pressure to buy anything.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-[#6055D9]">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              ),
            },
            {
              n: "02",
              title: "We give you an honest answer",
              body: "We’ll tell you if AI is the right solution, if you’re ready for it, and what it would realistically deliver.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-[#6055D9]">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              ),
            },
            {
              n: "03",
              title: "You get a written scope",
              body: "If we’re a fit, we send a written scope and honest price estimate within 48 hours. No vague proposals.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-[#6055D9]">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              ),
            },
          ].map((c) => (
            <div
              key={c.n}
              className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] px-6 py-7 transition-all hover:-translate-y-0.5 hover:border-[rgba(96,85,217,0.25)]"
            >
              <div className="mb-4 flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(96,85,217,0.1)] font-[family-name:var(--font-inter-tight)] text-[11px] font-extrabold text-[#6055D9]">
                {c.n}
              </div>
              <div className="mb-3">{c.icon}</div>
              <h3 className="font-[family-name:var(--font-inter-tight)] text-lg font-bold text-[var(--text-primary)]">{c.title}</h3>
              <p className="mt-2 font-[family-name:var(--font-inter-tight)] text-sm leading-relaxed text-[var(--text-secondary)]">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-20 text-center md:px-8">
        <div className="relative mx-auto max-w-[700px] overflow-hidden rounded-3xl bg-[linear-gradient(145deg,#130F2A,#1D1745)] px-8 py-16 md:px-12 md:py-16">
          <div
            className="pointer-events-none absolute left-1/2 top-[-40%] z-0 h-[500px] w-[700px] -translate-x-1/2"
            style={{ background: "radial-gradient(ellipse, rgba(96,85,217,0.25) 0%, transparent 65%)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-100"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden
          />
          <div className="relative z-[1] text-white">
            <h2 className="font-[family-name:var(--font-inter-tight)] text-[clamp(28px,4vw,40px)] font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
              Ready to start?
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] font-[family-name:var(--font-inter-tight)] text-[15px] leading-relaxed text-[rgba(255,255,255,0.82)]">
              30 minutes. Free. No obligation. Just an honest conversation about your AI project.
            </p>
            <BookingButton
              source="contact-cta"
              className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-8 py-[14px] font-[family-name:var(--font-inter-tight)] text-[15px] font-bold text-[#0A0A14] shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-[opacity,transform] hover:opacity-95 active:scale-[0.99]"
              style={{ textDecoration: "none" }}
            >
              Book Your Free Discovery Call →
            </BookingButton>
            <p className="mt-3.5 font-[family-name:var(--font-inter-tight)] text-xs text-[rgba(255,255,255,0.65)]">
              We respond to all bookings within 2 hours during business hours.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
