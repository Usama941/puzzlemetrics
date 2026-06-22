import { PricingForm } from "@/components/admin/pricing/PricingForm";

export const dynamic = 'force-dynamic';
export default function NewPricingPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">New Pricing Plan</h1>
      <PricingForm />
    </div>
  );
}
