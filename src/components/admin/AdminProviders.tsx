"use client";

import { SessionProvider } from "next-auth/react";
import { AdminToastProvider } from "./AdminToast";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminToastProvider>{children}</AdminToastProvider>
    </SessionProvider>
  );
}
