"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import BookingModal from "@/components/booking/BookingModal";
import Navbar from "@/components/layout/Navbar";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import ProgressBar from "@/components/ui/ProgressBar";

/**
 * Marketing site chrome (nav, footer, booking). Hidden on /admin so the dashboard
 * and login are standalone.
 *
 * Footer is passed from the server layout so it can load DB-backed content.
 */
export function PublicSiteChrome({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = (pathname ?? "").startsWith("/admin");

  return (
    <>
      <ProgressBar />
      {!isAdmin ? <Navbar /> : null}
      {!isAdmin ? <BookingModal /> : null}
      <main className="relative z-[1] w-full">{children}</main>
      {!isAdmin ? footer : null}
      {!isAdmin ? <ScrollToTopButton /> : null}
    </>
  );
}
