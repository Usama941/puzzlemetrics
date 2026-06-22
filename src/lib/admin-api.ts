import type { NextRequest } from "next/server";
import { getSessionFromRequest, type JwtPayload } from "@/lib/auth-jwt";

export const requireAuth = (request: NextRequest): JwtPayload | null => {
  return getSessionFromRequest(request);
};

const isAdminRole = (role: string): boolean => role === "super_admin" || role === "admin";

export const requireSuperAdmin = (request: NextRequest): JwtPayload | null => {
  const session = getSessionFromRequest(request);
  if (!session || !isAdminRole(session.role)) {
    return null;
  }
  return session;
};
