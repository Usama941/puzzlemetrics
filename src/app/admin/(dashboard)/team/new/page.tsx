import { TeamForm } from "@/components/admin/team/TeamForm";

export const dynamic = 'force-dynamic';
export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">New Team Member</h1>
      <TeamForm />
    </div>
  );
}
