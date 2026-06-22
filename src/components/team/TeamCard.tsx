"use client";

import { useState } from "react";
import type { TeamMember } from "@prisma/client";
import { useTheme } from "@/lib/theme";

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  let background: string;
  let border: string;
  let boxShadow: string;
  if (isDark) {
    if (hovered) {
      background = "rgba(96,85,217,0.14)";
      border = "1px solid rgba(96,85,217,0.38)";
      boxShadow =
        "0 8px 32px rgba(96,85,217,0.2), 0 2px 12px rgba(0,0,0,0.45)";
    } else {
      background = "rgba(22, 20, 48, 0.72)";
      border = "1px solid rgba(255,255,255,0.12)";
      boxShadow = "0 4px 24px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.25)";
    }
  } else if (hovered) {
    background = "rgba(96,85,217,0.07)";
    border = "1px solid rgba(96,85,217,0.25)";
    boxShadow = "0 8px 32px rgba(96,85,217,0.12), 0 2px 8px rgba(96,85,217,0.08)";
  } else {
    background = "rgba(255,255,255,0.55)";
    border = "1px solid rgba(255,255,255,0.8)";
    boxShadow = "0 4px 24px rgba(96,85,217,0.06), 0 1px 4px rgba(0,0,0,0.04)";
  }

  const nameColor = "var(--text-primary)";
  const bioColor = "var(--text-secondary)";
  const avatarRing = isDark ? "3px solid rgba(255,255,255,0.18)" : "3px solid rgba(255,255,255,0.92)";
  const avatarShadow = isDark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(96,85,217,0.22)";

  const socialBg = isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.70)";
  const socialBorder = isDark ? "1px solid rgba(96,85,217,0.28)" : "1px solid rgba(96,85,217,0.12)";
  const socialColor = isDark ? "rgba(196,190,255,0.85)" : "rgba(96,85,217,0.6)";

  const resetSocial = (el: HTMLAnchorElement) => {
    el.style.background = socialBg;
    el.style.color = socialColor;
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 24,
        padding: "32px 24px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transition: "all 0.22s ease",
        cursor: "default",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background,
        border,
        boxShadow,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        width: "100%",
      }}
    >
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          overflow: "hidden",
          border: avatarRing,
          boxShadow: avatarShadow,
          marginBottom: 18,
          flexShrink: 0,
          position: "relative",
        }}
      >
        {member.photo && !imgFailed ? (
          <img
            src={member.photo}
            alt={member.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
            onError={() => setImgFailed(true)}
          />
        ) : null}
        <div
          style={{
            display: member.photo && !imgFailed ? "none" : "flex",
            position: "absolute",
            inset: 0,
            background: member.gradient,
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter Tight, sans-serif",
            fontSize: 28,
            fontWeight: 800,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          {member.initials}
        </div>
      </div>

      <div
        style={{
          fontFamily: "Inter Tight, sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: nameColor,
          letterSpacing: "-0.01em",
          marginBottom: 4,
        }}
      >
        {member.name}
      </div>

      <div
        style={{
          fontFamily: "Inter Tight, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: "#6055D9",
          marginBottom: 14,
        }}
      >
        {member.role}
      </div>

      <p
        style={{
          fontFamily: "Inter Tight, sans-serif",
          fontSize: 13,
          fontWeight: 400,
          color: bioColor,
          lineHeight: 1.65,
          textAlign: "center",
          marginBottom: 20,
          maxWidth: 220,
          marginLeft: "auto",
          marginRight: "auto",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {member.bio}
      </p>

      <div
        style={{
          height: "0.5px",
          background: isDark ? "rgba(96,85,217,0.25)" : "rgba(96,85,217,0.12)",
          width: "100%",
          marginBottom: 16,
        }}
      />

      <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
        <a
          href={member.linkedin}
          aria-label="LinkedIn"
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: socialBg,
            border: socialBorder,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: socialColor,
            textDecoration: "none",
            transition: "all 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(96,85,217,0.2)";
            el.style.color = "#6055D9";
          }}
          onMouseLeave={(e) => resetSocial(e.currentTarget)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>

        <a
          href="#"
          aria-label="X"
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: socialBg,
            border: socialBorder,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: socialColor,
            textDecoration: "none",
            transition: "all 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(96,85,217,0.2)";
            el.style.color = "#6055D9";
          }}
          onMouseLeave={(e) => resetSocial(e.currentTarget)}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        <a
          href="mailto:contact@puzzlemetrics.com"
          aria-label="Email"
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: socialBg,
            border: socialBorder,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: socialColor,
            textDecoration: "none",
            transition: "all 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(96,85,217,0.2)";
            el.style.color = "#6055D9";
          }}
          onMouseLeave={(e) => resetSocial(e.currentTarget)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
