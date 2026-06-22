import { NextResponse, type NextRequest } from "next/server";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { sendAdminNotification } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;

  try {
    const sent = await sendAdminNotification(
      "PuzzleMetrics — test email",
      "<p style=\"font-family:system-ui\">This is a test message from the admin panel.</p>",
    );
    if (!sent) {
      return NextResponse.json(
        { error: "Email not sent — configure SMTP in .env.local or /admin/email-settings" },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
