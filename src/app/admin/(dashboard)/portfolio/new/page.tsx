import { PortfolioForm } from "@/components/admin/portfolio/PortfolioForm";

export const dynamic = 'force-dynamic';
export default function NewPortfolioPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">New Portfolio Project</h1>
      <PortfolioForm />
    </div>
  );
}
