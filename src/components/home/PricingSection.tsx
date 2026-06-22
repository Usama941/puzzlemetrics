import { getPricingPlans } from "@/lib/db-cache";
import { PricingSectionClient } from "./PricingSectionClient";

export async function PricingSection() {
  const plans = await getPricingPlans();

  return <PricingSectionClient plans={plans} />;
}

export default PricingSection;
