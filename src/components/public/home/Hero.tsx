"use client";

import Link from "next/link";
import BookingButton from "@/components/booking/BookingButton";
import { motion } from "framer-motion";
import { useEffect, useRef, useSyncExternalStore } from "react";

/** Stable SSR + first client paint — avoids hydration mismatches from `window` / Framer's reduced-motion probe */
const useMediaQueryMatch = (query: string): boolean => {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined") {
        return () => {};
      }
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false),
    () => false,
  );
};

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number, reduced: boolean) => ({
  initial: reduced ? false : { opacity: 0, y: 24 },
  /** FM v12: never pass `animate: undefined` — it can leave nodes stuck at `initial` */
  animate: { opacity: 1, y: 0 },
  transition: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE },
});

const scaleIn = (delay: number, reduced: boolean) => ({
  initial: reduced ? false : { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay, ease: EASE },
});

const HEADLINE_LINES: { words: string[]; className: string }[] = [
  { words: ["We", "Build"], className: "text-[#0D0B1A] dark:text-[#FAFAFE]" },
  { words: ["AI", "That", "Works"], className: "text-[#6055D9]" },
  { words: ["For", "Business"], className: "text-[#0D0B1A] dark:text-[#FAFAFE]" },
];

function latLonToVector3(lat: number, lon: number, r: number): { x: number; y: number; z: number } {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
}

const CITIES: { lat: number; lon: number }[] = [
  { lat: 51.5, lon: -0.1 },
  { lat: 40.7, lon: -74 },
  { lat: 25.2, lon: 55.3 },
  { lat: 24.9, lon: 67 },
  { lat: 50.85, lon: 4.35 },
];

const ARC_PAIRS: [number, number][] = [
  [0, 1],
  [2, 3],
  [4, 0],
];

const WORD_BASE_DELAY = 0.3;
const WORD_STAGGER = 0.08;

function headlineWordGlobalIndex(lineIndex: number, wordIndexInLine: number): number {
  let n = 0;
  for (let i = 0; i < lineIndex; i++) {
    n += HEADLINE_LINES[i]?.words.length ?? 0;
  }
  return n + wordIndexInLine;
}

function buildElevatedArcPoints(
  THREE: typeof import("three"),
  a: import("three").Vector3,
  b: import("three").Vector3,
  surfaceRadius: number,
): import("three").Vector3[] {
  const segments = 10;
  const pts: import("three").Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const blended = new THREE.Vector3().lerpVectors(a, b, t).normalize();
    const lift = 1 + 0.2 * Math.sin(t * Math.PI);
    blended.multiplyScalar(surfaceRadius * lift);
    pts.push(blended);
  }
  return pts;
}

