import { NextResponse } from "next/server";
import { getHomepagePayloadFromSource } from "@/lib/get-homepage";

export async function GET(): Promise<NextResponse> {
  const payload = await getHomepagePayloadFromSource();
  return NextResponse.json(payload);
}
