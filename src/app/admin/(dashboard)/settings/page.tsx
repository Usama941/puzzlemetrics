import { SiteSettingsForm } from "@/components/admin/settings/SiteSettingsForm";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = 'force-dynamic';
export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-white">Site Settings</h1>
      <p className="mb-6 text-sm text-white/45">General website settings shown on the public site.</p>
      <SiteSettingsForm initialCompanyNumber={settings.companyNumber} />
    </div>
  );
}
