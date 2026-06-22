"use client";

import type { BlogPost } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { NewsletterSignup } from "./NewsletterSignup";

const BLOG_STYLE = `
@keyframes typewriter {
  from { width: 0; border-right: 2px solid #6055D9; }
  to { width: 100%; border-right: 2px solid transparent; }
}
@keyframes blink {
  0%, 100% { border-color: #6055D9; }
  50% { border-color: transparent; }
}
@keyframes floatUp {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes scrollLeft {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes scrollRight {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
.blog-card-hover {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.blog-card-hover:hover {
  transform: translateY(-5px);
}
`;

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const blogCategories = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const p of posts) {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        ordered.push(p.category);
      }
    }
    return ["All", ...ordered];
  }, [posts]);

  const authorCount = useMemo(() => new Set(posts.map((p) => p.author)).size, [posts]);

  const featured = posts.find((p) => p.featured && p.category === "AI Strategy") ?? posts[0];

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [activeCategory, posts]);

  const tickerText = useMemo(() => {
    const cats = blogCategories.filter((c) => c !== "All");
    const unit = cats.join(" · ");
    return Array(8).fill(unit).join(" · ");
  }, [blogCategories]);

  if (posts.length === 0 || !featured) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: BLOG_STYLE }} />
        <section className="border-b border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-24 text-center">
          <p className="font-[family-name:var(--font-inter-tight)] text-[var(--text-secondary)]">No posts yet. Check back soon.</p>
        </section>
      </>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BLOG_STYLE }} />

      {/* —— HERO —— */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-primary)] px-6 pb-14 pt-20">
        <div className="pointer-events-none absolute inset-0 select-none opacity-100">
          <div className="absolute left-0 top-[15%] w-full overflow-hidden">
            <div className="flex w-max [animation:scrollLeft_30s_linear_infinite]">
              <span className="whitespace-nowrap pr-10 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.1em] text-[rgba(96,85,217,0.12)]">
                {tickerText}
              </span>
              <span className="whitespace-nowrap pr-10 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.1em] text-[rgba(96,85,217,0.12)]">
                {tickerText}
              </span>
            </div>
          </div>
          <div className="absolute left-0 top-[65%] w-full overflow-hidden">
            <div className="flex w-max [animation:scrollRight_25s_linear_infinite]">
              <span className="whitespace-nowrap pr-10 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.1em] text-[rgba(96,85,217,0.12)]">
                {tickerText}
              </span>
              <span className="whitespace-nowrap pr-10 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.1em] text-[rgba(96,85,217,0.12)]">
                {tickerText}
              </span>
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[120px] bg-gradient-to-r from-[var(--bg-primary)] to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[120px] bg-gradient-to-l from-[var(--bg-primary)] to-transparent"
            aria-hidden
          />
        </div>

        <div className="relative z-[1] mx-auto max-w-[720px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 inline-flex items-center gap-1 rounded-full border border-[rgba(96,85,217,0.25)] bg-[rgba(96,85,217,0.1)] px-4 py-1.5 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.12em] text-[#6055D9]"
          >
            THE INTELLIGENCE BRIEF
            <span className="font-normal [animation:blink_1s_step-end_infinite]" style={{ color: "#6055D9" }}>
              |
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-[family-name:var(--font-inter-tight)] text-[clamp(44px,6vw,68px)] font-extrabold leading-[1.05] tracking-[-0.035em]"
          >
            <span className="text-[var(--text-primary)]">AI Insights</span>
            <br />
            <span
              className="inline-block bg-[length:300%_300%] bg-clip-text text-transparent [animation:gradientShift_4s_ease_infinite]"
              style={{
                backgroundImage: "linear-gradient(135deg, #6055D9, #0EA5E9, #10B981, #6055D9)",
              }}
            >
              Worth Reading
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mx-auto mb-9 mt-5 max-w-[500px] font-[family-name:var(--font-inter-tight)] text-[16px] font-normal leading-relaxed text-[var(--text-secondary)]"
          >
            Practical guides, case study breakdowns, and unfiltered thinking from the engineers actually building AI — not writing about it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 text-[12px] text-[var(--text-muted)]"
          >
            <span>
              <span className="font-[family-name:var(--font-inter-tight)] text-[18px] font-bold text-[#6055D9]">{posts.length}</span>{" "}
              <span className="font-[family-name:var(--font-inter-tight)] text-[12px] font-medium uppercase tracking-wide">posts</span>
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span>
              <span className="font-[family-name:var(--font-inter-tight)] text-[18px] font-bold text-[#6055D9]">{authorCount}</span>{" "}
              <span className="font-[family-name:var(--font-inter-tight)] text-[12px] font-medium uppercase tracking-wide">authors</span>
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="font-[family-name:var(--font-inter-tight)] text-[12px] font-medium uppercase tracking-wide">Updated monthly</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 inline-flex gap-3"
            aria-hidden
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative h-[60px] w-[100px] rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm [animation:floatUp_6s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${6 + i}s` }}
              >
                <div className="absolute left-2 top-2 h-2 w-2 rounded-full bg-[#6055D9]" />
                <div className="absolute left-2 top-6 right-2 space-y-1.5">
                  <div className="h-1 rounded bg-[var(--border-color)]" />
                  <div className="h-1 w-[80%] rounded bg-[var(--border-color)] opacity-70" />
                  <div className="h-1 w-[60%] rounded bg-[var(--border-color)] opacity-50" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* —— FEATURED —— */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto grid max-w-[1000px] overflow-hidden rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-card)] shadow-[0_8px_40px_rgba(0,0,0,0.06)] lg:grid-cols-[1fr_420px]"
        >
          <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-11">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(96,85,217,0.25)] bg-[rgba(96,85,217,0.1)] px-3 py-1 font-[family-name:var(--font-inter-tight)] text-[10px] font-bold uppercase tracking-[0.14em] text-[#6055D9]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#6055D9] [animation:pulseGlow_2s_ease_infinite]" />
                FEATURED
              </span>
              <h2 className="mb-3.5 mt-5 font-[family-name:var(--font-inter-tight)] text-[clamp(22px,3vw,30px)] font-bold leading-snug tracking-[-0.02em] text-[var(--text-primary)]">
                {featured.title}
              </h2>
              <p className="mb-6 font-[family-name:var(--font-inter-tight)] text-[15px] font-normal leading-[1.7] text-[var(--text-secondary)]">{featured.excerpt}</p>
              <div className="flex flex-wrap items-center gap-3 text-[13px]">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-[family-name:var(--font-inter-tight)] text-[13px] font-bold"
                  style={{
                    background: `${featured.authorColor}33`,
                    borderColor: `${featured.authorColor}66`,
                    color: featured.authorColor,
                  }}
                >
                  {featured.authorInitials}
                </div>
                <span className="font-[family-name:var(--font-inter-tight)] font-semibold text-[var(--text-primary)]">{featured.author}</span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-[var(--text-muted)]">{featured.date}</span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-[var(--text-muted)]">{featured.readTime}</span>
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-4 border-t border-[var(--border-color)] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-1.5">
                {featured.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2.5 py-0.5 font-[family-name:var(--font-inter-tight)] text-[11px] font-medium text-[var(--text-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-[#6055D9] px-[22px] py-2.5 font-[family-name:var(--font-inter-tight)] text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(96,85,217,0.3)] no-underline transition-opacity hover:opacity-95 sm:ml-auto sm:self-center"
              >
                Read Article →
              </Link>
            </div>
          </div>

          <div
            className="relative flex min-h-[280px] flex-col justify-between p-8 sm:p-10"
            style={{
              background: `linear-gradient(145deg, ${featured.accentColor} 0%, #1a1035 100%)`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-90"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative z-[1] flex h-full flex-col justify-between">
              <div>
                <span className="inline-block rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.12)] px-3 py-1 font-[family-name:var(--font-inter-tight)] text-[11px] font-semibold uppercase tracking-wide text-white/90">
                  {featured.category}
                </span>
                <div className="mt-8 font-[family-name:var(--font-inter-tight)] text-[48px] font-extrabold leading-none tracking-[-0.04em] text-white">
                  {featured.readTime.replace(/\s*read$/i, "").trim()}
                </div>
                <div className="mt-2 font-[family-name:var(--font-inter-tight)] text-[12px] font-medium uppercase tracking-wide text-[rgba(255,255,255,0.5)]">
                  min read
                </div>
              </div>
              <div>
                <p className="mb-2 font-[family-name:var(--font-inter-tight)] text-[11px] font-medium uppercase tracking-wide text-[rgba(255,255,255,0.5)]">
                  Latest thinking on
                </p>
                <p className="font-[family-name:var(--font-inter-tight)] text-[20px] font-bold text-white">{featured.category}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* —— FILTER + GRID —— */}
      <section className="bg-[var(--bg-primary)] px-6 pb-[100px] pt-[72px]">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-14 flex flex-wrap gap-2">
            {blogCategories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 font-[family-name:var(--font-inter-tight)] text-[13px] font-semibold transition-all ${
                    active
                      ? "bg-[#6055D9] text-white shadow-[0_0_20px_rgba(96,85,217,0.35)]"
                      : "border border-[var(--border-color)] bg-transparent text-[var(--text-secondary)] hover:border-[rgba(96,85,217,0.35)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {activeCategory === "All" ? (
                <AllPostsGrid posts={posts} />
              ) : (
                <FilteredGrid posts={filteredPosts} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* —— NEWSLETTER —— */}
      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-[88px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-[600px]"
        >
          <span className="mb-4 inline-flex items-center gap-1 rounded-full border border-[rgba(96,85,217,0.25)] bg-[rgba(96,85,217,0.1)] px-4 py-1.5 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.12em] text-[#6055D9]">
            THE INTELLIGENCE BRIEF
            <span className="font-normal [animation:blink_1s_step-end_infinite]">|</span>
          </span>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-[clamp(26px,4vw,36px)] font-extrabold tracking-[-0.02em] text-[var(--text-primary)]">
            Get AI insights in your inbox
          </h2>
          <p className="mt-3 font-[family-name:var(--font-inter-tight)] text-[15px] leading-relaxed text-[var(--text-secondary)]">
            No fluff. Just practical thinking on AI — when we have something genuinely worth saying. Usually twice a month.
          </p>
          <NewsletterSignup pulseButton />
          <p className="mt-3 font-[family-name:var(--font-inter-tight)] text-[12px] text-[var(--text-muted)]">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </section>
    </>
  );
}

function AllPostsGrid({ posts }: { posts: BlogPost[] }) {
  const medium = posts.slice(0, 3);
  const wide = posts.slice(3, 5);
  const feature = posts[5];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {medium.map((post, index) => (
          <MediumCard key={post.slug} post={post} index={index} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {wide.map((post, index) => (
          <WideCard key={post.slug} post={post} index={index + 3} />
        ))}
      </div>
      {feature ? <FeatureRowCard post={feature} index={5} /> : null}
    </div>
  );
}

function FilteredGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {posts.map((post, index) => (
        <MediumCard key={post.slug} post={post} index={index} tall />
      ))}
    </div>
  );
}

function MediumCard({ post, index, tall }: { post: BlogPost; index: number; tall?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={tall ? "h-full" : ""}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="blog-card-hover group flex h-full flex-col overflow-hidden rounded-[20px] border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[color-mix(in_srgb,var(--accent)_44%,var(--border-color))] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
        style={{ ["--accent" as string]: post.accentColor }}
      >
        <div className="h-1 w-full shrink-0" style={{ background: post.accentColor }} />
        <div className="flex flex-1 flex-col px-[22px] pb-[22px] pt-6">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span
              className="rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-inter-tight)] text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{
                background: post.accentBg,
                borderColor: `${post.accentColor}4d`,
                color: post.accentColor,
              }}
            >
              {post.category}
            </span>
            <span className="shrink-0 font-[family-name:var(--font-inter-tight)] text-[11px] text-[var(--text-muted)]">{post.readTime}</span>
          </div>
          <h3 className="mb-2.5 line-clamp-2 font-[family-name:var(--font-inter-tight)] text-[17px] font-bold leading-snug tracking-[-0.01em] text-[var(--text-primary)]">
            {post.title}
          </h3>
          <p className="mb-4 line-clamp-2 flex-1 font-[family-name:var(--font-inter-tight)] text-[13px] leading-relaxed text-[var(--text-secondary)]">{post.excerpt}</p>
          <div className="mt-auto flex items-center justify-between border-t border-[var(--border-color)] pt-4">
            <div className="flex items-center gap-2">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-inter-tight)] text-[10px] font-bold"
                style={{
                  background: `${post.authorColor}33`,
                  color: post.authorColor,
                }}
              >
                {post.authorInitials}
              </div>
              <span className="font-[family-name:var(--font-inter-tight)] text-[12px] font-semibold text-[var(--text-primary)]">{post.author}</span>
            </div>
            <span className="font-[family-name:var(--font-inter-tight)] text-[11px] text-[var(--text-muted)]">{post.date}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function WideCard({ post, index }: { post: BlogPost; index: number }) {
  const letter = post.category.trim().charAt(0).toUpperCase();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="blog-card-hover group flex min-h-[200px] flex-col overflow-hidden rounded-[20px] border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[color-mix(in_srgb,var(--accent)_44%,var(--border-color))] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
        style={{ ["--accent" as string]: post.accentColor }}
      >
        <div className="h-1 w-full shrink-0" style={{ background: post.accentColor }} />
        <div className="flex min-h-[180px] flex-1 flex-col md:flex-row">
        <div className="flex flex-1 flex-col justify-between p-7 md:min-w-0">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span
              className="rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-inter-tight)] text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{
                background: post.accentBg,
                borderColor: `${post.accentColor}4d`,
                color: post.accentColor,
              }}
            >
              {post.category}
            </span>
            <span className="font-[family-name:var(--font-inter-tight)] text-[11px] text-[var(--text-muted)]">{post.readTime}</span>
          </div>
          <h3 className="mb-2 line-clamp-2 font-[family-name:var(--font-inter-tight)] text-[17px] font-bold leading-snug tracking-[-0.01em] text-[var(--text-primary)]">{post.title}</h3>
          <p className="line-clamp-2 font-[family-name:var(--font-inter-tight)] text-[13px] leading-relaxed text-[var(--text-secondary)]">{post.excerpt}</p>
          <div className="mt-5 flex items-center justify-between border-t border-[var(--border-color)] pt-4">
            <div className="flex items-center gap-2">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-inter-tight)] text-[10px] font-bold"
                style={{
                  background: `${post.authorColor}33`,
                  color: post.authorColor,
                }}
              >
                {post.authorInitials}
              </div>
              <span className="font-[family-name:var(--font-inter-tight)] text-[12px] font-semibold text-[var(--text-primary)]">{post.author}</span>
            </div>
            <span className="font-[family-name:var(--font-inter-tight)] text-[11px] text-[var(--text-muted)]">{post.date}</span>
          </div>
        </div>
        <div
          className="flex w-full flex-row items-center justify-center gap-4 border-t border-[var(--border-color)] p-6 md:w-[160px] md:flex-col md:border-l md:border-t-0"
          style={{ background: `color-mix(in srgb, ${post.accentColor} 6%, var(--bg-card))` }}
        >
          <span
            className="font-[family-name:var(--font-inter-tight)] text-[72px] font-extrabold leading-none opacity-20"
            style={{ color: post.accentColor }}
          >
            {letter}
          </span>
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-inter-tight)] text-[13px] font-bold"
            style={{
              background: `${post.authorColor}33`,
              color: post.authorColor,
            }}
          >
            {post.authorInitials}
          </div>
        </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FeatureRowCard({ post, index }: { post: BlogPost; index: number }) {
  const rt = post.readTime.match(/(\d+)/);
  const mins = rt?.[1] ?? "";
  const gradient = `linear-gradient(135deg, color-mix(in srgb, ${post.accentColor} 40%, #0f0a18), #12081f)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="blog-card-hover group flex min-h-[220px] flex-col overflow-hidden rounded-[20px] border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[color-mix(in_srgb,var(--accent)_44%,var(--border-color))] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
        style={{ ["--accent" as string]: post.accentColor }}
      >
        <div className="h-1 w-full shrink-0" style={{ background: post.accentColor }} />
        <div className="flex flex-1 flex-col lg:flex-row">
        <div className="flex flex-1 flex-col justify-center p-8 lg:p-10">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span
              className="rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-inter-tight)] text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{
                background: post.accentBg,
                borderColor: `${post.accentColor}4d`,
                color: post.accentColor,
              }}
            >
              {post.category}
            </span>
            <span className="font-[family-name:var(--font-inter-tight)] text-[11px] text-[var(--text-muted)]">{post.readTime}</span>
          </div>
          <h3 className="mb-3 font-[family-name:var(--font-inter-tight)] text-[clamp(20px,2.5vw,24px)] font-bold leading-snug tracking-[-0.01em] text-[var(--text-primary)]">{post.title}</h3>
          <p className="mb-6 line-clamp-3 font-[family-name:var(--font-inter-tight)] text-[15px] leading-relaxed text-[var(--text-secondary)]">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border-color)] pt-5">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-inter-tight)] text-[11px] font-bold"
                style={{
                  background: `${post.authorColor}33`,
                  color: post.authorColor,
                }}
              >
                {post.authorInitials}
              </div>
              <span className="font-[family-name:var(--font-inter-tight)] text-[13px] font-semibold text-[var(--text-primary)]">{post.author}</span>
            </div>
            <span className="font-[family-name:var(--font-inter-tight)] text-[12px] text-[var(--text-muted)]">{post.date}</span>
          </div>
        </div>
        <div
          className="flex flex-row items-center justify-between gap-6 border-t border-[var(--border-color)] px-8 py-8 lg:w-[280px] lg:flex-col lg:justify-center lg:border-l lg:border-t-0 lg:px-6"
          style={{ background: gradient }}
        >
          <div className="text-left text-white lg:text-center">
            <div className="font-[family-name:var(--font-inter-tight)] text-[44px] font-extrabold leading-none tracking-[-0.04em]">{mins}</div>
            <div className="mt-1 font-[family-name:var(--font-inter-tight)] text-[12px] font-medium uppercase tracking-wide text-white/60">min read</div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-[family-name:var(--font-inter-tight)] text-[14px] font-bold"
              style={{
                background: `${post.authorColor}44`,
                borderColor: `${post.authorColor}88`,
                color: "#fff",
              }}
            >
              {post.authorInitials}
            </div>
            <div className="font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold text-white lg:hidden">{post.author}</div>
          </div>
        </div>
        </div>
      </Link>
    </motion.div>
  );
}
