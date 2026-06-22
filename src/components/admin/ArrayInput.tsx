"use client";

import { useState } from "react";
import { adminInputClass } from "./admin-ui";

type Props = {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

export function ArrayInput({ label, value, onChange, placeholder = "Type and press Enter" }: Props) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const t = draft.trim();
    if (!t || value.includes(t)) return;
    onChange([...value, t]);
    setDraft("");
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/60">{label}</label>
      <div className="flex gap-2">
        <input
          className={adminInputClass}
          placeholder={placeholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <button type="button" className="rounded-full bg-white/10 px-4 text-sm text-white/80 hover:bg-white/15" onClick={add}>
          Add
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 rounded-full bg-[#6055D9]/25 px-3 py-1 text-xs text-white/90"
          >
            {item}
            <button
              type="button"
              className="ml-1 text-white/60 hover:text-white"
              onClick={() => onChange(value.filter((v) => v !== item))}
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
