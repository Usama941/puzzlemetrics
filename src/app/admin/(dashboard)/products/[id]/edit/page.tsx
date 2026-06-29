import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage(props: Props) {
  const { id } = await props.params;
  const row = await prisma.product.findUnique({ where: { id } });
  if (!row) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Edit Product</h1>
      <ProductForm initial={row} />
    </div>
  );
}
