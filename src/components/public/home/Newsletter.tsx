"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { sectionFadeUp } from "@/lib/animations";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  };

  return (
    <section className="border-t border-[#D6D3F0] bg-[#F4F3FC] px-[clamp(24px,5vw,80px)] py-[clamp(60px,8vh,100px)] dark:border-[#2a2748] dark:bg-[#0F0E28]">
      <motion.div className="mx-auto max-w-[720px] text-center" {...sectionFadeUp}>
        <h2 className="font-syne text-[clamp(28px,3.5vw,40px)] font-extrabold text-[#0D0B1A] dark:text-[#FAFAFE]">
          The Intelligence Brief
        </h2>
        <p className="mt-3 font-sans text-[16px] font-light text-[#4A4870] dark:text-[#C4C2E8]">
          Practical AI insights, case studies and updates — no noise, just signal.
        </p>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-8 flex max-w-[460px] flex-col gap-3 sm:flex-row"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-[48px] w-full flex-1 rounded-l-[12px] rounded-r-[12px] border-[1.5px] border-[#D6D3F0] bg-white px-[18px] py-[13px] font-sans text-sm text-[#0D0B1A] outline-none transition-colors duration-200 ease-in-out placeholder:text-[#8A87B0] focus:border-[#6055D9] sm:rounded-r-none dark:border-[#2a2748] dark:bg-[#08071A] dark:text-[#FAFAFE]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="min-h-[48px] shrink-0 rounded-l-[12px] rounded-r-[12px] bg-[#0D0B1A] px-6 font-sans text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-[#6055D9] enabled:cursor-pointer disabled:opacity-60 sm:rounded-l-none"
          >
            {status === "loading" ? "…" : "Subscribe"}
          </button>
        </form>
        {status === "ok" ? (
          <p className="mt-3 text-sm text-[#6055D9]" role="status">
            You&apos;re on the list.
          </p>
        ) : null}
        {status === "err" ? (
          <p className="mt-3 text-sm text-red-600" role="alert">
            Something went wrong. Try again.
          </p>
        ) : null}
      </motion.div>
    </section>
  );
}

export default Newsletter;
