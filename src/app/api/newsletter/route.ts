import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
});

const windowMs = 60_000;
const maxPerWindow = 20;
const hits = new Map<string, number[]>();

const prune = (key: string, now: number): void => {
  const arr = hits.get(key) ?? [];
  const next = arr.filter((t) => now - t < windowMs);
  hits.set(key, next);
};

const rateLimited = (key: string): boolean => {
  const now = Date.now();
  prune(key, now);
  const arr = hits.get(key) ?? [];
  if (arr.length >= maxPerWindow) {
    return true;
  }
  arr.push(now);
  hits.set(key, arr);
  return false;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  return NextResponse.json({ ok: true });
}
