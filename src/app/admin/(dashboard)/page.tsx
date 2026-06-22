import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { adminCardClass, adminBtnPrimaryClass } from "@/components/admin/admin-ui";

export const dynamic = 'force-dynamic';
export default async function AdminDashboardPage() {
  const [teamCount, serviceCount, blogCount, portfolioCount, newSubmissions] = await Promise.all([
    prisma.teamMember.count(),
    prisma.service.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.portfolioProject.count(),
    prisma.formSubmission.count({ where: { status: "new" } }),
  ]);

  const recentSubmissions = await prisma.formSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Team Members", value: teamCount, href: "/admin/team" },
    { label: "Services", value: serviceCount, href: "/admin/services" },
    { label: "Blog Posts", value: blogCount, href: "/admin/blog" },
    { label: "Portfolio Projects", value: portfolioCount, href: "/admin/portfolio" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/50">Overview of your site content and inbound leads.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`${adminCardClass} block transition hover:border-[#6055D9]/40`}
          >
            <p className="text-sm text-white/50">{s.label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{s.value}</p>
          </Link>
        ))}
      </div>

      {newSubmissions > 0 ? (
        <p className="text-sm text-[#7B6EE8]">
          You have {newSubmissions} new submission{newSubmissions === 1 ? "" : "s"} to review.
        </p>
      ) : null}

      <div className={adminCardClass}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Submissions</h2>
          <Link href="/admin/submissions" className="text-sm text-[#7B6EE8] hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/45">
                <th className="pb-3 pr-4 font-medium">Type</th>
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-white/85">
              {recentSubmissions.map((row) => {
                const d = row.data as Record<string, unknown>;
                const name = typeof d.name === "string" ? d.name : "—";
                const email = typeof d.email === "string" ? d.email : "—";
                return (
                  <tr key={row.id} className="border-b border-white/[0.06]">
                    <td className="py-3 pr-4 capitalize">{row.type}</td>
                    <td className="py-3 pr-4">{name}</td>
                    <td className="py-3 pr-4 text-white/60">{email}</td>
                    <td className="py-3 pr-4 text-white/50">
                      {row.createdAt.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          row.status === "new"
                            ? "bg-[#6055D9]/30 text-[#B8AEFF]"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {recentSubmissions.length === 0 ? (
            <p className="py-8 text-center text-sm text-white/45">No submissions yet.</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/blog/new" className={adminBtnPrimaryClass}>
          Add Blog Post
        </Link>
        <Link href="/admin/team/new" className={adminBtnPrimaryClass}>
          Add Team Member
        </Link>
        <Link href="/admin/submissions" className={adminBtnPrimaryClass}>
          View Submissions
        </Link>
      </div>
    </div>
  );
}
