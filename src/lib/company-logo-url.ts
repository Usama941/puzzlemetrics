/** Normalize logo paths from DB/upload API for use in <img src>. */
export function resolveCompanyLogoSrc(logo: string | null | undefined): string {
  const raw = logo?.trim() ?? "";
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("data:")) {
    return raw;
  }
  if (raw.startsWith("/")) return raw;
  return `/${raw}`;
}

export function hasCompanyLogo(logo: string | null | undefined): boolean {
  return Boolean(resolveCompanyLogoSrc(logo));
}
