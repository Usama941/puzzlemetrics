"use client";

import type { Testimonial } from "@prisma/client";

function PlatformLogo({ platform, color }: { platform: string; color: string }) {
  const s = { width: 14, height: 14 } as const;
  if (platform === "google") {
    return (
      <svg {...s} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    );
  }
  return (
    <svg {...s} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const TestimonialCard = ({ review }: { review: Testimonial }) => (
  <article className="flex h-full flex-col rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-5 text-left transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:border-[rgba(96,85,217,0.25)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:rounded-[20px] sm:px-6 sm:py-7">
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border font-[family-name:var(--font-inter-tight)] text-[13px] font-bold"
          style={{
            background: `${review.avatarColor}33`,
            borderColor: `${review.avatarColor}59`,
            color: review.avatarColor,
          }}
        >
          {review.avatar}
        </div>
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-[var(--text-primary)]">
            {review.author}
          </p>
          <p className="font-[family-name:var(--font-inter-tight)] text-[12px] font-normal text-[var(--text-muted)]">
            {review.role} · {review.location}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
        <a
          href={review.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-[140px] items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold no-underline transition-opacity hover:opacity-90 sm:max-w-none"
          style={{
            background: `${review.platformColor}1a`,
            borderColor: `${review.platformColor}40`,
            color: review.platformColor,
          }}
          title={`Read on ${review.platformLabel}`}
        >
          <PlatformLogo platform={review.platform} color={review.platformColor} />
          <span className="truncate font-[family-name:var(--font-inter-tight)]">{review.platformLabel}</span>
        </a>
        {review.verified ? (
          <span className="rounded-full border border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.1)] px-1.5 py-0.5 font-[family-name:var(--font-inter-tight)] text-[9px] font-bold uppercase text-[#22C55E]">
            Verified
          </span>
        ) : null}
      </div>
    </div>

    <div className="mb-3.5 flex gap-0.5">
      {Array.from({ length: review.rating }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>

    <p className="grow font-[family-name:var(--font-inter-tight)] text-[14px] font-normal leading-[1.7] text-[var(--text-secondary)]">
      {review.text}
    </p>

    <p className="mt-4 border-t border-[var(--border-color)] pt-3.5 font-[family-name:var(--font-inter-tight)] text-[12px] text-[var(--text-muted)]">
      {review.date}
    </p>
  </article>
);
