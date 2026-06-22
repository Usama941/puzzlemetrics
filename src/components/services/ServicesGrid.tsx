"use client";

import type { Service } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ServiceIcon } from "./ServiceIcon";

type FilterTag = { label: string; slug: string };

export default function ServicesGrid({ services }: { services: Service[] }) {
  const [active, setActive] = useState<string>("all");

  const filterTags: FilterTag[] = useMemo(() => {
    const rest = services.map((s) => ({ label: s.shortTitle || s.title, slug: s.slug }));
    return [{ label: "All", slug: "all" }, ...rest];
  }, [services]);

  const filtered = useMemo(() => {
    if (active === "all") return services;
    return services.filter((s) => s.slug === active);
  }, [active, services]);

  return (
    <div>
      <div className="mb-[52px] flex flex-wrap justify-center gap-2">
        {filterTags.map((tag) => {
          const isActive = active === tag.slug;
          return (
            <button
              key={tag.slug}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(tag.slug)}
              style={{
                background: isActive ? "#6055D9" : "var(--bg-card)",
                color: isActive ? "#ffffff" : "var(--text-secondary)",
                border: isActive ? "1px solid #6055D9" : "1px solid var(--border-color)",
                borderRadius: 9999,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                fontFamily: "Inter Tight, sans-serif",
                cursor: "pointer",
                transition: "all 0.18s ease",
                boxShadow: isActive ? "0 0 16px rgba(96,85,217,0.3)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "rgba(96,85,217,0.35)";
                  e.currentTarget.style.color = "#6055D9";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
            >
              {tag.label}
            </button>
          );
        })}
      </div>

      <div
        className={
          filtered.length === 1 ? "mx-auto grid max-w-2xl grid-cols-1 gap-5" : "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        }
      >
        {filtered.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      id={service.slug}
      className="group flex cursor-default flex-col rounded-[20px] border border-[var(--border-color)] bg-[var(--bg-card)] p-8 transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(96,85,217,0.3)] hover:shadow-[0_8px_32px_rgba(96,85,217,0.08)]"
    >
      <div className="mb-5 flex items-start justify-between" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <span
          style={{
            background: service.accentBg,
            border: `1px solid ${service.accentBorder}`,
            borderRadius: 9999,
            padding: "3px 10px",
            fontSize: 11,
            fontWeight: 800,
            color: service.accentColor,
            fontFamily: "Inter Tight, sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          {service.number}
        </span>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: service.accentBg,
            border: `1px solid ${service.accentBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: service.accentColor,
          }}
        >
          <ServiceIcon name={service.icon} color={service.accentColor} />
        </div>
      </div>

      <div
        style={{
          fontFamily: "Inter Tight, sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: 4,
        }}
      >
        {service.title}
      </div>

      <div
        style={{
          fontFamily: "Inter Tight, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: service.accentColor,
          marginBottom: 14,
        }}
      >
        {service.tagline}
      </div>

      <p
        style={{
          fontFamily: "Inter Tight, sans-serif",
          fontSize: 14,
          fontWeight: 400,
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          marginBottom: 20,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {service.description}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {service.outcomes.map((outcome) => (
          <div key={outcome} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div
              style={{
                width: 16,
                height: 16,
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
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke={service.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="2 6 5 9 10 3" />
              </svg>
            </div>
            <span style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 13, color: "var(--text-secondary)" }}>{outcome}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: 9999,
              padding: "3px 10px",
              fontSize: 11,
              fontWeight: 500,
              color: "var(--text-muted)",
              fontFamily: "Inter Tight, sans-serif",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
          paddingTop: 20,
          borderTop: "1px solid var(--border-color)",
        }}
      >
        <Link
          href={`/services/${service.slug}`}
          style={{
            fontFamily: "Inter Tight, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: service.accentColor,
            textDecoration: "none",
          }}
        >
          Learn more →
        </Link>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: service.accentBg,
            border: `1px solid ${service.accentBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={service.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
