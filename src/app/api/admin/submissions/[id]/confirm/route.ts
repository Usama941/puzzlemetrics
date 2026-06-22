import type { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { internalServerError } from "@/lib/api-error";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { sendCalendarConfirmation } from "@/lib/mailer";
import { isValidUrl, parseRouteId, sanitizeString } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;

  const { id: rawId } = await context.params;
  const id = parseRouteId(rawId);
  if (!id) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const calendarLink = sanitizeString(payload.calendarLink, 2048);
  const meetingNotes = sanitizeString(payload.meetingNotes, 5000);

  if (!calendarLink) {
    return NextResponse.json({ error: "calendarLink is required" }, { status: 400 });
  }

  if (!isValidUrl(calendarLink)) {
    return NextResponse.json({ error: "Invalid calendar link URL" }, { status: 400 });
  }

  try {
    const submission = await prisma.formSubmission.findUnique({ where: { id } });
    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const data = submission.data as Record<string, unknown>;
    const userEmail = typeof data.email === "string" ? sanitizeString(data.email, 255) : "";
    const userName = typeof data.name === "string" ? sanitizeString(data.name, 100) : "there";

    if (!userEmail) {
      return NextResponse.json({ error: "No email in submission" }, { status: 400 });
    }

    const sent = await sendCalendarConfirmation(userEmail, userName, calendarLink, meetingNotes);

    const prev = submission.data as Record<string, unknown>;
    const merged: Prisma.InputJsonValue = {
      ...prev,
      confirmedAt: new Date().toISOString(),
      calendarLink,
      meetingNotes: meetingNotes || undefined,
    };

    await prisma.formSubmission.update({
      where: { id },
      data: {
        status: "replied",
        data: merged,
      },
    });

    return NextResponse.json({
      success: true,
      emailSent: sent,
      message: sent
        ? `Calendar confirmation sent to ${userEmail}`
        : "Status updated but email failed — check SMTP settings",
    });
  } catch (err) {
    return internalServerError("confirm booking API", err);
  }
}
