"use client";

import BookingButton from "@/components/booking/BookingButton";
import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { viewFadeDelay } from "@/lib/motion-helpers";

export type HeroContentProps = {
  headline1: string;
  headline2: string;
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  badge: string;
};

type StarSpec = {
  id: number;
  left: number;
  top: number;
  size: 1 | 2;
  twMin: number;
  twMax: number;
  duration: number;
  delay: number;
};

const ShootingStars = ({ isDark }: { isDark: boolean }) => {
  const specs = [
    { anim: "hero-shoot", dur: 3.8, delay: 0, w: 96 },
    { anim: "hero-shoot-b", dur: 4.4, delay: 2.1, w: 72 },
    { anim: "hero-shoot-c", dur: 3.2, delay: 4.5, w: 112 },
    { anim: "hero-shoot-d", dur: 4.9, delay: 1.2, w: 84 },
  ] as const;

  const lineClass = isDark
    ? "from-white via-white/70 to-transparent"
    : "from-[rgba(96,85,217,0.85)] via-[rgba(96,85,217,0.45)] to-transparent";

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden>
      {specs.map((s, i) => (
        <div
          key={i}
          className={`hero-css-shoot absolute h-[1px] bg-gradient-to-r ${lineClass}`}
          style={{
            width: s.w,
            left: `${8 + i * 22}%`,
            top: `${4 + (i % 3) * 6}%`,
            animation: `${s.anim} ${s.dur}s linear ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const Starfield = ({ stars, isDark }: { stars: StarSpec[]; isDark: boolean }) => {
  const dotColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(96,85,217,0.4)";
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((s) => (
        <div
          key={s.id}
          className="hero-css-twinkle absolute rounded-full"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              backgroundColor: dotColor,
              ["--tw-min"]: s.twMin,
              ["--tw-max"]: s.twMax,
              animation: `hero-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
};

const AvatarStack = () => (
  <svg width={52} height={24} viewBox="0 0 52 24" aria-hidden className="shrink-0">
    <circle cx="12" cy="12" r="10" fill="#7B6EE8" stroke="var(--bg-primary)" strokeWidth="2" />
    <circle cx="26" cy="12" r="10" fill="#6055D9" stroke="var(--bg-primary)" strokeWidth="2" />
    <circle cx="40" cy="12" r="10" fill="#9B91F0" stroke="var(--bg-primary)" strokeWidth="2" />
  </svg>
);

const HeroDashboardMockup = ({ stats }: { stats: { label: string; value: string }[] }) => {
  const displayStats = stats.length > 0 ? stats.slice(0, 2) : [
    { label: "Active users", value: "1,200+" },
    { label: "ROAS", value: "340%" },
  ];
  const bars = displayStats.map((_, i) => 40 + ((i + 1) * 25) % 55);

  return (
    <div
      className="hero-css-float mx-auto w-full max-w-[960px] rounded-[16px] border-[0.5px] border-[var(--border-color)] bg-[var(--bg-card)] shadow-[0_40px_80px_rgba(0,0,0,0.12),0_0_60px_rgba(96,85,217,0.12)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(96,85,217,0.15)]"
      style={{ animation: "hero-float-ui 4s ease-in-out infinite" }}
    >
      <div className="flex items-center gap-2 border-b border-[var(--border-color)] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28CA41]" />
        </div>
        <div className="ml-2 flex-1 rounded-md bg-[var(--bg-tertiary)] px-3 py-1.5 text-left text-[11px] text-[var(--text-muted)]">
          app.puzzlemetrics.com/analytics
        </div>
      </div>

      <div className="flex min-h-[220px] md:min-h-[260px]">
        <aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-[var(--border-color)] p-3 md:flex">
          {["Overview", "Agents", "Campaigns", "Insights", "Reports", "Settings"].map((item, i) => (
            <div
              key={item}
              className={`flex items-center gap-2 rounded-lg px-2 py-2 text-[12px] ${
                i === 0
                  ? "bg-[rgba(96,85,217,0.2)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
              {item}
            </div>
          ))}
        </aside>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {displayStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-tertiary)] p-4 text-left"
              >
                <p className="text-[11px] text-[var(--text-secondary)]">{stat.label}</p>
                <p className="mt-1 text-2xl font-extrabold text-[var(--text-primary)]">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="flex h-32 items-end gap-1 rounded-xl border border-[var(--border-color)] bg-[rgba(0,0,0,0.06)] px-2 pb-0 pt-4 dark:bg-[rgba(0,0,0,0.2)]">
            {bars.map((h, i) => (
              <div
                key={i}
                className="min-h-[20px] flex-1 rounded-t-sm bg-gradient-to-t from-[#6055D9] to-[#7B6EE8]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function buildStars(count: number): StarSpec[] {
  const next: StarSpec[] = [];
  for (let i = 0; i < count; i++) {
    next.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() > 0.45 ? 2 : 1,
      twMin: 0.2 + Math.random() * 0.25,
      twMax: 0.55 + Math.random() * 0.25,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 6,
    });
  }
  return next;
}

export function HeroSectionClient({
  hero,
  stats,
}: {
  hero: HeroContentProps;
  stats: { label: string; value: string }[];
}) {
  const [stars, setStars] = useState<StarSpec[]>([]);
  const prefersReduced = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      const count = mq.matches ? 30 : 80;
      setStars(buildStars(count));
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const headlineMuted = isDark ? "rgba(255,255,255,0.28)" : "rgba(10,10,20,0.2)";

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(96,85,217,0.25)_0%,transparent_60%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_at_70%_100%,rgba(180,60,20,0.08)_0%,transparent_55%),radial-gradient(ellipse_at_30%_100%,rgba(180,60,20,0.06)_0%,transparent_50%)]"
        aria-hidden
      />

      {stars.length > 0 ? <Starfield stars={stars} isDark={isDark} /> : null}

      <ShootingStars isDark={isDark} />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-[104px] text-center md:pb-24">
        <motion.div
          {...viewFadeDelay(0.2, prefersReduced)}
          className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-[9999px] border-[0.5px] border-[var(--border-brand)] bg-[rgba(96,85,217,0.08)] px-[18px] py-2 dark:border-[rgba(255,255,255,0.15)] dark:bg-[rgba(255,255,255,0.08)]"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="motion-reduce-ping absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <AvatarStack />
          <span className="text-[13px] font-medium leading-snug text-[var(--text-secondary)]">{hero.badge}</span>
          <ArrowRight className="h-4 w-4 shrink-0 text-[var(--text-muted)]" strokeWidth={2} aria-hidden />
        </motion.div>

        <motion.h1
          {...viewFadeDelay(0.35, prefersReduced)}
          className="mt-8 max-w-[800px] text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)] md:text-[72px]"
        >
          <span className="block">{hero.headline1}</span>
          <span className="block" style={{ color: headlineMuted }}>
            {hero.headline2}
          </span>
        </motion.h1>

        <motion.p
          {...viewFadeDelay(0.5, prefersReduced)}
          className="mt-6 max-w-[560px] text-[17px] font-normal leading-[1.7] text-[var(--text-secondary)]"
        >
          {hero.subtext}
        </motion.p>

        <motion.div
          {...viewFadeDelay(0.65, prefersReduced)}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <BookingButton
            source="hero-get-started"
            className="inline-flex items-center justify-center rounded-[9999px] bg-[#6055D9] px-9 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_32px_rgba(96,85,217,0.45)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px hover:bg-[#7B6EE8] hover:shadow-[0_0_48px_rgba(96,85,217,0.6)]"
            style={{ textDecoration: "none" }}
          >
            {hero.ctaPrimary}
          </BookingButton>
          <BookingButton
            source="hero-book-demo"
            className="inline-flex items-center justify-center rounded-[9999px] border-[0.5px] border-[var(--border-color)] bg-transparent px-9 py-3.5 text-[15px] font-medium text-[var(--text-secondary)] transition-colors duration-200 ease-out hover:border-[var(--border-brand)] hover:bg-[var(--bg-tertiary)] dark:border-[rgba(255,255,255,0.2)] dark:text-[rgba(255,255,255,0.8)] dark:hover:border-[rgba(255,255,255,0.3)] dark:hover:bg-[rgba(255,255,255,0.06)]"
            style={{ textDecoration: "none" }}
          >
            {hero.ctaSecondary}
          </BookingButton>
        </motion.div>

        <motion.div {...viewFadeDelay(0.8, prefersReduced)} className="mt-14 w-full origin-top scale-[0.95] md:scale-100">
          <HeroDashboardMockup stats={stats} />
        </motion.div>
      </div>
    </section>
  );
}
