"use client";

import { useState } from "react";
import type { ProductMockup, ProductMockupRow } from "@/types/product";
import { ProductStatsInput } from "@/components/admin/products/ProductStatsInput";
import { adminInputClass, adminLabelClass } from "@/components/admin/admin-ui";

type Props = {
  value: ProductMockup;
  onChange: (next: ProductMockup) => void;
};

export const ProductMockupInput = ({ value, onChange }: Props) => {
  const [leftInput, setLeftInput] = useState("");
  const [rightInput, setRightInput] = useState("");

  const rows = value.rowsSection?.rows ?? [];

  const addRow = () => {
    const left = leftInput.trim();
    const right = rightInput.trim();
    if (!left && !right) return;
    const nextRow: ProductMockupRow = { left, right };
    onChange({
      ...value,
      rowsSection: {
        title: value.rowsSection?.title ?? "",
        rows: [...rows, nextRow],
      },
    });
    setLeftInput("");
    setRightInput("");
  };

  const removeRow = (index: number) => {
    onChange({
      ...value,
      rowsSection: {
        title: value.rowsSection?.title ?? "",
        rows: rows.filter((_, idx) => idx !== index),
      },
    });
  };

  return (
    <div className="space-y-5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-white/45">Dashboard mockup</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>URL bar</label>
          <input
            className={adminInputClass}
            value={value.urlBar ?? ""}
            onChange={(e) => onChange({ ...value, urlBar: e.target.value })}
            placeholder="app.example.com"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Mockup title</label>
          <input
            className={adminInputClass}
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className={adminLabelClass}>Status label</label>
          <input
            className={adminInputClass}
            value={value.statusLabel ?? ""}
            onChange={(e) => onChange({ ...value, statusLabel: e.target.value })}
            placeholder="Live"
          />
        </div>
        <div>
          <label className={adminLabelClass}>Accent color (hex)</label>
          <input
            className={adminInputClass}
            value={value.accentColor ?? ""}
            onChange={(e) => onChange({ ...value, accentColor: e.target.value })}
            placeholder="#6055D9"
          />
        </div>
        <div>
          <label className={adminLabelClass}>Badge color (hex)</label>
          <input
            className={adminInputClass}
            value={value.badgeColor ?? ""}
            onChange={(e) => onChange({ ...value, badgeColor: e.target.value })}
            placeholder="#22C55E"
          />
        </div>
      </div>

      <ProductStatsInput
        label="Mini stats (mockup cards)"
        value={value.miniStats ?? []}
        onChange={(miniStats) => onChange({ ...value, miniStats })}
      />

      <div>
        <label className={adminLabelClass}>Rows section title</label>
        <input
          className={adminInputClass}
          value={value.rowsSection?.title ?? ""}
          onChange={(e) =>
            onChange({
              ...value,
              rowsSection: { title: e.target.value, rows },
            })
          }
          placeholder="UPCOMING MATCHES"
        />
      </div>

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
          Mockup rows (left / right)
        </label>
        <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <input
            type="text"
            value={leftInput}
            onChange={(e) => setLeftInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addRow();
              }
            }}
            placeholder="Left (e.g. Lions FC vs Eagles)"
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
          <input
            type="text"
            value={rightInput}
            onChange={(e) => setRightInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addRow();
              }
            }}
            placeholder="Right (e.g. Today 3PM)"
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
          <button
            type="button"
            onClick={addRow}
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
            Add row
          </button>
        </div>
        <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {rows.map((row, i) => (
            <li
              key={`${row.left}-${row.right}-${i}`}
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
                {row.left}
                <span style={{ color: "rgba(255,255,255,0.45)", marginLeft: 8 }}>{row.right}</span>
              </span>
              <button
                type="button"
                onClick={() => removeRow(i)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  fontSize: 18,
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ProductStatsInput
        label="Bottom stats (mockup footer)"
        value={value.bottomStats ?? []}
        onChange={(bottomStats) => onChange({ ...value, bottomStats })}
      />
    </div>
  );
};
