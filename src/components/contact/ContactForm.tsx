"use client";

import { useState } from "react";

const SUBJECTS = [
  "What's this about?",
  "AI Agents / Automation",
  "RAG Systems",
  "Ads Intelligence",
  "Full Product Build",
  "AI Strategy / Consulting",
  "Something else",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: name.trim(),
          email: email.trim(),
          subject,
          message: message.trim(),
        }),
      });
    } catch (err) {
      console.error("Contact submission error:", err);
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-500/30 bg-emerald-500/10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-[family-name:var(--font-inter-tight)] text-lg font-bold text-[var(--text-primary)]">Message sent!</p>
        <p className="mt-2 font-[family-name:var(--font-inter-tight)] text-sm text-[var(--text-secondary)]">We&apos;ll reply within 4 hours.</p>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-secondary)] px-[14px] py-[11px] font-[family-name:var(--font-inter-tight)] text-sm text-[var(--text-primary)] outline-none transition-shadow focus:border-[#6055D9] focus:shadow-[0_0_0_3px_rgba(96,85,217,0.1)]";
  const labelClass =
    "mb-[5px] block font-[family-name:var(--font-inter-tight)] text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className={labelClass} htmlFor="contact-name">
          Name
        </label>
        <input id="contact-name" className={fieldClass} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          className={fieldClass}
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-subject">
          Subject
        </label>
        <select id="contact-subject" className={fieldClass} value={subject} onChange={(e) => setSubject(e.target.value)}>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className={`${fieldClass} resize-none leading-relaxed`}
          placeholder="Tell us about your project..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-[#6055D9] py-[13px] font-[family-name:var(--font-inter-tight)] text-sm font-bold text-white transition-opacity hover:opacity-95"
      >
        Send Message →
      </button>
    </form>
  );
}
