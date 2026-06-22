import { NextResponse } from "next/server";
import { defaultTickerLabels } from "@/lib/homepage-defaults";

/** Ticker copy is static until a dedicated model is added to the schema. */
export async function GET(): Promise<NextResponse> {
  const items = defaultTickerLabels().map((label, index) => ({
    id: `default-${index}`,
    label,
  }));
  return NextResponse.json({ items });
}
