import type { Metadata } from "next";
import Link from "next/link";
import BookingButton from "@/components/booking/BookingButton";
import { notFound } from "next/navigation";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { getServiceBySlug, getServicesPublished } from "@/lib/db-cache";
import type { Service } from "@prisma/client";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type UseCase = { title: string; body: string };
type ProcessStep = { step: string; title: string; body: string };
type Faq = { q: string; a: string };

function parseUseCases(j: unknown): UseCase[] {
  if (!Array.isArray(j)) return [];
  return j.filter(
    (x): x is UseCase =>
      !!x &&
      typeof x === "object" &&
      "title" in x &&
      "body" in x &&
      typeof (x as UseCase).title === "string" &&
      typeof (x as UseCase).body === "string",
  );
}

function parseProcess(j: unknown): ProcessStep[] {
  if (!Array.isArray(j)) return [];
  return j.filter(
    (x): x is ProcessStep =>
      !!x &&
      typeof x === "object" &&
      "step" in x &&
      "title" in x &&
      "body" in x &&
      typeof (x as ProcessStep).step === "string" &&
      typeof (x as ProcessStep).title === "string" &&
      typeof (x as ProcessStep).body === "string",
  );
}

function parseFaqs(j: unknown): Faq[] {
  if (!Array.isArray(j)) return [];
  return j.filter(
    (x): x is Faq =>
      !!x &&
      typeof x === "object" &&
      "q" in x &&
      "a" in x &&
      typeof (x as Faq).q === "string" &&
      typeof (x as Faq).a === "string",
  );
}

export async function generateStaticParams() {
  const items = await getServicesPublished();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} — PuzzleMetrics`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const ordered = await getServicesPublished();
  const idx = ordered.findIndex((s) => s.id === service.id);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;

  const useCases = parseUseCases(service.useCases);
  const processSteps = parseProcess(service.process);
  const faqs = parseFaqs(service.faqs);

  const longBody = service.longDescription ?? service.description;
  const paragraphs = longBody.split("\n\n").filter(Boolean);

  const glowTint = `${service.accentColor}18`;

  return (
    <>
      <section
        style={{
          background: "var(--bg-secondary)",
          padding: "80px 24px 64px",
          borderBottom: "1px solid var(--border-color)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 500,
            pointerEvents: "none",
            background: `radial-gradient(ellipse, ${glowTint} 0%, transparent 65%)`,
          }}
        />
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", marginBottom: 24 }}>
            <Link href="/services" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>
              Services
            </Link>
            <span style={{ color: "var(--text-muted)", fontSize: 13 }}>›</span>
            <span style={{ fontSize: 13, color: service.accentColor, fontWeight: 600 }}>{service.title}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span
              style={{
                background: service.accentBg,
                border: `1px solid ${service.accentBorder}`,
                borderRadius: 9999,
                padding: "4px 12px",
                fontSize: 11,
                fontWeight: 800,
                color: service.accentColor,
                fontFamily: "Inter Tight, sans-serif",
                letterSpacing: "0.08em",
              }}
            >
              {service.number}
            </span>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: service.accentBg,
                border: `1px solid ${service.accentBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: service.accentColor,
              }}
            >
              <ServiceIcon name={service.icon} color={service.accentColor} size={26} />
            </div>
          </div>

          <h1
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: "clamp(36px, 5vw, 54px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              marginBottom: 14,
            }}
          >
            {service.title}
          </h1>

          <p
            style={{
              fontSize: 17,
              fontWeight: 500,
              color: service.accentColor,
              marginBottom: 18,
              fontFamily: "Inter Tight, sans-serif",
            }}
          >
            {service.tagline}
          </p>

          <p
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 32px",
              fontFamily: "Inter Tight, sans-serif",
            }}
          >
            {service.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {service.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 9999,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  fontFamily: "Inter Tight, sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-primary)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "Inter Tight, sans-serif",
                fontSize: 16,
                fontWeight: 400,
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--bg-secondary)", padding: "80px 24px", borderTop: "1px solid var(--border-color)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: service.accentColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 12,
                  fontFamily: "Inter Tight, sans-serif",
                }}
              >
                WHAT YOU GET
              </p>
              <h2
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: "clamp(24px,3.5vw,34px)",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.025em",
                  marginBottom: 28,
                }}
              >
                Measurable outcomes, not promises
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {service.outcomes.map((outcome) => (
                  <div key={outcome} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        flexShrink: 0,
                        marginTop: 1,
                        background: service.accentBg,
                        border: `1px solid ${service.accentBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke={service.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <polyline points="2 6 5 9 10 3" />
                      </svg>
                    </div>
                    <span style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.5 }}>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: service.accentColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 12,
                  fontFamily: "Inter Tight, sans-serif",
                }}
              >
                USE CASES
              </p>
              <h2
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: "clamp(24px,3.5vw,34px)",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.025em",
                  marginBottom: 28,
                }}
              >
                Real-world applications
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {useCases.map((uc, i) => (
                  <div
                    key={i}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      borderRadius: 14,
                      padding: "18px 20px",
                    }}
                  >
                    <div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{uc.title}</div>
                    <div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{uc.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-primary)", padding: "80px 24px", borderTop: "1px solid var(--border-color)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: service.accentColor,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 12,
              fontFamily: "Inter Tight, sans-serif",
              textAlign: "center",
            }}
          >
            HOW IT WORKS
          </p>
          <h2
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: "clamp(24px,3.5vw,34px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Our process for {service.title}
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <div
                key={`${step.step}-${i}`}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 16,
                  padding: "24px 20px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginBottom: 14,
                    background: i === 0 ? service.accentColor : service.accentBg,
                    border: `1px solid ${service.accentBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 13,
                    fontWeight: 800,
                    color: i === 0 ? "#fff" : service.accentColor,
                  }}
                >
                  {step.step}
                </div>
                <div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{step.title}</div>
                <div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-secondary)", padding: "80px 24px", borderTop: "1px solid var(--border-color)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: service.accentColor,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 12,
              fontFamily: "Inter Tight, sans-serif",
              textAlign: "center",
            }}
          >
            FAQS
          </p>
          <h2
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: "clamp(24px,3.5vw,34px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              textAlign: "center",
              marginBottom: 44,
            }}
          >
            Common questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 16,
                  padding: "22px 24px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 10,
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: service.accentColor, fontWeight: 800, flexShrink: 0 }}>Q</span>
                  {faq.q}
                </div>
                <div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, paddingLeft: 22 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceNavFooter prev={prev} next={next} service={service} />
    </>
  );
}

