import { connection } from "next/server";
import { getSiteSettings } from "@/lib/site-settings";

const DEFAULT_EMAIL = "hello@puzzlemetrics.com";
const DEFAULT_PHONE = "+44 7700 000000";

export const FooterContactLinks = async () => {
  await connection();

  const settings = await getSiteSettings();
  const email = settings.email.trim() || DEFAULT_EMAIL;
  const phone = settings.phone.trim() || DEFAULT_PHONE;

  return (
    <div className="mt-6 flex flex-col gap-2.5 font-[family-name:var(--font-inter-tight)] text-[14px] leading-relaxed text-[var(--text-secondary)] dark:text-white/90">
      <a
        href={`mailto:${email}`}
        className="transition-colors hover:text-[var(--text-primary)] dark:hover:text-white"
      >
        {email}
      </a>
      <a
        href={`tel:${phone.replace(/\s/g, "")}`}
        className="transition-colors hover:text-[var(--text-primary)] dark:hover:text-white"
      >
        {phone}
      </a>
    </div>
  );
};