const GlobeCanvas = ({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef(0);
  const disposeRef = useRef<(() => void) | null>(null);
  const reducedRef = useRef(reducedMotion);
  reducedRef.current = reducedMotion;

  useEffect(() => {
    if (isMobile) {
      return;
    }
    const el = containerRef.current;
    if (!el) {
      return;
    }
    const canvas = el.querySelector("#globeCanvas") as HTMLCanvasElement | null;
    if (!canvas) {
      return;
    }

    let cancelled = false;
    let innerRaf = 0;

    const mountRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => {
        void (async () => {
          const THREE = await import("three");
          if (cancelled) {
            return;
          }

        const parent = canvas.parentElement;
        let w = Math.max(2, parent?.clientWidth ?? parent?.offsetWidth ?? 0);
        let h = Math.max(2, parent?.clientHeight ?? parent?.offsetHeight ?? 0);
        if (w < 16 || h < 16) {
          w = 500;
          h = 500;
        }
        canvas.width = w;
        canvas.height = h;

        const radius = Math.min(w, h) * 0.28;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, w / Math.max(h, 1), 0.1, 100);
        camera.position.z = radius * 3.2;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h, false);

        /** Single rotating group: wireframe, city dots, arc tubes, packets */
        const rotGroup = new THREE.Group();

        const wire = new THREE.Mesh(
          new THREE.SphereGeometry(radius, 40, 40),
          new THREE.MeshBasicMaterial({
            color: 0x6055d9,
            wireframe: true,
            transparent: true,
            opacity: 0.4,
          }),
        );
        rotGroup.add(wire);

        const cityPos: import("three").Vector3[] = [];
        for (const c of CITIES) {
          const p = latLonToVector3(c.lat, c.lon, radius);
          const v = new THREE.Vector3(p.x, p.y, p.z);
          cityPos.push(v);
          const dot = new THREE.Mesh(
            new THREE.SphereGeometry(radius * 0.038, 14, 14),
            new THREE.MeshBasicMaterial({
              color: 0x6055d9,
              transparent: true,
              opacity: 1,
            }),
          );
          dot.position.copy(v);
          rotGroup.add(dot);
        }

        const curves: import("three").CatmullRomCurve3[] = [];
        const tubeRadius = radius * 0.014;

        for (const [ai, bi] of ARC_PAIRS) {
          const v0 = cityPos[ai];
          const v1 = cityPos[bi];
          if (!v0 || !v1) {
            continue;
          }
          const arcPts = buildElevatedArcPoints(THREE, v0, v1, radius);
          const curve = new THREE.CatmullRomCurve3(arcPts);
          curves.push(curve);
          const tubularSegments = Math.max(32, arcPts.length * 6);
          const tubeGeom = new THREE.TubeGeometry(curve, tubularSegments, tubeRadius, 10, false);
          const tubeMat = new THREE.MeshBasicMaterial({
            color: 0x6055d9,
            transparent: true,
            opacity: 0.4,
          });
          const tube = new THREE.Mesh(tubeGeom, tubeMat);
          rotGroup.add(tube);
        }

        const packets: {
          mesh: import("three").Mesh;
          curve: import("three").CatmullRomCurve3;
          t: number;
          speed: number;
        }[] = [];
        curves.forEach((curve, i) => {
          const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius * 0.022, 10, 10),
            new THREE.MeshBasicMaterial({
              color: 0xedeaff,
              transparent: true,
              opacity: 0.95,
            }),
          );
          rotGroup.add(mesh);
          packets.push({ mesh, curve, t: i * 0.33, speed: 0.002 + i * 0.0005 });
        });

        scene.add(rotGroup);

        const animate = (): void => {
          if (cancelled) {
            return;
          }
          rafRef.current = requestAnimationFrame(animate);
          const motionReduced = reducedRef.current;
          if (!pausedRef.current && !motionReduced) {
            rotGroup.rotation.y += (0.15 * Math.PI) / 180;
          }
          if (!motionReduced) {
            for (const pkt of packets) {
              pkt.t += pkt.speed;
              if (pkt.t > 1) {
                pkt.t -= 1;
              }
              pkt.mesh.position.copy(pkt.curve.getPoint(pkt.t));
            }
          }
          renderer.render(scene, camera);
        };
        animate();

        const onResize = (): void => {
          const rw = Math.max(2, canvas.parentElement?.clientWidth ?? canvas.parentElement?.offsetWidth ?? 500);
          const rh = Math.max(2, canvas.parentElement?.clientHeight ?? canvas.parentElement?.offsetHeight ?? 500);
          canvas.width = rw;
          canvas.height = rh;
          camera.aspect = rw / Math.max(rh, 1);
          camera.updateProjectionMatrix();
          renderer.setSize(rw, rh, false);
        };
        window.addEventListener("resize", onResize);

        const ro = new ResizeObserver(() => {
          onResize();
        });
        ro.observe(el);

        const onPause = (): void => {
          pausedRef.current = true;
        };
        const onResume = (): void => {
          pausedRef.current = false;
        };
        el.addEventListener("mouseenter", onPause);
        el.addEventListener("mouseleave", onResume);

        disposeRef.current = (): void => {
          window.removeEventListener("resize", onResize);
          ro.disconnect();
          el.removeEventListener("mouseenter", onPause);
          el.removeEventListener("mouseleave", onResume);
          cancelAnimationFrame(rafRef.current);
          renderer.dispose();
          scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              obj.geometry.dispose();
              const m = obj.material;
              if (Array.isArray(m)) {
                m.forEach((x) => x.dispose());
              } else {
                m.dispose();
              }
            }
          });
        };
        })();
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(mountRaf);
      cancelAnimationFrame(innerRaf);
      disposeRef.current?.();
      disposeRef.current = null;
    };
  }, [isMobile, reducedMotion]);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[24px] border border-[rgba(96,85,217,0.2)] bg-[#0F0E28]">
      <div
        ref={containerRef}
        className="relative"
        style={{ width: "100%", height: "100%", minHeight: "400px" }}
      >
        <canvas id="globeCanvas" style={{ width: "100%", height: "100%", display: "block" }} />
      </div>
    </div>
  );
};

