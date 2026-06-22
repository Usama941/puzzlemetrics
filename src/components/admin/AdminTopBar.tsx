"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

function crumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const labels: Record<string, string> = {
    admin: "Admin",
    hero: "Hero",
    services: "Services",
    portfolio: "Portfolio",
    "case-studies": "Case Studies",
    blog: "Blog",
    team: "Team",
    testimonials: "Testimonials",
    pricing: "Pricing",
    submissions: "Submissions",
    "email-settings": "Email",
    new: "New",
    edit: "Edit",
  };
  const segments: { href: string; label: string }[] = [];
  let acc = "";
  for (const p of parts) {
    acc += `/${p}`;
    segments.push({ href: acc, label: labels[p] ?? p });
  }
  return segments;
}

export function AdminTopBar() {
  const pathname = usePathname();
  const segments = crumbs(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0B0B14] px-6">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-white/50">
        {segments.map((s, i) => (
          <span key={s.href} className="flex items-center gap-1">
            {i > 0 ? <span className="text-white/25">/</span> : null}
            {i === segments.length - 1 ? (
              <span className="font-medium text-white/90">{s.label}</span>
            ) : (
              <Link href={s.href} className="hover:text-white/80">
                {s.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
      <div className="flex items-center gap-4 text-sm">
        <span className="text-white/50">Hello, Admin</span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="text-[#7B6EE8] hover:underline"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
