"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme";

const PRIMARY_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Portfolio", href: "/portfolio" },
] as const;

/** Shown under desktop “More” — order: Team, Case Studies, Blog */
const MORE_NAV_LINKS = [
  { label: "Team", href: "/team" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
] as const;

const MOBILE_NAV_LINKS = [...PRIMARY_NAV_LINKS, ...MORE_NAV_LINKS];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const moreWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const closeMobile = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", closeMobile);
    closeMobile();
    return () => mq.removeEventListener("change", closeMobile);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const onDoc = (e: MouseEvent) => {
      const el = moreWrapRef.current;
      if (el && !el.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [moreOpen]);

  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moreOpen]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === "dark";

  const linkIsActive = (href: string) => {
    const base = href.split("#")[0];
    return pathname === href || (base !== "/" && pathname != null && pathname.startsWith(base));
  };

  const isMoreGroupActive = MORE_NAV_LINKS.some((link) => linkIsActive(link.href));

  return (
    <header
      className="px-3 sm:px-5 lg:px-6"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        paddingTop: isScrolled ? 0 : 12,
        paddingBottom: isScrolled ? 0 : 12,
        display: "flex",
        justifyContent: isScrolled ? "flex-start" : "center",
        transition: "padding 420ms cubic-bezier(0.22, 1, 0.36, 1), justify-content 420ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <nav
        className={`min-w-0 gap-2 transition-[width,margin-left,border-radius,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-3 ${
          isScrolled
            ? "ml-[-12px] w-[calc(100%+12px)] sm:ml-[-20px] sm:w-[calc(100%+20px)] lg:ml-[-24px] lg:w-[calc(100%+24px)]"
            : "w-full max-w-[min(1100px,100%)]"
        }`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isDark ? "rgba(15, 14, 32, 0.88)" : "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(20px)",
          border: isDark ? "0.5px solid rgba(255,255,255,0.1)" : "0.5px solid rgba(0,0,0,0.08)",
          borderRadius: isScrolled ? "0 9999px 9999px 0" : 9999,
          padding: "10px 10px 10px 14px",
          boxShadow: isScrolled
            ? isDark
              ? "0 12px 34px rgba(0,0,0,0.5), 0 2px 0 rgba(255,255,255,0.06)"
              : "0 12px 30px rgba(10,10,20,0.16), 0 1px 0 rgba(255,255,255,0.65)"
            : isDark
              ? "0 8px 26px rgba(0,0,0,0.42)"
              : "0 8px 24px rgba(10,10,20,0.12)",
          transition: "background 0.2s, box-shadow 0.2s, border-radius 420ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Link
          href="/"
          className="min-w-0 shrink-0"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        >
          <Image src="/logo.png" alt="PuzzleMetrics" width={32} height={32} priority style={{ display: "block", flexShrink: 0 }} />
          <span
            className="truncate text-[15px] sm:text-[17px]"
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontWeight: 700,
              color: isDark ? "#FFFFFF" : "#0A0A14",
              maxWidth: "min(160px, 42vw)",
            }}
          >
            PuzzleMetrics
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex" style={{ gap: 2 }}>
          {PRIMARY_NAV_LINKS.map((link) => {
            const isActive = linkIsActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "Inter Tight, sans-serif",
                  color: isActive
                    ? "#6055D9"
                    : isDark
                      ? "rgba(255,255,255,0.65)"
                      : "rgba(10,10,20,0.6)",
                  textDecoration: "none",
                  padding: "7px 12px",
                  borderRadius: 9999,
                  background: isActive
                    ? isDark
                      ? "rgba(96,85,217,0.15)"
                      : "rgba(96,85,217,0.08)"
                    : "transparent",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.background = isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.04)";
                    (e.target as HTMLElement).style.color = isDark ? "#FFFFFF" : "#0A0A14";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.background = "transparent";
                    (e.target as HTMLElement).style.color = isDark
                      ? "rgba(255,255,255,0.65)"
                      : "rgba(10,10,20,0.6)";
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <div ref={moreWrapRef} style={{ position: "relative" }}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((o) => !o)}
              style={{
                fontSize: 13,
                fontWeight: 500,
                fontFamily: "Inter Tight, sans-serif",
                color:
                  isMoreGroupActive || moreOpen
                    ? "#6055D9"
                    : isDark
                      ? "rgba(255,255,255,0.65)"
                      : "rgba(10,10,20,0.6)",
                padding: "7px 12px",
                borderRadius: 9999,
                border: "none",
                cursor: "pointer",
                background:
                  isMoreGroupActive || moreOpen
                    ? isDark
                      ? "rgba(96,85,217,0.15)"
                      : "rgba(96,85,217,0.08)"
                    : "transparent",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) => {
                if (!isMoreGroupActive && !moreOpen) {
                  (e.currentTarget as HTMLButtonElement).style.background = isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLButtonElement).style.color = isDark ? "#FFFFFF" : "#0A0A14";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMoreGroupActive && !moreOpen) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    isMoreGroupActive || moreOpen
                      ? isDark
                        ? "rgba(96,85,217,0.15)"
                        : "rgba(96,85,217,0.08)"
                      : "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    isMoreGroupActive || moreOpen
                      ? "#6055D9"
                      : isDark
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(10,10,20,0.6)";
                }
              }}
            >
              More
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="2.5">
                <path d={moreOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
              </svg>
            </button>

            {moreOpen ? (
              <div
                role="menu"
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  minWidth: 200,
                  padding: "8px 0",
                  borderRadius: 16,
                  border: isDark ? "0.5px solid rgba(255,255,255,0.1)" : "0.5px solid rgba(0,0,0,0.08)",
                  background: isDark ? "rgba(15, 14, 32, 0.98)" : "rgba(255, 255, 255, 0.98)",
                  backdropFilter: "blur(20px)",
                  boxShadow: isDark ? "0 12px 40px rgba(0,0,0,0.5)" : "0 12px 40px rgba(0,0,0,0.12)",
                  zIndex: 120,
                }}
              >
                {MORE_NAV_LINKS.map((link) => {
                  const isActive = linkIsActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      role="menuitem"
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: "Inter Tight, sans-serif",
                        color: isActive ? "#6055D9" : isDark ? "rgba(255,255,255,0.85)" : "rgba(10,10,20,0.75)",
                        textDecoration: "none",
                        padding: "10px 16px",
                        background: isActive ? (isDark ? "rgba(96,85,217,0.12)" : "rgba(96,85,217,0.08)") : "transparent",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive)
                          (e.target as HTMLElement).style.background = isDark
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) (e.target as HTMLElement).style.background = "transparent";
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="shrink-0" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              width: 38,
              height: 38,
              borderRadius: 9999,
              border: isDark ? "0.5px solid rgba(255,255,255,0.15)" : "0.5px solid rgba(0,0,0,0.12)",
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)",
            }}
          >
            {isDark ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <Link
            href="/contact"
            style={{
              background: isDark ? "#FFFFFF" : "#0A0A14",
              color: isDark ? "#000000" : "#FFFFFF",
              padding: "9px 20px",
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "Inter Tight, sans-serif",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              transition: "opacity 0.15s",
              whiteSpace: "nowrap",
            }}
            className="hidden lg:inline-flex"
          >
            Contact Us
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center lg:hidden"
            style={{
              width: 38,
              height: 38,
              borderRadius: 9999,
              border: isDark ? "0.5px solid rgba(255,255,255,0.15)" : "0.5px solid rgba(0,0,0,0.12)",
              background: "transparent",
              cursor: "pointer",
              color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div
          className="lg:hidden overflow-y-auto"
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            top: 72,
            background: isDark ? "#0B0B14" : "#FFFFFF",
            zIndex: 99,
            padding: "24px 20px",
            paddingBottom: "max(32px, env(safe-area-inset-bottom, 0px))",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {MOBILE_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: 22,
                fontWeight: 600,
                fontFamily: "Inter Tight, sans-serif",
                color: isDark ? "#FFFFFF" : "#0A0A14",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: isDark ? "0.5px solid rgba(255,255,255,0.06)" : "0.5px solid rgba(0,0,0,0.06)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            style={{
              marginTop: 24,
              background: "#6055D9",
              color: "#FFFFFF",
              padding: "14px 24px",
              borderRadius: 9999,
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
              width: "100%",
            }}
            className="block"
          >
            Contact Us
          </Link>
        </div>
      ) : null}
    </header>
  );
}
