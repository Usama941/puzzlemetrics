import { notFound } from "next/navigation";
import { TeamForm } from "@/components/admin/team/TeamForm";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ id: string }> };

export default async function EditTeamMemberPage(props: Props) {
  const { id } = await props.params;
  const row = await prisma.teamMember.findUnique({ where: { id } });
  if (!row) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Edit Team Member</h1>
      <TeamForm initial={row} />
    </div>
  );
}
