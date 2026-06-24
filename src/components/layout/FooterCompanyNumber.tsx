import { connection } from "next/server";
import { getSiteSettings } from "@/lib/site-settings";

export const FooterCompanyNumber = async () => {
  await connection();

  const settings = await getSiteSettings();
  const companyNumber = settings.companyNumber.trim();

  if (!companyNumber) return null;

  return (
    <p className="mt-1 text-center font-[family-name:var(--font-inter-tight)] text-[12px] text-[var(--text-secondary)] md:text-left dark:text-white/55">
      Company No. {companyNumber}
    </p>
  );
};
