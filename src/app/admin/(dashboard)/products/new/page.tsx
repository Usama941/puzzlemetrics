import { ProductForm } from "@/components/admin/products/ProductForm";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">New Product</h1>
      <ProductForm />
    </div>
  );
}
