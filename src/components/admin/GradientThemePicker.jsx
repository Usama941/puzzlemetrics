"use client";

import { THEME_MAP } from "@/lib/portfolioThemes";

const THEME_ORDER = ["violet", "teal", "indigo", "plum", "ink"];

/**
 * @param {{ value?: string | null; onChange: (id: string) => void }} props
 */
export default function GradientThemePicker({ value, onChange }) {
  const selected = value && THEME_MAP[value] ? value : "violet";

  return (
    <div>
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          display: "block",
          marginBottom: 10,
        }}
      >
        Card theme
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 8 }}>
        {THEME_ORDER.map((id) => {
          const theme = THEME_MAP[id];
          if (!theme) return null;
          const isActive = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              title={theme.name}
              style={{
                border: isActive ? "2px solid #ffffff" : "1px solid rgba(255,255,255,0.16)",
                borderRadius: 10,
                overflow: "hidden",
                background: "transparent",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <div style={{ height: 42, background: theme.gradient }} />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.75)",
                  padding: "6px 8px 7px",
                  textTransform: "capitalize",
                }}
              >
                {id}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
