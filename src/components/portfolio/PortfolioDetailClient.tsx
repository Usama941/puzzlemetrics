"use client";

import type { PortfolioProject } from "@prisma/client";
import { motion } from "framer-motion";
import BookingButton from "@/components/booking/BookingButton";
import Link from "next/link";
import { portfolioPanelGradient, resolveMetricColor } from "@/lib/portfolio-colors";

type PortfolioMetric = {
  value: string;
  label: string;
  color: string;
};

function portfolioMetrics(m: unknown, fallbackColor = "#6055D9"): PortfolioMetric[] {
  if (!Array.isArray(m)) return [];
  return m
    .filter(
      (x): x is { value: unknown; label: unknown; color?: unknown } =>
        !!x && typeof x === "object" && "value" in x && "label" in x,
    )
    .map((x) => ({
      value: String(x.value),
      label: String(x.label),
      color: typeof x.color === "string" && x.color.trim() ? x.color.trim() : fallbackColor,
    }));
}

type ProjectProps = {
  project: PortfolioProject;
};

type ContentProps = {
  project: PortfolioProject;
  prevProject: PortfolioProject | null;
  nextProject: PortfolioProject | null;
};

export function PortfolioHeroSection({ project }: ProjectProps) {
  const metricColor = resolveMetricColor(project);
  const metrics = portfolioMetrics(project.metrics, metricColor);
  const heroSmallMetrics = metrics.slice(0, 3);

  return (
    <section
        style={{
          background: portfolioPanelGradient(metricColor),
          padding: "100px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />

        <div className="mx-auto grid max-w-[1060px] grid-cols-1 items-center gap-12 lg:grid-cols-2" style={{ position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              <Link href="/portfolio" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                Portfolio
              </Link>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>/</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.95)", fontWeight: 600 }}>{project.title}</span>
            </div>

            <span
              style={{
                display: "inline-block",
                marginBottom: 16,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 9999,
                padding: "5px 14px",
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(255,255,255,0.9)",
                fontFamily: "Inter Tight, sans-serif",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {project.category}
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{
                fontFamily: "Inter Tight, sans-serif",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                marginBottom: 12,
              }}
            >
              {project.title}
            </motion.h1>

            <p
              style={{
                fontFamily: "Inter Tight, sans-serif",
                fontSize: 20,
                fontWeight: 500,
                color: "rgba(255,255,255,0.92)",
                marginBottom: 20,
              }}
            >
              {project.tagline}
            </p>

            <p style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
              {project.client} · {project.location} · {project.year}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 12,
                    padding: "5px 12px",
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <div
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 80,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  textShadow: "0 0 60px rgba(255,255,255,0.3)",
                }}
              >
                {project.heroMetric}
              </div>
              <div
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginTop: 10,
                  marginBottom: 24,
                }}
              >
                {project.heroMetricLabel}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
              {heroSmallMetrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    background: `${m.color}18`,
                    border: `1px solid ${m.color}40`,
                    borderRadius: 14,
                    padding: "14px 10px",
                  }}
                >
                  <div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 22, fontWeight: 800, color: m.color }}>{m.value}</div>
                  <div
                    style={{
                      fontFamily: "Inter Tight, sans-serif",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.55)",
                      marginTop: 4,
                      lineHeight: 1.3,
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

export function PortfolioDetailContent({ project, prevProject, nextProject }: ContentProps) {
  const metrics = portfolioMetrics(project.metrics, project.accentColor);

  return (
    <>
      <section style={{ background: "var(--bg-secondary)", padding: "80px 24px" }}>
        <div className="mx-auto grid max-w-[1060px] grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {[
            { n: "01", title: "The Challenge", body: project.challenge },
            { n: "02", title: "Our Solution", body: project.solution },
            { n: "03", title: "The Results", body: project.results },
          ].map((block) => (
            <div key={block.n}>
              <div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 13, fontWeight: 800, color: project.accentColor, marginBottom: 8 }}>{block.n}</div>
              <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>{block.title}</h2>
              <p style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 15, fontWeight: 400, color: "var(--text-secondary)", lineHeight: 1.75 }}>{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--bg-primary)", padding: "60px 24px" }}>
        <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {metrics.map((m) => {
            const metricTint12 = `${m.color}12`;
            const metricTint30 = `${m.color}30`;
            return (
            <div
              key={m.label}
              style={{
                background: metricTint12,
                border: `1px solid ${metricTint30}`,
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 36, fontWeight: 800, color: m.color }}>{m.value}</div>
              <div
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginTop: 8,
                }}
              >
                {m.label}
              </div>
            </div>
            );
          })}
        </div>
      </section>

      <section style={{ background: "var(--bg-secondary)", padding: "56px 24px", borderTop: "1px solid var(--border-color)" }}>
        <div className="mx-auto max-w-[720px]">
          <h2
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: project.accentColor,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Project narrative
          </h2>
          <p style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.85, textAlign: "center" }}>{project.description}</p>
        </div>
      </section>

      <section style={{ background: "var(--bg-primary)", padding: "40px 24px 56px" }}>
        <div className="mx-auto max-w-[800px] text-center">
          <h3
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "var(--text-muted)",
              marginBottom: 14,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Tags &amp; tech
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 13,
                  padding: "8px 16px",
                  borderRadius: 9999,
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-card)",
                  color: "var(--text-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-secondary)", padding: "48px 24px", borderTop: "1px solid var(--border-color)" }}>
        <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-between gap-6">
          {prevProject ? (
            <Link href={`/portfolio/${prevProject.slug}`} style={{ textDecoration: "none" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>
                ← Previous
              </span>
              <span style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{prevProject.title}</span>
            </Link>
          ) : (
            <div />
          )}
          <Link
            href="/portfolio"
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
            All Projects
          </Link>
          {nextProject ? (
            <Link href={`/portfolio/${nextProject.slug}`} style={{ textDecoration: "none", textAlign: "right" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>
                Next →
              </span>
              <span style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{nextProject.title}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <section style={{ background: "var(--bg-primary)", padding: "80px 24px", borderTop: "1px solid var(--border-color)", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: "clamp(26px, 3.5vw, 36px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              marginBottom: 12,
            }}
          >
            Ready to build something like this?
          </h2>
          <p style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 28 }}>
            Tell us about your goals — we&apos;ll map an approach and timeline on a short call.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <BookingButton
              source={`portfolio-${project.slug}-project`}
              style={{
                background: project.accentColor,
                color: "#fff",
                padding: "13px 28px",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "Inter Tight, sans-serif",
                boxShadow: `0 0 24px ${project.accentColor}55`,
              }}
            >
              Start a Project →
            </BookingButton>
            <BookingButton
              source={`portfolio-${project.slug}-call`}
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
              Book a Call
            </BookingButton>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default function PortfolioDetailClient({ project, prevProject, nextProject }: ContentProps) {
  return (
    <>
      <PortfolioHeroSection project={project} />
      <PortfolioDetailContent project={project} prevProject={prevProject} nextProject={nextProject} />
    </>
  );
}