const MobileGlobeFallback = () => (
  <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[24px] border border-[rgba(96,85,217,0.2)] bg-[#0F0E28]">
    <svg viewBox="0 0 200 200" className="h-[80%] w-[80%] text-[#6055D9]" aria-hidden>
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      <ellipse cx="100" cy="100" rx="78" ry="28" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
      <ellipse cx="100" cy="100" rx="28" ry="78" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
      <circle cx="60" cy="85" r="4" fill="#6055D9" opacity="0.9" />
      <circle cx="140" cy="95" r="4" fill="#6055D9" opacity="0.9" />
      <circle cx="100" cy="140" r="4" fill="#6055D9" opacity="0.9" />
    </svg>
    <p className="absolute bottom-6 left-0 right-0 text-center font-[family-name:var(--font-dm-sans)] text-[13px] text-[rgba(255,255,255,0.55)]">
      Connecting 5 global markets
    </p>
  </div>
);

export function Hero() {
  const prefersReducedMotion = useMediaQueryMatch("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQueryMatch("(max-width: 767px)");
  const reduced = prefersReducedMotion;

  return (
    <section
      className="relative min-h-[100svh] bg-[#FAFAFE] dark:bg-[#08071A]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(96,85,217,0.07) 0%, transparent 55%)",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-[clamp(24px,5vw,80px)] pb-16 pt-[120px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-10">
          <div>
            <motion.div {...fadeUp(0.2, !!reduced)}>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EDEAFF] px-3 py-1.5 font-[family-name:var(--font-dm-mono)] text-[11px] uppercase tracking-[0.1em] text-[#6055D9]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6055D9]" aria-hidden />
                AI SERVICES & PRODUCTS · UK-BASED · GLOBAL
              </span>
            </motion.div>

            <h1 className="mt-6 font-[family-name:var(--font-syne)] font-extrabold leading-[0.96] tracking-[-0.04em]">
              {HEADLINE_LINES.map((line, lineIndex) => (
                <span key={line.words.join("-")} className="block">
                  {line.words.map((w, wordIndexInLine) => {
                    const idx = headlineWordGlobalIndex(lineIndex, wordIndexInLine);
                    return (
                      <motion.span
                        key={`${lineIndex}-${wordIndexInLine}-${w}`}
                        className={`mr-[0.25em] inline-block text-[clamp(52px,7vw,84px)] ${line.className}`}
                        initial={reduced ? false : { opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: reduced ? 0 : 0.5,
                          delay: reduced ? 0 : WORD_BASE_DELAY + idx * WORD_STAGGER,
                          ease: EASE,
                        }}
                      >
                        {w}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-6 max-w-[520px] font-[family-name:var(--font-dm-sans)] text-[18px] font-light leading-[1.7] text-[#4A4870] dark:text-[#C4C2E8]"
              {...fadeUp(0.7, !!reduced)}
            >
              From SaaS AI agents and RAG systems to Meta & Google Ads intelligence — we design, build and deploy AI
              that creates measurable results.
            </motion.p>

            <motion.div className="mt-9 flex flex-wrap gap-4" {...fadeUp(0.9, !!reduced)}>
              <BookingButton
                source="public-hero"
                className="inline-flex items-center justify-center rounded-[12px] bg-[#6055D9] px-7 py-3.5 text-[#FAFAFE] transition-[background-color,transform] duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-[#3D34B0]"
                style={{ textDecoration: "none" }}
              >
                Start a Project
              </BookingButton>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-[12px] border-[1.5px] border-[#D6D3F0] bg-transparent px-7 py-3.5 text-[#4A4870] transition-[border-color,color,background-color] duration-200 ease-in-out hover:border-[#6055D9] hover:bg-[#EDEAFF] hover:text-[#6055D9]"
              >
                See Our Work
              </Link>
            </motion.div>

            <motion.div
              className="mt-12 grid grid-cols-3 divide-x divide-[#D6D3F0] dark:divide-white/10"
              {...fadeUp(1.1, !!reduced)}
            >
              {[
                { n: "5+", l: "Years Building AI" },
                { n: "1,200+", l: "Platform Users" },
                { n: "5", l: "Global Markets" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col gap-1 px-4 first:pl-0 last:pr-0">
                  <span className="font-[family-name:var(--font-syne)] text-[26px] font-extrabold text-[#6055D9]">
                    {s.n}
                  </span>
                  <span className="font-[family-name:var(--font-dm-sans)] text-[12px] text-[#8A87B0]">{s.l}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div className="relative w-full" {...scaleIn(0.4, !!reduced)}>
            <div className="relative">
              <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-[99px] border border-[rgba(96,85,217,0.3)] bg-[rgba(15,14,40,0.85)] px-3.5 py-[7px] font-[family-name:var(--font-dm-mono)] text-[11px] uppercase tracking-wide text-[#FAFAFE] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1D9E75] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1D9E75]" />
                </span>
                LIVE NETWORK
              </div>

              {isMobile ? (
                <MobileGlobeFallback />
              ) : (
                <GlobeCanvas reducedMotion={!!reduced} isMobile={isMobile} />
              )}

              {!isMobile ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-[#0F0E28] via-[#0F0E28]/80 to-transparent pb-6 pt-16">
                  <p className="text-center font-[family-name:var(--font-dm-sans)] text-[13px] text-[rgba(255,255,255,0.55)]">
                    Connecting 5 global markets
                  </p>
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
