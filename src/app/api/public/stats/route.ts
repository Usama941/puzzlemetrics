import { NextResponse } from "next/server";
import { getPublicStats } from "@/lib/public-stats";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getPublicStats();
    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json([], {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }
}
