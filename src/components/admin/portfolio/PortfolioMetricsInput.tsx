"use client";

import { useState } from "react";
import { ColorPalettePicker, DEFAULT_PALETTE_COLOR, resolvePaletteColor } from "@/components/admin/ColorPalettePicker";

export type PortfolioMetricItem = {
  value: string;
  label: string;
  color: string;
};

type Props = {
  value: PortfolioMetricItem[];
  onChange: (next: PortfolioMetricItem[]) => void;
};

export function parsePortfolioMetrics(m: unknown): PortfolioMetricItem[] {
  if (!Array.isArray(m)) return [];
  return m
    .filter((x): x is { value: unknown; label: unknown; color?: unknown } => !!x && typeof x === "object")
    .filter((x) => "value" in x && "label" in x)
    .map((x) => ({
      value: String(x.value),
      label: String(x.label),
      color: resolvePaletteColor(typeof x.color === "string" ? x.color : DEFAULT_PALETTE_COLOR),
    }));
}

export const PortfolioMetricsInput = ({ value, onChange }: Props) => {
  const [valueInput, setValueInput] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [metricColor, setMetricColor] = useState(DEFAULT_PALETTE_COLOR);

  const add = () => {
    const v = valueInput.trim();
    const l = labelInput.trim();
    if (!v || !l) return;
    onChange([...value, { value: v, label: l, color: metricColor }]);
    setValueInput("");
    setLabelInput("");
  };

  const remove = (index: number) => {
    onChange(value.filter((_, idx) => idx !== index));
  };

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
        Metrics
      </label>

      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <input
          type="text"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Value (e.g. 8.0×)"
          style={{
            flex: "1 1 120px",
            padding: "10px 14px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10,
            color: "white",
            fontSize: 13,
          }}
        />
        <input
          type="text"
          value={labelInput}
          onChange={(e) => setLabelInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Label (e.g. Final ROAS)"
          style={{
            flex: "1 1 160px",
            padding: "10px 14px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10,
            color: "white",
            fontSize: 13,
          }}
        />
        <button
          type="button"
          onClick={add}
          style={{
            padding: "10px 16px",
            background: "#6055D9",
            color: "white",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          Add
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <ColorPalettePicker
          label="Metric color"
          selectedColor={metricColor}
          onChange={setMetricColor}
          compact
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {value.map((item, i) => (
          <span
            key={`${item.value}-${item.label}-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(96,85,217,0.15)",
              border: "1px solid rgba(96,85,217,0.3)",
              borderRadius: 999,
              padding: "4px 12px",
              color: "white",
              fontSize: 13,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: item.color,
                border: "1px solid rgba(255,255,255,0.25)",
                flexShrink: 0,
              }}
            />
            <strong style={{ color: item.color }}>{item.value}</strong>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
            <button
              type="button"
              onClick={() => remove(i)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
                fontSize: 16,
                lineHeight: 1,
                padding: 0,
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
