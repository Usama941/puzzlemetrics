import type { Product } from "@prisma/client";
import Link from "next/link";
import BookingButton from "@/components/booking/BookingButton";
import { getTheme } from "@/lib/portfolioThemes";
import { parseProductMockup, parseProductStats } from "@/types/product";

const checkIcon = (accent: string) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function ProductMockupPanel({
  accent,
  mockup,
}: {
  accent: string;
  mockup: ReturnType<typeof parseProductMockup>;
}) {
  const isLeadGenStyle = !!mockup.pipelineScore || !!mockup.table;
  const borderClass = isLeadGenStyle
    ? "border-[rgba(14,165,233,0.15)] bg-[#F5FAFF] shadow-[0_24px_64px_rgba(14,165,233,0.08),0_0_0_1px_rgba(14,165,233,0.06)]"
    : "border-[rgba(96,85,217,0.12)] bg-[#F8F9FF] shadow-[0_24px_64px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] dark:border-[rgba(96,85,217,0.2)]";
  const chromeBg = isLeadGenStyle ? "bg-[#E8F4FC]" : "bg-[#EEEEF8]";

  return (
    <div className={`overflow-hidden rounded-[20px] border ${borderClass}`}>
      <div className={`flex items-center gap-2 px-4 py-3 ${chromeBg}`}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
        <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 font-[family-name:var(--font-inter-tight)] text-[11px] text-[rgba(0,0,0,0.35)]">
          {mockup.urlBar ?? "app.example.com"}
        </div>
      </div>
      <div className="bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-inter-tight)] text-[14px] font-bold text-[#0a0a14]">{mockup.title}</span>
          {mockup.statusLabel ? (
            <span className="flex items-center gap-1 font-[family-name:var(--font-inter-tight)] text-[11px] text-[#22C55E]">
              {!mockup.statusLabel.includes("Scoring") ? <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" /> : null}
              {mockup.statusLabel}
            </span>
          ) : null}
        </div>

        {mockup.pipelineScore ? (
          <div className="mb-3.5">
            <div className="mb-1 font-[family-name:var(--font-inter-tight)] text-[11px] uppercase text-[rgba(0,0,0,0.45)]">
              {mockup.pipelineScore.label}
            </div>
            <div className="mb-2 flex items-baseline gap-1">
              <span className="font-[family-name:var(--font-inter-tight)] text-[32px] font-extrabold" style={{ color: accent }}>
                {mockup.pipelineScore.value}
              </span>
              {mockup.pipelineScore.suffix ? (
                <span className="font-[family-name:var(--font-inter-tight)] text-[16px] text-[rgba(0,0,0,0.35)]">
                  {mockup.pipelineScore.suffix}
                </span>
              ) : null}
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#EFF6FF]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${mockup.pipelineScore.progressPercent ?? 0}%`,
                  background: `linear-gradient(90deg, ${accent}, #6055D9)`,
                }}
              />
            </div>
          </div>
        ) : null}

        {mockup.miniStats && mockup.miniStats.length > 0 ? (
          <div className="mb-4 grid grid-cols-3 gap-2.5">
            {mockup.miniStats.map((x) => (
              <div key={x.label} className="rounded-[10px] bg-[#F4F3FD] p-3">
                <div className="font-[family-name:var(--font-inter-tight)] text-[18px] font-bold" style={{ color: accent }}>
                  {x.value}
                </div>
                <div className="mt-0.5 font-[family-name:var(--font-inter-tight)] text-[10px] uppercase tracking-[0.05em] text-[rgba(0,0,0,0.45)]">
                  {x.label}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {mockup.rowsSection && mockup.rowsSection.rows.length > 0 ? (
          <div className="mb-3 rounded-[10px] bg-[#F4F3FD] p-3">
            {mockup.rowsSection.title ? (
              <div className="mb-2 font-[family-name:var(--font-inter-tight)] text-[9px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
                {mockup.rowsSection.title}
              </div>
            ) : null}
            {mockup.rowsSection.rows.map((row) => (
              <div key={`${row.left}-${row.right}`} className="flex justify-between border-b border-[rgba(0,0,0,0.06)] py-1.5 last:border-0">
                <span className="font-[family-name:var(--font-inter-tight)] text-[12px] text-[#0a0a14]">{row.left}</span>
                <span className="font-[family-name:var(--font-inter-tight)] text-[11px] text-[rgba(0,0,0,0.45)]">{row.right}</span>
              </div>
            ))}
          </div>
        ) : null}

        {mockup.table && mockup.table.rows.length > 0 ? (
          <div className="mb-3 overflow-hidden rounded-[10px] border border-[rgba(0,0,0,0.06)]">
            <div className="grid grid-cols-3 gap-0 bg-[#F0F9FF] px-3 py-2 font-[family-name:var(--font-inter-tight)] text-[10px] font-medium uppercase tracking-wide text-[rgba(0,0,0,0.45)]">
              {(mockup.table.headers.length ? mockup.table.headers : ["Company", "Score", "Status"]).map((h) => (
                <span key={h} className={h === "Score" ? "text-center" : h === "Status" ? "text-right" : ""}>
                  {h}
                </span>
              ))}
            </div>
            {mockup.table.rows.map((row, i) => (
              <div
                key={row.cells.join("-")}
                className={`grid grid-cols-3 items-center border-t border-[rgba(0,0,0,0.06)] px-3 py-2.5 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFEFF]"}`}
              >
                <span className="font-[family-name:var(--font-inter-tight)] text-[12px] text-[#0a0a14]">{row.cells[0]}</span>
                <span
                  className="text-center font-[family-name:var(--font-inter-tight)] text-[12px] font-semibold"
                  style={{ color: row.scoreColor ?? accent }}
                >
                  {row.cells[1]}
                </span>
                <span className="text-right">
                  <span
                    className="inline-block rounded-full px-2 py-0.5 font-[family-name:var(--font-inter-tight)] text-[10px] font-medium"
                    style={{
                      background: row.statusPillBg ?? "#DCFCE7",
                      color: row.statusPillText ?? "#166534",
                    }}
                  >
                    {row.cells[2]}
                  </span>
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {mockup.bottomStats && mockup.bottomStats.length > 0 ? (
          <div className="flex gap-2">
            {mockup.bottomStats.map((stat) => (
              <div key={stat.label} className="flex-1 rounded-[10px] bg-[#F4F3FD] px-3 py-2.5">
                <div className="font-[family-name:var(--font-inter-tight)] text-[16px] font-bold text-[#0a0a14]">{stat.value}</div>
                <div className="font-[family-name:var(--font-inter-tight)] text-[10px] text-[rgba(0,0,0,0.45)]">{stat.label}</div>
              </div>
            ))}
          </div>
        ) : null}

        {mockup.footerStats && mockup.footerStats.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {mockup.footerStats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-[#F0F9FF] px-3 py-2">
                <div
                  className="font-[family-name:var(--font-inter-tight)] text-[14px] font-bold"
                  style={{ color: stat.valueColor ?? accent }}
                >
                  {stat.value}
                </div>
                <div className="font-[family-name:var(--font-inter-tight)] text-[10px] text-[rgba(0,0,0,0.45)]">{stat.label}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ProductSection({ product, index }: { product: Product; index: number }) {
  const mockup = parseProductMockup(product.mockup);
  const stats = parseProductStats(product.stats);
  const t = getTheme(product.theme);
  const accent = mockup.accentColor ?? t.accent;
  const badgeColor = mockup.badgeColor ?? accent;
  const mockupLeft = product.mockupSide === "left";
  const sectionBg = index % 2 === 0 ? "bg-[var(--bg-primary)]" : "border-t border-[var(--border-color)] bg-[var(--bg-secondary)]";

  const copyBlock = (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        {product.badge ? (
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.08em]"
            style={{
              color: badgeColor,
              borderColor: `${badgeColor}40`,
              background: `${badgeColor}1a`,
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: badgeColor }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: badgeColor }} />
            </span>
            {product.badge}
          </span>
        ) : null}
        {product.label ? (
          <span className="font-[family-name:var(--font-inter-tight)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
            {product.label}
          </span>
        ) : null}
      </div>
      <h2 className="mb-3.5 font-[family-name:var(--font-inter-tight)] text-[clamp(32px,4vw,46px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)]">
        {product.name}
      </h2>
      {product.tagline ? (
        <p className="mb-[18px] font-[family-name:var(--font-inter-tight)] text-[18px] font-medium" style={{ color: accent }}>
          {product.tagline}
        </p>
      ) : null}
      {product.description ? (
        <p className="mb-8 font-[family-name:var(--font-inter-tight)] text-[15px] font-normal leading-[1.7] text-[var(--text-secondary)]">
          {product.description}
        </p>
      ) : null}
      {product.features.length > 0 ? (
        <ul className="mb-8 space-y-2.5">
          {product.features.map((feat) => (
            <li key={feat} className="flex gap-2.5 font-[family-name:var(--font-inter-tight)] text-[14px] text-[var(--text-secondary)]">
              <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[rgba(96,85,217,0.2)] bg-[rgba(96,85,217,0.1)]">
                {checkIcon(accent)}
              </span>
              {feat}
            </li>
          ))}
        </ul>
      ) : null}
      {stats.length > 0 ? (
        <div className="mb-8 flex flex-wrap gap-7 border-t border-[var(--border-color)] pt-7">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-[family-name:var(--font-inter-tight)] text-[26px] font-extrabold tracking-[-0.02em]" style={{ color: accent }}>
                {s.value}
              </div>
              <div className="mt-0.5 font-[family-name:var(--font-inter-tight)] text-[12px] font-normal uppercase tracking-[0.06em] text-[var(--text-muted)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="flex flex-wrap gap-3">
        {product.primaryCtaText ? (
          product.primaryCtaUrl ? (
            <Link
              href={product.primaryCtaUrl}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-white transition-opacity duration-200 hover:opacity-95"
              style={{
                background: accent,
                boxShadow: `0 0 24px ${accent}59`,
                textDecoration: "none",
              }}
            >
              {product.primaryCtaText}
            </Link>
          ) : (
            <BookingButton
              source={`products-${product.id}`}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-white transition-opacity duration-200 hover:opacity-95"
              style={{
                background: accent,
                boxShadow: `0 0 24px ${accent}59`,
                textDecoration: "none",
              }}
            >
              {product.primaryCtaText}
            </BookingButton>
          )
        ) : null}
        {product.secondaryCtaText && product.secondaryCtaUrl ? (
          <Link
            href={product.secondaryCtaUrl}
            className="inline-flex items-center justify-center rounded-full border border-[var(--border-color)] bg-transparent px-8 py-3.5 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-[var(--text-primary)] transition-colors duration-200 hover:border-[rgba(96,85,217,0.35)]"
          >
            {product.secondaryCtaText}
          </Link>
        ) : null}
      </div>
    </div>
  );

  const mockupBlock = <ProductMockupPanel accent={accent} mockup={mockup} />;

  return (
    <section className={`${sectionBg} px-6 py-24`}>
      <div className="mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
        {mockupLeft ? (
          <>
            <div className="order-2 lg:order-1">{mockupBlock}</div>
            <div className="order-1 lg:order-2">{copyBlock}</div>
          </>
        ) : (
          <>
            <div>{copyBlock}</div>
            <div>{mockupBlock}</div>
          </>
        )}
      </div>
    </section>
  );
}
