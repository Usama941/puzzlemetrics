import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { internalServerError } from "@/lib/api-error";
import { sendContactFormEmails } from "@/lib/mailer";
import { checkContactRateLimit, getClientIp } from "@/lib/rate-limit";
import { parseContactFormBody } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkContactRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests, please try again later" },
      { status: 429 },
    );
  }

  try {
    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = parseContactFormBody(raw);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const data = parsed.data;

    await prisma.formSubmission.create({
      data: { type: data.type, data, status: "new" },
    });

    const { adminSent, userSent } = await sendContactFormEmails({
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      budget: data.budget,
      services: data.services,
    });

    if (!adminSent) {
      console.warn("[Contact API] Admin notification email was not sent — check SMTP / email settings.");
    }
    if (!userSent) {
      console.warn("[Contact API] User confirmation email was not sent — check SMTP / email settings.");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return internalServerError("contact API", err);
  }
}
