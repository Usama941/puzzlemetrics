import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

const DEFAULT_SMTP_HOST = "smtp.gmail.com";
const DEFAULT_SMTP_PORT = 587;
const DEFAULT_SMTP_USER = "puzzlemetrics@gmail.com";
const DEFAULT_ADMIN_EMAIL = "puzzlemetrics@gmail.com";
const DEFAULT_SMTP_FROM = "PuzzleMetrics <puzzlemetrics@gmail.com>";

export async function getTransporter() {
  const envUser = process.env.SMTP_USER;
  const envPass = process.env.SMTP_PASS;

  if (envUser && envPass) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || DEFAULT_SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || String(DEFAULT_SMTP_PORT), 10),
      secure: false,
      auth: {
        user: envUser,
        pass: envPass,
      },
    });
  }

  let settings = null;
  try {
    settings = await prisma.emailSettings.findFirst();
  } catch (e) {
    console.warn("[Mailer] Could not load DB settings, using env vars", e);
  }

  const host = settings?.smtpHost || process.env.SMTP_HOST || DEFAULT_SMTP_HOST;
  const port = settings?.smtpPort ?? parseInt(process.env.SMTP_PORT || String(DEFAULT_SMTP_PORT), 10);
  const user = settings?.smtpUser || process.env.SMTP_USER || DEFAULT_SMTP_USER;
  const pass = settings?.smtpPass || process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("[Mailer] No SMTP credentials found. Emails will not send.");
    console.warn("[Mailer] Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local");
    console.warn("[Mailer] OR configure via /admin/email-settings");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getFromAddress(settings: Awaited<ReturnType<typeof prisma.emailSettings.findFirst>>): string {
  if (settings?.fromEmail) {
    return `${settings.fromName || "PuzzleMetrics"} <${settings.fromEmail}>`;
  }
  return process.env.SMTP_FROM || DEFAULT_SMTP_FROM;
}

function getAdminEmail(settings: Awaited<ReturnType<typeof prisma.emailSettings.findFirst>>): string {
  return (
    settings?.adminEmail ||
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    DEFAULT_ADMIN_EMAIL
  );
}

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<boolean> {
  try {
    const transporter = await getTransporter();
    if (!transporter) return false;

    const settings = await prisma.emailSettings.findFirst().catch(() => null);
    const from = getFromAddress(settings);

    if (!from) {
      console.warn("[Mailer] No from address configured");
      return false;
    }

    await transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    return true;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Mailer] ❌ sendMail failed:", msg);
    return false;
  }
}

export async function sendAdminNotification(subject: string, html: string, text?: string): Promise<boolean> {
  try {
    const settings = await prisma.emailSettings.findFirst().catch(() => null);
    const to = getAdminEmail(settings);

    if (!to) {
      console.warn("[Mailer] No admin email configured");
      return false;
    }

    const sent = await sendMail({ to, subject, html, text });
    if (sent) {
      console.log(`[Mailer] ✅ Admin notification sent to ${to}`);
    }
    return sent;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Mailer] ❌ Admin email failed:", msg);
    return false;
  }
}

export async function sendUserConfirmation(to: string, subject: string, html: string, text?: string): Promise<boolean> {
  const sent = await sendMail({ to, subject, html, text });
  if (sent) {
    console.log(`[Mailer] ✅ User confirmation sent to ${to}`);
  }
  return sent;
}

export type ContactFormEmailData = {
  name: string;
  email: string;
  company: string;
  message: string;
  budget: string;
  services: string[];
};

export async function sendContactFormEmails(
  data: ContactFormEmailData,
): Promise<{ adminSent: boolean; userSent: boolean }> {
  const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });
  const services = data.services.length > 0 ? data.services.join(", ") : "—";

  const adminText = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "—"}`,
    `Message: ${data.message}`,
    `Budget: ${data.budget || "—"}`,
    `Services: ${services}`,
    `Submitted at: ${timestamp}`,
  ].join("\n");

  const adminHtml = `
    <h2 style="color:#6055D9;margin:0 0 16px">New Form Submission</h2>
    <table style="font-size:14px;border-collapse:collapse;width:100%;max-width:560px">
      <tr><td style="padding:8px;color:#666;border-bottom:1px solid #eee;width:120px">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:8px;color:#666;border-bottom:1px solid #eee">Email</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(data.email)}</td></tr>
      <tr><td style="padding:8px;color:#666;border-bottom:1px solid #eee">Company</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(data.company || "—")}</td></tr>
      <tr><td style="padding:8px;color:#666;border-bottom:1px solid #eee">Message</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(data.message)}</td></tr>
      <tr><td style="padding:8px;color:#666;border-bottom:1px solid #eee">Budget</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(data.budget || "—")}</td></tr>
      <tr><td style="padding:8px;color:#666;border-bottom:1px solid #eee">Services</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(services)}</td></tr>
      <tr><td style="padding:8px;color:#666">Submitted at</td><td style="padding:8px">${escapeHtml(timestamp)}</td></tr>
    </table>
  `;

  const userText = [
    `Hi ${data.name},`,
    "",
    "Thank you for reaching out to PuzzleMetrics.",
    "We'll get back to you within 24 hours.",
    "",
    "Team PuzzleMetrics",
  ].join("\n");

  const userHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px">
      <div style="background:#6055D9;width:48px;height:48px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:20px">
        <span style="color:white;font-size:24px;font-weight:800">P</span>
      </div>
      <p style="color:#0a0a14;font-size:16px;line-height:1.6;margin:0 0 12px">Hi ${escapeHtml(data.name)},</p>
      <p style="color:#333;font-size:15px;line-height:1.7;margin:0 0 12px">Thank you for reaching out to PuzzleMetrics.</p>
      <p style="color:#333;font-size:15px;line-height:1.7;margin:0 0 24px">We'll get back to you within 24 hours.</p>
      <p style="color:#666;font-size:14px;margin:0">Team PuzzleMetrics</p>
    </div>
  `;

  const [adminSent, userSent] = await Promise.all([
    sendAdminNotification(`New Form Submission - ${data.name}`, adminHtml, adminText),
    sendUserConfirmation(data.email, "We received your message — PuzzleMetrics", userHtml, userText),
  ]);

  return { adminSent, userSent };
}

