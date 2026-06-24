"use client";

import { useState } from "react";

type Props = {
  label?: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

export const TagInput = ({ label, value, onChange, placeholder = "Type and press Enter..." }: Props) => {
  const [inputVal, setInputVal] = useState("");

  const add = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    onChange([...(value || []), trimmed]);
    setInputVal("");
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
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          style={{
            flex: 1,
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(value || []).map((item, i) => (
          <span
            key={`${item}-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(96,85,217,0.15)",
              border: "1px solid rgba(96,85,217,0.3)",
              borderRadius: 999,
              padding: "4px 12px",
              color: "white",
              fontSize: 13,
            }}
          >
            {item}
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
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
