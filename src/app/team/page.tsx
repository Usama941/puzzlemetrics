import type { Metadata } from "next";
import type { CSSProperties } from "react";
import BookingButton from "@/components/booking/BookingButton";
import TeamCard from "@/components/team/TeamCard";
import { getTeamMembers } from "@/lib/db-cache";

export const metadata: Metadata = {
  title: "Team — PuzzleMetrics",
  description: "Meet the engineers, data scientists, and AI strategists behind PuzzleMetrics.",
};

const iconBoxStyle: CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 10,
  background: "rgba(96,85,217,0.08)",
  border: "0.5px solid rgba(96,85,217,0.18)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
};

function ValueSectionIcon({ title }: { title: string }) {
  const svgProps = {
    width: 22,
    height: 22,
    fill: "none" as const,
    stroke: "#6055D9",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (title) {
    case "Ship Over Slides":
      return (
        <div style={iconBoxStyle}>
          <svg viewBox="0 0 24 24" aria-hidden {...svgProps}>
            <path d="M4.5 16.5c-1.5 1.5-2 4-2 4s2.5-.5 4-2L17 8l-2.5-2.5L4.5 16.5z" />
            <path d="M14.5 5.5l4 4" />
            <path d="M20 4s-1 .5-3 2.5c-.5.5-1 1-1.5 1.7L17 9.5l1.5 1.5c.7-.5 1.2-1 1.7-1.5C22 7.5 20 4 20 4z" />
          </svg>
        </div>
      );
    case "Engineering Rigour":
      return (
        <div style={iconBoxStyle}>
          <svg viewBox="0 0 24 24" aria-hidden {...svgProps}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        </div>
      );
    case "Results First":
      return (
        <div style={iconBoxStyle}>
          <svg viewBox="0 0 24 24" aria-hidden {...svgProps}>
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </div>
      );
    case "Global by Default":
      return (
        <div style={iconBoxStyle}>
          <svg viewBox="0 0 24 24" aria-hidden {...svgProps}>
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
      );
    case "No Outsourcing":
      return (
        <div style={iconBoxStyle}>
          <svg viewBox="0 0 24 24" aria-hidden {...svgProps}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
      );
    case "Move Fast, Carefully":
      return (
        <div style={iconBoxStyle}>
          <svg viewBox="0 0 24 24" aria-hidden {...svgProps}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

const STATS = [
  { n: "8+", l: "Team Members" },
  { n: "5+", l: "Years of AI Experience" },
  { n: "15+", l: "Projects Shipped" },
  { n: "5", l: "Global Markets" },
] as const;

const VALUES = [
  {
    title: "Ship Over Slides",
    body: "We measure success by working code in production, not slides in a deck. Every engagement ends with something real you can use.",
  },
  {
    title: "Engineering Rigour",
    body: "AI systems require deep technical care. We never cut corners on architecture, testing, security, or deployment — ever.",
  },
  {
    title: "Results First",
    body: "Everything we build is benchmarked against measurable outcomes. If it doesn't move a number that matters, we iterate.",
  },
  {
    title: "Global by Default",
    body: "We build for scale across markets, time zones, and regulatory environments from the first line of code.",
  },
  {
    title: "No Outsourcing",
    body: "The team you meet is the team that builds your product. No handoffs to junior contractors or offshore teams.",
  },
  {
    title: "Move Fast, Carefully",
    body: "We ship at startup speed without compromising on the quality that enterprise clients require. Both things are possible.",
  },
] as const;

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <>
      <section
        style={{
          background: "var(--bg-secondary)",
          padding: "80px 24px 64px",
          textAlign: "center",
          borderBottom: "0.5px solid var(--border-color)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 500,
            background: "radial-gradient(ellipse, rgba(96,85,217,0.1) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(96,85,217,0.1)",
              border: "0.5px solid rgba(96,85,217,0.3)",
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
            Our Team
          </span>

          <h1
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              marginBottom: 20,
            }}
          >
            The People Building
            <br />
            <span style={{ color: "#6055D9" }}>AI That Works</span>
          </h1>

          <p
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 17,
              fontWeight: 400,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 540,
              margin: "0 auto",
            }}
          >
            We&apos;re a tight-knit team of engineers, data scientists, and AI strategists — all obsessed with shipping AI systems
            that actually perform in the real world.
          </p>
        </div>
      </section>

      <section
        style={{
          background: "var(--bg-primary)",
          borderBottom: "0.5px solid var(--border-color)",
          padding: "40px 24px",
        }}
      >
        <div className="mx-auto grid max-w-[900px] grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.l}
              className={`px-6 py-2 text-center ${i < 3 ? "md:border-r md:border-[var(--border-color)]" : ""}`}
            >
              <div
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#6055D9",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {stat.n}
              </div>
              <div
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  marginTop: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {stat.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="bg-[linear-gradient(135deg,#F0EFFF_0%,#F7F6FF_50%,#EEF0FB_100%)] px-6 py-[88px] dark:bg-[linear-gradient(135deg,#0a0818_0%,#12101f_45%,#16122e_100%)]"
      >
        <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto 52px" }}>
          <h2
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 32,
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            Meet our team
          </h2>
          <p
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 15,
              fontWeight: 400,
              color: "var(--text-secondary)",
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            These people work on making our product the best it can be.
          </p>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--bg-secondary)",
          padding: "88px 24px",
          borderTop: "0.5px solid var(--border-color)",
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(96,85,217,0.1)",
                border: "0.5px solid rgba(96,85,217,0.3)",
                borderRadius: 9999,
                padding: "5px 16px",
                fontSize: 11,
                fontWeight: 700,
                color: "#6055D9",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 16,
                fontFamily: "Inter Tight, sans-serif",
              }}
            >
              How We Work
            </span>
            <h2
              style={{
                fontFamily: "Inter Tight, sans-serif",
                fontSize: "clamp(26px, 4vw, 38px)",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              The principles that guide us
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {VALUES.map((val) => (
              <div
                key={val.title}
                className="transition-all duration-200 ease-out hover:border-[rgba(96,85,217,0.3)] hover:shadow-[0_4px_20px_rgba(96,85,217,0.07)]"
                style={{
                  background: "var(--bg-card)",
                  border: "0.5px solid var(--border-color)",
                  borderRadius: 16,
                  padding: "28px 24px",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <ValueSectionIcon title={val.title} />
                <div
                  style={{
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  {val.title}
                </div>
                <p
                  style={{
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                  }}
                >
                  {val.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--bg-primary)",
          padding: "88px 24px",
          borderTop: "0.5px solid var(--border-color)",
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            background: "linear-gradient(135deg, #6055D9 0%, #4038B0 100%)",
            borderRadius: 24,
            padding: "64px 52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 40,
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -80,
              top: -80,
              width: 300,
              height: 300,
              background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontFamily: "Inter Tight, sans-serif",
                fontSize: "clamp(24px, 3.5vw, 34px)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.15,
                marginBottom: 10,
                letterSpacing: "-0.025em",
              }}
            >
              Want to join the team?
            </h2>
            <p
              style={{
                fontFamily: "Inter Tight, sans-serif",
                fontSize: 15,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 400,
                maxWidth: 400,
                lineHeight: 1.65,
              }}
            >
              We&apos;re always looking for exceptional engineers, AI researchers, and product thinkers. If that&apos;s you,
              let&apos;s talk.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexShrink: 0, position: "relative", zIndex: 1 }}>
            <BookingButton
              source="team-cta"
              style={{
                background: "#ffffff",
                color: "#6055D9",
                padding: "12px 28px",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "Inter Tight, sans-serif",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                transition: "opacity 0.2s ease",
              }}
            >
              Get in Touch →
            </BookingButton>
          </div>
        </div>
      </section>
    </>
  );
}
