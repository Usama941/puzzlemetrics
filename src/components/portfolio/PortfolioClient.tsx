"use client";

import type { PortfolioProject } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import BookingButton from "@/components/booking/BookingButton";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
export default function PortfolioClient({ projects }: { projects: PortfolioProject[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const p of projects) {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        ordered.push(p.category);
      }
    }
    return ["All", ...ordered];
  }, [projects]);

  const filtered =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <>
      <section
        style={{
          background: "var(--bg-primary)",
          padding: "96px 24px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(96,85,217,0.07) 0%, transparent 70%)",
              animation: "float1 8s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "5%",
              right: "8%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)",
              animation: "float2 10s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "40%",
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
              animation: "float3 12s ease-in-out infinite",
            }}
          />
        </div>

        <style>{`
          @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
          @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,20px)} }
          @keyframes float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-20px)} }
          @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
          .portfolio-card-img { transition: transform 0.5s ease; }
          .portfolio-card:hover .portfolio-card-img { transform: scale(1.05); }
          .portfolio-card { transition: box-shadow 0.3s ease, transform 0.3s ease; }
          .portfolio-card:hover { transform: translateY(-6px); }
        `}</style>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(96,85,217,0.1)",
                border: "1px solid rgba(96,85,217,0.25)",
                borderRadius: 9999,
                padding: "5px 16px",
                fontSize: 11,
                fontWeight: 700,
                color: "#6055D9",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 20,
                fontFamily: "Inter Tight, sans-serif",
              }}
            >
              SELECTED WORK
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            <span style={{ color: "var(--text-primary)" }}>AI that </span>
            <span
              style={{
                background: "linear-gradient(135deg, #6055D9 0%, #0EA5E9 50%, #10B981 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              ships
            </span>
            <span style={{ color: "var(--text-primary)" }}> and </span>
            <span
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #F59E0B 50%, #6055D9 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite reverse",
              }}
            >
              scales
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 17,
              fontWeight: 400,
              color: "var(--text-secondary)",
              maxWidth: 540,
              margin: "0 auto 44px",
              lineHeight: 1.7,
            }}
          >
            Six AI systems, SaaS platforms, and data products — built in-house and running in production across 5 markets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}
          >
            {[
              { value: "6", label: "Projects" },
              { value: "5", label: "Industries" },
              { value: "340%", label: "Avg ROAS lift" },
              { value: "1,200+", label: "Users served" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#6055D9",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 12,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginTop: 2,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        style={{
          background: "var(--bg-secondary)",
          padding: "80px 24px 100px",
          borderTop: "1px solid var(--border-color)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
              marginBottom: 56,
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#fff" : "var(--text-secondary)",
                    background: isActive ? "#6055D9" : "var(--bg-card)",
                    border: isActive ? "1px solid #6055D9" : "1px solid var(--border-color)",
                    borderRadius: 9999,
                    padding: "9px 20px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isActive ? "0 0 20px rgba(96,85,217,0.3)" : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "Inter Tight, sans-serif",
                    color: "var(--text-secondary)",
                    padding: "48px 0",
                  }}
                >
                  No projects in this category yet.
                </p>
              ) : activeCategory === "All" ? (
                <>
                  {featured.length > 0 && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                        gap: 20,
                        marginBottom: regular.length > 0 ? 20 : 0,
                      }}
                    >
                      {featured.map((project, i) => (
                        <PortfolioCard key={project.slug} project={project} index={i} size="large" />
                      ))}
                    </div>
                  )}
                  {regular.length > 0 && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: 20,
                      }}
                    >
                      {regular.map((project, i) => (
                        <PortfolioCard key={project.slug} project={project} index={i} size="small" />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: 20,
                  }}
                >
                  {filtered.map((project, i) => (
                    <PortfolioCard key={project.slug} project={project} index={i} size="large" />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section
        style={{
          background: "var(--bg-primary)",
          padding: "88px 24px",
          borderTop: "1px solid var(--border-color)",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <h2
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              marginBottom: 14,
            }}
          >
            Want to be next?
          </h2>
          <p
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 16,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            Every project here started with a 30-minute discovery call. No pitch deck required.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <BookingButton
              source="portfolio-index"
              style={{
                background: "#6055D9",
                color: "#fff",
                padding: "13px 28px",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "Inter Tight, sans-serif",
                boxShadow: "0 0 24px rgba(96,85,217,0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Start a Project →
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
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Read Case Studies
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}

function PortfolioCard({
  project,
  index,
  size,
}: {
  project: PortfolioProject;
  index: number;
  size: "large" | "small";
}) {
  const [hovered, setHovered] = useState(false);
  const textColor = project.textColor || "#1A1726";
  const buttonColor = project.buttonColor || "#6055D9";
  const backgroundColor = project.backgroundColor || "#6055D9";

  const ctaStyle: CSSProperties = {
    fontFamily: "Inter Tight, sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: buttonColor,
    display: "flex",
    alignItems: "center",
    gap: hovered ? 8 : 4,
    transition: "gap 0.2s",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="portfolio-card"
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: hovered ? `1px solid ${buttonColor}55` : "1px solid var(--border-color)",
            boxShadow: hovered
              ? `0 20px 60px ${buttonColor}22, 0 4px 12px rgba(0,0,0,0.08)`
              : "0 2px 12px rgba(0,0,0,0.06)",
            background: "var(--bg-card)",
          }}
        >
          <div
            className="portfolio-card-img"
            style={{
              height: size === "large" ? 220 : 180,
              background: backgroundColor,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: size === "large" ? 56 : 44,
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  textShadow: "0 0 40px rgba(255,255,255,0.25)",
                }}
              >
                {project.heroMetric}
              </div>
              <div
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#ffffff",
                  opacity: 0.75,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginTop: 8,
                }}
              >
                {project.heroMetricLabel}
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 9999,
                padding: "4px 12px",
                fontSize: 11,
                fontWeight: 600,
                color: textColor,
                fontFamily: "Inter Tight, sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              {project.category}
            </div>

            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                transform: hovered ? "translate(2px, -2px)" : "none",
                opacity: hovered ? 1 : 0.7,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </div>

          <div style={{ padding: "20px 22px 22px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: textColor,
                  letterSpacing: "0.04em",
                }}
              >
                {project.client}
              </span>
              <span style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 11, color: "var(--text-muted)" }}>
                {project.location} · {project.year}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "Inter Tight, sans-serif",
                fontSize: size === "large" ? 20 : 18,
                fontWeight: 700,
                color: textColor,
                letterSpacing: "-0.01em",
                marginBottom: 6,
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                fontFamily: "Inter Tight, sans-serif",
                fontSize: 13,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: 16,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "Inter Tight, sans-serif",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "var(--text-muted)",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                      borderRadius: 9999,
                      padding: "2px 9px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span style={ctaStyle}>
                View project
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
