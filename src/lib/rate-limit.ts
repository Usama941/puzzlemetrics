import type { NextRequest } from "next/server";

type RateRecord = { count: number; resetAt: number };

export function getClientIp(request: NextRequest | Request): string {
  const headers = request.headers;
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

export function createRateLimiter(maxAttempts: number, windowMs: number) {
  const attempts = new Map<string, RateRecord>();

  return function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = attempts.get(ip);

    if (!record || record.resetAt < now) {
      attempts.set(ip, { count: 1, resetAt: now + windowMs });
      return true;
    }

    if (record.count >= maxAttempts) return false;

    record.count++;
    return true;
  };
}

/** Max 5 login attempts per IP per 15 minutes. */
export const checkLoginRateLimit = createRateLimiter(5, 15 * 60 * 1000);

/** Max 3 contact submissions per IP per hour. */
export const checkContactRateLimit = createRateLimiter(3, 60 * 60 * 1000);
