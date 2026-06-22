import { notFound } from "next/navigation";
import { CaseStudyForm } from "@/components/admin/case-studies/CaseStudyForm";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ id: string }> };

export default async function EditCaseStudyPage(props: Props) {
  const { id } = await props.params;
  const row = await prisma.caseStudy.findUnique({ where: { id } });
  if (!row) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Edit Case Study</h1>
      <CaseStudyForm initial={row} />
    </div>
  );
}
