import { EmailSettingsForm } from "@/components/admin/email/EmailSettingsForm";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export default async function AdminEmailSettingsPage() {
  const row = await prisma.emailSettings.findFirst();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-white">Email Settings</h1>
      <p className="mb-6 text-sm text-white/45">SMTP credentials and notification addresses.</p>
      <EmailSettingsForm initial={row} />
    </div>
  );
}
