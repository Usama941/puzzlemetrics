import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/services/ServiceForm";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage(props: Props) {
  const { id } = await props.params;
  const row = await prisma.service.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });
  if (!row) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Edit Service</h1>
      <ServiceForm initial={row} />
    </div>
  );
}
