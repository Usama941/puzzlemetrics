import Link from "next/link";
import { ProductTable } from "@/components/admin/products/ProductTable";
import { adminBtnPrimaryClass } from "@/components/admin/admin-ui";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const rows = await prisma.product.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="mt-1 text-sm text-white/45">Manage products shown on the products page.</p>
        </div>
        <Link href="/admin/products/new" className={adminBtnPrimaryClass}>
          Add New
        </Link>
      </div>
      <ProductTable initial={rows} />
    </div>
  );
}
