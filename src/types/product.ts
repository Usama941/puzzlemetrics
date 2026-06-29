export type ProductStat = {
  value: string;
  label: string;
};

export type ProductMockupRow = {
  left: string;
  right: string;
};

export type ProductMockupTableRow = {
  cells: string[];
  scoreColor?: string;
  statusPillBg?: string;
  statusPillText?: string;
};

export type ProductMockup = {
  urlBar?: string;
  title: string;
  statusLabel?: string;
  accentColor?: string;
  badgeColor?: string;
  miniStats?: ProductStat[];
  rowsSection?: {
    title: string;
    rows: ProductMockupRow[];
  };
  bottomStats?: ProductStat[];
  pipelineScore?: {
    label: string;
    value: string;
    suffix?: string;
    progressPercent?: number;
  };
  table?: {
    headers: string[];
    rows: ProductMockupTableRow[];
  };
  footerStats?: Array<ProductStat & { valueColor?: string }>;
};

export function parseProductStats(input: unknown): ProductStat[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((x): x is { value?: unknown; label?: unknown } => !!x && typeof x === "object")
    .map((x) => ({
      value: String(x.value ?? ""),
      label: String(x.label ?? ""),
    }))
    .filter((x) => x.value.trim() && x.label.trim());
}

export function parseProductMockup(input: unknown): ProductMockup {
  if (!input || typeof input !== "object") {
    return { title: "", miniStats: [], rowsSection: { title: "", rows: [] } };
  }
  const m = input as Record<string, unknown>;
  const rowsSectionRaw = m.rowsSection;
  let rowsSection: ProductMockup["rowsSection"];
  if (rowsSectionRaw && typeof rowsSectionRaw === "object") {
    const rs = rowsSectionRaw as Record<string, unknown>;
    const rows = Array.isArray(rs.rows)
      ? rs.rows
          .filter((r): r is { left?: unknown; right?: unknown } => !!r && typeof r === "object")
          .map((r) => ({
            left: String(r.left ?? ""),
            right: String(r.right ?? ""),
          }))
          .filter((r) => r.left.trim() || r.right.trim())
      : [];
    rowsSection = { title: String(rs.title ?? ""), rows };
  }

  const pipelineRaw = m.pipelineScore;
  let pipelineScore: ProductMockup["pipelineScore"];
  if (pipelineRaw && typeof pipelineRaw === "object") {
    const p = pipelineRaw as Record<string, unknown>;
    pipelineScore = {
      label: String(p.label ?? ""),
      value: String(p.value ?? ""),
      suffix: p.suffix != null ? String(p.suffix) : undefined,
      progressPercent: typeof p.progressPercent === "number" ? p.progressPercent : undefined,
    };
  }

  const tableRaw = m.table;
  let table: ProductMockup["table"];
  if (tableRaw && typeof tableRaw === "object") {
    const t = tableRaw as Record<string, unknown>;
    table = {
      headers: Array.isArray(t.headers) ? t.headers.map((h) => String(h)) : [],
      rows: Array.isArray(t.rows)
        ? t.rows
            .filter((r): r is Record<string, unknown> => !!r && typeof r === "object")
            .map((r) => ({
              cells: Array.isArray(r.cells) ? r.cells.map((c) => String(c)) : [],
              scoreColor: typeof r.scoreColor === "string" ? r.scoreColor : undefined,
              statusPillBg: typeof r.statusPillBg === "string" ? r.statusPillBg : undefined,
              statusPillText: typeof r.statusPillText === "string" ? r.statusPillText : undefined,
            }))
        : [],
    };
  }

  return {
    urlBar: typeof m.urlBar === "string" ? m.urlBar : undefined,
    title: typeof m.title === "string" ? m.title : "",
    statusLabel: typeof m.statusLabel === "string" ? m.statusLabel : undefined,
    accentColor: typeof m.accentColor === "string" ? m.accentColor : undefined,
    badgeColor: typeof m.badgeColor === "string" ? m.badgeColor : undefined,
    miniStats: parseProductStats(m.miniStats),
    rowsSection,
    bottomStats: parseProductStats(m.bottomStats),
    pipelineScore,
    table,
    footerStats: Array.isArray(m.footerStats)
      ? m.footerStats
          .filter((x): x is Record<string, unknown> => !!x && typeof x === "object")
          .map((x) => ({
            value: String(x.value ?? ""),
            label: String(x.label ?? ""),
            valueColor: typeof x.valueColor === "string" ? x.valueColor : undefined,
          }))
          .filter((x) => x.value.trim() && x.label.trim())
      : undefined,
  };
}

export const emptyProductMockup = (): ProductMockup => ({
  title: "",
  urlBar: "",
  statusLabel: "Live",
  miniStats: [],
  rowsSection: { title: "", rows: [] },
  bottomStats: [],
});
