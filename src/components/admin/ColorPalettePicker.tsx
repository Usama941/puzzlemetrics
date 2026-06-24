"use client";

export const COLOR_PALETTE = [
  { color: "#6055D9", name: "Violet" },
  { color: "#7B6EE8", name: "Light Violet" },
  { color: "#4038B0", name: "Dark Violet" },
  { color: "#10B981", name: "Green" },
  { color: "#059669", name: "Dark Green" },
  { color: "#0EA5E9", name: "Blue" },
  { color: "#0284C7", name: "Dark Blue" },
  { color: "#F59E0B", name: "Amber" },
  { color: "#D97706", name: "Dark Amber" },
  { color: "#EF4444", name: "Red" },
  { color: "#DC2626", name: "Dark Red" },
  { color: "#8B5CF6", name: "Purple" },
  { color: "#EC4899", name: "Pink" },
  { color: "#14B8A6", name: "Teal" },
  { color: "#F97316", name: "Orange" },
  { color: "#6366F1", name: "Indigo" },
  { color: "#0F172A", name: "Dark" },
  { color: "#ffffff", name: "White" },
] as const;

export const DEFAULT_PALETTE_COLOR = "#6055D9";

export function normalizeColor(color: string | undefined | null): string {
  const trimmed = color?.trim();
  return trimmed || DEFAULT_PALETTE_COLOR;
}

/** @deprecated Use normalizeColor — kept for callers that only need a fallback */
export function resolvePaletteColor(color: string | undefined | null): string {
  return normalizeColor(color);
}

export function getColorDisplayName(color: string): string {
  const normalized = color.toLowerCase();
  const match = COLOR_PALETTE.find((c) => c.color.toLowerCase() === normalized);
  return match?.name ?? "Custom";
}

export function isPaletteColor(color: string): boolean {
  const normalized = color.toLowerCase();
  return COLOR_PALETTE.some((c) => c.color.toLowerCase() === normalized);
}

type Props = {
  label?: string;
  selectedColor: string;
  onChange: (color: string) => void;
  compact?: boolean;
};

export const ColorPalettePicker = ({
  label = "Color",
  selectedColor,
  onChange,
  compact = false,
}: Props) => {
  const activeColor = normalizeColor(selectedColor);
  const swatchSize = compact ? 28 : 32;
  const customSelected = !isPaletteColor(activeColor);

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
        {label}
      </label>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: swatchSize,
            height: swatchSize,
            borderRadius: 8,
            background: activeColor,
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        />
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
          {getColorDisplayName(activeColor)}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: compact ? "repeat(6, 1fr)" : "repeat(9, 1fr)",
          gap: 8,
        }}
      >
        {COLOR_PALETTE.map(({ color, name }) => {
          const isSelected = activeColor.toLowerCase() === color.toLowerCase();
          return (
            <button
              key={color}
              type="button"
              title={name}
              onClick={() => onChange(color)}
              style={{
                width: swatchSize,
                height: swatchSize,
                borderRadius: 8,
                background: color,
                border: isSelected ? "3px solid white" : "2px solid rgba(255,255,255,0.15)",
                cursor: "pointer",
                padding: 0,
                transition: "transform 0.1s",
                transform: isSelected ? "scale(1.2)" : "scale(1)",
              }}
            />
          );
        })}

        <label
          title="Custom color"
          style={{
            width: swatchSize,
            height: swatchSize,
            borderRadius: 8,
            background: customSelected
              ? activeColor
              : "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
            border: customSelected ? "3px solid white" : "2px solid rgba(255,255,255,0.15)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            transform: customSelected ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.1s",
          }}
        >
          <input
            type="color"
            value={activeColor}
            onChange={(e) => onChange(e.target.value)}
            style={{
              position: "absolute",
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          />
          {!customSelected ? (
            <span style={{ fontSize: 16, pointerEvents: "none", color: "white", fontWeight: 700 }}>+</span>
          ) : null}
        </label>
      </div>
    </div>
  );
};
