"use client";

const FALLBACK = "#6055D9";
const HEX_RE = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

function toPickerHex(value) {
  const v = value?.trim() ?? "";
  if (HEX_RE.test(v)) {
    if (v.length === 4) {
      return `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`;
    }
    return v;
  }
  return FALLBACK;
}

/**
 * @param {{ label: string; value?: string | null; onChange: (color: string) => void }} props
 */
export function ColorPicker({ label, value, onChange }) {
  const pickerHex = toPickerHex(value);
  const hexInput = value?.trim() ?? "";

  const commitHex = (raw) => {
    const next = raw.trim();
    if (!next) {
      onChange("");
      return;
    }
    const withHash = next.startsWith("#") ? next : `#${next}`;
    if (HEX_RE.test(withHash)) {
      onChange(toPickerHex(withHash));
    }
  };

  return (
    <div>
      {label ? (
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
          {label}
        </label>
      ) : null}

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <label
          title="Pick a color"
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: pickerHex,
            border: "2px solid rgba(255,255,255,0.2)",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <input
            type="color"
            value={pickerHex}
            onChange={(e) => onChange(e.target.value)}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          />
        </label>

        <input
          type="text"
          value={hexInput}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => commitHex(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commitHex(e.currentTarget.value);
            }
          }}
          placeholder={FALLBACK}
          spellCheck={false}
          style={{
            flex: 1,
            padding: "10px 14px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10,
            color: "white",
            fontSize: 13,
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
          }}
        />
      </div>
    </div>
  );
}

export default ColorPicker;