export async function sendCalendarConfirmation(
  to: string,
  name: string,
  calendarLink: string,
  meetingNotes?: string,
): Promise<boolean> {
  const safeName = escapeHtml(name || "there");
  const trimmed = calendarLink.trim();
  const linkHref =
    trimmed.startsWith("http://") || trimmed.startsWith("https://") ? trimmed : "https://calendly.com/puzzlemetrics";
  const notesHtml =
    meetingNotes && meetingNotes.trim()
      ? `
        <div style="background:#f7f7fa;border-radius:12px;padding:20px;margin-bottom:24px">
          <p style="font-size:11px;font-weight:700;color:#999;text-transform:uppercase;
                    letter-spacing:0.08em;margin:0 0 8px">NOTE FROM OUR TEAM</p>
          <p style="font-size:14px;color:#333;margin:0;line-height:1.6">${escapeHtml(meetingNotes)}</p>
        </div>`
      : "";

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f7f7fa">
      <div style="background:white;border-radius:16px;padding:40px;border:1px solid rgba(0,0,0,0.08)">

        <div style="background:#6055D9;border-radius:10px;width:48px;height:48px;display:flex;align-items:center;justify-content:center;margin-bottom:24px">
          <span style="color:white;font-size:22px;font-weight:800">P</span>
        </div>

        <h1 style="color:#0a0a14;font-size:22px;font-weight:700;margin:0 0 8px">
          Your Discovery Call is Confirmed! 🎉
        </h1>
        <p style="color:rgba(10,10,20,0.6);font-size:15px;margin:0 0 28px;line-height:1.6">
          Hi ${safeName}, your booking has been confirmed by our team.
          Click below to add it to your calendar.
        </p>

        <div style="text-align:center;margin:32px 0">
          <a href="${linkHref.replace(/"/g, "&quot;")}"
             style="background:#6055D9;color:white;padding:14px 36px;
                    border-radius:9999px;text-decoration:none;font-weight:700;
                    font-size:15px;display:inline-block">
            📅 Add to Calendar
          </a>
        </div>

        ${notesHtml}

        <div style="background:#f0efff;border-radius:12px;padding:20px;margin-bottom:24px">
          <p style="font-size:11px;font-weight:700;color:#6055D9;text-transform:uppercase;
                    letter-spacing:0.08em;margin:0 0 10px">WHAT TO EXPECT</p>
          <p style="margin:4px 0;font-size:14px;color:#333">⏱ 30-minute focused call</p>
          <p style="margin:4px 0;font-size:14px;color:#333">🎯 We focus entirely on your problem</p>
          <p style="margin:4px 0;font-size:14px;color:#333">📄 Written scope sent within 48 hours after</p>
          <p style="margin:4px 0;font-size:14px;color:#333">✅ No pitch, no pressure</p>
        </div>

        <p style="color:rgba(10,10,20,0.5);font-size:13px;margin:0">
          Questions? Reply to this email or contact us at
          <a href="mailto:hello@puzzlemetrics.com" style="color:#6055D9">hello@puzzlemetrics.com</a>
        </p>

        <hr style="border:none;border-top:1px solid rgba(0,0,0,0.08);margin:24px 0">
        <p style="color:rgba(10,10,20,0.35);font-size:12px;text-align:center;margin:0">
          PuzzleMetrics · hello@puzzlemetrics.com
        </p>
      </div>
    </body>
    </html>
  `;

  return sendUserConfirmation(to, "Your PuzzleMetrics Discovery Call is Confirmed ✅", html);
}
