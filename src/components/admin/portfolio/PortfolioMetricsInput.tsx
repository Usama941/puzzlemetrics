"use client";

import { useState } from "react";
import ColorPicker from "@/components/admin/ColorPicker";

const DEFAULT_METRIC_COLOR = "#6055D9";

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
      color: typeof x.color === "string" && x.color.trim() ? x.color.trim() : DEFAULT_METRIC_COLOR,
    }));
}

export const PortfolioMetricsInput = ({ value, onChange }: Props) => {
  const [valueInput, setValueInput] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [colorInput, setColorInput] = useState(DEFAULT_METRIC_COLOR);

  const add = () => {
    const v = valueInput.trim();
    const l = labelInput.trim();
    if (!v || !l) return;
    const c = colorInput.trim() || DEFAULT_METRIC_COLOR;
    onChange([...value, { value: v, label: l, color: c }]);
    setValueInput("");
    setLabelInput("");
    setColorInput(DEFAULT_METRIC_COLOR);
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
      <div style={{ marginBottom: 10, maxWidth: 260 }}>
        <ColorPicker label="Color" value={colorInput} onChange={setColorInput} />
      </div>

      <div>
        {value.map((item, i) => (
          <div
            key={`${item.value}-${item.label}-${i}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "10px 14px",
              marginBottom: 8,
            }}
          >
            <strong style={{ color: item.color, minWidth: 60 }}>{item.value}</strong>

            <span style={{ color: "rgba(255,255,255,0.7)", flex: 1 }}>{item.label}</span>
            <div style={{ width: 180, minWidth: 180 }}>
              <ColorPicker
                label=""
                value={item.color}
                onChange={(nextColor) => {
                  const color = nextColor.trim() || DEFAULT_METRIC_COLOR;
                  onChange(value.map((m, idx) => (idx === i ? { ...m, color } : m)));
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => remove(i)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
                fontSize: 18,
                lineHeight: 1,
                padding: 0,
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
