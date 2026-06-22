import { CaseStudyForm } from "@/components/admin/case-studies/CaseStudyForm";

export const dynamic = 'force-dynamic';
export default function NewCaseStudyPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">New Case Study</h1>
      <CaseStudyForm />
    </div>
  );
}
