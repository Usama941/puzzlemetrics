import { SocialLinksPageClient } from "@/components/admin/social-links/SocialLinksPageClient";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function AdminSocialLinksPage() {
  const rows = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Social Media Links</h1>
        <p className="mt-1 text-sm text-white/45">Manage footer social icons and their destination URLs.</p>
      </div>
      <SocialLinksPageClient initial={rows} />
    </div>
  );
}
