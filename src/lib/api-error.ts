import { NextResponse } from "next/server";

export function internalServerError(context: string, error: unknown): NextResponse {
  console.error(`Error in ${context}:`, error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
