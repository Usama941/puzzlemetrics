import { notFound } from "next/navigation";
import { PortfolioForm } from "@/components/admin/portfolio/PortfolioForm";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ id: string }> };

export default async function EditPortfolioPage(props: Props) {
  const { id } = await props.params;
  const row = await prisma.portfolioProject.findUnique({ where: { id } });
  if (!row) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Edit Portfolio Project</h1>
      <PortfolioForm initial={row} />
    </div>
  );
}
