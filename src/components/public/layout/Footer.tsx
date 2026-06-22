"use client";

import Link from "next/link";
import BookingButton from "@/components/booking/BookingButton";
import Logo from "@/components/Logo";

const SERVICE_LINKS: { label: string; href: string }[] = [
  { label: "AI Agents", href: "/services/saas-ai-agents" },
  { label: "RAG Systems", href: "/services/rag-systems" },
  { label: "Ads Intelligence", href: "/services/meta-google-ads-ai" },
  { label: "Campaign Automation", href: "/services/campaign-automation" },
  { label: "Data Analytics", href: "/services/data-analytics" },
  { label: "AI Consulting", href: "/services/ai-strategy-consulting" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#D6D3F0] bg-white px-[clamp(24px,5vw,80px)] pb-8 pt-[clamp(60px,8vh,80px)] dark:border-[#2a2748] dark:bg-[#08071A]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.2fr] lg:gap-10">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 no-underline">
            <Logo size={34} />
            <span className="font-syne text-[17px] font-extrabold tracking-tight text-[#0D0B1A] dark:text-[#FAFAFE]">
              PuzzleMetrics
            </span>
          </Link>
          <p className="mt-4 max-w-[240px] font-sans text-[13px] font-light leading-relaxed text-[#8A87B0]">
            AI Services &amp; Products. UK-based, globally operational.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { label: "Li", href: "https://www.linkedin.com", aria: "LinkedIn" },
              { label: "X", href: "https://x.com", aria: "X" },
              { label: "Ig", href: "https://www.instagram.com", aria: "Instagram" },
              { label: "Up", href: "https://www.upwork.com", aria: "Upwork" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.aria}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-[#D6D3F0] font-mono text-[11px] uppercase tracking-wide text-[#8A87B0] transition-colors duration-200 ease-in-out hover:border-[#6055D9] hover:bg-[#EDEAFF] dark:border-[#2a2748] dark:hover:bg-[#0F0E28]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-syne text-[13px] font-bold text-[#0D0B1A] dark:text-[#FAFAFE]">Services</p>
          <ul className="mt-4 space-y-2 font-sans text-[13px] font-light text-[#4A4870] dark:text-[#C4C2E8]">
            {SERVICE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors duration-200 ease-in-out hover:text-[#6055D9]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-syne text-[13px] font-bold text-[#0D0B1A] dark:text-[#FAFAFE]">Products</p>
          <ul className="mt-4 space-y-2 font-sans text-[13px] font-light text-[#4A4870] dark:text-[#C4C2E8]">
            <li>
              <Link href="/products" className="transition-colors duration-200 ease-in-out hover:text-[#6055D9]">
                Platform overview
              </Link>
            </li>
            <li>
              <Link href="/products" className="transition-colors duration-200 ease-in-out hover:text-[#6055D9]">
                Solutions catalogue
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-syne text-[13px] font-bold text-[#0D0B1A] dark:text-[#FAFAFE]">Company</p>
          <ul className="mt-4 space-y-2 font-sans text-[13px] font-light text-[#4A4870] dark:text-[#C4C2E8]">
            <li>
              <Link href="/about" className="transition-colors duration-200 ease-in-out hover:text-[#6055D9]">
                About
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="transition-colors duration-200 ease-in-out hover:text-[#6055D9]">
                Case Studies
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition-colors duration-200 ease-in-out hover:text-[#6055D9]">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors duration-200 ease-in-out hover:text-[#6055D9]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-syne text-[13px] font-bold text-[#0D0B1A] dark:text-[#FAFAFE]">Connect</p>
          <BookingButton
            source="public-footer"
            className="mt-4 flex w-full items-center justify-center rounded-[10px] bg-[#6055D9] px-4 py-3 text-center font-sans text-sm font-medium text-white transition-opacity duration-200 ease-in-out hover:opacity-95"
            style={{ textDecoration: "none" }}
          >
            Book a Call
          </BookingButton>
          <a
            href="mailto:hello@puzzlemetrics.com"
            className="mt-4 block font-sans text-[13px] text-[#8A87B0] transition-colors duration-200 ease-in-out hover:text-[#6055D9]"
          >
            hello@puzzlemetrics.com
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1280px] flex-col gap-4 border-t border-[#D6D3F0] pt-6 text-[#8A87B0] dark:border-[#2a2748] md:flex-row md:items-center md:justify-between">
        <p className="text-[13px]">© 2025 PuzzleMetrics. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 text-[12px]">
          <Link href="/privacy" className="transition-colors duration-200 ease-in-out hover:text-[#6055D9]">
            Privacy Policy
          </Link>
          <span aria-hidden className="text-[#D6D3F0] dark:text-[#2a2748]">
            ·
          </span>
          <Link href="/terms" className="transition-colors duration-200 ease-in-out hover:text-[#6055D9]">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
