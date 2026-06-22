import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  AUTH_COOKIE_NAME,
  authCookieOptions,
  signAuthToken,
  verifyPassword,
} from "@/lib/auth-jwt";
import { checkLoginRateLimit, getClientIp } from "@/lib/rate-limit";
import { internalServerError } from "@/lib/api-error";
import { sanitizeString } from "@/lib/validation";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(request);
  if (!checkLoginRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { email, password } = parsed.data;

  try {
    const user = await prisma.adminUser.findUnique({
      where: { email: sanitizeString(email, 255).toLowerCase() },
      select: { id: true, role: true, password: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await verifyPassword(password, user.password);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signAuthToken(user.id, user.role);
    const response = NextResponse.json({ role: user.role });
    response.cookies.set(AUTH_COOKIE_NAME, token, authCookieOptions);
    return response;
  } catch (err) {
    return internalServerError("login API", err);
  }
}
