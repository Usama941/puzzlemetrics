"use client";

import { useState } from "react";

export function NewsletterInput() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) {
      setSubscribed(true);
    }
  };

  if (subscribed) {
    return (
      <p className="font-[family-name:var(--font-inter-tight)] text-[13px] font-semibold text-[#22C55E]">✓ You&apos;re subscribed!</p>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="your@email.com"
        className="min-w-0 flex-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-[#6055D9] dark:bg-[rgba(255,255,255,0.06)]"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="flex h-[38px] w-[38px] shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-[#6055D9] font-[family-name:var(--font-inter-tight)] text-[16px] font-bold text-white transition-colors hover:bg-[#4038B0]"
        aria-label="Subscribe"
      >
        →
      </button>
    </div>
  );
}
