import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { checkLoginRateLimit, getClientIp } from "@/lib/rate-limit";

const authSecret = () => process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (
    req.method === "POST" &&
    (pathname === "/api/auth/callback/credentials" || pathname === "/api/auth/login")
  ) {
    const ip = getClientIp(req);
    if (!checkLoginRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  }

  if (pathname.startsWith("/api/admin")) {
    const token = await getToken({ req, secret: authSecret() });
    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret: authSecret() });
    if (!token?.sub) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/auth/callback/credentials", "/api/auth/login"],
};
