/** Converts puzzlemetrics.com absolute URLs to same-site relative paths for local + prod. */
export function toRelativeSitePath(href: string): string {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  const match = href.match(/^https?:\/\/(www\.)?puzzlemetrics\.com(\/[^?#]*)?(\?[^#]*)?(#.*)?$/i);
  if (match) {
    const path = match[2] ?? "";
    const query = match[3] ?? "";
    const hash = match[4] ?? "";
    return `${path || "/"}${query}${hash}`;
  }

  return href;
}
