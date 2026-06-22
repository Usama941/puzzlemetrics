"use client";

import { useState } from "react";

type Props = {
  buttonClassName?: string;
  /** Slightly longer animation on listing CTA */
  pulseButton?: boolean;
};

export function NewsletterSignup({ buttonClassName = "", pulseButton = false }: Props) {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <form
      className="mx-auto mt-8 flex max-w-[400px] flex-col gap-3 sm:flex-row sm:gap-2.5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubscribed(true);
      }}
    >
      <input
        type="email"
        required
        disabled={subscribed}
        placeholder="your@email.com"
        className="min-w-0 flex-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] px-5 py-3 font-[family-name:var(--font-inter-tight)] text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#6055D9] focus:outline-none focus:ring-[3px] focus:ring-[rgba(96,85,217,0.1)] disabled:opacity-60"
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={subscribed}
        className={`shrink-0 rounded-full px-[22px] py-3 font-[family-name:var(--font-inter-tight)] text-[13px] font-semibold text-white transition-colors disabled:cursor-default ${buttonClassName} ${
          subscribed ? "bg-[#10B981]" : "bg-[#6055D9]"
        } ${pulseButton && !subscribed ? "animate-[pulseGlow_3s_ease_infinite]" : ""}`}
      >
        {subscribed ? "✓ You're in!" : "Subscribe →"}
      </button>
    </form>
  );
}
