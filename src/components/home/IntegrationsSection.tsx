"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { headerViewProps } from "@/lib/motion-helpers";

const ease = [0.25, 0.1, 0.25, 1] as const;

const HUB_SIZE = 560;
const HUB_CX = HUB_SIZE / 2;
const HUB_CY = HUB_SIZE / 2;
const ORBIT_R = 218;
const TILE_PX = 80;
const TILE_HALF = TILE_PX / 2;

interface TileDef {
  name: string;
  bg: string;
  logoWrapClass?: string;
  svgLogo: ReactNode;
}

function tileTopLeft(index: number, total: number): { x: number; y: number } {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  const cx = HUB_CX + ORBIT_R * Math.cos(angle);
  const cy = HUB_CY + ORBIT_R * Math.sin(angle);
  return { x: cx - TILE_HALF, y: cy - TILE_HALF };
}

function tileCentre(index: number, total: number): { x: number; y: number } {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  return {
    x: HUB_CX + ORBIT_R * Math.cos(angle),
    y: HUB_CY + ORBIT_R * Math.sin(angle),
  };
}

const TileLogoChrome = ({ name, wrapClass, children }: { name: string; wrapClass?: string; children: ReactNode }) => (
  <div
    className={`flex h-9 w-9 items-center justify-center overflow-visible [&>img]:block [&>img]:max-h-9 [&>img]:max-w-9 [&>img]:shrink-0 [&>svg]:block [&>svg]:max-h-9 [&>svg]:max-w-9 [&>svg]:shrink-0 ${wrapClass ?? ""}`}
    data-brand={name}
  >
    {children}
  </div>
);

/** Tries `sources` in order; on load error advances to next path, then falls back to inline SVG. */
function TileImage({ sources, alt, fallback }: { sources: string[]; alt: string; fallback: ReactNode }) {
  const [index, setIndex] = useState(0);
  if (index >= sources.length) {
    return <>{fallback}</>;
  }
  return (
    // Intentional: plain <img> with onError fallback chain (not next/image).
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[index]}
      alt={alt}
      width={36}
      height={36}
      style={{ objectFit: "contain", display: "block", width: 36, height: 36 }}
      onError={() => setIndex((i) => i + 1)}
    />
  );
}

const HUB_INNER = 72;
const HUB_LOGO_PX = 52;

