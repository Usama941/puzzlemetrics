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

export function resolvePaletteColor(color: string | undefined | null): string {
  if (!color) return DEFAULT_PALETTE_COLOR;
  const normalized = color.toLowerCase();
  const match = COLOR_PALETTE.find((c) => c.color.toLowerCase() === normalized);
  return match?.color ?? DEFAULT_PALETTE_COLOR;
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
  const resolved = resolvePaletteColor(selectedColor);
  const swatchSize = compact ? 28 : 32;

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
            background: resolved,
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        />
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
          {COLOR_PALETTE.find((c) => c.color === resolved)?.name ?? "Violet"}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: compact ? "repeat(6, 1fr)" : "repeat(9, 1fr)",
          gap: 8,
        }}
      >
        {COLOR_PALETTE.map(({ color, name }) => (
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
              border:
                resolved === color ? "3px solid white" : "2px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              padding: 0,
              transition: "transform 0.1s",
              transform: resolved === color ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
};
