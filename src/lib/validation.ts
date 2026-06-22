export function sanitizeString(str: unknown, maxLength = 1000): string {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

export function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/** Validates route param IDs before Prisma queries. */
export function parseRouteId(id: unknown): string | null {
  if (typeof id !== "string") return null;
  const trimmed = id.trim();
  if (!trimmed || trimmed.length > 128) return null;
  return trimmed;
}

export function parseOptionalUrl(value: unknown, maxLength = 2048): string | null {
  const str = sanitizeString(value, maxLength);
  if (!str) return "";
  return isValidUrl(str) ? str : null;
}

export function sanitizeStringFields(
  input: Record<string, unknown>,
  fieldLimits: Record<string, number> = {},
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(input)) {
    if (typeof val === "string") {
      out[key] = sanitizeString(val, fieldLimits[key] ?? 5000);
    } else if (Array.isArray(val)) {
      out[key] = val.map((item) => (typeof item === "string" ? sanitizeString(item, 500) : item));
    } else {
      out[key] = val;
    }
  }
  return out;
}

export type ContactFormPayload = {
  type: string;
  name: string;
  email: string;
  subject: string;
  company: string;
  message: string;
  services: string[];
  budget: string;
};

export function parseContactFormBody(
  raw: unknown,
): { ok: true; data: ContactFormPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const body = raw as Record<string, unknown>;
  const name = sanitizeString(body.name, 100);
  const email = sanitizeString(body.email, 255);
  const message = sanitizeString(body.message, 5000);

  if (!name) return { ok: false, error: "Name is required" };
  if (!email || !isValidEmail(email)) return { ok: false, error: "Valid email is required" };
  if (!message) return { ok: false, error: "Message is required" };

  const type = sanitizeString(body.type, 50) || "contact";
  if (type !== "contact" && type !== "booking") {
    return { ok: false, error: "Invalid form type" };
  }

  const servicesRaw = body.services;
  const services = Array.isArray(servicesRaw)
    ? servicesRaw
        .filter((s): s is string => typeof s === "string")
        .map((s) => sanitizeString(s, 100))
        .slice(0, 20)
    : typeof servicesRaw === "string"
      ? [sanitizeString(servicesRaw, 100)]
      : [];

  return {
    ok: true,
    data: {
      type,
      name,
      email,
      subject: sanitizeString(body.subject, 200),
      company: sanitizeString(body.company, 100),
      message,
      services,
      budget: sanitizeString(body.budget, 100),
    },
  };
}