function ServiceNavFooter({
  prev,
  next,
  service,
}: {
  prev: Service | null;
  next: Service | null;
  service: Service;
}) {
  return (
    <>
      <section style={{ background: "var(--bg-primary)", padding: "48px 24px", borderTop: "1px solid var(--border-color)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          {prev ? (
            <Link href={`/services/${prev.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>← Previous</span>
              <span style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{prev.title}</span>
            </Link>
          ) : (
            <div />
          )}
          <Link
            href="/services"
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "#6055D9",
              textDecoration: "none",
              background: "rgba(96,85,217,0.08)",
              border: "1px solid rgba(96,85,217,0.2)",
              borderRadius: 9999,
              padding: "8px 18px",
            }}
          >
            All Services
          </Link>
          {next ? (
            <Link href={`/services/${next.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Next →</span>
              <span style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{next.title}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <section style={{ background: "var(--bg-secondary)", padding: "80px 24px", borderTop: "1px solid var(--border-color)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: "clamp(24px,3.5vw,36px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              marginBottom: 14,
            }}
          >
            Ready to get started?
          </h2>
          <p style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32 }}>
            Book a free 30-minute discovery call. We&apos;ll scope the project and give you an honest assessment — no pitch deck required.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <BookingButton
              source={`service-${service.slug}`}
              style={{
                background: service.accentColor,
                color: "#fff",
                padding: "13px 28px",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "Inter Tight, sans-serif",
                boxShadow: `0 0 24px ${service.accentColor}55`,
              }}
            >
              Book a Discovery Call →
            </BookingButton>
            <Link
              href="/case-studies"
              style={{
                background: "transparent",
                color: "var(--text-secondary)",
                padding: "13px 22px",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "Inter Tight, sans-serif",
                border: "1px solid var(--border-color)",
              }}
            >
              See Case Studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
