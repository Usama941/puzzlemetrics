"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import BookingButton from "@/components/booking/BookingButton";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import LoaderScreen from "@/components/public/layout/LoaderScreen";
import { useTheme } from "@/hooks/useTheme";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
] as const;

export const RootShell = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? <LoaderScreen onComplete={() => setLoading(false)} /> : null}
      {children}
    </>
  );
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 h-[68px] w-full border-b transition-[background-color,backdrop-filter,border-color] duration-200 ease-in-out ${
          scrolled
            ? "border-[#D6D3F0]/80 bg-[#FAFAFE]/75 backdrop-blur-[20px] dark:border-white/10 dark:bg-[#08071A]/75"
            : "border-[#D6D3F0]/30 bg-[#FAFAFE] dark:border-transparent dark:bg-[#08071A]"
        }`}
      >
        <div className="relative mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5 no-underline">
            <span className="inline-block shrink-0 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
              <Logo size={38} priority />
            </span>
            <span className="font-syne text-[17px] font-extrabold tracking-tight text-[#0D0B1A] dark:text-[#FAFAFE]">
              PuzzleMetrics
            </span>
          </Link>

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-normal text-[#0D0B1A] transition-colors duration-200 ease-in-out hover:text-[#6055D9] dark:text-[#FAFAFE] dark:hover:text-[#6055D9]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#D6D3F0] bg-[#FAFAFE]/80 text-[#0D0B1A] transition-colors duration-200 ease-in-out hover:bg-[#F4F3FC] dark:border-white/15 dark:bg-[#0F0E28] dark:text-[#FAFAFE]"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <BookingButton
              source="public-navbar"
              className="hidden rounded-[12px] bg-[#6055D9] px-4 py-2.5 text-sm font-medium text-[#FAFAFE] transition-opacity duration-200 ease-in-out hover:opacity-95 md:inline-flex"
              style={{ textDecoration: "none" }}
            >
              Get Started
            </BookingButton>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#D6D3F0] bg-[#FAFAFE]/80 md:hidden dark:border-white/15 dark:bg-[#0F0E28]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5 text-[#FAFAFE]" /> : <Menu className="h-5 w-5 text-[#0D0B1A] dark:text-[#FAFAFE]" />}
            </button>
          </div>
        </div>
      </header>

      <div className="h-[68px]" aria-hidden />

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#08071A]" />
            <div className="relative flex h-full flex-col px-6 pt-6">
              <div className="flex items-center justify-between">
                <span className="font-syne text-lg font-extrabold text-[#FAFAFE]">PuzzleMetrics</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/15 text-[#FAFAFE]"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-16 flex flex-1 flex-col gap-8" aria-label="Mobile">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-syne text-2xl font-extrabold text-[#FAFAFE]"
                  >
                    {l.label}
                  </Link>
                ))}
                <BookingButton
                  source="public-navbar-mobile"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-[12px] bg-[#6055D9] py-3.5 text-center font-syne text-lg font-extrabold text-[#FAFAFE]"
                  style={{ textDecoration: "none" }}
                >
                  Get Started
                </BookingButton>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
