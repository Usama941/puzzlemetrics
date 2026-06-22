import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import { PostShareRow } from "@/components/blog/PostShareRow";
import { getBlogPostBySlug, getBlogPosts, getBlogRelatedPosts } from "@/lib/db-cache";
import type { BlogPost } from "@prisma/client";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ArticleBody = {
  intro: string;
  sections: { heading: string; body: string }[];
  conclusion: string;
};

function parseArticleBody(json: unknown): ArticleBody {
  if (!json || typeof json !== "object") return { intro: "", sections: [], conclusion: "" };
  const o = json as Record<string, unknown>;
  const intro = typeof o.intro === "string" ? o.intro : "";
  const conclusion = typeof o.conclusion === "string" ? o.conclusion : "";
  const sections: { heading: string; body: string }[] = [];
  if (Array.isArray(o.sections)) {
    for (const s of o.sections) {
      if (s && typeof s === "object" && "heading" in s && "body" in s) {
        const h = (s as { heading: unknown }).heading;
        const b = (s as { body: unknown }).body;
        if (typeof h === "string" && typeof b === "string") sections.push({ heading: h, body: b });
      }
    }
  }
  return { intro, sections, conclusion };
}

export async function generateStaticParams() {
  const items = await getBlogPosts();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — PuzzleMetrics Blog`,
    description: post.excerpt,
  };
}

function IntroBlock({ post, content }: { post: BlogPost; content: ArticleBody }) {
  const paras = content.intro.split("\n\n").filter(Boolean);
  if (paras.length === 0) return null;

  const first = paras[0];
  const drop = first[0];
  const restFirst = first.slice(1);

  return (
    <div className="mb-2 overflow-hidden">
      <p className="mb-5 font-[family-name:var(--font-inter-tight)] text-[17px] font-normal leading-[1.85] text-[var(--text-secondary)]">
        <span
          className="float-left font-[family-name:var(--font-inter-tight)] font-extrabold leading-[0.85]"
          style={{
            fontSize: 52,
            color: post.accentColor,
            margin: "4px 8px 0 0",
          }}
        >
          {drop}
        </span>
        {restFirst}
      </p>
      {paras.slice(1).map((para, i) => (
        <p
          key={i}
          className="mb-5 font-[family-name:var(--font-inter-tight)] text-[17px] font-normal leading-[1.85] text-[var(--text-secondary)] last:mb-0"
        >
          {para}
        </p>
      ))}
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const content = parseArticleBody(post.content);

  const related = await getBlogRelatedPosts(post.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 pb-14 pt-[72px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: `radial-gradient(circle, ${post.accentColor}14 1.5px, transparent 1.5px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-[1] mx-auto max-w-[780px]">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[13px] font-[family-name:var(--font-inter-tight)]" aria-label="Breadcrumb">
            <Link href="/blog" className="font-normal text-[var(--text-muted)] no-underline hover:text-[var(--text-primary)]">
              Blog
            </Link>
            <span className="text-[var(--text-muted)]">›</span>
            <span className="font-semibold" style={{ color: post.accentColor }}>
              {post.category}
            </span>
          </nav>

          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            <span
              className="inline-block rounded-full border px-3.5 py-1 font-[family-name:var(--font-inter-tight)] text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{
                background: post.accentBg,
                borderColor: `${post.accentColor}4d`,
                color: post.accentColor,
              }}
            >
              {post.category}
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-muted)]">{post.readTime}</span>
          </div>

          <h1 className="mb-[18px] font-[family-name:var(--font-inter-tight)] text-[clamp(28px,4.5vw,46px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)]">
            {post.title}
          </h1>
          <p className="mb-7 font-[family-name:var(--font-inter-tight)] text-[17px] font-normal italic leading-[1.7] text-[var(--text-secondary)]">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border-color)] pt-6">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-[family-name:var(--font-inter-tight)] text-[16px] font-extrabold"
              style={{
                background: `${post.authorColor}2e`,
                borderColor: `${post.authorColor}59`,
                color: post.authorColor,
              }}
            >
              {post.authorInitials}
            </div>
            <div>
              <div className="font-[family-name:var(--font-inter-tight)] text-[15px] font-semibold text-[var(--text-primary)]">{post.author}</div>
              <div className="mt-0.5 font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-muted)]">{post.authorRole}</div>
            </div>
            <span className="mx-1 hidden h-7 w-px bg-[var(--border-color)] sm:inline-block" aria-hidden />
            <span className="w-full font-[family-name:var(--font-inter-tight)] text-[13px] text-[var(--text-muted)] sm:w-auto">{post.date}</span>
          </div>
        </div>
      </section>

      <article className="bg-[var(--bg-primary)] px-6 py-[72px]">
        <div className="mx-auto max-w-[720px]">
          <IntroBlock post={post} content={content} />

          {content.sections.map((section, si) => (
            <section
              key={section.heading}
              className={`mb-12 pb-12 ${si < content.sections.length - 1 ? "border-b border-[var(--border-color)]" : ""}`}
            >
              <h2 className="relative mb-5 pl-6 font-[family-name:var(--font-inter-tight)] text-[22px] font-bold tracking-[-0.015em] text-[var(--text-primary)]">
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                  style={{ background: post.accentColor }}
                  aria-hidden
                />
                {section.heading}
              </h2>
              {section.body.split("\n\n").map((para, pi) => (
                <p
                  key={pi}
                  className="mb-[18px] font-[family-name:var(--font-inter-tight)] text-[16px] font-normal leading-[1.8] text-[var(--text-secondary)] last:mb-0"
                >
                  {para}
                </p>
              ))}
            </section>
          ))}

          <aside
            className="mt-12 rounded-r-xl border-l-4 py-6 pl-7 pr-7"
            style={{
              background: post.accentBg,
              borderLeftColor: post.accentColor,
            }}
          >
            <p className="mb-2 font-[family-name:var(--font-inter-tight)] text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: post.accentColor }}>
              TAKEAWAY
            </p>
            {content.conclusion.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="mb-3 font-[family-name:var(--font-inter-tight)] text-[15px] font-normal leading-[1.75] text-[var(--text-secondary)] last:mb-0"
              >
                {para}
              </p>
            ))}
          </aside>
        </div>
      </article>

      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-12">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-7">
            <p className="mb-2 font-[family-name:var(--font-inter-tight)] text-[12px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">Topics:</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] px-2.5 py-0.5 font-[family-name:var(--font-inter-tight)] text-[11px] font-medium text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <PostShareRow post={post} />
        </div>
      </footer>

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-16">
        <div className="mx-auto max-w-[1000px]">
          <h3 className="mb-7 font-[family-name:var(--font-inter-tight)] text-[22px] font-bold text-[var(--text-primary)]">More from the blog</h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {related.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group flex flex-col overflow-hidden rounded-[14px] border border-[var(--border-color)] bg-[var(--bg-card)] transition-[transform,border-color] duration-200 hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--accent)_44%,var(--border-color))]"
                style={{ ["--accent" as string]: rp.accentColor }}
              >
                <div className="h-1 w-full shrink-0" style={{ background: rp.accentColor }} />
                <div className="p-5 pt-4">
                <span
                  className="mt-4 inline-block w-fit rounded-full border px-2 py-0.5 font-[family-name:var(--font-inter-tight)] text-[10px] font-bold uppercase tracking-wide"
                  style={{
                    background: rp.accentBg,
                    borderColor: `${rp.accentColor}4d`,
                    color: rp.accentColor,
                  }}
                >
                  {rp.category}
                </span>
                <p className="mt-2 line-clamp-2 font-[family-name:var(--font-inter-tight)] text-[14px] font-semibold leading-snug text-[var(--text-primary)]">{rp.title}</p>
                <p className="mt-1.5 font-[family-name:var(--font-inter-tight)] text-[12px] text-[var(--text-muted)]">
                  {rp.author} · {rp.date}
                </p>
                <span className="mt-3 font-[family-name:var(--font-inter-tight)] text-[12px] font-semibold" style={{ color: rp.accentColor }}>
                  Read →
                </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-[72px] text-center">
        <div className="mx-auto max-w-[560px]">
          <h2 className="font-[family-name:var(--font-inter-tight)] text-[clamp(24px,3.5vw,32px)] font-extrabold tracking-[-0.02em] text-[var(--text-primary)]">Found this useful?</h2>
          <p className="mt-3 font-[family-name:var(--font-inter-tight)] text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Subscribe to The Intelligence Brief — practical AI thinking twice a month.
          </p>
          <NewsletterSignup />
          <Link href="/portfolio" className="mt-6 inline-block font-[family-name:var(--font-inter-tight)] text-[13px] font-semibold text-[#6055D9] no-underline hover:underline">
            Or explore our work →
          </Link>
        </div>
      </section>
    </>
  );
}
