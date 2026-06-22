import { notFound } from "next/navigation";
import { PricingForm } from "@/components/admin/pricing/PricingForm";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ id: string }> };

export default async function EditPricingPage(props: Props) {
  const { id } = await props.params;
  const row = await prisma.pricingPlan.findUnique({ where: { id } });
  if (!row) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Edit Pricing Plan</h1>
      <PricingForm initial={row} />
    </div>
  );
}
