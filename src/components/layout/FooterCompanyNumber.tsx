import { connection } from "next/server";
import { getSiteSettings } from "@/lib/site-settings";

export const FooterCompanyNumber = async () => {
  await connection();

  const settings = await getSiteSettings();
  const companyNumber = settings.companyNumber.trim();
  const phone = settings.phone.trim();
  const email = settings.email.trim();

  if (!companyNumber && !phone && !email) return null;

  return (
    <div className="mt-1 text-center md:text-left">
      {companyNumber ? (
        <p className="font-[family-name:var(--font-inter-tight)] text-[12px] text-[var(--text-secondary)] dark:text-white/55">
          Company No. {companyNumber}
        </p>
      ) : null}
      {phone ? (
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          style={{
            display: "block",
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
            marginTop: "6px",
            textDecoration: "none",
          }}
          className="font-[family-name:var(--font-inter-tight)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] dark:text-white/45 dark:hover:text-white/70"
        >
          📞 {phone}
        </a>
      ) : null}
      {email ? (
        <a
          href={`mailto:${email}`}
          style={{
            display: "block",
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
            marginTop: "4px",
            textDecoration: "none",
          }}
          className="font-[family-name:var(--font-inter-tight)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] dark:text-white/45 dark:hover:text-white/70"
        >
          ✉ {email}
        </a>
      ) : null}
    </div>
  );
};
