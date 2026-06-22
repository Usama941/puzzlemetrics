import { Suspense } from "react";
import dynamic from "next/dynamic";
import { AnimatedSection } from "@/components/home/AnimatedSection";
import { HeroSection } from "@/components/home/HeroSection";
import { TechnologyPartners } from "@/components/home/TechnologyPartners";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TrustedByMarquee } from "@/components/home/TrustedByMarquee";

const SectionFallback = () => (
  <div className="min-h-[160px] w-full animate-pulse rounded-[16px] bg-[var(--bg-tertiary)]" aria-hidden />
);

const FeaturesSection = dynamic(
  () => import("@/components/home/FeaturesSection").then((mod) => ({ default: mod.FeaturesSection })),
  { loading: () => <SectionFallback /> },
);

const IntegrationsSection = dynamic(
  () =>
    import("@/components/home/IntegrationsSection").then((mod) => ({ default: mod.IntegrationsSection })),
  { loading: () => <SectionFallback /> },
);

const PricingSection = dynamic(
  () => import("@/components/home/PricingSection").then((mod) => ({ default: mod.PricingSection })),
  { loading: () => <SectionFallback /> },
);

const CTASection = dynamic(
  () => import("@/components/home/CTASection").then((mod) => ({ default: mod.CTASection })),
  { loading: () => <SectionFallback /> },
);

export default function Page() {
  return (
    <>
      <AnimatedSection>
        <Suspense fallback={<SectionFallback />}>
          <HeroSection />
        </Suspense>
      </AnimatedSection>

      <Suspense fallback={<SectionFallback />}>
        <TrustedByMarquee />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <AnimatedSection>
          <FeaturesSection />
        </AnimatedSection>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <AnimatedSection>
          <IntegrationsSection />
        </AnimatedSection>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <AnimatedSection>
          <PricingSection />
        </AnimatedSection>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <AnimatedSection>
          <TestimonialsSection />
        </AnimatedSection>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TechnologyPartners />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <AnimatedSection>
          <CTASection />
        </AnimatedSection>
      </Suspense>
    </>
  );
}
