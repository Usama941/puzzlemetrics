"use client";

import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme";

type Brand = {
  name: string;
  color: string;
  /** Vercel-style marks that flip between light/dark */
  colorDark?: string;
};

const BRANDS: Brand[] = [
  { name: "OPENAI", color: "#10A37F" },
  { name: "ANTHROPIC", color: "#D97757" },
  { name: "LANGCHAIN", color: "#2F855A" },
  { name: "PINECONE", color: "#3B82F6" },
  { name: "VERCEL", color: "#0A0A0A", colorDark: "#F4F4F5" },
  { name: "STRIPE", color: "#635BFF" },
  { name: "META", color: "#0081FB" },
  { name: "GOOGLE", color: "#4285F4" },
];

const BrandMark = ({ brand, isDark }: { brand: Brand; isDark: boolean }) => {
  const color = isDark && brand.colorDark != null ? brand.colorDark : brand.color;

  return (
    <span
      className="inline-block shrink-0 cursor-default whitespace-nowrap text-[clamp(0.8125rem,2.2vw,1.125rem)] font-bold tracking-[0.14em] grayscale opacity-[0.55] transition-[filter,opacity,transform] duration-300 ease-out will-change-transform hover:scale-[1.03] hover:grayscale-0 hover:opacity-100"
      style={{ color }}
    >
      {brand.name}
    </span>
  );
};

export const TrustedBySection = () => {
  const prefersReduced = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="border-y-[0.5px] border-[var(--border-color)] bg-[var(--bg-secondary)] py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-[clamp(1.625rem,4.2vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-[var(--text-primary)]">
          We are Trusted by
        </h2>

        {prefersReduced ? (
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
            {BRANDS.map((brand) => (
              <BrandMark key={brand.name} brand={brand} isDark={isDark} />
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden py-1">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent md:w-20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent md:w-20"
              aria-hidden
            />

            <div className="trusted-by-marquee items-center gap-x-14 md:gap-x-20">
              {[...BRANDS, ...BRANDS].map((brand, i) => (
                <BrandMark key={`${brand.name}-${i}`} brand={brand} isDark={isDark} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrustedBySection;
