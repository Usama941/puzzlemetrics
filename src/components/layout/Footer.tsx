import Link from "next/link";
import { Suspense } from "react";
import Logo from "@/components/Logo";
import { FooterCompanyNumber } from "@/components/layout/FooterCompanyNumber";
import { FooterSocialLinks } from "@/components/layout/FooterSocialLinks";
import { NewsletterInput } from "@/components/layout/NewsletterInput";

type NavItem = { label: string; href: string };

const QUICK_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
];

const COMPANY_LINKS: NavItem[] = [
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Integration", href: "/#integrations" },
  { label: "Style Guide", href: "/style-guide" },
  { label: "Licences", href: "/licences" },
  { label: "Changelog", href: "/changelog" },
];


const footerHeadingClass =
  "mb-4 font-[family-name:var(--font-inter-tight)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] dark:text-white/50";

const footerLinkClass =
  "font-[family-name:var(--font-inter-tight)] text-[14px] font-normal text-[var(--text-primary)] transition-colors duration-200 ease-in-out hover:text-pm dark:text-white dark:hover:text-white/70";

const footerBorderClass = "border-[var(--border-color)] dark:border-white/10";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[1] border-t border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] dark:border-transparent dark:bg-gradient-to-b dark:from-[#0f0a1e] dark:via-[#0c0818] dark:to-black dark:text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 no-underline">
              <Logo size={36} />
              <span
                className="font-[family-name:var(--font-inter-tight)] text-[17px] font-bold tracking-tight text-[var(--text-primary)] dark:text-white"
              >
                PuzzleMetrics
              </span>
            </Link>
          </div>

          <FooterColumn title="Quick Links" items={QUICK_LINKS} />
          <FooterColumn title="Company" items={COMPANY_LINKS} />

          <div className="flex flex-col gap-4">
            <h2 className={footerHeadingClass}>Stay in the loop</h2>
            <p className="font-[family-name:var(--font-inter-tight)] text-[13px] leading-relaxed text-[var(--text-muted)]">
              AI insights worth reading — twice a month, no noise.
            </p>
            <NewsletterInput />
            <FooterSocialLinks />
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <div
            className="relative mx-auto w-full max-w-[1200px] overflow-hidden px-4 pt-3"
            style={{
              height: "clamp(4.25rem, 10vw, 7.75rem)",
            }}
            aria-hidden
          >
            <p
              className="pointer-events-none absolute left-1/2 top-3 w-max max-w-[100vw] -translate-x-1/2 select-none whitespace-nowrap text-center font-bold leading-[0.78] tracking-[-0.05em] text-pm/25 dark:text-[rgba(230,224,255,0.5)]"
              style={{
                fontFamily: "Inter Tight, sans-serif",
                fontSize: "clamp(4rem, 19vw, 11rem)",
              }}
            >
              PuzzleMetrics
            </p>
          </div>
        </div>

        <div
          className={`mt-6 flex flex-col items-center justify-between gap-6 border-t pt-8 md:mt-8 md:flex-row md:items-center ${footerBorderClass}`}
        >
          <div>
            <p className="text-center font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-muted)] md:text-left dark:text-white/70">
              © {year} PuzzleMetrics. All rights reserved.
            </p>
            <Suspense fallback={null}>
              <FooterCompanyNumber />
            </Suspense>
          </div>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-primary)] dark:text-white"
            aria-label="Legal"
          >
            <Link
              href="/privacy"
              className="underline decoration-[var(--border-color)] underline-offset-4 transition hover:decoration-pm dark:decoration-white/50 dark:hover:decoration-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="underline decoration-[var(--border-color)] underline-offset-4 transition hover:decoration-pm dark:decoration-white/50 dark:hover:decoration-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="underline decoration-[var(--border-color)] underline-offset-4 transition hover:decoration-pm dark:decoration-white/50 dark:hover:decoration-white"
            >
              Cookies Settings
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, items }: { title: string; items: NavItem[] }) => (
  <div>
    <h2 className={footerHeadingClass}>{title}</h2>
    <nav className="flex flex-col gap-3" aria-label={title}>
      {items.map((item) => (
        <Link key={item.href + item.label} href={item.href} className={footerLinkClass}>
          {item.label}
        </Link>
      ))}
    </nav>
  </div>
);
