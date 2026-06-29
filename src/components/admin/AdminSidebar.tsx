"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BarChart3,
  Briefcase,
  CreditCard,
  FileEdit,
  FileText,
  FolderOpen,
  ImageIcon,
  Inbox,
  LayoutGrid,
  LayoutTemplate,
  Mail,
  Package,
  Settings,
  Share2,
  Star,
  Users,
} from "lucide-react";

const navContent = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid, exact: true },
  { href: "/admin/hero", label: "Hero Section", icon: LayoutTemplate },
  { href: "/admin/stats", label: "Homepage Stats", icon: BarChart3 },
  { href: "/admin/logos", label: "Company Logos", icon: ImageIcon },
  { href: "/admin/social-links", label: "Social Links", icon: Share2 },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderOpen },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/case-studies", label: "Case Studies", icon: FileText },
  { href: "/admin/blog", label: "Blog Posts", icon: FileEdit },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/pricing", label: "Pricing Plans", icon: CreditCard },
];

const navComm = [
  { href: "/admin/submissions", label: "Form Submissions", icon: Inbox, badge: true as const },
  { href: "/admin/email-settings", label: "Email Settings", icon: Mail },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href || pathname === `${href}/`;
  return pathname === href || pathname.startsWith(`${href}/`);
}

type Props = { newSubmissionsCount: number };

export function AdminSidebar({ newSubmissionsCount }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-white/[0.07] bg-[#0F0E20]"
      style={{ borderRightColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-2 px-4 py-5">
        <Image src="/logo.png" alt="" width={32} height={32} className="rounded-lg" />
        <span className="text-sm font-bold text-white">PuzzleMetrics</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-wider text-white/35">Content</p>
        <ul className="space-y-0.5">
          {navContent.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(pathname, href, exact);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    active
                      ? "border-l-[3px] border-[#6055D9] bg-[rgba(96,85,217,0.15)] pl-[9px] text-[#7B6EE8]"
                      : "border-l-[3px] border-transparent pl-[12px] text-white/65 hover:bg-white/[0.04] hover:text-white/90"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-90" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-white/35">Communications</p>
        <ul className="space-y-0.5">
          {navComm.map(({ href, label, icon: Icon, badge }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    active
                      ? "border-l-[3px] border-[#6055D9] bg-[rgba(96,85,217,0.15)] pl-[9px] text-[#7B6EE8]"
                      : "border-l-[3px] border-transparent pl-[12px] text-white/65 hover:bg-white/[0.04] hover:text-white/90"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-90" />
                  <span className="flex-1">{label}</span>
                  {badge && newSubmissionsCount > 0 ? (
                    <span className="rounded-full bg-[#6055D9] px-2 py-0.5 text-[10px] font-bold text-white">
                      {newSubmissionsCount > 99 ? "99+" : newSubmissionsCount}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/[0.07] p-3">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full rounded-full border border-white/15 bg-white/[0.04] py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/[0.08]"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
