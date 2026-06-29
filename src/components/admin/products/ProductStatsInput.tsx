"use client";

import { useState } from "react";
import type { ProductStat } from "@/types/product";

type Props = {
  label?: string;
  value: ProductStat[];
  onChange: (next: ProductStat[]) => void;
};

export const ProductStatsInput = ({ label = "Stats", value, onChange }: Props) => {
  const [valueInput, setValueInput] = useState("");
  const [labelInput, setLabelInput] = useState("");

  const add = () => {
    const v = valueInput.trim();
    const l = labelInput.trim();
    if (!v || !l) return;
    onChange([...value, { value: v, label: l }]);
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
        {label}
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
          placeholder="Value (e.g. 1,200+)"
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
          placeholder="Label (e.g. Active Users)"
          style={{
            flex: "1 1 140px",
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

      <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {value.map((row, i) => (
          <li
            key={`${row.value}-${row.label}-${i}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "10px 14px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
            }}
          >
            <span style={{ color: "white", fontSize: 13 }}>
              <strong>{row.value}</strong>
              <span style={{ color: "rgba(255,255,255,0.45)", marginLeft: 8 }}>{row.label}</span>
            </span>
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
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