export const IntegrationsSection = () => {
  const prefersReduced = useReducedMotion();

  const TILE_DEFS: TileDef[] = [
    {
      name: "OpenAI",
      bg: "rgba(255,255,255,0.07)",
      logoWrapClass: "text-[#0A0A0A] dark:text-white [&_path]:fill-current",
      svgLogo: (
        <TileImage
          sources={["/openai.png", "/openai.svg"]}
          alt="OpenAI"
          fallback={
            <svg width="32" height="32" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path
                d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.131-3.386 10.079 10.079 0 0 0-10.855 4.835 9.965 9.965 0 0 0-6.22 4.516 10.079 10.079 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.131 3.386 10.079 10.079 0 0 0 10.855-4.835 9.965 9.965 0 0 0 6.22-4.516 10.079 10.079 0 0 0-1.24-11.818zm-22.568 15.925a7.477 7.477 0 0 1-4.806-1.734c.061-.033.168-.091.237-.134l7.964-4.6a1.297 1.297 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.482 7.406zM4.117 33.331a7.474 7.474 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103L14.323 36.48a7.505 7.505 0 0 1-10.206-3.149zm-1.636-17.96A7.474 7.474 0 0 1 6.396 10.7v9.47a1.297 1.297 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L5.017 23.86a7.505 7.505 0 0 1-2.536-8.49zm27.556 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.278 4.781a7.497 7.497 0 0 1-1.158 13.528v-9.47a1.297 1.297 0 0 0-.877-1.269zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.084-4.669a7.498 7.498 0 0 1 11.1 7.787zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.297 1.297 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5V20.75z"
                fill="currentColor"
              />
            </svg>
          }
        />
      ),
    },
    {
      name: "Claude",
      bg: "rgba(205,157,100,0.12)",
      svgLogo: (
        <TileImage
          sources={["/claude.png", "/claude.svg"]}
          alt="Claude"
          fallback={
            <svg width="34" height="34" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path
                d="M66.379 21.968 50.25 63.226 34.122 21.968H19.003L43.69 78.032h13.119L81.499 21.968H66.379Z"
                fill="#CC9B6D"
              />
              <path d="M50.25 21.968h-7.56L56.062 54.63l7.56-19.725L50.25 21.968Z" fill="#CC9B6D" />
              <path
                d="M133.621 21.968 117.492 63.226 101.364 21.968H86.244l24.688 56.064h13.118l24.811-56.064h-15.24Z"
                fill="#CC9B6D"
              />
              <path d="M117.492 21.968h-7.56l13.372 32.662 7.56-19.725-13.372-12.937Z" fill="#CC9B6D" />
            </svg>
          }
        />
      ),
    },
    {
      name: "Make",
      bg: "rgba(101,116,255,0.12)",
      svgLogo: (
        <TileImage
          sources={["/make.png", "/make.svg", "/make-com.png"]}
          alt="Make"
          fallback={
            <svg width="36" height="36" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="80" height="80" rx="16" fill="#6574FF" />
              <text
                x="40"
                y="52"
                textAnchor="middle"
                fontFamily="Arial Black, sans-serif"
                fontSize="36"
                fontWeight="900"
                fill="white"
              >
                M
              </text>
            </svg>
          }
        />
      ),
    },
    {
      name: "n8n",
      bg: "rgba(255,100,50,0.12)",
      svgLogo: (
        <TileImage
          sources={["/n8n.png", "/n8n.svg"]}
          alt="n8n"
          fallback={
            <svg width="36" height="36" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="60" height="60" rx="12" fill="#EA4B26" />
              <path
                d="M14 38 L20 22 L26 34 L32 22 L38 34 L44 22 L50 38"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      ),
    },
    {
      name: "Slack",
      bg: "rgba(74,144,226,0.12)",
      svgLogo: (
        <TileImage
          sources={["/slack.png", "/slack.svg"]}
          alt="Slack"
          fallback={
            <svg width="30" height="30" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path
                d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386"
                fill="#36C5F0"
              />
              <path
                d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387"
                fill="#2EB67D"
              />
              <path
                d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386"
                fill="#ECB22E"
              />
              <path
                d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.249m14.336 0v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387"
                fill="#E01E5A"
              />
            </svg>
          }
        />
      ),
    },
    {
      name: "Google",
      bg: "rgba(66,133,244,0.12)",
      svgLogo: (
        <TileImage
          sources={["/google.png", "/google.svg"]}
          alt="Google"
          fallback={
            <svg width="30" height="30" viewBox="0 0 488 488" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path
                d="M488 261.3c0-17.4-1.6-34-4.6-50H249v94.6h134.5c-5.8 31.2-23.4 57.7-49.9 75.5v62.8h80.7C459.4 404.2 488 338 488 261.3z"
                fill="#4285F4"
              />
              <path
                d="M249 488c67.5 0 124.1-22.4 165.5-60.8l-80.7-62.8c-22.4 15-51 23.8-84.8 23.8-65.2 0-120.4-44-140.1-103h-83.4v64.8C68.6 434.7 152.9 488 249 488z"
                fill="#34A853"
              />
              <path
                d="M108.9 285.2A147 147 0 0 1 101.3 244c0-14.3 2.5-28.2 7.6-41.2v-64.8H25.5A244 244 0 0 0 5 244c0 39.4 9.4 76.7 25.5 109.5l83.4-68.3z"
                fill="#FBBC05"
              />
              <path
                d="M249 97.8c36.6 0 69.5 12.6 95.4 37.4l71.5-71.5C371 24.3 316.5 0 249 0 152.9 0 68.6 53.3 25.5 134.5l83.4 64.8C128.6 141.8 183.8 97.8 249 97.8z"
                fill="#EA4335"
              />
            </svg>
          }
        />
      ),
    },
    {
      name: "Meta",
      bg: "rgba(24,119,242,0.12)",
      svgLogo: (
        <TileImage
          sources={["/meta.png", "/meta.svg"]}
          alt="Meta"
          fallback={
            <svg width="34" height="34" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="60" height="60" rx="12" fill="#0866FF" />
              <path
                d="M30 12C20.06 12 12 20.06 12 30s8.06 18 18 18 18-8.06 18-18-8.06-18-18-18zm8.5 12.5c1.2 0 2 .4 2.4 1.2.5.9.4 2.2-.2 3.6-.8 1.8-2.2 3.1-3.8 3.1-.8 0-1.4-.4-2-.8-.6 1.2-1.3 2.2-2.4 2.2-1.5 0-3-.8-3.8-3.1-.6-1.4-.7-2.7-.2-3.6.4-.8 1.2-1.2 2.4-1.2 1.4 0 2.6.9 3.6 2.6.3-.5.6-1.1.9-1.7.8-1.5 2-2.3 3.1-2.3z"
                fill="white"
              />
            </svg>
          }
        />
      ),
    },
    {
      name: "Vercel",
      bg: "rgba(255,255,255,0.07)",
      logoWrapClass: "text-[#0A0A0A] dark:text-white [&_path]:fill-current",
      svgLogo: (
        <TileImage
          sources={["/vercel.png", "/vercel.svg"]}
          alt="Vercel"
          fallback={
            <svg width="32" height="32" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
            </svg>
          }
        />
      ),
    },
    {
      name: "LangChain",
      bg: "rgba(96,85,217,0.15)",
      svgLogo: (
        <TileImage
          sources={["/langchain.png", "/langchain.svg"]}
          alt="LangChain"
          fallback={
            <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="10" y="40" width="30" height="20" rx="4" fill="#6055D9" stroke="white" strokeWidth="3" />
              <rect x="60" y="40" width="30" height="20" rx="4" fill="#6055D9" stroke="white" strokeWidth="3" />
              <line x1="40" y1="50" x2="60" y2="50" stroke="white" strokeWidth="3" />
              <circle cx="50" cy="50" r="5" fill="white" />
              <line x1="25" y1="40" x2="25" y2="25" stroke="white" strokeWidth="3" />
              <line x1="75" y1="40" x2="75" y2="25" stroke="white" strokeWidth="3" />
              <rect x="10" y="10" width="30" height="15" rx="3" fill="#7B6EE8" stroke="white" strokeWidth="2" />
              <rect x="60" y="10" width="30" height="15" rx="3" fill="#7B6EE8" stroke="white" strokeWidth="2" />
            </svg>
          }
        />
      ),
    },
    {
      name: "Zapier",
      bg: "rgba(255,74,0,0.12)",
      svgLogo: (
        <TileImage
          sources={["/zapier.png", "/zapier.svg"]}
          alt="Zapier"
          fallback={
            <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="120" height="120" rx="24" fill="#FF4A00" />
              <path
                d="M60 22v22M60 76v22M22 60h22M76 60h22M32.5 32.5l15.9 15.9M71.6 71.6l15.9 15.9M87.5 32.5L71.6 48.4M48.4 71.6L32.5 87.5"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <circle cx="60" cy="60" r="12" fill="white" />
            </svg>
          }
        />
      ),
    },
  ];

  const n = TILE_DEFS.length;

  const tilesWithPos = TILE_DEFS.map((tile, i) => ({
    ...tile,
    ...tileTopLeft(i, n),
  }));

  return (
    <section id="integrations" style={{ padding: "100px 0", background: "var(--bg-primary)", textAlign: "center" }}>
      <div className="mx-auto max-w-[1160px] px-4">
        <motion.header {...headerViewProps(prefersReduced)} className="flex flex-col items-center">
          <span className="mb-4 inline-flex rounded-[9999px] border-[0.5px] border-[rgba(96,85,217,0.3)] bg-[rgba(96,85,217,0.12)] px-4 py-[5px] text-[12px] font-semibold uppercase tracking-[0.06em] text-[#7B6EE8]">
            Seamless Integrations
          </span>
          <h2 className="max-w-[560px] text-[42px] font-bold leading-tight tracking-[-0.025em] text-[var(--text-primary)]">
            Instant 250+ App Integrations for Your AI Stack
          </h2>
          <p className="mt-4 max-w-[520px] text-[15px] font-normal leading-[1.7] text-[var(--text-secondary)]">
            PuzzleMetrics connects to your entire tech stack out of the box — from CRMs and ad platforms to analytics
            tools and communication apps.
          </p>
        </motion.header>

        <div className="mx-auto mt-10 grid max-w-sm grid-cols-3 gap-3 md:hidden">
          {tilesWithPos.map((tile) => (
            <div
              key={tile.name}
              style={{
                background: tile.bg,
                border: "0.5px solid var(--border-color)",
                borderRadius: 12,
                padding: "10px 6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                minHeight: 88,
              }}
            >
              <TileLogoChrome name={tile.name} wrapClass={tile.logoWrapClass}>
                {tile.svgLogo}
              </TileLogoChrome>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textAlign: "center",
                  lineHeight: 1.15,
                }}
              >
                {tile.name}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <div
            className="relative mx-auto mt-12"
            style={{
              width: HUB_SIZE,
              height: HUB_SIZE,
              flexShrink: 0,
            }}
          >
            <svg
              className="absolute inset-0 z-[1] h-full w-full text-[#6055D9]"
              viewBox={`0 0 ${HUB_SIZE} ${HUB_SIZE}`}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              {tilesWithPos.map((_, i) => {
                const c = tileCentre(i, n);
                return (
                  <line
                    key={i}
                    x1={HUB_CX}
                    y1={HUB_CY}
                    x2={c.x}
                    y2={c.y}
                    className={`opacity-80 dark:opacity-100 ${prefersReduced ? "" : "integration-hub-line"}`}
                    stroke="currentColor"
                    strokeOpacity={0.42}
                    strokeWidth="1.25"
                  />
                );
              })}
            </svg>

            <div
              className="absolute left-1/2 top-1/2 z-20 flex items-center justify-center overflow-hidden rounded-[18px] bg-[#6055D9] shadow-[0_0_0_6px_rgba(96,85,217,0.1),0_8px_28px_rgba(96,85,217,0.18)] dark:shadow-[0_0_0_8px_rgba(96,85,217,0.15),0_0_36px_rgba(96,85,217,0.45)]"
              style={{
                width: HUB_INNER,
                height: HUB_INNER,
                marginLeft: -HUB_INNER / 2,
                marginTop: -HUB_INNER / 2,
              }}
            >
              <div className="relative flex h-full w-full items-center justify-center p-2.5">
                <Image
                  src="/logo.png"
                  alt="PuzzleMetrics"
                  width={HUB_LOGO_PX}
                  height={HUB_LOGO_PX}
                  className="h-[52px] w-[52px] object-contain"
                  sizes="52px"
                  priority
                />
              </div>
            </div>

            {tilesWithPos.map((tile, i) => (
              <motion.div
                key={tile.name}
                initial={prefersReduced ? false : { opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={
                  prefersReduced ? { duration: 0 } : { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }
                }
                className="absolute z-10 box-border cursor-default overflow-hidden rounded-2xl border-[0.5px] border-[var(--border-color)] backdrop-blur-sm"
                style={{
                  left: tile.x,
                  top: tile.y,
                  width: TILE_PX,
                  height: TILE_PX,
                  background: tile.bg,
                }}
              >
                <div className="flex h-full w-full flex-col items-stretch px-1 pb-1.5 pt-2">
                  <div className="flex min-h-0 flex-1 items-center justify-center">
                    <TileLogoChrome name={tile.name} wrapClass={tile.logoWrapClass}>
                      {tile.svgLogo}
                    </TileLogoChrome>
                  </div>
                  <span className="shrink-0 text-center text-[9px] font-bold leading-tight tracking-[0.02em] text-[var(--text-muted)]">
                    {tile.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.45, ease }}
          className="mt-10"
        >
          <span className="inline-flex rounded-[9999px] border-[0.5px] border-[rgba(96,85,217,0.3)] bg-[rgba(96,85,217,0.1)] px-[18px] py-1.5 text-[13px] font-semibold text-[#7B6EE8]">
            +250 more integrations
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
