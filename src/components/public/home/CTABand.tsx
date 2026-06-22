"use client";

import Link from "next/link";
import BookingButton from "@/components/booking/BookingButton";
import { motion } from "framer-motion";
import { sectionFadeUp } from "@/lib/animations";

export function CTABand() {
  return (
    <section className="px-[clamp(24px,5vw,80px)] py-[clamp(60px,8vh,100px)]">
      <motion.div className="mx-auto max-w-[1200px]" {...sectionFadeUp}>
        <div className="flex flex-col items-stretch gap-10 rounded-[24px] bg-gradient-to-br from-[#6055D9] to-[#3D34B0] px-[clamp(24px,6vw,80px)] py-[clamp(48px,6vw,80px)] md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="max-w-xl">
            <h2 className="font-syne text-[clamp(32px,4vw,50px)] font-extrabold leading-[1] text-white">
              Ready to build with AI?
            </h2>
            <p className="mt-4 font-sans text-[17px] font-light text-[rgba(255,255,255,0.72)]">
              Let&apos;s talk about your project and how we can help.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 md:w-auto md:min-w-[240px]">
            <BookingButton
              source="public-cta-band"
              className="inline-flex w-full items-center justify-center rounded-[12px] bg-white px-6 py-3.5 text-center font-sans text-sm font-medium text-[#6055D9] transition-colors duration-200 ease-in-out hover:bg-[#EDEAFF] md:w-auto"
              style={{ textDecoration: "none" }}
            >
              Start a Project
            </BookingButton>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center rounded-[12px] border-[1.5px] border-[rgba(255,255,255,0.4)] bg-transparent px-6 py-3.5 text-center font-sans text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:border-white hover:bg-white/10"
            >
              See Case Studies →
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default CTABand;
