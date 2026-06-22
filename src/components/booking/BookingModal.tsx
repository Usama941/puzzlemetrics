"use client";

import {
  BarChart3,
  Bot,
  Calendar,
  ClipboardList,
  Code2,
  FileText,
  HelpCircle,
  Layers,
  Megaphone,
  Phone,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/context/BookingContext";

type Step = "type" | "details" | "confirm";

const SERVICE_OPTIONS: { id: string; label: string; Icon: LucideIcon }[] = [
  { id: "ai-agents", label: "AI Agents", Icon: Bot },
  { id: "rag", label: "RAG Systems", Icon: Layers },
  { id: "ads-ai", label: "Ads Intelligence", Icon: Megaphone },
  { id: "automation", label: "Campaign Automation", Icon: Workflow },
  { id: "analytics", label: "Data Analytics", Icon: BarChart3 },
  { id: "product-dev", label: "Full-Stack AI Dev", Icon: Code2 },
  { id: "strategy", label: "AI Strategy", Icon: Target },
  { id: "not-sure", label: "Not sure yet", Icon: HelpCircle },
];

const NEXT_STEP_ITEMS: { Icon: LucideIcon; text: string }[] = [
  { Icon: Calendar, text: "Calendar invite sent within 2 hours" },
  { Icon: ClipboardList, text: "Brief questionnaire to prepare us" },
  { Icon: Phone, text: "30-min call focused on your specific needs" },
  { Icon: FileText, text: "Written scope + honest assessment after" },
];

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [step, setStep] = useState<Step>("type");
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    budget: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;
    if (isOpen) {
      t1 = setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      t2 = setTimeout(() => {
        setStep("type");
        setSelected([]);
        setSubmitted(false);
        setForm({ name: "", email: "", company: "", message: "", budget: "" });
      }, 300);
    }
    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeBooking]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          name: form.name,
          email: form.email,
          company: form.company,
          budget: form.budget,
          message: form.message,
          services: selected,
        }),
      });
    } catch (err) {
      console.error("Booking submission error:", err);
    }
    setSubmitted(true);
  };

  const progressSteps = ["type", "details", "confirm"];
  const progressIdx = progressSteps.indexOf(step);

  return (
    <div
      role="presentation"
      onClick={closeBooking}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-primary)",
          borderRadius: 24,
          width: "100%",
          maxWidth: 560,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(96,85,217,0.15)",
          transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          position: "relative",
        }}
      >
        <div
          style={{
            padding: "24px 28px 20px",
            borderBottom: "1px solid var(--border-color)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            background: "var(--bg-primary)",
            zIndex: 10,
            borderRadius: "24px 24px 0 0",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#6055D9",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "Inter Tight, sans-serif",
                marginBottom: 4,
              }}
            >
              BOOK A DISCOVERY CALL
            </div>
            <div
              id="booking-modal-title"
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--text-primary)",
                fontFamily: "Inter Tight, sans-serif",
              }}
            >
              {step === "type" && "What can we help with?"}
              {step === "details" && "Tell us about you"}
              {step === "confirm" && "Almost there"}
            </div>
          </div>

          <button
            type="button"
            onClick={closeBooking}
            aria-label="Close"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid var(--border-color)",
              background: "var(--bg-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {!submitted && (
          <div style={{ height: 3, background: "var(--bg-secondary)", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                background: "linear-gradient(90deg, #6055D9, #7B6EE8)",
                borderRadius: "0 9999px 9999px 0",
                width: `${((progressIdx + 1) / 3) * 100}%`,
                transition: "width 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
        )}

        <div style={{ padding: "28px 28px 32px" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 0 8px" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(16,185,129,0.1)",
                  border: "2px solid rgba(16,185,129,0.3)",
                  margin: "0 auto 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 10,
                }}
              >
                You&apos;re booked in!
              </div>
              <div
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  maxWidth: 380,
                  margin: "0 auto 28px",
                }}
              >
                We&apos;ll send a calendar invite to <strong>{form.email}</strong> within 2 hours. Discovery calls are 30 minutes, no pitch deck
                required.
              </div>
              <div
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 14,
                  padding: "16px 20px",
                  textAlign: "left",
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 8,
                  }}
                >
                  WHAT HAPPENS NEXT
                </div>
                {NEXT_STEP_ITEMS.map(({ Icon, text }, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: "Inter Tight, sans-serif",
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      marginBottom: 6,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <span style={{ display: "flex", marginTop: 2, flexShrink: 0, color: "#6055D9" }}>
                      <Icon size={16} strokeWidth={2} aria-hidden />
                    </span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={closeBooking}
                style={{
                  background: "#6055D9",
                  color: "white",
                  border: "none",
                  borderRadius: 9999,
                  padding: "12px 32px",
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Close
              </button>
            </div>
          ) : step === "type" ? (
            <>
              <p
                style={{
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  marginBottom: 20,
                  lineHeight: 1.6,
                }}
              >
                Select all that apply — this helps us prepare for the call.
              </p>
              <div className="booking-service-grid">
                {SERVICE_OPTIONS.map((opt) => {
                  const isSelected = selected.includes(opt.id);
                  const TileIcon = opt.Icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setSelected((prev) => (prev.includes(opt.id) ? prev.filter((x) => x !== opt.id) : [...prev, opt.id]))
                      }
                      style={{
                        background: isSelected ? "rgba(96,85,217,0.08)" : "var(--bg-secondary)",
                        border: isSelected ? "1.5px solid rgba(96,85,217,0.4)" : "1px solid var(--border-color)",
                        borderRadius: 14,
                        padding: "14px 16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        textAlign: "left",
                        transition: "all 0.15s ease",
                        boxShadow: isSelected ? "0 0 0 3px rgba(96,85,217,0.08)" : "none",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          flexShrink: 0,
                          alignItems: "center",
                          justifyContent: "center",
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: isSelected ? "rgba(96,85,217,0.18)" : "rgba(96,85,217,0.08)",
                          color: isSelected ? "#6055D9" : "var(--text-muted)",
                        }}
                        aria-hidden
                      >
                        <TileIcon size={20} strokeWidth={1.75} />
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter Tight, sans-serif",
                          fontSize: 13,
                          fontWeight: isSelected ? 600 : 400,
                          color: isSelected ? "#6055D9" : "var(--text-primary)",
                          lineHeight: 1.3,
                        }}
                      >
                        {opt.label}
                      </span>
                      {isSelected && (
                        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6055D9" strokeWidth="2.5" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => selected.length > 0 && setStep("details")}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: selected.length > 0 ? "#6055D9" : "var(--bg-secondary)",
                  color: selected.length > 0 ? "white" : "var(--text-muted)",
                  border: "none",
                  borderRadius: 9999,
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: selected.length > 0 ? "pointer" : "default",
                  transition: "all 0.2s",
                  boxShadow: selected.length > 0 ? "0 0 24px rgba(96,85,217,0.3)" : "none",
                }}
              >
                Continue →
              </button>
              <p
                style={{
                  textAlign: "center",
                  marginTop: 12,
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 12,
                  color: "var(--text-muted)",
                }}
              >
                Free 30-min call · No pitch deck · No obligation
              </p>
            </>
          ) : step === "details" ? (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                {(
                  [
                    { key: "name", label: "Your Name *", placeholder: "Alex Khan", type: "text" },
                    { key: "email", label: "Work Email *", placeholder: "alex@company.com", type: "email" },
                    { key: "company", label: "Company", placeholder: "Acme Corp", type: "text" },
                  ] as const
                ).map((field) => (
                  <div key={field.key}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: 6,
                        fontFamily: "Inter Tight, sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: 12,
                        fontFamily: "Inter Tight, sans-serif",
                        fontSize: 14,
                        color: "var(--text-primary)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#6055D9";
                        e.target.style.boxShadow = "0 0 0 3px rgba(96,85,217,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border-color)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 6,
                      fontFamily: "Inter Tight, sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Budget Range
                  </label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Under £5k", "£5k–£15k", "£15k–£50k", "£50k+", "Not sure"].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, budget: b }))}
                        style={{
                          padding: "8px 14px",
                          borderRadius: 9999,
                          border: form.budget === b ? "1.5px solid #6055D9" : "1px solid var(--border-color)",
                          background: form.budget === b ? "rgba(96,85,217,0.08)" : "var(--bg-secondary)",
                          color: form.budget === b ? "#6055D9" : "var(--text-secondary)",
                          fontFamily: "Inter Tight, sans-serif",
                          fontSize: 12,
                          fontWeight: form.budget === b ? 600 : 400,
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 6,
                      fontFamily: "Inter Tight, sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Anything to add? (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us briefly about your project or the problem you're trying to solve..."
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                      borderRadius: 12,
                      fontFamily: "Inter Tight, sans-serif",
                      fontSize: 14,
                      color: "var(--text-primary)",
                      outline: "none",
                      resize: "none",
                      boxSizing: "border-box",
                      lineHeight: 1.6,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#6055D9";
                      e.target.style.boxShadow = "0 0 0 3px rgba(96,85,217,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border-color)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setStep("type")}
                  style={{
                    padding: "13px 20px",
                    background: "transparent",
                    border: "1px solid var(--border-color)",
                    borderRadius: 9999,
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => form.name && form.email && setStep("confirm")}
                  style={{
                    flex: 1,
                    padding: "13px",
                    background: form.name && form.email ? "#6055D9" : "var(--bg-secondary)",
                    color: form.name && form.email ? "white" : "var(--text-muted)",
                    border: "none",
                    borderRadius: 9999,
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: form.name && form.email ? "pointer" : "default",
                    transition: "all 0.2s",
                    boxShadow: form.name && form.email ? "0 0 24px rgba(96,85,217,0.3)" : "none",
                  }}
                >
                  Review Booking →
                </button>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 16,
                  padding: "20px 22px",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 14,
                    fontFamily: "Inter Tight, sans-serif",
                  }}
                >
                  BOOKING SUMMARY
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {(
                    [
                      { label: "Name", value: form.name },
                      { label: "Email", value: form.email },
                      { label: "Company", value: form.company || "—" },
                      { label: "Budget", value: form.budget || "—" },
                      {
                        label: "Services",
                        value: selected.map((s) => SERVICE_OPTIONS.find((o) => o.id === s)?.label).join(", "),
                      },
                    ] as const
                  ).map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                      <span style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 12, color: "var(--text-muted)", flexShrink: 0 }}>
                        {row.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter Tight, sans-serif",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          textAlign: "right",
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: "rgba(96,85,217,0.06)",
                  border: "1px solid rgba(96,85,217,0.15)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  marginBottom: 20,
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ display: "flex", flexShrink: 0, marginTop: 1, color: "#6055D9" }} aria-hidden>
                  <Calendar size={18} strokeWidth={2} />
                </span>
                <span>
                  We&apos;ll send a calendar invite to <strong>{form.email}</strong> within 2 hours of submitting.
                </span>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  style={{
                    padding: "13px 20px",
                    background: "transparent",
                    border: "1px solid var(--border-color)",
                    borderRadius: 9999,
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  style={{
                    flex: 1,
                    padding: "13px",
                    background: "#6055D9",
                    color: "white",
                    border: "none",
                    borderRadius: 9999,
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 0 28px rgba(96,85,217,0.35)",
                    transition: "all 0.2s",
                  }}
                >
                  Confirm Booking →
                </button>
              </div>

              <p
                style={{
                  textAlign: "center",
                  marginTop: 12,
                  fontFamily: "Inter Tight, sans-serif",
                  fontSize: 12,
                  color: "var(--text-muted)",
                }}
              >
                By booking, you agree to our privacy policy. No spam, ever.
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        .booking-service-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 28px;
        }
        @media (max-width: 420px) {
          .booking-service-grid { grid-template-columns: 1fr; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
